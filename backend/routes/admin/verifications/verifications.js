import express from 'express';
import {
    PrismaClient
} from '../../../modules/prisma_client/index.js';

const prisma = new PrismaClient();
const router = express.Router();

// Get all verifications
router.get('/', async (req, res) => {
    const verifications = await prisma.verification.findMany({
        where: {
            verification_status: 'PENDING'
        }
    });
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
router.post('/:id', async (req, res) => {
    const {
        id
    } = req.params;

    // Check if the id is a number
    if (isNaN(id)) {
        return res.status(400).json({
            error: 'Invalid verification id'
        });
    }

    const verification = await prisma.verification.findUnique({
        where: {
            verification_id: parseInt(id)
        }
    });

    if (!verification) {
        return res.status(404).json({
            error: 'Verification not found'
        });
    }

    switch (req.body['verification_status']) {
        case 'VERIFIED':
            await prisma.verification.update({
                where: {
                    verification_id: parseInt(id)
                },
                data: {
                    verification_status: 'APPROVED'
                }
            });
            break;
        case 'REJECTED':
            await prisma.verification.update({
                where: {
                    verification_id: parseInt(id)
                },
                data: {
                    verification_status: 'REJECTED'
                }
            });
            break;
        default:
            return res.status(400).json({
                error: 'Invalid verification_status'
            });
    }

    return res.json({
        success: true,
        message: 'Verification status updated'
    })
});


export default router;