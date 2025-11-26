
import React from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../contexts/ModalContext';

const Footer = () => {
  const { openDemoModal } = useModal();

  const footerLinkData = [
    {
      title: 'Products',
      links: [
        { label: 'Thesis Support System', href: '/products/thesis-support-system', type: 'internal' },
        { label: 'Artha Grant Writer', href: '/products/artha-ai-grant-writer', type: 'internal' },
        { label: 'R&D Portal', href: '/products/rd-portal', type: 'internal' },
        { label: 'Free Tools', href: '/#free-tool', type: 'internal' },
        { label: 'Integrations', href: '/integrations', type: 'internal' },
      ],
    },
    {
      title: 'Solutions',
      links: [
        { label: 'For Students & Researchers', href: '/solutions/for-students', type: 'internal' },
        { label: 'For Supervisors & Faculty', href: '/solutions/for-supervisors', type: 'internal' },
        { label: 'For Universities', href: '/solutions/for-universities', type: 'internal' },
        { label: 'For Corporate R&D', href: '/solutions/for-corporations', type: 'internal' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Blog', href: 'https://aveksana.com/blog', type: 'anchor' },
        { label: 'Case Studies', href: '/resources', type: 'internal' }, // Redirect to resources hub
        { label: 'Documentation', href: '/resources/documentation', type: 'internal' },
        { label: 'Help Center', href: '/resources/documentation', type: 'internal' }, // Redirect to docs
        { label: 'API Reference', href: '/resources/documentation#api-reference', type: 'internal' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about', type: 'internal' },
        { label: 'Careers', href: '/careers', type: 'internal' },
        { label: 'Contact', action: openDemoModal, type: 'button' }, // Triggers modal
        { label: 'Press Kit', href: '/press', type: 'internal' },
        { label: 'Security & Compliance', href: '/resources/documentation#security', type: 'internal' },
        { label: 'Status Page', href: '/status', type: 'internal' },
      ],
    },
  ];
  
  return (
    <footer className="bg-brand-dark-teal text-white">
      <div className="container mx-auto px-6 py-16">
        {/* Top Value Statement */}
        <div className="mb-12 border-b border-brand-teal pb-8">
            <h2 className="text-xl md:text-2xl font-bold text-white">Aveksana — the unified platform for theses, grants, and R&D innovation.</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerLinkData.map(({ title, links }) => (
            <div key={title}>
              <h4 className="font-semibold uppercase tracking-wider text-gray-400 text-sm mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    {link.type === 'button' ? (
                       <button 
                          onClick={link.action}
                          className="text-gray-300 hover:text-white transition-colors text-sm text-left"
                       >
                          {link.label}
                       </button>
                    ) : link.type === 'internal' ? (
                      <Link to={link.href!} className="text-gray-300 hover:text-white transition-colors text-sm">
                        {link.label}
                      </Link>
                    ) : (
                      <a 
                        href={link.href} 
                        className="text-gray-300 hover:text-white transition-colors text-sm"
                        target={link.href!.startsWith('http') ? '_blank' : undefined}
                        rel={link.href!.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-brand-teal flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
             <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Aveksana. All rights reserved.</p>
             <div className="flex gap-4 text-sm">
                <Link to="/legal" className="text-gray-400 hover:text-white">Privacy Policy</Link>
                <Link to="/legal" className="text-gray-400 hover:text-white">Terms of Service</Link>
                <Link to="/legal" className="text-gray-400 hover:text-white">Cookies Policy</Link>
                <Link to="/legal" className="text-gray-400 hover:text-white">Accessibility</Link>
             </div>
          </div>
          
          <div className="text-sm text-gray-400 flex items-center gap-2">
             <span className="w-2 h-2 bg-green-400 rounded-full"></span>
             <span>Enterprise-grade security & data protection.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
