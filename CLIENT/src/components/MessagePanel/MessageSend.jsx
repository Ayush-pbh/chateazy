import PropTypes from "prop-types";

const MessageSend = ({ content }) => {
    return (
        <div className="w-full flex  justify-end">
            <div className="bg-orange-400 p-4 w-1/2 w-max rounded-xl text-white font-semibold text-lg">
                {content}
            </div>
        </div>
    );
};
MessageSend.propTypes = {
    id: PropTypes.number,
    sender_id: PropTypes.string,
    content: PropTypes.string,
    type: PropTypes.string,
};
export default MessageSend;
