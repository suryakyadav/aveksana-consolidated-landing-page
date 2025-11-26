

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThesisIcon, ArthaIcon, RDPortalIcon, UsersIcon, ChartBarIcon, ClipboardListIcon, ShieldCheckIcon, AdjustmentsIcon, TargetIcon, CheckBadgeIcon } from './icons';
import { useAuth } from '../contexts/AuthContext';
import type { Activity } from '../types';

const DashboardCard: React.FC<{icon: React.ReactNode, title: string, description: string, cta: string, to: string, badge?: string}> = ({ icon, title, description, cta, to, badge }) => (
    <Link to={to} className="group relative block p-8 bg-brand-off-white rounded-xl shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-brand-light-grey h-full">
      {badge && (
        <div className="absolute top-4 right-4 bg-brand-light-gray-blue text-brand-dark-teal text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">
          {badge}
        </div>
      )}
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-brand-dark-teal">{title}</h3>
      <p className="mt-2 text-brand-dark-grey">{description}</p>
      <div className="mt-4 font-semibold text-brand-medium-teal cursor-pointer group-hover:underline">
        {cta} &rarr;
      </div>
    </Link>
);

const formatDistanceToNow = (isoDate: string): string => {
    const date = new Date(isoDate);
    const now = new Date();
    const seconds = Math.round((now.getTime() - date.getTime()) / 1000);

    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);

    if (seconds < 60) {
        return 'just now';
    } else if (minutes < 60) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (hours < 24) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (days < 7) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
        return date.toLocaleDateString();
    }
};

const RecentActivityItem: React.FC<{ activity: Activity }> = ({ activity }) => (
    <li className="py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            <div className="bg-brand-light-gray-blue p-2 rounded-full">
                {activity.type === 'project_access' ? <ChartBarIcon /> : <ClipboardListIcon />}
            </div>
            <div>
                <p className="text-brand-dark-grey text-sm md:text-base">
                    {activity.type === 'project_access' ? 'Accessed project:' : 'Saved new idea:'}
                    <Link to={activity.link} className="font-semibold text-brand-dark-teal hover:underline ml-1">
                        {activity.title}
                    </Link>
                </p>
            </div>
        </div>
        <p className="text-sm text-brand-grey flex-shrink-0">{formatDistanceToNow(activity.timestamp)}</p>
    </li>
);

const DashboardPage = () => {
    const { user, activeWorkspace, currentRole } = useAuth();
    const recentActivity = user?.recentActivity || [];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const getRoleBasedFeatures = () => {
        const commonFeatures = [
             {
                icon: <ThesisIcon />,
                title: 'Unique Idea Formulator',
                description: 'Produce novel research ideas with high research gap scores.',
                cta: 'Generate Ideas',
                to: '/dashboard/idea-generator'
            },
            {
                icon: <ArthaIcon />,
                title: 'Artha Grant Management',
                description: 'Track funding and manage proposals.',
                cta: 'View Grants',
                to: '/dashboard/grants'
            },
        ];

        const pipelineFeature = {
            icon: <RDPortalIcon />,
            title: currentRole === 'researcher' ? 'My R&D Pipeline' : 'Team Innovation Pipeline',
            description: currentRole === 'researcher' 
                ? 'Visualize your personal innovation pipeline.' 
                : 'Monitor project status across your team.',
            cta: 'Go to Pipeline',
            to: '/dashboard/pipeline'
        };
        
        const profileFeature = {
            icon: <UsersIcon />,
            title: 'User Profile',
            description: 'Manage your expertise and settings.',
            cta: 'Edit Profile',
            to: '/profile'
        };

        const tasksFeature = {
            icon: <CheckBadgeIcon />,
            title: 'My Assignments',
            description: 'View and manage tasks assigned to you from strategic plans.',
            cta: 'View Tasks',
            to: '/dashboard/tasks',
        };

        // Student View (or Personal Workspace)
        if (currentRole === 'student' || !activeWorkspace || activeWorkspace.type === 'Personal') {
            return [
                {
                    icon: <ThesisIcon />,
                    title: 'Thesis Topic Generator',
                    description: 'Find a unique, high-impact topic for your thesis in minutes.',
                    cta: 'Start Generating',
                    to: '/dashboard/idea-generator'
                },
                {
                    icon: <RDPortalIcon />,
                    title: 'My Thesis Workspace',
                    description: 'Organize your research, track literature, and draft your proposal.',
                    cta: 'Open Workspace',
                    to: '/dashboard/pipeline'
                },
                profileFeature,
                {
                    icon: <ArthaIcon />,
                    title: 'Grant Opportunities',
                    description: 'Search for PhD funding and travel grants.',
                    cta: 'Explore Grants',
                    to: '/dashboard/grants',
                    badge: 'Pro'
                }
            ];
        }

        const baseFeatures = [commonFeatures[0], commonFeatures[1], pipelineFeature, profileFeature];

        if (currentRole === 'admin') {
            return [
                ...baseFeatures,
                {
                    icon: <TargetIcon />,
                    title: 'Department Strategy',
                    description: 'Draft and define the core problem statement for the R&D department.',
                    cta: 'Define Strategy',
                    to: '/dashboard/strategy',
                    badge: 'Admin'
                },
                {
                    icon: <ShieldCheckIcon />,
                    title: 'User Management',
                    description: 'Manage user roles, permissions, and access logs.',
                    cta: 'Manage Users',
                    to: '#',
                    badge: 'Admin'
                },
                {
                    icon: <AdjustmentsIcon />,
                    title: 'System Settings',
                    description: 'Configure integrations and global platform settings.',
                    cta: 'Configure',
                    to: '#',
                    badge: 'Admin'
                }
            ];
        }

        if (currentRole === 'team_lead') {
             return [
                ...baseFeatures,
                {
                    icon: <TargetIcon />,
                    title: 'Department Strategy',
                    description: 'Draft and define the core problem statement for the R&D department.',
                    cta: 'Define Strategy',
                    to: '/dashboard/strategy',
                    badge: 'Lead'
                },
                {
                    icon: <ChartBarIcon />,
                    title: 'Team Analytics',
                    description: 'View performance metrics and project throughput.',
                    cta: 'View Analytics',
                    to: '/dashboard/analytics',
                    badge: 'Lead'
                }
            ];
        }
        
        if (currentRole === 'supervisor') {
             return [
                ...baseFeatures,
                {
                    icon: <ClipboardListIcon />,
                    title: 'Review Queue',
                    description: 'Proposals and theses awaiting your approval.',
                    cta: 'Review (3 Pending)',
                    to: '#',
                    badge: 'Supervisor'
                }
            ];
        }

        // Researcher Role
        if (currentRole === 'researcher') {
            const features = [...baseFeatures];
            features.splice(2, 0, tasksFeature);
            return features;
        }

        return baseFeatures;
    };

    const features = getRoleBasedFeatures();

  return (
    <main className="py-12 bg-brand-light-gray-blue min-h-[calc(100vh-200px)]">
      <div className="container mx-auto px-6">
        <header className="mb-12 flex justify-between items-end">
            <div>
                <h1 className="text-4xl font-bold text-brand-dark-teal">
                    {activeWorkspace?.name || 'Dashboard'}
                </h1>
                <p className="mt-2 text-lg text-brand-dark-grey">
                    Welcome back, {user?.name}. 
                    <span className="ml-1 font-medium text-brand-medium-teal opacity-80">
                        Viewing as {currentRole.replace('_', ' ').replace(/^\w/, c => c.toUpperCase())}
                    </span>
                </p>
            </div>
            {currentRole === 'admin' && (
                 <span className="hidden md:inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-bold">System Administrator</span>
            )}
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {features.map(feature => (
                <DashboardCard key={feature.title} {...feature} />
            ))}
        </div>

        <div className="mt-16">
            <h2 className="text-3xl font-bold text-brand-dark-teal mb-6">Recent Activity</h2>
            {recentActivity.length > 0 ? (
                <div className="bg-brand-off-white p-4 sm:p-6 rounded-xl shadow-sm border border-brand-light-grey">
                    <ul className="divide-y divide-brand-light-grey">
                        {recentActivity.map((activity, index) => (
                            <RecentActivityItem key={index} activity={activity} />
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="bg-brand-off-white p-8 rounded-xl shadow-sm border border-brand-light-grey text-center">
                    <p className="text-brand-dark-grey">No recent activity to show. Start by generating ideas or exploring a project.</p>
                </div>
            )}
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
