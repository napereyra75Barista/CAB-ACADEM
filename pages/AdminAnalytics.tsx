
import React from 'react';
import { Heading, Text } from '../components/ui/Typography';
import { 
  TrendingUp, Users, DollarSign, Target, 
  ArrowUpRight, ArrowDownRight, PieChart, 
  BarChart3, RefreshCw, AlertTriangle, 
  ChevronRight, Calendar, Filter
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';

export const AdminAnalytics: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-coffee-gold font-black text-[10px] uppercase tracking-[0.4em]">
             <BarChart3 size={14} fill="currentColor" /> BI & Business Intelligence
          </div>
          <Heading as="h1" className="text-5xl">Dashboard Ejecutivo</Heading>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-bold text-xs text-gray-400 hover:text-white transition-all">
              <Calendar size={16} /> Últimos 30 días
           </button>
           <button className="flex items-center gap-2 px-6 py-3 bg-coffee-gold text-white rounded-xl font-bold text-xs hover:bg-coffee-goldLight transition-all shadow-lg shadow-coffee-gold/20">
              <RefreshCw size={16} /> Refrescar Datos
           </button>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Revenue MRR', value: '$2.480k', trend: '+22.5%', icon: DollarSign, color: 'text-green-500' },
          { label: 'CAC Promedio', value: '$3.400', trend: '-8.2%', icon: Target, color: 'text-blue-500' },
          { label: 'LTV Estimado', value: '$45.800', trend: '+12.1%', icon: TrendingUp, color: 'text-coffee-gold' },
          { label: 'Churn Rate', value: '4.2%', trend: '+0.5%', icon: AlertTriangle, color: 'text-red-500' }
        ].map((metric, i) => (
          <div key={i} className="glass-card p-8 rounded-[2.5rem] border border-white/5 space-y-4">
             <div className="flex justify-between items-center">
                <div className={`p-3 rounded-xl bg-white/5 ${metric.color}`}>
                   <metric.icon size={20} />
                </div>
                <div className={`flex items-center gap-1 text-[10px] font-black ${metric.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                   {metric.trend.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                   {metric.trend}
                </div>
             </div>
             <div>
                <div className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{metric.label}</div>
                <div className="text-3xl font-bold text-white mt-1">{metric.value}</div>
             </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Conversion Funnel */}
        <div className="lg:col-span-2 glass-card p-10 rounded-[3rem] border border-white/5 space-y-10">
           <div className="flex justify-between items-center">
              <Heading as="h3" className="text-xl">Funnel de Conversión Académica</Heading>
              <Badge variant="outline">Live Tracking</Badge>
           </div>
           
           <div className="space-y-6">
              {[
                { label: 'Visitas Web', value: '45.000', percentage: 100, color: 'bg-gray-700' },
                { label: 'Registros Campus', value: '8.400', percentage: 18.6, color: 'bg-coffee-gold/40' },
                { label: 'Compra de Curso', value: '1.240', percentage: 2.7, color: 'bg-coffee-gold/70' },
                { label: 'Finalización (Certificado)', value: '890', percentage: 1.9, color: 'bg-coffee-gold' }
              ].map((step, i) => (
                <div key={i} className="space-y-2">
                   <div className="flex justify-between text-xs font-bold">
                      <span className="text-gray-300">{step.label}</span>
                      <span className="text-white">{step.value} <span className="text-gray-500 ml-2">({step.percentage}%)</span></span>
                   </div>
                   <div className="w-full bg-white/5 h-4 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-1000 ${step.color}`} style={{ width: `${step.percentage}%` }}></div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Top Courses by Revenue */}
        <div className="glass-card p-10 rounded-[3rem] border border-white/5 space-y-8">
           <Heading as="h3" className="text-xl">Top Revenue</Heading>
           <div className="space-y-6">
              {[
                { title: 'Barista Inicial', revenue: '$840k', share: 45 },
                { title: 'Coffee Business', revenue: '$620k', share: 30 },
                { title: 'Latte Art Pro', revenue: '$310k', share: 15 },
                { title: 'Otros', revenue: '$210k', share: 10 }
              ].map((course, i) => (
                <div key={i} className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-coffee-dark border border-white/5 flex items-center justify-center font-bold text-coffee-gold text-xs">{i+1}</div>
                   <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-white truncate">{course.title}</div>
                      <div className="text-[10px] text-gray-500 font-bold">{course.revenue} • {course.share}% del total</div>
                   </div>
                   <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="bg-coffee-gold h-full" style={{ width: `${course.share}%` }}></div>
                   </div>
                </div>
              ))}
           </div>
           <button className="w-full py-4 border border-white/10 rounded-2xl text-xs font-bold text-gray-500 hover:text-white transition-all">Explorar Informe de Ventas</button>
        </div>
      </div>

      {/* Retention Cohorts Mockup */}
      <div className="glass-card p-10 rounded-[3rem] border border-white/5 space-y-8 overflow-hidden">
         <Heading as="h3" className="text-xl">Análisis de Cohortes (Retención M1-M6)</Heading>
         <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse">
               <thead>
                  <tr className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
                     <th className="p-4 text-left">Cohorte</th>
                     <th className="p-4">Alumnos</th>
                     <th className="p-4">Mes 1</th>
                     <th className="p-4">Mes 2</th>
                     <th className="p-4">Mes 3</th>
                     <th className="p-4">Mes 4</th>
                  </tr>
               </thead>
               <tbody className="text-sm">
                  {[
                    { month: 'Enero 2024', size: 1240, m1: 100, m2: 82, m3: 74, m4: 68 },
                    { month: 'Febrero 2024', size: 1050, m1: 100, m2: 78, m3: 69, m4: 62 },
                    { month: 'Marzo 2024', size: 1420, m1: 100, m2: 85, m3: 72, m4: 65 }
                  ].map((row, i) => (
                    <tr key={i} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                       <td className="p-4 text-left font-bold text-gray-300">{row.month}</td>
                       <td className="p-4 font-bold text-white">{row.size}</td>
                       <td className="p-4 bg-coffee-gold/40 text-white">100%</td>
                       <td className={`p-4 ${row.m2 > 80 ? 'bg-coffee-gold/30' : 'bg-coffee-gold/20'}`}>{row.m2}%</td>
                       <td className="p-4 bg-coffee-gold/15">{row.m3}%</td>
                       <td className="p-4 bg-coffee-gold/10">{row.m4}%</td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};
