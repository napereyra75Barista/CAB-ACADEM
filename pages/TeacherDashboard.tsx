
import React from 'react';
import { Course, Instructor, User } from '../types';
import { 
  Users, BarChart3, BookOpen, Plus, 
  MessageSquare, Star, PlayCircle, Eye, 
  ArrowUpRight, Settings, FilePlus, Video, 
  Search, Bell, FileText, Download, Trash2, 
  UploadCloud, FilePieChart, Image as ImageIcon,
  ChevronRight, Filter
} from 'lucide-react';
import { Heading, Text } from '../components/ui/Typography';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

interface TeacherDashboardProps {
  user: User;
  instructorData: Instructor;
  courses: Course[];
  onNavigateCourse: (id: string) => void;
}

type DashboardView = 'overview' | 'materials' | 'analytics';

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ 
  user, 
  instructorData, 
  courses,
  onNavigateCourse 
}) => {
  const [activeView, setActiveView] = React.useState<DashboardView>('overview');
  const [selectedCourseForMaterials, setSelectedCourseForMaterials] = React.useState<string>(instructorData.coursesIds[0]);
  const [isUploading, setIsUploading] = React.useState(false);
  
  const myCourses = courses.filter(c => instructorData.coursesIds.includes(c.id));
  
  const stats = [
    { label: 'Alumnos Totales', value: instructorData.studentsCount.toLocaleString(), trend: '+14%', icon: Users },
    { label: 'Valoración Media', value: instructorData.rating.toString(), trend: '+0.2', icon: Star },
    { label: 'Visualizaciones', value: '45.2k', trend: '+28%', icon: Eye },
    { label: 'Consultas Pendientes', value: '12', trend: '-4', icon: MessageSquare },
  ];

  const mockMaterials = [
    { id: 'mat-1', title: 'Guía de Tueste Avanzado.pdf', size: '4.2 MB', type: 'PDF', date: '12 Mar, 2024' },
    { id: 'mat-2', title: 'Planilla de Costos Cafetería.xlsx', size: '1.5 MB', type: 'XLS', date: '10 Mar, 2024' },
    { id: 'mat-3', title: 'Rueda de Sabores SCA.jpg', size: '8.4 MB', type: 'IMG', date: '05 Mar, 2024' },
    { id: 'mat-4', title: 'Video: Calibración Mahlkönig.mp4', size: '124 MB', type: 'VID', date: '01 Mar, 2024' },
  ];

  const handleSimulatedUpload = () => {
    setIsUploading(true);
    setTimeout(() => setIsUploading(false), 2000);
  };

  const renderOverview = () => (
    <div className="space-y-12 animate-in fade-in duration-500">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card p-8 rounded-[2.5rem] border border-white/5 space-y-4 hover:border-coffee-gold/20 transition-all">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-coffee-gold/10 text-coffee-gold rounded-xl">
                <stat.icon size={22} />
              </div>
              <div className="flex items-center gap-1 text-[10px] font-black text-green-500">
                <ArrowUpRight size={14} /> {stat.trend}
              </div>
            </div>
            <div>
              <div className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</div>
              <div className="text-3xl font-bold text-white mt-1">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Course Management */}
        <div className="lg:col-span-2 space-y-8">
           <div className="flex justify-between items-end">
              <Heading as="h3" className="text-2xl font-serif">Mis Formaciones</Heading>
              <button className="text-xs font-bold text-gray-500 hover:text-white transition-colors">Ver todas</button>
           </div>
           
           <div className="space-y-4">
              {myCourses.map(course => (
                <div 
                  key={course.id} 
                  className="glass-card p-6 rounded-[2rem] border border-white/5 flex flex-col md:flex-row items-center gap-6 group hover:border-white/10 transition-all cursor-pointer"
                  onClick={() => onNavigateCourse(course.id)}
                >
                  <div className="w-full md:w-40 h-24 rounded-2xl overflow-hidden shrink-0">
                    <img src={course.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={course.title} />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="text-lg font-bold text-white group-hover:text-coffee-gold transition-colors">{course.title}</h4>
                      <Badge variant="outline">{course.level}</Badge>
                    </div>
                    <div className="flex items-center gap-6 text-xs text-gray-500 font-medium">
                       <span className="flex items-center gap-1.5"><Users size={14} /> {course.enrollmentCount.toLocaleString()} Alumnos</span>
                       <span className="flex items-center gap-1.5"><PlayCircle size={14} /> {course.modules.length} Módulos</span>
                       <span className="flex items-center gap-1.5"><Star size={14} className="text-coffee-gold" /> {course.rating}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all text-gray-400 hover:text-white" title="Editar Contenido">
                       <Video size={18} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setActiveView('materials'); setSelectedCourseForMaterials(course.id); }}
                      className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all text-gray-400 hover:text-white" title="Añadir Recurso"
                    >
                       <FilePlus size={18} />
                    </button>
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* Recent Student Activity */}
        <div className="space-y-8">
           <Heading as="h3" className="text-2xl font-serif">Actividad Reciente</Heading>
           <div className="glass-card p-8 rounded-[2.5rem] border border-white/5 space-y-6">
              {[
                { user: 'Juan P.', action: 'completó el Módulo 1', course: 'Barista Inicial', time: 'hace 5m' },
                { user: 'Elena M.', action: 'dejó una reseña ★★★★★', course: 'Latte Art', time: 'hace 1h' },
                { user: 'Beto F.', action: 'subió su práctica final', course: 'V60 Master', time: 'hace 3h' },
                { user: 'Lucía S.', action: 'se unió a la clase', course: 'Coffee Business', time: 'ayer' }
              ].map((activity, i) => (
                <div key={i} className="flex gap-4 items-start group cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-coffee-gold/10 flex items-center justify-center font-bold text-coffee-gold text-xs shrink-0">{activity.user[0]}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-white group-hover:text-coffee-gold transition-colors">
                      {activity.user} <span className="font-normal text-gray-400">{activity.action}</span>
                    </div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">{activity.course} • {activity.time}</div>
                  </div>
                </div>
              ))}
              <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-black text-gray-500 hover:text-white transition-all uppercase tracking-widest">Ver Todo el Historial</button>
           </div>

           <div className="bg-coffee-gold/5 p-8 rounded-[2.5rem] border border-coffee-gold/10 space-y-4">
              <Heading as="h4" className="text-lg">Herramientas Docentes</Heading>
              <div className="grid grid-cols-2 gap-4">
                 <button className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center space-y-2 hover:bg-white/10 transition-all group">
                    <Video size={20} className="mx-auto text-coffee-gold group-hover:scale-110 transition-transform" />
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Live Session</div>
                 </button>
                 <button className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center space-y-2 hover:bg-white/10 transition-all group">
                    <BarChart3 size={20} className="mx-auto text-coffee-gold group-hover:scale-110 transition-transform" />
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Analytics</div>
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  const renderMaterials = () => (
    <div className="space-y-10 animate-in slide-in-from-right-8 duration-500">
      <div className="grid lg:grid-cols-4 gap-10">
        {/* Sidebar: Course Selection */}
        <aside className="space-y-6">
          <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-2">Seleccionar Curso</h3>
          <nav className="space-y-2">
            {myCourses.map(course => (
              <button
                key={course.id}
                onClick={() => setSelectedCourseForMaterials(course.id)}
                className={`w-full text-left p-4 rounded-2xl transition-all border ${
                  selectedCourseForMaterials === course.id 
                  ? 'bg-coffee-gold/10 border-coffee-gold/20 text-white' 
                  : 'text-gray-500 hover:bg-white/5 border-transparent hover:text-gray-300'
                }`}
              >
                <div className="text-xs font-bold truncate">{course.title}</div>
                <div className="text-[10px] opacity-60 mt-1">{course.category}</div>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main: Materials Management */}
        <div className="lg:col-span-3 space-y-10">
          {/* Upload Zone */}
          <div className="glass-card p-10 rounded-[3rem] border border-dashed border-white/10 text-center space-y-6 group hover:border-coffee-gold/30 transition-all">
            <div className={`w-20 h-20 rounded-3xl bg-coffee-gold/10 flex items-center justify-center mx-auto transition-transform duration-500 ${isUploading ? 'animate-bounce' : 'group-hover:scale-110'}`}>
              <UploadCloud size={40} className="text-coffee-gold" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Subir Nuevo Material</h3>
              <Text>Arrastra tus archivos aquí o haz clic para buscarlos en tu equipo.</Text>
              <Text className="text-xs">Soporta PDF, XLS, JPG, PNG y MP4 (Máx 500MB)</Text>
            </div>
            <div className="pt-4 flex justify-center">
              <Button onClick={handleSimulatedUpload} disabled={isUploading} className="px-12 h-14 rounded-2xl">
                {isUploading ? 'Procesando Archivo...' : 'Seleccionar Archivos'}
              </Button>
            </div>
          </div>

          {/* Materials List */}
          <div className="space-y-6">
            <div className="flex justify-between items-end px-4">
              <Heading as="h3" className="text-2xl">Archivos de {myCourses.find(c => c.id === selectedCourseForMaterials)?.title}</Heading>
              <div className="flex gap-4">
                <button className="p-2 text-gray-500 hover:text-white transition-colors"><Search size={18} /></button>
                <button className="p-2 text-gray-500 hover:text-white transition-colors"><Filter size={18} /></button>
              </div>
            </div>

            <div className="glass-card rounded-[2.5rem] border border-white/5 overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/5 text-[10px] text-gray-500 uppercase tracking-widest">
                    <th className="px-8 py-6 font-black">Nombre del Recurso</th>
                    <th className="px-8 py-6 font-black">Tipo</th>
                    <th className="px-8 py-6 font-black">Tamaño</th>
                    <th className="px-8 py-6 font-black">Fecha</th>
                    <th className="px-8 py-6 font-black">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {mockMaterials.map(mat => (
                    <tr key={mat.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-white/5 text-gray-400 rounded-xl group-hover:bg-coffee-gold/10 group-hover:text-coffee-gold transition-all">
                            {mat.type === 'PDF' && <FileText size={20} />}
                            {mat.type === 'XLS' && <FilePieChart size={20} />}
                            {mat.type === 'IMG' && <ImageIcon size={20} />}
                            {mat.type === 'VID' && <Video size={20} />}
                          </div>
                          <span className="font-bold text-white text-sm">{mat.title}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <Badge variant="outline">{mat.type}</Badge>
                      </td>
                      <td className="px-8 py-6 text-sm text-gray-500 font-medium">{mat.size}</td>
                      <td className="px-8 py-6 text-sm text-gray-500 font-medium">{mat.date}</td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <button className="p-2 text-gray-600 hover:text-white transition-colors" title="Descargar"><Download size={18} /></button>
                          <button className="p-2 text-gray-600 hover:text-red-400 transition-colors" title="Eliminar"><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-12">
      {/* Header Instructor */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-[2rem] border-2 border-coffee-gold p-1">
              <img src={user.avatar} className="w-full h-full object-cover rounded-[1.8rem]" alt={user.name} />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-coffee-gold p-2 rounded-xl border-4 border-coffee-black text-white cursor-pointer hover:scale-110 transition-transform">
               <Settings size={14} />
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <Heading as="h1" className="text-4xl">{user.name}</Heading>
              <Badge variant="gold">Instructor Elite</Badge>
            </div>
            <Text className="text-gray-400">Panel de control y gestión de contenidos académicos.</Text>
          </div>
        </div>
        
        <div className="flex items-center gap-4 bg-white/5 p-1.5 rounded-2xl border border-white/5">
          <button 
            onClick={() => setActiveView('overview')}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${activeView === 'overview' ? 'bg-coffee-gold text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
          >
            Resumen
          </button>
          <button 
            onClick={() => setActiveView('materials')}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${activeView === 'materials' ? 'bg-coffee-gold text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
          >
            Materiales
          </button>
          <button 
            onClick={() => setActiveView('analytics')}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${activeView === 'analytics' ? 'bg-coffee-gold text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
          >
            Analíticas
          </button>
        </div>
      </div>

      {activeView === 'overview' && renderOverview()}
      {activeView === 'materials' && renderMaterials()}
      {activeView === 'analytics' && (
        <div className="p-32 text-center glass-card rounded-[3rem] border border-dashed border-white/10 opacity-60">
           <BarChart3 size={64} className="mx-auto text-coffee-gold/40 mb-6" />
           <Heading as="h3">Analíticas Detalladas</Heading>
           <Text>Métricas de retención y engagement por lección próximamente.</Text>
        </div>
      )}
    </div>
  );
};
