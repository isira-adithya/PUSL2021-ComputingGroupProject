import express from 'express';
import {
    PrismaClient
} from '../../../modules/prisma_client/index.js';

const prisma = new PrismaClient();
const router = express.Router();

// Get all verifications
router.get('/', async (req, res) => {
    const verifications = await prisma.verification.findMany();
    for (let i = 0; i < verifications.length; i++) {
        const user = await prisma.user.findUnique({
            where: {
                user_id: verifications[i].owner_id
            }
        });
        const emailAddress = await prisma.emailAddress.findUnique({
            where: {
                email_id: user.email_id
            }
        });
        const phoneNumber = await prisma.phoneNumber.findUnique({
            where: {
                phone_id: user.phone_id
            }
        });
        verifications[i].user = user;
        verifications[i].user.email = emailAddress;
        verifications[i].user.phoneNumber = phoneNumber;
    }
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