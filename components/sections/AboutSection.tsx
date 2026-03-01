import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

export const AboutSection: React.FC = () => {
  const { content } = useLanguage();
  return (
    <section id="about" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">

        {/* Origin Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-lg text-purple-100"
          >
            <h2 className="text-4xl font-heebo font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-2 h-10 bg-purple-500 rounded-full" />
              {content.about.title}
            </h2>
            {content.about.story.map((para, idx) => (
              <p key={idx} className="leading-relaxed font-alef">{para}</p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-purple-600 to-cyan-400 rounded-2xl opacity-30 blur-xl" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-purple-500/20">
              <img
                src="images/8fdadf7a-a28c-451d-9fc3-57ae3c85a537.jpeg"
                alt="Community support"
                className="w-full h-auto transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-purple-900/30 mix-blend-multiply" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
