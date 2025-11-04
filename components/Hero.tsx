
import React from 'react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-brand-light-gray-blue to-brand-off-white pt-32 pb-20 text-center">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-brand-dark-teal leading-tight">
          One platform for theses, grants, and R&D innovation.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-brand-dark-grey max-w-3xl mx-auto">
          Empowering academic supervision, accelerating grant success, and fueling R&D discovery. Get started with our powerful free tools today.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <a href="#demo" className="bg-brand-medium-teal text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-brand-teal transition-all transform hover:scale-105 w-full sm:w-auto">
            Book a Demo
          </a>
          <a href="#free-tool" className="bg-transparent text-brand-medium-teal border-2 border-brand-medium-teal font-semibold px-8 py-3 rounded-lg hover:bg-brand-medium-teal/10 transition-all transform hover:scale-105 w-full sm:w-auto">
            Start for Free
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;