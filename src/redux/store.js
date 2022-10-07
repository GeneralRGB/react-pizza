import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice";
import todoSlice from "./slices/todoSlice";

export const store = configureStore({
  reducer: {
    todo: todoSlice,
    counter: filterSlice,
  },
});
