import express from 'express'
import {
    PrismaClient
} from '../../../modules/prisma_client/index.js';

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res) => {
    const events = await prisma.event.findMany({
        where: {
            visibility: 'public'
        }
    });
    
    events.forEach(event => {
        event.images = event.images.split(',');
        event.location_geocoordinates = JSON.parse(event.location_geocoordinates);
        delete event.owner_id;
    });

    // TODO: Remove expired events
    res.json(events);
});

router.get("/:uuid", async (req, res) => {
    const event = await prisma.event.findFirst({
        where: {
            uuid: req.params.uuid,
            visibility: 'public'
        }
    });
    
    if (event == null){
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
            event_id: event.id
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