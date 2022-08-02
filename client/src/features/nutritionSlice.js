import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getFoodData = createAsyncThunk(
  "nutrition/getFoodData",
  async ({ food, grams }, thunkAPI) => {
    console.log(process.env.REACT_APP_NUTRITIONX_API_ID);
    const res = await axios({
      url: "https://trackapi.nutritionix.com/v2/natural/nutrients",
      data: {
        query: `${food} ${grams} grams`,
      },
      headers: {
        "Content-Type": "application/json",
        "x-app-id": process.env.REACT_APP_NUTRITIONX_API_ID,
        "x-app-key": process.env.REACT_APP_NUTRITIONX_API_KEY,
        "x-remote-user-id": "0",
      },
      method: "POST",
    });
    console.log(res);
  }
);

const initialState = {
  searchValues: {
    food: "",
    grams: "",
  },
};

const nutritionSlice = createSlice({
  name: "nutrition",
  initialState,
  reducers: {
    setSearchValues: (state, action) => {
      state.searchValues[action.payload.name] = action.payload.value;
    },
    resetSearchValues: (state, action) => {
      state.searchValues = initialState.searchValues;
    },
  },
});

export const { setSearchValues, resetSearchValues } = nutritionSlice.actions;

export default nutritionSlice.reducer;
