import React from 'react';
import { DocumentIcon, LightbulbIcon, UsersIcon } from './icons';

const resources = [
  {
    icon: <LightbulbIcon />,
    title: 'Our Blog',
    description: 'Explore the latest trends in research, AI in academia, and funding strategies.',
    linkText: 'Read the blog',
  },
  {
    icon: <UsersIcon />,
    title: 'Case Studies',
    description: 'See how universities and corporations leverage Aveksana to drive innovation.',
    linkText: 'View case studies',
  },
  {
    icon: <DocumentIcon />,
    title: 'Documentation',
    description: 'Get detailed guides and API references for integrating with our platform.',
    linkText: 'Browse docs',
  },
];

const ResourceCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  linkText: string;
}> = ({ icon, title, description, linkText }) => (
    <a href="#" className="group block p-8 bg-brand-off-white rounded-xl shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-brand-light-grey h-full">
        <div className="mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-brand-dark-teal">{title}</h3>
        <p className="mt-2 text-brand-dark-grey">{description}</p>
        <div className="mt-4 font-semibold text-brand-medium-teal group-hover:underline">
            {linkText} &rarr;
        </div>
    </a>
);


const Resources = () => {
  return (
    <section id="resources" className="py-20 bg-brand-off-white scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark-teal">Explore Our Resources</h2>
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
