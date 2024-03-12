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
                event_id: event_uuid,
                user_id: user_id,
                comment: comment
            }
        });
        res.status(200).json(newComment);
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Something went wrong"
        });
    }
});

router.delete('/:id', isLoggedIn, async (req, res) => {
    const comment_id = req.params.id;
    const user_id = req.session.user_id;

    // Check if the comment_id is a number
    if (isNaN(comment_id)) {
        return res.status(400).json({
            success: false,
            msg: "Invalid comment_id"
        });
    }

    try {
        const comment = await prisma.comment.findFirst({
            where: {
                comment_id: parseInt(comment_id)
            }
        });
        if (comment.user_id !== user_id) {
            res.status(401).json({
                success: false,
                msg: "Unauthorized"
            });
        } else {
            await prisma.comment.delete({
                where: {
                    comment_id: parseInt(comment_id)
                }
            });
            return res.status(200).json({
                success: true,
                msg: "Comment deleted"
            });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            msg: "Something went wrong"
        });
    }
});

export default router;