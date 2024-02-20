import express from 'express'
import {
    PrismaClient
} from '../../../modules/prisma_client/index.js';

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res) => {
    const events = await prisma.event.findMany({
        where: {
            visibility: 'public'
        }
    });
    events.forEach(event => {
        delete event.owner_id;
    })

    // TODO: Remove expired events
    res.json(events);
});

export default router;