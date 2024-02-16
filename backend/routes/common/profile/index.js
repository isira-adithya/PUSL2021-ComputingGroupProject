import express from "express";
import { isLoggedIn } from "../../auth/middlewares.js";
import {
    PrismaClient
} from '../../../modules/prisma_client/index.js';

const prisma = new PrismaClient()
const router = express.Router();


router.get("/", isLoggedIn, async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            user_id: req.session.user_id
        }
    });

    const phoneObj = await prisma.phoneNumber.findUnique({
        where: {
            phone_id: user.phone_id
        }
    });

    const emailObj = await prisma.emailAddress.findUnique({
        where: {
            email_id: user.email_id
        }
    });

    res.json({
        username: user.user_name,
        role: user.role,
        first_name: user.first_name,
        last_name: user.last_name,
        address: user.address,
        notification_preference: user.notification_preference,
        is_verified: user.is_verified,
        email: emailObj.email,
        phone: phoneObj.number
    });
})

export default router;