import express from "express";
import d from "dotenv";
import db from "./db/db_connect.js";

d.config();

const app = express();

const PORT = process.env.PORT | 3000;

app.get("/", (req, res) => {
    return res.status(200).json({ message: "Hello" });
});

app.listen(PORT, () => {
    console.log(`Server Started @ http://127.0.0.1:${PORT}`);
});
