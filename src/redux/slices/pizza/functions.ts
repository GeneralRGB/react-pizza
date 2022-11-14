import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { TPizzaBlock } from '../../../components/PizzaBlock';
import { FetchPizzas, PizzaProps } from './types';

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
