import {
    PrismaClient
} from '../modules/prisma_client/index.js';

const prisma = new PrismaClient();

// Write a infinite loop to run the cronjob, it should run every 30 seconds
(async () => {
    while (true) {
        const users = await prisma.user.findMany({
            where: {
                is_email_notifications_enabled: true,
                last_notification_check: {
                    lte: new Date(new Date().getTime() - 30 * 60 * 1000)
                }
            }
        });

        if (users.length > 0) {

            // Get all the events that are ongoing or upcoming and that are not yet notified
            const events = await prisma.event.findMany({
                where: {
                    date_time:  {
                        gte: new Date()
                    }
                }
            });

            // Send notifications for each event
            for (const event of events) {
                // Send notification
                console.log(`Sending notification for event: ${event.id}`);
                
                // Update the event to mark it as notified
                await prisma.event.update({
                    where: {
                        id: event.id
                    },
                    data: {
                        notifications_sent: true
                    }
                });
            }
        }
        
        await new Promise(resolve => setTimeout(resolve, 30000));
    }
})();