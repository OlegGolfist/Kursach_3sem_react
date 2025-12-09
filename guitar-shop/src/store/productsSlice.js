import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { products as initialData } from '../data';

// Async action to simulate fetching from server
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        // Simulate network delay
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(initialData);
            }, 500);
        });
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
        filters: {
            search: '',
            type: 'all',
            minPrice: 0,
            maxPrice: Infinity,
            sortBy: 'default'
        }
    },
    reducers: {
        setFilter: (state, action) => {
            const { name, value } = action.payload;
            state.filters[name] = value;
        },
        resetFilters: (state) => {
            state.filters = {
                search: '',
                type: 'all',
                minPrice: 0,
                maxPrice: Infinity,
                sortBy: 'default'
            };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { setFilter, resetFilters } = productsSlice.actions;
export default productsSlice.reducer;

