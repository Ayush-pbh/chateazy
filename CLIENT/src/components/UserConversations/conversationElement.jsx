import dummyAvatar from "../../assets/dummy_avatar.png";
import PropTypes from "prop-types";

const ConversationElement = ({
    selected = false,
    name = "Ayush",
    openCoversation,
}) => {
    return (
        <div
            className={
                "w-full h-32 flex gap-3 pl-5 pt-5 border-b cursor-pointer " +
                (selected
                    ? " bg-gray-200 border-l-4 border-l-orange-600"
                    : " bg-white hover:bg-gray-50 ")
            }
            onClick={openCoversation}
        >
            <img
                src={dummyAvatar}
                alt="user_avatar"
                className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex flex-col">
                <div className="flex gap-3 items-center">
                    <div className="text-black font-semibold text-lg">
                        {name}
                    </div>
                    <div className="text-gray-400">•</div>
                    <div className="text-gray-400">10 days</div>
                </div>
                <div>
                    <span className="text-gray-500">Ayush: </span>
                    <span className="text-gray-700">
                        4th Hello, I wanted to know more about the product
                        design position at Atlassian.
                    </span>
                </div>
            </div>
        </div>
    );
};
ConversationElement.propTypes = {
    selected: PropTypes.bool,
    name: PropTypes.string,
    openCoversation: PropTypes.func,
};
export default ConversationElement;
