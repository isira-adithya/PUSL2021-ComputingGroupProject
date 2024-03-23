import express from 'express'
import {
    PrismaClient
} from '../../../modules/prisma_client/index.js';

const prisma = new PrismaClient();
const router = express.Router();

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


router.get("/", async (req, res) => {
    const {
        location,
        eventType,
        startDate,
        endDate,
        geoCoordinates
    } = req.query;

    // Parse geoCoordinates if provided
    let userLatitude, userLongitude;
    if (geoCoordinates) {
        const {
            latitude,
            longitude
        } = JSON.parse(geoCoordinates);
        userLatitude = parseFloat(latitude);
        userLongitude = parseFloat(longitude);
    }

    // Convert startDate and endDate to timestamp
    const startDateTime = startDate ? new Date(startDate) : null;
    const endDateTime = endDate ? new Date(endDate) : null;

    const whereClause = {
        visibility: 'public',
        ...(location && {
            location: {
                contains: location
            }
        }),
        ...(eventType && {
            category: eventType
        }),
        ...(startDate && {
            date_time: {
                gte: startDateTime
            }
        }),
        ...(endDate && {
            date_time: {
                lte: endDateTime
            }
        }),
    };

    const events = await prisma.event.findMany({
        where: whereClause,
    });

    // Filter events based on distance from geoCoordinates
    const filteredEvents = events.filter((event) => {
        if (!userLatitude || !userLongitude) return true; // No geoCoordinates provided, keep all events

        const eventCoordinates = JSON.parse(event.location_geocoordinates);
            

        const distance = calculateDistance(
            userLatitude,
            userLongitude,
            eventCoordinates.lat,
            eventCoordinates.lng
        );

        return distance <= 10000; // 10000 meters = 10 km
    });

    filteredEvents.forEach((event) => {
        event.images = event.images.split(',');
        event.location_geocoordinates = JSON.parse(event.location_geocoordinates);
        delete event.owner_id;
    });

    res.json(filteredEvents);
});

router.get("/:uuid", async (req, res) => {
    const event = await prisma.event.findFirst({
        where: {
            uuid: req.params.uuid,
            visibility: 'public'
        }
    });

    if (event == null) {
        res.status(400);
        return res.json({
            success: false,
            msg: "Invalid UUID"
        })
    }

    event.images = event.images.split(',');
    event.location_geocoordinates = JSON.parse(event.location_geocoordinates);
    delete event.owner_id;

    // Send tickets associated with the event
    const tickets = await prisma.ticket.findMany({
        where: {
            event_id: event.event_id
        }
    });
    event.tickets = tickets;

    // Send comments associated with the event
    const comments = await prisma.comment.findMany({
        where: {
            event_id: event.id
        }
    });
    // For each comment, get the username by comment.user_id
    for (let i = 0; i < comments.length; i++) {
        const user = await prisma.user.findFirst({
            where: {
                user_id: comments[i].user_id
            }
        });
        comments[i].username = user.first_name + " " + user.last_name;
        comments[i].user_profile_image = user.profile_image ? user.profile_image : 'https://source.boringavatars.com/beam/240/';
    }
    event.comments = comments;

    // TODO: Remove expired events
    res.json(event);
});

export default router;