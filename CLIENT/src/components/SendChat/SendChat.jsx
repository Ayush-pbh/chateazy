import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pushToChat } from "../../state/store";
import { socket } from "../../../socket";

const SendChat = () => {
    const chatInputField = useRef(null);
    const dispatch = useDispatch();

    const activeConv = useSelector(
        (state) => state.conversations.activeConversation
    );
    const user = useSelector((state) => state.user);

    const handleSendChat = () => {
        if (!activeConv.participant1_id) {
            console.log("No User Selected");
            return 1;
        }
        if (
            chatInputField.current.value != undefined &&
            chatInputField.current.value != ""
        ) {
            console.log("User says : ", chatInputField.current.value);
            const msg = {
                senderId: user.id,
                content: chatInputField.current.value,
                conversationId: activeConv.id,
                type: "text",
            };
            // Send to Server using socket
            socket.emit("send-message", msg);
            // Add to local redux store
            dispatch(pushToChat(msg));
            // Clear the input field
            chatInputField.current.value = "";
        }
    };
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSendChat();
            // You can add more logic here, such as submitting a form or updating state
        } else if (activeConv.participant1_id) {
            if (event.target.value == "") {
                socket.emit("user-not-typing", {
                    conversationId: activeConv.id,
                });
            } else {
                socket.emit("user-typing", { conversationId: activeConv.id });
            }
        }
    };

    return (
        <div className="w-full h-24 flex justify-center items-center border-t">
            <div className="w-11/12 h-16 bg-gray-200 rounded-lg flex  items-center gap-3 pr-2">
                <input
                    type="text"
                    className="w-full h-14 pl-4 bg-transparent"
                    placeholder="Type your message here"
                    ref={chatInputField}
                    onKeyDown={handleKeyDown}
                />
                {/* File Upload Button */}
                <div className="w-fit h-12 text-orange-600  flex justify-center items-center p-2 rounded-xl hover:bg-orange-100 cursor-pointer">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-7"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
                        />
                    </svg>
                </div>
                {/* Send Chat Button */}
                <div
                    className="w-fit h-10 bg-orange-100 text-orange-600 flex justify-center items-center p-2 rounded-lg cursor-pointer"
                    onClick={handleSendChat}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-7"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default SendChat;
