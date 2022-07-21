import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inputs: {
    username: "",
    password: "",
  },
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    inputValues: (state, action) => {
      state.inputs[action.payload.name] = action.payload.value;
    },
    resetInputs: (state, action) => {
      state.inputs = initialState.inputs;
    },
  },
});

export const { inputValues, resetInputs } = loginSlice.actions;

export default loginSlice.reducer;
