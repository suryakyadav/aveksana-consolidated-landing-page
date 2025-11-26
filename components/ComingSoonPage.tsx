
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const ComingSoonPage = () => {
  const location = useLocation();
  const pageName = location.pathname.replace('/', '').replace('-', ' ').replace(/^\w/, c => c.toUpperCase());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <main className="bg-brand-off-white min-h-[70vh] flex items-center justify-center">
      <div className="container mx-auto px-6 text-center">
        <div className="bg-white p-12 rounded-xl shadow-lg border border-brand-light-grey max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-brand-light-gray-blue rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-medium-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-brand-dark-teal mb-4">{pageName || 'Page'} Coming Soon</h1>
          <p className="text-brand-dark-grey text-lg mb-8">
            We are currently building out our <strong>{pageName}</strong> section. 
            Check back soon for updates, or explore our existing tools.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/" className="bg-brand-medium-teal text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-teal transition-colors">
              Return Home
            </Link>
            <Link to="/resources" className="text-brand-dark-grey hover:text-brand-medium-teal font-semibold px-6 py-3 border border-brand-light-grey rounded-lg hover:border-brand-medium-teal transition-colors">
              View Resources
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ComingSoonPage;
