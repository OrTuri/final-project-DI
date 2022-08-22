import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setModal, setModalTitle, setModalBody } from "./modalSlice";

export const deleteFood = createAsyncThunk(
  "nutrition/deleteFood",
  async (foodId, thunkAPI) => {
    try {
      await axios({
        url: `${process.env.REACT_APP_PROXY || ""}/nutrition/delete`,
        method: "DELETE",
        headers: {
          Authorization: thunkAPI.getState().authentication.token,
          "Content-Type": "text/plain",
        },
        withCredentials: true,
        data: foodId,
      });
      thunkAPI.dispatch(getFavourites());
    } catch (err) {
      console.log(err);
    }
  }
);

export const getFavourites = createAsyncThunk(
  "nutrition/getFavourites",
  async (_, thunkAPI) => {
    const userId = thunkAPI.getState().userData.userDetails.userId;
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_PROXY || ""}/nutrition/favourites`,
        data: userId,
        method: "POST",
        withCredentials: true,
        headers: {
          Authorization: thunkAPI.getState().authentication.token,
          "Content-Type": "text/plain",
        },
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
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
    try {
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
    } catch (err) {
      console.log(err);
      thunkAPI.dispatch(setModal(true));
      thunkAPI.dispatch(setModalTitle("ERROR! ⛔"));
      thunkAPI.dispatch(
        setModalBody(
          "Could not find what you looked for!\nPlease search something different!"
        )
      );
      throw new Error();
    }
  }
);

const initialState = {
  searchValues: {
    food: "",
    grams: "",
  },
  searchResults: [],
  favourites: [],
  loading: false,
  foodIdForDeletion: null,
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
    setFoodIdForDeletion: (state, action) => {
      state.foodIdForDeletion = action.payload;
    },
  },
  extraReducers: {
    [getFoodData.pending]: (state, action) => {
      state.loading = true;
    },
    [getFoodData.rejected]: (state, action) => {
      state.loading = false;
    },
    [getFoodData.fulfilled]: (state, action) => {
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
      state.loading = false;
    },
    [getFavourites.pending]: (state, action) => {
      state.loading = true;
    },
    [getFavourites.fulfilled]: (state, action) => {
      state.favourites = action.payload;
      state.loading = false;
    },
  },
});

export const { setSearchValues, resetSearchValues, setFoodIdForDeletion } =
  nutritionSlice.actions;

export default nutritionSlice.reducer;
