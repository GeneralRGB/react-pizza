// Modules
import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./redux/slices/filterSlice";
import { addTodo } from "./redux/slices/todoSlice";

// Styles
import "./scss/app.scss";

// Components
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";

function App() {
  const [searchValue, setSearchValue] = React.useState("");

  const count = useSelector((state) => state.counter.value);
  // Todo list FOR TEST
  const todoList = useSelector((state) => state.todo.todoList);
  const [todoText, setTodoText] = React.useState("");
  const handleChange = (event) => {
    setTodoText(event.target.value);
  };

  const dispatch = useDispatch();

  return (
    // FOR TESTING
    <div className="wrapper">
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>

      <ul>{todoList.map((todo) => todo)}</ul>
      <input
        type="text"
        name=""
        id="todoText"
        onChange={handleChange}
        value={todoText}
      />
      <button
        onClick={() => {
          dispatch(addTodo(todoText));
          setTodoText("");
        }}
      >
        Add todo
      </button>
      {/* TESTING ENDS */}

      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home searchValue={searchValue} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
