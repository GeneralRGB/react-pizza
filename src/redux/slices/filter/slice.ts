import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UrlParams } from '../../../pages/Home';
import { FilterSlice, SortingParams } from './types';

const initialValue: FilterSlice = {
	searchValue: '',
	categoryId: 0,
	currentPage: 1,
	sortType: {
		sortTypeId: 0,
		name: 'популярности',
		sortParam: SortingParams.RATING,
		isSortTypeAsc: true,
	},
	loaded: false,
};

const filterSlice = createSlice({
	name: 'filter',
	initialState: initialValue,
	reducers: {
		setSearchValue(state, { payload }: PayloadAction<string>) {
			state.searchValue = payload;
		},
		setCategoryId(state, { payload }: PayloadAction<number>) {
			state.categoryId = payload;
		},
		setIsSortTypeAsc(state, { payload }: PayloadAction<boolean>) {
			state.sortType.isSortTypeAsc = payload;
		},
		setSortId(state, { payload }: PayloadAction<number>) {
			state.sortType.sortTypeId = payload;
		},
		setCurrentPage(state, { payload }: PayloadAction<number>) {
			state.currentPage = payload;
		},
		setFilters(state, { payload }: PayloadAction<UrlParams>) {
			state.currentPage = Number(payload.currentPage);
			state.categoryId = Number(payload.categoryId);
			state.sortType.sortTypeId = Number(payload.sortTypeId);
			state.loaded = true;
			state.sortType.isSortTypeAsc =
				payload.isSortTypeAsc === 'true' ? true : false;
		},
	},
});

export const {
	setCategoryId,
	setIsSortTypeAsc,
	setSortId,
	setCurrentPage,
	setFilters,
	setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
