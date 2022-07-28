import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setNavigateLogin } from "./authenticationSlice";

export const loadUserActivities = createAsyncThunk(
  "userData/loadUserActivities",
  async (_, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      const userId = thunkAPI.getState().userData.userDetails.userId;
      const res = await axios({
        url: "/activities/all",
        method: "POST",
        data: { userId },
      });
      return res.data;
    } catch (err) {
      if (err.response.status === 403) {
        dispatch(setNavigateLogin(true));
      }
    }
  }
);

export const addUserActivity = createAsyncThunk(
  "userData/addUserActivity",
  async (formData, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      const { bmr } = thunkAPI.getState().userData.userDetails;
      const caloriesBurned = (
        ((bmr * (formData.activity === "running" ? 11 : 6.8)) / 24) *
        (Number(formData.duration) / 60)
      ).toFixed(0);

      const activity = {
        ...formData,
        location: `${thunkAPI.getState().map.clickedLocation[0]},${
          thunkAPI.getState().map.clickedLocation[1]
        }`,
        caloriesBurned,
        userId: thunkAPI.getState().userData.userDetails.userId,
      };
      const res = await axios({
        url: "/activities/add",
        method: "POST",
        data: activity,
      });
      return res.data;
    } catch (err) {
      if (err.response.status === 403) {
        dispatch(setNavigateLogin(true));
      }
    }
  }
);

const initialState = {
  userDetails: {},
  userActivities: [],
  markers: [],
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
    addMarkers: (state, action) => {
      state.markers.push({
        id: action.payload.id,
        marker: action.payload.marker,
      });
    },
    resetData: (state, action) => {
      return initialState;
    },
  },
  extraReducers: {
    [loadUserActivities.fulfilled]: (state, action) => {
      state.userActivities = action.payload;
    },
    [addUserActivity.fulfilled]: (state, action) => {
      state.userActivities = action.payload;
    },
  },
});

export const {
  setUserDetails,
  setAddInputValues,
  resetAddInputValues,
  addMarkers,
  resetData,
} = userDataSlice.actions;

export default userDataSlice.reducer;
