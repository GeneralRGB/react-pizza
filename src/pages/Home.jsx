import React from "react";
import { useSelector, useDispatch } from "react-redux";
import qs from "qs";
import { useNavigate } from "react-router-dom";

// Modules
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";

// Redux
import { setFilters } from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzaSlice";

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
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.pizzaSlice);

  // Hooks
  const navigate = useNavigate();
  const firstLoad = React.useRef(true);
  const isMounted = React.useRef(false);

  // Processing URL parameters on the first load
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(setFilters({ ...params }));
    } else {
      firstLoad.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Data fetching
  React.useEffect(() => {
    // Fix for bug with double fetching on the first load
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }

    // Setting URL parameters
    const category =
      sortSlice.categoryId !== 0 ? `category=${sortSlice.categoryId}&` : "";
    const sortType = sortSlice.sortType.isSortTypeAsc ? "asc" : "desc";
    const sort = `sortBy=${
      sortOptions[sortSlice.sortType.sortTypeId].sortParam
    }&order=${sortType}`;
    const search = searchValue ? `search=${searchValue}&` : "";
    const pages = `page=${sortSlice.currentPage}&limit=4&`;
    const fetchParams = category + search + sort;

    // Requesting pizzas & page count
    dispatch(fetchPizzas({ apiURL, pages, fetchParams }));

    window.scrollTo(0, 0);
  }, [sortSlice, searchValue, firstLoad, dispatch]);

  // Setting URL parameters
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId: sortSlice.categoryId,
        currentPage: sortSlice.currentPage,
        sortTypeId: sortSlice.sortType.sortTypeId,
        isSortTypeAsc: sortSlice.sortType.isSortTypeAsc,
      });
      navigate(`?${queryString}`);
    } else {
      isMounted.current = true;
    }
  }, [
    sortSlice.sortType.sortTypeId,
    sortSlice.categoryId,
    sortSlice.currentPage,
    sortSlice.sortType.isSortTypeAsc,
    navigate,
  ]);

  // Pizza blocks
  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const pizzaElements = items.map((item) => (
    <PizzaBlock key={item.id} {...item} />
  ));

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort sortOptions={sortOptions} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === "error" ? (
          <h2 className="content__error-info">Произошла ошибка 😢</h2>
        ) : status === "loading" ? (
          skeletons
        ) : (
          pizzaElements
        )}
      </div>
      <Pagination />
    </>
  );
}
