import express from 'express';
import {
    PrismaClient
} from '../../../modules/prisma_client/index.js';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async (req, res) => {
    const events = await prisma.event.findMany();
    res.json(events);
});

// Get all events that are visible to the public
router.get('/:id', async (req, res) => {
    const {
        id
    } = req.params;
    const event = await prisma.event.findUnique({
        where: {
            event_id: parseInt(id)
        }
    });
    res.json(event);
});

// Create a new event
router.post('/', async (req, res) => {
    const {
        name,
        date_time,
        description,
        venue,
        images,
        category,
        location,
        location_geocoordinates,
        visibility,
        uuid,
        owner_id
    } = req.body;
    const newEvent = await prisma.event.create({
        data: {
            name: name,
            date_time: date_time,
            description: description,
            venue: venue,
            images: images,
            category: category,
            location: location,
            location_geocoordinates: location_geocoordinates,
            visibility: visibility,
            uuid: uuid,
            owner_id: owner_id
        }
    });
    res.json(newEvent);
});

// Update an event
router.put('/:id', async (req, res) => {
    const {
        id
    } = req.params;
    const {
        name,
        date_time,
        description,
        venue,
        images,
        category,
        location,
        location_geocoordinates,
        visibility,
        uuid,
        owner_id
    } = req.body;
    const updatedEvent = await prisma.event.update({
        where: {
            event_id: parseInt(id)
        },
        data: {
            name: name,
            date_time: date_time,
            description: description,
            venue: venue,
            images: images,
            category: category,
            location: location,
            location_geocoordinates: location_geocoordinates,
            visibility: visibility,
            uuid: uuid,
            owner_id: owner_id
        }
    });
    res.json(updatedEvent);
});


// delete an event
router.delete('/:id', async (req, res) => {
    const {
        id
    } = req.params;
    const deletedEvent = await prisma.event.delete({
        where: {
            event_id: parseInt(id)
        }
    });
    res.json(deletedEvent);
});

export default router;