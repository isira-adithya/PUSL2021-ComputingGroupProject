import express from "express";
import { isLoggedIn } from "../../auth/middlewares.js";
import {
    PrismaClient
} from '../../../modules/prisma_client/index.js';
import {
    body,
    validationResult
} from 'express-validator';
import {sendEmail} from "../../../modules/emails/mailgun.js";
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

    // Converting user.addr_geocoordinates to a json object
    if(user.addr_geocoordinates) {
        const addr_geocoordinates = user.addr_geocoordinates.split(",");
        user.addr_geocoordinates = {
            lat: parseFloat(addr_geocoordinates[0]),
            lng: parseFloat(addr_geocoordinates[1])
        }
    }

    res.json({
        username: user.user_name,
        role: user.role,
        first_name: user.first_name,
        last_name: user.last_name,
        address: user.address,
        notification_preference: user.notification_preference,
        is_verified: user.is_verified,
        email: emailObj.email,
        phone: phoneObj.number,
        profile_image: user.profile_image,
        address_geo_cooridinates: user.addr_geocoordinates
    });
});

router.put("/", 
        isLoggedIn, 
        body('first_name').isString().isLength({ min: 1, max: 100 }),
        body('last_name').isString().isLength({ min: 1, max: 100 }),
        body('address').isString().isLength({ min: 1, max: 250 }),
        body('notification_preference').isString().isLength({ min: 1, max: 20 }),
        body('phone').isMobilePhone(),
        body('profile_image').isURL({
            host_whitelist: [
                'eventhive.sgp1.digitaloceanspaces.com',
                'www.eventhive.local',
                'source.boringavatars.com' // Random Avatar Image API
            ]
        }).optional(),
        body('address_geo_cooridinates').isObject(),
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

    // There should be lat and lng in address_geo_cooridinates and they should numbers
    if(!req.body.address_geo_cooridinates.lat || !req.body.address_geo_cooridinates.lng || isNaN(req.body.address_geo_cooridinates.lat) || isNaN(req.body.address_geo_cooridinates.lng)) {
        res.status(400);
        return res.json({
            success: false,
            msg: "Invalid address_geo_cooridinates"
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
            addr_geocoordinates: `${req.body.address_geo_cooridinates.lat},${req.body.address_geo_cooridinates.lng}`,
            notification_preference: req.body.notification_preference,
            profile_image: req.body.profile_image ? req.body.profile_image : null,
        }
    });

    res.json({
        success: true,
        msg: "Profile Updated Successfully"
    });
})

router.post("/send-verification-email", async (req, res) => {
    const user = await prisma.user.findFirst({
        where: {
            user_id: req.session.user_id
        }
    });

    const emailAddress = await prisma.emailAddress.findFirst
    ({
        where: {
            email_id: user.email_id
        }
    });

    if (emailAddress.is_verified) {
        res.status(400);
        return res.json({
            success: false,
            msg: "Email is already verified"
        });
    }

    // Send Verification Email
    const verificationToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    try {
        await prisma.emailAddress.update({
            where: {
                email_id: user.email_id
            },
            data: {
                verification_code: verificationToken
            }
        });

        const link = `https://eventhive.live/#/verify-email/${verificationToken}`;

        await sendEmail([emailAddress.email], "Email Verification", `Click on the link to verify your email: ${link}`, `Click on the link to verify your email: <a href="${link}">${link}</a>`);
        
        res.json({
            success: true,
            msg: "Verification Email Sent Successfully"
        });
    } catch (error) {
        res.status(500);
        return res.json({
            success: false,
            msg: "Error while updating verification code"
        });
    }

});

router.post("/verify-email", async (req, res) => { 
    const emailAddress = await prisma.emailAddress.findFirst
    ({
        where: {
            verification_code: req.body.verification_code
        }
    });

    if (emailAddress == null){
        res.status(400);
        return res.json({
            success: false,
            msg: "Invalid Verification Code"
        });
    }

    if (emailAddress.is_verified) {
        res.status(400);
        return res.json({
            success: false,
            msg: "Email is already verified"
        });
    }

    // Update Email Address
    await prisma.emailAddress.update({
        where: {
            email_id: emailAddress.email_id
        },
        data: {
            is_verified: true
        }
    });

    res.json({
        success: true,
        msg: "Email Verified Successfully"
    });
});

export default router;