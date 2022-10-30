// Modules
import React from "react";
import { Routes, Route } from "react-router-dom";

// Styles
import "./scss/app.scss";

// Components
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import PizzaInfo from "./pages/PizzaInfo";
import MainLayout from "./layouts/MainLayout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<PizzaInfo />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
