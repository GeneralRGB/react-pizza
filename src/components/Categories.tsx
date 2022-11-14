import React from 'react';
import { useSelector } from 'react-redux';

import { setCategoryId, setCurrentPage } from '../redux/slices/filter/slice';
import { selectCategoryId } from '../redux/slices/filter/selectors';
import { useAppDispatch } from '../redux/store';

const categories: string[] = [
	'Все',
	'Мясные',
	'Вегетарианская',
	'Гриль',
	'Острые',
	'Закрытые',
];

const Categories: React.FC = React.memo(() => {
	const categoryId = useSelector(selectCategoryId);
	const dispatch = useAppDispatch();
	return (
		<div className="categories">
			<ul>
				{categories.map((category, index) => (
					<li
						key={category}
						className={categoryId === index ? 'active' : ''}
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
});

export default Categories;
