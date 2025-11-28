
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../contexts/ModalContext';
import { 
  ThesisIcon, CheckCircleIcon, UsersIcon, ShieldCheckIcon, 
  TargetIcon, LightbulbIcon, ChevronDownIcon 
} from './icons';
import { SOCIAL_PROOF_LOGOS } from '../constants';

const FAQItem = ({ question, summary, answer }: { question: string, summary: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-brand-light-grey last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left py-4 focus:outline-none group"
      >
        <div className="flex justify-between items-center">
            <span className="font-semibold text-brand-dark-teal group-hover:text-brand-medium-teal transition-colors text-lg">{question}</span>
            <span className={`transform transition-transform duration-300 text-brand-medium-teal ${isOpen ? 'rotate-180' : ''}`}>
            <ChevronDownIcon />
            </span>
        </div>
        {!isOpen && (
            <p className="text-sm text-brand-grey mt-1">{summary}</p>
        )}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-4' : 'max-h-0'}`}>
        <p className="text-brand-dark-grey leading-relaxed text-sm">{answer}</p>
      </div>
    </div>
  );
};

const FeatureItem = ({ title, subtitle, items }: { title: string, subtitle: string, items: string[] }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-brand-light-grey hover:border-brand-medium-teal transition-colors h-full">
    <div className="mb-4 border-b border-brand-light-grey pb-3">
      <h3 className="font-bold text-lg text-brand-dark-teal">{title}</h3>
      <p className="text-xs text-brand-dark-grey mt-1 font-bold">{subtitle}</p>
    </div>
    <ul className="space-y-3">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-2 text-sm text-brand-dark-grey">
          <CheckCircleIcon />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const StepCard = ({ number, title, description }: { number: number, title: string, description: string }) => (
  <div className="bg-brand-off-white p-5 rounded-xl border border-brand-light-grey h-full flex items-start gap-4 hover:border-brand-medium-teal transition-colors shadow-sm group">
    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-brand-dark-teal font-bold border border-brand-medium-teal flex-shrink-0 shadow-sm mt-1 group-hover:bg-brand-medium-teal group-hover:text-white transition-colors">
      {number}
    </span>
    <div>
      <h4 className="font-bold text-brand-dark-teal leading-tight text-lg mb-2">{title}</h4>
      <p className="text-sm text-brand-dark-grey leading-relaxed">{description}</p>
    </div>
  </div>
);

const ThesisProductPage = () => {
  const { openDemoModal } = useModal();
  const [activePreview, setActivePreview] = useState<'student' | 'supervisor'>('student');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="bg-brand-off-white">
      {/* HERO SECTION */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-brand-light-gray-blue to-brand-off-white text-center relative">
        <div className="container mx-auto px-6">
          <Link to="/#products" className="inline-block mb-6 text-brand-grey hover:text-brand-medium-teal transition-colors text-sm font-semibold tracking-wide uppercase">
            &larr; Back to Products
          </Link>
          <div className="flex justify-center mb-6">
            <div className="bg-white p-4 rounded-full shadow-md">
              <ThesisIcon className="h-12 w-12 text-brand-medium-teal" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-brand-dark-teal leading-tight max-w-5xl mx-auto">
            Write better theses with structured guidance and real-time supervision.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-brand-dark-grey max-w-3xl mx-auto leading-relaxed">
            A dedicated platform that helps students plan, draft, and complete their thesis, while giving supervisors automated feedback tools, milestone tracking, and academic integrity automation.
          </p>
          <div className="mt-10 flex flex-col items-center gap-6">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <a href="/#free-tool" className="bg-transparent text-brand-medium-teal border-2 border-brand-medium-teal font-semibold px-8 py-3 rounded-lg hover:bg-brand-medium-teal/10 transition-all transform hover:scale-105 w-full sm:w-auto">
                Start for Free
                </a>
                <button onClick={openDemoModal} className="bg-brand-medium-teal text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-brand-teal transition-all transform hover:scale-105 w-full sm:w-auto">
                Request a Demo
                </button>
            </div>
            <p className="text-sm text-brand-grey font-medium">Trusted by research offices at leading universities.</p>
          </div>
          
          <div className="mt-12 flex justify-center animate-bounce">
             <a href="#preview" onClick={(e) => handleScrollTo(e, 'preview')} aria-label="Scroll down" className="text-brand-medium-teal/50 hover:text-brand-medium-teal transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
             </a>
          </div>

          {/* EARLY SOCIAL PROOF */}
          <div className="mt-8 pt-8 border-t border-brand-grey/20 max-w-4xl mx-auto">
            <p className="text-xs font-bold text-brand-grey uppercase tracking-widest mb-6">Trusted by departments at</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60 grayscale">
               {SOCIAL_PROOF_LOGOS.slice(0, 4).map((logo, idx) => (
                 <img key={idx} src={logo.src} alt={logo.name} className="h-6 w-auto" />
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* UI PREVIEW SECTION */}
      <section id="preview" className="py-12 bg-brand-off-white scroll-mt-24">
        <div className="container mx-auto px-6 max-w-7xl">
           <div className="bg-white rounded-2xl shadow-xl border border-brand-light-grey overflow-hidden">
              <div className="bg-brand-light-gray-blue/50 px-6 py-4 flex items-center gap-4 border-b border-brand-light-grey">
                 <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                    <span className="w-3 h-3 rounded-full bg-green-400"></span>
                 </div>
                 <div className="flex gap-4 ml-4 text-sm font-semibold">
                    <button 
                      onClick={() => setActivePreview('student')}
                      className={`px-3 py-1 rounded-md transition-colors ${activePreview === 'student' ? 'bg-white text-brand-dark-teal shadow-sm' : 'text-brand-grey hover:text-brand-dark-grey'}`}
                    >
                      Student View
                    </button>
                    <button 
                      onClick={() => setActivePreview('supervisor')}
                      className={`px-3 py-1 rounded-md transition-colors ${activePreview === 'supervisor' ? 'bg-white text-brand-dark-teal shadow-sm' : 'text-brand-grey hover:text-brand-dark-grey'}`}
                    >
                      Supervisor Dashboard
                    </button>
                 </div>
              </div>
              <div className="aspect-[16/9] bg-gray-50 flex items-center justify-center relative p-8 md:p-12">
                 {activePreview === 'student' ? (
                    <div className="w-full h-full max-w-6xl bg-white shadow-2xl rounded-lg border border-gray-200 flex flex-col overflow-hidden transform scale-100 transition-transform duration-500">
                        {/* Fake Toolbar */}
                        <div className="h-14 border-b border-gray-100 flex items-center px-6 gap-4 bg-white">
                            <div className="w-8 h-8 bg-gray-200 rounded"></div>
                            <div className="w-48 h-5 bg-gray-100 rounded"></div>
                            <div className="ml-auto flex gap-3">
                                <div className="w-24 h-9 bg-brand-medium-teal/10 rounded"></div>
                                <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
                            </div>
                        </div>
                        <div className="flex-grow flex">
                             {/* Fake Sidebar */}
                             <div className="w-72 border-r border-gray-100 p-6 space-y-5 hidden md:block bg-gray-50/50">
                                <div className="w-3/4 h-5 bg-gray-200 rounded mb-8"></div>
                                <div className="space-y-3">
                                    <div className="w-full h-10 bg-brand-light-gray-blue/50 rounded border border-brand-medium-teal/20"></div>
                                    <div className="w-full h-10 bg-white rounded border border-gray-100"></div>
                                    <div className="w-full h-10 bg-white rounded border border-gray-100"></div>
                                    <div className="w-full h-10 bg-white rounded border border-gray-100"></div>
                                </div>
                                <div className="mt-12 w-1/2 h-4 bg-gray-200 rounded"></div>
                                <div className="w-full h-32 bg-white rounded border border-gray-200 shadow-sm"></div>
                             </div>
                             {/* Fake Content */}
                             <div className="flex-grow p-10 bg-white">
                                <div className="w-2/3 h-10 bg-gray-100 rounded mb-8"></div>
                                <div className="space-y-4 mb-10">
                                    <div className="w-full h-4 bg-gray-50 rounded"></div>
                                    <div className="w-full h-4 bg-gray-50 rounded"></div>
                                    <div className="w-full h-4 bg-gray-50 rounded"></div>
                                    <div className="w-5/6 h-4 bg-gray-50 rounded"></div>
                                </div>
                                <div className="bg-brand-light-gray-blue/10 border border-brand-medium-teal/20 rounded-xl p-6 flex gap-5">
                                    <div className="w-12 h-12 rounded-full bg-brand-medium-teal/10 flex-shrink-0 flex items-center justify-center">
                                        <div className="w-6 h-6 bg-brand-medium-teal/30 rounded-full"></div>
                                    </div>
                                    <div className="flex-grow space-y-3">
                                        <div className="w-1/3 h-5 bg-brand-medium-teal/20 rounded"></div>
                                        <div className="w-full h-3 bg-gray-100 rounded"></div>
                                        <div className="w-11/12 h-3 bg-gray-100 rounded"></div>
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>
                 ) : (
                    <div className="w-full h-full max-w-6xl bg-white shadow-2xl rounded-lg border border-gray-200 flex flex-col overflow-hidden transform scale-100 transition-transform duration-500">
                         {/* Fake Toolbar */}
                        <div className="h-14 border-b border-gray-100 flex items-center px-6 justify-between bg-white">
                            <div className="w-40 h-6 bg-gray-200 rounded"></div>
                            <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
                        </div>
                        <div className="p-10 bg-gray-50/30">
                            <div className="flex justify-between items-end mb-10">
                                <div className="space-y-2">
                                    <div className="w-64 h-8 bg-gray-200 rounded"></div>
                                    <div className="w-40 h-4 bg-gray-100 rounded"></div>
                                </div>
                                <div className="w-40 h-10 bg-brand-medium-teal rounded shadow-sm"></div>
                            </div>
                            <div className="grid grid-cols-4 gap-6 mb-10">
                                <div className="h-32 bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col justify-between">
                                    <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
                                    <div className="w-16 h-6 bg-gray-200 rounded"></div>
                                </div>
                                <div className="h-32 bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col justify-between">
                                    <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
                                    <div className="w-16 h-6 bg-gray-200 rounded"></div>
                                </div>
                                <div className="h-32 bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col justify-between">
                                    <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
                                    <div className="w-16 h-6 bg-gray-200 rounded"></div>
                                </div>
                                <div className="h-32 bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col justify-between">
                                    <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
                                    <div className="w-16 h-6 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
                                <div className="h-12 bg-gray-50 border-b border-gray-100 flex items-center px-6 gap-4">
                                    <div className="w-1/4 h-4 bg-gray-200 rounded"></div>
                                    <div className="w-1/4 h-4 bg-gray-200 rounded"></div>
                                    <div className="w-1/4 h-4 bg-gray-200 rounded"></div>
                                    <div className="w-1/4 h-4 bg-gray-200 rounded"></div>
                                </div>
                                <div className="divide-y divide-gray-50">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="h-16 flex items-center px-6 gap-4">
                                            <div className="w-1/4 h-4 bg-gray-100 rounded"></div>
                                            <div className="w-1/4 h-4 bg-gray-100 rounded"></div>
                                            <div className="w-1/4 h-4 bg-gray-100 rounded"></div>
                                            <div className="w-1/4 h-4 bg-brand-light-gray-blue/50 rounded"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                 )}
              </div>
           </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-dark-teal">Built for the entire thesis workflow.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="px-4">
              <div className="mx-auto w-16 h-16 bg-brand-light-gray-blue rounded-full flex items-center justify-center text-brand-dark-teal mb-6">
                <LightbulbIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-brand-dark-teal mb-3">For Students</h3>
              <p className="text-brand-dark-grey">Write confidently with structured templates, step-by-step guidance, and instant feedback.</p>
            </div>
            <div className="px-4 border-l border-r border-transparent md:border-brand-light-grey">
              <div className="mx-auto w-16 h-16 bg-brand-light-gray-blue rounded-full flex items-center justify-center text-brand-dark-teal mb-6">
                <UsersIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-brand-dark-teal mb-3">For Supervisors</h3>
              <p className="text-brand-dark-grey">Manage more students with less administrative load through automated tracking and consolidated review workflows.</p>
            </div>
            <div className="px-4">
              <div className="mx-auto w-16 h-16 bg-brand-light-gray-blue rounded-full flex items-center justify-center text-brand-dark-teal mb-6">
                <TargetIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-brand-dark-teal mb-3">For Universities</h3>
              <p className="text-brand-dark-grey">Standardize supervision quality, ensure academic integrity, and gain full lifecycle oversight.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (Refactored) */}
      <section className="py-20 bg-brand-light-gray-blue">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-dark-teal">How It Works</h2>
          </div>
          
          <div className="space-y-16">
            {/* Student Flow */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-light-grey">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-8 pb-4 border-b border-brand-light-grey">
                 <div className="p-2 bg-brand-medium-teal text-white rounded-lg"><LightbulbIcon /></div>
                 <div>
                    <h3 className="text-2xl font-bold text-brand-dark-teal">Student Journey</h3>
                    <p className="text-brand-grey text-sm font-medium uppercase tracking-wide mt-1">Focuses on writing & integrity</p>
                 </div>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                 <StepCard number={1} title="Plan with Structure" description="Select your degree and methodology to generate a complete thesis outline with recommended sections." />
                 <StepCard number={2} title="Draft & Verify" description="Write with chapter-level AI prompts and run instant integrity checks for plagiarism and AI content." />
                 <StepCard number={3} title="Submit Confidently" description="Export perfectly formatted documents or submit directly to your supervisor via LMS integration." />
              </div>
            </div>

            {/* Supervisor Flow */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-light-grey">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-8 pb-4 border-b border-brand-light-grey">
                 <div className="p-2 bg-brand-seafoam text-brand-dark-teal rounded-lg"><UsersIcon /></div>
                 <div>
                    <h3 className="text-2xl font-bold text-brand-dark-teal">Supervisor Journey</h3>
                    <p className="text-brand-grey text-sm font-medium uppercase tracking-wide mt-1">Focuses on visibility & automation</p>
                 </div>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                 <StepCard number={1} title="Centralized Dashboard" description="See progress, outstanding tasks, and submission readiness for all your students in one view." />
                 <StepCard number={2} title="Automated Review" description="Receive AI summaries of changes and potential integrity issues before you start reading." />
                 <StepCard number={3} title="Standardized Feedback" description="Use rubrics and comment libraries to provide consistent, high-quality guidance faster." />
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
             <button onClick={openDemoModal} className="text-lg font-bold text-brand-medium-teal hover:text-brand-dark-teal transition-colors flex items-center justify-center gap-2">
                See it in action &rarr; <span className="underline">Book a Demo</span>
             </button>
          </div>
        </div>
      </section>

      {/* METRICS BANNER */}
      <section className="bg-brand-dark-teal text-white py-12">
         <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-brand-teal">
               <div className="px-4 py-2">
                  <div className="text-4xl font-bold text-brand-seafoam mb-2">48%</div>
                  <div className="text-brand-light-gray-blue font-medium text-opacity-80">Faster revision cycles</div>
               </div>
               <div className="px-4 py-2">
                  <div className="text-4xl font-bold text-brand-seafoam mb-2">40%</div>
                  <div className="text-brand-light-gray-blue font-medium text-opacity-80">Reduction in integrity issues</div>
               </div>
               <div className="px-4 py-2">
                  <div className="text-4xl font-bold text-brand-seafoam mb-2">25%</div>
                  <div className="text-brand-light-gray-blue font-medium text-opacity-80">Improved completion rate</div>
               </div>
            </div>
         </div>
      </section>

      {/* KEY FEATURES */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-dark-teal">Powerful Features</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureItem 
              title="Guided Writing" 
              subtitle="Stop writer's block with structured support."
              items={[
                "Structured templates",
                "Discipline-aware prompts",
                "Literature synthesis support",
                "Methodology scaffolding",
                "Argumentation flow analysis"
              ]} 
            />
            <FeatureItem 
              title="Supervision Automation" 
              subtitle="Reduce manual admin, speed up reviews."
              items={[
                "Student progress dashboard",
                "Automated check-ins",
                "Feedback workflows",
                "Version comparison",
                "Supervisor assistant"
              ]} 
            />
            <FeatureItem 
              title="Integrity & Compliance" 
              subtitle="Catch issues early — before submission."
              items={[
                "Plagiarism scanning",
                "AI-content detection",
                "Reference validation",
                "Style & formatting checks",
                "Ethical compliance prompts"
              ]} 
            />
            <FeatureItem 
              title="Collaboration" 
              subtitle="Seamless sync with your existing LMS."
              items={[
                "LMS Sync (Canvas, Moodle)",
                "Multi-supervisor collaboration",
                "Export to Word, PDF, LaTeX",
                "Institution admin portal",
                "Single sign-on (SSO)"
              ]} 
            />
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="py-20 bg-brand-light-gray-blue">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-dark-teal">Why Aveksana?</h2>
            <p className="mt-4 text-lg text-brand-dark-grey max-w-2xl mx-auto">
               Most tools only solve individual tasks. Aveksana connects everything — writing, supervision, and integrity — in one place.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-brand-light-grey">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-brand-dark-teal text-white">
                  <th className="p-4 md:p-6 font-bold w-1/2">Traditional Workflow</th>
                  <th className="p-4 md:p-6 font-bold w-1/2 bg-brand-medium-teal">With Aveksana</th>
                </tr>
              </thead>
              <tbody className="text-sm md:text-base">
                {[
                  ["Multiple documents, scattered revisions", "One unified workspace"],
                  ["Manual follow-ups and emails", "Automated reminders & tracking"],
                  ["Limited writing guidance", "Structured, discipline-aware guidance"],
                  ["Plagiarism checks only", "Plagiarism + AI detection + citation validation"],
                  ["Slow review cycles", "Automated summaries & recommended feedback"],
                  ["No standardization", "Consistent supervision across departments"]
                ].map(([bad, good], idx) => {
                    const isHighlight = idx === 3 || idx === 4;
                    return (
                        <tr key={idx} className={`border-b border-brand-light-grey last:border-0 hover:bg-gray-50 ${isHighlight ? 'bg-brand-medium-teal/5' : ''}`}>
                            <td className="p-4 md:p-6 text-brand-dark-grey font-medium">{bad}</td>
                            <td className={`p-4 md:p-6 font-semibold text-brand-dark-teal ${isHighlight ? 'text-brand-teal' : ''}`}>{good}</td>
                        </tr>
                    );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-dark-teal">Proven to elevate research outcomes.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "This will revolutionize thesis writing and supervision.",
                author: "Shekhar Satpute",
                role: "Senior Lecturer, School of Technology",
                logo: SOCIAL_PROOF_LOGOS[0]
              },
              {
                quote: "Students completed drafts faster and with fewer revisions. Our supervisors love it.",
                author: "Department Coordinator",
                role: "TAMK",
                logo: SOCIAL_PROOF_LOGOS[1]
              },
              {
                quote: "We adopted the system across 12 departments — integrity issues dropped by 40%.",
                author: "Research Integrity Office",
                role: "NTU",
                logo: SOCIAL_PROOF_LOGOS[2]
              }
            ].map((t, i) => (
              <div key={i} className="bg-brand-off-white p-8 rounded-xl border border-brand-light-grey flex flex-col h-full">
                <p className="text-brand-dark-grey italic mb-6 flex-grow">"{t.quote}"</p>
                <div className="mt-auto">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-brand-light-gray-blue flex items-center justify-center text-brand-dark-teal font-bold text-xs">
                            {t.author.charAt(0)}
                        </div>
                        <div>
                            <div className="font-bold text-brand-dark-teal text-sm">{t.author}</div>
                            <div className="text-xs text-brand-grey uppercase tracking-wide">{t.role}</div>
                        </div>
                    </div>
                    {/* Placeholder for small logo badge */}
                    <div className="mt-3 pt-3 border-t border-brand-light-grey flex items-center gap-2 opacity-70 grayscale">
                        <img src={t.logo.src} alt={t.logo.name} className="h-4 w-auto" />
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRATIONS & SECURITY */}
      <section className="py-20 bg-brand-dark-teal text-white">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Works with your current systems.</h2>
            <p className="text-brand-light-gray-blue mb-6">Seamless syncing of submissions, deadlines, users, and feedback.</p>
            <div className="flex flex-wrap gap-4 font-heading font-bold text-xl opacity-80">
              <span>Canvas</span> • <span>Moodle</span> • <span>Blackboard</span> • <span>Brightspace</span>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6">Built for academic institutions.</h2>
            <ul className="space-y-3 text-brand-light-gray-blue">
              <li className="flex items-center gap-2"><ShieldCheckIcon /> FERPA & GDPR compliant</li>
              <li className="flex items-center gap-2"><ShieldCheckIcon /> Data encrypted in transit and at rest</li>
              <li className="flex items-center gap-2"><ShieldCheckIcon /> Role-based access control</li>
              <li className="flex items-center gap-2"><ShieldCheckIcon /> Secure institutional SSO</li>
            </ul>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-20 bg-brand-light-gray-blue" id="pricing">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-dark-teal">Flexible plans built for departments.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm text-center border border-brand-light-grey flex flex-col">
              <h3 className="font-bold text-xl text-brand-dark-teal mb-2">For Students</h3>
              <p className="text-brand-dark-grey mb-6">Free when your institution participates.</p>
              <div className="mt-auto">
                 <a href="/#free-tool" className="block w-full py-2 rounded-lg border border-brand-medium-teal text-brand-medium-teal font-semibold hover:bg-brand-medium-teal hover:text-white transition-colors">Start for Free</a>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm text-center border border-brand-light-grey flex flex-col">
              <h3 className="font-bold text-xl text-brand-dark-teal mb-2">For Supervisors</h3>
              <p className="text-brand-dark-grey mb-6">Included in departmental or institution license.</p>
              <div className="mt-auto">
                 <button onClick={openDemoModal} className="block w-full py-2 rounded-lg border border-brand-medium-teal text-brand-medium-teal font-semibold hover:bg-brand-medium-teal hover:text-white transition-colors">Contact Sales</button>
              </div>
            </div>
            <div className="bg-brand-dark-teal p-8 rounded-xl shadow-lg text-center text-white relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 bg-brand-seafoam text-brand-dark-teal text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
              <h3 className="font-bold text-xl mb-2">For Universities</h3>
              <p className="text-brand-light-gray-blue mb-6">Custom pricing based on student/faculty volume.</p>
              <div className="mt-auto">
                 <button onClick={openDemoModal} className="block w-full py-2 rounded-lg bg-brand-seafoam text-brand-dark-teal font-bold hover:bg-white transition-colors">Request Institutional Pricing</button>
                 <p className="text-xs text-brand-light-gray-blue mt-3 opacity-80">Includes onboarding, training, and full institutional support.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-bold text-brand-dark-teal text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-2">
            <FAQItem 
                question="Do you replace our LMS?" 
                summary="We integrate with your LMS, not replace it."
                answer="No. Aveksana complements your LMS and integrates with it to provide specialized thesis supervision tools." 
            />
            <FAQItem 
                question="Can students use it individually?" 
                summary="Yes, individual plans are available."
                answer="Yes - individuals can start for free and upgrade if their institution adopts it." 
            />
            <FAQItem 
                question="Does it detect AI-generated text?" 
                summary="Yes, AI detection is built-in."
                answer="Yes. It provides integrity signals, source validation, and supervisor alerts." 
            />
            <FAQItem 
                question="Can multiple supervisors collaborate?" 
                summary="Yes, co-supervision is supported."
                answer="Yes - shared notes, comments, and handoffs are built in." 
            />
            <FAQItem 
                question="Does it support all disciplines?" 
                summary="Yes, templates are discipline-agnostic."
                answer="Yes - with discipline-specific writing guidance and structure templates." 
            />
            <FAQItem 
                question="Why this and not ChatGPT + Turnitin + Google Docs?" 
                summary="Aveksana unifies the entire workflow."
                answer="Because those tools weren’t designed for the thesis process. They handle individual tasks in isolation. Aveksana connects writing guidance, milestone tracking, supervisor feedback, and integrity checks in one place, ensuring a coherent, academically aligned thesis from start to finish." 
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-brand-off-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-brand-dark-teal mb-6">Ready to elevate thesis supervision?</h2>
          <p className="text-xl text-brand-dark-grey mb-10">Join a pilot program or introduce Aveksana to your department.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a href="/#free-tool" className="px-8 py-4 bg-white border-2 border-brand-medium-teal text-brand-medium-teal font-bold rounded-lg hover:bg-brand-medium-teal hover:text-white transition-all shadow-sm">
              Start for Free
            </a>
            <button onClick={openDemoModal} className="px-8 py-4 bg-brand-medium-teal text-white font-bold rounded-lg hover:bg-brand-teal transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Request Department Access
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ThesisProductPage;
