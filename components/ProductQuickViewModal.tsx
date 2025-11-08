import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';

interface ProductQuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({ isOpen, onClose, product }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!product) return null;

  return (
    <div 
      className={`fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
      aria-modal="true" 
      role="dialog"
      onClick={onClose}
    >
      <div 
        className={`bg-brand-off-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">{product.icon}</div>
              <div>
                <h2 className="text-2xl font-bold text-brand-dark-teal">{product.title}</h2>
                <p className="mt-1 text-brand-dark-grey">{product.description}</p>
              </div>
            </div>
            <button onClick={onClose} aria-label="Close modal" className="text-brand-grey text-3xl leading-none hover:text-brand-dark-grey">&times;</button>
          </div>
          
          <div className="mt-6 pt-6 border-t border-brand-light-grey">
            <h3 className="text-lg font-semibold text-brand-dark-teal mb-4">Key Features</h3>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
              {product.keyFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg className="h-5 w-5 text-brand-seafoam mr-2 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-brand-dark-grey">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-brand-light-grey flex flex-col sm:flex-row justify-end items-center gap-4">
            <button onClick={onClose} className="font-semibold text-brand-dark-grey hover:text-brand-medium-teal transition-colors">
              Close
            </button>
            <Link to={`/products/${product.id}`} onClick={onClose} className="bg-brand-medium-teal text-white font-semibold px-6 py-2.5 rounded-lg shadow-md hover:bg-brand-teal transition-colors w-full sm:w-auto text-center">
              View Full Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickViewModal;
