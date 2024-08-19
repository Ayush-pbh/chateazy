import PropTypes from "prop-types";

const MessageRecieve = ({ content }) => {
    return (
        <div className=" w-full  flex  justify-start">
            <div className="bg-gray-200 p-4 w-1/2 w-max rounded-xl text-gray-700 text-lg">
                {content}
            </div>
        </div>
    );
};
MessageRecieve.propTypes = {
    id: PropTypes.number,
    sender_id: PropTypes.string,
    content: PropTypes.string,
    type: PropTypes.string,
};
export default MessageRecieve;
