import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'gold';
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  className = '', 
  variant = 'primary', 
  isLoading = false,
  disabled,
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center px-6 py-3 font-bold uppercase tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 active:translate-y-0";
  
  const variants = {
    primary: "bg-navy-900 text-gold-400 border border-gold-500 hover:bg-navy-800 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)]",
    secondary: "bg-gray-800 text-white hover:bg-gray-700",
    outline: "bg-transparent border-2 border-gold-600 text-gold-400 hover:bg-gold-600/10",
    gold: "bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 text-navy-900 border-none hover:shadow-[0_0_25px_rgba(34,197,94,0.6)] bg-[length:200%_auto] hover:bg-right transition-[background-position]",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
};

export default Button;