import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
  data: [],
  searchTerms: {
    startDate: "",
    endDate: "",
    selecttype: "",
    selectcategory: "",
    keyword: "",
  },
};

const listdataSlice = createSlice({
  name: "listdata",
  initialState,
  reducers: {
    setinitialData(state, action) {
      state.data = action.payload;
    },
    filterData(state, action) {
      let formatStart = moment(state.searchTerms.startDate).format(
        "YYYY-MM-DD"
      );
      let formatEnd = moment(state.searchTerms.endDate).format("YYYY-MM-DD");
      let cleanedKeyword = state.searchTerms.keyword
        .split(/[^\w\s]/gi)
        .join("")
        .toLowerCase();
      state.data = state.data.filter((item) => {
        return (
          (item.recorddate >= formatStart || !isNaN(formatStart)) &&
          (item.recorddate <= formatEnd || !isNaN(formatEnd)) &&
          (state.searchTerms.selecttype === "" ||
            item.datatype === state.searchTerms.selecttype) &&
          (state.searchTerms.selectcategory === "" ||
            item.category === state.searchTerms.selectcategory) &&
          item.notes
            .split(/[^\w\s]/gi)
            .join("")
            .toLowerCase()
            .includes(cleanedKeyword)
        );
      });
    },
    updateStartDate(state, action) {
      state.searchTerms.startDate = action.payload;
    },
    updateEndDate(state, action) {
      state.searchTerms.endDate = action.payload;
    },
    updateType(state, action) {
      state.searchTerms.selecttype = action.payload;
    },
    updateCategory(state, action) {
      state.searchTerms.selectcategory = action.payload;
    },
    updateKeyword(state, action) {
      state.searchTerms.keyword = action.payload;
    },
    clearSearchTerms(state, action) {
      state.searchTerms.startDate = "";
      state.searchTerms.endDate = "";
      state.searchTerms.selecttype = "";
      state.searchTerms.selectcategory = "";
      state.searchTerms.keyword = "";
    },
  },
});

export const {
  setinitialData,
  filterData,
  updateStartDate,
  updateEndDate,
  updateType,
  updateCategory,
  updateKeyword,
  clearSearchTerms,
} = listdataSlice.actions;
export const listdataReducer = listdataSlice.reducer;
