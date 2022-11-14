import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import filterSlice from './slices/filter/slice';
import cartSlice from './slices/cart/slice';
import pizzaSlice from './slices/pizza/slice';

export const store = configureStore({
	reducer: {
		filterSlice,
		cartSlice,
		pizzaSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
