

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useAuthQuery';
import { checkDomain } from '../api/auth';
import type { Organization } from '../types';
import { LockClosedIcon, UsersIcon } from './icons';

type LoginStep = 'email' | 'password' | 'sso';

const LoginPage = () => {
  const [step, setStep] = useState<LoginStep>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [isCheckingDomain, setIsCheckingDomain] = useState(false);
  
  const { mutate: login, isPending, isError, error } = useLogin();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsCheckingDomain(true);
    try {
        const org = await checkDomain(email);
        if (org && org.ssoEnabled) {
            setOrganization(org);
            setStep('sso');
        } else {
            setOrganization(null);
            setStep('password');
        }
    } catch (err) {
        // Fallback to password if check fails
        setStep('password');
    } finally {
        setIsCheckingDomain(false);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    login({ email, password });
  };

  const handleSSOSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Mock SSO login - in real app this redirects to IdP
      login({ email, sso: true }); 
  };

  const handleBack = () => {
      setStep('email');
      setPassword('');
      setOrganization(null);
  };

  return (
    <main className="flex items-center justify-center py-20 bg-brand-light-gray-blue min-h-[calc(100vh-200px)]">
      <div className="container mx-auto px-6 max-w-md">
        <div className="bg-brand-off-white p-8 rounded-xl shadow-lg border border-brand-light-grey">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-brand-dark-teal">
                {step === 'sso' ? `Log in to ${organization?.name}` : 'Welcome Back'}
            </h1>
            <p className="mt-2 text-brand-dark-grey">
                {step === 'sso' ? 'Use your institutional account.' : 'Log in to your Aveksana account.'}
            </p>
          </div>

          {/* STEP 1: EMAIL */}
          {step === 'email' && (
              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-brand-dark-grey mb-1">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-medium-teal focus:border-transparent outline-none transition"
                    disabled={isCheckingDomain}
                    placeholder="name@university.edu"
                  />
                </div>
                <button
                    type="submit"
                    disabled={isCheckingDomain || !email}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-brand-medium-teal hover:bg-brand-teal transition-colors disabled:bg-gray-400"
                >
                    {isCheckingDomain ? 'Checking...' : 'Continue'}
                </button>
              </form>
          )}

          {/* STEP 2a: PASSWORD */}
          {step === 'password' && (
              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                 <div className="flex items-center justify-between bg-brand-light-gray-blue/50 p-3 rounded-lg mb-4">
                    <span className="text-brand-dark-teal font-medium">{email}</span>
                    <button type="button" onClick={handleBack} className="text-xs text-brand-medium-teal hover:underline">Change</button>
                 </div>
                 <div>
                  <label htmlFor="password" className="block text-sm font-medium text-brand-dark-grey mb-1">Password</label>
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-medium-teal focus:border-transparent outline-none transition"
                    disabled={isPending}
                  />
                </div>
                {isError && (
                    <p className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
                        Login failed. Please check your credentials.
                    </p>
                )}
                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-brand-medium-teal hover:bg-brand-teal transition-colors disabled:bg-gray-400"
                >
                    {isPending ? 'Signing in...' : 'Sign in'}
                </button>
              </form>
          )}

          {/* STEP 2b: SSO */}
          {step === 'sso' && (
              <div className="space-y-6">
                 <div className="flex items-center justify-between bg-brand-light-gray-blue/50 p-3 rounded-lg mb-4">
                    <span className="text-brand-dark-teal font-medium">{email}</span>
                    <button type="button" onClick={handleBack} className="text-xs text-brand-medium-teal hover:underline">Change</button>
                 </div>
                 
                 <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-center">
                     <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-2">
                        <UsersIcon />
                     </div>
                     <p className="text-sm text-blue-800 font-medium">
                         Single Sign-On Enabled
                     </p>
                     <p className="text-xs text-blue-600 mt-1">
                         You will be redirected to {organization?.name}'s login page.
                     </p>
                 </div>

                 <button
                    onClick={handleSSOSubmit}
                    disabled={isPending}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-brand-medium-teal hover:bg-brand-teal transition-colors disabled:bg-gray-400"
                >
                    {isPending ? 'Redirecting...' : `Continue to ${organization?.name} Login`}
                </button>
                
                <div className="text-center">
                    <button onClick={() => setStep('password')} className="text-xs text-brand-grey hover:text-brand-dark-grey">
                        Use password instead (if allowed)
                    </button>
                </div>
              </div>
          )}
          
          {step === 'password' && (
            <div className="mt-6 text-center">
                <Link to="/" className="text-sm font-medium text-brand-medium-teal hover:text-brand-teal">
                    Forgot your password?
                </Link>
            </div>
          )}
          
          <div className="mt-6 pt-6 border-t border-brand-light-grey text-center">
              <p className="text-sm text-brand-dark-grey">Don't have an account? <Link to="/signup" className="font-medium text-brand-medium-teal hover:text-brand-teal">Sign up</Link></p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
