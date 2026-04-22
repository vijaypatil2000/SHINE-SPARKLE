import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, PhoneCall, Moon, Sun, X, Package } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { products } from '../../data/mockData';
import './Navbar.css';

const Navbar = ({ activeCategory, setActiveCategory, onGoHome, isDarkMode, toggleTheme }) => {
  const { cartCount, setIsCartOpen, wishCount, setIsWishlistOpen } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const searchRef = useRef(null);

  const categories = ['ALL', 'BESTSELLERS', 'NEW ARRIVALS', 'NECKLACE', 'EARRINGS', 'RINGS', 'BANGLES & BRACELETS', 'SOLITAIRES', 'GIFTS', 'OFFERS'];

  useEffect(() => {
    if (searchQuery.trim().length < 2) { setSearchResults([]); return; }
    const q = searchQuery.toLowerCase();
    setSearchResults(
      products.filter(p => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)).slice(0, 6)
    );
  }, [searchQuery]);

  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowSearch(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setShowAuth(false);
  };

  return (
    <>
      <header className="navbar-wrapper">
        {/* Top Bar */}
        <div className="top-utility-bar">
          <div className="container utility-content">
            <div className="utility-left"></div>
            <div className="utility-center">
              <Link to="/" className="brand-logo" onClick={onGoHome}>
                <img src="/img/brand_logo.png" alt="SHINE & SPARKLE" className="navbar-logo-img" title="SHINE & SPARKLE" />
              </Link>
            </div>
            <div className="utility-right">
              <div className="utility-item theme-toggle" onClick={toggleTheme}>
                {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                <span>{isDarkMode ? 'LIGHT' : 'DARK'}</span>
              </div>
              <div className="utility-item" onClick={() => { setAuthMode('login'); setShowAuth(true); }}>
                <User size={18} />
              </div>
              <div className="utility-item" onClick={() => setIsWishlistOpen(true)}>
                <Heart size={18} />
                <span className="badge">{wishCount}</span>
              </div>
              <div className="utility-item" onClick={() => setIsCartOpen(true)}>
                <ShoppingBag size={18} />
                <span className="badge">{cartCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Nav Bar */}
        <div className="main-navigation">
          <div className="container nav-categories">
            <div className="search-wrapper" ref={searchRef}>
              <div className={`search-box ${showSearch ? 'active' : ''}`} onClick={() => setShowSearch(true)}>
                <input
                  type="text"
                  placeholder="Search jewellery..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSearch(true)}
                />
                {searchQuery
                  ? <X size={15} onClick={() => { setSearchQuery(''); setSearchResults([]); }} style={{ cursor: 'pointer', flexShrink: 0 }} />
                  : <Search size={15} style={{ flexShrink: 0 }} />
                }
              </div>
              {showSearch && searchResults.length > 0 && (
                <div className="search-dropdown">
                  {searchResults.map(p => (
                    <div key={p.id} className="search-result-item" onClick={() => {
                      setActiveCategory(p.category);
                      setSearchQuery('');
                      setSearchResults([]);
                      setShowSearch(false);
                    }}>
                      <img src={p.image} alt={p.title} />
                      <div>
                        <p className="sr-title">{p.title}</p>
                        <p className="sr-price">₹{p.price.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <nav className="category-links">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={activeCategory === cat ? 'highlight' : ''}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      {showAuth && (
        <div className="modal-overlay" onClick={() => setShowAuth(false)}>
          <div className="login-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAuth(false)}><X size={20} /></button>

            <div className="auth-tabs">
              <button className={authMode === 'login' ? 'active' : ''} onClick={() => setAuthMode('login')}>Sign In</button>
              <button className={authMode === 'signup' ? 'active' : ''} onClick={() => setAuthMode('signup')}>Sign Up</button>
            </div>

            {authMode === 'login' ? (
              <>
                <h2>Welcome Back</h2>
                <p className="login-sub">Access your SHINE & SPARKLE account</p>
                <form className="auth-form" onSubmit={handleAuthSubmit}>
                  <input type="email" placeholder="Email address" required className="login-input" />
                  <input type="password" placeholder="Password" required className="login-input" />
                  <button type="submit" className="btn btn-primary login-btn">SIGN IN</button>
                </form>
                <p className="login-footer">
                  New here? <span onClick={() => setAuthMode('signup')}>Create an account</span>
                </p>
              </>
            ) : (
              <>
                <h2>Create Account</h2>
                <p className="login-sub">Join the SHINE & SPARKLE Collection</p>
                <form className="auth-form" onSubmit={handleAuthSubmit}>
                  <input type="text" placeholder="Full Name" required className="login-input" />
                  <input type="email" placeholder="Email address" required className="login-input" />
                  <input type="tel" placeholder="Phone Number" required className="login-input" />
                  <input type="password" placeholder="Create Password" required className="login-input" />
                  <label className="checkbox-label">
                    <input type="checkbox" required />
                    <span>I agree to the Terms & Privacy Policy</span>
                  </label>
                  <button type="submit" className="btn btn-primary login-btn">
                    CREATE ACCOUNT
                  </button>
                </form>
                <p className="login-footer">
                  Already have an account? <span onClick={() => setAuthMode('login')}>Sign in</span>
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Order Tracking Modal Removed */}
    </>
  );
};

export default Navbar;
