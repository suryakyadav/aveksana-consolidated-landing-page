
import React from 'react';
import { useModal } from '../contexts/ModalContext';
import { Link } from 'react-router-dom';

const Hero = () => {
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
    <section className="bg-gradient-to-b from-brand-light-gray-blue to-brand-off-white pt-32 pb-20 text-center">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-brand-dark-teal leading-tight max-w-5xl mx-auto">
          Where students, faculty, universities, and R&D teams drive research forward.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-brand-dark-grey max-w-3xl mx-auto">
          A unified suite that supports thesis supervision, accelerates grant success, and streamlines research and innovation workflows — for individuals and institutions alike.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <a href="#free-tool" onClick={handleScrollTo} className="bg-transparent text-brand-medium-teal border-2 border-brand-medium-teal font-semibold px-8 py-3 rounded-lg hover:bg-brand-medium-teal/10 transition-all transform hover:scale-105 w-full sm:w-auto">
            Start for Free
          </a>
          <button onClick={openDemoModal} className="bg-brand-medium-teal text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-brand-teal transition-all transform hover:scale-105 w-full sm:w-auto">
            Book a Demo
          </button>
        </div>

        {/* Persona Entry Points */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
            <Link to="/solutions/for-students" className="bg-white text-brand-dark-grey hover:text-brand-medium-teal border border-brand-light-grey px-4 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm hover:shadow-md">
                I'm a Student &rarr;
            </Link>
            <Link to="/solutions/for-supervisors" className="bg-white text-brand-dark-grey hover:text-brand-medium-teal border border-brand-light-grey px-4 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm hover:shadow-md">
                I'm a Supervisor &rarr;
            </Link>
            <Link to="/solutions/for-universities" className="bg-white text-brand-dark-grey hover:text-brand-medium-teal border border-brand-light-grey px-4 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm hover:shadow-md">
                My University &rarr;
            </Link>
            <Link to="/solutions/for-corporations" className="bg-white text-brand-dark-grey hover:text-brand-medium-teal border border-brand-light-grey px-4 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm hover:shadow-md">
                Our R&D Team &rarr;
            </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;