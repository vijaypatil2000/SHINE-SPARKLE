import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import './SpinAndWinModal.css';

const SpinAndWinModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rotated, setRotated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
      document.body.classList.add('modal-open');
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    document.body.classList.remove('modal-open');
  };

  const spinWheel = () => {
    setRotated(true);
    setTimeout(() => {
      alert("Congratulations! You won ₹500/- Promo Wallet");
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="spin-modal-overlay">
      <div className="spin-modal-content">
        <button className="spin-close-btn" onClick={closeModal}><X size={24} color="#6b7280" /></button>
        
        <div className="spin-left-side">
          <div className="spin-header">
            <h3>SIGN UP TO DADDY'S STORE</h3>
            <h2>PLAY & WIN</h2>
            <div className="spin-divider"></div>
            <p>Assured rewards worth<br/>up to <strong>₹500</strong> in your wallet</p>
          </div>
          
          <div className="wheel-container">
            <div className={`wheel ${rotated ? 'spinning' : ''}`}>
               <div className="wheel-inner"></div>
            </div>
            <button className="spin-btn" onClick={spinWheel}>SIGN-UP<br/>TO<br/>SPIN</button>
          </div>
        </div>

        <div className="spin-right-side">
          <form className="spin-form" onSubmit={(e) => { e.preventDefault(); spinWheel(); }}>
            <input type="text" placeholder="Enter Full Name" required className="spin-input" />
            <input type="email" placeholder="Email Address" required className="spin-input" />
            
            <div className="mobile-group">
              <div className="country-code">🇮🇳 +91</div>
              <input type="tel" placeholder="Mobile Number" required className="spin-input phone-input" />
            </div>

            <input type="text" placeholder="Delivery Address" required className="spin-input" />

            <label className="checkbox-label">
              <input type="checkbox" defaultChecked />
              <span>I agree to the <a>Terms of Use</a> & <a>Privacy Policy</a></span>
            </label>

            <button type="submit" className="btn btn-primary send-otp-btn">REGISTER TO SPIN</button>
            
            <div className="already-member">
              Already a member with us? <a onClick={closeModal}>LOGIN</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SpinAndWinModal;
