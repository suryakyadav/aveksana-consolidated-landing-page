import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import type { NavLink } from '../types';
import { NAV_LINKS } from '../constants';
import { ChevronDownIcon } from './icons';

const DropdownMenu: React.FC<{ items: NavLink[]; closeDropdown: () => void }> = ({ items, closeDropdown }) => (
  <div className="absolute top-full left-0 mt-2 w-56 bg-brand-off-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20">
    <div className="py-1">
      {items.map((item) => (
        <Link
          key={item.label}
          to={item.href.startsWith('/#/') ? item.href.substring(2) : item.href}
          className="block px-4 py-2 text-sm text-brand-dark-grey hover:bg-brand-light-grey"
          onClick={closeDropdown}
        >
          {item.label}
        </Link>
      ))}
    </div>
  </div>
);

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-off-white/80 backdrop-blur-sm shadow-md' : 'bg-brand-off-white'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-brand-dark-teal font-heading">Aveksana</Link>
        
        <nav ref={navRef} className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
            <div key={link.label} className="relative">
              {link.subMenu ? (
                <button
                  onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                  className="text-brand-dark-grey hover:text-brand-medium-teal flex items-center"
                  aria-haspopup="true"
                  aria-expanded={openDropdown === link.label}
                >
                  {link.label}
                  <ChevronDownIcon />
                </button>
              ) : (
                <a href={link.href} className="text-brand-dark-grey hover:text-brand-medium-teal flex items-center">
                  {link.label}
                </a>
              )}
              {link.subMenu && openDropdown === link.label && (
                <DropdownMenu items={link.subMenu} closeDropdown={() => setOpenDropdown(null)} />
              )}
            </div>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className="text-brand-dark-grey hover:text-brand-medium-teal">Log In</Link>
          <a href="/#demo" className="bg-brand-medium-teal text-white font-semibold px-4 py-2 rounded-md hover:bg-brand-teal transition-colors">Book a Demo</a>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Open menu">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-brand-off-white shadow-lg">
          <nav className="px-6 pt-2 pb-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <div key={link.label}>
                <a href={link.href} className="block text-brand-dark-grey hover:text-brand-medium-teal py-2">{link.label}</a>
                {link.subMenu && (
                  <div className="pl-4">
                    {link.subMenu.map(subLink => (
                       <Link key={subLink.label} to={subLink.href.substring(2)} className="block text-brand-grey hover:text-brand-medium-teal py-1">{subLink.label}</Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link to="/" className="block text-brand-dark-grey hover:text-brand-medium-teal py-2">Log In</Link>
          </nav>
          <div className="px-6 pb-4">
            <a href="/#demo" className="block w-full text-center bg-brand-medium-teal text-white font-semibold px-4 py-2 rounded-md hover:bg-brand-teal transition-colors">Book a Demo</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;