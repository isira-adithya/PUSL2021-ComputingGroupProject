import express from "express";
import bodyParser from "body-parser";
import session from 'express-session';
import config from "./config.js";
const server = express();

// Routes
import authRoute from './routes/auth/index.js';
import adminRoute from './routes/admin/index.js';
import eventOwnerRoute from './routes/eventowner/index.js';

// Need to support application/json content
server.use(bodyParser.json());

// Express Session to keep track of the user
server.use(session({
    secret: config.EXPRESS_SESSION_SECRET, // Change this to a secure random string
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // Stay logged in for 7 days
    }
}));

server.use("/auth", authRoute);
server.use("/admin", adminRoute);
server.use("/eventowner", eventOwnerRoute);

server.listen(8654, '127.0.0.1', () => {
    console.log("[+] Server started at http://127.0.0.1:8654")
})