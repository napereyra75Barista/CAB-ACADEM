
import React from 'react';
import { Zap, Trophy, Flame } from 'lucide-react';
import { Badge as UIBadge } from '../ui/Badge';

interface XPTrackerProps {
  xp: number;
  rank: string;
  streak: number;
  compact?: boolean;
}

export const XPTracker: React.FC<XPTrackerProps> = ({ xp, rank, streak, compact = false }) => {
  const nextLevelXP = 5000; // Mock next level threshold
  const progress = (xp / nextLevelXP) * 100;

  if (compact) {
    return (
      <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl">
         <div className="flex items-center gap-1.5 text-coffee-gold">
            <Zap size={14} fill="currentColor" />
            <span className="text-xs font-black">{xp.toLocaleString()}</span>
         </div>
         <div className="w-px h-4 bg-white/10"></div>
         <div className="flex items-center gap-1.5 text-orange-500">
            <Flame size={14} fill="currentColor" />
            <span className="text-xs font-black">{streak}d</span>
         </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-8 rounded-[2.5rem] border border-white/5 space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Rango Actual</div>
          <div className="text-xl font-bold text-white flex items-center gap-2">
            <Trophy size={20} className="text-coffee-gold" /> {rank}
          </div>
        </div>
        <UIBadge variant="gold" dot>{streak} Días de Racha</UIBadge>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-xs font-bold">
          <span className="text-gray-400">{xp.toLocaleString()} XP</span>
          <span className="text-coffee-gold">{nextLevelXP.toLocaleString()} XP para el siguiente rango</span>
        </div>
        <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-coffee-gold to-coffee-goldLight rounded-full shadow-[0_0_15px_rgba(197,160,89,0.3)]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
