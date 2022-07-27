import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentActivityId: null,
  editValues: {
    activity: "",
    duration: "",
    date: "",
    coords: "",
  },
  editLocation: null,
};

const editActivitySlice = createSlice({
  name: "editActivity",
  initialState,
  reducers: {
    setCurrentActivityId: (state, action) => {
      state.currentActivityId = action.payload;
    },
    setValues: (state, action) => {
      state.editValues[action.payload.name] = action.payload.value;
    },
    setEditLocation: (state, action) => {
      state.editLocation = action.payload;
    },
  },
});

export const { setCurrentActivityId, setValues, setEditLocation } =
  editActivitySlice.actions;

export default editActivitySlice.reducer;
