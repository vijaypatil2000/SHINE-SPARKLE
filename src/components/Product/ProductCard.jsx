import React, { useState } from 'react';
import { Heart, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="jewel-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="jewel-image-box">
        <Heart size={20} className="wishlist-icon" />
        <img src={product.image} alt={product.title} />
        {isHovered && (
           <div className="quick-add-overlay fade-in">
              <button 
                className="btn btn-outline quick-add-btn"
                onClick={() => addToCart(product)}
              >
                + ADD TO CART
              </button>
           </div>
        )}
      </div>
      
      <div className="jewel-details">
        {product.discountText && (
          <span className="jewel-discount">{product.discountText}</span>
        )}
        
        <div className="jewel-price-row">
          <span className="jewel-price">₹{product.price.toLocaleString('en-IN')}</span>
          {product.oldPrice && (
            <span className="jewel-old-price">₹{product.oldPrice.toLocaleString('en-IN')}</span>
          )}
          <div className="jewel-rating">
            <span className="rating-value">{product.rating}</span>
            <Star size={12} fill="#f59e0b" color="#f59e0b" />
            <span className="review-count">({product.reviews})</span>
          </div>
        </div>

        <h3 className="jewel-title">{product.title}</h3>
      </div>
    </div>
  );
};

export default ProductCard;
