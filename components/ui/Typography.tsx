
import React from 'react';

interface TextProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

export const Heading: React.FC<TextProps> = ({ children, className = '', as: Component = 'h2' }) => {
  const styles = {
    h1: "text-5xl md:text-7xl font-serif font-bold leading-tight",
    h2: "text-3xl md:text-5xl font-serif font-bold",
    h3: "text-2xl font-bold",
    h4: "text-xl font-bold"
  };
  
  return <Component className={`${styles[Component as keyof typeof styles]} ${className}`}>{children}</Component>;
};

export const Text: React.FC<TextProps> = ({ children, className = '', as: Component = 'p' }) => {
  return <Component className={`text-gray-400 leading-relaxed ${className}`}>{children}</Component>;
};
