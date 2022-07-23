import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loadUserActivities = createAsyncThunk(
  "userData/loadUserActivities",
  async (_, thunkAPI) => {
    const userId = thunkAPI.getState().userData.userDetails.userId;
    const res = await axios({
      url: "/activities/all",
      method: "POST",
      data: { userId },
    });
    return res.data;
  }
);

export const addUserActivity = createAsyncThunk(
  "userData/addUserActivity",
  async (formData, thunkAPI) => {
    const activity = {
      ...formData,
      location: `${thunkAPI.getState().map.clickedLocation[0]},${
        thunkAPI.getState().map.clickedLocation[1]
      }`,
    };
    console.log(activity);
    const res = await axios({});
  }
);

const initialState = {
  userDetails: {},
  userActivities: [],
  addActivityFormInputValues: {
    activity: "",
    duration: "",
    date: "",
  },
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setAddInputValues: (state, action) => {
      state.addActivityFormInputValues[action.payload.name] =
        action.payload.value;
    },
    resetAddInputValues: (state, action) => {
      state.addActivityFormInputValues =
        initialState.addActivityFormInputValues;
    },
  },
  extraReducers: {
    [loadUserActivities.fulfilled]: (state, action) => {
      state.userActivities = action.payload;
    },
  },
});

export const { setUserDetails, setAddInputValues, resetAddInputValues } =
  userDataSlice.actions;

export default userDataSlice.reducer;
