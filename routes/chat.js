import express from "express";
import {
    loginUserValidator,
    registerUserValidator,
} from "../middleware/validators.js";
import { GETUSER, LOGINUSER, REGISTERUSER } from "../controllers/user.js";
import { verifyAccessToken } from "../middleware/jwt.js";
import { GETALLCHAT } from "../controllers/chat.js";
const chatRouter = express.Router();

// Routes
// chatRouter.route("/push").post(verifyAccessToken, GETchat);
chatRouter.route("/:convid").get(verifyAccessToken, GETALLCHAT);

export default chatRouter;
