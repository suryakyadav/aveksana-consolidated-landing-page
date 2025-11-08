import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThesisIcon, ArthaIcon, RDPortalIcon, UsersIcon } from './icons';

const DashboardCard: React.FC<{icon: React.ReactNode, title: string, description: string, cta: string, to: string}> = ({ icon, title, description, cta, to }) => (
    <Link to={to} className="group block p-8 bg-brand-off-white rounded-xl shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-brand-light-grey h-full">
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

const DashboardPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const features = [
        {
            icon: <ThesisIcon />,
            title: 'Unique Idea Formulator',
            description: 'Produce novel research ideas with high research gap scores and curated literature.',
            cta: 'Generate Ideas',
            to: '/dashboard/idea-generator'
        },
        {
            icon: <ArthaIcon />,
            title: 'Artha Grant Management',
            description: 'Track funding, manage proposals, and contextualize with your own research data.',
            cta: 'View Grants',
            to: '/dashboard/grants'
        },
        {
            icon: <RDPortalIcon />,
            title: 'R&D Project Pipeline',
            description: 'Visualize your innovation pipeline, from initial ideation to funded projects.',
            cta: 'Go to Portal',
            to: '/dashboard/pipeline'
        },
         {
            icon: <UsersIcon />,
            title: 'User Profile & Expertise',
            description: 'Manage your profile, organization, and areas of expertise to personalize AI results.',
            cta: 'Edit Profile',
            to: '/profile'
        },
    ];

  return (
    <main className="py-12 bg-brand-light-gray-blue min-h-[calc(100vh-200px)]">
      <div className="container mx-auto px-6">
        <header className="mb-12">
            <h1 className="text-4xl font-bold text-brand-dark-teal">Corporate R&D Dashboard</h1>
            <p className="mt-2 text-lg text-brand-dark-grey">Welcome back! Here's an overview of your innovation ecosystem.</p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {features.map(feature => (
                <DashboardCard key={feature.title} {...feature} />
            ))}
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;