import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './CartModal.css';

const CartModal = () => {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [discount, setDiscount] = useState(0);

  const finalTotal = cartTotal * (1 - discount);

  const handleGoToCheckout = () => {
    setIsCartOpen(false);
    navigate('/cart');
  };

  const handleClose = () => {
    setIsCartOpen(false);
  };

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'FIRST10') {
      setDiscount(0.15);
      setPromoError('');
    } else {
      setDiscount(0);
      setPromoError('Invalid promo code');
    }
  };

  if (!isCartOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={handleClose} />
      <div className="cart-modal open">
        <div className="cart-header">
          <h2>Your Cart {cartItems.length > 0 && <span className="cart-count-badge">{cartItems.reduce((s,i)=>s+i.quantity,0)}</span>}</h2>
          <button className="close-btn" onClick={handleClose}><X size={22} /></button>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={56} className="empty-cart-icon" />
              <h3>Your cart is empty</h3>
              <p>Add some beautiful jewellery!</p>
              <button className="btn btn-primary" onClick={handleClose} style={{ marginTop: '1.5rem' }}>
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item fade-in">
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="cart-item-info">
                    <h4>{item.title}</h4>
                    <p className="cart-item-price">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={13} /></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={13} /></button>
                    </div>
                  </div>
                  <button className="remove-item-btn" onClick={() => removeFromCart(item.id)}><X size={16} /></button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            
            <div className="promo-section" style={{marginBottom: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
              <input 
                type="text" 
                placeholder="Promo Code" 
                value={promoCode} 
                onChange={e => setPromoCode(e.target.value)}
                style={{flex: 1, padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px'}}
              />
              <button 
                onClick={handleApplyPromo}
                style={{padding: '0.5rem 1rem', background: '#f5f5f5', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer', fontWeight: 600}}
              >
                APPLY
              </button>
            </div>
            {promoError && <p style={{color: 'red', fontSize: '0.8rem', marginTop: '-0.5rem', marginBottom: '1rem'}}>{promoError}</p>}
            {discount > 0 && <p style={{color: 'green', fontSize: '0.8rem', marginTop: '-0.5rem', marginBottom: '1rem'}}>15% OFF applied!</p>}

            <div className="cart-total">
              <span>Total {discount > 0 && <span style={{fontSize: '0.8rem', fontWeight: 400}}>(discounted)</span>}</span>
              <div>
                 {discount > 0 && <span style={{textDecoration: 'line-through', marginRight: '0.5rem', color: '#888', fontSize: '0.9rem'}}>₹{cartTotal.toLocaleString('en-IN')}</span>}
                 <span>₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <p className="cart-taxes">Free delivery on all orders</p>
            <button className="btn btn-primary checkout-btn" onClick={handleGoToCheckout}>
              Proceed to Checkout →
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartModal;
