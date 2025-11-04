import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import TestimonialCard from './TestimonialCard';
import { 
  PRODUCTS, 
  UNIVERSITY_CHALLENGES,
  UNIVERSITY_OUTCOMES,
  UNIVERSITY_SECURITY_FEATURES,
  UNIVERSITY_TESTIMONIALS
} from '../constants';

const ForUniversitiesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const HeroSection = () => (
    <section className="relative bg-brand-off-white pt-32 pb-20 text-center overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-light-gray-blue via-brand-off-white to-brand-off-white z-0"></div>
       <div className="absolute -top-24 -left-24 w-72 h-72 bg-brand-medium-teal/20 rounded-full opacity-50 filter blur-2xl"></div>
       <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-brand-seafoam/20 rounded-full opacity-50 filter blur-2xl"></div>
      <div className="container mx-auto px-6 relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-brand-dark-teal leading-tight">
          Unify your research — from student theses to funded innovation.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-brand-dark-grey max-w-3xl mx-auto">
          Aveksana helps universities standardize supervision, automate grant writing, and accelerate research output across departments.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <a href="/#demo" className="bg-brand-medium-teal text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-brand-teal transition-all transform hover:scale-105 w-full sm:w-auto">
            Book a Demo
          </a>
          <a href="#" className="bg-transparent text-brand-dark-grey font-semibold px-8 py-3 w-full sm:w-auto hover:text-brand-medium-teal transition-colors">
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
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark-teal">Core Challenges We Solve</h2>
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
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark-teal">The Aveksana Suite for Universities</h2>
          <p className="mt-4 text-lg text-brand-dark-grey max-w-2xl mx-auto">
            An integrated ecosystem of tools designed for every stage of the research lifecycle.
          </p>
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
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark-teal">Real results from universities using Aveksana.</h2>
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

  const ImplementationSection = () => (
    <section className="py-20 bg-brand-off-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-dark-teal">A Simple, Phased Implementation</h2>
        <p className="mt-4 text-lg text-brand-dark-grey">Typical pilot duration: 4–6 weeks.</p>
        <div className="mt-12 max-w-5xl mx-auto">
          <div className="relative">
            <div className="absolute top-8 left-0 w-full h-0.5 bg-brand-light-grey hidden md:block"></div>
            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-0">
              {[
                { num: '1️⃣', text: 'Request a Demo' },
                { num: '2️⃣', text: 'Pilot with selected departments' },
                { num: '3️⃣', text: 'Full campus rollout' },
                { num: '4️⃣', text: 'Data insights and ROI reporting' },
              ].map(step => (
                 <div key={step.num} className="flex flex-col items-center text-center w-52 mx-auto md:mx-0">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-brand-off-white border-2 border-brand-grey shadow-sm z-10 text-3xl">
                      <span>{step.num}</span>
                    </div>
                    <h4 className="mt-4 font-semibold text-md text-brand-dark-teal">{step.text}</h4>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const TestimonialsSection = () => (
    <section className="py-20 bg-brand-light-gray-blue">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark-teal">Trusted by Academic Leaders</h2>
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
        <h2 className="text-3xl md:text-4xl font-bold text-brand-dark-teal max-w-3xl mx-auto">Transform your university’s research ecosystem.</h2>
        <p className="mt-4 text-lg text-brand-dark-grey">Book a 1:1 demo and see how Aveksana can accelerate research, funding, and innovation campus-wide.</p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          <a href="/#demo" className="bg-brand-medium-teal text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-brand-teal transition-all transform hover:scale-105">
            Book a Demo
          </a>
          <a href="#" className="text-brand-dark-grey hover:text-brand-medium-teal font-semibold px-4 py-2">
            Request Pilot Access
          </a>
        </div>
         <p className="mt-4 text-sm text-brand-grey">Includes consultation and onboarding support.</p>
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
      <ImplementationSection />
      <TestimonialsSection />
      <FinalCTASection />
    </main>
  );
};

export default ForUniversitiesPage;