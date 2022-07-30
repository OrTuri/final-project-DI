import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async (message, thunkAPI) => {
    const senderUserId = thunkAPI.getState().userData.userDetails.userId;
    const receiverUserId = thunkAPI.getState().messages.currentConversationId;
    console.log(receiverUserId);
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
      console.log("receiverUserId =>>>", action.payload);
    },
    setMessageValue: (state, action) => {
      state.messageValue = action.payload;
    },
  },
  extraReducers: {
    [searchUsers.fulfilled]: (state, action) => {
      state.searchUsersList = action.payload;
    },
  },
});

export const { setSearchValue, setReceiverUserId, setMessageValue } =
  messagesSlice.actions;

export default messagesSlice.reducer;
