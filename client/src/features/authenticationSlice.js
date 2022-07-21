import { createSlice } from "@reduxjs/toolkit";

const initialState = { token: "" };

const AuthenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = AuthenticationSlice.actions;

export default AuthenticationSlice.reducer;
