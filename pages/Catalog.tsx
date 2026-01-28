
import React from 'react';
import { Course, CourseLevel } from '../types';
// Add missing BookOpen import to fix the "Cannot find name 'BookOpen'" error
import { Search, SlidersHorizontal, Sparkles, ChevronRight, ChevronLeft, Filter, X, Grid, List, BookOpen } from 'lucide-react';
import { Heading, Text } from '../components/ui/Typography';
import { CourseCard } from '../components/CourseCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

interface CatalogProps {
  courses: Course[];
  onNavigateCourse: (id: string) => void;
  onNavigateInstructor: (id: string) => void;
}

const CourseCardSkeleton = () => (
  <div className="glass-card rounded-[2.5rem] overflow-hidden border border-white/5 animate-pulse">
    <div className="aspect-video bg-white/5 relative">
      <div className="absolute bottom-4 left-4 w-24 h-6 bg-white/5 rounded-xl"></div>
    </div>
    <div className="p-6 space-y-5">
      <div className="flex justify-between items-center">
        <div className="w-20 h-3 bg-coffee-gold/10 rounded-full"></div>
        <div className="w-16 h-3 bg-white/5 rounded-full"></div>
      </div>
      <div className="space-y-3">
        <div className="w-3/4 h-6 bg-white/10 rounded-lg"></div>
        <div className="space-y-2">
          <div className="w-full h-3 bg-white/5 rounded-full"></div>
          <div className="w-5/6 h-3 bg-white/5 rounded-full"></div>
        </div>
      </div>
      <div className="pt-4 border-t border-white/5 flex gap-4">
        <div className="w-24 h-3 bg-white/5 rounded-full"></div>
        <div className="w-24 h-3 bg-white/5 rounded-full"></div>
      </div>
    </div>
  </div>
);

export const Catalog: React.FC<CatalogProps> = ({ courses, onNavigateCourse, onNavigateInstructor }) => {
  const [activeLevel, setActiveLevel] = React.useState<string>('Todos');
  const [activeCategory, setActiveCategory] = React.useState<string>('Todas');
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [showFilters, setShowFilters] = React.useState<boolean>(false);
  
  const scrollRef = React.useRef<HTMLDivElement>(null);
  
  const levels: (CourseLevel | 'Todos')[] = ['Todos', 'Inicial', 'Intermedio', 'Avanzado'];
  
  // Extraer categorías únicas de los cursos
  const categories = React.useMemo(() => {
    const cats = new Set(courses.map(c => c.category));
    return ['Todas', ...Array.from(cats)];
  }, [courses]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const recentlyReleased = [...courses]
    .sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime())
    .slice(0, 4);

  const filteredCourses = courses.filter(course => {
    const matchesLevel = activeLevel === 'Todos' || course.level === activeLevel;
    const matchesCategory = activeCategory === 'Todas' || course.category === activeCategory;
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesLevel && matchesCategory && matchesSearch;
  });

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const clearFilters = () => {
    setActiveLevel('Todos');
    setActiveCategory('Todas');
    setSearchQuery('');
  };

  const hasActiveFilters = activeLevel !== 'Todos' || activeCategory !== 'Todas' || searchQuery !== '';

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-coffee-gold font-black text-[10px] uppercase tracking-[0.4em]">
            <BookOpen size={14} /> Biblioteca Profesional
          </div>
          <Heading as="h1" className="text-4xl md:text-5xl font-serif">Catálogo de Cursos</Heading>
          <Text className="text-lg max-w-xl">Domina cada etapa de la cadena del café con formación de élite.</Text>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-initial">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
             <input 
              type="text" 
              placeholder="Ej: Espresso, Latte Art..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:border-coffee-gold/50 transition-all w-full md:w-80 text-white placeholder:text-gray-600 shadow-inner"
             />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`p-4 rounded-2xl transition-all border group relative ${showFilters ? 'bg-coffee-gold border-coffee-gold text-white shadow-lg shadow-coffee-gold/20' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20'}`}
          >
             <SlidersHorizontal size={20} className={showFilters ? 'rotate-180 transition-transform duration-300' : ''} />
             {hasActiveFilters && !showFilters && (
               <span className="absolute -top-1 -right-1 w-3 h-3 bg-coffee-gold rounded-full border-2 border-coffee-black"></span>
             )}
          </button>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div className="glass-card p-10 rounded-[3rem] border border-white/10 animate-in slide-in-from-top-4 duration-500 space-y-10 bg-gradient-to-br from-white/[0.04] to-transparent">
           <div className="grid md:grid-cols-2 gap-12">
              {/* Level Filter */}
              <div className="space-y-6">
                 <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                       <Filter size={12} className="text-coffee-gold" /> Filtrar por Nivel
                    </h3>
                    <Badge variant="outline">{activeLevel}</Badge>
                 </div>
                 <div className="flex flex-wrap gap-2.5">
                    {levels.map(level => (
                       <button
                          key={level}
                          onClick={() => setActiveLevel(level)}
                          className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all border ${
                             activeLevel === level 
                             ? 'bg-coffee-gold border-coffee-gold text-white shadow-lg shadow-coffee-gold/20 scale-105' 
                             : 'border-white/5 text-gray-500 hover:text-white hover:bg-white/10'
                          }`}
                       >
                          {level}
                       </button>
                    ))}
                 </div>
              </div>

              {/* Category Filter */}
              <div className="space-y-6">
                 <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                       <Grid size={12} className="text-coffee-gold" /> Filtrar por Especialidad
                    </h3>
                    <Badge variant="outline">{activeCategory}</Badge>
                 </div>
                 <div className="flex flex-wrap gap-2.5">
                    {categories.map(cat => (
                       <button
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all border ${
                             activeCategory === cat 
                             ? 'bg-coffee-gold border-coffee-gold text-white shadow-lg shadow-coffee-gold/20 scale-105' 
                             : 'border-white/5 text-gray-500 hover:text-white hover:bg-white/10'
                          }`}
                       >
                          {cat}
                       </button>
                    ))}
                 </div>
              </div>
           </div>

           {/* Results summary and reset */}
           <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                 <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                    Resultados: <span className="text-white text-sm ml-1">{filteredCourses.length} cursos encontrados</span>
                 </div>
                 {hasActiveFilters && (
                    <div className="h-4 w-px bg-white/10 hidden sm:block"></div>
                 )}
                 {hasActiveFilters && (
                   <div className="flex gap-2">
                      {activeLevel !== 'Todos' && <Badge variant="gold" dot className="lowercase">{activeLevel}</Badge>}
                      {activeCategory !== 'Todas' && <Badge variant="gold" dot className="lowercase">{activeCategory}</Badge>}
                   </div>
                 )}
              </div>
              
              {hasActiveFilters && (
                <button 
                  onClick={clearFilters}
                  className="flex items-center gap-2 text-[10px] font-black text-red-500/70 hover:text-red-400 uppercase tracking-widest transition-colors bg-red-500/5 px-6 py-3 rounded-xl border border-red-500/10"
                >
                  <X size={14} /> Limpiar Filtros
                </button>
              )}
           </div>
        </div>
      )}

      {/* Recién Lanzados Section (Hidden when filtering) */}
      {!isLoading && !hasActiveFilters && (
        <section className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="flex items-center justify-between px-2">
            <div className="space-y-1">
              <h2 className="text-2xl font-serif font-bold text-white flex items-center gap-3">
                <Sparkles size={24} className="text-coffee-gold" />
                Nuevos ingresos
              </h2>
              <p className="text-xs text-gray-500 font-black uppercase tracking-widest">Recién agregados a la biblioteca del campus</p>
            </div>
            <div className="flex gap-2">
               <button onClick={() => scroll('left')} className="p-3 bg-white/5 border border-white/5 rounded-full hover:bg-coffee-gold/20 text-gray-500 hover:text-white transition-all shadow-sm">
                 <ChevronLeft size={20} />
               </button>
               <button onClick={() => scroll('right')} className="p-3 bg-white/5 border border-white/5 rounded-full hover:bg-coffee-gold/20 text-gray-500 hover:text-white transition-all shadow-sm">
                 <ChevronRight size={20} />
               </button>
            </div>
          </div>

          <div 
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto pb-6 scrollbar-hide snap-x px-2"
          >
            {recentlyReleased.map((course) => (
              <div key={course.id} className="min-w-[320px] md:min-w-[420px] snap-start relative group">
                <div className="absolute top-6 left-6 z-20 pointer-events-none">
                  <Badge variant="gold" dot className="bg-coffee-gold/90 backdrop-blur-md text-white border-transparent py-2 px-5 shadow-2xl">RECIENTE</Badge>
                </div>
                <CourseCard 
                  course={course} 
                  onClick={onNavigateCourse} 
                  onInstructorClick={onNavigateInstructor}
                  variant="expanded"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Main Grid Section */}
      <section className="space-y-10">
        <div className="flex items-center justify-between border-b border-white/5 pb-6">
           <Heading as="h2" className="text-2xl font-serif">
              {hasActiveFilters ? 'Resultados de Búsqueda' : 'Todos los Cursos'}
           </Heading>
           {!showFilters && !hasActiveFilters && (
             <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide max-w-md">
                {levels.slice(1).map(level => (
                  <button
                    key={level}
                    onClick={() => setActiveLevel(level)}
                    className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white hover:bg-white/5 transition-all"
                  >
                    {level}
                  </button>
                ))}
             </div>
           )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <CourseCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredCourses.map(course => (
              <div key={course.id} className="animate-in fade-in slide-in-from-bottom-2">
                <CourseCard 
                  course={course} 
                  onClick={onNavigateCourse} 
                  onInstructorClick={onNavigateInstructor}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center glass-card rounded-[3rem] border border-dashed border-white/10 max-w-2xl mx-auto space-y-8 animate-in zoom-in-95 duration-500">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto text-gray-600 border border-white/5">
               <Search size={48} className="opacity-20" />
            </div>
            <div className="space-y-2">
               <Heading as="h3" className="text-white">Sin coincidencias</Heading>
               <Text className="max-w-sm mx-auto">No encontramos cursos que coincidan con "<span className="text-coffee-gold italic">{searchQuery || activeLevel + ' ' + activeCategory}</span>". Intenta ajustar tus filtros.</Text>
            </div>
            <Button variant="outline" onClick={clearFilters} className="px-10">Restablecer búsqueda</Button>
          </div>
        )}
      </section>

      {/* Course Stats / Footer CTA */}
      {!isLoading && filteredCourses.length > 0 && (
        <div className="pt-20 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 rounded-full border border-white/5 text-[10px] font-black text-gray-500 uppercase tracking-widest">
            <span className="text-coffee-gold">{courses.length}</span> Cursos Disponibles • <span className="text-coffee-gold">{new Set(courses.map(c => c.instructorId)).size}</span> Instructores de Élite
          </div>
        </div>
      )}
    </div>
  );
};
