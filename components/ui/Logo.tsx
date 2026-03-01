import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

interface LogoProps {
  className?: string;
  disableLink?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', disableLink = false }) => {
  const { language } = useLanguage();

  const Content = () => (
    <div className={`flex items-center gap-2 md:gap-3 group select-none ${className}`}>
      {/* Icon Container */}
      <div className="relative w-11 h-11 md:w-14 md:h-14 shrink-0">
        {/* Glow Behind */}
        <div className="absolute inset-0 bg-cyan-500 rounded-xl blur-xl opacity-20 group-hover:opacity-50 transition-opacity duration-500" />

        {/* Main Icon Shape */}
        <div className="relative w-full h-full bg-gradient-to-br from-purple-800 to-purple-950 rounded-xl -rotate-6 group-hover:rotate-0 transition-all duration-500 border border-purple-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.3)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] overflow-hidden">
          {/* Inner Gloss */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Star of David SVG */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 md:w-8 md:h-8 text-purple-100 group-hover:text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transform group-hover:scale-110 transition-all duration-500"
          >
            {/* Triangle pointing up */}
            <path d="M12 3 L20.66 18 H3.34 L12 3 Z" className="group-hover:stroke-cyan-300 transition-colors duration-500" />
            {/* Triangle pointing down */}
            <path d="M12 21 L3.34 6 H20.66 L12 21 Z" className="group-hover:stroke-purple-300 transition-colors duration-500" />
          </svg>

          {/* Pulse Overlay (EKG) - Subtle medical hint */}
          <div className="absolute inset-0 flex items-center justify-center opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full text-cyan-400 p-1">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Notification Dot */}
        <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 md:w-4 md:h-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full border-2 border-purple-950 shadow-lg z-10 animate-pulse" />
      </div>

      {/* Text Content */}
      <div className="flex flex-col justify-center">
        <div className={`flex items-baseline ${language === 'he' ? 'gap-2' : 'gap-1'} leading-none whitespace-nowrap`}>
          {language === 'he' ? (
            <>
              <span className="text-lg md:text-2xl lg:text-3xl font-black font-heebo tracking-tight text-white drop-shadow-md group-hover:text-purple-100 transition-colors duration-300">
                החמ״ל
              </span>
              <span className="text-lg md:text-2xl lg:text-3xl font-black font-heebo tracking-tight text-transparent bg-clip-text bg-gradient-to-l from-purple-400 to-cyan-400 group-hover:to-cyan-300 transition-all duration-300 drop-shadow-sm filter brightness-110">
                הסגול
              </span>
            </>
          ) : (
            <>
              <span className="text-base md:text-xl lg:text-2xl xl:text-3xl font-black font-heebo tracking-tight text-white drop-shadow-md group-hover:text-purple-100 transition-colors duration-300">
                The Purple
              </span>
              <span className="text-base md:text-xl lg:text-2xl xl:text-3xl font-black font-heebo tracking-tight text-transparent bg-clip-text bg-gradient-to-l from-purple-400 to-cyan-400 group-hover:to-cyan-300 transition-all duration-300 drop-shadow-sm filter brightness-110">
                Homefront
              </span>
            </>
          )}
        </div>
        {language === 'he' ? (
          <>
            <span className="text-[0.65rem] md:text-[0.75rem] font-bold tracking-[0.2em] text-cyan-200/80 uppercase leading-tight group-hover:text-cyan-100 transition-colors duration-300 mr-0.5">
              מוקד סיוע לאומי
            </span>
            <span className="text-[0.65rem] md:text-[0.75rem] font-bold tracking-[0.2em] text-cyan-200/80 uppercase leading-tight group-hover:text-cyan-100 transition-colors duration-300 mr-0.5">
              לאנשים עם מוגבלות
            </span>
          </>
        ) : (
          <>
            <span className="text-[0.55rem] md:text-[0.65rem] lg:text-[0.75rem] font-bold tracking-[0.05em] md:tracking-[0.1em] text-cyan-200/80 leading-tight group-hover:text-cyan-100 transition-colors duration-300">
              National Assistance Center
            </span>
            <span className="text-[0.55rem] md:text-[0.65rem] lg:text-[0.75rem] font-bold tracking-[0.05em] md:tracking-[0.1em] text-cyan-200/80 leading-tight group-hover:text-cyan-100 transition-colors duration-300">
              For People With Disabilities
            </span>
          </>
        )}
      </div>
    </div>
  );

  if (disableLink) return <Content />;

  return (
    <Link to="/" className="block focus:outline-none">
      <Content />
    </Link>
  );
};