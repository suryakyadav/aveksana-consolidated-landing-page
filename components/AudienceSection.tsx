
import React from 'react';
import { Link } from 'react-router-dom';
import { UsersIcon, RDPortalIcon, LightbulbIcon, TargetIcon } from './icons';

const audiences = [
    {
        title: 'Students & Researchers',
        description: 'Get structured thesis support, writing guidance, and AI-assisted research workflows.',
        icon: <LightbulbIcon />,
        link: '/solutions/for-students'
    },
    {
        title: 'Supervisors & Faculty',
        description: 'Oversee multiple students with ease using progress tracking and integrity tools.',
        icon: <UsersIcon />,
        link: '/solutions/for-supervisors'
    },
    {
        title: 'Universities',
        description: 'Strengthen research governance, supervision quality, and institutional compliance.',
        icon: <TargetIcon />, // Using TargetIcon as proxy for Governance/Oversight
        link: '/solutions/for-universities'
    },
    {
        title: 'Corporate R&D',
        description: 'Centralize innovation workflows, knowledge sharing, and grant proposal development.',
        icon: <RDPortalIcon />,
        link: '/solutions/for-corporations'
    }
];

const AudienceSection = () => {
    return (
        <section className="py-16 bg-white border-b border-brand-light-grey">
            <div className="container mx-auto px-6">
                <div className="text-center mb-10">
                    <h3 className="text-sm font-bold text-brand-grey uppercase tracking-wider">Built for every part of the research ecosystem</h3>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {audiences.map((item) => (
                        <Link key={item.title} to={item.link} className="group block p-6 rounded-xl border border-brand-light-grey hover:border-brand-medium-teal hover:shadow-md transition-all">
                            <div className="mb-4 text-brand-medium-teal transform group-hover:scale-110 transition-transform">
                                {React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, { className: "h-8 w-8" })}
                            </div>
                            <h4 className="text-lg font-bold text-brand-dark-teal group-hover:text-brand-medium-teal transition-colors">{item.title}</h4>
                            <p className="mt-2 text-sm text-brand-dark-grey leading-relaxed">{item.description}</p>
                            <div className="mt-4 text-sm font-semibold text-brand-medium-teal group-hover:underline">
                                Learn More &rarr;
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AudienceSection;