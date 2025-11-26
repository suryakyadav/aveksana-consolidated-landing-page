
import React from 'react';
import { useModal } from '../contexts/ModalContext';

const FinalCTA = () => {
  const { openDemoModal } = useModal();
  
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (!href) return;
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="demo" className="bg-brand-off-white scroll-mt-24">
      <div className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-brand-dark-teal to-brand-teal text-white rounded-2xl p-8 md:p-12 lg:p-16 grid lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to elevate your research workflow?</h2>
            <p className="mt-4 text-lg text-brand-light-gray-blue">
              Whether you're completing a thesis, supervising students, or leading an R&D team, Aveksana has a solution tailored for you.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-end gap-4">
             <a href="#free-tool" onClick={handleScrollTo} className="bg-transparent text-white border-2 border-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-all transform hover:scale-105 w-full sm:w-auto text-center">
              Start for Free
            </a>
            <button onClick={openDemoModal} className="bg-brand-seafoam text-brand-dark-teal font-bold px-8 py-3 rounded-lg shadow-md hover:opacity-90 transition-all transform hover:scale-105 w-full sm:w-auto text-center">
              Book a Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;