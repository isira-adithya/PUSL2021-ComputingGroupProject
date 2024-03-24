import express from 'express';
const router = express.Router();
import {
    PrismaClient
} from '../modules/prisma_client/index.js';

const prisma = new PrismaClient();

// Session Route
router.get("/", async (req, res) => {
    if (req.session.isLoggedIn){
        // Update the session values using the database after 1 minute
        if (req.session.last_updated + 60000 < Date.now()){
            const user = await prisma.user.findUnique({
                where: {
                    user_id: req.session.user_id
                }
            });

            const email = await prisma.emailAddress.findFirst({
                where: {
                    email_id: user.email_id
                }
            });

            const phone = await prisma.phoneNumber.findFirst({
                where: {
                    phone_id: user.phone_id
                }
            });

            req.session.user_id = user.user_id;
            req.session.username = user.user_name;
            req.session.role = user.role;
            req.session.is_verified = user.is_verified;
            req.session.phone = phone.number;
            req.session.phone_number_verified = phone.is_verified;
            req.session.email = email.email;
            req.session.email_address_verified = email.is_verified;
            req.session.last_updated = Date.now();

            res.json({
                success: true,
                session: {
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
        }
        
    } else {
        res.status(401);
        res.json({
            success: false,
            msg: "Unauthorized"
        })
    }
    
})


export default router;