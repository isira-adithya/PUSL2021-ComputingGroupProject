import express from "express";
import {
    PrismaClient
} from '../../../modules/prisma_client/index.js';
import {getApprovalLink} from '../../../modules/paypal/payments.js';
const prisma  = new PrismaClient();
const router = express.Router();


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

        const approvalLink = await getApprovalLink((ticket.price * quantity), "Ticket purchase", "http://www.eventhive.local/api/common/payments/success", "http://www.eventhive.local/api/common/payments/cancel");
        console.log(approvalLink);

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