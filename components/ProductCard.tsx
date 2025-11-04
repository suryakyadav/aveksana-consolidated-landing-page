import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';

const ProductCard: React.FC<Product> = ({ id, icon, title, description }) => {
  return (
    <Link to={`/products/${id}`} className="group block p-8 bg-brand-off-white rounded-xl shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-brand-light-grey h-full">
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-brand-dark-teal">{title}</h3>
      <p className="mt-2 text-brand-dark-grey">{description}</p>
      <div className="mt-4 font-semibold text-brand-medium-teal group-hover:underline">
        Learn More &rarr;
      </div>
    </Link>
  );
};

export default ProductCard;