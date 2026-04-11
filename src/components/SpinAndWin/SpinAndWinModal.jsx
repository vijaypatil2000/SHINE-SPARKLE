import React, { useState, useEffect } from 'react';
import { X, MapPin } from 'lucide-react';
import './SpinAndWinModal.css';

const SpinAndWinModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rotated, setRotated] = useState(false);
  const [spinResult, setSpinResult] = useState('');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
      document.body.classList.add('modal-open');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    document.body.classList.remove('modal-open');
  };

  const handleRegisterAndSpin = (e) => {
    e.preventDefault();
    if(rotated) return; // Prevent double spin
    
    setRotated(true);
    
    // Simulate API call and wheel spin duration
    setTimeout(() => {
      setSpinResult('Congratulations! You won ₹500 Wallet Cash!');
    }, 4000); // 4 seconds matches CSS animation
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
            <div className={`wheel-pointer`}></div>
            <div className={`wheel ${rotated ? 'spinning' : ''}`}>
               {/* Slices rendered via CSS conic gradients */}
            </div>
            <div className="wheel-center-cap">
              SIGN-UP<br/>TO<br/>SPIN
            </div>
            
            {spinResult && (
              <div className="spin-result-badge bounce-in">
                {spinResult}
              </div>
            )}
          </div>
        </div>

        <div className="spin-right-side">
          <form className="spin-form" onSubmit={handleRegisterAndSpin}>
            <input type="text" placeholder="Enter Full Name" required className="spin-input" />
            <input type="email" placeholder="Email Address" required className="spin-input" />
            
            <div className="mobile-group">
              <div className="country-code">🇮🇳 +91</div>
              <input type="tel" placeholder="Mobile Number" required className="spin-input phone-input" />
            </div>

            <div className="mobile-group">
              <div className="country-code"><MapPin size={16} /></div>
              <input type="text" placeholder="Delivery Address" required className="spin-input phone-input" />
            </div>

            <label className="checkbox-label">
              <input type="checkbox" defaultChecked />
              <span>I agree to the <a>Terms of Use</a> & <a>Privacy Policy</a></span>
            </label>

            <button 
              type="submit" 
              className={`btn btn-primary send-otp-btn ${rotated ? 'disabled-btn' : ''}`}
            >
              {rotated ? 'SPINNING...' : 'REGISTER TO SPIN'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SpinAndWinModal;
