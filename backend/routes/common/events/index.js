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

    // TODO: Remove expired events
    res.json(event);
});

export default router;