import express from 'express';
import {
    PrismaClient
} from '../../modules/prisma_client/index.js';
import {
    query,
    body,
    validationResult
} from 'express-validator';

const prisma = new PrismaClient()
const router = express.Router();


// Using middleware to check authentication and authorization of /admin
const checkAuth = (req, res, next) => {
    if (req.session.isLoggedIn) {
        if (req.session.role == "EVENT_OWNER") {
            next();
        } else {
            res.status(401);
            return res.send("Unauthorized");
        }
    } else {
        res.status(403);
        return res.send("Forbidden");
    }
}

router.use(checkAuth);

router.post(
    "/verify-account",
    body("face_image").notEmpty().isURL({
        protocols: ["https"],
        host_whitelist: "uploads.eventhive.io" // TODO: Change this to our own S3 bucket later
    }),
    body("nic_front").notEmpty().isURL(),
    body("nic_back").notEmpty().isURL(),
    body("notes").notEmpty().isLength({
        max: 1024
    }),
    async (req, res) => {

        try {
            await prisma.verification.create({
                data: {
                    event_owner_id: req.session.userId,
                    verificarion_status: "PENDING",
                    verification_notes: body['notes'],
                    face_image_link: res.body['face_image'],
                    nicback_image_link: res.body['nic_front'],
                    nicfront_image_link: res.body['nic_back'],
                }
            });
        } catch (error) {
            res.status(500)
            return res.json({
                success: false,
                msg: "Something went wrong, please try again later."
            })
        }

        return res.json({
            success: true,
            msg: "Please wait until we verify your account."
        });
    })

export default router;