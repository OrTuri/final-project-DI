import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  modalTitle: "",
  modalBody: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (state, action) => {
      state.isOpen = action.payload;
    },
    setModalTitle: (state, action) => {
      state.modalTitle = action.payload;
    },
    setModalBody: (state, action) => {
      state.modalBody = action.payload;
    },
  },
});

export const { setModal, setModalTitle, setModalBody } = modalSlice.actions;

export default modalSlice.reducer;
