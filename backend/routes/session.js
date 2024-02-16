import express from 'express';
const router = express.Router();
import {
    PrismaClient
} from '../modules/prisma_client/index.js';

const prisma = new PrismaClient();

// Request PIN route
router.get("/", (req, res) => {
    if (req.session.isLoggedIn){
        res.json({
            success: true,
            session: {
                user_id: req.session.user_id,
                username: req.session.username,
                role: req.session.role,
                is_verified: req.session.is_verified,
                phone_number: req.session.phone,
                phone_number_verified: req.session.phone_number_verified,
                email_address: req.session.email,
                email_address_verified: req.session.email_address_verified,
            }
        })
    } else {
        res.status(401);
        res.json({
            success: false,
            msg: "Unauthorized"
        })
    }
    
})


export default router;