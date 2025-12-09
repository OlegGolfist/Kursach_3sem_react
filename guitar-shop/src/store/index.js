import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import cartReducer from './cartSlice';
import { localStorageMiddleware } from './middleware';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(localStorageMiddleware)
});

