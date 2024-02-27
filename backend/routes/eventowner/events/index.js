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
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    const events = await prisma.event.findMany({
        where: {
            owner_id: req.session.user_id
        }
    });
    events.forEach(event => {
        event.images = event.images.split(',');
        event.location_geocoordinates = JSON.parse(event.location_geocoordinates);
        delete event.owner_id;
    });
    res.json(events);
});

router.get('/:uuid', async (req, res) => {
    const event = await prisma.event.findFirst({
        where: {
            uuid: req.params.uuid,
            owner_id: req.session.user_id
        }
    });

    if (event == null) {
        return res.status(404).json({
            message: "Event not found"
        });
    }

    // Parse the images and location_geocoordinates
    event.images = event.images.split(',');
    event.location_geocoordinates = JSON.parse(event.location_geocoordinates);

    // Get tickets related to the event
    const tickets = await prisma.ticket.findMany({
        where: {
            event_id: event.event_id
        }
    })
    event.tickets = tickets;

    res.json(event);
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
    }).custom(value => {
        if (value != "sports" && value != "musical" && value != "other" && value != "charity" && value != "religious" && value != "educational") {
            throw new Error("Invalid category");
        }
        return true;
    }),
    body("visibility").isLength({
        max: 255
    }).custom(value => {
        if (value != "public" && value != "private" && value != "unlisted") {
            throw new Error("Invalid category");
        }
        return true;
    }),
    body("location").isLength({
        max: 255
    }),
    body("geo_coordinates").isObject(),
    body("tickets").isArray().optional({
        nullable: true
    }),
    async (req, res) => {

        // Input Validation
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(400);
            return res.json({
                errors: result.array()
            });
        }


        // Validate tickets objects
        const tickets = req.body.tickets;
        if (tickets != null && tickets.length > 0) {
            const validTickets = tickets.every(ticket => {
                return ticket.hasOwnProperty('id') && ticket.hasOwnProperty('name') && ticket.hasOwnProperty('price') && ticket.hasOwnProperty('description');
            });
            if (!validTickets) {
                return res.status(400).json({
                    message: "Invalid tickets object"
                });
            }

            // Checking ticket price
            tickets.forEach(ticket => {
                if (ticket.price < 0) {
                    return res.status(400).json({
                        message: "Invalid ticket price"
                    });
                }
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

        try {

            // Add the event to the database
            const eventObj = await prisma.event.create({
                data: {
                    name: req.body.name,
                    description: req.body.details,
                    images: req.body.images.toString(),
                    date_time: new Date(req.body.date_time * 1000),
                    category: req.body.category,
                    location: req.body.location,
                    location_geocoordinates: JSON.stringify(req.body.geo_coordinates),
                    owner_id: req.session.user_id,
                    visibility: req.body.visibility,
                    uuid: uuidv4()
                }
            });


            if (tickets != null && tickets.length > 0) {
                // Adding event_id of tickets and removing id
                tickets.forEach(ticket => {
                    delete ticket.id;
                    ticket.event_id = eventObj.event_id;
                });

                // Add tickets to the database
                await prisma.ticket.createMany({
                    data: tickets
                });
            }


            return res.json({
                success: true,
                msg: "Event created successfully"
            })
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                message: "Internal server error"
            });
        }
})

router.put(
    '/:uuid',
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
    }).custom(value => {
        if (value != "sports" && value != "musical" && value != "other" && value != "charity" && value != "religious" && value != "educational") {
            throw new Error("Invalid category");
        }
        return true;
    }),
    body("visibility").isLength({
        max: 255
    }).custom(value => {
        if (value != "public" && value != "private" && value != "unlisted") {
            throw new Error("Invalid category");
        }
        return true;
    }),
    body("location").isLength({
        max: 255
    }),
    body("geo_coordinates").isObject(),
    body("tickets").isArray().optional({
        nullable: true
    }),
    async (req, res) => {

        // Input Validation
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(400);
            return res.json({
                errors: result.array()
            });
        }


        // Validate tickets objects
        const tickets = req.body.tickets;
        if (tickets != null && tickets.length > 0) {
            const validTickets = tickets.every(ticket => {
                return ticket.hasOwnProperty('ticket_id') && ticket.hasOwnProperty('name') && ticket.hasOwnProperty('price') && ticket.hasOwnProperty('description');
            });
            if (!validTickets) {
                return res.status(400).json({
                    message: "Invalid tickets object"
                });
            }

            // Checking ticket price
            tickets.forEach(ticket => {
                if (ticket.price < 0) {
                    return res.status(400).json({
                        message: "Invalid ticket price"
                    });
                }
            });
        }

        // Validate images array
        const images = req.body.images;
        let validImages = images.every(image => {
            return typeof image === 'string';
        });

        images.every(image => {
            try {
                const urlObj = new URL(image);
                if (urlObj.hostname != 'pusl2024-cgp.sgp1.digitaloceanspaces.com') {
                    validImages = false;
                }
            } catch (e) {
                validImages = false;
            }
        });

        if (validImages) {
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

        try {

            // Update the event in the database
            const eventObj = await prisma.event.update({
                where: {
                    uuid: req.params.uuid
                },
                data: {
                    name: req.body.name,
                    description: req.body.details,
                    images: req.body.images.toString(),
                    date_time: new Date(req.body.date_time * 1000),
                    category: req.body.category,
                    location: req.body.location,
                    location_geocoordinates: JSON.stringify(req.body.geo_coordinates),
                    visibility: req.body.visibility
                }
            });

            // TODO: Handle Tickets


            return res.json({
                success: true,
                msg: "Event created successfully"
            })
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                message: "Internal server error"
            });
        }
})

export default router;