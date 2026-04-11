import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, User, Heart, ShoppingBag, PhoneCall, Moon, Sun } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

const Navbar = ({ activeCategory, setActiveCategory, isDarkMode, toggleTheme }) => {
  const { cartCount } = useCart();
  
  const categories = ['ALL', 'BESTSELLERS', 'NEW ARRIVALS', 'RINGS', 'EARRINGS', 'NECKLACE', 'BANGLES & BRACELETS', 'SOLITAIRES', 'GIFTS'];

  return (
    <header className="navbar-wrapper">
      {/* Top Black Utility Bar */}
      <div className="top-utility-bar">
        <div className="container utility-content">
          <div className="utility-left">
             <PhoneCall size={14} /> ORDER TRACKING
          </div>
          <div className="utility-center">
             <Link to="/" className="brand-logo">DADDY'S STORE <span className="subtitle">LIFESTYLE JEWELLERY</span></Link>
          </div>
          <div className="utility-right">
             <div className="utility-item" onClick={toggleTheme}>
               {isDarkMode ? <Sun size={14} /> : <Moon size={14} />} 
               {isDarkMode ? 'LIGHT MODE' : 'DARK MODE'}
             </div>
             <div className="utility-item"><MapPin size={14} /> PINCODE</div>
             <div className="utility-item"><User size={14} /></div>
             <div className="utility-item"><Heart size={14} /> <span className="badge">0</span></div>
             <Link to="/cart" className="utility-item cart-link">
                <ShoppingBag size={14} /> 
                <span className="badge">{cartCount}</span>
             </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Categories */}
      <div className="main-navigation">
        <div className="container nav-categories">
          <div className="search-box">
             <span>Search for Trendy Jewellery</span>
             <Search size={16} />
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
          <div className="offers-btn">OFFERS</div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
