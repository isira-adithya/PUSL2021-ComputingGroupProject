import express from "express";
import { isLoggedIn } from "../../auth/middlewares.js";
import {
    PrismaClient
} from '../../../modules/prisma_client/index.js';
import {
    body,
    validationResult
} from 'express-validator';
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
});

router.put("/", 
        isLoggedIn, 
        body('first_name').isString().isLength({ min: 1, max: 100 }),
        body('last_name').isString().isLength({ min: 1, max: 100 }),
        body('address').isString().isLength({ min: 1, max: 250 }),
        body('notification_preference').isString().isLength({ min: 1, max: 20 }),
        body('phone').isMobilePhone(),
        async (req, res) => {

    // Input Validation
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.status(400);
        return res.json({
            errors: result.array()
        });
    }

    // Checking notification_preference, it should be ENABLED OR DISBALED
    if(req.body.notification_preference !== "ENABLED" && req.body.notification_preference !== "DISABLED") {
        res.status(400);
        return res.json({
            success: false,
            msg: "Invalid notification_preference"
        });
    }

    // Update User
    await prisma.user.update({
        where: {
            user_id: req.session.user_id
        },
        data: {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            address: req.body.address,
            notification_preference: req.body.notification_preference
        }
    });

    res.json({
        success: false,
        msg: "Internal Server Error. Please try again later."
    });
})

export default router;