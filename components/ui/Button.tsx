import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'glow';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseClasses = "px-6 py-3 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  let variantClasses = "";
  switch (variant) {
    case 'primary':
      variantClasses = "bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:-translate-y-1";
      break;
    case 'secondary':
      variantClasses = "bg-transparent border-2 border-purple-500 text-purple-100 hover:bg-purple-900/30 hover:border-purple-400 hover:-translate-y-1";
      break;
    case 'glow':
      variantClasses = "bg-gradient-to-r from-purple-700 to-pink-600 text-white animate-pulse-slow hover:animate-none hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] hover:scale-105";
      break;
  }

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};