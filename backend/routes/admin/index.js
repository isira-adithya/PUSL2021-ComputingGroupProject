import express from 'express';
import {
    PrismaClient
} from '../../modules/prisma_client/index.js';
import {
    query, body, validationResult
} from 'express-validator';

const prisma = new PrismaClient()
const router = express.Router();


// Using middleware to check authentication and authorization of /admin
const checkAuth = (req, res, next) => {
    if (req.session.isLoggedIn){
        if (req.session.role == "ADMIN"){
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

router.get("/test", (req, res) => {
    return res.json({
        success: true
    });
})

export default router;