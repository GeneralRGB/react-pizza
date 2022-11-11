import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCartItem } from '../../components/CartItem';

import { RootState } from '../store';

interface CartItem {
	totalPrice: number;
	items: TCartItem[];
}

const initialState: CartItem = {
	totalPrice: 0,
	items: [],
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

			state.totalPrice = state.items.reduce(
				(sum, item) => sum + item.price * item.count,
				0
			);
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
