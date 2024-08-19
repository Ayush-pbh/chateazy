import { useEffect } from "react";
import ChatPanel from "../ChatPanel/ChatPanel";
import SANConversation from "../SearchAndNewConversation/SANConversation";
import UserConversations from "../UserConversations/UserConversations";
import { socket } from "../../../socket";
import { getConversations, getUser } from "../../services/api_services";
import { useDispatch } from "react-redux";
import {
    pushToChat,
    updateConnectionStatus,
    updateConvSlice,
    updateUser,
} from "../../state/store";

const Chat = () => {
    // Will do socket connection dealing here, and maintain a context here for all conversations and messages
    // Getting User data
    const dispatch = useDispatch();

    useEffect(() => {
        function onConnect() {
            console.log("Making Connection");
            dispatch(updateConnectionStatus(true));
        }

        function onDisconnect() {
            dispatch(updateConnectionStatus(false));
        }
        function recvMessage(arg) {
            console.log(arg);
            dispatch(pushToChat(arg));
        }

        // Start connection & Listen for events
        socket.connect();
        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("recv-message", recvMessage);
        return () => {
            socket.off("recv-message", recvMessage);
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
        };
    }, []);

    useEffect(() => {
        // Get User Information.
        const getUserHandler = async () => {
            const result = await getUser();
            if (result.status) {
                dispatch(updateUser(result.data.data));
            } else {
                navigator("/auth");
            }
        };
        const getUserConversationsHandler = async () => {
            const result = await getConversations();
            if (result.status) {
                dispatch(
                    updateConvSlice({
                        conversations: result.data,
                        activeConversation: "nona",
                    })
                );
            }
        };
        getUserHandler();
        getUserConversationsHandler();
    }, []);

    return (
        <div className="flex ">
            <div className="flex flex-col side_pane  w-4/12 h-screen  ">
                <SANConversation />
                <UserConversations />
            </div>
            <div className="chat_pane  w-8/12 h-screen border-gray-300  border-l">
                <ChatPanel />
            </div>
        </div>
    );
};

export default Chat;
