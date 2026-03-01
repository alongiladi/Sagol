import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useMarkerAnimation } from '../../hooks/useMarkerAnimation';
import { Button } from '../ui/Button';


gsap.registerPlugin(ScrollTrigger);

const USAFlag = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 160 110" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="160" height="110" fill="#b22234" />
    <rect y="17" width="160" height="8" fill="white" />
    <rect y="34" width="160" height="8" fill="white" />
    <rect y="51" width="160" height="8" fill="white" />
    <rect y="68" width="160" height="8" fill="white" />
    <rect y="85" width="160" height="8" fill="white" />
    <rect y="102" width="160" height="8" fill="white" />
    <rect width="65" height="60" fill="#3c3b6e" />
    <g fill="white">
      <circle cx="15" cy="15" r="2.5" />
      <circle cx="32" cy="15" r="2.5" />
      <circle cx="49" cy="15" r="2.5" />
      <circle cx="15" cy="30" r="2.5" />
      <circle cx="32" cy="30" r="2.5" />
      <circle cx="49" cy="30" r="2.5" />
      <circle cx="15" cy="45" r="2.5" />
      <circle cx="32" cy="45" r="2.5" />
      <circle cx="49" cy="45" r="2.5" />
    </g>
  </svg>
);

const IsraelFlag = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 22 16" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="22" height="16" fill="white" />
    <rect y="2" width="22" height="2" fill="#0038b8" />
    <rect y="12" width="22" height="2" fill="#0038b8" />
    <g transform="translate(11, 8)" fill="none" stroke="#0038b8" strokeWidth="0.5">
      <polygon points="0,-3 -2.5,1.5 2.5,1.5" />
      <polygon points="0,3 -2.5,-1.5 2.5,-1.5" />
    </g>
  </svg>
);



export const DonateSection: React.FC = () => {
  const { content, language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useMarkerAnimation(containerRef, '.donate-marker');

  return (
    <section id="donate" className="py-16 md:py-24 relative overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0 bg-purple-900/20 skew-y-3 transform origin-top-right scale-110 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="relative inline-block">
            <h2 className="text-4xl font-bold text-white mb-4 relative z-10 px-4">
              <span className="marker marker--purple donate-marker leading-relaxed">{content.donate.title}</span>
            </h2>
          </div>
          <h3 className="text-2xl text-purple-300 mb-6">{content.donate.heading}</h3>
          <p className="text-purple-100 leading-relaxed">{content.donate.text}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 justify-center mb-12 max-w-5xl mx-auto">
          {content.donate.options.map((option, index) => {
            // Cast to any to access the new 'type' property without strict TS checking for now
            const type = (option as any).type;
            const isIsrael = type === 'israel';
            const isUSA = type === 'usa';

            // Dynamic styles based on location
            const gradientClass = isIsrael
              ? "from-blue-600 to-blue-800" // Israel Theme
              : isUSA
                ? "from-indigo-600 to-rose-600" // USA Theme (Blue to Red gradient)
                : "from-purple-600 to-purple-800"; // Default

            const Icon = isIsrael ? IsraelFlag : USAFlag;

            return (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="h-full w-full max-w-md flex-1"
              >
                <div className={`h-full relative overflow-hidden rounded-2xl border ${isIsrael ? 'border-blue-400/50' : 'border-purple-400/50'} shadow-lg shadow-purple-900/50 hover:shadow-purple-600/40 transition-shadow duration-300 group`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} animate-pulse-slow`} />
                  <div className={`absolute inset-0 ${isIsrael ? 'bg-blue-600/20' : 'bg-purple-600/20'} blur-xl animate-pulse-slow`} />

                  <div className="relative z-10 flex flex-col items-center text-center p-8 w-full h-full">
                    <div className="w-20 h-20 mx-auto rounded-full bg-white/10 flex items-center justify-center text-white mb-6 ring-1 ring-white/30 backdrop-blur-sm">
                      <Icon className="w-10 h-10" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">{option.title}</h4>
                    <p className="text-purple-100 mb-8 font-medium">{option.desc}</p>
                    <Button
                      variant="secondary"
                      className={`w-full mt-auto bg-white text-purple-700 hover:bg-purple-50 hover:text-purple-800 border-none shadow-lg`}
                      onClick={() => {
                        navigate('/payment', { state: { type: isIsrael ? 'israel' : 'usa' } });
                      }}
                    >
                      {content.donate.button}
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
