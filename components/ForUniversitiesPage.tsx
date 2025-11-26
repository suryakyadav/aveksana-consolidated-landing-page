

import React, { useEffect } from 'react';
import ProductCard from './ProductCard';
import TestimonialCard from './TestimonialCard';
import { 
  PRODUCTS, 
  UNIVERSITY_CHALLENGES,
  UNIVERSITY_OUTCOMES,
  UNIVERSITY_SECURITY_FEATURES,
  UNIVERSITY_TESTIMONIALS
} from '../constants';
import { useModal } from '../contexts/ModalContext';

const ForUniversitiesPage = () => {
  const { openDemoModal } = useModal();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDownloadCaseStudy = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // (Existing download logic remains the same for simplicity)
    const caseStudyText = `Aveksana University Partnership Case Study...`; 
    const blob = new Blob([caseStudyText], { type: 'text/plain' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = 'Aveksana-University-Case-Study.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };
  
  const HeroSection = () => (
    <section className="relative bg-brand-off-white pt-32 pb-20 text-center overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-light-gray-blue via-brand-off-white to-brand-off-white z-0"></div>
       <div className="absolute -top-24 -left-24 w-72 h-72 bg-brand-medium-teal/20 rounded-full opacity-50 filter blur-2xl"></div>
       <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-brand-seafoam/20 rounded-full opacity-50 filter blur-2xl"></div>
      <div className="container mx-auto px-6 relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-brand-dark-teal leading-tight">
          Elevate institutional research standards with unified oversight.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-brand-dark-grey max-w-3xl mx-auto">
          Centralize management, automate compliance, and accelerate grant funding across all departments.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <a href="https://calendar.app.google/SdHTRuahbsV17rmaA" target="_blank" rel="noopener noreferrer" className="bg-brand-medium-teal text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-brand-teal transition-all transform hover:scale-105 w-full sm:w-auto">
            Book a Demo
          </a>
          <a href="#" onClick={handleDownloadCaseStudy} className="bg-transparent text-brand-dark-grey font-semibold px-8 py-3 w-full sm:w-auto hover:text-brand-medium-teal transition-colors">
            Download Case Study &rarr;
          </a>
        </div>
      </div>
    </section>
  );

  const ChallengesSection = () => (
    <section className="py-20 bg-brand-off-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark-teal">The Institutional Advantage</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {UNIVERSITY_CHALLENGES.map(item => (
            <div key={item.title} className="p-6 text-center">
              <div className="text-4xl mb-4 grayscale">{item.icon}</div>
              <h3 className="text-xl font-bold text-brand-teal">{item.title}</h3>
              <p className="mt-2 text-brand-dark-grey">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const SuiteSection = () => (
    <section className="py-20 bg-brand-light-gray-blue">
       <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark-teal">The Aveksana Suite for Universities</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );

  const OutcomesSection = () => (
     <section className="py-20 bg-brand-off-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark-teal">Real Results</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
            {UNIVERSITY_OUTCOMES.map(outcome => (
                <div key={outcome.metric} className="bg-brand-off-white p-8 rounded-xl border border-brand-light-grey">
                    <p className="text-4xl font-bold text-brand-teal">{outcome.metric}</p>
                    <p className="mt-2 text-brand-dark-grey">{outcome.description}</p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );

  const SecuritySection = () => (
    <section className="py-20 bg-brand-light-gray-blue">
       <div className="container mx-auto px-6 text-center">
         <h3 className="text-2xl font-bold text-brand-dark-teal">Designed for academic security and scalability.</h3>
         <div className="mt-8 max-w-4xl mx-auto">
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4 text-left">
                {UNIVERSITY_SECURITY_FEATURES.map(feature => (
                     <li key={feature} className="flex items-start">
                        <svg className="h-6 w-6 text-brand-seafoam mr-3 flex-shrink-0 mt-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
         </div>
       </div>
    </section>
  );

  const TestimonialsSection = () => (
    <section className="py-20 bg-brand-off-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark-teal">Trusted by Academic Leaders</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {UNIVERSITY_TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );

  const FinalCTASection = () => (
    <section className="py-20 bg-brand-off-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-brand-dark-teal max-w-3xl mx-auto">Transform your university’s research ecosystem.</h2>
        <p className="mt-4 text-lg text-brand-dark-grey">Book a 1:1 demo and see how Aveksana can accelerate research, funding, and innovation campus-wide.</p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          <a href="https://calendar.app.google/SdHTRuahbsV17rmaA" target="_blank" rel="noopener noreferrer" className="bg-brand-medium-teal text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-brand-teal transition-all transform hover:scale-105">
            Book a Demo
          </a>
        </div>
      </div>
    </section>
  );

  return (
    <main>
      <HeroSection />
      <ChallengesSection />
      <SuiteSection />
      <OutcomesSection />
      <SecuritySection />
      <TestimonialsSection />
      <FinalCTASection />
    </main>
  );
};

export default ForUniversitiesPage;