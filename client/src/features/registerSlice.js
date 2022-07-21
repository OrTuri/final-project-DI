import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inputs: {
    username: "",
    password: "",
    fullName: "",
    age: "",
    height: "",
    weight: "",
    gender: "male",
  },
};

const registerSlice = createSlice({
  name: "register",
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

export const { inputValues, resetInputs } = registerSlice.actions;

export default registerSlice.reducer;
