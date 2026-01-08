import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth-slice';
import categoryReducer from './features/category-slice';
import itemReducer from './features/item-slice';
import variantReducer from './features/variant-slice';
import userReducer from './features/user-slice'
import discountReducer from './features/discount-slice';
import wishlistReducer from './features/wishlist-slice';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer,
        item: itemReducer,
        variant: variantReducer,
        user: userReducer,
        discount: discountReducer,
        wishlist: wishlistReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
