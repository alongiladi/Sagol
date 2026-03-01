import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Heart, AlertCircle } from 'lucide-react';

export const FloatingActions: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { content, language } = useLanguage();
    const isRTL = language === 'he';

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 500);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isRTL ? -50 : 50 }}
                    transition={{ duration: 0.3 }}
                    className={`fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4`}
                >
                    {/* Emergency Button - Redirects to Contact */}
                    <Link to="/contact" className="group relative">
                        <div className="absolute inset-0 bg-red-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 animate-pulse transition-opacity" />
                        <div className="relative bg-gradient-to-r from-red-600 to-red-500 text-white p-4 rounded-full shadow-xl border border-red-400/30 flex items-center gap-3 transition-transform group-hover:scale-110">
                            <AlertCircle className="w-6 h-6" />
                            <span className={`font-bold whitespace-nowrap hidden group-hover:block absolute right-full mr-4 bg-gray-900 text-white px-4 py-2 rounded-lg text-lg`}>{content.hero.cta}</span>
                        </div>
                    </Link>

                    {/* Volunteer Button */}
                    <Link to="/volunteer" className="group relative">
                        <div className="absolute inset-0 bg-purple-500 rounded-full blur-lg opacity-30 group-hover:opacity-60 transition-opacity" />
                        <div className="relative bg-gradient-to-r from-purple-600 to-purple-500 text-white p-4 rounded-full shadow-xl border border-purple-400/30 flex items-center gap-3 transition-transform group-hover:scale-110">
                            <Heart className="w-6 h-6" />
                            <span className={`font-bold whitespace-nowrap hidden group-hover:block absolute right-full mr-4 bg-gray-900 text-white px-4 py-2 rounded-lg text-lg`}>{content.volunteerPage.title}</span>
                        </div>
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
