import express from "express";
import {
    loginUserValidator,
    registerUserValidator,
} from "../middleware/validators.js";
import { GETUSER, LOGINUSER, REGISTERUSER } from "../controllers/user.js";
import { verifyAccessToken } from "../middleware/jwt.js";
const userRouter = express.Router();

// Routes
userRouter.route("/").get(verifyAccessToken, GETUSER);
userRouter.route("/register").post(registerUserValidator, REGISTERUSER);
userRouter.route("/login").post(loginUserValidator, LOGINUSER);

export default userRouter;
