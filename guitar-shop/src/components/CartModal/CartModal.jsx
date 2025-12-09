import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartItems, selectCartTotal } from '../../selectors';
import { useActions } from '../../hooks/useActions';
import styles from './CartModal.module.css';

export const CartModal = () => {
    const items = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);
    const isOpen = useSelector(state => state.cart.isOpen);
    const { removeFromCart, updateQuantity, toggleCart } = useActions();
    const modalRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                toggleCart();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, toggleCart]);

    if (!isOpen) return null;

    const handleCheckout = () => {
        toggleCart();
        navigate('/checkout');
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent} ref={modalRef}>
                <h2>Ваша корзина</h2>
                <div className={styles.cartItemsContainer}>
                    {items.length === 0 ? (
                        <p>Ваша корзина пуста</p>
                    ) : (
                        items.map(item => (
                            <div key={item.id} className={styles.cartItem}>
                                <img src={item.image} alt={item.name} className={styles.cartItemImage} />
                                <div className={styles.cartItemInfo}>
                                    <h4>{item.name}</h4>
                                    <div className={styles.quantityControls}>
                                        <button 
                                            className={`${styles.quantityBtn} ${styles.minus}`}
                                            onClick={() => updateQuantity({ id: item.id, quantity: item.quantity - 1 })}
                                        >-</button>
                                        <span className={styles.quantity}>{item.quantity}</span>
                                        <button 
                                            className={`${styles.quantityBtn} ${styles.plus}`}
                                            onClick={() => updateQuantity({ id: item.id, quantity: item.quantity + 1 })}
                                        >+</button>
                                    </div>
                                    <p>{item.price.toLocaleString()} Br × {item.quantity} = {(item.price * item.quantity).toLocaleString()} Br</p>
                                </div>
                                <button 
                                    className={styles.removeFromCart}
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    &times;
                                </button>
                            </div>
                        ))
                    )}
                </div>
                <div className={styles.cartTotal}>
                    <p>Итого: <span>{total.toLocaleString()}</span> Br</p>
                    <button className={`btn ${styles.checkoutBtn}`} onClick={handleCheckout} disabled={items.length === 0}>
                        Оформить заказ
                    </button>
                </div>
            </div>
        </div>
    );
};

