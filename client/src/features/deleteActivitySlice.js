import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadUserActivities } from "./userDataSlice";
import axios from "axios";
import { setNavigateLogin } from "./authenticationSlice";

export const deleteUserActivity = createAsyncThunk(
  "userData/deleteUserActivity",
  async (activityId, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      await axios({
        url: `${process.env.REACT_APP_PROXY}/activities/del`,
        method: "DELETE",
        data: activityId,
        withCredentials: true,
        headers: {
          "Content-Type": "text/plain",
          Authorization: thunkAPI.getState().authentication.token,
        },
      });
      thunkAPI.dispatch(loadUserActivities());
    } catch (err) {
      if (err.response.status === 403) {
        dispatch(setNavigateLogin(true));
      }
    }
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
