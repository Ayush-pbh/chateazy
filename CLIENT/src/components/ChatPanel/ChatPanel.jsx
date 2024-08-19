import UserChatHeader from "../UserChatHeader/UserChatHeader";
import UserChatScreen from "../UserChatScreen/UserChatScreen";

const ChatPanel = () => {
    return (
        <div className="w-full h-screen overflow-hidden flex flex-col">
            <UserChatHeader />
            <UserChatScreen />
        </div>
    );
};

export default ChatPanel;
