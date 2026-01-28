
import React from 'react';
import { Course } from '../types';
import { ChevronLeft, ChevronRight, Star, TrendingUp } from 'lucide-react';
import { CourseCard } from './CourseCard';

interface RecommendationCarouselProps {
  title: string;
  subtitle?: string;
  courses: Course[];
  onNavigateCourse: (id: string) => void;
  onNavigateInstructor: (id: string) => void;
  type?: 'standard' | 'trending';
}

export const RecommendationCarousel: React.FC<RecommendationCarouselProps> = ({ 
  title, 
  subtitle, 
  courses, 
  onNavigateCourse,
  onNavigateInstructor,
  type = 'standard'
}) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (courses.length === 0) return null;

  return (
    <div className="space-y-6 group/carousel">
      <div className="flex items-end justify-between px-2">
        <div className="space-y-1">
          <h2 className="text-2xl font-serif font-bold text-white flex items-center gap-3">
            {type === 'trending' && <TrendingUp size={24} className="text-coffee-gold" />}
            {title}
          </h2>
          {subtitle && <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{subtitle}</p>}
        </div>
        <div className="hidden md:flex gap-2 opacity-0 group-hover/carousel:opacity-100 transition-opacity">
           <button 
            onClick={() => scroll('left')}
            className="p-2 bg-white/5 border border-white/10 rounded-full hover:bg-coffee-gold hover:text-white transition-all"
           >
             <ChevronLeft size={20} />
           </button>
           <button 
            onClick={() => scroll('right')}
            className="p-2 bg-white/5 border border-white/10 rounded-full hover:bg-coffee-gold hover:text-white transition-all"
           >
             <ChevronRight size={20} />
           </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x px-2"
      >
        {courses.map((course, index) => (
          <div key={course.id} className="min-w-[300px] md:min-w-[400px] snap-start relative">
            {type === 'trending' && (
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 text-8xl font-black text-white/5 select-none pointer-events-none z-0">
                {index + 1}
              </div>
            )}
            <div className="relative z-10">
               <CourseCard 
                course={course} 
                onClick={onNavigateCourse} 
                onInstructorClick={onNavigateInstructor}
               />
               {type === 'trending' && (
                 <div className="absolute top-4 right-4">
                   <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-1.5 text-[10px] font-black text-coffee-gold">
                      <Star size={12} fill="currentColor" /> {course.rating}
                   </div>
                 </div>
               )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
