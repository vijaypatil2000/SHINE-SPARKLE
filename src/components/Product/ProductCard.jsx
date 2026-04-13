import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const [added, setAdded] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const wished = wishlist.has(product.id);
  const navigate = useNavigate();

  const handleBuyNow = (e) => {
    e.stopPropagation();
    addToCart(product);
    navigate('/cart');
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWish = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      className="jewel-card"
      onMouseEnter={() => setShowDesc(true)}
      onMouseLeave={() => setShowDesc(false)}
      onClick={() => setShowDesc(v => !v)}
    >
      <div className="jewel-image-box">
        <button className={`wishlist-icon ${wished ? 'wished' : ''}`} onClick={handleWish} aria-label="Wishlist">
          <Heart size={16} fill={wished ? '#ef4444' : 'none'} color={wished ? '#ef4444' : 'currentColor'} />
        </button>

        <img src={product.image} alt={product.title} loading="lazy" />

        <div className={`desc-overlay ${showDesc ? 'visible' : ''}`}>
          <p className="desc-text">{product.description}</p>
        </div>
      </div>

      <div className="jewel-details">
        <h3 className="jewel-title">{product.title}</h3>
        <div className="jewel-price-row">
          <span className="jewel-price">₹{product.price}</span>
          {product.oldPrice && <span className="jewel-old-price">₹{product.oldPrice}</span>}
        </div>
        <div className="jewel-meta">
          <div className="jewel-rating">
            <Star size={11} fill="#D4AF37" color="#D4AF37" />
            <span className="rating-value">{product.rating}</span>
          </div>
          <span className="jewel-category-tag">{product.category}</span>
        </div>
        
        <div className="card-actions-fixed">
          <button className={`cart-btn ${added ? 'added' : ''}`} onClick={handleAddToCart}>
            <ShoppingBag size={14} />
            {added ? 'ADDED' : 'ADD TO CART'}
          </button>
          <button className="buy-btn" onClick={handleBuyNow}>
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
