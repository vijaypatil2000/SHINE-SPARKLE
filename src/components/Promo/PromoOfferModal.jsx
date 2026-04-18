import React, { useState, useEffect } from 'react';
import { X, Gift } from 'lucide-react';
import './PromoOfferModal.css';

const PromoOfferModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Only show if they haven't seen it in this session
    const hasSeenPromo = sessionStorage.getItem('hasSeenSparklePromo');
    if (!hasSeenPromo) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2500); // Popup after 2.5 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('hasSeenSparklePromo', 'true');
  };

  const handleFlip = () => {
    if (!isFlipped) {
      setIsFlipped(true);
    }
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText('FIRST10');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
      // Fallback: alert the user or show the code more prominently
      alert('Could not copy automatically. Please copy the code: FIRST10');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="promo-overlay">
      <div className="promo-container">
        <button className="promo-close" onClick={handleClose}>
          <X size={24} />
        </button>
        
        <div className="promo-header">
          <h3>Exclusive Offer</h3>
          <p>For our first 10 customers only!</p>
        </div>

        <div className={`flip-card ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
          <div className="flip-card-inner">
            
            {/* Front of Card (Before Tap) */}
            <div className="flip-card-front">
              <div className="card-border">
                <Gift size={48} className="gift-icon" />
                <h2>Tap to Reveal</h2>
                <p>Your Surprise Gift</p>
              </div>
            </div>

            {/* Back of Card (After Tap) */}
            <div className="flip-card-back">
              <div className="card-border">
                <h2>15% OFF</h2>
                <p>On your entire first order</p>
                <div className="promo-code-box" style={{ userSelect: isFlipped ? 'text' : 'none' }}>
                  <span className="code">{isFlipped ? 'FIRST10' : '*******'}</span>
                </div>
                <button 
                  id="copyBtn" 
                  className={`btn btn-primary btn-copy ${!isFlipped ? 'disabled' : ''}`} 
                  onClick={(e) => { e.stopPropagation(); if(isFlipped) copyCode(); }}
                  disabled={!isFlipped}
                >
                  {isFlipped ? (copied ? 'COPIED!' : 'COPY CODE') : 'LOCK'}
                </button>
              </div>
            </div>

          </div>
        </div>
        
        <div className="promo-footer">
          <p>Hurry, only a few redemptions left!</p>
        </div>
      </div>
    </div>
  );
};

export default PromoOfferModal;
