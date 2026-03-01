import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './ui/Button';
import { Logo } from './ui/Logo';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { content, toggleLanguage, language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '');
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(id);
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-2 glass-effect shadow-[0_4px_20px_rgba(124,58,237,0.3)]' : 'py-4 bg-gradient-to-b from-purple-950/90 to-transparent'}`}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Logo />

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {content.header.nav.map((item) => (
            item.isButton ? (
              <Button key={item.label} variant="primary" onClick={() => handleNavClick(item.href)} className="py-3 px-8 text-lg font-bold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all hover:scale-105">
                {item.label} <Heart size={20} className="fill-current" />
              </Button>
            ) : (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="text-purple-100 hover:text-white font-medium transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 transition-all duration-300 group-hover:w-full" />
              </button>
            )
          ))}
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Small Language Toggle - Immediately Visible */}
          <button
            onClick={toggleLanguage}
            className="text-white text-sm font-bold px-3 py-1.5 rounded-lg bg-purple-700/50 hover:bg-purple-600/60 transition-colors border border-purple-500/30"
          >
            {language === 'he' ? 'EN' : 'עב'}
          </button>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white p-2">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-purple-950 border-t border-purple-800 p-6 flex flex-col gap-4 lg:hidden shadow-2xl">
            {content.header.nav.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className={`text-start px-4 py-3 rounded-lg font-medium ${item.isButton ? 'bg-purple-600 text-white' : 'text-purple-100 hover:bg-purple-900'}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
