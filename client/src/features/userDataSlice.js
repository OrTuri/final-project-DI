import { createSlice } from "@reduxjs/toolkit";

const initialState = { userDetails: {} };

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

export const { setUserDetails } = userDataSlice.actions;

export default userDataSlice.reducer;
