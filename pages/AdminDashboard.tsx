
import React from 'react';
import { AdminSubPage, Student, Transaction, Course, Instructor } from '../types';
import { TRANSACTIONS } from '../constants';
import { 
  Users, TrendingUp, DollarSign, BookOpen, 
  Search, Filter, ChevronRight, MoreVertical, 
  Plus, AlertCircle, CheckCircle, 
  XCircle, ArrowUpRight, ArrowDownRight,
  ShieldCheck, Globe, Trash2, Ban,
  CreditCard, Receipt, Wallet, Edit3, UserPlus,
  BarChart3, FileText, GraduationCap, Lock,
  // Added missing imports to resolve "Cannot find name" errors
  Star, Settings
} from 'lucide-react';
import { Heading, Text } from '../components/ui/Typography';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

interface AdminDashboardProps {
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  instructors: Instructor[];
  setInstructors: React.Dispatch<React.SetStateAction<Instructor[]>>;
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  onNavigateSubpage?: (sub: AdminSubPage) => void;
  onNavigateSOP?: () => void;
  onNavigateGoogleManual?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  courses,
  setCourses,
  instructors,
  setInstructors,
  students,
  setStudents,
  onNavigateSubpage, 
  onNavigateSOP,
  onNavigateGoogleManual 
}) => {
  const [activeTab, setActiveTab] = React.useState<AdminSubPage | 'instructors'>('overview');
  const [showCourseForm, setShowCourseForm] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const [newCourse, setNewCourse] = React.useState<Partial<Course>>({
    title: '',
    category: 'Fundamentos',
    level: 'Inicial',
    price: '$0',
    instructorName: instructors[0].name,
    instructorId: instructors[0].id,
    durationHours: '0h',
    modules: []
  });

  const kpis = [
    { label: 'Alumnos Activos', value: students.length.toString(), trend: '+12%', up: true, icon: Users },
    { label: 'Ingresos Mensuales', value: '$842.000', trend: '+15%', up: true, icon: DollarSign },
    { label: 'Cursos Publicados', value: courses.length.toString(), trend: '+2', up: true, icon: BookOpen },
    { label: 'Tasa de Éxito', value: '72%', trend: '-2%', up: false, icon: CheckCircle },
  ];

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const courseToAdd: Course = {
      ...newCourse as Course,
      id: `c-${Date.now()}`,
      thumbnail: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=800',
      progress: 0,
      tags: [],
      enrollmentCount: 0,
      rating: 5.0,
      recommendationCount: 0,
      modules: [],
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCourses([...courses, courseToAdd]);
    setShowCourseForm(false);
    setNewCourse({
      title: '',
      category: 'Fundamentos',
      level: 'Inicial',
      price: '$0',
      instructorName: instructors[0].name,
      instructorId: instructors[0].id,
      durationHours: '0h',
      modules: []
    });
  };

  const updateStudentStatus = (id: string, status: Student['status']) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  };

  const renderOverview = () => (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button onClick={onNavigateSOP} className="glass-card p-6 rounded-3xl border border-white/5 flex items-center gap-4 hover:border-coffee-gold/30 transition-all text-left">
          <div className="p-3 bg-coffee-gold/10 text-coffee-gold rounded-2xl"><FileText size={24} /></div>
          <div><div className="font-bold text-white">Manual SOP</div><div className="text-xs text-gray-500">Procesos internos</div></div>
        </button>
        <button onClick={onNavigateGoogleManual} className="glass-card p-6 rounded-3xl border border-white/5 flex items-center gap-4 hover:border-coffee-gold/30 transition-all text-left">
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl"><Globe size={24} /></div>
          <div><div className="font-bold text-white">Google Campus</div><div className="text-xs text-gray-500">Workspace & Classroom</div></div>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <div key={i} className="glass-card p-8 rounded-[2rem] border border-white/5 space-y-4">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-coffee-gold/10 text-coffee-gold rounded-xl"><kpi.icon size={24} /></div>
              <div className={`flex items-center gap-1 text-xs font-bold ${kpi.up ? 'text-green-500' : 'text-red-500'}`}>
                {kpi.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {kpi.trend}
              </div>
            </div>
            <div>
              <div className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{kpi.label}</div>
              <div className="text-3xl font-bold text-white mt-1">{kpi.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCourses = () => (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <Heading as="h2" className="text-2xl">Gestión de Catálogo</Heading>
        <Button onClick={() => setShowCourseForm(true)} className="gap-2"><Plus size={18} /> Nuevo Curso</Button>
      </div>
      {showCourseForm && (
        <div className="glass-card p-8 rounded-[2rem] border border-coffee-gold/30">
          <form onSubmit={handleCreateCourse} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input type="text" placeholder="Título" required className="bg-white/5 border border-white/10 rounded-xl px-4 py-3" value={newCourse.title} onChange={e => setNewCourse({...newCourse, title: e.target.value})} />
            <select className="bg-coffee-dark border border-white/10 rounded-xl px-4 py-3" value={newCourse.category} onChange={e => setNewCourse({...newCourse, category: e.target.value})}>
              <option>Fundamentos</option><option>Técnica</option><option>Negocios</option>
            </select>
            <input type="text" placeholder="Precio" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3" value={newCourse.price} onChange={e => setNewCourse({...newCourse, price: e.target.value})} />
            <div className="md:col-span-3 flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setShowCourseForm(false)}>Cancelar</Button>
              <Button type="submit">Publicar</Button>
            </div>
          </form>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(c => (
          <div key={c.id} className="glass-card p-6 rounded-3xl border border-white/5 flex gap-4 items-center">
            <img src={c.thumbnail} className="w-20 h-20 rounded-2xl object-cover" alt="" />
            <div className="flex-1">
              <h4 className="font-bold text-white">{c.title}</h4>
              <div className="text-xs text-gray-500 font-bold">{c.price} • {c.enrollmentCount} alumnos</div>
            </div>
            <button onClick={() => setCourses(courses.filter(x => x.id !== c.id))} className="text-red-500 p-2 hover:bg-red-500/10 rounded-xl transition-colors"><Trash2 size={18} /></button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStudents = () => (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <Heading as="h2" className="text-2xl">Base de Alumnos</Heading>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input type="text" placeholder="Buscar alumno..." className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
      </div>
      <div className="glass-card rounded-[2rem] border border-white/5 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-[10px] text-gray-500 uppercase tracking-widest font-black">
            <tr>
              <th className="px-8 py-4">Alumno</th>
              <th className="px-8 py-4">Progreso Medio</th>
              <th className="px-8 py-4">Estado</th>
              <th className="px-8 py-4">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {students.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())).map(s => (
              <tr key={s.id} className="hover:bg-white/[0.02]">
                <td className="px-8 py-4">
                  <div className="font-bold text-white">{s.name}</div>
                  <div className="text-xs text-gray-500">{s.email}</div>
                </td>
                <td className="px-8 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden max-w-[100px]">
                      <div className="bg-coffee-gold h-full" style={{ width: `${s.completionRate}%` }}></div>
                    </div>
                    <span className="text-xs text-gray-400 font-bold">{s.completionRate}%</span>
                  </div>
                </td>
                <td className="px-8 py-4">
                  <Badge variant={s.status === 'active' ? 'green' : 'outline'}>{s.status}</Badge>
                </td>
                <td className="px-8 py-4 flex gap-2">
                  <button onClick={() => updateStudentStatus(s.id, s.status === 'active' ? 'inactive' : 'active')} className="p-2 text-gray-500 hover:text-white"><Ban size={16} /></button>
                  <button className="p-2 text-gray-500 hover:text-white"><Edit3 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderInstructors = () => (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <Heading as="h2" className="text-2xl">Cuerpo Docente</Heading>
        <Button className="gap-2"><UserPlus size={18} /> Nuevo Profesor</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {instructors.map(inst => (
          <div key={inst.id} className="glass-card p-8 rounded-[2.5rem] border border-white/5 flex gap-6 items-center">
            <img src={inst.avatar} className="w-20 h-20 rounded-[1.5rem] object-cover border border-coffee-gold/30" alt="" />
            <div className="flex-1 space-y-1">
              <h4 className="text-xl font-bold text-white">{inst.name}</h4>
              <div className="text-xs text-coffee-gold font-bold uppercase tracking-widest">{inst.role}</div>
              <div className="flex items-center gap-4 text-xs text-gray-500 pt-2">
                <span className="flex items-center gap-1"><Star size={12} className="text-coffee-gold"/> {inst.rating}</span>
                <span className="flex items-center gap-1"><Users size={12}/> {inst.studentsCount}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button className="p-3 bg-white/5 rounded-xl text-gray-400 hover:text-white"><Settings size={18} /></button>
              <button className="p-3 bg-white/5 rounded-xl text-gray-400 hover:text-red-500"><Ban size={18} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-coffee-gold font-black text-[10px] uppercase tracking-[0.4em]">
             <ShieldCheck size={14} fill="currentColor" /> General Admin Console
          </div>
          <Heading as="h1" className="text-4xl md:text-5xl">Centro de Control</Heading>
        </div>
        <div className="flex items-center gap-2 bg-coffee-dark border border-white/5 p-1.5 rounded-2xl overflow-x-auto max-w-full">
          {[
            { id: 'overview', icon: TrendingUp, label: 'Resumen' },
            { id: 'students', icon: Users, label: 'Alumnos' },
            { id: 'instructors', icon: GraduationCap, label: 'Profesores' },
            { id: 'courses', icon: BookOpen, label: 'Catálogo' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-coffee-gold text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
            >
              <tab.icon size={14} /> {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'students' && renderStudents()}
      {activeTab === 'instructors' && renderInstructors()}
      {activeTab === 'courses' && renderCourses()}
    </div>
  );
};
