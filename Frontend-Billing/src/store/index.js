import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

const reducer = {
  auth: authReducer,
};

export const store = configureStore({
  reducer: reducer,
  devTools: true,
});
