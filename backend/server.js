import express from "express";
import bodyParser from "body-parser";
import session from 'cookie-session';
import config from "./config.js";
const server = express();

// Routes
import authRoute from './routes/auth/index.js';
import adminRoute from './routes/admin/index.js';
import eventOwnerRoute from './routes/eventowner/index.js';
import sessionRoute from './routes/session.js';
import commonRoute from './routes/common/index.js';
import statusRoute from './routes/status/index.js';

// Need to support application/json content
server.use(bodyParser.json());

// Express Session to keep track of the user
server.use(session({
    keys: config.EXPRESS_SESSION_SECRETS, // Change this to a secure random string
    name: "session",
    maxAge: 1000 * 60 * 60 * 24 * 7 // Stay logged in for 7 days
}));

server.use("/auth", authRoute);
server.use("/admin", adminRoute);
server.use("/eventowner", eventOwnerRoute);
server.use("/session", sessionRoute);
server.use("/common", commonRoute);
server.use("/status", statusRoute);

server.listen(8654, '127.0.0.1', () => {
    console.log("[+] Server started at http://127.0.0.1:8654");
})