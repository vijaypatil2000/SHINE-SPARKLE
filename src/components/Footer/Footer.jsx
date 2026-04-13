import React from 'react';
import { Mail, Phone, Diamond } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="container footer-grid">
        {/* Brand Section */}
        <div className="footer-section brand-column">
          <div className="footer-brand">
            <Diamond className="brand-icon" size={24} />
            <h2>SHINE & SPARKLE</h2>
          </div>
          <p className="brand-bio">
            Exquisite handcrafted Indian jewelry born from a deep love for tradition 
            and a desire to make timeless elegance accessible to the modern world.
          </p>
          <div className="social-links">
            <a href="https://instagram.com/SHI.NEANDSPARKLE" target="_blank" rel="noopener noreferrer" className="social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" className="social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" className="social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Collection</h3>
          <ul className="footer-links">
            <li><a href="#">Bestsellers</a></li>
            <li><a href="#">New Arrivals</a></li>
            <li><a href="#">Necklaces</a></li>
            <li><a href="#">Earrings</a></li>
            <li><a href="#">Gift Sets</a></li>
          </ul>
        </div>

        {/* Info Links */}
        <div className="footer-section">
          <h3>Customer Care</h3>
          <ul className="footer-links">
            <li><a href="#">Track Order</a></li>
            <li><a href="#">Shipping Policy</a></li>
            <li><a href="#">Returns & Exchanges</a></li>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section contact-column">
          <h3>Connect with Us</h3>
          <div className="contact-item">
            <Phone size={16} />
            <span>9844533825</span>
          </div>
          <div className="contact-item">
            <Mail size={16} />
            <span>vintagediva1999@gmail.com</span>
          </div>
          <div className="newsletter-box">
            <h4>Join the Circle</h4>
            <div className="newsletter-input">
              <input type="email" placeholder="Your email..." />
              <button>JOIN</button>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container bottom-content">
          <p>&copy; {new Date().getFullYear()} SHINE & SPARKLE Luxury Jewellery. All rights reserved.</p>
          <div className="payment-icons">
            <span className="payment-badge">UPI</span>
            <span className="payment-badge">VISA</span>
            <span className="payment-badge">MASTERCARD</span>
            <span className="payment-badge">RUPAY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
