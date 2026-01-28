
import React from 'react';
import { Course, Page } from '../types';
import { ChevronDown, Play, FileText, CheckCircle2, ChevronLeft, User, Trophy, Heart, Share2 } from 'lucide-react';
import { ProgressBar } from '../components/ui/ProgressBar';
// Import INSTRUCTORS to fetch instructor avatar
import { INSTRUCTORS } from '../constants';

interface CourseDetailProps {
  course: Course;
  onNavigateLesson: (lessonId: string) => void;
  onNavigateInstructor: (instructorId: string) => void;
  onBack: () => void;
}

export const CourseDetail: React.FC<CourseDetailProps> = ({ 
  course, 
  onNavigateLesson, 
  onNavigateInstructor,
  onBack 
}) => {
  const [expandedModules, setExpandedModules] = React.useState<Set<string>>(new Set([course.modules[0]?.id]));
  const [hasRecommended, setHasRecommended] = React.useState(false);
  const [recommendCount, setRecommendCount] = React.useState(course.recommendationCount);

  // Find instructor data to get the avatar
  const instructorData = INSTRUCTORS.find(i => i.id === course.instructorId);

  const toggleModule = (id: string) => {
    const next = new Set(expandedModules);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpandedModules(next);
  };

  const handleRecommend = () => {
    if (!hasRecommended) {
      setHasRecommended(true);
      setRecommendCount(prev => prev + 1);
      // Simulación de efecto de partículas o toast aquí
    }
  };

  return (
    <div className="relative space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-32">
      {/* Hero Banner */}
      <div className="relative h-[400px] rounded-3xl overflow-hidden">
        <img src={course.thumbnail} className="w-full h-full object-cover" alt={course.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-coffee-black via-coffee-black/40 to-transparent"></div>
        
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 flex items-center gap-2 bg-black/50 backdrop-blur px-4 py-2 rounded-full hover:bg-black/70 transition-all z-10 text-white font-bold text-sm"
        >
          <ChevronLeft size={20} /> Volver
        </button>

        <div className="absolute bottom-10 left-10 right-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="bg-coffee-gold px-3 py-1 rounded-full text-xs font-bold uppercase text-white shadow-lg">{course.category}</span>
              <div className="flex items-center gap-1.5 text-coffee-gold font-bold text-sm bg-black/40 backdrop-blur px-3 py-1 rounded-full border border-coffee-gold/20">
                <Heart size={14} fill={hasRecommended ? "currentColor" : "none"} /> {recommendCount.toLocaleString()} recomendaciones
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">{course.title}</h1>
            <p className="text-gray-200">{course.description}</p>
          </div>
          
          <div className="flex flex-col items-end gap-3 min-w-[200px] hidden md:flex">
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-coffee-gold h-full rounded-full" 
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <div className="text-sm font-bold text-white">{course.progress}% Completado</div>
            <button 
              onClick={() => onNavigateLesson('l1')}
              className="w-full py-4 bg-white text-coffee-black font-bold rounded-xl hover:bg-coffee-gold hover:text-white transition-all flex items-center justify-center gap-2 shadow-xl"
            >
              <Play className="fill-current" size={18} /> Continuar Curso
            </button>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Contenido del Curso</h2>
            <div className="space-y-4">
              {course.modules.map((module, idx) => {
                const isExpanded = expandedModules.has(module.id);
                return (
                  <div 
                    key={module.id} 
                    className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                      isExpanded 
                        ? 'border-coffee-gold/30 bg-white/[0.04] shadow-[0_0_30px_rgba(197,160,89,0.05)]' 
                        : 'border-white/5 bg-coffee-dark/50'
                    }`}
                  >
                    <button 
                      onClick={() => toggleModule(module.id)}
                      className={`w-full flex items-center justify-between p-6 transition-all ${
                        isExpanded ? 'bg-white/5' : 'hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all border ${
                          isExpanded 
                            ? 'bg-coffee-gold text-white border-coffee-gold shadow-[0_0_15px_rgba(197,160,89,0.4)]' 
                            : 'bg-coffee-gold/10 border-coffee-gold/20 text-coffee-gold'
                        }`}>
                          {idx + 1}
                        </div>
                        <div className="text-left">
                          <h3 className={`font-bold transition-colors ${isExpanded ? 'text-coffee-gold' : 'text-white'}`}>{module.title}</h3>
                          <p className="text-xs text-gray-500 mt-1">{module.lessons.length} lecciones • 1h 45m</p>
                        </div>
                      </div>
                      <ChevronDown className={`transition-transform duration-300 text-gray-400 ${isExpanded ? 'rotate-180 text-coffee-gold' : ''}`} />
                    </button>

                    {isExpanded && (
                      <div className="px-4 pb-4 space-y-2 animate-in slide-in-from-top-2 duration-300">
                        {module.lessons.map((lesson) => (
                          <div 
                            key={lesson.id} 
                            onClick={() => onNavigateLesson(lesson.id)}
                            className={`flex items-center justify-between p-4 rounded-xl group cursor-pointer transition-all border ${
                              lesson.isCompleted 
                                ? 'bg-green-500/[0.03] border-green-500/10 shadow-[inset_0_0_15px_rgba(34,197,94,0.03)]' 
                                : 'bg-transparent border-transparent hover:bg-coffee-gold/10'
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              {lesson.isCompleted ? (
                                <CheckCircle2 className="text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.4)]" size={20} />
                              ) : (
                                <Play className="text-gray-500 group-hover:text-coffee-gold" size={18} />
                              )}
                              <span className={`${
                                lesson.isCompleted ? 'text-gray-400 font-medium italic' : 'text-gray-200'
                              } transition-colors group-hover:text-white`}>
                                {lesson.title}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500 font-medium">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="glass-card p-6 rounded-3xl space-y-6 sticky top-24">
            <h3 className="font-bold text-xl text-white">¿Qué incluye este curso?</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-center gap-3"><Play size={18} className="text-coffee-gold" /> 24 lecciones en video HD</li>
              <li className="flex items-center gap-3"><FileText size={18} className="text-coffee-gold" /> 12 recursos descargables</li>
              <li className="flex items-center gap-3"><Trophy size={18} className="text-coffee-gold" /> Certificado de finalización</li>
              <li className="flex items-center gap-3"><User size={18} className="text-coffee-gold" /> Acceso a foro de alumnos</li>
            </ul>

            <div className="pt-6 border-t border-white/5 space-y-4">
              <button 
                onClick={handleRecommend}
                className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all group ${
                  hasRecommended 
                  ? 'bg-coffee-gold text-white shadow-lg shadow-coffee-gold/20' 
                  : 'bg-coffee-gold/10 text-coffee-gold border border-coffee-gold/20 hover:bg-coffee-gold/20'
                }`}
              >
                <Heart size={18} fill={hasRecommended ? "white" : "none"} className={hasRecommended ? "animate-bounce" : "group-hover:scale-110 transition-transform"} /> 
                {hasRecommended ? '¡Recomendado!' : 'Recomendar Curso'}
              </button>
              <button className="w-full py-4 bg-white/5 border border-white/10 text-gray-400 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                <Share2 size={16} /> Compartir Formación
              </button>
            </div>

            <div className="pt-6 border-t border-white/5">
              <div 
                className="flex items-center gap-4 cursor-pointer group"
                onClick={() => onNavigateInstructor(course.instructorId)}
              >
                <div className="w-12 h-12 rounded-full bg-coffee-dark border border-coffee-gold overflow-hidden group-hover:scale-105 transition-transform">
                  <img src={instructorData?.avatar || "https://picsum.photos/100"} alt="Instructor" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase font-bold tracking-tighter">Instructor</div>
                  <div className="font-bold text-white group-hover:text-coffee-gold transition-colors">{course.instructorName}</div>
                  <div className="text-[10px] text-coffee-gold uppercase font-black">Ver Perfil →</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Persistent Floating Progress Summary Card */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-2xl z-50 animate-in slide-in-from-bottom-8 duration-700">
        <div className="glass-card bg-coffee-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 w-full space-y-3">
            <div className="flex justify-between items-center text-[10px] font-black text-gray-500 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <Trophy size={14} className="text-coffee-gold" />
                <span>Tu progreso total</span>
              </div>
              <span className="text-coffee-gold text-sm">{course.progress}% completado</span>
            </div>
            <ProgressBar progress={course.progress} size="md" />
          </div>
          
          <button 
            onClick={() => onNavigateLesson('l1')}
            className="shrink-0 bg-coffee-gold text-white px-8 py-4 rounded-2xl font-black text-sm hover:bg-coffee-goldLight transition-all flex items-center gap-3 shadow-lg shadow-coffee-gold/20"
          >
            Continuar <Play size={16} fill="currentColor" />
          </button>
        </div>
      </div>
    </div>
  );
};
