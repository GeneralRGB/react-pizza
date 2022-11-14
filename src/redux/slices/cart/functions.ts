import { TCartItem } from '../../../components/CartItem';

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

export const loadedCart = loadCart() as TCartItem[];
export const calcTotalPrice = (items: TCartItem[]): number =>
	items.reduce((sum, item) => sum + item.price * item.count, 0);
