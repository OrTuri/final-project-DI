import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/loginSlice";
import registerReducer from "../features/registerSlice";
import modalReducer from "../features/modalSlice";
import authenticationReducer from "../features/authenticationSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    modal: modalReducer,
    authentication: authenticationReducer,
  },
});

export default store;
