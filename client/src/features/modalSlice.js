import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  modalTitle: "",
  modalBody: "",
  modalZoomControl: true,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (state, action) => {
      state.isOpen = action.payload;
      if (action.payload) {
        state.modalZoomControl = false;
      }
    },
    setModalTitle: (state, action) => {
      state.modalTitle = action.payload;
    },
    setModalBody: (state, action) => {
      state.modalBody = action.payload;
    },
    resetModal: (state, action) => {
      state = initialState;
      state.modalZoomControl = true;
    },
  },
});

export const { setModal, setModalTitle, setModalBody } = modalSlice.actions;

export default modalSlice.reducer;
