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
        const emailAddress = await prisma.emailAddress.findMany({
            where: {
                email_id: users[i].email_id
            }
        });
        const phoneNumber = await prisma.phoneNumber.findMany({
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
    const result = await prisma.user.update({
        where: {
            user_id: parseInt(id)
        },
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

router.delete('/:id', async (req, res) => {
    const {
        id
    } = req.params;
    const result = await prisma.user.delete({
        where: {
            user_id: parseInt(id)
        }
    });
    res.json(result);
});

export default router;