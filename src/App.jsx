import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import ProductGrid from './components/Product/ProductGrid';
import CartPage from './components/Cart/CartPage';
import SpinAndWinModal from './components/SpinAndWin/SpinAndWinModal';
import { CartProvider } from './context/CartContext';
import './App.css';

function Home({ activeCategory }) {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    import('./data/mockData').then(module => {
      setProducts(module.products);
    });
  }, []);

  // Filter logic
  const displayedProducts = products.filter(product => {
    if (activeCategory === 'ALL' || activeCategory === 'BESTSELLERS' || activeCategory === 'NEW ARRIVALS') {
      if (activeCategory === 'BESTSELLERS') return product.tags?.includes('BESTSELLERS');
      if (activeCategory === 'NEW ARRIVALS') return product.tags?.includes('NEW ARRIVALS');
      return true; // Show all
    }
    return product.category === activeCategory;
  });

  return (
    <>
      <div className="promotional-banner">
        Flat 25% off on Solitaire stone prices <span className="grab-now">GRAB NOW</span>
      </div>
      <ProductGrid products={displayedProducts} title={activeCategory === 'ALL' ? "FEATURED JEWELRY" : activeCategory} />
      <SpinAndWinModal />
    </>
  );
}

function App() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <Router>
      <CartProvider>
        <div className="app-container">
          <Navbar activeCategory={activeCategory} setActiveCategory={setActiveCategory} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home activeCategory={activeCategory} />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </main>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
