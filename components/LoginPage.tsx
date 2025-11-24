
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { UserRole, StrategicPlan } from '../types';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('researcher');
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
      console.log('Logging in with', { email, password, role });
      
      const sampleStrategy: StrategicPlan = {
          id: 'strat-001',
          title: 'FY25 Q2 Innovation Acceleration',
          createdAt: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
          updatedAt: new Date(Date.now() - 3600000).toISOString(),
          isShared: true,
          status: 'draft',
          sharedWith: [
              { name: 'Sarah Chen', role: 'VP Engineering' },
              { name: 'Michael Ross', role: 'Product Lead' }
          ],
          statement: {
              context: 'Market competition is intensifying in the AI sector.',
              coreProblem: 'Our deployment cycle is too slow compared to competitors (6 weeks vs 2 weeks).',
              constraints: 'Flat budget, no new hires authorized.',
              desiredOutcomes: 'Reduce deployment time to 3 weeks by end of Q3.',
              evaluationCriteria: 'Deployment frequency, bug rate in production.',
              stakeholders: 'DevOps team, Product Managers, QA.'
          },
          discussion: [
              {
                  id: 'msg-1',
                  name: 'Sarah Chen',
                  role: 'VP Engineering',
                  message: 'The timeline is aggressive given the legacy debt. Can we aim for 4 weeks first?',
                  isUser: false,
                  timestamp: '2 days ago'
              },
               {
                  id: 'msg-2',
                  name: 'Dr. Alex Riley',
                  role: 'Head of R&D',
                  message: 'I agree it is tight, but we need a stretch goal to force process innovation.',
                  isUser: true,
                  timestamp: '1 day ago'
              }
          ],
          priorities: [
            {
                id: 'p1',
                title: 'Automated Testing Pipeline',
                description: 'Implement a fully automated CI/CD testing suite to catch bugs earlier.',
                horizon: '12 months',
                strategicPillar: 'Operational Efficiency',
                status: 'published'
            },
            {
                id: 'p2',
                title: 'Microservices Decoupling',
                description: 'Break down the monolithic core into independent services to speed up deployment.',
                horizon: '18-24 months',
                strategicPillar: 'Architecture Modernization',
                status: 'draft'
            },
             {
                id: 'p3',
                title: 'AI-Driven QA',
                description: 'Integrate AI tools to predict potential failure points before code merge.',
                horizon: '24 months',
                strategicPillar: 'Innovation',
                status: 'published'
            }
          ],
          implementation: [
            {
                id: 'task-1',
                title: 'Literature Review on Quantum Sensors',
                description: 'Conduct a comprehensive review of recent advancements in quantum sensor technology for biological applications.',
                suggestedRole: 'Senior Researcher',
                assignee: 'Dr. Alex Riley', // Matches the login user
                status: 'pending',
                relatedPriorityId: 'p3',
                dueDate: '2024-05-15'
            },
            {
                id: 'task-2',
                title: 'Prototype Development Phase 1',
                description: 'Build initial prototype based on specifications.',
                suggestedRole: 'Engineer',
                assignee: 'Sarah Chen',
                status: 'in_progress',
                relatedPriorityId: 'p2',
                dueDate: '2024-06-01'
            }
          ]
      };

      login({
        name: 'Dr. Alex Riley',
        email: email,
        role: role,
        organization: 'InnovateCorp',
        expertise: ['Machine Learning', 'Quantum Computing', 'Bio-informatics'],
        savedIdeas: [],
        pipelineProjects: [],
        recentActivity: [],
        strategies: [sampleStrategy], // Available to all roles for demo purposes
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

            <div>
               <label htmlFor="role" className="block text-sm font-medium text-brand-dark-grey mb-1">Login As (Demo Role)</label>
               <select
                 id="role"
                 name="role"
                 value={role}
                 onChange={(e) => setRole(e.target.value as UserRole)}
                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-medium-teal focus:border-transparent outline-none transition bg-white"
                 disabled={isLoading}
               >
                 <option value="researcher">Researcher</option>
                 <option value="team_lead">Team Lead</option>
                 <option value="admin">Admin</option>
                 <option value="supervisor">Supervisor</option>
               </select>
            </div>

            {error && <p className="text-red-600 text-sm text-center">{error}</p>}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-brand-medium-teal hover:bg-brand-teal focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-medium-teal transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
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