import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/loginSlice";
import registerReducer from "../features/registerSlice";
import modalReducer from "../features/modalSlice";
import authenticationReducer from "../features/authenticationSlice";
import userDataReducer from "../features/userDataSlice";
import mapSlice from "../features/mapSlice";
import filterActivityReducer from "../features/filterActivitySlice";
import deleteActivityReducer from "../features/deleteActivitySlice";
import editActivityReducer from "../features/editActivitySlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    modal: modalReducer,
    authentication: authenticationReducer,
    userData: userDataReducer,
    map: mapSlice,
    filterActivity: filterActivityReducer,
    deleteActivity: deleteActivityReducer,
    editActivity: editActivityReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
