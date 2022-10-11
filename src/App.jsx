// Modules
import React from "react";
import { Routes, Route } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { decrement, increment } from "./redux/slices/filterSlice";

// Styles
import "./scss/app.scss";

// Components
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";

function App() {
  const [searchValue, setSearchValue] = React.useState("");

  // const count = useSelector((state) => state.filterSlice.value);
  // const dispatch = useDispatch();

  return (
    <div className="wrapper">
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
