import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteMessages = createAsyncThunk(
  "messages/deleteMessages",
  async (receiverId, thunkAPI) => {
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_PROXY || ""}/messages/delete`,
        withCredentials: true,
        headers: {
          Authorization: thunkAPI.getState().authentication.token,
        },
        data: {
          receiverId,
          senderId: thunkAPI.getState().userData.userDetails.userId,
        },
        method: "DELETE",
      });
      thunkAPI.dispatch(getRecentMessages());
    } catch (err) {}
  }
);

export const getRecentMessages = createAsyncThunk(
  "messages/getRecentMessages",
  async (_, thunkAPI) => {
    const id = thunkAPI.getState().userData.userDetails.userId;
    const res = await axios({
      url: `${process.env.REACT_APP_PROXY || ""}/messages/recentMessages`,
      withCredentials: true,
      headers: {
        Authorization: thunkAPI.getState().authentication.token,
        "Content-Type": "text/plain",
      },
      data: id,
      method: "POST",
    });
    const messages = res.data;
    return messages;
  }
);

export const getMessages = createAsyncThunk(
  "messages/getMessages",
  async (_, thunkAPI) => {
    const senderUserId = thunkAPI.getState().userData.userDetails.userId;
    const receiverUserId = thunkAPI.getState().messages.receiverUserId;
    const res = await axios({
      url: `${process.env.REACT_APP_PROXY || ""}/messages/getMessages`,
      withCredentials: true,
      data: { senderUserId, receiverUserId },
      headers: {
        Authorization: thunkAPI.getState().authentication.token,
      },
      method: "POST",
    });
    const messages = res.data;
    return messages;
  }
);

export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async (message, thunkAPI) => {
    const senderUserId = thunkAPI.getState().userData.userDetails.userId;
    const receiverUserId = thunkAPI.getState().messages.receiverUserId;
    await axios({
      url: `${process.env.REACT_APP_PROXY || ""}/messages/send`,
      withCredentials: true,
      data: { senderUserId, receiverUserId, message, date: new Date() },
      method: "POST",
      headers: { Authorization: thunkAPI.getState().authentication.token },
    });
    thunkAPI.dispatch(getMessages());
  }
);

export const searchUsers = createAsyncThunk(
  "messages/searchUsers",
  async (_, thunkAPI) => {
    const searchValue = thunkAPI.getState().messages.searchValue;
    const res = await axios({
      url: `${process.env.REACT_APP_PROXY || ""}/messages/search`,
      withCredentials: true,
      data: searchValue,
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
        Authorization: thunkAPI.getState().authentication.token,
      },
    });
    return res.data;
  }
);

const initialState = {
  searchValue: "",
  searchUsersList: [],
  receiverUserId: null,
  messageValue: "",
  messages: [],
  recentMessages: [],
  receiverUsername: "",
  loading: false,
  deleteReceiverId: null,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setReceiverUserId: (state, action) => {
      state.receiverUserId = action.payload;
    },
    setMessageValue: (state, action) => {
      state.messageValue = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setDeleteReceiverId: (state, action) => {
      state.deleteReceiverId = action.payload;
    },
  },
  extraReducers: {
    [searchUsers.fulfilled]: (state, action) => {
      state.searchUsersList = action.payload;
    },
    [getMessages.pending]: (state, action) => {
      state.loading = true;
    },
    [getMessages.fulfilled]: (state, action) => {
      state.messages = action.payload.messages;
      state.receiverUsername = action.payload.username.username;
      state.loading = false;
    },
    [getRecentMessages.pending]: (state, action) => {
      state.loading = true;
    },
    [getRecentMessages.fulfilled]: (state, action) => {
      state.recentMessages = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setSearchValue,
  setReceiverUserId,
  setMessageValue,
  setMessages,
  setDeleteReceiverId,
} = messagesSlice.actions;

export default messagesSlice.reducer;
