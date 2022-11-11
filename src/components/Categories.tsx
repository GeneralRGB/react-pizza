import React from 'react';
import { useSelector } from 'react-redux';

import {
	selectFilter,
	setCategoryId,
	setCurrentPage,
} from '../redux/slices/filterSlice';
import { useAppDispatch } from '../redux/store';

const categories: string[] = [
	'Все',
	'Мясные',
	'Вегетарианская',
	'Гриль',
	'Острые',
	'Закрытые',
];

const Categories: React.FC = () => {
	const categoriesSlice = useSelector(selectFilter);
	const dispatch = useAppDispatch();

	return (
		<div className="categories">
			<ul>
				{categories.map((category, index) => (
					<li
						key={category}
						className={categoriesSlice.categoryId === index ? 'active' : ''}
						onClick={() => {
							dispatch(setCategoryId(index));
							dispatch(setCurrentPage(1));
						}}
					>
						{category}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Categories;
