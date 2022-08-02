import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setModal, setModalTitle, setModalBody } from "./modalSlice";

export const getFavourites = createAsyncThunk(
  "nutrition/getFavourites",
  async (_, thunkAPI) => {}
);

export const saveFood = createAsyncThunk(
  "nutrition/saveFood",
  async (foodData, thunkAPI) => {
    try {
      const userId = thunkAPI.getState().userData.userDetails.userId;
      await axios({
        url: `${process.env.REACT_APP_PROXY || ""}/nutrition/save`,
        method: "POST",
        withCredentials: true,
        headers: { Authorization: thunkAPI.getState().authentication.token },
        data: { ...foodData, userId },
      });
      thunkAPI.dispatch(setModal(true));
      thunkAPI.dispatch(setModalTitle("Saved successfully! 🟢"));
      thunkAPI.dispatch(
        setModalBody(
          "Your food was saved successfully\nClick on the Favourites tab to see it!"
        )
      );
    } catch (err) {
      console.log(err);
      thunkAPI.dispatch(setModal(true));
      thunkAPI.dispatch(setModalTitle("There was an Error! ⛔"));
      thunkAPI.dispatch(setModalBody("Please try again later!"));
    }
  }
);

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
      console.log(action.payload);
      const {
        ndb_no: id,
        nf_calories: calories,
        nf_protein: protein,
        nf_total_fat: fat,
        photo: { highres: imgSrc },
        tags: { item: name },
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
