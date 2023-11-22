import express from 'express'
import db from '../../modules/db.js';
import bcrypt, { hash } from 'bcrypt';
import {
    PrismaClient
} from '../../modules/prima_client/index.js'

const prisma = new PrismaClient()
const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const {
            username,
            password
        } = req.body;

        // Check if the username already exists
        const existingUser = await prisma.user.findUnique({
            where: { username },
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
            },
        });

        res.status(201).send('User created successfully');
    } catch (error) {
        console.error(error);
        res.status(500);
        res.end();
    }
});

// 4. Login endpoint
router.post('/login', async (req, res) => {
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

        // Compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).send('Invalid username or password');
        }

        // Store user information in the session
        req.session.userId = user.id;
        req.session.username = user.username;
        req.session.isLoggedIn = true;

        res.status(200).send('Login successful');
    } catch (error) {
        console.error(error);
        res.status(500);
        res.end();
    }
});

// 5. Logout endpoint
router.delete('/logout', (req, res) => {
    // Implement logout logic (e.g., invalidate session or JWT)
    if (req.session.isLoggedIn){
        res.status(200).send('Logout successful');
    } else {
        res.status(409).send('You are not logged in');
    }
});

export default router