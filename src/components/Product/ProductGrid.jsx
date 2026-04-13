import React from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';

const ProductGrid = ({ products, title }) => {
  const isOffers = title === 'OFFERS';

  return (
    <section className="product-showcase">
      <div className="container">
        {isOffers && (
          <div className="offers-banner">
            <span className="offers-tag">🎉 SPECIAL OFFERS</span>
            <p>Up to 40% off on selected pieces — limited time only!</p>
          </div>
        )}
        <h2 className="showcase-title">{title}</h2>
        <div className="jewelry-grid">
          {products.length === 0 ? (
            <p className="empty-category">No items found.</p>
          ) : (
            products.map((product, i) => (
              <div key={product.id} style={{ animationDelay: `${Math.min(i * 0.07, 0.5)}s` }}>
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
