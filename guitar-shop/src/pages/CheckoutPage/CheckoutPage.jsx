import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartItems, selectCartTotal } from '../../selectors';
import { useActions } from '../../hooks/useActions';
import styles from './CheckoutPage.module.css';

export const CheckoutPage = () => {
    const items = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);
    const { updateQuantity, removeFromCart, clearCart } = useActions();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        comment: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (items.length === 0) {
            alert('Ваша корзина пуста!');
            return;
        }
        
        // Simulate sending order
        console.log('Order submitted:', { items, total, customer: formData });
        alert('Заказ успешно оформлен! Спасибо за покупку!');
        clearCart();
        navigate('/');
    };

    if (items.length === 0) {
        return (
            <main className={styles.checkoutPage}>
                <div className="container">
                    <h1>Корзина пуста</h1>
                    <button className="btn" onClick={() => navigate('/catalog')}>Перейти в каталог</button>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.checkoutPage}>
            <div className="container">
                <h1>Оформление заказа</h1>
                
                <div className={styles.checkoutContainer}>
                    <div className={styles.orderSummary}>
                        <h2>Ваш заказ</h2>
                        <div className={styles.itemsList}>
                            {items.map(item => (
                                <div key={item.id} className={styles.checkoutItem}>
                                    <img src={item.image} alt={item.name} className={styles.itemImage} />
                                    <div className={styles.itemInfo}>
                                        <h4>{item.name}</h4>
                                        <div className={styles.controls}>
                                            <button onClick={() => updateQuantity({ id: item.id, quantity: item.quantity - 1 })}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity({ id: item.id, quantity: item.quantity + 1 })}>+</button>
                                        </div>
                                        <p>{(item.price * item.quantity).toLocaleString()} Br</p>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} className={styles.removeBtn}>&times;</button>
                                </div>
                            ))}
                        </div>
                        <div className={styles.orderTotal}>
                            <p>Итого: <span>{total.toLocaleString()}</span> Br</p>
                        </div>
                    </div>
                    
                    <div className={styles.checkoutForm}>
                        <h2>Данные покупателя</h2>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name">ФИО*</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    required 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="phone">Телефон*</label>
                                <input 
                                    type="tel" 
                                    id="phone" 
                                    name="phone" 
                                    required 
                                    value={formData.phone} 
                                    onChange={handleChange} 
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="email">Email*</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    required 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="address">Адрес доставки*</label>
                                <textarea 
                                    id="address" 
                                    name="address" 
                                    rows="3" 
                                    required 
                                    value={formData.address} 
                                    onChange={handleChange} 
                                ></textarea>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="comment">Комментарий к заказу</label>
                                <textarea 
                                    id="comment" 
                                    name="comment" 
                                    rows="3" 
                                    value={formData.comment} 
                                    onChange={handleChange} 
                                ></textarea>
                            </div>
                            <button type="submit" className={`btn ${styles.submitOrderBtn}`}>Подтвердить заказ</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

