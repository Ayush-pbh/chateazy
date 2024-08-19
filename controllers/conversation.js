import { eq, and, or } from "drizzle-orm";
import { INSERTDB, SELECTDB } from "../db/controller/db_controller.js";
import { CONVERSATIONS, USER } from "../db/schema/schema.js";

const createNewConversation = async (req, res) => {
    // Used to create a new conversation between two users
    const user1 = req.payload.user_id;
    const user2 = req.body.recipient;

    try {
        // Check for exsisting conversations with same participants
        const result = await SELECTDB(
            CONVERSATIONS,
            or(
                and(
                    eq(CONVERSATIONS.participant1_id, user1),
                    eq(CONVERSATIONS.participant2_id, user2)
                ),
                and(
                    eq(CONVERSATIONS.participant1_id, user2),
                    eq(CONVERSATIONS.participant2_id, user1)
                )
            )
        );
        console.log("Result ", result);
        if (result.length > 0) {
            // Already present.
            console.log("Conversation Already Present!", result);
            return res.status(304).json({
                message: "conversation already present",
                data: result[0],
            });
        } else {
            // Creating a conversation
            const newConversation = await INSERTDB(CONVERSATIONS, {
                type: "private",
                participant1_id: user1,
                participant2_id: user2,
            });

            if (newConversation.length > 0) {
                console.log("Conversation created!", newConversation);
                return res.status(200).json({
                    message: "conversation created",
                    data: newConversation[0],
                });
            } else {
                console.log("Failed!!!");
                return res.status(500).json({
                    error: "conversation creation failed!",
                });
            }
        }
        // Create a conversation with given participants
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
};

const getUserConversations = async (req, res) => {
    const user1 = req.payload.user_id;
    try {
        // finding all coversation that user has participated in
        const user_conversations = await SELECTDB(
            CONVERSATIONS,
            or(
                eq(CONVERSATIONS.participant1_id, user1),
                eq(CONVERSATIONS.participant2_id, user1)
            )
        );
        for (const element of user_conversations) {
            const conversation = element;

            const participant1 = conversation.participant1_id;
            const result = await SELECTDB(USER, eq(USER.id, participant1));

            const participant2 = conversation.participant2_id;
            const result2 = await SELECTDB(USER, eq(USER.id, participant2));

            element.participant1_id = result[0];
            element.participant2_id = result2[0];
        }
        return res.status(200).json(user_conversations);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
};

export {
    createNewConversation as CREATENEWCONVERSATION,
    getUserConversations as GETUSERCONVERSATIONS,
};
