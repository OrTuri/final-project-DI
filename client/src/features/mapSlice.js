import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clickedLocation: null,
  cardLocation: null,
  cardMarker: null,
  mode: "add",
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
      state.clickedLocation = null;
    },
    setCardMarker: (state, action) => {
      state.cardMarker = action.payload;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { setClickedLocation, setCardLocation, setCardMarker, setMode } =
  mapSlice.actions;

export default mapSlice.reducer;
