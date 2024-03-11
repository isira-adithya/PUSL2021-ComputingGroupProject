import express from 'express';
import {
    PrismaClient
} from '../../../modules/prisma_client/index.js';
import {
    isLoggedIn
} from '../../auth/middlewares.js';

const prisma = new PrismaClient();
const router = express.Router();

router.post('/new', isLoggedIn, async (req, res) => {
    const {
        event_uuid,
        comment
    } = req.body;
    const user_id = req.session.user_id;
    try {
        const newComment = await prisma.comment.create({
            data: {
                event_uuid,
                user_id,
                comment
            }
        });
        res.status(200).json(newComment);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

export default router;