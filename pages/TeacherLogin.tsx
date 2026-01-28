import React from 'react';
import { BrandLogo } from '../components/BrandLogo';
import { Mail, Lock, ArrowRight, User, Briefcase, Award, Globe, ChevronLeft, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface TeacherLoginProps {
  onLogin: () => void;
  onBack: () => void;
}

export const TeacherLogin: React.FC<TeacherLoginProps> = ({ onLogin, onBack }) => {
  const [isRegister, setIsRegister] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  // Form State
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [specialty, setSpecialty] = React.useState('Espresso & Calibración');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulating authentication logic
    setTimeout(() => {
      setIsLoading(false);
      if (isRegister) {
        setSubmitted(true);
      } else {
        // Simple mock validation
        if (email.includes('@') && password.length >= 6) {
          onLogin();
        } else {
          alert('Por favor, ingresa credenciales válidas (email real y contraseña de al menos 6 caracteres).');
        }
      }
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-coffee-black flex items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-8 animate-in zoom-in duration-500">
          <div className="w-24 h-24 bg-coffee-gold/20 text-coffee-gold rounded-full flex items-center justify-center mx-auto">
            <Award size={48} />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-serif font-bold text-white">Postulación Recibida</h1>
            <p className="text-gray-400">Gracias por querer formar parte de CAB Campus. Nuestro equipo académico revisará tu trayectoria y se pondrá en contacto contigo en las próximas 48hs.</p>
          </div>
          <Button onClick={onBack} variant="glass" fullWidth>Volver al Inicio</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-coffee-black flex flex-col md:flex-row -m-6 lg:-m-12 overflow-hidden">
      {/* Left Side: Professional Backdrop */}
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=2000&auto=format&fit=crop" 
          className="w-full h-full object-cover opacity-40 grayscale"
          alt="Instructor Lab"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-coffee-black via-transparent to-transparent"></div>
        
        <div className="absolute bottom-20 left-20 right-20 space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
          <div className="inline-flex items-center gap-3 bg-coffee-gold/20 backdrop-blur-md px-4 py-2 rounded-full text-coffee-gold font-black text-[10px] uppercase tracking-widest border border-coffee-gold/20">
             <Award size={14} /> Faculty Access
          </div>
          <div className="space-y-4">
            <h2 className="text-6xl font-serif font-bold text-white leading-tight">Inspira a la <br/><span className="text-coffee-gold">Próxima Generación</span></h2>
            <p className="text-gray-400 text-lg max-w-md">Únete al cuerpo docente más prestigioso de la región y digitaliza tu maestría barística.</p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
            <div>
              <div className="text-2xl font-bold text-white">+12k</div>
              <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Alumnos Activos</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">24</div>
              <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Países alcanzados</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Auth Forms */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-12 lg:p-24 relative overflow-y-auto">
        <button 
          onClick={onBack}
          className="absolute top-10 left-10 text-gray-500 hover:text-white flex items-center gap-2 text-xs font-bold transition-colors z-20"
        >
          <ChevronLeft size={16} /> Volver
        </button>

        <div className="w-full max-w-md space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="text-center space-y-4">
            <BrandLogo className="scale-110 mx-auto" />
            <div className="flex bg-white/5 p-1 rounded-2xl w-fit mx-auto border border-white/10 mt-6">
              <button 
                onClick={() => setIsRegister(false)}
                className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${!isRegister ? 'bg-coffee-gold text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Ingresar
              </button>
              <button 
                onClick={() => setIsRegister(true)}
                className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${isRegister ? 'bg-coffee-gold text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Postularse
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              {isRegister && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                  <div className="relative group">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-4 mb-2 block group-focus-within:text-coffee-gold transition-colors">Nombre Profesional</label>
                    <div className="relative">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-coffee-gold transition-colors" size={18} />
                      <input 
                        type="text" 
                        required 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ej. Martín Barista" 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-14 py-4 text-white focus:outline-none focus:border-coffee-gold/50 transition-all" 
                      />
                    </div>
                  </div>
                  <div className="relative group">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-4 mb-2 block group-focus-within:text-coffee-gold transition-colors">Especialidad Principal</label>
                    <div className="relative">
                      <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-coffee-gold transition-colors" size={18} />
                      <select 
                        value={specialty}
                        onChange={(e) => setSpecialty(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-14 py-4 text-white focus:outline-none focus:border-coffee-gold/50 transition-all appearance-none"
                      >
                        <option>Espresso & Calibración</option>
                        <option>Latte Art</option>
                        <option>Brew Methods</option>
                        <option>Roasting / Tueste</option>
                        <option>Coffee Business</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="relative group">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-4 mb-2 block group-focus-within:text-coffee-gold transition-colors">Email del Instructor</label>
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-coffee-gold transition-colors" size={18} />
                  <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="instructor@caba.edu.ar" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-14 py-4 text-white focus:outline-none focus:border-coffee-gold/50 transition-all" 
                  />
                </div>
              </div>

              <div className="relative group">
                <div className="flex justify-between items-center ml-4 mb-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest group-focus-within:text-coffee-gold transition-colors">Contraseña</label>
                  {!isRegister && <button type="button" className="text-[10px] font-black text-coffee-gold hover:text-white transition-colors uppercase tracking-widest">Recuperar</button>}
                </div>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-coffee-gold transition-colors" size={18} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-14 py-4 text-white focus:outline-none focus:border-coffee-gold/50 transition-all" 
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

              {isRegister && (
                <div className="relative group animate-in fade-in slide-in-from-top-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-4 mb-2 block group-focus-within:text-coffee-gold transition-colors">LinkedIn / Porfolio / Redes</label>
                  <div className="relative">
                    <Globe className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-coffee-gold transition-colors" size={18} />
                    <input type="url" placeholder="https://..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-14 py-4 text-white focus:outline-none focus:border-coffee-gold/50 transition-all" />
                  </div>
                </div>
              )}
            </div>

            <Button type="submit" fullWidth className="h-16 text-lg" disabled={isLoading}>
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <span className="flex items-center gap-2">
                  {isRegister ? 'Enviar Postulación' : 'Entrar al Panel Docente'} <ArrowRight size={20} />
                </span>
              )}
            </Button>
          </form>

          {!isRegister && (
            <div className="bg-coffee-gold/5 border border-coffee-gold/10 p-6 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-coffee-gold font-bold text-xs uppercase tracking-widest">
                <Globe size={14} /> Acceso Restringido
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">Este panel es exclusivo para instructores verificados. Si deseas dar cursos en CAB Campus, usa la pestaña de "Postularse".</p>
            </div>
          )}

          <p className="text-center text-xs text-gray-600">
            ¿Eres un alumno? <button onClick={onBack} className="text-coffee-gold font-bold hover:underline">Ir al login de alumnos</button>
          </p>
        </div>
      </div>
    </div>
  );
};