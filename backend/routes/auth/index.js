import express from 'express';
import bcrypt from 'bcrypt';
import {
    PrismaClient
} from '../../modules/prisma_client/index.js';
import crypto from 'crypto';
import {
    query, body, validationResult
} from 'express-validator';

const prisma = new PrismaClient()
const router = express.Router();

// 1. Signup endpoint
router.post(
    '/signup', 
    body("username").notEmpty().isLength({max: 20}), 
    body("password").notEmpty().isLength({min: 8}), 
    body("role").notEmpty(), 
    async (req, res) => {
        // Input Validation
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(400);
            return res.send({ errors: result.array() });
        }
        
        try {
            const {
                username,
                password,
                role
            } = req.body;

            var isAccountActive = false;

            // Checking the role
            if (role){
                switch (role) {
                    case 'VISITOR':
                        isAccountActive = true;
                        break;

                    case 'EVENT_OWNER':
                        isAccountActive = true;
                        break;

                    case 'ADMIN':
                        return res.status(400).send("Not Implemented");
                        break;
                
                    default:
                        return res.status(400).send("Invalid role");
                        break;
                }
            } else {
                return res.status(400).send("Invalid role");
            }

            // Check if the username already exists
            const existingUser = await prisma.user.findUnique({
                where: {
                    username
                },
            });

            if (existingUser) {
                return res.status(409).send('Username already exists');
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create user using Prisma
            const createdUser = await prisma.user.create({
                data: {
                    username,
                    password: hashedPassword,
                    role: role,
                    isActive: isAccountActive
                },
            });

            if (role == "EVENT_OWNER"){
                res.status(201).send('Your account will be enabled after further review');
            } else {
                res.status(201).send('User created successfully');
            }
        } catch (error) {
            console.error(error);
            res.status(500);
            res.end();
        }
});

// 2. Login endpoint
router.post(
    '/login', 
    body("username").notEmpty().isLength({max: 20}), 
    body("password").notEmpty().isLength({min: 8}), 
    async (req, res) => {
        // Input Validation
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(400);
            return res.send({ errors: result.array() });
        }
        try {
            
            const {
                username,
                password
            } = req.body;

            // Fetch user from the database using Prisma
            const user = await prisma.user.findUnique({
                where: {
                    username
                },
            });

            if (!user) {
                return res.status(401).send('Invalid username or password');
            }

            if (!user.isActive){
                return res.status(401).send('Account is under review');
            }

            // Compare the provided password with the hashed password
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(401).send('Invalid username or password');
            }

            // Store user information in the session
            req.session.userId = user.id;
            req.session.username = user.username;
            req.session.role = user.role;
            req.session.isLoggedIn = true;

            res.status(200).send('Login successful');
        } catch (error) {
            console.error(error);
            res.status(500);
            res.end();
        }
});

// 3. Logout endpoint
router.delete('/logout', (req, res) => {
    // Implement logout logic (e.g., invalidate session or JWT)
    if (req.session.isLoggedIn) {
        req.session.destroy();
        res.status(200).send('Logout successful');
    } else {
        res.status(409).send('You are not logged in');
    }
});

// Password reset request
router.post(
    '/reset-password/request', 
    body("username").notEmpty().isLength({max: 20}), 
    async (req, res) => {
        // Input Validation
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(400);
            return res.send({ errors: result.array() });
        }
        try {
            const {
                username
            } = req.body;

            const user = await prisma.user.findUnique({
                where: {
                    username
                },
            });

            if (!user) {
                return res.status(404).send('User not found');
            }

            // Delete old tokens for the user
            await prisma.passwordResetToken.deleteMany({
                where: { userId: user.id },
            });

            // Generate a unique token for the password reset
            const token = crypto.randomBytes(32).toString('hex');

            const currentTimeStamp = new Date().getTime() / 1000;
            // Store the token in the database
            await prisma.passwordResetToken.create({
                data: {
                    token,
                    userId: user.id,
                    createdAt: currentTimeStamp,
                },
            });

            console.log(`[DEV] Password Reset Token for ${username} is ${token}`);

            // TODO:
            // Send the token to the user (e.g., via email)

            res.status(200).send('Password reset token generated successfully');
        } catch (error) {
            console.error(error);
            res.status(500);
            res.end();
        }
});

// Password reset using the token
router.post(
    '/reset-password/reset', 
    body('token').notEmpty().isLength({min:64,max:64}),
    body('newPassword').notEmpty().isLength({min:8}),
    async (req, res) => {
        // Input Validation
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(400);
            return res.send({ errors: result.array() });
        }
        try {
            const {
                token,
                newPassword
            } = req.body;

            const tokenEntry = await prisma.passwordResetToken.findUnique({
                where: {
                    token
                },
                include: {
                    user: true
                },
            });

            if (!tokenEntry || !tokenEntry.user) {
                return res.status(404).send('Invalid token');
            }

            // Checking if it is expired
            const currentTimeStamp = new Date().getTime() / 1000;
            const differenceInSeconds = currentTimeStamp - tokenEntry.createdAt;
            const tokenDuration = 60 * 10;
            if (differenceInSeconds > tokenDuration){
                res.status(401)
                return res.send('Token expired')
            }

            // Update the user's password
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await prisma.user.update({
                where: {
                    id: tokenEntry.user.id
                },
                data: {
                    password: hashedPassword
                },
            });

            // Remove the used token from the database
            await prisma.passwordResetToken.delete({
                where: {
                    id: tokenEntry.id
                },
            });

            res.status(200).send('Password reset successful');
        } catch (error) {
            console.error(error);
            res.status(500);
            res.end();
        }
});

export default router;