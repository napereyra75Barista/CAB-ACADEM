
import React from 'react';
import { Course } from '../types';
import { Play, Clock, User, Heart } from 'lucide-react';
import { Badge } from './ui/Badge';
import { ProgressBar } from './ui/ProgressBar';

interface CourseCardProps {
  course: Course;
  onClick: (id: string) => void;
  onInstructorClick?: (id: string) => void;
  variant?: 'compact' | 'expanded';
}

export const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  onClick, 
  onInstructorClick,
  variant = 'expanded' 
}) => {
  const isActive = course.progress > 0 && course.progress < 100;

  const handleInstructorClick = (e: React.MouseEvent) => {
    if (onInstructorClick) {
      e.stopPropagation();
      onInstructorClick(course.instructorId);
    }
  };

  if (variant === 'compact') {
    return (
      <div 
        onClick={() => onClick(course.id)}
        className="min-w-[280px] md:min-w-[320px] bg-coffee-dark rounded-2xl overflow-hidden hover:bg-white/5 transition-all cursor-pointer border border-white/5 group"
      >
        <div className="relative h-48 overflow-hidden">
          <img src={course.thumbnail} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={course.title} />
          <div className="absolute top-3 left-3">
            <Badge variant="dark">{course.category}</Badge>
          </div>
          {course.recommendationCount > 500 && (
            <div className="absolute bottom-3 right-3 bg-coffee-gold/90 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-black text-white flex items-center gap-1">
              <Heart size={10} fill="currentColor" /> {course.recommendationCount}
            </div>
          )}
        </div>
        <div className="p-5 space-y-3">
          <h3 className="font-bold text-white group-hover:text-coffee-gold transition-colors">{course.title}</h3>
          <p className="text-sm text-gray-500 line-clamp-2">{course.description}</p>
          <div className="flex items-center justify-between pt-2">
            <span className="font-bold text-white">{course.price}</span>
            <div 
              onClick={handleInstructorClick}
              className="text-[10px] font-black text-coffee-gold hover:text-white transition-colors flex items-center gap-1"
            >
              <User size={10} /> {course.instructorName.toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={() => onClick(course.id)}
      className={`group cursor-pointer glass-card rounded-3xl overflow-hidden hover:scale-[1.02] transition-all duration-300 relative ${
        isActive ? 'ring-2 ring-coffee-gold/30 shadow-2xl shadow-coffee-gold/5' : ''
      }`}
    >
      {isActive && (
        <Badge variant="gold" dot className="absolute top-4 right-4 z-10 bg-coffee-gold text-white animate-pulse">
          Activo
        </Badge>
      )}
      <div className="relative aspect-video">
        <img src={course.thumbnail} className="w-full h-full object-cover" alt={course.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-coffee-black via-coffee-black/20 to-transparent" />
        
        {/* Recommendation Counter Badge */}
        <div className="absolute bottom-4 left-4 flex gap-2">
           <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-1.5 text-[10px] font-black text-coffee-gold shadow-lg">
              <Heart size={12} fill="currentColor" className="group-hover:scale-125 transition-transform" /> {course.recommendationCount.toLocaleString()}
           </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-coffee-gold p-4 rounded-full shadow-2xl scale-110">
            <Play className="fill-current text-white" size={24} />
          </div>
        </div>
      </div>
      <div className="p-6 space-y-4">
        <div>
          <div className="flex justify-between items-start mb-1">
             <span 
              onClick={handleInstructorClick}
              className="text-[10px] font-black text-coffee-gold uppercase tracking-[0.2em] hover:text-white transition-colors"
             >
               {course.instructorName}
             </span>
             {course.progress === 100 && <Badge variant="green">Completado</Badge>}
          </div>
          <h3 className="text-xl font-bold text-white group-hover:text-coffee-gold transition-colors line-clamp-1">{course.title}</h3>
        </div>
        
        {course.progress > 0 && (
          <ProgressBar progress={course.progress} showLabel />
        )}

        <div className="flex items-center gap-4 pt-2 text-xs text-gray-500 border-t border-white/5 mt-2">
          <div className="flex items-center gap-1.5"><Clock size={14} /> {course.durationHours} contenido</div>
          <div className="flex items-center gap-1.5"><Play size={14} /> Clases</div>
        </div>
      </div>
    </div>
  );
};
