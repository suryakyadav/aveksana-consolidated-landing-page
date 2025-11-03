import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  const product = PRODUCTS.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link to="/" className="mt-4 inline-block text-aveksana-blue hover:underline">
          &larr; Back to Home
        </Link>
      </div>
    );
  }

  return (
    <main className="pt-12 pb-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/#products" className="text-gray-500 hover:text-aveksana-blue transition-colors">
            &larr; Back to Products
          </Link>
          <div className="mt-8 text-center">
            <div className="inline-block p-4 bg-gray-100 rounded-xl">
              <div className="transform scale-150">
                {product.icon}
              </div>
            </div>
            <h1 className="mt-6 text-4xl md:text-5xl font-bold text-gray-900">{product.title}</h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{product.description}</p>
          </div>

          <div className="mt-16 bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Key Features</h2>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
              {product.keyFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-16 text-center">
             <a href="/#demo" className="bg-aveksana-blue text-white font-semibold px-8 py-4 rounded-lg shadow-md hover:bg-blue-700 transition-all transform hover:scale-105 inline-block">
              Book a Demo
            </a>
          </div>

        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;