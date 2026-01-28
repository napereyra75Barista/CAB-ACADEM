
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'glass' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-bold rounded-xl transition-all duration-300 transform active:scale-95 disabled:opacity-50";
  
  const variants = {
    primary: "bg-coffee-gold text-white hover:bg-coffee-goldLight shadow-lg shadow-coffee-gold/20",
    glass: "bg-white/5 border border-white/10 text-white backdrop-blur-md hover:bg-white/10",
    outline: "border-2 border-coffee-gold text-coffee-gold hover:bg-coffee-gold hover:text-white",
    ghost: "text-gray-400 hover:text-white hover:bg-white/5"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-10 py-5 text-base"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};
