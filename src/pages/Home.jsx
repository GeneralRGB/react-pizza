import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

// Modules
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";

// Redux
import { setCurrentPage, setFilters } from "../redux/slices/filterSlice";

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

  // Hooks
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [pagesAmount, setPagesAmount] = React.useState(0);
  const navigate = useNavigate();
  const firstLoad = React.useRef(true);
  const isMounted = React.useRef(false);

  // Functions
  const onPageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

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
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }

    window.scrollTo(0, 0);
    setIsLoading(true);

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

    // Requests
    axios.get(apiURL + "?" + pages + fetchParams).then((response) => {
      setIsLoading(false);
      setPizzas(response.data);
    });
    // Number of pages
    axios
      .get(apiURL + "?" + fetchParams)
      .then((response) => setPagesAmount(Math.ceil(response.data.length / 4)));
  }, [sortSlice, searchValue, firstLoad]);

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
  const pizzaElements = pizzas.map((item) => (
    <PizzaBlock key={item.id} {...item} />
  ));

  return (
    <>
      <div className="content__top">
        <Categories setCurrentPage={onPageChange} />
        <Sort sortOptions={sortOptions} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? skeletons : pizzaElements}
      </div>
      <Pagination onPageChange={onPageChange} pagesAmount={pagesAmount} />
    </>
  );
}
