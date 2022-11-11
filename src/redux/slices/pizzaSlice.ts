import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TPizzaBlock } from '../../components/PizzaBlock';

type PizzaProps = {
	apiURL: string;
	pages: string;
	fetchParams: string;
};

interface FetchPizzas {
	data: TPizzaBlock[];
	pagesAmount: number;
}

export enum Status {
	SUCCESS = 'success',
	LOADING = 'loading',
	ERROR = 'rejected',
}

export const fetchPizzas = createAsyncThunk<FetchPizzas, PizzaProps>(
	'pizzaSlice/loadPizzas',
	async ({ apiURL, pages, fetchParams }, thunkApi) => {
		const { data } = await axios.get<TPizzaBlock[]>(
			apiURL + '?' + pages + fetchParams
		);
		if (data.length === 0)
			return thunkApi.rejectWithValue('No pizzas were fetched');

		const unfilteredData = await (
			await axios.get(apiURL + '?' + fetchParams)
		).data.length;
		const pagesAmount = Math.ceil(unfilteredData / 4);

		return { data, pagesAmount };
	}
);

interface PizzaSlice {
	items: TPizzaBlock[];
	status: Status;
	pagesAmount: number;
}

const initialState: PizzaSlice = {
	items: [],
	status: Status.LOADING,
	pagesAmount: 1,
};

const pizzaSlice = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {
		setItems(state, { payload }: PayloadAction<TPizzaBlock[]>) {
			state.items = payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPizzas.pending, (state) => {
			state.items = [];
			state.status = Status.LOADING;
		});
		builder.addCase(fetchPizzas.fulfilled, (state, { payload }) => {
			state.items = payload.data;
			state.pagesAmount = payload.pagesAmount;
			state.status = Status.SUCCESS;
		});
		builder.addCase(fetchPizzas.rejected, (state, { payload }) => {
			state.status = Status.ERROR;
			state.pagesAmount = 1;
			state.items = [];
		});
	},
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
