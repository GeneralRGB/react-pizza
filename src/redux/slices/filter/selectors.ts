import { RootState } from '../../store';

export const selectFilter = (state: RootState) => state.filterSlice;
export const selectCategoryId = (state: RootState) =>
	state.filterSlice.categoryId;
export const selectSortType = (state: RootState) => state.filterSlice.sortType;
export const selectCurrentPage = (state: RootState) =>
	state.filterSlice.currentPage;
