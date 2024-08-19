import { useRef } from "react";
import { useDispatch } from "react-redux";

import { addConversation, getConversations } from "../../services/api_services";
import { updateConvSlice } from "../../state/store";

const SANConversation = () => {
    const dispatch = useDispatch();

    const newEmailInputField = useRef(null);
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
    const addConversationHandler = async () => {
        if (newEmailInputField.current) {
            const result = await addConversation(
                newEmailInputField.current.value
            );
            if (result.status) {
                console.log("Added New Conversation");
                getUserConversationsHandler();
            } else {
                console.log("Failed to add new Conversation");
            }
        }
    };
    return (
        <div className="flex gap-2 w-full bg-gray-100 h-20 p-1 border-b">
            <input
                type="text"
                className="border-gray border-2 h-full w-full rounded-lg pl-2 text-lg"
                placeholder="Search"
                ref={newEmailInputField}
            />
            <button
                className="h-full bg-orange-500 w-20 rounded-lg text-white font-bold"
                onClick={addConversationHandler}
            >
                ADD
            </button>
        </div>
    );
};

export default SANConversation;
