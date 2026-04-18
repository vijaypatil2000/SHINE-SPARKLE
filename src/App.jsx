import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/Home/HomePage';
import ProductGrid from './components/Product/ProductGrid';
import CartPage from './components/Cart/CartPage';
import CartModal from './components/Cart/CartModal';
import { CartProvider } from './context/CartContext';
import AdminDashboard from './components/Admin/AdminDashboard';
import Footer from './components/Footer/Footer';
import PromoOfferModal from './components/Promo/PromoOfferModal';
import WishlistModal from './components/Wishlist/WishlistModal';
import ImageLightbox from './components/UI/ImageLightbox';
import { useCart } from './context/CartContext';
import './App.css';

import { products as mockProducts } from './data/mockData';

function ShopView({ activeCategory }) {
  const [allProducts, setAllProducts] = useState(mockProducts);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (res.ok && res.headers.get("content-type")?.includes("application/json")) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setAllProducts(data);
          }
        }
      } catch (err) {
        console.warn('API fetch failed, staying with local mock data.');
      }
    };
    fetchProducts();
  }, []);

  const displayed = allProducts.filter(p => {
    if (activeCategory === 'ALL' || activeCategory === 'OFFERS') return true;
    if (activeCategory === 'BESTSELLERS') return p.tags?.includes('BESTSELLERS');
    if (activeCategory === 'NEW ARRIVALS') return p.tags?.includes('NEW ARRIVALS');
    return p.category === activeCategory;
  });

  return <ProductGrid products={displayed} title={activeCategory === 'ALL' ? 'ALL JEWELLERY' : activeCategory} />;
}

function App() {
  const { isWishlistOpen, setIsWishlistOpen } = useCart();
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [view, setView] = useState('home');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setView('shop');
  };

  const handleGoHome = () => {
    setActiveCategory('ALL');
    setView('home');
  };

  return (
    <Router>
        <div className="app-container">
          <Navbar
            activeCategory={activeCategory}
            setActiveCategory={handleCategoryChange}
            onGoHome={handleGoHome}
            isDarkMode={isDarkMode}
            toggleTheme={() => setIsDarkMode(d => !d)}
          />
          <main className="main-content">
            <Routes>
              <Route
                path="/"
                element={
                  view === 'home'
                    ? <HomePage
                        onShopNow={() => { setView('shop'); setActiveCategory('ALL'); }}
                        onCategory={(cat) => { setActiveCategory(cat); setView('shop'); }}
                      />
                    : <ShopView activeCategory={activeCategory} />
                }
              />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
          <PromoOfferModal />
          <CartModal />
          <WishlistModal isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
          <ImageLightbox />
          
          {/* Global Background Deco */}
          <div className="app-bg-decor">
            <div className="luxury-overlay" />
            {[...Array(15)].map((_, i) => (
              <div 
                key={i} 
                className="bg-sparkle" 
                style={{ 
                  left: `${Math.random() * 100}%`, 
                  animationDelay: `${Math.random() * 20}s`,
                  opacity: Math.random() * 0.5
                }} 
              />
            ))}
          </div>
        </div>
    </Router>
  );
}

export default App;
