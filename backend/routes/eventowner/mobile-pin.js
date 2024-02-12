import express from 'express';
const router = express.Router();
import {
    query,
    body,
    validationResult
} from 'express-validator';
import {sendSms} from '../../modules/sms/sendSms.js';

router.post(
    "/request-pin",
    body("phonenumber").isMobilePhone(),
    async (req, res) => {
        try {
            // await sendSms(req.body['phonenumber'], 12345);
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