import React from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';

import { setCurrentPage } from '../../redux/slices/filter/slice';
import { RootState, useAppDispatch } from '../../redux/store';
import styles from './pagination.module.scss';

export default function Pagination() {
	const dispatch = useAppDispatch();

	const { pagesAmount } = useSelector((state: RootState) => state.pizzaSlice);

	return (
		<ReactPaginate
			className={styles.root}
			breakLabel="..."
			nextLabel=">"
			previousLabel="<"
			onPageChange={(event) => dispatch(setCurrentPage(event.selected + 1))}
			pageRangeDisplayed={4}
			pageCount={pagesAmount}
		/>
	);
}
