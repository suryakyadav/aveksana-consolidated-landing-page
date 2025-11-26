

import React, { useEffect } from 'react';
import TopicGenerator from './TopicGenerator';
import TestimonialCard from './TestimonialCard';
import { WHY_AVEKSANA_INDIVIDUALS, INDIVIDUAL_SUCCESS_STORIES, INDIVIDUAL_PLANS } from '../constants';
import { useModal } from '../contexts/ModalContext';

const ForStudentsPage = () => {
  const { openDemoModal } = useModal();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const HeroSection = () => (
    <section className="relative bg-brand-off-white pt-32 pb-20 text-center overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-light-gray-blue via-brand-off-white to-brand-off-white z-0"></div>
       <div className="absolute -top-24 -left-24 w-72 h-72 bg-brand-medium-teal/20 rounded-full opacity-50 filter blur-2xl"></div>
       <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-brand-seafoam/20 rounded-full opacity-50 filter blur-2xl"></div>
      <div className="container mx-auto px-6 relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-brand-dark-teal leading-tight">
          Complete your thesis with clarity, structure, and confidence.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-brand-dark-grey max-w-3xl mx-auto">
          Aveksana helps you find novel topics, structure your arguments, and get instant feedback before you submit.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <a href="#free-tool" onClick={handleScrollTo} className="bg-brand-medium-teal text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-brand-teal transition-all transform hover:scale-105 w-full sm:w-auto">
            Try Thesis Engine
          </a>
          <a href="#plans" onClick={handleScrollTo} className="bg-transparent text-brand-dark-grey font-semibold px-8 py-3 w-full sm:w-auto hover:text-brand-medium-teal transition-colors">
            View Plans &rarr;
          </a>
        </div>
      </div>
    </section>
  );

  const FeaturesSection = () => (
    <section className="py-20 bg-brand-off-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {WHY_AVEKSANA_INDIVIDUALS.map(item => (
            <div key={item.title} className="p-6 rounded-lg hover:shadow-lg transition-shadow border border-transparent hover:border-brand-light-grey">
              <div className="text-4xl">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mt-4 text-brand-dark-teal">{item.title}</h3>
              <p className="mt-2 text-brand-dark-grey">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const IntegritySection = () => (
      <section className="py-20 bg-brand-light-gray-blue">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
              <div>
                  <h2 className="text-3xl font-bold text-brand-dark-teal mb-4">Integrity First.</h2>
                  <p className="text-lg text-brand-dark-grey mb-6">
                      Writing a thesis is about <em>your</em> original contribution. Aveksana isn't a "write-for-me" bot. It's an intelligent coach that helps you verify citations, check for accidental plagiarism, and structure your own unique ideas logically.
                  </p>
                  <ul className="space-y-3">
                      <li className="flex items-center gap-2 text-brand-dark-grey">
                          <span className="text-brand-medium-teal">✓</span> Detailed Plagiarism Scanning
                      </li>
                      <li className="flex items-center gap-2 text-brand-dark-grey">
                          <span className="text-brand-medium-teal">✓</span> AI-Generated Outline Suggestions
                      </li>
                      <li className="flex items-center gap-2 text-brand-dark-grey">
                          <span className="text-brand-medium-teal">✓</span> Source Verification
                      </li>
                  </ul>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-500">
                   <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                       [UI Screenshot Placeholder: Integrity Report]
                   </div>
              </div>
          </div>
      </section>
  )

  const SuccessStoriesSection = () => (
    <section className="py-20 bg-brand-off-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark-teal">Success Stories from Researchers Like You</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INDIVIDUAL_SUCCESS_STORIES.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );

  const PricingSection = () => (
    <section id="plans" className="py-20 bg-brand-light-gray-blue scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark-teal">Flexible plans for every stage of your research.</h2>
        </div>
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
          {INDIVIDUAL_PLANS.map((plan) => (
            <div key={plan.name} className={`bg-brand-off-white p-8 rounded-xl shadow-sm border ${plan.name === 'Monthly Plan' ? 'border-brand-medium-teal shadow-lg' : 'border-brand-light-grey'}`}>
              <h3 className="text-2xl font-bold text-brand-dark-teal">{plan.name}</h3>
              <p className="mt-2 text-brand-dark-grey min-h-[40px]">{plan.description}</p>
              <ul className="mt-6 space-y-3">
                {plan.features.map(feature => (
                   <li key={feature} className="flex items-center">
                      <svg className="h-5 w-5 text-brand-seafoam mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      <span>{feature}</span>
                    </li>
                ))}
              </ul>
              <a href="#free-tool" onClick={handleScrollTo} className={`mt-8 block w-full text-center font-semibold px-6 py-3 rounded-lg transition-colors ${plan.highlight ? 'bg-brand-medium-teal text-white hover:bg-brand-teal' : 'bg-brand-light-grey text-brand-dark-grey hover:bg-brand-grey'}`}>
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-brand-grey">No commitment. Cancel anytime.</p>
      </div>
    </section>
  );

  const FinalCTASection = () => (
    <section className="py-20 bg-brand-off-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-dark-teal max-w-3xl mx-auto">Start your next research breakthrough today.</h2>
        <p className="mt-4 text-lg text-brand-dark-grey">Join thousands of students already using Aveksana to explore, write, and fund their ideas.</p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          <a href="#free-tool" onClick={handleScrollTo} className="bg-brand-medium-teal text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-brand-teal transition-all transform hover:scale-105">
            Start for Free
          </a>
        </div>
      </div>
    </section>
  );

  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <TopicGenerator />
      <IntegritySection />
      <SuccessStoriesSection />
      <PricingSection />
      <FinalCTASection />
    </main>
  );
};

export default ForStudentsPage;