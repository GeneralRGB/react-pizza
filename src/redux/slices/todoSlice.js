import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  todoList: [
    <li>
      <b>TodoList</b>
    </li>,
  ],
};

export const todoSlice = createSlice({
  name: "todoList",
  initialState: initialValue,
  reducers: {
    addTodo: (state, action) => {
      state.todoList.push(<li>{action.payload}</li>);
    },
  },
});

export const { addTodo } = todoSlice.actions;

export default todoSlice.reducer;
