import express from 'express';
import {
    PrismaClient
} from '../../modules/prisma_client/index.js';
import {checkEmailStatus} from '../../modules/emails/mailgun.js';
import {checkSmsStatus} from '../../modules/sms/sendSms.js'
import axios from 'axios';
import config from '../../config.js';

const prisma = new PrismaClient();
const router = express.Router();


router.get("/api", (req, res) => {
    res.json({
        status: "OK",
        message: "API Server is running"
    });
});

router.get("/db", async (req, res) => {
    try {
        const data = await prisma.$queryRaw`SELECT 1 AS test`;
        if (data[0]['test'] === 1){
            return res.json({
                status: "SUCCESS",
                message: "Database is running"
            });
        } else {
            throw 'Database Response Error';
        }
        
    } catch (error) {
        return res.status(500).json({
            status: "ERROR",
            message: "Database connection failed"
        });
    }
});

router.get("/email", async (req, res) => {
    try {
        const result = await checkEmailStatus();
        if (result){
            return res.json({
                status: "SUCCESS",
                message: "Email service is running"
            });
        } else {
            throw 'Email Service Error';
        }
    } catch (error) {
        return res.status(500).json({
            status: "ERROR",
            message: "Email service not available"
        });
    }
})

router.get("/sms", async (req, res) => {
    try {
        const isSmsActive = await checkSmsStatus();
        if (isSmsActive){
            return res.json({
                status: "SUCCESS",
                message: "SMS service is running"
            });
        } else {
            throw 'SMS Service Error';
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "ERROR",
            message: "SMS service not available"
        });
    }
});

router.get("/s3", async (req, res) => {
    try {
        // Check S3 status
        const origin = config.S3_ENDPOINT.replace('https://', '');
        const bucketName = config.S3_BUCKET_NAME;
        const url = `https://${bucketName}.${origin}/status/test.txt`
        const response = await axios.get(url);
        if (response.status === 200 && response.data === 'IT_WORKS'){
            return res.json({
                status: "SUCCESS",
                message: "S3 service is running"
            });
        } else {
            throw 'S3 Service Error';   
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "ERROR",
            message: "S3 service not available"
        });
    }
});

export default router;