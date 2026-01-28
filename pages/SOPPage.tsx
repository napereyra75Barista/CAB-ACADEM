
import React from 'react';
import { Heading, Text } from '../components/ui/Typography';
import { 
  FileText, Users, PlayCircle, ShieldCheck, 
  BarChart, Layers, CheckSquare, Settings, 
  ArrowRight, UserCheck, Zap, BookOpen 
} from 'lucide-react';
// Added Badge import to resolve "Cannot find name 'Badge'" error
import { Badge } from '../components/ui/Badge';

export const SOPPage: React.FC = () => {
  const [activeSection, setActiveSection] = React.useState('estructura');

  const sections = [
    { id: 'estructura', title: 'Estructura Organizacional', icon: Users },
    { id: 'contenido', title: 'Flujo de Contenido', icon: PlayCircle },
    { id: 'publicacion', title: 'Publicación & Checklist', icon: CheckSquare },
    { id: 'alumnos', title: 'Gestión de Alumnos', icon: UserCheck },
    { id: 'calidad', title: 'Control de Calidad', icon: ShieldCheck },
    { id: 'seguridad', title: 'Seguridad & Backup', icon: Settings },
    { id: 'kpis', title: 'KPIs Académicos', icon: BarChart },
    { id: 'escalabilidad', title: 'Escalabilidad B2B', icon: Layers },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 border-b border-white/5 pb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-coffee-gold font-black text-[10px] uppercase tracking-[0.4em]">
             <FileText size={14} fill="currentColor" /> Documentación Interna v2.4
          </div>
          <Heading as="h1" className="text-5xl md:text-6xl font-serif">SOP: Academy Operations</Heading>
          <Text className="text-lg max-w-2xl">Standard Operating Procedures manual for Centro Argentino de Baristas Campus. Prohibida su distribución externa sin autorización del Directorio Académico.</Text>
        </div>
        <div className="bg-coffee-gold/10 border border-coffee-gold/20 p-6 rounded-3xl space-y-2">
           <div className="text-[10px] font-black text-coffee-gold uppercase tracking-widest">Estado del Documento</div>
           <div className="flex items-center gap-2 text-white font-bold">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Vigente - Año Académico 2024
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-12">
        {/* Navigation Sidebar */}
        <aside className="lg:sticky lg:top-12 h-fit space-y-2">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all border ${
                activeSection === section.id 
                ? 'bg-coffee-gold text-white border-coffee-gold shadow-lg shadow-coffee-gold/10' 
                : 'text-gray-500 border-transparent hover:bg-white/5 hover:text-white'
              }`}
            >
              <section.icon size={18} />
              {section.title}
            </button>
          ))}
        </aside>

        {/* Content Area */}
        <div className="lg:col-span-3 glass-card p-12 rounded-[3.5rem] border border-white/5 space-y-16 min-h-[600px]">
          
          {activeSection === 'estructura' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-4">
              <Heading as="h2" className="text-3xl">1. Estructura Organizacional</Heading>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  { role: 'Director Académico', desc: 'Define la estrategia curricular, aprueba nuevos programas y audita la calidad docente trimestralmente.' },
                  { role: 'Profesor / Lead Barista', desc: 'Responsable de la entrega técnica, grabación de módulos y moderación de dudas complejas en comunidad.' },
                  { role: 'Content Manager', desc: 'Edición de video, diseño de assets descargables (PDF), guionizado y optimización de metadatos SEO.' },
                  { role: 'Operations & Support', desc: 'Soporte técnico nivel 1, onboarding de nuevos alumnos y gestión de facturación/pagos.' }
                ].map((role, i) => (
                  <div key={i} className="p-8 bg-white/5 rounded-3xl border border-white/5 space-y-3">
                    <div className="text-coffee-gold font-black text-[10px] uppercase tracking-widest">ROL ACADÉMICO</div>
                    <div className="text-xl font-bold text-white">{role.role}</div>
                    <Text className="text-sm">{role.desc}</Text>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'contenido' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-4">
              <Heading as="h2" className="text-3xl">2. Flujo de Creación de Contenido</Heading>
              <div className="space-y-4">
                {[
                  { step: '01. Conceptualización', actor: 'Director Académico', desc: 'Definición de temario y objetivos pedagógicos.' },
                  { step: '02. Producción', actor: 'Profesor', desc: 'Grabación de lecciones en set con iluminación 3-puntos y audio 48kHz.' },
                  { step: '03. Post-Producción', actor: 'Content Manager', desc: 'Edición, color grading y creación de material de soporte (PDF).' },
                  { step: '04. Auditoría QA', actor: 'Director Académico', desc: 'Revisión final de precisión técnica y narrativa.' }
                ].map((s, i) => (
                  <div key={i} className="flex items-start gap-8 p-6 hover:bg-white/[0.02] rounded-3xl transition-all group">
                    <div className="text-2xl font-black text-gray-700 group-hover:text-coffee-gold transition-colors">{s.step.split('.')[0]}</div>
                    <div className="flex-1 space-y-1">
                      <div className="text-lg font-bold text-white">{s.step.split('. ')[1]}</div>
                      <div className="text-xs text-coffee-gold font-bold uppercase">{s.actor}</div>
                      <Text className="text-sm">{s.desc}</Text>
                    </div>
                    {i < 3 && <ArrowRight className="text-gray-800 mt-4" size={20} />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'publicacion' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-4">
              <Heading as="h2" className="text-3xl">3. Checklist de Publicación</Heading>
              <div className="bg-coffee-dark border border-white/5 rounded-[2.5rem] overflow-hidden">
                <div className="bg-white/5 p-6 border-b border-white/5 flex justify-between items-center">
                   <div className="font-bold text-sm">Validación Final de Release</div>
                   <Badge variant="gold">Critico</Badge>
                </div>
                <div className="p-8 space-y-4">
                  {[
                    'Video: Formato MP4, Codec H.264, Bitrate > 5Mbps.',
                    'Audio: Niveles normalizados a -14 LUFS sin ruido de fondo.',
                    'Recursos: Al menos 1 PDF descargable por módulo.',
                    'Evaluación: Examen final de módulo configurado (min 70% aprobación).',
                    'Transmisión: Verificación de acceso vía CDN global.',
                    'Certificado: Plantilla de firma docente actualizada.'
                  ].map((check, i) => (
                    <label key={i} className="flex items-center gap-4 p-4 hover:bg-white/5 rounded-2xl cursor-pointer transition-all">
                      <input type="checkbox" className="w-5 h-5 rounded border-white/10 bg-white/5 text-coffee-gold focus:ring-coffee-gold" />
                      <span className="text-gray-300 text-sm font-medium">{check}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'kpis' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-4">
              <Heading as="h2" className="text-3xl">7. Métricas de Éxito Académico</Heading>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  { label: 'Completion Rate', goal: '65%', desc: 'Porcentaje de alumnos que finalizan el curso vs inscritos.' },
                  { label: 'Average Watch Time', goal: '18m', desc: 'Tiempo promedio de sesión por lección activa.' },
                  { label: 'NPS (Satisfacción)', goal: '9.2', desc: 'Puntuación promedio otorgada en encuestas post-curso.' },
                  { label: 'Forum Engagement', goal: '1.2x', desc: 'Ratio de respuestas útiles por cada hilo abierto.' }
                ].map((kpi, i) => (
                  <div key={i} className="p-10 bg-white/5 rounded-[2.5rem] border border-white/5 text-center space-y-4">
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">{kpi.label}</div>
                    <div className="text-5xl font-black text-white">{kpi.goal}</div>
                    <div className="h-1 w-12 bg-coffee-gold mx-auto rounded-full"></div>
                    <Text className="text-sm px-4">{kpi.desc}</Text>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fallback for other sections - simulated */}
          {!['estructura', 'contenido', 'publicacion', 'kpis'].includes(activeSection) && (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6 opacity-40">
               <Zap size={64} className="text-coffee-gold" />
               <div className="space-y-2">
                 <Heading as="h3">Sección en Revisión</Heading>
                 <Text>El departamento de Operaciones está actualizando este protocolo.</Text>
               </div>
            </div>
          )}

        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="p-12 glass-card rounded-[3rem] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
           <div className="p-4 bg-white/5 rounded-2xl text-coffee-gold">
             <BookOpen size={32} />
           </div>
           <div className="space-y-1">
              <div className="font-bold text-white">Herramientas Recomendadas</div>
              <Text className="text-sm">Notion (SOP), Slack (Comms), Jira (Contenido), Vimeo (Hosting).</Text>
           </div>
        </div>
        <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold hover:text-white transition-all">
          Descargar PDF Manual Completo
        </button>
      </div>
    </div>
  );
};
