import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteUserActivity = createAsyncThunk(
  "userData/deleteUserActivity",
  async (activityId, thunkAPI) => {
    const res = await axios({
      url: "/activities/del",
      method: "DELETE",
      data: activityId,
      headers: {
        "Content-Type": "text/plain",
      },
    });
    console.log(res.data);
  }
);

const initialState = {
  currentActivityId: null,
};

const deleteActivitySlice = createSlice({
  name: "deleteActivity",
  initialState,
  reducers: {
    setCurrentActivityId: (state, action) => {
      state.currentActivityId = action.payload;
    },
  },
});

export const { setCurrentActivityId } = deleteActivitySlice.actions;

export default deleteActivitySlice.reducer;
