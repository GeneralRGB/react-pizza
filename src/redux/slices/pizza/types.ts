import { TPizzaBlock } from '../../../components/PizzaBlock';

export type PizzaProps = {
	apiURL: string;
	pages: string;
	fetchParams: string;
};

export interface FetchPizzas {
	data: TPizzaBlock[];
	pagesAmount: number;
}

export enum Status {
	SUCCESS = 'success',
	LOADING = 'loading',
	ERROR = 'rejected',
}
export interface PizzaSlice {
	items: TPizzaBlock[];
	status: Status;
	pagesAmount: number;
}
