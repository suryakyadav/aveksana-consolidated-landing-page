
import React from 'react';

const FinalCTA = () => {
  return (
    <section id="demo" className="bg-white scroll-mt-24">
      <div className="container mx-auto px-6 py-20">
        <div className="bg-gray-100 rounded-2xl p-8 md:p-12 lg:p-16 grid lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Ready to Get Started?</h2>
            <p className="mt-4 text-lg text-gray-600">
              Whether you're an individual researcher or part of a large institution, Aveksana has a solution for you.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-end gap-4">
             <a href="#free-tool" className="bg-white text-aveksana-blue border-2 border-aveksana-blue font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-blue-50 transition-all transform hover:scale-105 w-full sm:w-auto text-center">
              Start for Free
            </a>
            <a href="#demo" className="bg-aveksana-blue text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all transform hover:scale-105 w-full sm:w-auto text-center">
              Book a Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
