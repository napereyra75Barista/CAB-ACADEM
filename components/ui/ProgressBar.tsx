
import React from 'react';

interface ProgressBarProps {
  progress: number;
  size?: 'sm' | 'md';
  showLabel?: boolean;
  glow?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  size = 'sm', 
  showLabel = false, 
  glow = true 
}) => {
  const height = size === 'sm' ? 'h-1.5' : 'h-2.5';
  
  return (
    <div className="space-y-2 w-full">
      {showLabel && (
        <div className="flex justify-between text-[10px] font-black text-gray-500 tracking-widest uppercase">
          <span>Progreso</span>
          <span className="text-coffee-gold">{progress}%</span>
        </div>
      )}
      <div className={`w-full bg-white/10 rounded-full overflow-hidden ${height}`}>
        <div 
          className={`bg-coffee-gold h-full rounded-full transition-all duration-1000 ${
            glow ? 'shadow-[0_0_10px_rgba(197,160,89,0.5)]' : ''
          }`} 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
