import express from 'express';
import {
    PrismaClient
} from '../../modules/prisma_client/index.js';
import {
    query,
    body,
    validationResult
} from 'express-validator';

// Routes
import MobileVerificationRouter from './mobile-pin.js';
import FileUploadHandler from './file-upload-handling.js';
import EventsHandler from './events/index.js';

const prisma = new PrismaClient()
const router = express.Router();


// Using middleware to check authentication and authorization of /admin
const checkAuth = (req, res, next) => {
    if (req.session.isLoggedIn) {
        if (req.session.role == "EVENT_OWNER" || req.session.role == "ADMIN") {
            next();
        } else {
            console.log(req.session)
            res.status(401);
            return res.json({
                msg: "Unauthorized"
            });
        }
    } else {
        res.status(403);
        return res.json({
            msg: "Forbidden"
        });
    }
}

router.use(checkAuth);

router.post(
    "/verify-account",
    body("face_image").notEmpty().isURL({
        protocols: ["https"],
        host_whitelist: ["eventhive.sgp1.digitaloceanspaces.com"]
    }),
    body("nic_front").notEmpty().isURL({
        protocols: ["https"],
        host_whitelist: ["eventhive.sgp1.digitaloceanspaces.com"] // TODO: Change this to our own S3 bucket later
    }),
    body("nic_back").notEmpty().isURL({
        protocols: ["https"],
        host_whitelist: ["eventhive.sgp1.digitaloceanspaces.com"] // TODO: Change this to our own S3 bucket later
    }),
    body("notes").isLength({
        max: 1024
    }),
    async (req, res) => {

        // Input Validation
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(400);
            return res.json({ errors: result.array() });
        }

        try {
            // Checking if there are any previous verifications
            const _prevObj = await prisma.verification.findFirst({
                where: {
                    owner_id: req.session.user_id
                }
            })
            if (_prevObj) {
                return res.json({
                    success: false,
                    msg: "You have a verification request pending. Please wait."
                })
            }

            // Creating the new verification request
            await prisma.verification.create({
                data: {
                    user: {
                        connect: {
                            user_id: req.session['user_id']
                        }
                    },
                    verification_status: "PENDING",
                    verification_notes: req.body['notes'],
                    face_image_link: req.body['face_image'],
                    nicback_image_link: req.body['nic_front'],
                    nicfront_image_link: req.body['nic_back'],
                }
            });
        } catch (error) {
            console.error(error)
            res.status(500)
            return res.json({
                success: false,
                msg: "Something went wrong, please try again later."
            })
        }

        return res.json({
            success: true,
            msg: "Please wait until we verify your account."
        });
    })

router.get("/verification-status", async (req, res) => {
    const verificationObj = await prisma.verification.findFirst({
        where: {
            owner_id: req.session.user_id
        }
    })

    if (verificationObj != null){
        return res.json({
            status: verificationObj.verificarion_status
        });
    } else {
        return res.json({
            status: "N/A"
        });
    }
    
})

router.get("/tickets", async (req, res) => {
    const tickets = await prisma.ticket.findMany({
        where: {
            event: {
                owner_id: req.session.user_id
            }
        },
        select: {
            ticket_id: true,
            event: {
                select: {
                    name: true,
                    event_id: true,
                }
            },
            price: true,
            name: true,
            description: true
        }
    })
    if (tickets == null) {
        return res.json([]);
    }
    return res.json(tickets);
});

router.get("/ticket-payments/:id", async (req, res) => {

    // check if the ticket_id is a number
    if (isNaN(req.params.id)) {
        res.status(400);
        return res.json({
            success: false,
            msg: "Invalid ticket id."
        });
    }

    const ticket = await prisma.ticket.findUnique({
        where: {
            ticket_id: parseInt(req.params.id),
            event: {
                owner_id: req.session.user_id
            }
        },
        select: {
            ticket_id: true,
            event: {
                select: {
                    name: true,
                    event_id: true,
                    images: true
                }
            },
            price: true,
            name: true,
            description: true
        }
    })
    if (ticket == null) {
        res.status(400);
        return res.json({
            success: false,
            msg: "Ticket not found."
        });
    }

    const payments = await prisma.ticketReceipt.findMany({
        where: {
            ticket_id: ticket.ticket_id
        },
        select: {
            cost: true,
            created_at: true,
            payment_method: true,
            payment: {
                select: {
                    status: true,
                    created_at: true,
                    amount: true,
                    user: {
                        select: {
                            user_name: true,
                            first_name: true,
                            last_name: true,
                            profile_image: true,
                            email_address: {
                                select: {
                                    email: true,
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    return res.json({
        success: true,
        ticket: ticket,
        payments: payments
    });
});

router.delete("/tickets/:ticket_id", async (req, res) => {
    
    // check if the ticket_id is a number
    if (isNaN(req.params.ticket_id)) {
        res.status(400);
        return res.json({
            success: false,
            msg: "Invalid ticket id."
        });
    }
    
    const ticket_id = parseInt(req.params.ticket_id);

    try {
        const result = await prisma.ticket.delete({
            where: {
                ticket_id: ticket_id,
                event: {
                    owner_id: req.session.user_id
                }
            }
        });
        console.log(result);
        return res.json({
            success: true,
            msg: "Ticket deleted successfully."
        });
    } catch (error) {
        console.error(error);
        res.status(500);
        return res.json({
            success: false,
            msg: "Failed to delete ticket."
        });
    }
});

// routes
router.use("/mobile-verification", MobileVerificationRouter);
router.use("/file", FileUploadHandler);
router.use("/events", EventsHandler);

export default router;