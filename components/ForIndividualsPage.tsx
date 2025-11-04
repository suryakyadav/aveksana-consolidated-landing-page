
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopicGenerator from './TopicGenerator';
import TestimonialCard from './TestimonialCard';
import { WHY_AVEKSANA_INDIVIDUALS, INDIVIDUAL_SUCCESS_STORIES, INDIVIDUAL_PLANS } from '../constants';

const ForIndividualsPage = () => {
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
          From Idea to Impact — Your AI Research Partner.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-brand-dark-grey max-w-3xl mx-auto">
          Discover unique topics, write better proposals, and collaborate — all in one AI-powered workspace.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <a href="#free-tool" onClick={handleScrollTo} className="bg-brand-medium-teal text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-brand-teal transition-all transform hover:scale-105 w-full sm:w-auto">
            Start Free
          </a>
          <a href="#free-tool" onClick={handleScrollTo} className="bg-transparent text-brand-dark-grey font-semibold px-8 py-3 w-full sm:w-auto hover:text-brand-medium-teal transition-colors">
            See How It Works &rarr;
          </a>
        </div>
      </div>
    </section>
  );

  const WhyAveksanaSection = () => (
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

  const EcosystemSection = () => (
    <section className="py-20 bg-brand-light-gray-blue">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-dark-teal">How Aveksana Fits Into Your Research Lifecycle</h2>
        <p className="mt-4 text-lg text-brand-dark-grey max-w-3xl mx-auto">Your individual work seamlessly connects to the broader academic landscape when your institution joins Aveksana.</p>
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute top-8 left-0 w-full h-0.5 bg-brand-grey/50 hidden md:block"></div>
            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-0">
              <div className="flex flex-col items-center text-center w-64 mx-auto md:mx-0">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-brand-off-white border-2 border-brand-medium-teal shadow-sm z-10 text-3xl">
                  <span>1️⃣</span>
                </div>
                <h4 className="mt-4 font-semibold text-lg text-brand-dark-teal">Start Free with Thesis</h4>
              </div>
              <div className="flex flex-col items-center text-center w-64 mx-auto md:mx-0">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-brand-off-white border-2 border-brand-medium-teal shadow-sm z-10 text-3xl">
                   <span>2️⃣</span>
                </div>
                <h4 className="mt-4 font-semibold text-lg text-brand-dark-teal">Invite your supervisor or link to your university account.</h4>
              </div>
              <div className="flex flex-col items-center text-center w-64 mx-auto md:mx-0">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-brand-off-white border-2 border-brand-medium-teal shadow-sm z-10 text-3xl">
                   <span>3️⃣</span>
                </div>
                <h4 className="mt-4 font-semibold text-lg text-brand-dark-teal">Collaborate within institutional tools (Supervisor, R&D Portal).</h4>
              </div>
            </div>
          </div>
        </div>
        <a href="/#demo" className="mt-12 inline-block bg-brand-off-white text-brand-medium-teal font-semibold px-6 py-3 rounded-lg border-2 border-brand-medium-teal shadow-sm hover:bg-brand-medium-teal/10 transition-colors">
          Invite Your University &rarr;
        </a>
      </div>
    </section>
  );

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
          <a href="#plans" onClick={handleScrollTo} className="text-brand-dark-grey hover:text-brand-medium-teal font-semibold px-4 py-2">
            View Plans
          </a>
        </div>
      </div>
    </section>
  );

  return (
    <main>
      <HeroSection />
      <WhyAveksanaSection />
      <TopicGenerator />
      <PricingSection />
      <EcosystemSection />
      <SuccessStoriesSection />
      <FinalCTASection />
    </main>
  );
};

export default ForIndividualsPage;