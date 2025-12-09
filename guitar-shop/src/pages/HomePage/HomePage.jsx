import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

export const HomePage = () => {
    return (
        <main>
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <p>Лучшие гитары от ведущих мировых производителей с доставкой по всей стране</p>
                        <Link to="/catalog" className={styles.catalogLink}>Перейти в каталог</Link>
                    </div>
                </div>
            </section>

            <section className={styles.features}>
                <div className="container">
                    <h2 className={styles.sectionTitle}>Почему выбирают нас</h2>
                    <div className={styles.featuresGrid}>
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>
                                <i className="fas fa-shield-alt"></i>
                            </div>
                            <h3>Гарантия качества</h3>
                            <p>Все гитары проходят тщательную проверку перед отправкой. Гарантия от 1 года.</p>
                        </div>
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>
                                <i className="fas fa-truck"></i>
                            </div>
                            <h3>Быстрая доставка</h3>
                            <p>Доставка по всей стране от 1-го до 3-ёх дней. Бесплатная доставка при заказе от 200 руб.</p>
                        </div>
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>
                                <i className="fas fa-headphones"></i>
                            </div>
                            <h3>Профессиональная поддержка</h3>
                            <p>Наши консультанты помогут с выбором и ответят на все ваши вопросы.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

