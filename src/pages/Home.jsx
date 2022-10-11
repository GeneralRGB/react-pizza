import React from "react";
import { useSelector } from "react-redux";

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
const apiURL = "https://6307af893a2114bac76922d9.mockapi.io/photos/react-pizza";

export default function Home({ searchValue }) {
  // Redux
  const sortSlice = useSelector((state) => state.filterSlice);

  // Hooks
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [pagesAmount, setPagesAmount] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);

  // Data fetching
  React.useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);

    const category =
      sortSlice.categoryId !== 0 ? `category=${sortSlice.categoryId}&` : "";
    const sortType = sortSlice.sortType.isSortTypeAsc ? "asc" : "desc";
    const sort = `sortBy=${
      sortOptions[sortSlice.sortType.sortTypeId].sortParam
    }&order=${sortType}`;
    const search = searchValue ? `search=${searchValue}&` : "";
    const pages = `page=${currentPage}&limit=4&`;
    const fetchParams = category + search + sort;

    fetch(apiURL + "?" + pages + fetchParams)
      .then((response) => response.json())
      .then((responseData) => {
        setIsLoading(false);
        setPizzas(responseData);
      });

    fetch(apiURL + "?" + fetchParams)
      .then((response) => response.json())
      .then((responseData) => {
        setPagesAmount(Math.ceil(responseData.length / 4));
      });
  }, [sortSlice, searchValue, currentPage]);

  // Pizza blocks
  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const pizzaElements = pizzas.map((item) => (
    <PizzaBlock key={item.id} {...item} />
  ));

  return (
    <>
      <div className="content__top">
        <Categories setCurrentPage={setCurrentPage} />
        <Sort sortOptions={sortOptions} />
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
