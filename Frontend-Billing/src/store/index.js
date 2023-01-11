import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { dateReducer } from "./dateSlice";

const reducer = {
  auth: authReducer,
  date: dateReducer,
};

export const store = configureStore({
  reducer: reducer,
  devTools: true,
});
