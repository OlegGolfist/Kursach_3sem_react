import { createSelector } from 'reselect';

const selectProducts = state => state.products.items;
const selectFilters = state => state.products.filters;

export const selectFilteredProducts = createSelector(
    [selectProducts, selectFilters],
    (products, filters) => {
        const { search, type, minPrice, maxPrice, sortBy } = filters;

        let result = [...products];

        // Filter by type
        if (type !== 'all') {
            result = result.filter(p => p.type === type);
        }

        // Filter by price
        if (minPrice !== undefined) {
            result = result.filter(p => p.price >= minPrice);
        }
        if (maxPrice !== undefined && maxPrice !== Infinity) {
            result = result.filter(p => p.price <= maxPrice);
        }

        // Filter by search
        if (search) {
            const query = search.toLowerCase();
            result = result.filter(p => p.name.toLowerCase().includes(query));
        }

        // Sort
        if (sortBy === 'price-asc') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-desc') {
            result.sort((a, b) => b.price - a.price);
        }

        return result;
    }
);

export const selectCartItems = state => state.cart.items;
export const selectCartTotal = createSelector(
    [selectCartItems],
    items => items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);
export const selectCartCount = createSelector(
    [selectCartItems],
    items => items.reduce((sum, item) => sum + item.quantity, 0)
);

