import styles from './Footer.module.css';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.footerContainer}>
                    <div className={styles.footerColumn}>
                        <h3>О магазине</h3>
                        <p>Гитарный мир - это интернет-магазин гитар и аксессуаров с 2025 года. Мы предлагаем только качественные инструменты от проверенных производителей.</p>
                    </div>
                    <div className={styles.footerColumn}>
                        <h3>Контакты</h3>
                        <div className={styles.contactInfo}>
                            <i className="fas fa-map-marker-alt"></i>
                            <span>г. Минск, ул. Музыкальная, 15</span>
                        </div>
                        <div className={styles.contactInfo}>
                            <i className="fas fa-phone"></i>
                            <span>+375 (44) 7979937</span>
                        </div>
                        <div className={styles.contactInfo}>
                            <i className="fas fa-envelope"></i>
                            <span>gitarmir@gmail.com</span>
                        </div>
                        <div className={styles.socialLinks}>
                            <a href="#"><i className="fab fa-vk"></i></a>
                            <a href="#"><i className="fab fa-telegram"></i></a>
                            <a href="#"><i className="fab fa-youtube"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                    <div className={styles.footerColumn}>
                        <h3>Информация</h3>
                        <ul>
                            <li><a href="#">Оплата и доставка</a></li>
                            <li><a href="#">Гарантия и возврат</a></li>
                            <li><a href="#">Отзывы</a></li>
                            <li><a href="#">Блог</a></li>
                        </ul>
                    </div>
                </div>
                <div className={styles.copyright}>
                    <p>&copy; 2025 Гитарный мир. Все права защищены.</p>
                </div>
            </div>
        </footer>
    );
};

