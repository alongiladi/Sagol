import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

export const LanguageToggle: React.FC = () => {
    const { language, toggleLanguage } = useLanguage();

    return (
        <motion.button
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            onClick={toggleLanguage}
            className={`hidden md:block fixed left-6 top-1/2 -translate-y-1/2 z-50 group`}
            aria-label="Toggle Language"
        >
            <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />

                {/* Button Container */}
                <div className="relative bg-gradient-to-br from-purple-900 to-purple-950 border-2 border-purple-500/30 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm">
                    {/* Animated Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Content */}
                    <div className="relative px-4 py-6 flex flex-col items-center gap-3">
                        <div className="flex flex-col items-center gap-2">
                            <span className={`text-sm font-bold tracking-wider transition-all ${language === 'he' ? 'text-white scale-110' : 'text-purple-300'}`}>
                                עב
                            </span>
                            <div className="w-8 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full" />
                            <span className={`text-sm font-bold tracking-wider transition-all ${language === 'en' ? 'text-white scale-110' : 'text-purple-300'}`}>
                                EN
                            </span>
                        </div>
                    </div>
                </div>

                {/* Pulse Animation */}
                <div className="absolute -inset-1 border-2 border-cyan-400/20 rounded-2xl animate-pulse" />
            </div>
        </motion.button>
    );
};
