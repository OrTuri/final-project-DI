import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getFoodData = createAsyncThunk(
  "nutrition/getFoodData",
  async ({ food, grams }, thunkAPI) => {
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
    return res.data;
  }
);

const initialState = {
  searchValues: {
    food: "",
    grams: "",
  },
  searchResults: [],
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
  extraReducers: {
    [getFoodData.fulfilled]: (state, action) => {
      const {
        ndb_no: id,
        nf_calories: calories,
        nf_protein: protein,
        nf_total_fat: fat,
        photo: { highres: imgSrc },
        food_name: name,
        nf_total_carbohydrate: carbohydrates,
        serving_weight_grams: grams,
      } = action.payload.foods[0];
      const food = {
        name,
        calories,
        fat,
        protein,
        imgSrc,
        carbohydrates,
        id,
        grams,
      };
      state.searchResults.push(food);
    },
  },
});

export const { setSearchValues, resetSearchValues } = nutritionSlice.actions;

export default nutritionSlice.reducer;
