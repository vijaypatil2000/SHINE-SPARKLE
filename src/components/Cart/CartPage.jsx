import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, CreditCard, ShieldCheck, CheckCircle, User, MapPin } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1); // 1=bag, 2=address, 3=payment
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [address, setAddress] = useState({ name: '', email: '', phone: '', street: '', city: '', pincode: '' });
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // UPI, COD

  
  const handleCheckout = async () => {
    setIsProcessing(true);
    await new Promise(r => setTimeout(r, 1500));
    clearCart(); 
    setOrderComplete(true);
    setIsProcessing(false);
  };

  if (orderComplete) return (
    <div className="cart-page">
      <div className="empty-cart-container">
        <CheckCircle size={90} color="#22c55e" />
        <h2>Order Placed!</h2>
        <p>Thank you for shopping with SHINE & SPARKLE.</p>
        <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>Your payment via {paymentMethod === 'UPI' ? 'UPI' : 'Cash on Delivery'} was successful.</p>
        <Link to="/" className="btn btn-primary shop-now-btn">CONTINUE SHOPPING</Link>
      </div>
    </div>
  );

  if (!cartItems || cartItems.length === 0) return (
    <div className="cart-page">
      <div className="empty-cart-container">
        <ShoppingBag size={90} strokeWidth={1} color="#C5A059" />
        <h2>Your bag is empty</h2>
        <p>Let's fill it with something beautiful.</p>
        <Link to="/" className="btn btn-primary shop-now-btn">SHOP NOW</Link>
      </div>
    </div>
  );

  return (
    <div className="cart-page">
      <div className="checkout-header">
        <div className="container header-container">
          <div className="brand">SHINE & SPARKLE</div>
          <div className="checkout-tracker">
            {[
              { label: 'Bag', icon: <ShoppingBag size={13} />, s: 1 },
              { label: 'Address', icon: <MapPin size={13} />, s: 2 },
              { label: 'Payment', icon: <CreditCard size={13} />, s: 3 },
            ].map((t, i, arr) => (
              <React.Fragment key={t.s}>
                <div className={`tracker-step ${step >= t.s ? 'active' : ''}`}>
                  <div className="icon-circle">{t.icon}</div>
                  <span className="step-label">{t.label}</span>
                </div>
                {i < arr.length - 1 && <div className="tracker-line" />}
              </React.Fragment>
            ))}
          </div>
          <div className="secure-badge"><ShieldCheck size={16} color="#C5A059" /><span>100% SECURE</span></div>
        </div>
      </div>

      <div className="container populated-cart-wrapper">
        {/* Step 1: Bag */}
        {step === 1 && (
          <div className="cart-items-section full-width">
            <h2>Your Shopping Bag</h2>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item-row">
                  <img src={item.image} alt={item.title} />
                  <div className="item-info">
                    <h4>{item.title}</h4>
                    <p className="item-category">{item.category}</p>
                    <div className="qty-controls">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <div className="item-price">₹{(item.price * item.quantity).toLocaleString('en-IN')}</div>
                  <button onClick={() => removeFromCart(item.id)} className="remove-btn">✕</button>
                </div>
              ))}
            </div>
            <div className="step-footer">
              <div className="step-total">Total: <strong>₹{cartTotal.toLocaleString('en-IN')}</strong></div>
              <button className="btn btn-primary" onClick={() => setStep(2)}>CONTINUE TO ADDRESS →</button>
            </div>
          </div>
        )}

        {/* Step 2: Address */}
        {step === 2 && (
          <div className="cart-items-section full-width">
            <h2>Delivery Address</h2>
            <div className="address-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Your full name" value={address.name}
                    onChange={e => setAddress(a => ({ ...a, name: e.target.value }))} required />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="you@example.com" value={address.email}
                    onChange={e => setAddress(a => ({ ...a, email: e.target.value }))} required />
                </div>
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="+91 XXXXX XXXXX" value={address.phone}
                  onChange={e => setAddress(a => ({ ...a, phone: e.target.value }))} required />
              </div>
              <div className="form-group">
                <label>Street Address</label>
                <input type="text" placeholder="House no., Street, Area" value={address.street}
                  onChange={e => setAddress(a => ({ ...a, street: e.target.value }))} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input type="text" placeholder="City" value={address.city}
                    onChange={e => setAddress(a => ({ ...a, city: e.target.value }))} required />
                </div>
                <div className="form-group">
                  <label>Pincode</label>
                  <input type="text" placeholder="6-digit pincode" maxLength={6} value={address.pincode}
                    onChange={e => setAddress(a => ({ ...a, pincode: e.target.value }))} required />
                </div>
              </div>
            </div>
            <div className="step-footer">
              <button className="btn btn-outline" onClick={() => setStep(1)}>← BACK</button>
              <button className="btn btn-primary"
                disabled={!address.name || !address.email || !address.phone || !address.street || !address.city || !address.pincode}
                onClick={() => setStep(3)}>
                CONTINUE TO PAYMENT →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payment summary */}
        {step === 3 && (
          <>
            <div className="cart-items-section payment-view-left">
              <h2>Select Payment Method</h2>
              
              <div className="payment-gateway-container">
                <div className="payment-tabs">
                  <button className={`gateway-tab ${paymentMethod === 'UPI' ? 'active' : ''}`} onClick={() => setPaymentMethod('UPI')}>
                    📱 UPI (QR Code)
                  </button>
                  <button className={`gateway-tab ${paymentMethod === 'COD' ? 'active' : ''}`} onClick={() => setPaymentMethod('COD')}>
                    <ShoppingBag size={18} /> Cash on Delivery
                  </button>
                </div>

                <div className="payment-body">
                  {/* UPI UI */}
                  {paymentMethod === 'UPI' && (
                    <div className="gateway-cod-form fade-in" style={{textAlign: 'center'}}>
                      <h4>Scan to Pay via PhonePe / GPay</h4>
                      <div className="qr-code-placeholder" style={{ margin: '1rem auto', padding: '1rem', border: '2px dashed #C5A059', display: 'inline-block', borderRadius: '8px' }}>
                         <img src="/img/phonepe_qr.jpeg" alt="PhonePe QR Code" style={{ maxWidth: '200px', display: 'block' }} onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                         <div style={{ display: 'none', padding: '2rem', background: '#f8f8f8', color: '#555' }}>[QR Code Image Placeholder]</div>
                      </div>
                      <p style={{fontSize: '0.9rem', color: '#666'}}>Scan the QR code with your UPI app. After payment, click "I Have Paid".</p>
                    </div>
                  )}

                  {/* COD UI */}
                  {paymentMethod === 'COD' && (
                    <div className="gateway-cod-form fade-in">
                      <ShieldCheck size={40} color="#C5A059" style={{marginBottom: '1rem'}} />
                      <h4>Pay on Delivery</h4>
                      <p>You can pay via Cash or UPI when the beautifully packaged jewelry arrives at your doorstep.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="cart-summary-section">
              <h3>Order Summary</h3>
              {cartItems.map(item => (
                <div key={item.id} className="cart-item-row compact">
                  <div className="info-compact">
                    <span>{item.quantity}x</span>
                    <span className="truncate">{item.title}</span>
                  </div>
                  <div className="price-compact">₹{(item.price * item.quantity).toLocaleString('en-IN')}</div>
                </div>
              ))}
              
              <hr />

              <div className="summary-row"><span>Subtotal</span><span>₹{cartTotal.toLocaleString('en-IN')}</span></div>
              <div className="summary-row"><span>Delivery</span><span className="free">FREE</span></div>
              
              <div className="summary-row total">
                <span>TOTAL</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              
              <button className="btn btn-outline back-btn" onClick={() => setStep(2)}>← EDIT ADDRESS</button>
              
              <button className="btn btn-primary checkout-btn" onClick={handleCheckout} disabled={isProcessing}>
                {isProcessing ? 'PROCESSING...' : paymentMethod === 'COD' ? 'CONFIRM ORDER →' : `I HAVE PAID →`}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
