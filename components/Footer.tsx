import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const footerLinkData = [
  {
    title: 'Products',
    links: [
      { label: 'Thesis Support System', href: '/products/thesis-support-system', type: 'internal' },
      { label: 'Artha', href: '/products/artha-ai-grant-writer', type: 'internal' },
      { label: 'R&D Portal', href: '/products/rd-portal', type: 'internal' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'For Universities', href: '/solutions/for-universities', type: 'internal' },
      { label: 'For Corporations', href: '/solutions/for-corporations', type: 'internal' },
      { label: 'For Individuals', href: '/solutions/for-individuals', type: 'internal' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '#', type: 'anchor' },
      { label: 'Case Studies', href: '#', type: 'anchor' },
      { label: 'Documentation', href: '#', type: 'anchor' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#', type: 'anchor' },
      { label: 'Careers', href: '#', type: 'anchor' },
      { label: 'Contact', href: '#', type: 'anchor' },
    ],
  },
   {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#', type: 'anchor' },
      { label: 'Terms of Service', href: '#', type: 'anchor' },
    ],
  },
];


const Footer = () => {
  const location = useLocation();
  const isUniversityPage = location.pathname.includes('for-universities');
  const isCorporatePage = location.pathname.includes('for-corporations');

  const MicroCTA = () => {
    if (isUniversityPage) {
      return (
        <p className="text-gray-300">
          Are you an individual researcher? <Link to="/solutions/for-individuals" className="font-semibold text-white hover:underline">Start for Free &rarr;</Link>
        </p>
      );
    }
     if (isCorporatePage) {
      return (
        <p className="text-gray-300">
          Academic partner? <Link to="/solutions/for-universities" className="font-semibold text-white hover:underline">Explore University Solutions &rarr;</Link>
        </p>
      );
    }
    return (
      <p className="text-gray-300">
        Are you part of a university? <Link to="/solutions/for-universities" className="font-semibold text-white hover:underline">Book a Demo for institutional access &rarr;</Link>
      </p>
    );
  };

  return (
    <footer className="bg-brand-dark-teal text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {footerLinkData.map(({ title, links }) => (
            <div key={title}>
              <h4 className="font-semibold uppercase tracking-wider text-gray-400 text-sm">{title}</h4>
              <ul className="mt-4 space-y-2">
                {links.map(link => (
                  <li key={link.label}>
                    {link.type === 'internal' ? (
                      <Link to={link.href} className="text-gray-300 hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href} className="text-gray-300 hover:text-white transition-colors">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-brand-teal flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-gray-400 order-2 md:order-1 mt-4 md:mt-0">&copy; {new Date().getFullYear()} Aveksana. All rights reserved.</p>
          <div className="order-1 md:order-2">
            <MicroCTA />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;