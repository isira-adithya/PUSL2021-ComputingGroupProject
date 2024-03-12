import express from 'express';
import bcrypt from 'bcrypt';
import {
    PrismaClient
} from '../../modules/prisma_client/index.js';
import crypto from 'crypto';
import {
    query,
    body,
    validationResult
} from 'express-validator';
import { sendEmail } from '../../modules/emails/mailgun.js';

const prisma = new PrismaClient()
const router = express.Router();

// 1. Signup endpoint
router.post(
    '/signup',
    body("username").notEmpty().isLength({
        max: 20
    }),
    body("firstname").notEmpty().isLength({
        max: 20
    }),
    body("lastname").notEmpty().isLength({
        max: 20
    }),
    body("email").notEmpty().isLength({
        max: 32
    }),
    body("phone").isLength({
        max: 32
    }).isMobilePhone(),
    body("address").notEmpty().isLength({
        max: 256
    }),
    body("password").notEmpty().isLength({
        min: 8
    }),
    body("role").notEmpty(),
    async (req, res) => {
        // Input Validation
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(400);
            return res.json({
                errors: result.array()
            });
        }

        try {

            var isAccountActive = false;

            // Checking the role
            if (req.body["role"]) {
                switch (req.body["role"]) {
                    case 'VISITOR':
                        isAccountActive = true;
                        break;

                    case 'EVENT_OWNER':
                        isAccountActive = true;
                        break;

                    case 'ADMIN':
                        return res.status(400).json({
                            msg: "Not Implemented"
                        });
                        break;

                    default:
                        return res.status(400).json({
                            msg: "Invalid role"
                        });
                        break;
                }
            } else {
                return res.status(400).json({
                    msg: "Invalid role"
                });
            }

            // Check if the username already exists
            const existingUser = await prisma.user.findFirst({
                where: {
                    user_name: req.body["username"],
                }
            })

            //FIXME: check existing phone number, email address
            const emailObj = await prisma.emailAddress.findFirst({
                where: {
                    email: req.body['email']
                }
            })

            const phoneObj = await prisma.phoneNumber.findFirst({
                where: {
                    number: req.body['phone']
                }
            })

            if (existingUser) {
                return res.status(409).json({
                    msg: 'Username already exists in our database'
                });
            }

            if (emailObj) {
                return res.status(409).json({
                    msg: 'Email Address already exists in our database'
                });
            }

            if (phoneObj) {
                return res.status(409).json({
                    msg: 'Phone Number already exists in our database'
                });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(req.body["password"], 10);

            // Create user using Prisma
            const createdEmailObj = await prisma.emailAddress.create({
                data: {
                    email: req.body["email"]
                }
            });

            const createdPhoneObj = await prisma.phoneNumber.create({
                data: {
                    number: req.body["phone"]
                }
            });

            const createdUser = await prisma.user.create({
                data: {
                    user_name: req.body["username"],
                    first_name: req.body["firstname"],
                    last_name: req.body["lastname"],
                    address: req.body["address"],
                    password: hashedPassword,
                    role: req.body["role"],
                    is_active: isAccountActive,
                    notification_preference: "ENABLED",
                    is_verified: false,
                    phone_id: createdPhoneObj.phone_id,
                    email_id: createdEmailObj.email_id,
                    addr_geocoordinates: null,
                    profile_image: null
                },
            });

            res.status(201).json({
                msg: 'User created successfully'
            });
        } catch (error) {
            console.error(error);
            res.status(500);
            res.end();
        }
    });

// 2. Login endpoint
router.post(
    '/login',
    body("username").notEmpty().isLength({
        max: 20
    }),
    body("password").notEmpty().isLength({
        min: 8
    }),
    async (req, res) => {
        // Input Validation
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(400);
            return res.json({
                errors: result.array()
            });
        }
        try {

            // FIXME: Add Email Checking
            var emailObj = await prisma.emailAddress.findFirst({
                where: {
                    email: req.body['username']
                }
            })

            const user = await prisma.user.findFirst({
                where: {
                    OR: [{
                            user_name: req.body["username"],
                        },
                        {
                            email_id: emailObj ? emailObj.email_id : -1
                        }
                    ]
                }
            })

            if (!user) {
                return res.status(401).json({
                    msg: 'Invalid username or password'
                });
            }

            if (!user.is_active) {
                return res.status(401).json({
                    msg: 'Account is under review'
                });
            }

            // Compare the provided password with the hashed password
            const passwordMatch = await bcrypt.compare(req.body['password'], user.password);

            if (!passwordMatch) {
                return res.status(401).json({
                    msg: 'Invalid username or password'
                });
            }

            // Email and Phone
            const phoneObj = await prisma.phoneNumber.findFirst({
                where: {
                    phone_id: user.phone_id
                }
            });
            emailObj = await prisma.emailAddress.findFirst({
                where: {
                    email_id: user.email_id
                }
            });

            // Store user information in the session
            req.session.user_id = user.user_id;
            req.session.username = user.user_name;
            req.session.role = user.role;
            req.session.isLoggedIn = true;
            req.session.is_verified = user.is_verified;
            req.session.phone = phoneObj.number;
            req.session.phone_number_verified = phoneObj.is_verified;
            req.session.email = emailObj.email;
            req.session.email_address_verified = emailObj.is_verified;

            res.status(200).json({
                msg: 'Login successful'
            });
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
        req.session = null;
    }
    res.status(200).json({
        msg: 'Logout successful'
    });
});

// Password reset request
router.post(
    '/reset-password/request',
    body("username").notEmpty().isLength({
        max: 20
    }),
    async (req, res) => {
        // Input Validation
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(400);
            return res.json({
                errors: result.array()
            });
        }
        try {
            let emailAddress = await prisma.emailAddress.findFirst({
                where: {
                    email: req.body['username']
                }
            });

            let user = await prisma.user.findFirst({
                where: {
                    email_id: emailAddress.email_id
                }
            });

            if (!user) {
                return res.status(404).json({
                    msg: 'User not found'
                });
            }

            // Delete old tokens for the user
            await prisma.passwordResetToken.deleteMany({
                where: {
                    userId: user.id
                },
            });

            // Generate a unique token for the password reset
            const token = crypto.randomBytes(32).toString('hex');

            const currentTimeStamp = new Date().getTime() / 1000;
            // Store the token in the database
            await prisma.passwordResetToken.create({
                data: {
                    token,
                    user_id: user.user_id,
                    createdAt: currentTimeStamp,
                },
            });

            console.log(`[DEV] Password Reset Token for ${req.body['username']} is ${token}\n[DEV] Visit http://www.eventhive.local/#/reset-password/${token} to reset your password.`);

            // TODO:
            // Send the token to the user (e.g., via email)
            const link = `https://www.eventhive.live/#/reset-password/${token}`;
            const result = await sendEmail([emailAddress.email], "Password Reset - EventHive", `Visit ${link} to reset your password.`, `Visit <a href="${link}">here</a> to reset your password.<br><i>Use the following link if the above link doesn't work.</i><br><pre><code>${link}</code></pre>`)

            if (result){
                res.status(200).json({
                    msg: 'Password reset token generated successfully'
                });
            } else {
                res.status(500);
                res.json({
                    success: false,
                    msg: 'Failed to send the email, please try again later.'
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500);
            res.end();
        }
    });

// Password reset using the token
router.post(
    '/reset-password/reset',
    body('token').notEmpty().isLength({
        min: 64,
        max: 64
    }),
    body('newPassword').notEmpty().isLength({
        min: 8
    }),
    async (req, res) => {
        // Input Validation
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(400);
            return res.json({
                errors: result.array()
            });
        }
        try {

            const tokenOwner = await prisma.passwordResetToken.findUnique({
                where: {
                    token: req.body['token']
                },
                include: {
                    user: true
                },
            });

            if (!tokenOwner || !tokenOwner.user) {
                return res.status(404).json({
                    msg: 'Invalid token'
                });
            }

            // Checking if it is expired
            const currentTimeStamp = new Date().getTime() / 1000;
            const differenceInSeconds = currentTimeStamp - tokenOwner.createdAt;
            const tokenDuration = 60 * 10;
            if (differenceInSeconds > tokenDuration) {
                res.status(401)
                return res.json({
                    msg: 'Token expired'
                })
            }

            // Update the user's password
            const hashedPassword = await bcrypt.hash(req.body['newPassword'], 10);
            await prisma.user.update({
                where: {
                    user_id: tokenOwner.user.user_id
                },
                data: {
                    password: hashedPassword
                },
            });

            // Remove the used token from the database
            await prisma.passwordResetToken.delete({
                where: {
                    user_id: tokenOwner.user.user_id
                },
            });

            res.status(200).json({
                msg: 'Password reset successful'
            });
        } catch (error) {
            console.error(error);
            res.status(500);
            res.end();
        }
    });

export default router;