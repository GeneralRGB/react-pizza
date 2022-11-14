import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TPizzaBlock } from '../../../components/PizzaBlock';
import { fetchPizzas } from './functions';
import { PizzaSlice, Status } from './types';

const initialState: PizzaSlice = {
	items: [],
	status: Status.LOADING,
	pagesAmount: 0,
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
			state.pagesAmount = 0;
			state.items = [];
		});
	},
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
