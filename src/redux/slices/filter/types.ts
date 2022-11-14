export enum SortingParams {
	RATING = 'rating',
	TITLE = 'title',
	PRICE = 'price',
}

export type SortParams = {
	sortTypeId: number;
	name: string;
	sortParam: SortingParams;
	isSortTypeAsc: boolean;
};

export interface FilterSlice {
	searchValue: string;
	categoryId: number;
	currentPage: number;
	sortType: SortParams;
	loaded: boolean;
}
