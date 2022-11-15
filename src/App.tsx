// Modules
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Styles
import './scss/app.scss';

// Components
import Home from './pages/Home';
// import NotFound from './pages/NotFound';
// import Cart from "./pages/Cart";
// import PizzaInfo from './pages/PizzaInfo';
import MainLayout from './layouts/MainLayout';

// Lazy loading configuration
const Cart = React.lazy(
	() => import(/* webpackChunkName: "[Cart]" */ './pages/Cart')
);
const PizzaInfo = React.lazy(
	() => import(/* webpackChunkName: "[Pizza Info]" */ './pages/PizzaInfo')
);
const NotFound = React.lazy(
	() => import(/* webpackChunkName: "[Not Found]" */ './pages/NotFound')
);

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<MainLayout />}>
				<Route path="" element={<Home />} />
				<Route
					path="cart"
					element={
						<Suspense fallback={<h2>Loading...</h2>}>
							<Cart />
						</Suspense>
					}
				/>
				<Route
					path="pizza/:id"
					element={
						<Suspense fallback={<h2>Loading...</h2>}>
							<PizzaInfo />
						</Suspense>
					}
				/>
				<Route
					path="*"
					element={
						<Suspense fallback={<h2>Loading...</h2>}>
							<NotFound />
						</Suspense>
					}
				/>
			</Route>
		</Routes>
	);
}
