import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UrlParams } from '../../pages/Home';
import { RootState } from '../store';

export enum SortingParams {
	RATING = 'rating',
	TITLE = 'title',
	PRICE = 'price',
}

type SortParams = {
	sortTypeId: number;
	name: string;
	sortParam: SortingParams;
	isSortTypeAsc: boolean;
};

interface FilterSlice {
	searchValue: string;
	categoryId: number;
	currentPage: number;
	sortType: SortParams;
	loaded: boolean;
}

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

export const selectFilter = (state: RootState) => state.filterSlice;
export const selectCategoryId = (state: RootState) =>
	state.filterSlice.categoryId;
export const selectSortType = (state: RootState) => state.filterSlice.sortType;

export default filterSlice.reducer;
