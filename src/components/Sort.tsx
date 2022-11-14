import React from 'react';
import { useSelector } from 'react-redux';

import { setIsSortTypeAsc, setSortId } from '../redux/slices/filter/slice';

import { sortOptions } from '../pages/Home';
import { useAppDispatch } from '../redux/store';
import { selectSortType } from '../redux/slices/filter/selectors';

const Sort: React.FC = React.memo(() => {
	const dispatch = useAppDispatch();
	const sortType = useSelector(selectSortType);
	// Hooks
	const [isVisible, setIsVisible] = React.useState(false);
	const sortRef = React.useRef<HTMLDivElement>(null);

	// Close popup when user clicks outside.
	React.useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const _event = event as MouseEvent & { path: Node[] };
			if (sortRef.current && !_event.composedPath().includes(sortRef.current))
				setIsVisible(false);
		};
		window.document.body.addEventListener('click', handleClickOutside);

		// Remove event listener when component is unmounted
		return () =>
			window.document.body.removeEventListener('click', handleClickOutside);
	}, []);

	const setSortOption = (index: number) => {
		dispatch(setSortId(index));
		setIsVisible(false);
	};

	return (
		<div className="sort" ref={sortRef}>
			<div className="sort__label">
				<svg
					className={sortType.isSortTypeAsc ? 'ascending' : ''}
					width="10"
					height="6"
					viewBox="0 0 10 6"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
						fill="#2C2C2C"
					/>
				</svg>
				<b>Сортировка по:</b>
				<span onClick={() => setIsVisible((prev) => !prev)}>
					{sortOptions[sortType.sortTypeId].name}
				</span>
			</div>
			{isVisible && (
				<div className="sort__popup">
					<ul>
						{sortOptions.map((option, index) => (
							<li
								className={index === sortType.sortTypeId ? 'active' : ''}
								key={option.name}
								onClick={() => {
									index === sortType.sortTypeId
										? dispatch(setIsSortTypeAsc(!sortType.isSortTypeAsc))
										: dispatch(setIsSortTypeAsc(true));
									setSortOption(index);
								}}
							>
								{option.name}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
});
export default Sort;
