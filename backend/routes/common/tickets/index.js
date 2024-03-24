import express from "express";
import {
    PrismaClient
} from '../../../modules/prisma_client/index.js';
import {getApprovalLink} from '../../../modules/paypal/payments.js';
const prisma  = new PrismaClient();
const router = express.Router();

router.get("/receipts", async (req, res) => {
    try {
        const receipts = await prisma.ticketReceipt.findMany({
            where: {
                user_id: req.session.user_id,
            },
            select: {
                ticket: {
                    select: {
                        name: true,
                        event: {
                            select: {
                                name: true,
                            }
                        }
                    }
                },
                payment: {
                    select: {
                        amount: true,
                        ticket_quantity: true,
                    }
                },
                receipt_id: true,
                payment_method: true,
                created_at: true,
            }
        });
        for (let i = 0; i < receipts.length; i++) {
            if (receipts[i].event == null) {
                receipts[i].event = {
                    name: "Event not found"
                }
            }
        }

        res.json(receipts);
    } catch (error) {
        console.log(error);
        res.status(500);
        return res.json({
            success: false,
            message: "Internal server error",
        })
    }
});

router.get("/receipts/:id", async (req, res) => {
    try {
        // Check if the req.params.id is a number
        if (isNaN(req.params.id)) {
            res.status(400);
            return res.json({
                success: false,
                message: "Invalid receipt id",
            })
        }

        const receipt = await prisma.ticketReceipt.findUnique({
            where: {
                receipt_id: parseInt(req.params.id),
                user_id: req.session.user_id,
            },
            select: {
                ticket: {
                    select: {
                        name: true,
                        price: true,
                        event: {
                            select: {
                                name: true,
                                images: true
                            }
                        }
                    }
                },
                payment: {
                    select: {
                        amount: true,
                        status: true,
                        ticket_quantity: true,
                    }
                },
                receipt_id: true,
                payment_method: true,
                ticket_code: true,
                created_at: true,
            }
        });

        if (receipt == null) {
            res.status(400);
            return res.json({
                success: false,
                message: "Receipt not found",
            })
        }

        res.json(receipt);
    } catch (error) {
        console.log(error);
        res.status(500);
        return res.json({
            success: false,
            message: "Internal server error",
        })
    }
});

router.get("/:ticket_id", async (req, res) => { 
    try {

        // Check if the req.params.ticket_id is a number
        if (isNaN(req.params.ticket_id)) {
            res.status(400);
            return res.json({
                success: false,
                message: "Invalid ticket id",
            })
        }

        const ticket_id = req.params.ticket_id;
        const ticket = await prisma.ticket.findUnique({
            where: {
                ticket_id: parseInt(ticket_id),
            },
        });

        // Get the event name
        const event = await prisma.event.findUnique({
            where: {
                event_id: ticket.event_id,
            },
            select: {
                name: true,
                images: true
            }
        });
        ticket.event_name = event.name;
        ticket.event_images = event.images.split(",");

        if (ticket == null){
            res.status(400);
            return res.json({
                success: false,
                message: "Ticket not found",
            })
        }

        res.json(ticket);
    } catch (error) {
        console.log(error);
        res.status(500);
        return res.json({
            success: false,
            message: "Internal server error",
        })
    }
});

router.post("/buy", async (req, res) => {
    try {
        const ticket_id = req.body.ticket_id;
        const quantity = req.body.quantity;

        // quantity must be a positive number
        if (isNaN(quantity) || quantity <= 0) {
            res.status(400);
            return res.json({
                success: false,
                message: "Invalid quantity",
            })
        }

        const ticket = await prisma.ticket.findUnique({
            where: {
                ticket_id: ticket_id,
            },
        });
        
        if (ticket == null){
            res.status(400);
            return res.json({
                success: false,
                message: "Ticket not found",
            })
        }

        const price = ticket.price * quantity;
        // Creating a new payment record
        const ticketPayment = await prisma.ticketPayment.create({
            data: {
                user_id: req.session.user_id,
                ticket_id: ticket_id,
                ticket_quantity: quantity,
                amount: price,
                status: "PENDING",
            }
        });

        const approvalLink = await getApprovalLink(price, "Ticket purchase", `http://www.eventhive.local/api/common/payments/success?payment_id=${ticketPayment.payment_id}`, "http://www.eventhive.local/api/common/payments/cancel");

        res.json({ success: true, approvalLink: approvalLink });
    } catch (error) {
        console.log(error)
        res.status(500);
        return res.json({
            success: false,
            message: "Internal server error",
        })
    }
    
});

export default router;