import express from "express";
import {
    loginUserValidator,
    newConversationValidator,
    registerUserValidator,
} from "../middleware/validators.js";
import { GETUSER, LOGINUSER, REGISTERUSER } from "../controllers/user.js";
import { verifyAccessToken } from "../middleware/jwt.js";
import {
    CREATENEWCONVERSATION,
    GETUSERCONVERSATIONS,
} from "../controllers/conversation.js";
const conversationRouter = express.Router();

// Routes
conversationRouter.route("/").get(verifyAccessToken, GETUSERCONVERSATIONS);

conversationRouter
    .route("/new")
    .post(verifyAccessToken, newConversationValidator, CREATENEWCONVERSATION);

export default conversationRouter;
