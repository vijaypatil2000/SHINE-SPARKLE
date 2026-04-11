import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, MapPin, CreditCard, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems, totalAmount: cartTotal })
      });
      
      if (response.ok) {
        setOrderComplete(true);
        clearCart();
      } else {
        const err = await response.json();
        alert('Checkout Failed: ' + err.message);
      }
    } catch (error) {
      console.error(error);
      alert('Error connecting to backend database.');
    }
    setIsProcessing(false);
  };

  if (orderComplete) {
    return (
      <div className="cart-page">
        <div className="empty-cart-container">
          <ShieldCheck size={120} color="#14b8a6" />
          <h2>Order Placed Successfully!</h2>
          <p>Your order has been saved securely to the MongoDB database.</p>
          <Link to="/" className="btn btn-primary shop-now-btn">CONTINUE SHOPPING</Link>
        </div>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="cart-page">
        <header className="checkout-header">
          <div className="container header-container">
            <div className="brand">DADDY'S STORE</div>
            <div className="checkout-tracker">
              <div className="tracker-step active">
                <div className="icon-circle"><ShoppingBag size={14} /></div>
                <span>Bag</span>
              </div>
              <div className="tracker-line"></div>
              <div className="tracker-step">
                <div className="icon-circle"><MapPin size={14} /></div>
                <span>Address</span>
              </div>
              <div className="tracker-line"></div>
              <div className="tracker-step">
                <div className="icon-circle"><CreditCard size={14} /></div>
                <span>Payment</span>
              </div>
            </div>
            <div className="secure-badge">
              <ShieldCheck size={20} color="#14b8a6" />
              <span>100% SECURE</span>
            </div>
          </div>
        </header>

        <div className="empty-cart-container">
          <div className="empty-bag-graphic">
             <ShoppingBag size={120} strokeWidth={1} color="#a5ece6" fill="#ecfeff" />
          </div>
          <h2>Oops! Your bag is empty!</h2>
          <p>Let's shop some jewels and fill it.</p>
          <Link to="/" className="btn btn-primary shop-now-btn">CONTINUE SHOPPING</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
        <header className="checkout-header">
          <div className="container header-container">
            <div className="brand">DADDY'S STORE</div>
            <div className="checkout-tracker">
              <div className="tracker-step active">
                <div className="icon-circle"><ShoppingBag size={14} /></div>
                <span>Bag</span>
              </div>
              <div className="tracker-line"></div>
              <div className="tracker-step">
                <div className="icon-circle"><MapPin size={14} /></div>
                <span>Address</span>
              </div>
              <div className="tracker-line"></div>
              <div className="tracker-step active">
                <div className="icon-circle"><CreditCard size={14} /></div>
                <span>Payment</span>
              </div>
            </div>
          </div>
        </header>

        <div className="container populated-cart-wrapper">
            <div className="cart-items-section">
              <h2>Your Shopping Bag</h2>
              <div className="cart-items">
                  {cartItems.map(item => (
                      <div key={item.id} className="cart-item-row">
                          <img src={item.image} alt={item.title} />
                          <div className="item-info">
                              <h4>{item.title}</h4>
                              <p>Item Code: #{item.id + 1000}</p>
                              
                              <div className="qty-controls">
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                              </div>
                          </div>
                          <div className="item-price">
                             <div className="current-price">₹{(item.price * item.quantity).toLocaleString('en-IN')}</div>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="btn btn-outline remove-btn">X</button>
                      </div>
                  ))}
              </div>
            </div>
            
            <div className="cart-summary-section">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Charge</span>
                <span className="free">FREE</span>
              </div>
              <hr />
              <div className="summary-row total">
                <span>TOTAL AMOUNT</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              
              <button 
                className="btn btn-primary checkout-btn" 
                onClick={handleCheckout} 
                disabled={isProcessing}
              >
                {isProcessing ? "PROCESSING..." : "SECURE CHECKOUT ->"}
              </button>
            </div>
        </div>
    </div>
  );
};

export default CartPage;
