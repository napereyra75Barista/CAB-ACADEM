
import React from 'react';
import { BrandLogo } from '../components/BrandLogo';
import { Mail, Lock, ArrowRight, Chrome, Github, Eye, EyeOff, Coffee, Briefcase } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface LoginProps {
  onLogin: () => void;
  onBack: () => void;
  onNavigateTeacherLogin?: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, onBack, onNavigateTeacherLogin }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-coffee-black flex flex-col md:flex-row -m-6 lg:-m-12 overflow-hidden">
      {/* Left Side: Visual Experience (Desktop only) */}
      <div className="hidden md:flex md:w-1/2 lg:w-3/5 relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1511233070707-6db3a75328c6?q=80&w=2000&auto=format&fit=crop" 
          className="w-full h-full object-cover grayscale opacity-50 transition-all duration-1000 scale-110 hover:scale-100"
          alt="Coffee Extraction"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-coffee-black"></div>
        
        <div className="absolute bottom-20 left-20 max-w-lg space-y-6 animate-in fade-in slide-in-from-left-8 duration-1000">
          <div className="flex items-center gap-3 text-coffee-gold font-black text-xs uppercase tracking-[0.4em]">
             <Coffee size={18} /> Excelencia Certificada
          </div>
          <h2 className="text-6xl font-serif font-bold text-white leading-tight">
            Vuelve a tu <br/>
            <span className="text-coffee-gold italic">Ritual de Aprendizaje</span>
          </h2>
          <p className="text-gray-400 text-lg">
            La formación barista más prestigiosa de Argentina, ahora disponible en cada una de tus pantallas.
          </p>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-12 lg:p-24 relative">
        {/* Mobile Header Background */}
        <div className="md:hidden absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1511233070707-6db3a75328c6?q=80&w=1000&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-20"
            alt="Mobile Background"
          />
          <div className="absolute inset-0 bg-coffee-black/80"></div>
        </div>

        <div className="w-full max-w-md space-y-10 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex flex-col items-center gap-4 text-center">
            <BrandLogo className="scale-125 mb-4" />
            <h1 className="text-3xl font-serif font-bold text-white">Bienvenido al Campus</h1>
            <p className="text-gray-500 text-sm">Ingresa tus credenciales para continuar tu formación profesional.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-4 mb-2 block group-focus-within:text-coffee-gold transition-colors">Email Institucional</label>
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-coffee-gold transition-colors" size={18} />
                  <input 
                    type="email" 
                    required
                    placeholder="ejemplo@caba.edu.ar"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-14 py-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-coffee-gold/50 focus:bg-white/[0.08] transition-all"
                  />
                </div>
              </div>

              <div className="relative group">
                <div className="flex justify-between items-center ml-4 mb-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest group-focus-within:text-coffee-gold transition-colors">Contraseña</label>
                  <button type="button" className="text-[10px] font-black text-coffee-gold hover:text-white transition-colors uppercase tracking-widest">¿La olvidaste?</button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-coffee-gold transition-colors" size={18} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-14 py-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-coffee-gold/50 focus:bg-white/[0.08] transition-all"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              fullWidth 
              className="h-16 text-lg shadow-2xl shadow-coffee-gold/20"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <span className="flex items-center gap-2">Acceder al Campus <ArrowRight size={20} /></span>
              )}
            </Button>
          </form>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
            <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest"><span className="bg-coffee-black px-4 text-gray-600">O ingresa con</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all font-bold text-xs text-white">
              <Chrome size={18} className="text-blue-500" /> Google
            </button>
            <button className="flex items-center justify-center gap-3 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all font-bold text-xs text-white">
              <Github size={18} /> Github
            </button>
          </div>

          <div className="pt-6 border-t border-white/5 flex flex-col items-center gap-4">
            <p className="text-center text-xs text-gray-500">
              ¿No tienes cuenta? <button onClick={onBack} className="text-coffee-gold font-bold hover:underline">Solicita tu acceso aquí</button>
            </p>
            <button 
              onClick={onNavigateTeacherLogin}
              className="flex items-center gap-2 text-gray-600 hover:text-coffee-gold transition-colors text-[10px] font-black uppercase tracking-widest"
            >
              <Briefcase size={14} /> Acceso Instructores
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
