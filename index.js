import express from "express";
import bodyParser from "body-parser";
import d from "dotenv";
import userRouter from "./routes/user.js";
d.config();

// Constants & Initialization
const PORT = process.env.PORT | 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use("/api/user", userRouter);
app.get("/", (req, res) => {
    return res.status(200).json({ message: "Hello" });
});

// Server Listen

app.listen(PORT, () => {
    console.log(`Server Started @ http://127.0.0.1:${PORT}`);
});
