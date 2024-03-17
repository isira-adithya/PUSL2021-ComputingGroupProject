import {
    PrismaClient
} from '../modules/prisma_client/index.js';
import {sendEmail} from '../modules/email/mailgun.js';

const prisma = new PrismaClient();


function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
}

async function notifyAboutNearByEvents() {
    // Get all the users who have enabled email notifications and have not been notified in the last 30 minutes
    // Also, update the last_notification_check field to the current time
    const users = await prisma.user.findMany({
        where: {
            is_email_notifications_enabled: true,
            last_notification_check: {
                lt: new Date(new Date().getTime() - (30 * 1000))
            }
        }
    });

    if (users.length > 0) {

        users.forEach(async user => {
            // Get all the events that are ongoing or upcoming
            const events = await prisma.event.findMany({
                where: {
                    date_time: {
                        gte: new Date()
                    }
                }
            });

            let notification_content = "";

            // Prepare the notification
            for (const event of events) {

                const userCoordinatesLat = user.addr_geocoordinates.split(",")[0];
                const userCoordinatesLng = user.addr_geocoordinates.split(",")[1];
                const eventCoordinates = JSON.parse(event.location_geocoordinates);

                // Check if the distance is less than 10 kms
                const distance = calculateDistance(
                    userCoordinatesLat,
                    userCoordinatesLng,
                    eventCoordinates.lat,
                    eventCoordinates.lng
                );

                if (distance <= 10000) {
                    // Preparing the notification
                    console.log(`Preparing the notification for event: ${event.name} to user: ${user.user_name}`);
                    let eventDetails = `Event: <a href="https://eventhive.live/#/events/${event.uuid}">${event.name}</a> is scheduled for ${event.date_time}<br>`;
                    if ((notification_content.length + eventDetails.length) < 4096) {
                        notification_content += eventDetails;
                    } else {
                        break;
                    }
                }

            }


            // Send the notification to the user
            if (notification_content.length > 0) {
                await prisma.notification.create({
                    data: {
                        notification_status: "PENDING",
                        content: notification_content,
                        user_id: user.user_id
                    }
                });
            }
        });
    }

    // Update the last_notification_check field to the current time
    await prisma.user.updateMany({
        where: {
            is_email_notifications_enabled: true,
            last_notification_check: {
                lt: new Date(new Date().getTime() - (30 * 1000))
            }
        },
        data: {
            last_notification_check: new Date()
        }
    });
}

async function sendNotifications(){
    const notificationsToSend = await prisma.notification.findMany({
        where: {
            notification_status: "PENDING"
        }
    });

    // Mark them as UNREAD
    // await prisma.notification.updateMany({
    //     where: {
    //         notification_status: "PENDING"
    //     },
    //     data: {
    //         notification_status: "UNREAD"
    //     }
    // });

    // Send the notifications
    notificationsToSend.forEach( async (notification)  => {
        console.log(`Sending the notification to user: ${notification.user_id}`);
        // Send the notification
        // SendEmail(notification.user_id, notification.content);
        const emailAddress = await prisma.emailAddress.findFirst({
            where: {
                user_id: notification.user_id
            }
        });
        sendEmail([emailAddress.email], notification.title, notification.content, notification.content);
    });
}

// Write a infinite loop to run the cronjob, it should run every 30 seconds
(async () => {
    while (true) {
        console.log("Running the cronjob");
        console.log("Notifying about nearby events");
        await notifyAboutNearByEvents();
        console.log("Sending PENDING notifications");
        await sendNotifications();
        await new Promise(resolve => setTimeout(resolve, 30000));
    }
})();