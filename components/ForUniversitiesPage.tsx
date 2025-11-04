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
    const caseStudyText = `
Aveksana University Partnership Case Study

Client: A leading research university (anonymous for confidentiality)
Date: Q4 2023

Challenge:
The university faced several challenges common in higher education: inconsistent thesis supervision quality, declining grant success rates, and siloed departmental research efforts. This led to extended student completion times and missed funding opportunities.

Solution:
The university implemented a campus-wide pilot of the Aveksana suite, including:
1.  Thesis Support System: Standardized feedback and plagiarism checks for all postgraduate students.
2.  Artha - AI Grant Writer: Deployed to the research grants office and faculty to optimize proposals.
3.  R&D Portal: Used by three key departments to foster cross-disciplinary collaboration.

Key Results after a 6-month pilot:
- 40% faster thesis review cycles: AI-powered feedback reduced supervisor workload and provided students with instant, actionable insights.
- 3x increase in successful grant applications: Artha's data-driven approach led to more targeted and compelling proposals, securing significant new funding.
- 25% higher student completion rate: Proactive progress tracking and consistent support helped at-risk students stay on track.
- Centralized visibility: The R&D portal broke down silos, leading to two new inter-departmental research projects.

Conclusion:
The Aveksana platform provided a unified solution that addressed the university's core challenges, leading to measurable improvements in academic output, funding, and operational efficiency.

---
To learn how Aveksana can help your institution, please book a demo with our team.
    `.trim();

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
          Unify your research - from student theses to funded innovation.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-brand-dark-grey max-w-3xl mx-auto">
          Aveksana helps universities standardize supervision, automate grant writing, and accelerate research output across departments.
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
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark-teal">Core Challenges We Solve</h2>
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
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark-teal">Real results from universities using Aveksana.</h2>
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

  const ImplementationSection = () => {
    const steps = [
      { num: 1, text: 'Request a Demo' },
      { num: 2, text: 'Pilot with selected departments' },
      { num: 3, text: 'Full campus rollout' },
      { num: 4, text: 'Data insights and ROI reporting' },
    ];
  
    return (
      <section className="py-20 bg-brand-off-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark-teal font-heading">
            A Simple, Phased Implementation
          </h2>
          <p className="mt-4 text-lg text-brand-dark-grey">
            Typical pilot duration: 4–6 weeks.
          </p>
          <div className="mt-16 max-w-5xl mx-auto">
            <div className="relative">
              {/* The connecting line for desktop view */}
              <div className="hidden md:block absolute top-8 left-0 w-full h-px bg-brand-light-grey"></div>

              {/* Steps */}
              <div className="flex flex-col md:flex-row justify-between items-start gap-y-12 md:gap-y-0">
                {steps.map((step) => (
                  <div key={step.num} className="w-full md:w-1/4 flex flex-col items-center relative px-2">
                    {/* Circle and Number */}
                    <div className="z-10 flex items-center justify-center w-16 h-16 bg-brand-off-white rounded-full border-2 border-brand-light-grey">
                      <div className="w-10 h-10 bg-gradient-to-br from-brand-medium-teal to-brand-seafoam rounded-md shadow-lg flex items-center justify-center text-white text-xl font-bold">
                        {step.num}
                      </div>
                    </div>
                    {/* Text */}
                    <p className="mt-4 font-semibold text-brand-dark-teal leading-tight">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const TestimonialsSection = () => (
    <section className="py-20 bg-brand-light-gray-blue">
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
          <button onClick={openDemoModal} className="text-brand-dark-grey hover:text-brand-medium-teal font-semibold px-4 py-2">
            Request Pilot Access
          </button>
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