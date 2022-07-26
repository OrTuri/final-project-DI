import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectValue: "date",
};

const filterActivitySlice = createSlice({
  name: "filterActivity",
  initialState,
  reducers: {
    setSelectValue: (state, action) => {
      state.selectValue = action.payload;
    },
  },
});

export const { setSelectValue } = filterActivitySlice.actions;

export default filterActivitySlice.reducer;
