import React from "react";

export default function Categories({ categoryId, setCategoryId }) {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={category}
            className={categoryId === index ? "active" : ""}
            onClick={() => setCategoryId(index)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
