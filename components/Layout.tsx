
import React from 'react';
import { Page, UserRole } from '../types';
import { LayoutDashboard, MessageSquare, Award, User, LogOut, Menu, X, BookOpen, ShieldCheck, Trophy, GraduationCap, Sparkles } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { XPTracker } from './Gamification/XPTracker';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isLoggedIn?: boolean;
  userAvatar?: string;
  userName?: string;
  userXP?: number;
  userStreak?: number;
  userRole?: UserRole;
}

const SidebarItem: React.FC<{ 
  icon: React.ReactNode; 
  label: string; 
  active: boolean; 
  onClick: () => void;
  variant?: 'default' | 'gold' | 'spark';
}> = ({ icon, label, active, onClick, variant = 'default' }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      active 
        ? variant === 'gold' 
          ? 'bg-coffee-gold text-white shadow-lg shadow-coffee-gold/20'
          : variant === 'spark'
            ? 'bg-gradient-to-r from-coffee-gold to-coffee-goldLight text-white shadow-lg'
            : 'bg-white/10 text-white border border-white/5'
        : 'text-gray-500 hover:text-white hover:bg-white/5'
    }`}
  >
    <span className={active && (variant === 'gold' || variant === 'spark') ? 'text-white' : active ? 'text-coffee-gold' : 'inherit'}>
      {icon}
    </span>
    <span className="font-semibold text-sm tracking-wide">{label}</span>
  </button>
);

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  currentPage, 
  setCurrentPage, 
  isLoggedIn = false,
  userAvatar = 'https://picsum.photos/100',
  userName = 'Usuario',
  userXP = 0,
  userStreak = 0,
  userRole = 'student'
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const studentNavigation = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'catalog', label: 'Biblioteca', icon: <BookOpen size={20} /> },
    { id: 'gallery', label: 'Laboratorio IA', icon: <Sparkles size={20} />, variant: 'spark' as const },
    { id: 'leaderboard', label: 'Ranking', icon: <Trophy size={20} /> },
    { id: 'community', label: 'Comunidad', icon: <MessageSquare size={20} /> },
    { id: 'certificates', label: 'Certificados', icon: <Award size={20} /> },
  ];

  const teacherNavigation = [
    { id: 'teacher-dashboard', label: 'Panel Profesor', icon: <GraduationCap size={20} />, variant: 'gold' as const },
    { id: 'dashboard', label: 'Vista Alumno', icon: <LayoutDashboard size={20} /> },
    { id: 'gallery', label: 'Visualizador IA', icon: <Sparkles size={20} /> },
    { id: 'catalog', label: 'Cursos CABA', icon: <BookOpen size={20} /> },
    { id: 'community', label: 'Foro Docente', icon: <MessageSquare size={20} /> },
  ];

  const navigation = userRole === 'teacher' ? teacherNavigation : studentNavigation;

  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  if (!isLoggedIn && currentPage === 'home') {
    return <div className="min-h-screen bg-coffee-black">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-coffee-black overflow-x-hidden relative">
      <aside className="hidden lg:flex flex-col w-72 border-r border-white/5 bg-coffee-dark p-8 fixed h-full z-30">
        <div className="mb-10 px-2 cursor-pointer group" onClick={() => setCurrentPage('home')}>
          <BrandLogo />
        </div>

        <div className="mb-8 px-2">
           <XPTracker xp={userXP} streak={userStreak} rank="" compact />
        </div>

        <nav className="flex-1 space-y-2">
          {navigation.map((item) => (
            <SidebarItem 
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={currentPage === item.id}
              variant={(item as any).variant}
              onClick={() => setCurrentPage(item.id as Page)}
            />
          ))}
          
          {(userRole === 'admin' || userRole === 'teacher') && (
            <div className="pt-8 opacity-40 hover:opacity-100 transition-opacity">
              <SidebarItem 
                 icon={<ShieldCheck size={20} />}
                 label="Administración"
                 active={currentPage === 'admin' || currentPage === 'analytics'}
                 onClick={() => setCurrentPage('admin')}
              />
            </div>
          )}
        </nav>

        <div className="mt-auto pt-8 border-t border-white/5 space-y-3">
          <div 
            className="p-4 bg-white/5 rounded-2xl flex items-center gap-3 mb-4 cursor-pointer hover:bg-white/10 transition-all"
            onClick={() => setCurrentPage('profile')}
          >
             <div className="w-10 h-10 rounded-full border border-coffee-gold overflow-hidden">
                <img src={userAvatar} className="w-full h-full object-cover" alt={userName} />
             </div>
             <div className="flex-1 min-w-0">
               <p className="text-sm font-bold text-white truncate">{userName}</p>
               <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Editar Perfil</p>
             </div>
          </div>
          <button 
            onClick={() => setCurrentPage('home')}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all"
          >
            <LogOut size={20} />
            <span className="font-semibold text-sm">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      <aside 
        className={`fixed top-0 left-0 bottom-0 w-72 bg-coffee-dark p-8 z-50 transition-transform duration-500 ease-in-out lg:hidden border-r border-white/5 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-10">
          <BrandLogo variant="icon" />
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-white/5 rounded-lg text-gray-400">
            <X size={24} />
          </button>
        </div>

        <nav className="space-y-4">
          {navigation.map((item) => (
            <button 
              key={item.id}
              className={`w-full flex items-center gap-4 py-4 px-4 rounded-xl text-lg font-bold transition-all ${
                currentPage === item.id ? 'bg-coffee-gold text-white' : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => {
                setCurrentPage(item.id as Page);
                setIsMobileMenuOpen(false);
              }}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <main 
        className={`flex-1 relative min-h-screen transition-all duration-500 ease-in-out ${
          isLoggedIn ? 'lg:ml-72' : ''
        } ${
          isMobileMenuOpen 
            ? 'translate-x-[280px] scale-[0.96] rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.8)] pointer-events-none lg:translate-x-0 lg:scale-100 lg:rounded-none lg:pointer-events-auto' 
            : 'translate-x-0 scale-100 rounded-none'
        }`}
      >
        {isMobileMenuOpen && (
          <div 
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[45] lg:hidden cursor-pointer"
          />
        )}

        <header className="lg:hidden flex items-center justify-between p-6 border-b border-white/5 bg-coffee-dark sticky top-0 z-40 backdrop-blur-xl">
          <BrandLogo variant="icon" />
          <div className="flex items-center gap-4">
            <XPTracker xp={userXP} streak={userStreak} rank="" compact />
            <button 
              onClick={() => setIsMobileMenuOpen(true)} 
              className="p-2 bg-white/5 rounded-lg transition-transform active:scale-90"
            >
              <Menu size={24} />
            </button>
          </div>
        </header>

        <div className="p-6 lg:p-12 max-w-[1400px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
