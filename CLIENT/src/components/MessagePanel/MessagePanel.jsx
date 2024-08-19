import { useEffect, useRef } from "react";
import MessageRecieve from "./MessageRecieve";
import MessageSend from "./MessageSend";
import { useSelector, useDispatch } from "react-redux";
import { getAllChats } from "../../services/api_services";
import { setChat } from "../../state/store";
const MessagePanel = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const chat = useSelector((state) => state.chat);
    const messagesEndRef = useRef(null);

    const activeConversation = useSelector((state) => state.coversations);

    const dummyMessage = [
        {
            id: 1,
            sender_id: 10,
            content: "Hi, bro!",
            type: "text",
        },
        {
            id: 2,
            sender_id: 20,
            content: "Hi, Man. How are you?",
            type: "text",
        },
        {
            id: 3,
            sender_id: 20,
            content: "How is your family?",
            type: "text",
        },
        {
            id: 4,
            sender_id: 10,
            content: "I am fine bro, family is also fine.",
            type: "text",
        },
        {
            id: 5,
            sender_id: 10,
            content: "How is uncle and anty doin?",
            type: "text",
        },
        {
            id: 6,
            sender_id: 20,
            content: "They are great. When will you in India?",
            type: "text",
        },
        {
            id: 7,
            sender_id: 10,
            content:
                "Probably next month, will bring some good things for you!",
            type: "text",
        },
        {
            id: 8,
            sender_id: 20,
            content:
                "😍 Wow, man get here fast! everyone is coming to Satyam's funeral.",
            type: "text",
        },
        {
            id: 9,
            sender_id: 10,
            content: "Don't make it, so obio!",
            type: "text",
        },
        {
            id: 10,
            sender_id: 20,
            content: "Come Fast!",
            type: "text",
        },
    ];
    const activeConv = useSelector(
        (state) => state.conversations.activeConversation
    );
    useEffect(() => {
        const getAllChatHandler = async () => {
            const rr = await getAllChats(activeConv.id);
            if (rr.data) {
                dispatch(setChat(rr.data));
            }
            console.log(rr.data);
        };
        getAllChatHandler();
    }, [activeConv.id]);

    useEffect(() => {
        // Scroll to the bottom whenever chat.all changes
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat.all]);

    if (!activeConv.participant1_id) {
        console.log("None Selected");
        return (
            <div className="w-full h-full flex justify-center items-center">
                No Data
            </div>
        );
    }

    return (
        <div className="h-3/4 w-full flex justify-center items-center p-4 ">
            <div className="h-full w-full max-h-full  flex flex-col gap-3 overflow-y-auto">
                {chat.all.map((msg) => {
                    if (msg.senderId === user.id) {
                        return (
                            <MessageSend key={msg.id} content={msg.content} />
                        );
                    } else {
                        return (
                            <MessageRecieve
                                key={msg.id}
                                content={msg.content}
                            />
                        );
                    }
                })}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
};

export default MessagePanel;
