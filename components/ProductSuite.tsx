
import React from 'react';
import { PRODUCTS } from '../constants';
import ProductCard from './ProductCard';

const ProductSuite = () => {
  return (
    <section id="products" className="py-20 bg-brand-light-gray-blue scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark-teal">The Aveksana Research Suite</h2>
          <p className="mt-4 text-lg text-brand-dark-grey max-w-2xl mx-auto">
            An integrated ecosystem supporting every step of academic and corporate research.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSuite;