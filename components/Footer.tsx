import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Heart, Mail } from 'lucide-react';
import { Logo } from './ui/Logo';

export const Footer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { content } = useLanguage();

  const handleNavClick = (href: string) => {
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
    <footer className="bg-purple-950 pt-20 pb-10 border-t border-purple-800 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div>
            <div className="mb-6">
              <Logo disableLink />
            </div>
            <p className="text-purple-200 leading-relaxed mb-6">
              {content.footer.brandDescription}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">{content.footer.quickLinks}</h4>
            <ul className="space-y-3">
              {content.header.nav.filter(i => !i.isButton).map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="text-purple-300 hover:text-cyan-400 transition-colors flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => navigate('/terms')}
                  className="text-purple-300 hover:text-cyan-400 transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                  {content.footer.terms}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">{content.footer.contact}</h4>
            <ul className="space-y-4">

              <li className="flex items-center gap-3 text-purple-200">
                <Mail className="w-5 h-5 text-purple-400" />
                <span>{content.contact.details.email}</span>
              </li>

            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">{content.footer.hours}</h4>
            <ul className="space-y-2 text-purple-200 text-sm">
              <li className="flex justify-between">
                <span>{content.footer.days}</span>
                <span>09:00 - 15:00</span>
              </li>

            </ul>
          </div>
        </div>

        <div className="border-t border-purple-900 pt-8 text-center text-purple-400 flex flex-col md:flex-row items-center justify-center gap-2">
          <p>{content.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};
