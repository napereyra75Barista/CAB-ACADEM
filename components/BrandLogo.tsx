
import React from 'react';

interface BrandLogoProps {
  variant?: 'full' | 'icon';
  color?: string;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  variant = 'full', 
  color = '#C5A059',
  className = '' 
}) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Isotipo: El Grano Académico */}
      <svg 
        width="40" 
        height="40" 
        viewBox="0 0 40 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <path 
          d="M20 4C11.1634 4 4 11.1634 4 20C4 28.8366 11.1634 36 20 36C28.8366 36 36 28.8366 36 20C36 11.1634 28.8366 4 20 4ZM20 8C23.1826 8 26.2348 9.26428 28.4853 11.5147C30.7357 13.7652 32 16.8174 32 20C32 23.1826 30.7357 26.2348 28.4853 28.4853C26.2348 30.7357 23.1826 32 20 32C16.8174 32 13.7652 30.7357 11.5147 28.4853C9.26428 26.2348 8 23.1826 8 20C8 16.8174 9.26428 13.7652 11.5147 11.5147C13.7652 9.26428 16.8174 8 20 8Z" 
          fill={color} 
          fillOpacity="0.2"
        />
        <path 
          d="M20 10C14.4772 10 10 14.4772 10 20C10 25.5228 14.4772 30 20 30V10Z" 
          fill={color}
        />
        <path 
          d="M20 10C25.5228 10 30 14.4772 30 20C30 25.5228 25.5228 30 20 30" 
          stroke={color} 
          strokeWidth="2"
        />
        <rect x="19" y="10" width="2" height="20" fill={color} />
      </svg>

      {variant === 'full' && (
        <div className="flex flex-col">
          <span 
            className="font-serif text-2xl font-bold leading-none tracking-tight text-white"
            style={{ color: 'white' }}
          >
            CAB
          </span>
          <span 
            className="text-[10px] font-black tracking-[0.4em] uppercase mt-0.5"
            style={{ color: color }}
          >
            CAMPUS
          </span>
        </div>
      )}
    </div>
  );
};
