import React from 'react';
import { Card } from '../ui/Card';
import { useLanguage } from '../../context/LanguageContext';

export const PartnersSection: React.FC = () => {
  const { content } = useLanguage();

  return (
    <section className="py-16 bg-purple-950">
      <div className="container mx-auto px-4 md:px-6">
        <h3 className="text-2xl font-bold text-center text-white mb-12 opacity-70">{content.partners.title}</h3>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 transition-all duration-500">
          {/* Partners */}
          {content.partners.logos.map((logo, index) => (
            <Card key={index} className="w-64 h-40 flex items-center justify-center bg-white rounded-3xl border-4 border-purple-200/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:scale-105 transition-all duration-300 overflow-hidden group">
              <img
                src={logo.src}
                alt={logo.alt}
                className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
              />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};