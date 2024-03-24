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

export default router;