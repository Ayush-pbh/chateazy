import dummyAvatar from "../../assets/dummy_avatar.png";
import { useDispatch, useSelector } from "react-redux";

const UserChatHeader = () => {
    const dispatch = useDispatch();
    const activeConv = useSelector(
        (state) => state.conversations.activeConversation
    );
    const user = useSelector((state) => state.user);
    const chat = useSelector((state) => state.chat);

    if (!activeConv.participant1_id) {
        return (
            <div className="w-full h-20 pl-5 border-b flex gap-3 items-center">
                <div className="h-14 w-full ">
                    <div className="text-xl font-semibold flex items-center gap-2">
                        Please Select Conversation
                    </div>
                </div>
            </div>
        );
    }
    const sender =
        activeConv.participant1_id.id == user.id
            ? activeConv.participant2_id
            : activeConv.participant1_id;

    const isOnline = true;
    const isTyping = chat.senderTyping ?? false;

    return (
        <div className="w-full h-20 pl-5 border-b flex gap-3 items-center fixed bg-white">
            <img
                src={dummyAvatar}
                alt=""
                className="w-14 h-14 rounded-full object-cover"
            />
            <div className="h-14 w-full ">
                <div className="text-xl font-semibold flex items-center gap-2">
                    {sender.name}
                    <span
                        className={
                            "text-3xl " +
                            (isOnline ? " text-green-400" : " text-gray-500")
                        }
                    >
                        •
                    </span>
                </div>
                {isTyping && (
                    <div className="text-md text-gray-400 font-semibold">
                        Typing...
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserChatHeader;
