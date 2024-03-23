import express from "express";
import {
    PrismaClient
} from '../../../modules/prisma_client/index.js';
import {getApprovalLink} from '../../../modules/paypal/payments.js';
const prisma  = new PrismaClient();
const router = express.Router();



export default router;