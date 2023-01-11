import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { dateReducer } from "./dateSlice";
import { listdataReducer } from "./listdataSlice";

const reducer = {
  auth: authReducer,
  date: dateReducer,
  listdata: listdataReducer,
};

export const store = configureStore({
  reducer: reducer,
  devTools: true,
});
