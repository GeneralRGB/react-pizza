import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, { payload }) => {
      const itemFound = state.items.find((item) => item.id === payload.id);
      itemFound
        ? itemFound.count++
        : state.items.push({ ...payload, count: 1 });

      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.count,
        0
      );
    },

    removeItem: (state, { payload }) => {
      state.items = state.items.filter((item) => item.id !== payload);

      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.count,
        0
      );
    },
    decrementItemCount: (state, { payload }) => {
      const itemFound = state.items.find((item) => item.id === payload);
      itemFound.count = Math.max(1, --itemFound.count);

      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.count,
        0
      );
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, decrementItemCount, removeItem, clearItems } =
  cartSlice.actions;

export default cartSlice.reducer;
