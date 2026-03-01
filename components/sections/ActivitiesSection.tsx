import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { MessageCircle, Heart, Users, FileText } from 'lucide-react';

const icons = [
  <MessageCircle className="w-8 h-8 text-white" key="1" />,
  <Heart className="w-8 h-8 text-white" key="2" />,
  <Users className="w-8 h-8 text-white" key="3" />,
  <FileText className="w-8 h-8 text-white" key="4" />
];

// Counter component with animation
const CountUp: React.FC<{ value: string }> = ({ value }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Parse the number and suffix from value (e.g., "2,500+" -> number: 2500, suffix: "+")
  const cleanNumber = parseInt(value.replace(/[^0-9]/g, ''));
  const suffix = value.match(/[^0-9,]/g)?.join('') || '';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const duration = 2000; // 2 seconds

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Ease out function for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * cleanNumber));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, cleanNumber]);

  // Format number with commas
  const formattedCount = count.toLocaleString('en-US');

  return (
    <div ref={ref}>
      {formattedCount}{suffix}
    </div>
  );
};

export const ActivitiesSection: React.FC = () => {
  const { content } = useLanguage();
  return (
    <section id="activities" className="py-16 md:py-24 relative bg-[#1a0b2e] overflow-hidden">
      {/* Decoration */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-purple-600/20 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-800/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">

        <div className="mb-20 text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">{content.activities.title}</h2>
          <p className="text-xl text-purple-200 leading-relaxed">{content.activities.subtitle}</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {content.activities.services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="h-full relative group">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-purple-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Card Content */}
                <div className="relative h-full bg-[#241242] border border-purple-500/30 rounded-2xl p-8 flex flex-col items-center text-center hover:border-purple-400/60 transition-colors duration-300 shadow-xl">

                  {/* Icon Circle */}
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#a855f7] to-[#7c3aed] flex items-center justify-center mb-8 shadow-lg shadow-purple-900/50 group-hover:scale-110 transition-transform duration-300 ring-4 ring-purple-900/50">
                    {icons[index % icons.length]}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-purple-200/80 leading-relaxed text-sm md:text-base font-alef">
                    {service.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-[#241242] to-[#1a0b2e] rounded-3xl p-12 border border-purple-500/20 backdrop-blur-md shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-purple-600/5 mix-blend-overlay pointer-events-none" />

          <h3 className="text-2xl font-bold text-center text-white mb-12 opacity-80 relative z-10">{content.activities.statsTitle}</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {content.activities.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-purple-300 mb-2 group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">
                  <CountUp value={stat.value} />
                </div>
                <div className="text-lg font-bold text-white mb-1">{stat.label}</div>
                <div className="text-purple-400 text-sm font-medium">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

