import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
  extraReducers: {
    [searchUsers.fulfilled]: (state, action) => {
      state.searchUsersList = action.payload;
      console.log(action.payload);
    },
  },
});

export const { setSearchValue } = messagesSlice.actions;

export default messagesSlice.reducer;
