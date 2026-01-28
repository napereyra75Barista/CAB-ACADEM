
import React from 'react';
import { Heading, Text } from '../components/ui/Typography';
import { 
  Globe, Shield, Layout, Upload, UserPlus, 
  Settings, CheckCircle, AlertTriangle, 
  Database, Video, FileText, Mail, ChevronRight,
  BookOpen, ArrowLeft
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';

export const GoogleCampusManual: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-16 py-12 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 border-b border-white/5 pb-12">
        <div className="space-y-4">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-coffee-gold font-bold text-xs uppercase tracking-widest hover:text-white transition-colors"
          >
            <ArrowLeft size={16} /> Volver a Admin
          </button>
          <div className="flex items-center gap-3 text-coffee-gold font-black text-[10px] uppercase tracking-[0.4em]">
             <Globe size={14} fill="currentColor" /> Estrategia EdTech 2024
          </div>
          <Heading as="h1" className="text-5xl md:text-6xl font-serif">Implementación Google Campus</Heading>
          <Text className="text-xl max-w-3xl">Manual Maestro de Operaciones para el despliegue de Centro Argentino de Baristas sobre Google Workspace for Education.</Text>
        </div>
        <div className="glass-card p-6 rounded-3xl text-center space-y-2 min-w-[200px]">
           <Badge variant="gold">Confidencial</Badge>
           <div className="text-white font-bold text-lg mt-2">v1.0 Internal</div>
        </div>
      </div>

      {/* 1. Arquitectura */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
           <div className="p-4 bg-coffee-gold/10 text-coffee-gold rounded-2xl"><Shield size={32} /></div>
           <Heading as="h2" className="text-3xl">1. Arquitectura del Sistema</Heading>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-card p-8 rounded-[2.5rem] border border-white/5 space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Database size={20} className="text-coffee-gold" /> Google Workspace Setup
            </h3>
            <Text>El dominio principal debe ser <strong>@centroargentinodebaristas.com</strong>. Se requiere la edición <em>Education Fundamentals</em> (gratuita para instituciones elegibles) o <em>Standard</em>.</Text>
            <ul className="space-y-3 pt-4">
              <li className="flex items-start gap-3 text-sm text-gray-300"><CheckCircle size={16} className="text-green-500 shrink-0" /> Organización por Unidades Organizativas (OU): Profesores, Alumnos, Staff.</li>
              <li className="flex items-start gap-3 text-sm text-gray-300"><CheckCircle size={16} className="text-green-500 shrink-0" /> Cloud Identity para gestión de accesos sin licencias de email innecesarias.</li>
            </ul>
          </div>
          <div className="glass-card p-8 rounded-[2.5rem] border border-white/5 space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
               <Mail size={20} className="text-coffee-gold" /> Convención de Cuentas
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="text-[10px] font-black text-gray-500 uppercase">Profesores</div>
                <code className="text-coffee-gold font-mono">nombre.apellido@centroargentino...</code>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="text-[10px] font-black text-gray-500 uppercase">Alumnos</div>
                <code className="text-white font-mono">ID_ALUMNO@centroargentino...</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Login y Onboarding */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
           <div className="p-4 bg-coffee-gold/10 text-coffee-gold rounded-2xl"><UserPlus size={32} /></div>
           <Heading as="h2" className="text-3xl">2. Login y Gestión de Usuarios</Heading>
        </div>
        <div className="p-10 glass-card rounded-[3rem] border border-white/5">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h4 className="font-bold text-white">Carga Masiva</h4>
              <Text className="text-sm">Uso de archivos CSV en la Consola de Admin para crear hasta 500 alumnos por vez. Automatizar mediante Google Sheets y Apps Script si el volumen escala.</Text>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-white">Seguridad</h4>
              <Text className="text-sm">Obligatoriedad de 2FA (Autenticación de dos pasos) para Profesores y Administradores. Recuperación de cuenta vía teléfono corporativo.</Text>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-white">Políticas</h4>
              <Text className="text-sm">Restringir Classroom solo a cuentas del dominio. Evitar que alumnos usen cuentas personales @gmail.com para proteger el contenido.</Text>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Estructura de Clase */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
           <div className="p-4 bg-coffee-gold/10 text-coffee-gold rounded-2xl"><Layout size={32} /></div>
           <Heading as="h2" className="text-3xl">3. Arquitectura de Aula (Classroom)</Heading>
        </div>
        <Text className="text-lg">Cada curso en el Campus Digital debe seguir esta estructura simétrica para garantizar la experiencia de usuario:</Text>
        
        <div className="grid lg:grid-cols-4 gap-6">
           {['Bienvenida', 'Módulo 1: Teoría', 'Módulo 2: Práctica', 'Evaluación Final'].map((tema, i) => (
             <div key={i} className="bg-coffee-dark border border-white/5 p-6 rounded-3xl space-y-4">
                <div className="text-coffee-gold font-black text-[10px] uppercase">Tema Classroom</div>
                <div className="text-lg font-bold text-white">{tema}</div>
                <div className="space-y-2">
                   <div className="flex items-center gap-2 text-xs text-gray-500"><Video size={12}/> Video Clase</div>
                   <div className="flex items-center gap-2 text-xs text-gray-500"><FileText size={12}/> Material PDF</div>
                   <div className="flex items-center gap-2 text-xs text-gray-500"><CheckCircle size={12}/> Tarea de Entrega</div>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* 4. Workflow Profesor */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
           <div className="p-4 bg-coffee-gold/10 text-coffee-gold rounded-2xl"><Upload size={32} /></div>
           <Heading as="h2" className="text-3xl">4. Guía para el Cuerpo Docente</Heading>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Subida de Información</h4>
            <div className="space-y-4">
              <div className="flex gap-4 p-5 bg-white/5 rounded-2xl border border-white/5">
                 <div className="shrink-0 w-8 h-8 rounded-full bg-coffee-gold flex items-center justify-center font-bold text-white">1</div>
                 <Text className="text-sm font-medium text-gray-200">Vídeos: Subir a <strong>YouTube</strong> como "Oculto" dentro de una cuenta de Marca de la Academia.</Text>
              </div>
              <div className="flex gap-4 p-5 bg-white/5 rounded-2xl border border-white/5">
                 <div className="shrink-0 w-8 h-8 rounded-full bg-coffee-gold flex items-center justify-center font-bold text-white">2</div>
                 <Text className="text-sm font-medium text-gray-200">Materiales: Crear carpeta en <strong>Shared Drive</strong> para que el Profe no sea "dueño" del archivo, sino la Academia.</Text>
              </div>
              <div className="flex gap-4 p-5 bg-white/5 rounded-2xl border border-white/5">
                 <div className="shrink-0 w-8 h-8 rounded-full bg-coffee-gold flex items-center justify-center font-bold text-white">3</div>
                 <Text className="text-sm font-medium text-gray-200">Tareas: Configurar "Guía de Evaluación" para criterios de Latte Art o Calibración.</Text>
              </div>
            </div>
          </div>
          <div className="space-y-6">
             <h4 className="text-xl font-bold text-white">Checklist del Alumno</h4>
             <div className="glass-card p-8 rounded-[2.5rem] border border-white/5 space-y-4">
                {[
                  'Unirse mediante invitación por email institucional.',
                  'Descargar App de Classroom en móviles.',
                  'Consumir video y descargar guía de estudio.',
                  'Subir video/foto de su práctica barista.',
                  'Completar examen en Google Forms.'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="w-5 h-5 border border-white/20 rounded flex items-center justify-center"><ChevronRight size={12}/></div>
                    {item}
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* Workflow Diagram */}
      <section className="bg-coffee-gold/5 border border-coffee-gold/20 p-12 rounded-[3.5rem] space-y-10">
         <div className="text-center space-y-2">
            <Heading as="h3">Flujo Académico CABA Digital</Heading>
            <Text>El ciclo de vida de una lección en el campus.</Text>
         </div>
         <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
            <div className="flex flex-col items-center gap-4">
               <div className="p-6 bg-coffee-dark border border-coffee-gold rounded-full text-coffee-gold font-bold">PRODUCCIÓN</div>
               <Text className="text-xs text-center">Profe sube Video<br/>+ Material</Text>
            </div>
            <ChevronRight className="rotate-90 md:rotate-0 text-coffee-gold/40" size={32} />
            <div className="flex flex-col items-center gap-4">
               <div className="p-6 bg-coffee-dark border border-coffee-gold rounded-full text-coffee-gold font-bold">CONSUMO</div>
               <Text className="text-xs text-center">Alumno ve clase<br/>y estudia PDF</Text>
            </div>
            <ChevronRight className="rotate-90 md:rotate-0 text-coffee-gold/40" size={32} />
            <div className="flex flex-col items-center gap-4">
               <div className="p-6 bg-coffee-dark border border-coffee-gold rounded-full text-coffee-gold font-bold">ENTREGA</div>
               <Text className="text-xs text-center">Alumno sube<br/>su práctica</Text>
            </div>
            <ChevronRight className="rotate-90 md:rotate-0 text-coffee-gold/40" size={32} />
            <div className="flex flex-col items-center gap-4">
               <div className="p-6 bg-coffee-gold text-white rounded-full font-bold shadow-lg shadow-coffee-gold/20">FEEDBACK</div>
               <Text className="text-xs text-center">Profe califica<br/>y comenta</Text>
            </div>
         </div>
      </section>

      {/* Limitations and Future */}
      <section className="grid md:grid-cols-2 gap-12">
         <div className="space-y-6">
            <Heading as="h3" className="text-2xl flex items-center gap-3"><AlertTriangle className="text-amber-500" /> Limitaciones Actuales</Heading>
            <ul className="space-y-4">
               <li className="text-sm text-gray-400"><strong>Alumnos:</strong> Máximo 1,000 por clase (suficiente para CABA hoy).</li>
               <li className="text-sm text-gray-400"><strong>Hosting:</strong> Almacenamiento limitado en Drive básico (requiere suscripción Standard).</li>
               <li className="text-sm text-gray-400"><strong>White Label:</strong> No se puede remover el branding de Google Classroom completamente.</li>
            </ul>
         </div>
         <div className="space-y-6">
            <Heading as="h3" className="text-2xl flex items-center gap-3"><BookOpen className="text-coffee-gold" /> Escalabilidad</Heading>
            <Text className="text-sm">Cuando superemos los 5,000 alumnos activos, se recomienda migrar el contenido a un LMS propietario (LXP) manteniendo el SSO (Single Sign On) de Google para no perder las cuentas creadas.</Text>
         </div>
      </section>

      {/* Checklist Implementation */}
      <div className="p-12 glass-card rounded-[3rem] border border-white/5 bg-coffee-dark/40">
        <h3 className="text-2xl font-bold text-white mb-8">Checklist de Lanzamiento</h3>
        <div className="grid md:grid-cols-2 gap-6">
           {[
             'Validar dominio en Google Admin Panel',
             'Configurar Cuentas de Profesores (2FA activo)',
             'Crear Classroom "Barista Inicial" (Master)',
             'Vincular Drive Compartido de la Academia',
             'Probar flujo de corrección con cuenta test',
             'Generar PDF con claves de acceso para alumnos'
           ].map((task, i) => (
             <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="w-6 h-6 rounded border border-coffee-gold/40 flex items-center justify-center text-coffee-gold"><CheckCircle size={14}/></div>
                <span className="text-sm font-medium text-gray-300">{task}</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};
