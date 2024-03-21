import {
    PrismaClient
} from '../modules/prisma_client/index.js';
import {sendEmail} from '../modules/emails/mailgun.js';
import md5 from 'md5';

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

async function addToNotificationQueue(user_id, title, content) {

    // Get the MD5 hash of the content
    const hash = md5(content);

    // Check if there are any SENT notifications in the last 3 days
    const notifications = await prisma.notification.findMany({
        where: {
            user_id: user_id,
            notification_status: "SENT",
            content_hash: hash,
            sent_at: {
                gte: new Date(new Date().getTime() - (3 * 24 * 60 * 60 * 1000))
            },
        }
    });

    console.log(`[DEBUG] Found ${notifications.length} notifications in the last 3 days`)

    if (notifications.length <= 0) {
        await prisma.notification.create({
            data: {
                notification_status: "PENDING",
                title: title,
                content: content,
                content_hash: hash,
                user_id: user_id
            }
        });
    }
}

async function notifyAboutNearByEvents() {
    // Get all the users who have enabled email notifications and have not been notified in the last 30 minutes
    // Also, update the last_notification_check field to the current time
    const users = await prisma.user.findMany({
        where: {
            notification_preference: "EMAILS",
            last_notification_check: {
                lt: new Date(new Date().getTime() - (30 * 1000))
            }
        }
    });

    if (users.length > 0) {
        for (const user of users) {
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
                await addToNotificationQueue(user.user_id, "Nearby Events - EventHive", notification_content);
            }
        }
    }

    // Update the last_notification_check field to the current time
    await prisma.user.updateMany({
        where: {
            notification_preference: "EMAILS",
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

    // Send the notifications
    for (const notification of notificationsToSend) {
        console.log(`[DEBUG] Sending the notification to user_id: ${notification.user_id}`);
        // Send the notification
        const emailAddress = await prisma.emailAddress.findFirst({
            where: {
                User: {
                    some: {
                        user_id: notification.user_id
                    }
                }
            }
        });
        console.log(`[DEBUG] Sent Email To Email address: ${emailAddress.email}`);
        const isSent = await sendEmail([emailAddress.email], notification.title, notification.content, notification.content);
        if (isSent){
            await prisma.notification.update({
                where: {
                    notification_id: notification.notification_id,
                },
                data: {
                    notification_status: "SENT",
                    sent_at: new Date()
                }
            });
        } else {
            await prisma.notification.update({
                where: {
                    notification_id: notification.notification_id
                },
                data: {
                    notification_status: "FAILED"
                }
            });
        }
        await new Promise(resolve => setTimeout(resolve, 500));
    }
}

// Write a infinite loop to run the cronjob, it should run every 5 minutes
async function main() {
    while (true) {
        console.log("[CRON] Running the cronjob at: " + new Date().toISOString());
        console.log("[CRON] Notifying about nearby events");
        await notifyAboutNearByEvents();
        console.log("[CRON] Sending PENDING notifications");
        await sendNotifications();
        console.log("[CRON] Cronjob finished at: " + new Date().toISOString() + "\n");
        await new Promise(resolve => setTimeout(resolve, 360000));
    }
}

await main();