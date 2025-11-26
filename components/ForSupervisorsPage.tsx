

import React, { useEffect } from 'react';
import TestimonialCard from './TestimonialCard';
import { SUPERVISOR_FEATURES, UNIVERSITY_TESTIMONIALS } from '../constants';
import { useModal } from '../contexts/ModalContext';

const ForSupervisorsPage = () => {
  const { openDemoModal } = useModal();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const HeroSection = () => (
    <section className="relative bg-brand-off-white pt-32 pb-20 text-center overflow-hidden">
       <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-light-gray-blue via-brand-off-white to-brand-off-white z-0"></div>
      <div className="container mx-auto px-6 relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-brand-dark-teal leading-tight">
          Supervise more students with less administrative load.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-brand-dark-grey max-w-3xl mx-auto">
          Streamline feedback, track progress automatically, and focus on high-impact mentoring.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <button onClick={openDemoModal} className="bg-brand-medium-teal text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-brand-teal transition-all transform hover:scale-105 w-full sm:w-auto">
            Book a Demo
          </button>
        </div>
      </div>
    </section>
  );

  const FeaturesSection = () => (
    <section className="py-20 bg-brand-off-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {SUPERVISOR_FEATURES.map(item => (
            <div key={item.title} className="p-6 rounded-lg border border-brand-light-grey bg-white hover:border-brand-medium-teal transition-colors">
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

  const WorkflowSection = () => (
      <section className="py-20 bg-brand-light-gray-blue">
          <div className="container mx-auto px-6">
               <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-brand-dark-teal">Integrated with your workflow.</h2>
                  <p className="mt-4 text-lg text-brand-dark-grey max-w-2xl mx-auto">
                      Aveksana connects directly with institutional LMS platforms like Canvas, Moodle, and Blackboard.
                  </p>
              </div>
              <div className="flex justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all">
                   <div className="bg-white px-8 py-4 rounded-lg font-bold text-xl text-brand-grey">Canvas</div>
                   <div className="bg-white px-8 py-4 rounded-lg font-bold text-xl text-brand-grey">Moodle</div>
                   <div className="bg-white px-8 py-4 rounded-lg font-bold text-xl text-brand-grey">Blackboard</div>
              </div>
          </div>
      </section>
  );

  const TestimonialSection = () => (
    <section className="py-20 bg-brand-off-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark-teal">Trusted by Faculty</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Reusing University Testimonials that are relevant to supervisors */}
          {UNIVERSITY_TESTIMONIALS.slice(0,2).map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );

  const FinalCTASection = () => (
    <section className="py-20 bg-brand-off-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-dark-teal max-w-3xl mx-auto">Ready to upgrade your supervision?</h2>
        <p className="mt-4 text-lg text-brand-dark-grey">Join an institutional pilot or invite your department.</p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          <button onClick={openDemoModal} className="bg-brand-medium-teal text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-brand-teal transition-all transform hover:scale-105">
            Request Department Access
          </button>
        </div>
      </div>
    </section>
  );

  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <WorkflowSection />
      <TestimonialSection />
      <FinalCTASection />
    </main>
  );
};

export default ForSupervisorsPage;