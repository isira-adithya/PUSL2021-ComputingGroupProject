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
            const user = await prisma.user.findFirst({
                where: {
                    user_id: req.session['user_id']
                }
            });

            const phoneNumber = await prisma.phoneNumber.update(
                {
                    where: {
                        phone_id: user.phone_id
                    },
                    data: {
                        verification_code: pinCode.toString()
                    }
                }
            );

            if (phoneNumber.is_verified){
                res.status(400);
                return res.json({
                    success: true,
                    msg: "Phone number is already verified"
                });
            }
            
            await sendSms(phoneNumber.number, `Please use the code ${pinCode} to verify your https://eventhive.live account.`);
            console.log(`[PIN] Sent to ${phoneNumber.number}`)

            return res.json({
                success: true,
                msg: "PIN Code was sent."
            });
        } catch (err) {
            console.log(err)
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
            const phoneNumber = await prisma.phoneNumber.findFirst({
                where: {
                    phone_id: user.phone_id
                }
            });
            
            if (phoneNumber.verification_code == parseInt(pinCode)){
                await prisma.phoneNumber.update({
                    where: {
                        phone_id: user.phone_id
                    },
                    data: {
                        is_verified: true,
                        verified_at: new Date()
                    }
                })

                // Updating the session
                req.session['phone_number_verified'] = true;
                console.log(`[PIN] Verified ${phoneNumber.number}`)

                return res.json({
                    success: true,
                    msg: "Phone Number is verified"
                });
            } else {
                res.status(401);
                return res.json({
                    success: true,
                    msg: "Invalid PIN"
                });
            }
            
            
        } catch (err) {
            console.error(err)

            res.status(501);
            return res.json({
                success: false,
                msg: "Internal Server Error"
            });
        }
        
    }
);


export default router;