import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { products } from '../../data/mockData';
import './WishlistModal.css';

const WishlistModal = ({ isOpen, onClose }) => {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  const wishlistedItems = products.filter(p => wishlist.has(p.id));

  if (!isOpen) return null;

  return (
    <div className="wishlist-overlay" onClick={onClose}>
      <div className="wishlist-container" onClick={e => e.stopPropagation()}>
        <div className="wishlist-header">
          <h2>MY WISHLIST ({wishlistedItems.length})</h2>
          <button className="close-wishlist" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="wishlist-items">
          {wishlistedItems.length === 0 ? (
            <div className="empty-wishlist">
              <Heart size={64} color="var(--text-secondary)" strokeWidth={1} />
              <p>Your wishlist is empty</p>
              <button className="continue-shopping-btn" style={{marginTop: '2rem'}} onClick={onClose}>
                EXPLORE COLLECTIONS
              </button>
            </div>
          ) : (
            wishlistedItems.map(item => (
              <div key={item.id} className="wishlist-item">
                <div className="wishlist-img-wrapper">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="wishlist-details">
                  <div>
                    <h3>{item.title}</h3>
                    <p className="wishlist-price">₹{item.price.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="wishlist-actions">
                    <button 
                      className="wishlist-add-to-cart"
                      onClick={() => {
                        addToCart(item);
                        // Optional: remove from wishlist after adding to cart
                        // toggleWishlist(item.id);
                      }}
                    >
                      <ShoppingBag size={14} style={{marginRight: '6px'}} />
                      ADD TO CART
                    </button>
                    <button 
                      className="wishlist-remove"
                      onClick={() => toggleWishlist(item.id)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {wishlistedItems.length > 0 && (
          <div className="wishlist-footer">
            <button className="continue-shopping-btn" onClick={onClose}>
              CONTINUE SHOPPING <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistModal;
