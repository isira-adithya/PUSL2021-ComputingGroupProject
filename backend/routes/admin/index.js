import express from 'express';
import EventsRouter from './events/events.js';
import UsersRouter from './users/users.js';
import VerificationRouter from './verifications/verifications.js';
const router = express.Router();

// Using middleware to check authentication and authorization of /admin
const checkAuth = (req, res, next) => {
    if (req.session.isLoggedIn){
        if (req.session.role == "ADMIN"){
            next();
        } else {
            res.status(401);
            return res.json({
                msg: "Unauthorized"
            });
        }
    } else {
        res.status(403);
        return res.json({
            msg: "Forbidden"
        });
    }
}

router.use(checkAuth);
router.use("/events", EventsRouter);
router.use("/users", UsersRouter);
router.use("/verifications", VerificationRouter);


export default router;