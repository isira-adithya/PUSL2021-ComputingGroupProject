import express from 'express';
const router = express.Router();
import {
    query,
    body,
    validationResult
} from 'express-validator';
import {
    PrismaClient
} from '../../../modules/prisma_client/index.js';
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    const events = await prisma.event.findMany();
    res.json(events);
});

router.post(
    '/', 
    body("name").isLength({
        max: 255
    }),
    body("details").isLength({
        max: 1024
    }),
    body("images").isArray(),
    body("date_time").isNumeric(),
    body("category").isLength({
        max: 255
    }),
    body("location").isLength({
        max: 255
    }),
    body("geo_coordinates").isObject(),
    body("tickets").isArray(),
    async (req, res) => {

    // Input Validation
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.status(400);
        return res.json({ errors: result.array() });
    }


    // Validate tickets objects
    const tickets = req.body.tickets;
    const validTickets = tickets.every(ticket => {
        return ticket.hasOwnProperty('id') && ticket.hasOwnProperty('name') && ticket.hasOwnProperty('price') && ticket.hasOwnProperty('details');
    });
    if (!validTickets) {
        return res.status(400).json({
            message: "Invalid tickets object"
        });
    }

    // Validate images array
    const images = req.body.images;
    const validImages = images.every(image => {
        return typeof image === 'string';
    });
    
    images.every(image => {
        try {
            const urlObj = new URL(image);
            if (urlObj.hostname != 'pusl2024-cgp.sgp1.digitaloceanspaces.com') {
                return res.status(400).json({
                    message: "Invalid image url"
                });
            }
        } catch (e) {
            return res.status(400).json({
                message: "Invalid image url"
            });
        }
    });

    if (!validImages) {
        return res.status(400).json({
            message: "Invalid images array"
        });
    }

    // validate geo_coordinates object
    const geo_coordinates = req.body.geo_coordinates;
    if (!geo_coordinates.hasOwnProperty('lat') || !geo_coordinates.hasOwnProperty('lng')) {
        if (typeof geo_coordinates.lat !== 'number' || typeof geo_coordinates.lng !== 'number') {
            return res.status(400).json({
                message: "Invalid geo_coordinates object"
            });
        }
        return res.status(400).json({
            message: "Invalid geo_coordinates object"
        });
    }

    return res.json({
        success: true,
        msg: "Event created successfully"
    })
})

export default router;