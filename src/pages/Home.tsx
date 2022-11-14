import React from 'react';
import { useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

// Modules
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

// Redux
import { useAppDispatch } from '../redux/store';
import { setFilters } from '../redux/slices/filter/slice';
import { fetchPizzas } from '../redux/slices/pizza/functions';
import { selectFilter } from '../redux/slices/filter/selectors';
import { SortingParams } from '../redux/slices/filter/types';

type SortListItem = {
	name: string;
	sortParam: string;
};

export type UrlParams = {
	categoryId: string;
	currentPage: string;
	isSortTypeAsc: string;
	sortTypeId: string;
};

// Data
export const sortOptions: SortListItem[] = [
	{ name: 'популярности', sortParam: SortingParams.RATING },
	{ name: 'цене', sortParam: SortingParams.PRICE },
	{ name: 'алфавиту', sortParam: SortingParams.TITLE },
];
export const apiURL =
	'https://6307af893a2114bac76922d9.mockapi.io/photos/react-pizza';

const Home: React.FC = () => {
	// Redux
	const sortSlice = useSelector(selectFilter);
	const searchValue = sortSlice.searchValue;
	const dispatch = useAppDispatch();
	const { items, status } = useSelector((state: any) => state.pizzaSlice);

	// Hooks
	const navigate = useNavigate();
	const firstLoad = React.useRef(true);
	const isMounted = React.useRef(false);

	// Processing URL parameters on the first load
	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1)) as UrlParams;
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
			sortSlice.categoryId !== 0 ? `category=${sortSlice.categoryId}&` : '';
		const sortType = sortSlice.sortType.isSortTypeAsc ? 'asc' : 'desc';
		const sort = `sortBy=${
			sortOptions[sortSlice.sortType.sortTypeId].sortParam
		}&order=${sortType}`;
		const search = searchValue ? `search=${searchValue}&` : '';
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
	const pizzaElements = items.map((item: any) => (
		<PizzaBlock key={item.id} {...item} />
	));

	return (
		<>
			<div className="content__top">
				<Categories />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{status === 'error' ? (
					<h2 className="content__error-info">Произошла ошибка 😢</h2>
				) : status === 'loading' ? (
					skeletons
				) : (
					pizzaElements
				)}
			</div>
			<Pagination />
		</>
	);
};

export default Home;
