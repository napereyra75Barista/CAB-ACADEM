
import React from 'react';
import { Camera, Users, Clock, Zap } from 'lucide-react';
import { Heading, Text } from '../ui/Typography';

export const WeeklyChallengeCard: React.FC = () => {
  return (
    <div className="relative group overflow-hidden rounded-[3rem] border border-white/5 bg-coffee-dark h-[400px]">
      <img 
        src="https://images.unsplash.com/photo-1512568400610-62da28bc8a13?q=80&w=800&auto=format&fit=crop" 
        className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-coffee-black via-coffee-black/60 to-transparent"></div>
      
      <div className="absolute inset-0 p-10 flex flex-col justify-end space-y-6">
        <div className="flex justify-between items-start">
           <div className="bg-coffee-gold px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white shadow-xl">RETO DE LA SEMANA</div>
           <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 text-xs font-bold">
              <Clock size={14} className="text-coffee-gold" /> Termina en 2d 14h
           </div>
        </div>

        <div className="space-y-2">
           <Heading as="h3" className="text-3xl text-white">The Perfect Rosetta</Heading>
           <Text className="text-gray-200">Sube una foto de tu mejor Rosetta con microespuma de seda. Los 3 mejores ganan acceso a una Masterclass exclusiva.</Text>
        </div>

        <div className="flex items-center justify-between">
           <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <img key={i} src={`https://picsum.photos/50?random=${i}`} className="w-10 h-10 rounded-full border-2 border-coffee-dark" />
              ))}
              <div className="w-10 h-10 rounded-full bg-coffee-gold flex items-center justify-center text-[10px] font-bold border-2 border-coffee-dark">+240</div>
           </div>
           
           <button className="bg-white text-coffee-black px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-3 hover:bg-coffee-gold hover:text-white transition-all transform active:scale-95 shadow-2xl">
              <Camera size={18} /> Participar (+500 XP)
           </button>
        </div>
      </div>
    </div>
  );
};
