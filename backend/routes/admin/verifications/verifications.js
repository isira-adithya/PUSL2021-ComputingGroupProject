import express from 'express';
import {
    PrismaClient
} from '../../../modules/prisma_client/index.js';

const prisma = new PrismaClient();
const router = express.Router();

// Get all verifications
router.get('/', async (req, res) => {
    const verifications = await prisma.verification.findMany();
    res.json(verifications);
});

// Get verification by id
router.get('/:id', async (req, res) => {
    const {
        id
    } = req.params;
    const verification = await prisma.verification.findUnique({
        where: {
            verification_id: parseInt(id)
        }
    });
    res.json(verification);
});


export default router;