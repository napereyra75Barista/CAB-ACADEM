
import React from 'react';
import { Award, Download, Share2, Linkedin, Instagram, ExternalLink } from 'lucide-react';

export const Certificates: React.FC = () => {
  const completed = [
    { id: 1, name: "Barista Inicial", date: "15 Oct, 2023", idNum: "CAB-230-0192", img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=400&auto=format&fit=crop" },
    { id: 2, name: "Calibración de Molinos", date: "02 Ene, 2024", idNum: "CAB-240-0042", img: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=400&auto=format&fit=crop" }
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-serif font-bold">Mis Certificados</h1>
        <p className="text-gray-400 mt-2">Tus logros académicos acreditados por el Centro Argentino de Baristas.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {completed.map(cert => (
          <div key={cert.id} className="glass-card rounded-3xl overflow-hidden flex flex-col sm:flex-row border border-white/5 group hover:border-coffee-gold transition-all duration-300">
             <div className="w-full sm:w-48 aspect-square relative">
               <img src={cert.img} className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-500" alt={cert.name} />
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="bg-coffee-gold p-4 rounded-full shadow-2xl scale-125">
                   <Award className="text-white" size={32} />
                 </div>
               </div>
             </div>
             
             <div className="p-8 flex-1 flex flex-col justify-between">
               <div className="space-y-4">
                 <div className="flex justify-between items-start">
                   <div>
                     <h3 className="text-2xl font-bold">{cert.name}</h3>
                     <p className="text-sm text-gray-500 mt-1">Obtenido el {cert.date}</p>
                   </div>
                 </div>
                 <div className="text-xs text-gray-600 font-mono flex items-center gap-2">
                   ID DE VALIDACIÓN: {cert.idNum} <ExternalLink size={12} />
                 </div>
               </div>

               <div className="flex flex-wrap gap-3 mt-8">
                 <button className="flex-1 bg-white text-coffee-black px-4 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-coffee-gold hover:text-white transition-all">
                   <Download size={16} /> Descargar PDF
                 </button>
                 <div className="flex gap-2">
                    <button className="p-2.5 border border-white/10 rounded-xl hover:bg-white/5 transition-all text-gray-400 hover:text-[#0077b5]"><Linkedin size={20} /></button>
                    <button className="p-2.5 border border-white/10 rounded-xl hover:bg-white/5 transition-all text-gray-400 hover:text-[#E4405F]"><Instagram size={20} /></button>
                 </div>
               </div>
             </div>
          </div>
        ))}
      </div>

      <div className="bg-coffee-dark/50 border border-dashed border-white/10 rounded-3xl p-12 text-center space-y-4">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-gray-600">
          <Award size={32} />
        </div>
        <div className="space-y-1">
          <h3 className="font-bold text-gray-400">Próximo objetivo: Latte Art Avanzado</h3>
          <p className="text-sm text-gray-500">Te falta un 70% para obtener este certificado.</p>
        </div>
        <button className="text-coffee-gold text-sm font-bold hover:underline">Continuar curso →</button>
      </div>
    </div>
  );
};
