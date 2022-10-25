import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk(
  "pizzaSlice/loadPizzas",
  async ({ apiURL, pages, fetchParams }) => {
    const { data } = await axios.get(apiURL + "?" + pages + fetchParams);

    const unfilteredData = await (
      await axios.get(apiURL + "?" + fetchParams)
    ).data.length;
    const pagesAmount = Math.ceil(unfilteredData / 4);

    return { data, pagesAmount };
  }
);

const initialState = {
  items: [],
  status: "loading", // loading | error | success
  pagesAmount: 1,
};

const pizzaSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems(state, { payload }) {
      state.items = payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.items = [];
      state.status = "loading";
    },
    [fetchPizzas.fulfilled]: (state, { payload }) => {
      state.items = payload.data;
      state.pagesAmount = payload.pagesAmount;
      state.status = "success";
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = "error";
      state.pagesAmount = 1;
      state.items = [];
    },
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
