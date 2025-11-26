
import React from 'react';
import { Link } from 'react-router-dom';
import { DocumentIcon, LightbulbIcon, UsersIcon } from './icons';

const resources = [
  {
    icon: <LightbulbIcon />,
    title: 'Our Blog',
    description: 'Practical insights on research, AI in academia, and funding strategies.',
    linkText: 'Read the blog',
    href: 'https://aveksana.com/blog',
    type: 'anchor'
  },
  {
    icon: <UsersIcon />,
    title: 'Case Studies',
    description: 'How universities and corporations accelerate innovation using Aveksana.',
    linkText: 'View case studies',
    href: '#',
    type: 'anchor'
  },
  {
    icon: <DocumentIcon />,
    title: 'Documentation',
    description: 'Technical guides and API docs for deeper integrations.',
    linkText: 'Browse docs',
    href: '/resources/documentation',
    type: 'internal'
  },
];

const ResourceCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  linkText: string;
  href: string;
  type: string;
}> = ({ icon, title, description, linkText, href, type }) => {
    const cardContent = (
        <div className="group block p-8 bg-brand-off-white rounded-xl shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-brand-light-grey h-full cursor-pointer">
            <div className="mb-4">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-brand-dark-teal">{title}</h3>
            <p className="mt-2 text-brand-dark-grey">{description}</p>
            <div className="mt-4 font-semibold text-brand-medium-teal group-hover:underline">
                {linkText} &rarr;
            </div>
        </div>
    );

    if (type === 'internal') {
        return <Link to={href} className="block h-full">{cardContent}</Link>;
    }

    const isExternal = href.startsWith('http');

    return (
        <a 
            href={href} 
            className="block h-full"
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
        >
            {cardContent}
        </a>
    );
};


const Resources = () => {
  return (
    <section id="resources" className="py-20 bg-brand-off-white scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark-teal">Learn, explore, and build with Aveksana</h2>
          <p className="mt-4 text-lg text-brand-dark-grey max-w-2xl mx-auto">
            Dive deeper into the world of research innovation with our articles, success stories, and technical guides.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource) => (
                <ResourceCard key={resource.title} {...resource} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;