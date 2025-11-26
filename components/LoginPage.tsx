
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useAuthQuery';
import type { UserRole } from '../types';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('researcher');
  
  // Use the real auth mutation hook
  const { mutate: login, isPending, isError, error } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    // Call the mutation
    login({ email, password, role });
  };

  return (
    <main className="flex items-center justify-center py-20 bg-brand-light-gray-blue min-h-[calc(100vh-200px)]">
      <div className="container mx-auto px-6 max-w-md">
        <div className="bg-brand-off-white p-8 rounded-xl shadow-lg border border-brand-light-grey">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-brand-dark-teal">Welcome Back</h1>
            <p className="mt-2 text-brand-dark-grey">Log in to your Aveksana corporate account.</p>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-brand-dark-grey mb-1">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-medium-teal focus:border-transparent outline-none transition"
                disabled={isPending}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-brand-dark-grey mb-1">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-medium-teal focus:border-transparent outline-none transition"
                disabled={isPending}
              />
            </div>

            <div>
               <label htmlFor="role" className="block text-sm font-medium text-brand-dark-grey mb-1">Login As (Mock Backend Role)</label>
               <select
                 id="role"
                 name="role"
                 value={role}
                 onChange={(e) => setRole(e.target.value as UserRole)}
                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-medium-teal focus:border-transparent outline-none transition bg-white"
                 disabled={isPending}
               >
                 <option value="researcher">Researcher</option>
                 <option value="team_lead">Team Lead</option>
                 <option value="admin">Admin</option>
                 <option value="supervisor">Supervisor</option>
               </select>
            </div>

            {isError && (
                <p className="text-red-600 text-sm text-center bg-red-50 p-2 rounded border border-red-100">
                    {(error as any)?.response?.data?.message || 'Login failed. Please try again.'}
                </p>
            )}

            <div>
              <button
                type="submit"
                disabled={isPending}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-brand-medium-teal hover:bg-brand-teal focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-medium-teal transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isPending ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
             <Link to="/" className="text-sm font-medium text-brand-medium-teal hover:text-brand-teal">
                Forgot your password?
             </Link>
          </div>
          <div className="mt-2 text-center">
              <p className="text-sm text-brand-dark-grey">Don't have an account? <a href="/#/solutions/for-individuals" className="font-medium text-brand-medium-teal hover:text-brand-teal">Sign up</a></p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
