import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  searchValue: "",
  categoryId: 0,
  currentPage: 1,
  sortType: {
    sortTypeId: 0,
    name: "популярности",
    sortParam: "rating",
    isSortTypeAsc: true,
  },
  loaded: false,
};

const filterSlice = createSlice({
  name: "filter",
  initialState: initialValue,
  reducers: {
    setSearchValue(state, { payload }) {
      state.searchValue = payload;
    },
    setCategoryId(state, { payload }) {
      state.categoryId = payload;
    },
    setIsSortTypeAsc(state, { payload }) {
      state.sortType.isSortTypeAsc = payload;
    },
    setSortId(state, { payload }) {
      state.sortType.sortTypeId = payload;
    },
    setCurrentPage(state, { payload }) {
      state.currentPage = payload;
    },
    setFilters(state, { payload }) {
      state.currentPage = Number(payload.currentPage);
      state.categoryId = Number(payload.categoryId);
      state.sortType.sortTypeId = Number(payload.sortTypeId);
      state.loaded = true;
      state.sortType.isSortTypeAsc =
        payload.isSortTypeAsc === "true" ? true : false;
    },
  },
});

export const {
  setCategoryId,
  setIsSortTypeAsc,
  setSortId,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export const selectFilter = (state) => state.filterSlice;

export default filterSlice.reducer;
