import React from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';

const ProductGrid = ({ products, title }) => {
  return (
    <section className="product-showcase">
      <div className="container">
        <h2 className="showcase-title">{title}</h2>
        <div className="jewelry-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
