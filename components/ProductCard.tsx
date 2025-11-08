import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { useModal } from '../contexts/ModalContext';

const ProductCard: React.FC<Product> = (product) => {
  const { id, icon, title, description } = product;
  const { openQuickViewModal } = useModal();

  const handleQuickView = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      openQuickViewModal(product);
  }

  return (
    <Link to={`/products/${id}`} className="group flex flex-col p-8 bg-brand-off-white rounded-xl shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-brand-light-grey h-full">
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-brand-dark-teal">{title}</h3>
      <p className="mt-2 text-brand-dark-grey flex-grow">{description}</p>
      <div className="mt-4 pt-4 border-t border-transparent group-hover:border-brand-light-grey transition-colors flex items-center justify-between">
        <span className="font-semibold text-brand-medium-teal group-hover:underline">
          Learn More &rarr;
        </span>
        <button 
          onClick={handleQuickView}
          className="text-sm font-semibold text-brand-dark-grey bg-brand-light-grey px-3 py-1.5 rounded-md hover:bg-brand-grey transition-colors opacity-0 group-hover:opacity-100"
          aria-label={`Quick view ${title}`}
        >
          Quick View
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
