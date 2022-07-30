import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

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
    console.log(messages);
    return messages;
  }
);

export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async (message, thunkAPI) => {
    const senderUserId = thunkAPI.getState().userData.userDetails.userId;
    const receiverUserId = thunkAPI.getState().messages.receiverUserId;
    console.log("senderUserId ==>>>", senderUserId);
    console.log("receiverUserId ==>>>", receiverUserId);
    const res = await axios({
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
  receiverUsername: "",
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
  },
  extraReducers: {
    [searchUsers.fulfilled]: (state, action) => {
      state.searchUsersList = action.payload;
    },
    [getMessages.fulfilled]: (state, action) => {
      state.messages = action.payload;
      const receiverUsername = [...action.payload].find(
        (item) => item.user_id === current(state).receiverUserId
      ).username;
      state.receiverUsername = receiverUsername;
    },
  },
});

export const { setSearchValue, setReceiverUserId, setMessageValue } =
  messagesSlice.actions;

export default messagesSlice.reducer;
