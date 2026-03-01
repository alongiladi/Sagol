import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'hover';
}

export const Card: React.FC<CardProps> = ({ children, className = '', variant = 'default' }) => {
  const baseStyle = "relative bg-purple-900/40 border border-purple-500/20 rounded-2xl overflow-hidden backdrop-blur-sm";
  
  const variants = {
    default: "hover:border-purple-500/40 transition-colors duration-300",
    hover: "hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(124,58,237,0.2)] transition-all duration-300 group"
  };

  return (
    <div className={`${baseStyle} ${variants[variant]} ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10 p-6">
        {children}
      </div>
    </div>
  );
};