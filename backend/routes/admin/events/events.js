import express from 'express';
import {
    PrismaClient
} from '../../../modules/prisma_client/index.js';
import {
    query,
    body,
    validationResult
} from 'express-validator';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async (req, res) => {
    const events = await prisma.event.findMany();
    res.json(events);
});

// Get all events that are visible to the public
router.get('/:id', async (req, res) => {
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
                return ticket.hasOwnProperty('id') && ticket.hasOwnProperty('name') && ticket.hasOwnProperty('price') && ticket.hasOwnProperty('description');
            });
            // if (!validTickets) {
            //     return res.status(400).json({
            //         message: "Invalid tickets object"
            //     });
            // }

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
            console.log(image)
            try {
                const urlObj = new URL(image);
                console.log(urlObj.hostname)
                if (urlObj.hostname != 'eventhive.sgp1.digitaloceanspaces.com') {
                    validImages = false;
                }
            } catch (e) {
                validImages = false;
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

            // Delete tickets related to this event
            await prisma.ticket.deleteMany({
                where: {
                    event_id: eventObj.event_id
                }
            });
            // Add tickets to the database
            if (tickets != null && tickets.length > 0) {
                // Adding event_id of tickets and removing id
                tickets.forEach(ticket => {
                    if (ticket.id != null){
                        ticket.ticket_id = ticket.id;
                        delete ticket.id;
                    }
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


// delete an event
router.delete('/:uuid', async (req, res) => {
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