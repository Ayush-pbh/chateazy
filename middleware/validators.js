import { eq } from "drizzle-orm";
import { SELECTDB } from "../db/controller/db_controller.js";
import { USER } from "../db/schema/schema.js";

const registerUserValidator = async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: "Invalid Data" });
    } else {
        // Check if user already exsist.
        const db_result = await SELECTDB(USER, eq(USER.email, email));
        console.log(db_result);
        if (db_result.length > 0) {
            return res.status(400).json({ error: "Email already in use." });
        } else {
            next();
        }
    }
};

const loginUserValidator = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Inavlid Data" });
    } else {
        // Check if user exsist.
        const db_result = await SELECTDB(USER, eq(USER.email, email));
        if (db_result.length > 0) {
            // if (db_result[0].isVerified) {
            req.body.db_result = db_result[0];
            next();
            // } else {
            // return res.status(405).json({ error: "User Not Verified." });
            // }
        } else {
            return res.status(404).json({ error: "No User Found" });
        }
    }
};

const newConversationValidator = async (req, res, next) => {
    const { recipientEmail } = req.body;

    if (!recipientEmail) {
        return res.status(400).json({ error: "Invalid Data" });
    } else {
        // Check if user already exsist.
        const db_result = await SELECTDB(USER, eq(USER.email, recipientEmail));
        if (db_result.length > 0) {
            req.body.recipient = db_result[0].id;
            next();
        } else {
            return res.status(404).json({ error: "No User Found." });
        }
    }
};
export { registerUserValidator, loginUserValidator, newConversationValidator };
