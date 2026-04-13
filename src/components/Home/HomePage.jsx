import React, { useEffect, useRef } from 'react';
import { Sparkles, Truck, ShieldCheck, RefreshCw, Star, ChevronDown, ArrowRight } from 'lucide-react';
import { products } from '../../data/mockData';
import './HomePage.css';

const features = [
  { icon: <Sparkles size={28} />, title: 'Handcrafted', desc: 'Every piece crafted by skilled artisans with decades of experience.' },
  { icon: <Truck size={28} />, title: 'Free Delivery', desc: 'Complimentary delivery on all orders across India.' },
  { icon: <ShieldCheck size={28} />, title: 'Quality Assured', desc: 'Gold-plated with anti-tarnish coating. Durable and long-lasting.' },

];

const testimonials = [
  { name: 'Priya S.', text: 'The necklace I ordered was absolutely stunning. Exactly as pictured and arrived beautifully packaged!', stars: 5 },
  { name: 'Meena R.', text: "Bought the bridal set for my daughter's wedding. Everyone was asking where we got it from!", stars: 5 },
  { name: 'Ananya K.', text: 'Amazing quality for the price. The gold-plated finish is perfect and it looks so elegant.', stars: 5 },
  { name: 'Divya M.', text: 'Fast delivery and the packaging was gorgeous. The earrings are even more beautiful in person!', stars: 5 },
];

// Pick 6 featured products for home preview
const featuredProducts = products.filter(p => p.tags?.includes('BESTSELLERS')).slice(0, 6);

const HomePage = ({ onShopNow, onCategory }) => {
  const homeRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );
    const els = document.querySelectorAll('.animate-on-scroll');
    els.forEach(el => observer.observe(el));
    els.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) el.classList.add('visible');
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-page" ref={homeRef}>

      {/* ── Hero ── */}
      <section className="hero-section">
        <div className="hero-bg-overlay" />
        <div className="hero-content">
          <p className="hero-eyebrow">✦ LIFESTYLE JEWELLERY</p>
          <h1 className="hero-title">
            SHINE &<br /><span className="hero-accent">SPARKLE</span>
          </h1>
          <p className="hero-subtitle">
            Timeless gold-plated jewellery crafted with love — for every occasion, every story.
          </p>
          <div className="hero-actions">
            <button className="btn-hero-primary" onClick={onShopNow}>Shop Collection</button>
            <button className="btn-hero-outline" onClick={() => onCategory('BESTSELLERS')}>View Bestsellers</button>
          </div>
        </div>
        <div className="hero-scroll-hint" onClick={onShopNow}>
          <ChevronDown size={22} />
        </div>
        <div className="hero-floating-badge">
          <Star size={14} fill="#f59e0b" color="#f59e0b" />
          <span>4.9 · 500+ Happy Customers</span>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-card animate-on-scroll">
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products Preview ── */}
      <section className="home-products-section">
        <div className="container">
          <div className="home-section-header animate-on-scroll">
            <div>
              <p className="about-eyebrow">Our Collection</p>
              <h2 className="section-heading-left">Bestselling Jewellery</h2>
            </div>
            <button className="view-all-btn" onClick={onShopNow}>
              View All <ArrowRight size={16} />
            </button>
          </div>
          <div className="home-products-grid animate-on-scroll">
            {featuredProducts.map(p => (
              <div key={p.id} className="home-product-card" onClick={onShopNow}>
                <div className="home-product-img">
                  <img src={p.image} alt={p.title} loading="lazy" />
                  <div className="home-product-overlay">
                    <span>View Details</span>
                  </div>
                </div>
                <div className="home-product-info">
                  <p className="home-product-title">{p.title}</p>
                  <p className="home-product-price">₹{p.price.toLocaleString('en-IN')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Category Tiles ── */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-heading animate-on-scroll">Shop by Category</h2>
          <div className="category-tiles animate-on-scroll">
            {[
              { label: 'Necklaces', cat: 'NECKLACE', img: '/img/IMG_2458.jpg' },
              { label: 'Solitaires', cat: 'SOLITAIRES', img: '/img/IMG_2500.jpg' },
              { label: 'Gift Sets', cat: 'GIFTS', img: '/img/IMG_2537.jpg' },
            ].map((c, i) => (
              <div key={i} className="category-tile" onClick={() => onCategory(c.cat)}>
                <img src={c.img} alt={c.label} />
                <div className="category-tile-overlay">
                  <span>{c.label}</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="about-section">
        <div className="container about-grid">
          <div className="about-image-wrap animate-on-scroll">
            <img src="/img/grid_compilation.jpg" alt="Our Story" />
            <div className="about-image-badge">Est. 2020</div>
          </div>
          <div className="about-text animate-on-scroll">
            <p className="about-eyebrow">Our Story</p>
            <h2>Where Tradition Meets Elegance</h2>
            <p>
              SHINE & SPARKLE was born from a deep love for Indian jewellery and a desire to make
              timeless elegance accessible to the modern world.
            </p>
            <p>
              Every piece in our collection is gold-plated with anti-tarnish coating, carefully crafted
              to look stunning and last long — at a price that makes you smile.
            </p>
            <button className="btn-hero-primary" onClick={onShopNow} style={{ marginTop: '1.5rem' }}>
              Explore Collection
            </button>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-heading animate-on-scroll">What Our Customers Say</h2>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card animate-on-scroll">
                <div className="t-stars">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} size={14} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <p className="t-text">"{t.text}"</p>
                <p className="t-name">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section animate-on-scroll">
        <div className="cta-content">
          <h2>Ready to Find Your Perfect Piece?</h2>
          <p>Browse our full collection of gold-plated jewellery</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-hero-primary" onClick={onShopNow}>Shop Now</button>
            <button className="btn-hero-outline" onClick={() => onCategory('NECKLACE')}>Browse Necklaces</button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
