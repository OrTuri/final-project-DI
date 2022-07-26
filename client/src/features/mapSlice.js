import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clickedLocation: null,
  cardLocation: null,
  cardMarker: null,
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setClickedLocation: (state, action) => {
      state.clickedLocation = action.payload;
    },
    setCardLocation: (state, action) => {
      state.cardLocation = action.payload;
    },
    setCardMarker: (state, action) => {
      state.cardMarker = action.payload;
    },
  },
});

export const { setClickedLocation, setCardLocation, setCardMarker } =
  mapSlice.actions;

export default mapSlice.reducer;
