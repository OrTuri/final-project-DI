import { createSlice } from "@reduxjs/toolkit";

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
