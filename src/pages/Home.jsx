import React from "react";

// Modules
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";

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
  const [pagesAmount, setPagesAmount] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isSortTypeAsc, setIsSortTypeAsc] = React.useState(true);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);

    const category = categoryId !== 0 ? `category=${categoryId}&` : "";
    const sortType = isSortTypeAsc ? "asc" : "desc";
    const sort = `sortBy=${sortOptions[sortTypeId].sortParam}&order=${sortType}`;
    const search = searchValue ? `search=${searchValue}&` : "";
    const pages = `page=${currentPage}&limit=4&`;
    const fetchParams = category + search + sort;

    fetch(apiURL + "?" + pages + fetchParams)
      .then((response) => response.json())
      .then((responseData) => {
        setIsLoading(false);
        setPizzas(responseData);
        console.log(apiURL + "?" + pages + fetchParams);
      });

    fetch(apiURL + "?" + fetchParams)
      .then((response) => response.json())
      .then((responseData) => {
        setPagesAmount(Math.ceil(responseData.length / 4));
      });
  }, [categoryId, sortTypeId, isSortTypeAsc, searchValue, currentPage]);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const pizzaElements = pizzas.map((item) => (
    <PizzaBlock key={item.id} {...item} />
  ));

  return (
    <>
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          setCurrentPage={setCurrentPage}
        />
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
      <Pagination
        onPageChange={(number) => setCurrentPage(number)}
        pagesAmount={pagesAmount}
      />
    </>
  );
}
