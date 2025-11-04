import React, { useState, useEffect } from 'react';

interface RequestDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RequestDemoModal: React.FC<RequestDemoModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    institution: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);


  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
          setFormData({ firstName: '', lastName: '', email: '', role: '', institution: '', message: '' });
          setIsSubmitted(false);
      }, 300);
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('Submitting demo/pilot request:', formData);
    // Simulate a network request
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const inputClasses = "w-full px-4 py-2 border border-brand-light-grey rounded-lg focus:ring-2 focus:ring-brand-medium-teal focus:border-transparent outline-none transition bg-white";

  return (
    <div 
      className={`fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
      aria-modal="true" 
      role="dialog"
      onClick={onClose}
    >
      <div 
        className={`bg-brand-off-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold text-brand-dark-teal">
                {isSubmitted ? 'Thank You!' : 'Request a Demo or Pilot Access'}
              </h2>
            <button onClick={onClose} className="text-brand-grey text-3xl leading-none hover:text-brand-dark-grey">&times;</button>
          </div>
          <p className="mt-1 text-brand-dark-grey">
            {isSubmitted ? 'We will be in touch shortly.' : 'Fill out the form below and we’ll contact you to schedule a demo.'}
          </p>

          {isSubmitted ? (
            <div className="mt-8 text-center py-8">
                <svg className="mx-auto h-16 w-16 text-brand-seafoam" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="mt-4 text-lg font-semibold text-brand-dark-teal">Your request has been sent!</p>
                <button onClick={onClose} className="mt-6 bg-brand-medium-teal text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-teal transition-colors">
                    Close
                </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-brand-dark-grey mb-1">First Name</label>
                  <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} className={inputClasses} required />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-brand-dark-grey mb-1">Last Name</label>
                  <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} className={inputClasses} required />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-brand-dark-grey mb-1">Work Email</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className={inputClasses} required />
              </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-brand-dark-grey mb-1">Job Title / Role</label>
                    <input type="text" name="role" id="role" value={formData.role} onChange={handleChange} className={inputClasses} required />
                  </div>
                  <div>
                    <label htmlFor="institution" className="block text-sm font-medium text-brand-dark-grey mb-1">University / Institution</label>
                    <input type="text" name="institution" id="institution" value={formData.institution} onChange={handleChange} className={inputClasses} required />
                  </div>
                </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-brand-dark-grey mb-1">What are you hoping to achieve? <span className="text-brand-grey">(Optional)</span></label>
                <textarea name="message" id="message" rows={3} value={formData.message} onChange={handleChange} className={inputClasses}></textarea>
              </div>
              <div className="pt-4">
                <button type="submit" disabled={isSubmitting} className="w-full bg-brand-medium-teal text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-brand-teal disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestDemoModal;
