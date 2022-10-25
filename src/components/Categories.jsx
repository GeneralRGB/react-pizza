import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];
export default function Categories() {
  const categoriesSlice = useSelector((state) => state.filterSlice);
  const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={category}
            className={categoriesSlice.categoryId === index ? "active" : ""}
            onClick={() => {
              dispatch(setCategoryId(index));
              dispatch(setCurrentPage(1));
            }}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
