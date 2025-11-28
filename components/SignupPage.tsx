

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRegister } from '../hooks/useAuthQuery';
import { useModal } from '../contexts/ModalContext';
import { UsersIcon, RDPortalIcon, TargetIcon } from './icons';
import { UserRole } from '../types';

const SignupPage = () => {
  const [activeTab, setActiveTab] = useState<'individual' | 'institution'>('individual');
  const { openDemoModal } = useModal();
  const { mutate: register, isPending, isError, error } = useRegister();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For individuals, we default to 'student' role
    register({ ...formData, role: UserRole.STUDENT, organization: 'Independent' });
  };

  const inputClasses = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-medium-teal focus:border-transparent outline-none transition bg-white";

  return (
    <main className="flex items-center justify-center py-20 bg-brand-light-gray-blue min-h-[calc(100vh-200px)]">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-brand-off-white rounded-xl shadow-2xl overflow-hidden border border-brand-light-grey flex flex-col md:flex-row">
          
          {/* Tab Selection / Sidebar */}
          <div className="md:w-1/3 bg-brand-light-gray-blue/50 p-8 border-r border-brand-light-grey flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-brand-dark-teal mb-6">Join Aveksana</h2>
            <div className="space-y-4">
              <button
                onClick={() => setActiveTab('individual')}
                className={`w-full text-left p-4 rounded-lg border transition-all flex items-center gap-3 ${
                  activeTab === 'individual'
                    ? 'bg-white border-brand-medium-teal shadow-sm ring-1 ring-brand-medium-teal'
                    : 'bg-transparent border-brand-grey/30 hover:bg-white/50'
                }`}
              >
                <UsersIcon className={`h-6 w-6 ${activeTab === 'individual' ? 'text-brand-medium-teal' : 'text-brand-grey'}`} />
                <div>
                  <p className={`font-bold ${activeTab === 'individual' ? 'text-brand-dark-teal' : 'text-brand-dark-grey'}`}>For Myself</p>
                  <p className="text-xs text-brand-dark-grey">Students & Researchers</p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('institution')}
                className={`w-full text-left p-4 rounded-lg border transition-all flex items-center gap-3 ${
                  activeTab === 'institution'
                    ? 'bg-white border-brand-medium-teal shadow-sm ring-1 ring-brand-medium-teal'
                    : 'bg-transparent border-brand-grey/30 hover:bg-white/50'
                }`}
              >
                <TargetIcon className={`h-6 w-6 ${activeTab === 'institution' ? 'text-brand-medium-teal' : 'text-brand-grey'}`} />
                <div>
                  <p className={`font-bold ${activeTab === 'institution' ? 'text-brand-dark-teal' : 'text-brand-dark-grey'}`}>For My Organization</p>
                  <p className="text-xs text-brand-dark-grey">Universities & R&D</p>
                </div>
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="md:w-2/3 p-8 md:p-12 bg-white">
            {activeTab === 'individual' ? (
              <>
                <h1 className="text-3xl font-bold text-brand-dark-teal mb-2">Create your free account</h1>
                <p className="text-brand-dark-grey mb-8">Start generating ideas and drafting your thesis today.</p>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-brand-dark-grey mb-1">Full Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        className={inputClasses} 
                        required 
                        disabled={isPending}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-dark-grey mb-1">Email Address</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        className={inputClasses} 
                        required 
                        disabled={isPending}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-dark-grey mb-1">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        className={inputClasses} 
                        required 
                        disabled={isPending}
                    />
                  </div>

                  {isError && (
                    <p className="text-red-600 text-sm bg-red-50 p-2 rounded border border-red-100">
                        {(error as any)?.response?.data?.message || 'Registration failed. Please try again.'}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-brand-medium-teal text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-brand-teal disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    {isPending ? 'Creating Account...' : 'Create Account'}
                  </button>
                </form>
                <p className="mt-6 text-center text-sm text-brand-dark-grey">
                    Already have an account? <Link to="/login" className="text-brand-medium-teal font-semibold hover:underline">Log in</Link>
                </p>
              </>
            ) : (
              <div className="flex flex-col h-full justify-center text-center">
                <div className="bg-brand-light-gray-blue p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 text-brand-medium-teal">
                    <RDPortalIcon className="h-10 w-10" />
                </div>
                <h1 className="text-3xl font-bold text-brand-dark-teal mb-4">Enterprise & Academic Access</h1>
                <p className="text-brand-dark-grey mb-8 leading-relaxed">
                    To set up Aveksana for your department, university, or R&D team, please book a demo with our solutions team. We offer SSO integration, bulk provisioning, and enterprise security.
                </p>
                <div className="space-y-4">
                    <button 
                        onClick={openDemoModal}
                        className="w-full bg-brand-dark-teal text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-brand-teal transition-colors"
                    >
                        Contact Sales / Book Demo
                    </button>
                    <p className="text-sm text-brand-grey">
                        Joining an existing team? <Link to="/login" className="text-brand-medium-teal font-semibold hover:underline">Log in here</Link>
                    </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignupPage;