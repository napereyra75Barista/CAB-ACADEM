
import React from 'react';
import { User } from '../types';
import { Camera, Save, Coffee, Mail, User as UserIcon, Sparkles, Award, Star, Users, ShieldCheck } from 'lucide-react';
import { Heading, Text } from './ui/Typography';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

interface UserProfileProps {
  user: User;
  onSave: (updatedUser: User) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, onSave }) => {
  const [formData, setFormData] = React.useState<User>(user);
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simular guardado
    setTimeout(() => {
      onSave(formData);
      setIsSaving(false);
    }, 1000);
  };

  const isTeacher = user.role === 'teacher';

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex justify-between items-end gap-6">
        <div className="space-y-2">
          <Heading as="h1" className="text-4xl md:text-5xl">{isTeacher ? 'Perfil de Instructor' : 'Mi Perfil Académico'}</Heading>
          <Text className="text-lg">Gestiona tu identidad y preferencias en el campus.</Text>
        </div>
        {isTeacher && <Badge variant="gold" className="px-4 py-2 text-xs">Verified Educator</Badge>}
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Lado Izquierdo: Resumen y Avatar */}
        <div className="space-y-8">
          <div className="glass-card p-10 rounded-[3rem] border border-white/5 text-center space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-coffee-gold/10 to-transparent"></div>
            
            <div className="relative inline-block group">
              <div className="w-40 h-40 rounded-[3rem] bg-coffee-dark mx-auto p-1 border-2 border-coffee-gold overflow-hidden">
                <img src={formData.avatar} alt={formData.name} className="w-full h-full object-cover rounded-[2.8rem]" />
              </div>
              <button className="absolute bottom-0 right-0 p-3 bg-coffee-gold text-white rounded-2xl shadow-xl hover:scale-110 transition-transform">
                <Camera size={20} />
              </button>
            </div>

            <div className="space-y-2">
              <Heading as="h3" className="text-3xl">{formData.name}</Heading>
              <Badge variant="gold" dot>{isTeacher ? 'Head Instructor' : `${formData.level} Barista`}</Badge>
            </div>

            <div className="pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-xl font-bold text-white">{user.xp.toLocaleString()}</div>
                <div className="text-[10px] text-gray-500 uppercase font-black">Puntos XP</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-white">{user.streak}</div>
                <div className="text-[10px] text-gray-500 uppercase font-black">Días Racha</div>
              </div>
            </div>

            {isTeacher && (
              <div className="bg-coffee-gold/5 p-4 rounded-2xl border border-coffee-gold/10 text-left space-y-3">
                 <div className="flex items-center gap-2 text-xs font-black text-coffee-gold uppercase tracking-widest">
                   <ShieldCheck size={14} /> Permisos Docentes
                 </div>
                 <ul className="text-[10px] text-gray-400 space-y-1">
                   <li>• Crear y editar cursos</li>
                   <li>• Moderación de comunidad</li>
                   <li>• Emisión de certificados</li>
                 </ul>
              </div>
            )}
          </div>

          <div className="glass-card p-8 rounded-[2.5rem] border border-white/5 space-y-6">
             <h4 className="font-bold text-white flex items-center gap-2"><Award size={18} className="text-coffee-gold" /> Logros destacados</h4>
             <div className="flex flex-wrap gap-2">
                {['Master Brew', 'Elite Palate', 'Top 1%'].map(l => (
                  <Badge key={l} variant="outline" className="text-[8px]">{l}</Badge>
                ))}
             </div>
          </div>
        </div>

        {/* Lado Derecho: Formulario de Edición */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="glass-card p-10 md:p-12 rounded-[3.5rem] border border-white/5 space-y-10">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <UserIcon size={14} /> Nombre Completo
                </label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-coffee-gold transition-all"
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <Mail size={14} /> Email Institucional
                </label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-coffee-gold transition-all"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <Sparkles size={14} /> Bio Profesional
              </label>
              <textarea 
                rows={4}
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-coffee-gold transition-all resize-none"
              />
            </div>

            <div className="space-y-6">
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <Coffee size={14} /> Preferencias de Métodos
              </label>
              <div className="flex flex-wrap gap-3">
                {['Espresso', 'V60', 'Chemex', 'Aeropress', 'Sifón', 'Moka'].map(method => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => {
                      const methods = formData.preferences.methods.includes(method)
                        ? formData.preferences.methods.filter(m => m !== method)
                        : [...formData.preferences.methods, method];
                      setFormData({...formData, preferences: {...formData.preferences, methods}});
                    }}
                    className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                      formData.preferences.methods.includes(method)
                        ? 'bg-coffee-gold border-coffee-gold text-white'
                        : 'bg-white/5 border-white/10 text-gray-500 hover:text-white'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row gap-4">
              <Button 
                type="submit" 
                disabled={isSaving}
                className="flex-1 gap-2 h-14"
              >
                {isSaving ? 'Guardando...' : <><Save size={18} /> Guardar Cambios</>}
              </Button>
              <Button variant="glass" type="button" className="flex-1 h-14">Cancelar</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
