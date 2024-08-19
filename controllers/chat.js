import { eq } from "drizzle-orm";
import { SELECTDB, INSERTDB } from "../db/controller/db_controller.js";
import { MESSAGES } from "../db/schema/schema.js";

// Chat Contr
const createNewChat = async (messageData) => {
    try {
        const { conversationId, senderId, content, type } = messageData;

        const newMessage = {
            conversationId: conversationId,
            senderId: senderId,
            content: content,
            type: type,
            // timestamp will be automatically set by the database
        };

        const dbResult = await INSERTDB(MESSAGES, newMessage);

        if (dbResult) {
            return { success: true, data: dbResult };
        } else {
            return { success: false, error: "Failed to create message" };
        }
    } catch (error) {
        return {
            success: false,
            error: "An error occurred while creating the message",
        };
    }
};

const getAllChats = async (req, res) => {
    const convid = req.params.convid;
    if (!convid && convid.length > 0) {
        return res.status(400).json({ message: "No Conversation Id Provided" });
    }
    const result = await SELECTDB(
        MESSAGES,
        eq(MESSAGES.conversationId, convid)
    );
    return res.status(200).json(result);
};

export { createNewChat as CREATENEWCHAT, getAllChats as GETALLCHAT };
