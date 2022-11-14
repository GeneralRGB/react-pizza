import { TCartItem } from '../../../components/CartItem';

export interface CartItem {
	totalPrice: number;
	items: TCartItem[];
}
