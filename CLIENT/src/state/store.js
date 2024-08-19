import { createSlice, configureStore, combineReducers } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "User",
    initialState: {
        id: "no-id",
        name: "no-name",
        email: "no-email",
        connectionStatus: false,
    },
    reducers: {
        updateUser: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
        updateConnectionStatus: (state, action) => {
            state.connectionStatus = action.payload;
        },
    },
});

export const { updateUser, updateConnectionStatus } = userSlice.actions;

const conversationSlice = createSlice({
    name: "Conversations",
    initialState: {
        conversations: [],
        activeConversation: {},
    },
    reducers: {
        updateConversation: (state, action) => {
            state.conversations = action.payload;
        },
        updateActiveConversation: (state, action) => {
            state.activeConversation = action.payload;
        },
        updateConvSlice: (state, action) => {
            state.conversations = action.payload.conversations;
            state.activeConversation = action.payload.activeConversation;
        },
    },
});

export const { updateConvSlice, updateActiveConversation, updateConversation } =
    conversationSlice.actions;

const chatSlice = createSlice({
    name: "Chat",
    initialState: {
        senderId: "",
        senderTyping: false,
        senderOnline: false,
        userTyping: false,
        all: [],
    },
    reducers: {
        pushToChat: (state, action) => {
            state.all.push(action.payload);
        },
        setChat: (state, action) => {
            state.all = action.payload;
        },
    },
});
export const { pushToChat, setChat } = chatSlice.actions;

const rootReducer = combineReducers({
    user: userSlice.reducer,
    conversations: conversationSlice.reducer,
    chat: chatSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
});
