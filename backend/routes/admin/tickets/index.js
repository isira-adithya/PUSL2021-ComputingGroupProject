import express from 'express';
import {
    PrismaClient
} from '../../../modules/prisma_client/index.js';
const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    const tickets = await prisma.ticket.findMany({
        select: {
            ticket_id: true,
            event: {
                select: {
                    name: true,
                    event_id: true,
                    uuid: true,
                    user: {
                        select: {
                            user_name: true,
                            user_id: true
                        }
                    }
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

router.get("/payments/:id", async (req, res) => {

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
            ticket_id: parseInt(req.params.id)
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
            ticket_code: true,
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

router.delete("/:ticket_id", async (req, res) => {
    
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

export default router;