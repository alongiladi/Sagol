import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { Handshake, Accessibility, Heart, Star } from 'lucide-react';

const icons: Record<string, React.ReactNode> = {
  handshake: <Handshake className="w-8 h-8 text-white" />,
  accessibility: <Accessibility className="w-8 h-8 text-white" />,
  heart: <Heart className="w-8 h-8 text-white" />,
  star: <Star className="w-8 h-8 text-white" />
};

export const WhoWeAreSection: React.FC = () => {
  const { content } = useLanguage();
  return (
    <section id="who-we-are" className="py-16 md:py-24 bg-[#1a0b2e] relative overflow-hidden">
      {/* Background glow to enhance depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">

        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">{content.whoWeAre.title}</h2>
          <h3 className="text-xl text-purple-200 mb-8 font-medium tracking-wide opacity-90">{content.whoWeAre.subtitle}</h3>
          <div className="space-y-4 text-purple-100/80 leading-relaxed text-lg font-alef">
            {content.whoWeAre.description.map((desc, i) => (
              <p key={i}>{desc}</p>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 mt-8 md:mt-16">
          {/* Manager 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group flex flex-col items-center"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-[2rem] blur opacity-25 group-hover:opacity-75 transition duration-500" />
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-[2rem] overflow-hidden border-2 border-purple-500/20 shadow-2xl bg-purple-900/20">
                <img
                  src="/images/שירלי פינטו.jpg"
                  alt="שירלי פינטו קדוש"
                  className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="text-center mt-6">
              <span className="block text-white font-bold text-xl leading-tight">{content.whoWeAre.team[0].name}</span>
              <span className="block text-purple-200 text-base mt-2 font-medium">{content.whoWeAre.team[0].role}</span>
            </div>
          </motion.div>

          {/* Manager 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group flex flex-col items-center"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-[2rem] blur opacity-25 group-hover:opacity-75 transition duration-500" />
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-[2rem] overflow-hidden border-2 border-purple-500/20 shadow-2xl bg-purple-900/20">
                <img
                  src="/images/IMG_3741.JPG"
                  alt="Manager 2"
                  className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="text-center mt-6">
              <span className="block text-white font-bold text-xl leading-tight">{content.whoWeAre.team[1].name}</span>
              <span className="block text-purple-200 text-base mt-2 font-medium">{content.whoWeAre.team[1].role}</span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

