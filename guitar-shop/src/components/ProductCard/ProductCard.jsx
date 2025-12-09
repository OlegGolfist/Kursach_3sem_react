import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import styles from './ProductCard.module.css';

export const ProductCard = ({ product }) => {
    const { addToCart} = useActions();

    const handleAddToCart = () => {
        addToCart(product);
        // Optionally open cart or show notification
        // toggleCart(); 
        alert(`Товар "${product.name}" добавлен в корзину!`);
    };

    return (
        <div className={styles.productCard}>
            <Link to={`/product/${product.id}`} className={styles.productImageLink}>
                <div className={styles.productImage}>
                    <img src={product.image} alt={product.name} />
                </div>
            </Link>
            <div className={styles.productInfo}>
                <h3 className={styles.productTitle}>
                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                </h3>
                <p className={styles.productPrice}>{product.price.toLocaleString()} Br</p>
                <button className={`btn ${styles.addToCart}`} onClick={handleAddToCart}>
                    В корзину
                </button>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired
    }).isRequired
};

