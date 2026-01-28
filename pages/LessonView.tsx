
import React from 'react';
import { Course, Lesson, UserRole, PracticalTask } from '../types';
import { 
  ChevronLeft, 
  ChevronRight, 
  FileDown, 
  MessageCircle, 
  Info, 
  CheckCircle, 
  Play, 
  Plus, 
  Calendar, 
  ClipboardCheck,
  Trophy,
  Users,
  Send,
  Trash2,
  AlertCircle
} from 'lucide-react';
import { Heading, Text } from '../components/ui/Typography';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

interface LessonViewProps {
  course: Course;
  currentLessonId: string;
  practicalTasks: PracticalTask[];
  onAddTask: (task: PracticalTask) => void;
  onDeleteTask: (taskId: string) => void;
  onBack: () => void;
  onNavigateLesson: (id: string) => void;
  onToggleCompletion: (id: string) => void;
  userRole?: UserRole;
}

export const LessonView: React.FC<LessonViewProps> = ({
  course,
  currentLessonId,
  practicalTasks,
  onAddTask,
  onDeleteTask,
  onBack,
  onNavigateLesson,
  onToggleCompletion,
  userRole = 'student'
}) => {
  const [activeTab, setActiveTab] = React.useState<'info' | 'recursos' | 'comunidad'>('info');
  const [showTaskForm, setShowTaskForm] = React.useState(false);

  // Form State for new Task
  const [taskTitle, setTaskTitle] = React.useState('');
  const [taskDesc, setTaskDesc] = React.useState('');
  const [taskDueDate, setTaskDueDate] = React.useState('');
  const [newCriterion, setNewCriterion] = React.useState('');
  const [criteria, setCriteria] = React.useState<string[]>([]);

  // Find current lesson and module
  let currentLesson: Lesson | undefined;
  let currentModuleIdx = -1;
  let currentLessonIdx = -1;

  course.modules.forEach((m, mIdx) => {
    const lIdx = m.lessons.findIndex(l => l.id === currentLessonId);
    if (lIdx !== -1) {
      currentLesson = m.lessons[lIdx];
      currentModuleIdx = mIdx;
      currentLessonIdx = lIdx;
    }
  });

  if (!currentLesson) return <div className="p-20 text-center text-gray-500">Lección no encontrada</div>;

  const handleAddTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim() || !taskDesc.trim()) return;

    const newTask: PracticalTask = {
      id: `task-${Date.now()}`,
      lessonId: currentLessonId,
      title: taskTitle,
      description: taskDesc,
      dueDate: taskDueDate,
      criteria: criteria,
      createdAt: new Date().toISOString()
    };
    
    onAddTask(newTask);
    setTaskTitle('');
    setTaskDesc('');
    setTaskDueDate('');
    setCriteria([]);
    setShowTaskForm(false);
  };

  const addCriterion = () => {
    if (newCriterion.trim() && !criteria.includes(newCriterion.trim())) {
      setCriteria([...criteria, newCriterion.trim()]);
      setNewCriterion('');
    }
  };

  const isInstructor = userRole === 'teacher' || userRole === 'admin';

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
       {/* Breadcrumbs & Navigation */}
       <div className="flex items-center justify-between">
         <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.2em]">
           <ChevronLeft size={16} /> Volver al Curso
         </button>
         <div className="flex items-center gap-4">
           <div className="hidden md:block text-right">
             <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Contenido actual</div>
             <div className="text-sm font-bold text-white">{currentLesson.title}</div>
           </div>
           <button 
             onClick={() => onToggleCompletion(currentLessonId)}
             className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
               currentLesson.isCompleted 
               ? 'bg-green-500/10 text-green-500 border-green-500/20' 
               : 'bg-coffee-gold text-white border-coffee-gold shadow-lg shadow-coffee-gold/20'
             }`}
           >
             {currentLesson.isCompleted ? <><CheckCircle size={14} /> Completada</> : 'Completar Lección'}
           </button>
         </div>
       </div>

       {/* Video Player Section */}
       <div className="aspect-video w-full bg-black rounded-[2.5rem] overflow-hidden shadow-2xl relative border border-white/5 group">
          <div className="absolute inset-0 flex items-center justify-center bg-coffee-dark/50">
             <div className="w-20 h-20 bg-coffee-gold/20 rounded-full flex items-center justify-center backdrop-blur-md border border-coffee-gold/30 group-hover:scale-110 transition-all cursor-pointer">
                <Play size={40} className="text-coffee-gold fill-current ml-1" />
             </div>
          </div>
          <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between z-10">
             <div className="flex items-center gap-4">
                <button className="p-3 bg-white/10 backdrop-blur rounded-full text-white hover:bg-white/20 transition-all"><ChevronLeft size={20}/></button>
                <button className="p-3 bg-white/10 backdrop-blur rounded-full text-white hover:bg-white/20 transition-all"><ChevronRight size={20}/></button>
             </div>
             <div className="text-[10px] font-black text-white/70 bg-black/40 backdrop-blur px-5 py-2.5 rounded-full border border-white/10 uppercase tracking-widest">
               {currentLesson.duration} • 1080p Ultra HD
             </div>
          </div>
       </div>

       {/* Tabs Section */}
       <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
             <div className="flex gap-10 border-b border-white/5 pb-4 overflow-x-auto scrollbar-hide">
               {['info', 'recursos', 'comunidad'].map((tab) => (
                 <button 
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`text-sm font-black uppercase tracking-[0.2em] transition-all relative whitespace-nowrap pb-2 ${
                    activeTab === tab ? 'text-coffee-gold' : 'text-gray-600 hover:text-white'
                  }`}
                 >
                   {tab}
                   {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-coffee-gold"></div>}
                 </button>
               ))}
             </div>

             {activeTab === 'info' && (
               <div className="space-y-6 animate-in fade-in slide-in-from-top-2">
                 <Heading as="h2" className="text-3xl font-serif">{currentLesson.title}</Heading>
                 <Text className="text-lg leading-relaxed text-gray-300">
                   {currentLesson.summary || "En esta lección profundizaremos en los aspectos técnicos fundamentales para lograr una extracción equilibrada y consistente bajo estándares de especialidad."}
                 </Text>
                 <div className="grid grid-cols-2 gap-4 py-8 border-t border-white/5">
                    <div className="flex items-center gap-4">
                       <div className="p-3.5 bg-white/5 text-coffee-gold rounded-2xl border border-white/5"><Info size={20} /></div>
                       <div>
                         <div className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Nivel Requerido</div>
                         <div className="text-sm font-bold text-white">{course.level}</div>
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="p-3.5 bg-white/5 text-coffee-gold rounded-2xl border border-white/5"><Trophy size={20} /></div>
                       <div>
                         <div className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Recompensa</div>
                         <div className="text-sm font-bold text-white">+50 XP Académicos</div>
                       </div>
                    </div>
                 </div>
               </div>
             )}

             {activeTab === 'recursos' && (
               <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                 {[1, 2].map(i => (
                    <div key={i} className="glass-card p-6 rounded-[2rem] flex items-center justify-between border border-white/5 hover:border-coffee-gold/20 transition-all cursor-pointer group">
                       <div className="flex items-center gap-5">
                          <div className="p-4 bg-white/5 text-gray-600 rounded-2xl group-hover:text-coffee-gold transition-colors"><FileDown size={24} /></div>
                          <div>
                            <div className="font-bold text-white group-hover:text-coffee-gold transition-colors">Guía de Entrenamiento L{i}.pdf</div>
                            <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-1">SCA Protocol • 4.5 MB</div>
                          </div>
                       </div>
                       <button className="p-3 text-gray-600 hover:text-white transition-colors bg-white/5 rounded-xl"><FileDown size={18}/></button>
                    </div>
                 ))}
               </div>
             )}

             {activeTab === 'comunidad' && (
               <div className="space-y-12 animate-in fade-in slide-in-from-top-2">
                 {/* Instructor Task Creation Panel */}
                 {isInstructor && (
                   <div className="space-y-6">
                     <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 bg-coffee-gold/10 text-coffee-gold rounded-xl"><ClipboardCheck size={20} /></div>
                          <h3 className="text-lg font-bold text-white">Gestión de Prácticas</h3>
                        </div>
                        <Button 
                          variant={showTaskForm ? "ghost" : "primary"}
                          size="sm"
                          onClick={() => setShowTaskForm(!showTaskForm)}
                        >
                          {showTaskForm ? "Cerrar Editor" : <><Plus size={16} className="mr-2"/> Asignar Tarea</>}
                        </Button>
                     </div>

                     {showTaskForm && (
                       <div className="glass-card p-8 rounded-[2.5rem] border border-coffee-gold/20 bg-coffee-gold/[0.02] space-y-8 animate-in zoom-in-95 duration-300">
                         <div className="space-y-6">
                            <div className="space-y-2">
                              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Nombre de la Actividad</label>
                              <input 
                                type="text" 
                                value={taskTitle}
                                onChange={e => setTaskTitle(e.target.value)}
                                placeholder="Ej: Calibración de Molino y Análisis Sensorial"
                                className="w-full bg-coffee-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-coffee-gold outline-none transition-all placeholder:text-gray-700 font-bold"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Guía Paso a Paso</label>
                              <textarea 
                                value={taskDesc}
                                onChange={e => setTaskDesc(e.target.value)}
                                rows={4}
                                placeholder="Describe detalladamente lo que el alumno debe realizar y documentar..."
                                className="w-full bg-coffee-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-coffee-gold outline-none transition-all resize-none placeholder:text-gray-700 text-sm leading-relaxed"
                              />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                               <div className="space-y-2">
                                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Fecha Límite</label>
                                  <div className="relative">
                                    <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                    <input 
                                      type="date" 
                                      value={taskDueDate}
                                      onChange={e => setTaskDueDate(e.target.value)}
                                      className="w-full bg-coffee-black/40 border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-white focus:border-coffee-gold outline-none transition-all text-sm"
                                    />
                                  </div>
                               </div>
                               <div className="space-y-2">
                                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Métricas de Evaluación</label>
                                  <div className="flex gap-2">
                                    <input 
                                      type="text" 
                                      value={newCriterion}
                                      onChange={e => setNewCriterion(e.target.value)}
                                      onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addCriterion())}
                                      placeholder="Añadir criterio..."
                                      className="flex-1 bg-coffee-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-coffee-gold outline-none transition-all placeholder:text-gray-700 text-sm"
                                    />
                                    <button 
                                      type="button"
                                      onClick={addCriterion}
                                      className="p-4 bg-coffee-gold text-white rounded-2xl hover:bg-coffee-goldLight transition-all shadow-lg shadow-coffee-gold/10"
                                    >
                                      <Plus size={20} />
                                    </button>
                                  </div>
                                  <div className="flex flex-wrap gap-2 mt-3">
                                    {criteria.map((c, i) => (
                                      <Badge key={i} variant="gold" className="lowercase py-1 pr-1">
                                        {c} <button onClick={() => setCriteria(criteria.filter((_, idx) => idx !== i))} className="ml-2 w-4 h-4 rounded-full bg-coffee-gold/20 flex items-center justify-center hover:bg-red-500/20 hover:text-red-500 transition-colors">×</button>
                                      </Badge>
                                    ))}
                                    {criteria.length === 0 && <span className="text-[10px] text-gray-700 italic ml-1">No hay criterios añadidos</span>}
                                  </div>
                               </div>
                            </div>
                         </div>
                         <Button onClick={handleAddTaskSubmit} fullWidth className="h-16 rounded-2xl text-sm uppercase tracking-widest">Publicar Tarea en la Comunidad</Button>
                       </div>
                     )}
                   </div>
                 )}

                 {/* Tasks List */}
                 <div className="space-y-6">
                    <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] px-2 flex items-center gap-2">
                       Objetivos de Aprendizaje Práctico <div className="h-px flex-1 bg-white/5"></div>
                    </h3>
                    {practicalTasks.length > 0 ? (
                      practicalTasks.map(task => (
                        <div key={task.id} className="glass-card p-8 rounded-[2.5rem] border border-white/5 space-y-6 relative overflow-hidden group hover:border-coffee-gold/30 transition-all animate-in slide-in-from-bottom-2">
                           <div className="absolute top-0 right-0 bg-coffee-gold/10 text-coffee-gold px-6 py-2 rounded-bl-3xl text-[9px] font-black tracking-widest uppercase flex items-center gap-2">
                             <AlertCircle size={10}/> Práctica Obligatoria
                           </div>
                           
                           <div className="flex justify-between items-start gap-4 pr-32">
                              <div className="space-y-3">
                                 <h4 className="text-xl font-bold text-white group-hover:text-coffee-gold transition-colors">{task.title}</h4>
                                 <Text className="text-sm leading-relaxed text-gray-400">{task.description}</Text>
                              </div>
                              {isInstructor && (
                                <button 
                                  onClick={() => onDeleteTask(task.id)}
                                  className="p-3 bg-red-500/5 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all"
                                  title="Eliminar Tarea"
                                >
                                  <Trash2 size={18} />
                                </button>
                              )}
                           </div>

                           <div className="flex flex-wrap gap-2">
                              {task.criteria.map((c, i) => (
                                <Badge key={i} variant="outline" dot className="bg-white/5 border-white/5 lowercase text-[9px]">{c}</Badge>
                              ))}
                           </div>

                           <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                              <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2 text-[10px] text-gray-500 font-black uppercase tracking-widest">
                                  <Calendar size={14} className="text-coffee-gold" /> Entrega: <span className="text-white ml-1">{task.dueDate || 'Indefinida'}</span>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-gray-500 font-black uppercase tracking-widest">
                                  <Users size={14} className="text-coffee-gold" /> Alumnos: <span className="text-white ml-1">12 enviadas</span>
                                </div>
                              </div>
                              <button className="flex items-center justify-center gap-3 bg-coffee-gold text-white px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-coffee-goldLight transition-all shadow-xl shadow-coffee-gold/20 active:scale-95">
                                Subir Evidencia <Send size={14} />
                              </button>
                           </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-20 glass-card rounded-[2.5rem] border border-dashed border-white/10 opacity-40">
                        <ClipboardCheck size={48} className="mx-auto text-gray-700 mb-4" />
                        <div className="text-[10px] font-black uppercase tracking-widest text-gray-600">No hay tareas prácticas asignadas</div>
                        <Text className="text-xs mt-2">Los instructores aún no han publicado desafíos prácticos para esta lección.</Text>
                      </div>
                    )}
                 </div>

                 {/* Comments/Forum Placeholder */}
                 <div className="space-y-8 pt-12 border-t border-white/5">
                    <div className="flex items-center justify-between px-2">
                      <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Debate Técnico de la Lección</h3>
                      <div className="flex items-center gap-2 text-[10px] text-gray-500 font-black uppercase">
                        <Users size={12} className="text-coffee-gold" /> 42 Colegas Activos
                      </div>
                    </div>
                    <div className="flex gap-5">
                       <div className="w-12 h-12 rounded-2xl bg-coffee-gold/10 shrink-0 border border-coffee-gold/20 flex items-center justify-center font-bold text-coffee-gold text-sm shadow-inner">U</div>
                       <div className="flex-1 relative">
                          <input 
                            placeholder="Comparte tu experiencia o duda técnica..." 
                            className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:border-coffee-gold/40 outline-none transition-all pr-14 placeholder:text-gray-700 shadow-xl"
                          />
                          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-coffee-gold transition-colors">
                            <MessageCircle size={20} />
                          </button>
                       </div>
                    </div>
                    {/* Mock Comments */}
                    {[1, 2].map(i => (
                      <div key={i} className="flex gap-5 p-6 hover:bg-white/[0.01] rounded-[2rem] transition-all border border-transparent hover:border-white/5">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 shrink-0 flex items-center justify-center text-xs font-black text-gray-500 border border-white/5">A{i}</div>
                        <div className="space-y-2 flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-bold text-white">Barista #{i+34}</div>
                            <div className="text-[9px] text-gray-600 font-black uppercase tracking-widest">hace {i*2} horas</div>
                          </div>
                          <Text className="text-sm text-gray-400">¿Qué temperatura recomiendan para un tueste omni en V60? Estoy usando 94°C pero noto una sobre-extracción ligera.</Text>
                        </div>
                      </div>
                    ))}
                 </div>
               </div>
             )}
          </div>

          {/* Sidebar Playlist */}
          <aside className="space-y-8">
             <div className="glass-card p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                <div className="flex justify-between items-end px-1">
                   <h3 className="font-bold text-white text-lg font-serif">Módulo Actual</h3>
                   <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{currentLessonIdx + 1}/{course.modules[currentModuleIdx].lessons.length}</span>
                </div>
                <div className="space-y-2.5">
                   {course.modules[currentModuleIdx].lessons.map((lesson, idx) => (
                      <button 
                        key={lesson.id}
                        onClick={() => onNavigateLesson(lesson.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all border ${
                          lesson.id === currentLessonId 
                          ? 'bg-coffee-gold/10 border-coffee-gold/30 text-white shadow-lg' 
                          : 'hover:bg-white/5 border-transparent text-gray-600'
                        }`}
                      >
                         <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[9px] font-black ${
                           lesson.id === currentLessonId ? 'bg-coffee-gold text-white' : 'bg-white/5'
                         }`}>
                            {idx + 1}
                         </div>
                         <div className="text-left flex-1 min-w-0">
                            <div className={`text-xs font-bold truncate ${lesson.id === currentLessonId ? 'text-white' : 'text-gray-500'}`}>{lesson.title}</div>
                            <div className="text-[9px] opacity-40 font-black uppercase tracking-widest mt-0.5">{lesson.duration}</div>
                         </div>
                         {lesson.isCompleted && <CheckCircle size={14} className="text-green-500 shrink-0" />}
                      </button>
                   ))}
                </div>
             </div>

             <div className="bg-gradient-to-br from-coffee-gold/15 to-transparent p-8 rounded-[2.5rem] border border-coffee-gold/20 space-y-6">
                <div className="w-14 h-14 bg-coffee-gold text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-coffee-gold/20 border border-white/10">
                  <Trophy size={28} />
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-white text-lg font-serif">Reto de Microespuma</h4>
                  <Text className="text-xs leading-relaxed text-gray-300">Completa esta unidad y sube un video de 30 segundos texturizando leche. Los mejores 5 serán destacados en el Ranking Global.</Text>
                </div>
                <button className="w-full py-4 bg-white/5 backdrop-blur border border-white/10 rounded-2xl text-[10px] font-black text-white uppercase tracking-widest hover:bg-white/20 transition-all shadow-sm">Ver Bases del Desafío</button>
             </div>
          </aside>
       </div>
    </div>
  );
};
