import express from "express";
const router = express.Router();
import { isLoggedIn } from "../auth/middlewares.js";

// GeoApify API
import geoapifyRouter from "./geoapify/index.js";

// Profile API
import profileRouter from "./profile/index.js";

// These endpoints can be accessed by both eventowners and users
router.use(isLoggedIn);
router.use("/geoapify", geoapifyRouter);
router.use("/profile", profileRouter);



export default router;