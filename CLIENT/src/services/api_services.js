import axios from "axios";

const api_url = "http://localhost:3000";

export const registerUser = async (data) => {
    try {
        const result = await axios.post(`${api_url}/api/user/register`, data);
        if (result.status == 200) {
            return { status: true, data: result.data };
        } else {
            return { status: false, data: result.data };
        }
    } catch (error) {
        return { status: false, data: error.response.data.error };
    }
};

export const loginuser = async (data) => {
    try {
        const result = await axios.post(`${api_url}/api/user/login`, data);
        if (result.status == 200) {
            return { status: true, data: result.data };
        } else {
            return { status: false, data: result.data };
        }
    } catch (error) {
        return { status: false, data: error.response.data.error };
    }
};

export const getUser = async () => {
    try {
        const result = await axios.get(`${api_url}/api/user/`, {
            headers: {
                Authorization: localStorage.getItem("login-token"),
            },
        });
        if (result.status == 200) {
            return { status: true, data: result.data };
        } else {
            return { status: false, data: result.data };
        }
    } catch (error) {
        return { status: false, data: error.response.data.error };
    }
};

export const addConversation = async (email) => {
    try {
        const result = await axios.post(
            `${api_url}/api/conv/new`,
            {
                recipientEmail: email,
            },
            {
                headers: {
                    Authorization: localStorage.getItem("login-token"),
                },
            }
        );
        if (result.status == 200) {
            return { status: true, data: result.data };
        } else {
            return { status: false, data: result.data };
        }
    } catch (error) {
        return { status: false, data: error.response.data.error };
    }
};

export const getConversations = async () => {
    try {
        const result = await axios.get(`${api_url}/api/conv/`, {
            headers: {
                Authorization: localStorage.getItem("login-token"),
            },
        });
        if (result.status == 200) {
            return { status: true, data: result.data };
        } else {
            return { status: false, data: result.data };
        }
    } catch (error) {
        return { status: false, data: error.response.data.error };
    }
};

export const getAllChats = async (convid) => {
    try {
        const result = await axios.get(`${api_url}/api/chat/${convid}`, {
            headers: {
                Authorization: localStorage.getItem("login-token"),
            },
        });
        if (result.status == 200) {
            return { status: true, data: result.data };
        } else {
            return { status: false, data: result.data };
        }
    } catch (error) {
        return { status: false, data: error.response.data.error };
    }
};
