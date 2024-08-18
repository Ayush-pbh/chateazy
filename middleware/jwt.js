import jwt from "jsonwebtoken";
import d from "dotenv";
d.config();

const generateAccessToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "86400s",
    });
    return token;
};

const verifyAccessToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(403).json({ msg: "User Unauthorized ❌" });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if (err) {
                console.log("Error Verifying Token ❌");
                return res.status(403).json({ msg: "User Unauthorized ❌" });
            } else {
                req.payload = data;
                next();
            }
        });
    } catch (err) {
        console.log(err);
        return res.statustatus(403).json({ msg: "User Unauthorized ❌" });
    }
};

export { generateAccessToken, verifyAccessToken };
