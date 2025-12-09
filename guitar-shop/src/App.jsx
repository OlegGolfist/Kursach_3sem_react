import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { CartModal } from './components/CartModal/CartModal';
import { HomePage } from './pages/HomePage/HomePage';
import { CatalogPage } from './pages/CatalogPage/CatalogPage';
import { ProductPage } from './pages/ProductPage/ProductPage';
import { CheckoutPage } from './pages/CheckoutPage/CheckoutPage';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.appWrapper}>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
      <Footer />
      <CartModal />
    </div>
  );
}

export default App;

