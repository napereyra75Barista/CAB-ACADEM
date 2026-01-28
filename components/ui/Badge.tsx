
import React from 'react';

interface BadgeProps {
  variant?: 'gold' | 'outline' | 'green' | 'dark';
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ 
  variant = 'gold', 
  children, 
  className = '', 
  dot = false 
}) => {
  const variants = {
    gold: "bg-coffee-gold/10 text-coffee-gold border-coffee-gold/20",
    outline: "border-white/10 text-gray-400 bg-white/5",
    green: "bg-green-500/10 text-green-500 border-green-500/20",
    dark: "bg-coffee-black/80 text-white border-white/5"
  };

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${variants[variant]} ${className}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${variant === 'gold' ? 'bg-coffee-gold' : 'bg-current'}`} />}
      {children}
    </div>
  );
};
