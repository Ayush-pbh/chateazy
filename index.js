import express from "express";
import bodyParser from "body-parser";
import d from "dotenv";
import userRouter from "./routes/user.js";
import cors from "cors";

import { Server } from "socket.io";
import { createServer } from "node:http";
import conversationRouter from "./routes/conversations.js";
import chatRouter from "./routes/chat.js";
import { CREATENEWCHAT } from "./controllers/chat.js";

d.config();

// Constants & Initialization
const PORT = process.env.PORT | 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api/user", userRouter);
app.use("/api/conv", conversationRouter);
app.use("/api/chat", chatRouter);

app.get("/", (req, res) => {
    return res.status(200).json({ message: "Hello" });
});

// Sockets
io.on("connection", (socket) => {
    console.log(`User Connected : ${socket.id}`);
    socket.on("send-message", async (data) => {
        // Save the chat to database
        console.log(`Client Sent :`, data);
        // Emit to other participant
        // Save the chat to database first
        const r = await CREATENEWCHAT(data);
        console.log(r);
        // Broadcasting to other participants
        socket.broadcast.to(data.conversationId).emit("recv-message", data);

        console.log(`Broadcasting to :`, data.conversationId);
    });
    socket.on("user-typing", (data) => {
        console.log("Typing", data);
        socket.broadcast.to(data.conversationId).emit("user-typing", data);
    });

    socket.on("user-not-typing", (data) => {
        console.log("Not Typing", data);
        socket.broadcast.to(data.conversationId).emit("user-not-typing", data);
    });
    socket.on("join-room", (data) => {
        socket.join(data.room_id);
        console.log(`Socket :${socket.id}, Joined ${data.room_id} `, data);
    });
});
// Server Listen
server.listen(PORT, () => {
    console.log(`Server Started @ http://127.0.0.1:${PORT}`);
});
