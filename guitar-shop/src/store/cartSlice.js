import { createSlice } from '@reduxjs/toolkit';

const loadCartFromStorage = () => {
    try {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
        console.error('Error loading cart from storage:', error);
        return [];
    }
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: loadCartFromStorage(),
        isOpen: false
    },
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingItem = state.items.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...product, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter(item => item.id !== id);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item.id === id);
            if (item) {
                if (quantity > 0) {
                    item.quantity = quantity;
                } else {
                    state.items = state.items.filter(i => i.id !== id);
                }
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
        toggleCart: (state) => {
            state.isOpen = !state.isOpen;
        }
    }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, toggleCart } = cartSlice.actions;
export default cartSlice.reducer;

