import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './features/auth/auth_slice';
import ProductSlice from './features/product/product_slice';

export const store = configureStore({
	reducer: {
		auth: AuthReducer,
		product: ProductSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
