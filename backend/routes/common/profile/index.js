import express from "express";
import { isLoggedIn } from "../../auth/middlewares.js";
import {
    PrismaClient
} from '../../../modules/prisma_client/index.js';
import {
    body,
    validationResult
} from 'express-validator';
import { sendEmail } from "../../../modules/emails/mailgun.js";
const prisma = new PrismaClient()
const router = express.Router();


router.get("/", isLoggedIn, async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            user_id: req.session.user_id
        }
    });

    if (user === null) {
        res.status(404);
        return res.json({
            success: false,
            msg: "User not found"
        });
    }
    

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
    if (user.addr_geocoordinates) {
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
        body('notification_preference').isString().custom((value) => {
            // Allowed Values EMAILS, SMS, PUSH, ALL, NONE
            if (value !== "EMAILS" && value !== "SMS" && value !== "PUSH" && value !== "ALL" && value !== "NONE") {
                throw new Error('Invalid notification_preference');
            }
            return true;
        }),
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

        // There should be lat and lng in address_geo_cooridinates and they should numbers
        if (!req.body.address_geo_cooridinates.lat || !req.body.address_geo_cooridinates.lng || isNaN(req.body.address_geo_cooridinates.lat) || isNaN(req.body.address_geo_cooridinates.lng)) {
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


router.delete("/", async (req, res) => {

    try {
        const user = await prisma.user.findUnique({
            where: {
                user_id: req.session.user_id
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

        const events = await prisma.event.findMany({
            where: {
                owner_id: req.session.user_id
            }
        });

        const comments = await prisma.comment.findMany({
            where: {
                user_id: req.session.user_id
            }
        });

        // Deletion - Comments, Events, User, Email and Phone Number

        // Deleting Comments
        if (comments.length > 0) {
            await prisma.comment.deleteMany({
                where: {
                    user_id: req.session.user_id
                }
            });
        }

        // Deleting Events
        if (events.length > 0) {
            await prisma.event.deleteMany({
                where: {
                    owner_id: req.session.user_id
                }
            });
        }

        // Deleting Email
        await prisma.emailAddress.delete({
            where: {
                email_id: emailAddress.email_id
            }
        });

        // Deleting Phone Number
        await prisma.phoneNumber.delete({
            where: {
                phone_id: phoneNumber.phone_id
            }
        });

        // Deleting User
        await prisma.user.delete({
            where: {
                user_id: req.session.user_id
            }
        });

        res.json({
            success: true,
            msg: "User Deleted Successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "Error while deleting user"
        });
    }
});

export default router;