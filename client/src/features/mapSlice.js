import { createSlice } from "@reduxjs/toolkit";

const initialState = { clickedLocation: null };

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setClickedLocation: (state, action) => {
      state.clickedLocation = action.payload;
    },
  },
});

export const { setClickedLocation } = mapSlice.actions;

export default mapSlice.reducer;
