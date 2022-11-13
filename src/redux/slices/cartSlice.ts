import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCartItem } from '../../components/CartItem';

import { RootState } from '../store';

interface CartItem {
	totalPrice: number;
	items: TCartItem[];
}

const loadCart = (): [] => {
	const JSONpizzas = localStorage.getItem('cart');
	if (!JSONpizzas) return [];

	const pizzas = JSON.parse(JSONpizzas);
	if (typeof pizzas !== 'string') {
		return pizzas;
	} else {
		return [];
	}
};

const loadedCart = loadCart() as TCartItem[];
const calcTotalPrice = (items: TCartItem[]): number =>
	items.reduce((sum, item) => sum + item.price * item.count, 0);

const initialState: CartItem = {
	totalPrice: calcTotalPrice(loadedCart),
	items: loadedCart,
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state, { payload }: PayloadAction<TCartItem>) => {
			const itemFound = state.items.find((item) => item.id === payload.id);
			itemFound
				? itemFound.count++
				: state.items.push({ ...payload, count: 1 });

			state.totalPrice = calcTotalPrice(state.items);
		},

		removeItem: (state, { payload }: PayloadAction<string>) => {
			state.items = state.items.filter((item) => item.id !== payload);

			state.totalPrice = state.items.reduce(
				(sum, item) => sum + item.price * item.count,
				0
			);
		},
		decrementItemCount: (state, { payload }: PayloadAction<string>) => {
			const itemFound = state.items.find((item) => item.id === payload);
			if (!itemFound) return;

			itemFound.count = Math.max(1, --itemFound.count);

			state.totalPrice = state.items.reduce(
				(sum, item) => sum + item.price * item.count,
				0
			);
		},
		clearItems: (state) => {
			state.items = [];
			state.totalPrice = 0;
		},
	},
});

export const { addItem, decrementItemCount, removeItem, clearItems } =
	cartSlice.actions;

export const selectCart = (state: RootState) => state.cartSlice;
export const selectCartItem = (id: string) => (state: RootState) =>
	state.cartSlice.items.find((item) => item.id === id);

export default cartSlice.reducer;
