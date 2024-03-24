import express from "express";
const router = express.Router();
import { isLoggedIn } from "../auth/middlewares.js";

// GeoApify API
import geoapifyRouter from "./geoapify/index.js";
// Profile API
import profileRouter from "./profile/index.js";
// Event API
import eventsRouter from "./events/index.js";
// Comments API
import commentsRouter from './comments/index.js';
// Tickets API
import ticketRouter from './tickets/index.js';
// Payments API
import paymentsRouter from './payments/index.js';

// These endpoints can be accessed by both eventowners and users
router.use("/geoapify", isLoggedIn);
router.use("/geoapify", geoapifyRouter);
router.use("/profile", isLoggedIn);
router.use("/profile", profileRouter);
router.use("/comments", isLoggedIn);
router.use("/comments", commentsRouter);
router.use("/tickets", isLoggedIn);
router.use("/tickets", ticketRouter);
router.use("/payments", isLoggedIn);
router.use("/payments", paymentsRouter);
router.use("/events", eventsRouter);



export default router;