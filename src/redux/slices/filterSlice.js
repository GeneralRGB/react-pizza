import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  categoryId: 0,
  currentPage: 1,
  sortType: {
    sortTypeId: 0,
    name: "популярности",
    sortParam: "rating",
    isSortTypeAsc: true,
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState: initialValue,
  reducers: {
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
  },
});

export const { setCategoryId, setIsSortTypeAsc, setSortId, setCurrentPage } =
  filterSlice.actions;

export default filterSlice.reducer;
