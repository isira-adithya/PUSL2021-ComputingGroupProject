import express from 'express';
import {
    PrismaClient
} from '../../../modules/prisma_client/index.js';

const prisma = new PrismaClient();
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
    const users = await prisma.user.findMany();
    for (let i = 0; i < users.length; i++) {
        users[i].password = "";
        const emailAddress = await prisma.emailAddress.findFirst({
            where: {
                email_id: users[i].email_id
            }
        });
        const phoneNumber = await prisma.phoneNumber.findFirst({
            where: {
                phone_id: users[i].phone_id
            }
        });
        users[i].email = emailAddress;
        users[i].phone = phoneNumber;
    }
    res.json(users);
});

// Get user by id
router.get('/:id', async (req, res) => {
    const {
        id
    } = req.params;
    const user = await prisma.user.findUnique({
        where: {
            user_id: parseInt(id)
        }
    });

    if (user === null) {    
        res.status(404).json({
            message: 'User not found'
        });
        return;
    }

    const emailAddress = await prisma.emailAddress.findFirst({
        where: {
            email_id: user.email_id
        }
    });
    const phoneNumber = await prisma.phoneNumber.findFirst({
        where: {
            phone_id: user.phone_id
        }
    });
    user.email = emailAddress;
    user.phone = phoneNumber;
    res.json(user);
});

// Create a new user
router.post('/', async (req, res) => {
    const {
        user_name,
        first_name,
        last_name,
        address,
        addr_geocoordinates,
        notification_preference,
        password,
        profile_image,
        phone_id,
        email_id,
        role,
        is_active,
        is_verified
    } = req.body;
    const result = await prisma.user.create({
        data: {
            user_name,
            first_name,
            last_name,
            address,
            addr_geocoordinates,
            notification_preference,
            password,
            profile_image,
            phone_id,
            email_id,
            role,
            is_active,
            is_verified
        }
    });
    res.json(result);
});


// Update an existing user
router.put('/:id', async (req, res) => {
    const {
        id
    } = req.params;
    const {
        first_name,
        last_name,
        address,
        email,
        email_verified,
        phone,
        phone_verified,
        notification_preference,
        profile_image,
        role,
        is_active,
        is_verified
    } = req.body;
    const result = await prisma.user.update({
        where: {
            user_id: parseInt(id)
        },
        data: {
            first_name: first_name,
            last_name: last_name,
            address: address,
            notification_preference: notification_preference,
            profile_image: profile_image,
            role: role,
            is_active: is_active,
            is_verified: is_verified,
            email_address: {
                update: {
                    email: email,
                    is_verified: email_verified
                }
            },
            phone: {
                update: {
                    number: phone,
                    is_verified: phone_verified
                }
            }
        }
    });
    res.json(result);
});

router.delete('/:id', async (req, res) => {
    const {
        id
    } = req.params;
    const result = await prisma.user.delete({
        where: {
            user_id: parseInt(id),
            role: {
                not: 'ADMIN'
            }
        }
    });
    res.json(result);
});

export default router;