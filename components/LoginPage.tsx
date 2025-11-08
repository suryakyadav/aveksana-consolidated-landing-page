import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // In a real app, you'd validate credentials here.
      // For this demo, any input is considered valid.
      console.log('Logging in with', { email, password });
      login({
        name: 'Dr. Alex Riley',
        email: email,
        organization: 'InnovateCorp',
        expertise: ['Machine Learning', 'Quantum Computing', 'Bio-informatics'],
        savedIdeas: [],
        pipelineProjects: [],
      });
      setIsLoading(false);
      navigate('/dashboard');
    }, 1000);
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
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" className="font-medium text-brand-medium-teal hover:text-brand-teal">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-brand-medium-teal text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-brand-teal disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </div>
          </form>
           <p className="mt-6 text-center text-sm text-brand-grey">
              Don't have an account?{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); alert("Sign up is not yet implemented.")}} className="font-medium text-brand-medium-teal hover:text-brand-teal">
                Sign Up
              </a>
            </p>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;