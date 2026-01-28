
import React from 'react';
import { Heading, Text } from '../components/ui/Typography';
import { Trophy, Medal, Star, Target, Filter, ChevronUp } from 'lucide-react';
import { Badge } from '../components/ui/Badge';

export const LeaderboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('Global');

  const topPlayers = [
    { position: 1, name: 'Facundo Rossi', xp: 15420, rank: 'Coffee Guru', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=100&auto=format&fit=crop', trend: 'up' },
    { position: 2, name: 'Valentina Gomez', xp: 12100, rank: 'Master Barista', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop', trend: 'up' },
    { position: 3, name: 'Marcos Benitez', xp: 11850, rank: 'Master Barista', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop', trend: 'down' },
  ];

  const players = [
    { position: 4, name: 'Ana Luz', xp: 9400, rank: 'Senior Barista', avatar: 'https://picsum.photos/100?random=1' },
    { position: 5, name: 'Bautista Lopez', xp: 8200, rank: 'Senior Barista', avatar: 'https://picsum.photos/100?random=2' },
    { position: 6, name: 'Elena F.', xp: 7500, rank: 'Senior Barista', avatar: 'https://picsum.photos/100?random=3' },
    { position: 7, name: 'Julian Gomez', xp: 6800, rank: 'Junior Barista', avatar: 'https://picsum.photos/100?random=4' },
    { position: 8, name: 'Usted (Martín)', xp: 4850, rank: 'Senior Barista', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop', isUser: true },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-coffee-gold font-black text-[10px] uppercase tracking-[0.4em]">
             <Trophy size={14} fill="currentColor" /> Rankings de Maestría
          </div>
          <Heading as="h1" className="text-5xl">Leaderboard</Heading>
        </div>
        <div className="flex items-center gap-2 bg-coffee-dark border border-white/5 p-1.5 rounded-2xl">
           {['Global', 'Curso actual', 'Semanal'].map(tab => (
             <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === tab ? 'bg-coffee-gold text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
             >
               {tab}
             </button>
           ))}
        </div>
      </div>

      {/* Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end pt-10">
        {/* 2nd Place */}
        <div className="order-2 md:order-1 glass-card p-10 rounded-[3rem] text-center space-y-4 border-b-4 border-gray-400 relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-400 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold border-4 border-coffee-black">2</div>
          <img src={topPlayers[1].avatar} className="w-24 h-24 rounded-3xl mx-auto border-2 border-gray-400 p-1" />
          <div>
            <div className="font-bold text-white text-xl">{topPlayers[1].name}</div>
            <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{topPlayers[1].rank}</div>
          </div>
          <div className="text-2xl font-black text-gray-400">{topPlayers[1].xp.toLocaleString()} XP</div>
        </div>

        {/* 1st Place */}
        <div className="order-1 md:order-2 glass-card p-12 rounded-[3.5rem] text-center space-y-6 border-b-8 border-coffee-gold relative scale-110 shadow-2xl shadow-coffee-gold/10">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-coffee-gold text-white w-16 h-16 rounded-full flex items-center justify-center font-bold border-4 border-coffee-black text-2xl">1</div>
          <div className="relative inline-block">
             <img src={topPlayers[0].avatar} className="w-32 h-32 rounded-[2.5rem] mx-auto border-4 border-coffee-gold p-1" />
             <Medal size={40} className="absolute -bottom-4 -right-4 text-coffee-gold drop-shadow-lg" fill="currentColor" />
          </div>
          <div>
            <div className="font-bold text-white text-2xl">{topPlayers[0].name}</div>
            <div className="text-xs text-coffee-gold font-black uppercase tracking-widest">{topPlayers[0].rank}</div>
          </div>
          <div className="text-4xl font-black text-white">{topPlayers[0].xp.toLocaleString()} <span className="text-sm font-bold text-gray-500">XP</span></div>
        </div>

        {/* 3rd Place */}
        <div className="order-3 glass-card p-10 rounded-[3rem] text-center space-y-4 border-b-4 border-orange-800 relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-orange-800 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold border-4 border-coffee-black">3</div>
          <img src={topPlayers[2].avatar} className="w-24 h-24 rounded-3xl mx-auto border-2 border-orange-800 p-1" />
          <div>
            <div className="font-bold text-white text-xl">{topPlayers[2].name}</div>
            <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{topPlayers[2].rank}</div>
          </div>
          <div className="text-2xl font-black text-orange-800">{topPlayers[2].xp.toLocaleString()} XP</div>
        </div>
      </div>

      {/* List */}
      <div className="glass-card rounded-[3rem] border border-white/5 overflow-hidden">
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
           <Text className="text-xs font-black uppercase tracking-widest">Ranking Completo</Text>
           <button className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white"><Filter size={14} /> Filtrar Región</button>
        </div>
        <div className="divide-y divide-white/5">
           {players.map((p) => (
             <div key={p.position} className={`p-8 flex items-center gap-6 hover:bg-white/[0.02] transition-colors ${p.isUser ? 'bg-coffee-gold/5 border-l-4 border-l-coffee-gold' : ''}`}>
                <div className="w-8 font-black text-gray-600 text-xl">#{p.position}</div>
                <img src={p.avatar} className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1">
                   <div className="font-bold text-white flex items-center gap-3">
                      {p.name} {p.isUser && <Badge variant="gold" className="text-[8px]">TU RANGO</Badge>}
                   </div>
                   <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{p.rank}</div>
                </div>
                <div className="text-right">
                   <div className="font-black text-white">{p.xp.toLocaleString()} XP</div>
                   <div className="flex items-center justify-end gap-1 text-[10px] text-green-500 font-bold">
                      <ChevronUp size={12} /> +120 hoy
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};
