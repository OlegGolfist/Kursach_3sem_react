import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartCount } from '../../selectors';
import { useActions } from '../../hooks/useActions';
import styles from './Header.module.css';

export const Header = () => {
    const count = useSelector(selectCartCount);
    const { toggleCart } = useActions();

    return (
        <header className={styles.header}>
            <div className={`container ${styles.headerContainer}`}>
                <Link to="/" className={styles.logo}>
                    <img src="/images/logo_test.png" alt="Гитарный мир" />
                    <span>Гитарный мир</span>
                </Link>
                <nav>
                    <ul className={styles.navList}>
                        <li><Link to="/catalog">Каталог</Link></li>
                        <li>
                            <a href="#" className={styles.cartIcon} onClick={(e) => { e.preventDefault(); toggleCart(); }}>
                                <i className="fas fa-shopping-cart"></i>
                                {count > 0 && <span className={styles.cartCount}>{count}</span>}
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

