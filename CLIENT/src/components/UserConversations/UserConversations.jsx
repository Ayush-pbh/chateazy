import { useEffect, useState } from "react";
import ConversationElement from "./conversationElement";
import { useSelector, useDispatch } from "react-redux";
import { updateActiveConversation } from "../../state/store";
import { socket } from "../../../socket";

const UserConversations = () => {
    const [selectedFilter, setSelectedFilter] = useState("All");
    //redux selector
    const user = useSelector((state) => state.user);
    const allConversations = useSelector((state) => state.conversations);
    // redux dispatch
    const dispatch = useDispatch();

    // Joining Rooms for each conversation
    useEffect(() => {
        if (
            allConversations.conversations != undefined &&
            allConversations.conversations.length > 0
        ) {
            allConversations.conversations.map((conv) => {
                console.log("User is a part of : ", conv);
                socket.emit("join-room", {
                    user_id: user.id,
                    room_id: conv.id,
                });
            });
        }
    }, [allConversations.conversations]);

    return (
        <div className="bg-white w-full h-full">
            <div className="filters w-full h-14 bg-white   flex gap-2 items-center pl-5 border-b">
                {["All", "Unread", "Archived", "Blocked"].map((filter) => {
                    return (
                        <div
                            className={
                                "  w-auto h-10 pl-4 pr-4 flex justify-center items-center rounded-full border-gray-300 cursor-pointer" +
                                (filter === selectedFilter
                                    ? " bg-orange-500 text-white "
                                    : " bg-white border-2 text-black")
                            }
                            key={filter}
                            onClick={() => {
                                setSelectedFilter(filter);
                            }}
                        >
                            {filter}
                        </div>
                    );
                })}
            </div>
            <div className="conversations bg-red-400 ">
                {allConversations.conversations.map((conv) => {
                    let name = "";
                    if (user.id == conv.participant1_id.id)
                        name = conv.participant2_id.name;
                    else if (user.id == conv.participant2_id.id)
                        name = conv.participant1_id.name;
                    return (
                        <ConversationElement
                            key={conv.id}
                            name={name}
                            selected={
                                conv.id ==
                                allConversations.activeConversation.id
                            }
                            openCoversation={() => {
                                dispatch(updateActiveConversation(conv));
                            }}
                        />
                    );
                })}
            </div>
            <div className="p-2 flex items-center gap-2">
                <span
                    className={`${
                        user.connectionStatus
                            ? "text-green-400"
                            : "text-red-500"
                    } text-lg`}
                >
                    •
                </span>
                <div className="text-gray-400">
                    Logged In as{" "}
                    <i>
                        {user.name}, {user.email}
                    </i>{" "}
                </div>
            </div>
        </div>
    );
};

export default UserConversations;
