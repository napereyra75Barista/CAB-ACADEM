
import React from 'react';
import { Course, Page, User } from '../types';
import { Clock, Play, Award, Zap, Trophy, ChevronRight, Heart } from 'lucide-react';
import { Heading, Text } from '../components/ui/Typography';
import { RecommendationCarousel } from '../components/RecommendationCarousel';
import { XPTracker } from '../components/Gamification/XPTracker';
import { WeeklyChallengeCard } from '../components/Gamification/WeeklyChallenge';

interface DashboardProps {
  courses: Course[];
  user: User;
  onNavigateCourse: (courseId: string) => void;
  onNavigateInstructor: (instructorId: string) => void;
  onNavigate: (page: Page) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  courses, 
  user, 
  onNavigateCourse, 
  onNavigateInstructor,
  onNavigate 
}) => {
  // 1. Cursos en progreso
  const continueWatching = courses.filter(c => c.progress > 0 && c.progress < 100);
  
  // 2. Cursos finalizados
  const completedCourses = courses.filter(c => c.progress === 100);

  // 3. Recomendados Sociales (Top por recomendaciones)
  const topRecommended = [...courses].sort((a, b) => b.recommendationCount - a.recommendationCount).slice(0, 4);

  // 4. Recomendados (No empezados y afines al perfil)
  const recommendedForYou = courses.filter(c => {
    const isNew = c.progress === 0;
    const matchesLevel = c.level === user.level || c.level === 'Inicial';
    const matchesMethod = user.preferences.methods.some(m => 
      c.tags.includes(m.toLowerCase()) || c.category.toLowerCase().includes(m.toLowerCase())
    );
    return isNew && (matchesLevel || matchesMethod);
  }).sort((a, b) => b.rating - a.rating);

  // 5. Tendencias
  const trendingCourses = courses.filter(c => c.isTrending || c.enrollmentCount > 3000)
    .sort((a, b) => b.enrollmentCount - a.enrollmentCount);

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Section with Smart CTA */}
      <div className="grid lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 relative h-[360px] rounded-[3rem] overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              alt="Hero"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-coffee-black via-coffee-black/60 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center px-12 space-y-4">
              <div className="flex items-center gap-2 text-coffee-gold font-black text-[10px] uppercase tracking-[0.4em]">
                <Zap size={14} fill="currentColor" /> Racha de {user.streak} días • {user.xp} XP
              </div>
              <Heading as="h1" className="text-5xl text-white">Hola, {user.name.split(' ')[0]}</Heading>
              <Text className="text-gray-200 max-w-md">
                {continueWatching.length > 0 
                  ? `Tienes un curso al ${continueWatching[0].progress}% esperándote. ¿Seguimos calibrando?`
                  : "Explora nuevas técnicas. Hoy es un gran día para una extracción perfecta."
                }
              </Text>
              <div className="flex gap-4 mt-4">
                <button 
                  onClick={() => onNavigateCourse(continueWatching.length > 0 ? continueWatching[0].id : courses[0].id)}
                  className="px-8 py-4 bg-white text-coffee-black font-bold rounded-2xl hover:bg-coffee-gold hover:text-white transition-all transform hover:scale-105 shadow-2xl"
                >
                  {continueWatching.length > 0 ? 'Continuar Aprendiendo' : 'Explorar Cursos'}
                </button>
              </div>
            </div>
         </div>
         <div className="space-y-6">
            <XPTracker xp={user.xp} rank={user.rank} streak={user.streak} />
            <button 
              onClick={() => onNavigate('leaderboard')}
              className="w-full glass-card p-6 rounded-[2rem] flex items-center justify-between border border-white/5 hover:border-coffee-gold/30 transition-all group"
            >
               <div className="flex items-center gap-4">
                  <div className="p-3 bg-coffee-gold/10 text-coffee-gold rounded-xl group-hover:scale-110 transition-transform">
                     <Trophy size={20} />
                  </div>
                  <div className="text-left">
                     <div className="text-sm font-bold text-white">Leaderboard</div>
                     <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Top 10% del Campus</div>
                  </div>
               </div>
               <ChevronRight size={20} className="text-coffee-gold opacity-50 group-hover:opacity-100" />
            </button>
         </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-16">
            {/* Carrusel 1: Continuar viendo */}
            {continueWatching.length > 0 && (
              <RecommendationCarousel 
                title="Continuar viendo" 
                subtitle="Tus formaciones activas"
                courses={continueWatching} 
                onNavigateCourse={onNavigateCourse} 
                onNavigateInstructor={onNavigateInstructor}
              />
            )}

            {/* Carrusel Social: Los más recomendados */}
            <RecommendationCarousel 
              title="Más recomendados" 
              subtitle="Lo que tus colegas baristas están amando"
              courses={topRecommended} 
              onNavigateCourse={onNavigateCourse} 
              onNavigateInstructor={onNavigateInstructor}
              type="trending"
            />

            {/* Carrusel 3: Recomendado para vos */}
            <RecommendationCarousel 
              title="Sugeridos para vos" 
              subtitle={`Basado en tu interés en ${user.preferences.methods.join(', ')}`}
              courses={recommendedForYou} 
              onNavigateCourse={onNavigateCourse} 
              onNavigateInstructor={onNavigateInstructor}
            />

            {/* Carrusel 4: Cursos Finalizados */}
            {completedCourses.length > 0 && (
              <RecommendationCarousel 
                title="Completados" 
                subtitle="Tus logros académicos"
                courses={completedCourses} 
                onNavigateCourse={onNavigateCourse} 
                onNavigateInstructor={onNavigateInstructor}
              />
            )}
        </div>

        <aside className="space-y-12">
           <section className="space-y-6">
              <Heading as="h3" className="text-xl font-serif">Reto Comunitario</Heading>
              <WeeklyChallengeCard />
           </section>

           <section className="glass-card p-10 rounded-[3rem] border border-white/5 space-y-8">
              <Heading as="h3" className="text-xl font-serif">Tus Logros</Heading>
              <div className="grid grid-cols-2 gap-6">
                 {[
                   { name: 'Espresso Master', icon: '☕', level: 'Nivel 2' },
                   { name: 'Latte Art Pro', icon: '🥛', level: 'Nivel 3' },
                   { name: 'Social Star', icon: '🌟', level: 'Nivel 1' },
                   { name: 'Early Bird', icon: '🌅', level: 'Nivel 1' }
                 ].map((badge, i) => (
                   <div key={i} className="text-center space-y-3 group cursor-pointer">
                      <div className="w-20 h-20 rounded-[1.5rem] bg-white/5 border border-white/5 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:border-coffee-gold/30 transition-all duration-500">
                         {badge.icon}
                      </div>
                      <div>
                        <div className="text-[10px] font-black text-white uppercase tracking-tight truncate">{badge.name}</div>
                        <div className="text-[8px] font-bold text-coffee-gold uppercase">{badge.level}</div>
                      </div>
                   </div>
                 ))}
              </div>
              <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/5 text-xs font-bold text-gray-400 hover:text-white transition-all">Ver Galería Completa</button>
           </section>
        </aside>
      </div>

      {/* Stats Summary */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { icon: Clock, label: "Horas de Estudio", value: "24.5", color: "text-blue-400" },
          { icon: Play, label: "Clases Completadas", value: courses.reduce((acc, c) => acc + c.modules.reduce((ma, m) => ma + m.lessons.filter(l => l.isCompleted).length, 0), 0).toString(), color: "text-green-400" },
          { icon: Award, label: "Especializaciones", value: completedCourses.length.toString(), color: "text-coffee-gold" }
        ].map((stat, i) => (
          <div key={i} className="glass-card p-8 rounded-[2rem] flex items-center gap-6 group hover:border-coffee-gold/20 transition-all">
            <div className={`p-4 rounded-2xl bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
              <stat.icon size={28} />
            </div>
            <div>
              <Text className="text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</Text>
              <div className="text-3xl font-bold text-white">{stat.value}</div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
