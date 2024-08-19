import { INSERTDB, SELECTDB } from "../db/controller/db_controller.js";
import { USER } from "../db/schema/schema.js";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../middleware/jwt.js";
import { eq } from "drizzle-orm";

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const hashed_password = await bcrypt.hash(password, 10);

        const data = {
            name: name,
            email: email,
            hPassword: hashed_password,
            isVerified: false,
            otp: 1234,
        };
        const db_result = await INSERTDB(USER, data);
        if (db_result) {
            res.status(200).json(db_result);
        } else {
            res.status(500).json({ error: "Failed to Register User" });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

const loginUser = async (req, res) => {
    const { password, db_result } = req.body;

    try {
        // checking if password is correct.
        const match = await bcrypt.compare(password, db_result.hPassword);
        if (!match) {
            return res.status(405).json({ error: "Password Mismatch." });
        } else {
            // Password is matched
            // Sign JWT.
            const jwt_payload = {
                email: db_result.email,
                user_id: db_result.id,
            };
            const token = generateAccessToken(jwt_payload);
            if (token) {
                return res.status(200).json({
                    accessToken: token,
                    message: "Login Success, valid for 24 Hrs.",
                });
            } else {
                return res.status(500).json({
                    error: "Failed to generate JWT.",
                });
            }
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
const getUser = async (req, res) => {
    // Get Payload data
    const payload = req.payload;

    try {
        // Find User
        const db_result = await SELECTDB(USER, eq(USER.email, payload.email));

        if (db_result && db_result.length > 0) {
            const { id, name, email } = db_result[0];

            // Return user data
            return res.status(200).json({ data: { id, name, email } });
        } else {
            // If user is not found
            return res.status(404).json({ error: "User Not Found" });
        }
    } catch (error) {
        // Handle potential errors
        return res
            .status(500)
            .json({ error: "An error occurred while fetching the user" });
    }
};
export {
    registerUser as REGISTERUSER,
    loginUser as LOGINUSER,
    getUser as GETUSER,
};
