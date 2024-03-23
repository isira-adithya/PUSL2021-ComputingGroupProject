import express from "express";
import {
    PrismaClient
} from '../../../modules/prisma_client/index.js';
const prisma  = new PrismaClient();
const router = express.Router();

router.post("/buy", async (req, res) => {
    try {
        const ticket_id = req.body.ticket_id;
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

        console.log(ticket)

        res.json({ message: "Ticket bought successfully" });
    } catch (error) {
        res.status(500);
        return res.json({
            success: false,
            message: "Internal server error",
        })
    }
    
});

export default router;