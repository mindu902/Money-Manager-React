import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const today = moment().format("YYYY-MM-DD");
const initialState = {
  date: today,
  month: moment(today).month() + 1,
  year: moment(today).year(),
};
const dateSlice = createSlice({
  name: "dates",
  initialState,
  reducers: {
    updateTime(state, action) {
      state.date = action.payload.date;
      state.month = action.payload.month;
      state.year = action.payload.year;
    },
  },
});

export const { updateTime } = dateSlice.actions;
export const dateReducer = dateSlice.reducer;
