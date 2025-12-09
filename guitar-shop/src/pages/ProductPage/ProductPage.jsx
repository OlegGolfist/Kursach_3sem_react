import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useActions } from '../../hooks/useActions';
import { fetchProducts } from '../../store/productsSlice';
import styles from './ProductPage.module.css';

export const ProductPage = () => {
    const { id } = useParams();
    const { addToCart } = useActions();
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.items);
    const status = useSelector(state => state.products.status);
    
    // Local state for product if not found in store yet
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    useEffect(() => {
        if (products.length > 0) {
            const found = products.find(p => p.id === id);
            setProduct(found);
        }
    }, [products, id]);

    if (status === 'loading') return <div className="container">Загрузка...</div>;
    if (!product) return <div className="container">Товар не найден</div>;

    return (
        <main className={styles.productPage}>
            <div className="container">
                <div className={styles.productContainer}>
                    <div className={styles.productImages}>
                        <img src={product.image} alt={product.name} className={styles.mainProductImage} />
                    </div>
                    <div className={styles.productInfo}>
                        <h1 className={styles.productTitle}>{product.name}</h1>
                        <p className={styles.productPrice}>{product.price.toLocaleString()} Br</p>
                        
                        <div className={styles.productDescription}>
                            <h3>Описание</h3>
                            <p>{product.description}</p>
                        </div>
                        
                        <div className={styles.productSpecs}>
                            <h3>Характеристики</h3>
                            <ul>
                                {product.specs.map((spec, index) => (
                                    <li key={index}><strong>{spec.name}:</strong> {spec.value}</li>
                                ))}
                            </ul>
                        </div>
                        
                        <button className={`btn ${styles.addToCartBtn}`} onClick={() => {
                            addToCart(product);
                            alert('Добавлено в корзину');
                        }}>
                            Добавить в корзину
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

