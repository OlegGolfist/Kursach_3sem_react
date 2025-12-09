import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { selectFilteredProducts } from '../../selectors';
import { fetchProducts, setFilter } from '../../store/productsSlice';
import styles from './CatalogPage.module.css';

export const CatalogPage = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectFilteredProducts);
    const status = useSelector(state => state.products.status);
    const filters = useSelector(state => state.products.filters);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        dispatch(setFilter({ name, value }));
    };

    return (
        <main className={styles.catalogPage}>
            <div className="container">
                <h1 className={styles.pageTitle}>Каталог гитар</h1>

                <div className={styles.filters}>
                    <div className={`${styles.filterGroup} ${styles.searchGroup}`}>
                        <h3 className={styles.filterTitle}>Поиск</h3>
                        <input 
                            type="text" 
                            name="search"
                            value={filters.search}
                            onChange={handleFilterChange}
                            placeholder="Введите название гитары"
                            className={styles.searchInput}
                        />
                    </div>

                    <div className={styles.filterGroup}>
                        <h3 className={styles.filterTitle}>Тип гитары</h3>
                        <select 
                            name="type" 
                            value={filters.type}
                            onChange={handleFilterChange}
                            className={styles.sortSelect}
                        >
                            <option value="all">Все типы</option>
                            <option value="electric">Электрогитары</option>
                            <option value="acoustic">Акустические гитары</option>
                            <option value="bass">Бас-гитары</option>
                        </select>
                    </div>

                    <div className={styles.filterGroup}>
                        <h3 className={styles.filterTitle}>Цена, руб.</h3>
                        <div className={styles.priceRange}>
                            <input 
                                type="number" 
                                name="minPrice" 
                                value={filters.minPrice === 0 ? '' : filters.minPrice}
                                onChange={(e) => dispatch(setFilter({ name: 'minPrice', value: Number(e.target.value) }))}
                                placeholder="От" 
                                min="0" 
                            />
                            <span>-</span>
                            <input 
                                type="number" 
                                name="maxPrice"
                                value={filters.maxPrice === Infinity ? '' : filters.maxPrice}
                                onChange={(e) => dispatch(setFilter({ name: 'maxPrice', value: e.target.value ? Number(e.target.value) : Infinity }))}
                                placeholder="До" 
                                min="0" 
                            />
                        </div>
                    </div>

                    <div className={styles.filterGroup}>
                        <h3 className={styles.filterTitle}>Сортировка</h3>
                        <select 
                            name="sortBy" 
                            value={filters.sortBy}
                            onChange={handleFilterChange}
                            className={styles.sortSelect}
                        >
                            <option value="default">По умолчанию</option>
                            <option value="price-asc">По цене (возрастание)</option>
                            <option value="price-desc">По цене (убывание)</option>
                        </select>
                    </div>
                </div>

                {status === 'loading' && <p>Загрузка товаров...</p>}
                
                <div className={styles.productsGrid}>
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </main>
    );
};

