import { createSlice } from "@reduxjs/toolkit";

const initialState = { token: "", navigateLogin: false };

const AuthenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setNavigateLogin: (state, action) => {
      state.navigateLogin = action.payload;
    },
  },
});

export const { setToken, setNavigateLogin } = AuthenticationSlice.actions;

export default AuthenticationSlice.reducer;
