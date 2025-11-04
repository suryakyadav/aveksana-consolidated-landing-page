
import React from 'react';

const FinalCTA = () => {
  return (
    <section id="demo" className="bg-brand-off-white scroll-mt-24">
      <div className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-brand-dark-teal to-brand-teal text-white rounded-2xl p-8 md:p-12 lg:p-16 grid lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Get Started?</h2>
            <p className="mt-4 text-lg text-brand-light-gray-blue">
              Whether you're an individual researcher or part of a large institution, Aveksana has a solution for you.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-end gap-4">
             <a href="#free-tool" className="bg-transparent text-white border-2 border-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-all transform hover:scale-105 w-full sm:w-auto text-center">
              Start for Free
            </a>
            <a href="#demo" className="bg-brand-seafoam text-brand-dark-teal font-bold px-8 py-3 rounded-lg shadow-md hover:opacity-90 transition-all transform hover:scale-105 w-full sm:w-auto text-center">
              Book a Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;