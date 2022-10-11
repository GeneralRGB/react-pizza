import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { setCategoryId } from "../redux/slices/filterSlice";

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];
export default function Categories({ setCurrentPage }) {
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
              setCurrentPage(1);
            }}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
