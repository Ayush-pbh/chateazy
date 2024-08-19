import MessagePanel from "../MessagePanel/MessagePanel";
import SendChat from "../SendChat/SendChat";

const UserChatScreen = () => {
    return (
        <div className="w-full h-full  flex flex-col mt-20">
            <MessagePanel />
            <SendChat />
        </div>
    );
};

export default UserChatScreen;
