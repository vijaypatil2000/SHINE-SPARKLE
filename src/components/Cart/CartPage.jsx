import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, MapPin, CreditCard, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './CartPage.css';

const CartPage = () => {
  const { cart, removeFromCart } = useCart();

  // Empty Cart View matching Candere screenshot
  if (cart.length === 0) {
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
            {/* Using a large icon to represent the blue bag graphic */}
             <ShoppingBag size={120} strokeWidth={1} color="#a5ece6" fill="#ecfeff" />
          </div>
          <h2>Oops! Your bag is empty!</h2>
          <p>Let's shop some jewels and fill it.</p>
          <Link to="/" className="btn btn-primary shop-now-btn">CONTINUE SHOPPING</Link>
        </div>
      </div>
    );
  }

  // Simplified populated cart view for UI demonstration
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

        <div className="container populated-cart">
            <h2>Your Shopping Bag</h2>
            <div className="cart-items">
                {cart.map(item => (
                    <div key={item.id} className="cart-item-row">
                        <img src={item.image} alt={item.title} />
                        <div className="item-info">
                            <h4>{item.title}</h4>
                            <p>Item ID: {item.id}</p>
                        </div>
                        <div className="item-price">₹{item.price.toLocaleString('en-IN')}</div>
                        <button onClick={() => removeFromCart(item.id)} className="btn btn-outline">REMOVE</button>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default CartPage;
