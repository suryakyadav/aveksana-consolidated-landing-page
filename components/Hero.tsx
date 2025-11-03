
import React from 'react';

const Hero = () => {
  return (
    <section className="bg-gray-50 pt-32 pb-20 text-center">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
          One platform for theses, grants, and R&D innovation.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Empowering academic supervision, accelerating grant success, and fueling R&D discovery. Get started with our powerful free tools today.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <a href="#demo" className="bg-aveksana-blue text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all transform hover:scale-105 w-full sm:w-auto">
            Book a Demo
          </a>
          <a href="#free-tool" className="bg-white text-aveksana-blue border-2 border-aveksana-blue font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-blue-50 transition-all transform hover:scale-105 w-full sm:w-auto">
            Start for Free
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
