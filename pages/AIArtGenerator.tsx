
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Image as ImageIcon, Wand2, Download, Share2, Coffee, Zap, Loader2, Camera } from 'lucide-react';
import { Heading, Text } from '../components/ui/Typography';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const AIArtGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateLatteArt = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const fullPrompt = `A high-quality professional barista latte art on a ceramic cup, specialized coffee photography, ${prompt}, detailed foam texture, warm cafe lighting, 4k resolution.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: fullPrompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1"
          }
        }
      });

      let foundImage = false;
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          setGeneratedImage(`data:image/png;base64,${base64EncodeString}`);
          foundImage = true;
          break;
        }
      }

      if (!foundImage) {
        throw new Error("No se pudo generar la imagen. Intenta con otro prompt.");
      }
    } catch (err) {
      console.error(err);
      setError("Error al conectar con el servidor de imágenes. Verifica tu conexión.");
    } finally {
      setIsGenerating(false);
    }
  };

  const quickPrompts = [
    "Rosetta con colores galaxia",
    "Cisne elegante sobre fondo oscuro",
    "Tulipán de 5 capas con chocolate",
    "Arte latte estilo Van Gogh",
    "Espresso perfecto con crema dorada"
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-700 pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-coffee-gold font-black text-[10px] uppercase tracking-[0.4em]">
             <Zap size={14} fill="currentColor" /> Laboratorio de Innovación Visual
          </div>
          <Heading as="h1" className="text-5xl md:text-6xl font-serif">Barista Vision IA</Heading>
          <Text className="text-lg max-w-2xl">Visualiza tus ideas de arte latte antes de verter la leche. Usa nuestra IA para inspirarte.</Text>
        </div>
        <div className="bg-coffee-gold/10 p-6 rounded-[2rem] border border-coffee-gold/20 hidden lg:block">
           <div className="flex items-center gap-2 text-xs font-bold text-coffee-gold mb-2">
             <Sparkles size={16} /> Beta Académica
           </div>
           <Text className="text-[10px] uppercase font-black leading-tight text-gray-500">Impulsado por Gemini 2.5 Flash</Text>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Panel de Control */}
        <div className="space-y-10">
          <div className="glass-card p-10 rounded-[3rem] border border-white/5 space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                <Wand2 size={12} className="text-coffee-gold" /> ¿Qué quieres visualizar hoy?
              </label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe tu diseño... ej: Un dragón de fuego hecho con espuma de leche en una taza de cerámica negra."
                className="w-full bg-coffee-black/40 border border-white/10 rounded-[2rem] px-8 py-6 text-white focus:border-coffee-gold outline-none transition-all resize-none min-h-[160px] placeholder:text-gray-700 font-medium"
              />
            </div>

            <div className="space-y-4">
              <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">Ideas rápidas</div>
              <div className="flex flex-wrap gap-2">
                {quickPrompts.map(p => (
                  <button 
                    key={p} 
                    onClick={() => setPrompt(p)}
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold text-gray-400 hover:text-white hover:border-coffee-gold/30 transition-all"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <Button 
              onClick={generateLatteArt} 
              disabled={isGenerating || !prompt.trim()} 
              fullWidth 
              size="lg"
              className="rounded-[2rem] h-20 shadow-2xl shadow-coffee-gold/20"
            >
              {isGenerating ? (
                <div className="flex items-center gap-3">
                  <Loader2 className="animate-spin" /> Extrayendo Imagen...
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  Generar Visualización <Zap size={18} fill="currentColor" />
                </div>
              )}
            </Button>
            
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-bold text-center animate-in shake duration-500">
                {error}
              </div>
            )}
          </div>

          <div className="p-8 bg-coffee-dark border border-white/5 rounded-[2.5rem] space-y-4">
             <div className="flex items-center gap-3 text-coffee-gold">
               <Coffee size={24} />
               <div className="font-bold text-white">Consejo del Pro</div>
             </div>
             <Text className="text-sm">Sé específico con los colores y el tipo de taza. Cuanto más detalles des sobre la iluminación y la composición, mejor será el resultado visual.</Text>
          </div>
        </div>

        {/* Display Area */}
        <div className="relative group">
           <div className={`aspect-square w-full rounded-[3.5rem] overflow-hidden border-2 transition-all duration-700 flex items-center justify-center relative ${generatedImage ? 'border-coffee-gold/30 shadow-2xl shadow-coffee-gold/10' : 'border-dashed border-white/10 bg-white/[0.02]'}`}>
              {isGenerating ? (
                <div className="text-center space-y-6 animate-pulse">
                   <div className="w-32 h-32 bg-coffee-gold/20 rounded-full mx-auto flex items-center justify-center relative">
                      <div className="absolute inset-0 border-4 border-coffee-gold border-t-transparent rounded-full animate-spin"></div>
                      <Coffee size={48} className="text-coffee-gold" />
                   </div>
                   <div className="space-y-2">
                     <div className="text-xl font-serif font-bold text-white">Tostando Píxeles...</div>
                     <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">Ajustando la molienda digital</div>
                   </div>
                </div>
              ) : generatedImage ? (
                <>
                  <img src={generatedImage} alt="Generado por IA" className="w-full h-full object-cover animate-in fade-in zoom-in duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10 space-y-6">
                    <div className="flex gap-4">
                       <button className="flex-1 bg-white text-coffee-black py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-coffee-gold hover:text-white transition-all">
                          <Download size={16} /> Descargar
                       </button>
                       <button className="p-4 bg-white/10 backdrop-blur-md rounded-2xl text-white border border-white/10 hover:bg-white/20 transition-all">
                          <Share2 size={20} />
                       </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center space-y-6 max-w-xs opacity-40">
                   <div className="w-24 h-24 bg-white/5 rounded-[2rem] mx-auto flex items-center justify-center border border-white/5">
                      <ImageIcon size={48} className="text-gray-500" />
                   </div>
                   <div className="space-y-2">
                     <div className="text-xl font-serif font-bold text-white">Canvas Vacío</div>
                     <Text className="text-sm">Escribe tu idea a la izquierda para ver el arte cobrar vida.</Text>
                   </div>
                </div>
              )}
           </div>

           {/* Floating Social Badge */}
           {generatedImage && (
             <div className="absolute -top-4 -right-4 bg-coffee-gold text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl flex items-center gap-2 animate-in slide-in-from-right-4 duration-500">
                <Camera size={14} /> Compartir en el muro
             </div>
           )}
        </div>
      </div>
    </div>
  );
};
