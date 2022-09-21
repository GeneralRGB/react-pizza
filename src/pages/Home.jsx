import React from "react";

// Modules
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

// Data
const sortOptions = [
  { name: "популярности", sortParam: "rating" },
  { name: "цене", sortParam: "price" },
  { name: "алфавиту", sortParam: "title" },
];

export default function Home({ searchValue }) {
  const apiURL =
    "https://6307af893a2114bac76922d9.mockapi.io/photos/react-pizza";

  // Hooks
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortTypeId, setSortTypeId] = React.useState(0);
  const [isSortTypeAsc, setIsSortTypeAsc] = React.useState(true);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);

    const category = categoryId !== 0 ? `category=${categoryId}&` : "";
    const sortType = isSortTypeAsc ? "asc" : "desc";
    const sort = `sortBy=${sortOptions[sortTypeId].sortParam}&order=${sortType}`;
    const search = searchValue ? `search=${searchValue}&` : "";
    const fetchParams = "?" + category + search + sort;

    fetch(apiURL + fetchParams)
      .then((response) => response.json())
      .then((responseData) => {
        setPizzas(responseData);
        setIsLoading(false);
      });
  }, [categoryId, sortTypeId, isSortTypeAsc, searchValue]);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const pizzaElements = pizzas.map((item) => (
    <PizzaBlock key={item.id} {...item} />
  ));

  return (
    <>
      <div className="content__top">
        <Categories categoryId={categoryId} setCategoryId={setCategoryId} />
        <Sort
          sortTypeId={sortTypeId}
          setSortTypeId={setSortTypeId}
          sortOptions={sortOptions}
          isSortTypeAsc={isSortTypeAsc}
          setIsSortTypeAsc={setIsSortTypeAsc}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? skeletons : pizzaElements}
      </div>
    </>
  );
}
