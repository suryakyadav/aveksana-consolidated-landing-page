import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import TestimonialCard from './TestimonialCard';
import { 
  PRODUCTS, 
  CORPORATE_CHALLENGES,
  CORPORATE_OUTCOMES,
  CORPORATE_SECURITY_FEATURES,
  CORPORATE_TESTIMONIALS
} from '../constants';

const ForCorporationsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const corporateProducts = PRODUCTS.filter(p => p.id !== 'thesis-support-system');

  const HeroSection = () => (
    <section className="relative bg-gray-900 text-white pt-32 pb-20 text-center overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-800 via-gray-900 to-black z-0"></div>
       <div className="absolute -top-1/4 left-0 w-1/2 h-1/2 bg-blue-500/10 rounded-full filter blur-3xl"></div>
       <div className="absolute -bottom-1/4 right-0 w-1/2 h-1/2 bg-indigo-500/10 rounded-full filter blur-3xl"></div>
      <div className="container mx-auto px-6 relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Transform your R&D from idea-driven to data-driven.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          Aveksana empowers corporate innovation teams to identify emerging opportunities, generate fundable proposals, and manage research pipelines — all in one unified AI workspace.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <a href="/#demo" className="bg-aveksana-blue text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all transform hover:scale-105 w-full sm:w-auto">
            Book a Demo
          </a>
          <Link to="/products/rd-portal" className="bg-transparent text-gray-300 font-semibold px-8 py-3 w-full sm:w-auto hover:text-white transition-colors">
            Explore R&D Portal &rarr;
          </Link>
        </div>
      </div>
    </section>
  );

  const ChallengesSection = () => (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {CORPORATE_CHALLENGES.map(item => (
            <div key={item.title} className="p-6 rounded-lg bg-gray-50 border border-gray-200">
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const SuiteSection = () => (
    <section className="py-20 bg-gray-50">
       <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">The Aveksana Suite for R&D</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            An integrated toolset to manage the entire innovation lifecycle, from initial concept to funded project.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {corporateProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );

  const OutcomesSection = () => (
     <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Quantifiable Business Outcomes</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
            {CORPORATE_OUTCOMES.map(outcome => (
                <div key={outcome.metric} className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-4xl font-bold text-aveksana-blue">{outcome.metric}</p>
                    <p className="mt-2 text-gray-600">{outcome.description}</p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );

  const SecuritySection = () => (
    <section className="py-20 bg-gray-50">
       <div className="container mx-auto px-6 text-center">
         <h3 className="text-2xl font-bold text-gray-800">Built for enterprise compliance and scalability.</h3>
         <div className="mt-8 max-w-4xl mx-auto">
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4 text-left">
                {CORPORATE_SECURITY_FEATURES.map(feature => (
                     <li key={feature} className="flex items-start">
                        <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Fast, Low-Risk Enterprise Adoption</h2>
        <p className="mt-4 text-lg text-gray-600">Typical pilot duration: 2–4 weeks.</p>
        <div className="mt-12 max-w-5xl mx-auto">
          <div className="relative">
            <div className="absolute top-8 left-0 w-full h-0.5 bg-gray-200 hidden md:block"></div>
            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-0">
              {[
                { num: '1️⃣', text: 'Discovery & Demo' },
                { num: '2️⃣', text: 'Pilot with 1-2 teams' },
                { num: '3️⃣', text: 'Full R&D rollout' },
                { num: '4️⃣', text: 'Continuous analytics & optimization' },
              ].map(step => (
                 <div key={step.num} className="flex flex-col items-center text-center w-52 mx-auto md:mx-0">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-white border-2 border-gray-300 shadow-sm z-10 text-3xl">
                      <span>{step.num}</span>
                    </div>
                    <h4 className="mt-4 font-semibold text-md">{step.text}</h4>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const TestimonialsSection = () => (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Validation from Industry Leaders</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CORPORATE_TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );

  const FinalCTASection = () => (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 max-w-3xl mx-auto">Accelerate your innovation pipeline today.</h2>
        <p className="mt-4 text-lg text-gray-600">Join leading R&D organizations using Aveksana to uncover opportunities, automate funding, and innovate faster.</p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          <a href="/#demo" className="bg-aveksana-blue text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all transform hover:scale-105">
            Book a Demo
          </a>
          <a href="#" className="text-gray-600 hover:text-aveksana-blue font-semibold px-4 py-2">
            Request Enterprise Trial
          </a>
        </div>
         <p className="mt-4 text-sm text-gray-500">Enterprise onboarding and support included.</p>
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

export default ForCorporationsPage;