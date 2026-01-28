
import React from 'react';
import { Page } from '../types';
import { COURSES } from '../constants';
import { ChevronRight, Star, Play, CheckCircle, Quote, Briefcase } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

const TestimonialCard = ({ name, role, text }: { name: string, role: string, text: string }) => (
  <div className="glass-card p-8 rounded-3xl relative">
    <Quote className="absolute top-6 right-6 text-coffee-gold/20" size={40} />
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} className="fill-coffee-gold text-coffee-gold" />
      ))}
    </div>
    <p className="text-gray-300 italic mb-6 leading-relaxed">"{text}"</p>
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-coffee-gold/20 flex items-center justify-center font-bold text-coffee-gold">
        {name[0]}
      </div>
      <div>
        <div className="font-bold text-sm">{name}</div>
        <div className="text-xs text-gray-500 uppercase tracking-wider">{role}</div>
      </div>
    </div>
  </div>
);

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-32 pb-20 overflow-hidden bg-coffee-black">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden rounded-[2.5rem] mx-4 mt-4 shadow-2xl">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2000&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-60"
            alt="Barista background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-coffee-black via-coffee-black/70 to-transparent"></div>
        </div>

        <div className="relative z-10 px-8 md:px-20 max-w-4xl space-y-10">
          <BrandLogo className="scale-125 origin-left" />
          
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-serif font-bold leading-[1.1]">
              Maestría en <br/>
              <span className="text-coffee-gold italic">Barismo Digital</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-2xl max-w-xl leading-relaxed font-light">
              La plataforma definitiva para profesionales del café. Formación técnica, comunidad global y certificación oficial.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 pt-6">
            <button 
              onClick={() => onNavigate('login')}
              className="px-10 py-5 bg-coffee-gold hover:bg-coffee-goldLight text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-xl shadow-coffee-gold/20 flex items-center justify-center gap-3"
            >
              Ingresar al Campus <ChevronRight size={20} />
            </button>
            <button 
              onClick={() => onNavigate('catalog')}
              className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-full backdrop-blur-md transition-all border border-white/10"
            >
              Explorar Cursos
            </button>
          </div>
        </div>
      </section>

      {/* Featured Courses - Netflix Style */}
      <section className="px-8 max-w-7xl mx-auto space-y-12">
        <div className="flex justify-between items-end">
          <div className="space-y-2">
            <h2 className="text-5xl font-serif font-bold">Formaciones Destacadas</h2>
            <div className="h-1 w-20 bg-coffee-gold rounded-full"></div>
          </div>
          <button 
            onClick={() => onNavigate('catalog')}
            className="text-gray-400 font-bold flex items-center gap-2 hover:text-coffee-gold transition-colors"
          >
            Ver Biblioteca Completa <ChevronRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {COURSES.map((course) => (
            <div key={course.id} className="group cursor-pointer" onClick={() => onNavigate('catalog')}>
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden mb-6 shadow-2xl transition-all group-hover:-translate-y-2">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-coffee-black via-coffee-black/20 to-transparent opacity-80"></div>
                
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  <div className="bg-coffee-gold/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-tighter">
                    {course.category}
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6 space-y-2">
                  <h3 className="text-2xl font-bold leading-tight">{course.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-coffee-gold font-bold">
                    <Play size={12} className="fill-coffee-gold" /> Conocer más
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-8 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-serif font-bold">Nuestra Comunidad</h2>
          <p className="text-gray-400">Excelencia validada por baristas en todo el mundo</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <TestimonialCard 
            name="Andrés Rivera" 
            role="Barista Head" 
            text="La calidad del video y el material técnico es superior a cualquier otra plataforma que haya probado. CAB cambió mi forma de ver el espresso."
          />
          <TestimonialCard 
            name="Sofia Lopez" 
            role="Emprendedora" 
            text="Gracias al curso de Coffee Business pude abrir mi propia cafetería en solo 6 meses. La guía paso a paso fue fundamental."
          />
          <TestimonialCard 
            name="Marcos Da Silva" 
            role="Entusiasta" 
            text="No sabía nada de café y ahora hago rosettas perfectas. Los instructores son claros y apasionados. Totalmente recomendable."
          />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-coffee-dark/50 py-32 rounded-[4rem] mx-4 border border-white/5">
        <div className="px-8 max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-6xl font-serif font-bold">Planes de Formación</h2>
            <p className="text-gray-400">Selecciona el camino que mejor se adapte a tus metas profesionales</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Solo - Individual */}
            <div className="glass-card p-12 rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-all flex flex-col h-full">
               <div className="space-y-6 flex-1">
                 <div className="text-coffee-gold font-bold text-xs uppercase tracking-widest">Curso Simple</div>
                 <h3 className="text-3xl font-bold">Especialización</h3>
                 <div className="text-5xl font-serif font-bold">$12.000 <span className="text-base font-sans text-gray-500 font-normal">/ curso</span></div>
                 <p className="text-gray-400 text-sm">Perfecto si buscas dominar una técnica específica con acceso ilimitado.</p>
                 <ul className="space-y-5 text-sm">
                   {['Acceso vitalicio', 'Certificado oficial CAB', 'Material descargable HD', 'Foro de consultas'].map(f => (
                     <li key={f} className="flex items-center gap-3 text-gray-300"><CheckCircle size={18} className="text-coffee-gold" /> {f}</li>
                   ))}
                 </ul>
               </div>
               <button className="w-full mt-10 py-5 rounded-2xl border border-white/20 hover:bg-white/5 font-bold transition-all">
                 Elegir Curso
               </button>
            </div>

            {/* Premium - Featured */}
            <div className="bg-white p-12 rounded-[2.5rem] relative overflow-hidden text-coffee-black shadow-2xl lg:scale-105 z-10 flex flex-col h-full">
               <div className="absolute top-0 right-0 bg-coffee-gold text-white px-8 py-3 rounded-bl-3xl font-bold text-xs">RECOMENDADO</div>
               <div className="space-y-6 flex-1">
                 <div className="text-coffee-gold font-bold text-xs uppercase tracking-widest">Membresía Integral</div>
                 <h3 className="text-3xl font-bold">Campus Pass</h3>
                 <div className="text-5xl font-serif font-bold">$5.500 <span className="text-base font-sans text-gray-500 font-normal">/ mes</span></div>
                 <p className="text-gray-700 text-sm">Acceso total a nuestra biblioteca completa y sesiones en vivo semanales.</p>
                 <ul className="space-y-5 text-sm">
                   {['+50 cursos incluidos', 'Talleres en vivo exclusivos', 'Soporte prioritario 1:1', 'Acceso a eventos presenciales', 'Bolsa de trabajo'].map(f => (
                     <li key={f} className="flex items-center gap-3 text-coffee-black font-medium"><CheckCircle size={18} className="text-coffee-gold" /> {f}</li>
                   ))}
                 </ul>
               </div>
               <button className="w-full mt-10 py-5 rounded-2xl bg-coffee-black text-white font-bold transition-all hover:opacity-90 shadow-lg">
                 Suscribirme Ahora
               </button>
            </div>

            {/* Enterprise */}
            <div className="glass-card p-12 rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-all flex flex-col h-full">
               <div className="space-y-6 flex-1">
                 <div className="text-coffee-gold font-bold text-xs uppercase tracking-widest">Empresas & Cafeterías</div>
                 <h3 className="text-3xl font-bold">Team Training</h3>
                 <div className="text-5xl font-serif font-bold">Custom</div>
                 <p className="text-gray-400 text-sm">Formación centralizada para el staff de tu cafetería con métricas de desempeño.</p>
                 <ul className="space-y-5 text-sm">
                   {['Dashboard administrativo', 'Métricas de progreso', 'Custom Branding', 'Asesoría en equipamiento'].map(f => (
                     <li key={f} className="flex items-center gap-3 text-gray-300"><CheckCircle size={18} className="text-coffee-gold" /> {f}</li>
                   ))}
                 </ul>
               </div>
               <button className="w-full mt-10 py-5 rounded-2xl border border-white/20 hover:bg-white/5 font-bold transition-all">
                 Contactar Ventas
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-24 px-8 mt-24 bg-coffee-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="space-y-8">
            <BrandLogo />
            <p className="text-gray-400 text-sm leading-relaxed">
              La institución referente en la cultura del café de especialidad. Formando profesionales desde 2012.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-8">Nuestra Academia</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-coffee-gold transition-colors">Todos los Cursos</a></li>
              <li><a href="#" className="hover:text-coffee-gold transition-colors">Certificaciones Oficiales</a></li>
              <li><a href="#" className="hover:text-coffee-gold transition-colors">Instructores</a></li>
              <li><a href="#" className="hover:text-coffee-gold transition-colors">Metodología</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-8">Soporte</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-coffee-gold transition-colors">Preguntas Frecuentes</a></li>
              <li><a href="#" className="hover:text-coffee-gold transition-colors">Centro de Ayuda</a></li>
              <li><a href="#" className="hover:text-coffee-gold transition-colors">Políticas de Privacidad</a></li>
              <li><a href="#" className="hover:text-coffee-gold transition-colors">Términos y Condiciones</a></li>
            </ul>
          </div>
          <div className="space-y-8">
            <h4 className="font-bold text-white mb-8">Newsletter</h4>
            <div className="space-y-4">
              <p className="text-gray-500 text-sm">Suscríbete para recibir noticias de café y lanzamientos exclusivos.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Tu email" className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-coffee-gold transition-all" />
                <button className="bg-coffee-gold px-6 py-3 rounded-xl font-bold text-sm hover:bg-coffee-goldLight transition-all">OK</button>
              </div>
              <div className="pt-6 border-t border-white/5">
                <button 
                  onClick={() => onNavigate('teacher-login')}
                  className="flex items-center gap-2 text-gray-500 hover:text-coffee-gold transition-colors text-xs font-bold"
                >
                  <Briefcase size={14} /> Portal de Instructores
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 text-xs text-center md:text-left">
          <span>© 2024 Centro Argentino de Baristas Campus. Excelencia en cada grado.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Legal</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
