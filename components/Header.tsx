

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { type NavLink, UserRole } from '../types';
import { NAV_VARIANTS, NAV_LINKS as DEFAULT_NAV_LINKS } from '../constants';
import { ChevronDownIcon } from './icons';
import { useModal } from '../contexts/ModalContext';
import { useAuth } from '../contexts/AuthContext';
import WorkspaceSelector from './dashboard/WorkspaceSelector';

const DropdownMenu: React.FC<{ items: NavLink[]; closeDropdown: () => void }> = ({ items, closeDropdown }) => (
  <div className="absolute top-full left-0 mt-2 w-80 bg-brand-off-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20">
    <div className="py-2">
      {items.map((item) => (
        <Link
          key={item.label}
          to={item.href.startsWith('/#/') ? item.href.substring(2) : item.href}
          className="block px-4 py-3 text-sm text-gray-600 hover:bg-brand-light-grey group"
          onClick={closeDropdown}
        >
          <span className="block font-semibold text-brand-dark-grey group-hover:text-brand-medium-teal">{item.label}</span>
          {item.description && (
             <span className="block text-xs text-gray-600 mt-0.5">{item.description}</span>
          )}
        </Link>
      ))}
    </div>
  </div>
);

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [navLinks, setNavLinks] = useState<NavLink[]>(DEFAULT_NAV_LINKS);
  const navRef = useRef<HTMLElement>(null);
  const { openDemoModal } = useModal();
  const { isAuthenticated, logout, user, currentRole } = useAuth();
  const navigate = useNavigate();

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
    
    // A/B Testing Logic
    const searchParams = new URLSearchParams(window.location.search);
    const variantParam = searchParams.get('variant')?.toUpperCase();
    const savedVariant = sessionStorage.getItem('nav_variant');

    let variantToUse = 'B'; // Default to Hybrid Simplicity

    if (variantParam && ['A', 'B', 'C'].includes(variantParam)) {
        variantToUse = variantParam;
        sessionStorage.setItem('nav_variant', variantToUse);
    } else if (savedVariant && ['A', 'B', 'C'].includes(savedVariant)) {
        variantToUse = savedVariant;
    }

    setNavLinks(NAV_VARIANTS[variantToUse as keyof typeof NAV_VARIANTS]);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDemoClick = () => {
      setIsMobileMenuOpen(false);
      openDemoModal();
  }

  const handleLogout = () => {
      setIsMobileMenuOpen(false);
      logout();
  }

  return (
    <header className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-off-white/80 backdrop-blur-sm shadow-md' : 'bg-brand-off-white'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-brand-dark-teal font-heading">Aveksana</Link>
        
        <nav ref={navRef} className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <div key={link.label} className="relative">
              {link.subMenu ? (
                <button
                  onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                  className="text-brand-dark-grey hover:text-brand-medium-teal flex items-center font-medium"
                  aria-haspopup="true"
                  aria-expanded={openDropdown === link.label}
                >
                  {link.label}
                  <ChevronDownIcon />
                </button>
              ) : (
                <Link to={link.href.startsWith('/#/') ? link.href.substring(2) : link.href} className="text-brand-dark-grey hover:text-brand-medium-teal flex items-center font-medium">
                  {link.label}
                </Link>
              )}
              {link.subMenu && openDropdown === link.label && (
                <DropdownMenu items={link.subMenu} closeDropdown={() => setOpenDropdown(null)} />
              )}
            </div>
          ))}
        </nav>

        <div className="hidden lg:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              {currentRole === UserRole.ADMIN && (
                 <span className="text-xs font-bold bg-red-100 text-red-800 px-2 py-1 rounded-md">ADMIN</span>
              )}
              <WorkspaceSelector />
              <Link to="/dashboard" className="font-semibold text-brand-dark-grey hover:text-brand-medium-teal">Dashboard</Link>
              <Link to="/profile" className="font-semibold text-brand-dark-grey hover:text-brand-medium-teal">Profile</Link>
              <button onClick={handleLogout} className="text-brand-dark-grey hover:text-brand-medium-teal">Log Out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-brand-dark-grey hover:text-brand-medium-teal font-medium">Log In</Link>
              <button onClick={openDemoModal} className="bg-brand-medium-teal text-white font-semibold px-4 py-2 rounded-md hover:bg-brand-teal transition-colors">Book a Demo</button>
            </>
          )}
        </div>

        <div className="lg:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Open menu">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-brand-off-white shadow-lg h-screen overflow-y-auto">
          <nav className="px-6 pt-2 pb-20 space-y-2">
            <div className="flex justify-between items-center mb-6 mt-4">
                <span className="font-bold text-xl text-brand-dark-teal">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-brand-grey text-3xl">&times;</button>
            </div>
            {navLinks.map((link) => (
              <div key={link.label}>
                {link.subMenu ? (
                    <>
                        <div className="text-brand-dark-teal font-bold py-2 text-lg">{link.label}</div>
                        <div className="pl-4 border-l-2 border-brand-light-grey ml-1 my-2 space-y-3">
                            {link.subMenu.map(subLink => (
                            <Link key={subLink.label} to={subLink.href.startsWith('/#/') ? subLink.href.substring(2) : subLink.href} onClick={() => setIsMobileMenuOpen(false)} className="block group">
                                <span className="block text-brand-dark-grey font-medium group-hover:text-brand-medium-teal">{subLink.label}</span>
                                <span className="block text-xs text-gray-600 mt-0.5">{subLink.description}</span>
                            </Link>
                            ))}
                        </div>
                    </>
                ) : (
                    <Link to={link.href.startsWith('/#/') ? link.href.substring(2) : link.href} onClick={() => setIsMobileMenuOpen(false)} className="block text-brand-dark-teal font-bold py-2 text-lg">
                        {link.label}
                    </Link>
                )}
              </div>
            ))}
            {isAuthenticated ? (
              <>
                <div className="border-t border-brand-light-grey my-4 pt-4">
                    <p className="text-sm text-brand-grey px-0 mb-2">Signed in as {currentRole}</p>
                </div>
                <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="block text-brand-dark-grey hover:text-brand-medium-teal py-2 font-medium">Dashboard</Link>
                <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="block text-brand-dark-grey hover:text-brand-medium-teal py-2 font-medium">Profile</Link>
                <button onClick={handleLogout} className="block w-full text-left text-brand-dark-grey hover:text-brand-medium-teal py-2 font-medium">Log Out</button>
              </>
            ) : (
              <div className="border-t border-brand-light-grey my-4 pt-4">
                 <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block text-brand-dark-grey hover:text-brand-medium-teal py-2 font-medium mb-4">Log In</Link>
                 <button onClick={handleDemoClick} className="block w-full text-center bg-brand-medium-teal text-white font-semibold px-4 py-3 rounded-md hover:bg-brand-teal transition-colors">Book a Demo</button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;