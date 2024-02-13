import express from 'express';
const router = express.Router();
import {
    query,
    body,
    validationResult
} from 'express-validator';
import {sendSms} from '../../modules/sms/sendSms.js';
import {
    PrismaClient
} from '../../modules/prisma_client/index.js';

const prisma = new PrismaClient();

// Request PIN route
router.post(
    "/request-pin",
    async (req, res) => {
        try {
            const pinCode = Math.floor(100000 + Math.random() * 900000);
            await prisma.user.update(
                {
                    where: {
                        user_id: req.session['user_id']
                    },
                    data: {
                        verification_code: pinCode
                    }
                }
            );
            const phonenumber = req.session['phone_number'];
            sendSms(phonenumber, pinCode);
            return res.json({
                success: true,
                msg: "PIN Code was sent."
            });
        } catch (err) {
            res.status(501);
            return res.json({
                success: false,
                msg: "Internal Server Error"
            });
        }
        
    }
);


// Check PIN route
router.post(
    "/verify-pin",
    body("pin").isNumeric(),
    async (req, res) => {
        try {
            const pinCode = req.body['pin'];

            // get the correct code from the database
            const user = await prisma.user.findFirst({
                where: {
                    user_id: req.session['user_id']
                }
            });
            
            if (user.verification_code == pinCode){
                await prisma.user.update(
                    {
                        where: {
                            user_id: req.session['user_id']
                        },
                        data: {
                            phone_number_verified: true
                        }
                    }
                );
            }
            
            return res.json({
                success: true,
                msg: "PIN Code was sent."
            });
        } catch (err) {
            res.status(501);
            return res.json({
                success: false,
                msg: "Internal Server Error"
            });
        }
        
    }
);


export default router;