
import React from 'react';
import { Instructor, Course } from '../types';
import { 
  ChevronLeft, Star, Users, Award, 
  ExternalLink, Target, ShieldCheck, 
  GraduationCap, Coffee, Globe, Briefcase, 
  ArrowRight, MessageSquare, Quote, ThumbsUp,
  CheckCircle2, Zap, Heart, Instagram
} from 'lucide-react';
import { Heading, Text } from '../components/ui/Typography';
import { Badge } from '../components/ui/Badge';
import { CourseCard } from '../components/CourseCard';

interface InstructorProfileProps {
  instructor: Instructor;
  courses: Course[];
  onBack: () => void;
  onNavigateCourse: (id: string) => void;
}

export const InstructorProfile: React.FC<InstructorProfileProps> = ({ 
  instructor, 
  courses, 
  onBack, 
  onNavigateCourse 
}) => {
  const instructorCourses = courses.filter(c => instructor.coursesIds.includes(c.id));

  // Testimonios simulados de alta calidad
  const testimonials = [
    {
      id: 1,
      student: "Facundo Rossi",
      rating: 5,
      comment: "La claridad técnica de Martín es inigualable. Sus explicaciones sobre la química del espresso me ayudaron a reducir el desperdicio en mi cafetería.",
      date: "hace 2 semanas",
      tags: ["Eficiencia", "Técnico"]
    },
    {
      id: 2,
      student: "Ana Luz",
      rating: 5,
      comment: "Excelente mentor. Se nota la pasión y la experiencia real detrás de la barra. No solo enseña técnica, enseña a amar el café.",
      date: "hace 1 mes",
      tags: ["Inspirador"]
    }
  ];

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-32">
      {/* Cabecera de Navegación */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="group flex items-center gap-3 text-gray-500 hover:text-coffee-gold transition-all font-black text-[10px] uppercase tracking-[0.4em]"
        >
          <div className="p-2.5 bg-white/5 rounded-2xl group-hover:bg-coffee-gold/10 transition-colors border border-white/5">
            <ChevronLeft size={16} />
          </div>
          Volver a la exploración
        </button>
        <div className="flex gap-4">
           <button className="p-3 bg-white/5 border border-white/5 rounded-2xl text-gray-500 hover:text-white transition-all hover:border-white/20">
             <ExternalLink size={18} />
           </button>
           <button className="p-3 bg-white/5 border border-white/5 rounded-2xl text-gray-500 hover:text-white transition-all hover:border-white/20">
             <MessageSquare size={18} />
           </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Sidebar Izquierda: Identidad y Credenciales */}
        <div className="lg:col-span-4 space-y-10">
          <div className="glass-card p-10 rounded-[3.5rem] border border-white/5 text-center space-y-8 relative overflow-hidden group">
             {/* Brillo Dorado Decorativo */}
             <div className="absolute -top-24 -left-24 w-64 h-64 bg-coffee-gold/10 blur-[100px] group-hover:bg-coffee-gold/20 transition-all duration-1000"></div>
             
             <div className="relative">
                <div className="w-44 h-44 rounded-[3.5rem] bg-coffee-dark mx-auto p-1.5 border-2 border-coffee-gold shadow-2xl relative">
                  <img src={instructor.avatar} alt={instructor.name} className="w-full h-full object-cover rounded-[3.2rem]" />
                  <div className="absolute -bottom-3 -right-3 bg-coffee-gold text-white p-3.5 rounded-2xl shadow-xl border-4 border-coffee-black ring-1 ring-white/10">
                     <ShieldCheck size={22} fill="currentColor" />
                  </div>
                </div>
             </div>

             <div className="space-y-3">
                <div className="flex items-center justify-center gap-2 text-coffee-gold font-black text-[10px] uppercase tracking-[0.3em]">
                   <GraduationCap size={14} className="animate-pulse" /> Certified Master Instructor
                </div>
                <Heading as="h1" className="text-4xl lg:text-5xl">{instructor.name}</Heading>
                <div className="text-gray-500 font-medium italic text-sm">{instructor.role} en CAB</div>
             </div>

             <div className="grid grid-cols-2 gap-4 py-8 border-y border-white/5">
                <div className="space-y-1 text-center">
                   <div className="text-3xl font-black text-white">{instructor.rating}</div>
                   <div className="flex justify-center gap-0.5 text-coffee-gold">
                      {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < Math.floor(instructor.rating) ? "currentColor" : "none"} />)}
                   </div>
                   <div className="text-[9px] text-gray-600 uppercase font-black tracking-widest mt-1">Rating Global</div>
                </div>
                <div className="space-y-1 border-l border-white/5 text-center">
                   <div className="text-3xl font-black text-white">{(instructor.studentsCount / 1000).toFixed(1)}k</div>
                   <div className="text-coffee-gold flex justify-center"><Users size={16} /></div>
                   <div className="text-[9px] text-gray-600 uppercase font-black tracking-widest mt-1">Alumnos</div>
                </div>
             </div>

             <div className="space-y-6 text-left px-2">
                <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <Target size={12} className="text-coffee-gold" /> Áreas de Maestría
                </div>
                <div className="flex flex-wrap gap-2">
                   {instructor.expertise.map(exp => (
                     <Badge key={exp} variant="gold" className="px-4 py-2 text-[9px] lowercase tracking-normal">#{exp}</Badge>
                   ))}
                </div>
             </div>

             <button className="w-full py-5 bg-coffee-gold text-white rounded-3xl text-xs font-black uppercase tracking-widest transition-all hover:bg-coffee-goldLight shadow-xl shadow-coffee-gold/10 flex items-center justify-center gap-3 group">
                Reservar Mentoría <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
             </button>
          </div>

          <div className="glass-card p-10 rounded-[3rem] border border-white/5 space-y-8">
             <h4 className="font-bold text-white flex items-center gap-3 text-lg font-serif">
                <Award size={20} className="text-coffee-gold" /> Trayectoria Técnica
             </h4>
             <div className="space-y-6">
                {[
                  { label: 'Años de Experiencia', value: '15+ Años', icon: Coffee, detail: 'Experto en Espresso' },
                  { label: 'Certificación Oficial', value: 'SCA Academy', icon: ShieldCheck, detail: 'AST Authorized Trainer' },
                  { label: 'Proyectos Liderados', value: '45+ Cafeterías', icon: Briefcase, detail: 'Consultoría Integral' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-5 group">
                    <div className="p-3.5 bg-white/5 rounded-2xl group-hover:bg-coffee-gold/10 transition-colors border border-white/5">
                       <item.icon size={20} className="text-gray-500 group-hover:text-coffee-gold" />
                    </div>
                    <div>
                       <div className="text-[10px] font-black text-gray-600 uppercase tracking-tighter">{item.label}</div>
                       <div className="text-sm font-bold text-white">{item.value}</div>
                       <div className="text-[9px] text-gray-500 mt-0.5">{item.detail}</div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Contenido Principal: Bio, Testimonios, Cursos */}
        <div className="lg:col-span-8 space-y-24">
          {/* Bio Section */}
          <section className="space-y-8">
            <div className="flex items-center gap-4">
               <div className="h-px flex-1 bg-white/5"></div>
               <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.5em]">Semblanza Profesional</h2>
               <div className="h-px flex-1 bg-white/5"></div>
            </div>
            <div className="relative">
              <Quote className="absolute -top-6 -left-8 text-coffee-gold/10" size={80} />
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light italic">
                "{instructor.bio}"
              </p>
            </div>
          </section>

          {/* Instructor Courses */}
          <section className="space-y-10">
             <div className="flex justify-between items-end">
               <div className="space-y-2">
                 <Heading as="h3" className="text-3xl font-serif">Biblioteca del Instructor</Heading>
                 <Text>Programas académicos diseñados y dictados por {instructor.name.split(' ')[0]}.</Text>
               </div>
               <Badge variant="outline">{instructorCourses.length} Formaciones</Badge>
             </div>
             
             <div className="grid md:grid-cols-2 gap-8">
                {instructorCourses.map(course => (
                  <CourseCard 
                    key={course.id} 
                    course={course} 
                    onClick={onNavigateCourse} 
                  />
                ))}
             </div>
          </section>

          {/* Feedback & Reviews */}
          <section className="space-y-10">
             <Heading as="h3" className="text-3xl font-serif">Opiniones de la Comunidad</Heading>
             <div className="space-y-6">
                {testimonials.map(t => (
                  <div key={t.id} className="glass-card p-10 rounded-[3rem] border border-white/5 space-y-6 hover:bg-white/[0.04] transition-all">
                    <div className="flex justify-between items-start">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-coffee-gold/10 flex items-center justify-center font-bold text-coffee-gold border border-coffee-gold/20 shadow-inner">
                            {t.student[0]}
                          </div>
                          <div>
                            <div className="font-bold text-white flex items-center gap-3">
                               {t.student} <CheckCircle2 size={14} className="text-coffee-gold" />
                            </div>
                            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{t.date}</div>
                          </div>
                       </div>
                       <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-coffee-gold fill-current" />)}
                       </div>
                    </div>
                    
                    <Text className="text-lg text-gray-300 italic">"{t.comment}"</Text>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                       <div className="flex gap-2">
                          {t.tags.map(tag => <Badge key={tag} variant="outline" className="text-[8px] bg-transparent">{tag}</Badge>)}
                       </div>
                       <button className="flex items-center gap-2 text-[10px] font-black text-gray-500 hover:text-white transition-colors uppercase tracking-widest">
                          <ThumbsUp size={14} /> Útil
                       </button>
                    </div>
                  </div>
                ))}
             </div>
             <button className="w-full py-5 rounded-[2.5rem] border border-white/5 bg-white/5 text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-[0.3em] transition-all">
                Cargar más testimonios
             </button>
          </section>

          {/* Instructor CTA Social */}
          <section className="bg-gradient-to-br from-coffee-gold/20 via-coffee-dark to-coffee-black p-12 rounded-[4rem] border border-coffee-gold/20 flex flex-col md:flex-row items-center justify-between gap-12">
             <div className="space-y-4 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 text-coffee-gold font-black text-[10px] uppercase tracking-widest">
                   <Zap size={14} fill="currentColor" /> Live Masterclasses
                </div>
                <Heading as="h3" className="text-3xl">Conéctate con {instructor.name.split(' ')[0]}</Heading>
                <Text className="max-w-md">Sigue su actividad profesional y no te pierdas las próximas sesiones de calibración en vivo.</Text>
             </div>
             <div className="flex gap-4">
                <button className="p-6 bg-white/10 rounded-3xl text-white hover:bg-white/20 transition-all border border-white/10 group">
                   <Instagram size={24} className="group-hover:scale-110 transition-transform" />
                </button>
                <button className="px-10 py-6 bg-coffee-gold text-white font-black text-xs rounded-3xl hover:bg-coffee-goldLight transition-all shadow-2xl shadow-coffee-gold/20 uppercase tracking-widest">
                   Seguir Instructor
                </button>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};
