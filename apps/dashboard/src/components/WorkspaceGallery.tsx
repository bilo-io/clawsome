// apps/dashboard/src/components/WorkspaceGallery.tsx
'use client';

import React from 'react';
import { Briefcase, User, GraduationCap, Globe, Plus, MapPin, ChevronRight } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const workspaces = [
  { id: '1', icon: Briefcase, name: 'Nightclaw Core', path: '~/BiloDev/nightclaw', status: 'Active', color: 'indigo' },
  { id: '2', icon: Globe, name: 'Cloud Infra', path: '~/cloud-configs', status: 'Idle', color: 'emerald' },
  { id: '3', icon: User, name: 'Personal Lab', path: '~/playground', status: 'Idle', color: 'amber' },
  { id: '4', icon: GraduationCap, name: 'Training AI', path: '~/datasets/v1', status: 'In Progress', color: 'rose' },
];

const getColorClasses = (color: string, theme: 'light' | 'dark') => {
  const isDark = theme === 'dark';
  switch (color) {
    case 'indigo': return isDark ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-indigo-50 text-indigo-600 border-indigo-100';
    case 'emerald': return isDark ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-600 border-emerald-100';
    case 'amber': return isDark ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-amber-50 text-amber-600 border-amber-100';
    case 'rose': return isDark ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-rose-50 text-rose-600 border-rose-100';
    default: return '';
  }
};

export const WorkspaceGallery = () => {
  const { theme } = useUIStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {workspaces.map((ws, i) => (
        <motion.div 
          key={ws.id} 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05 }}
          className={cn(
            "group p-8 rounded-[40px] border transition-all cursor-pointer relative overflow-hidden shadow-xl",
            theme === 'dark' ? "bg-slate-900/40 border-slate-800/60 hover:bg-slate-900 shadow-none" : "bg-white border-slate-100 shadow-slate-200/40 hover:border-indigo-100"
          )}
        >
          <div className="flex items-start justify-between relative z-10">
             <div className={cn("p-4 rounded-2xl shadow-inner border transition-transform group-hover:scale-110", getColorClasses(ws.color, theme))}>
                <ws.icon size={26} />
             </div>
             <span className={cn(
               "text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border shadow-sm",
               ws.status === 'Active' 
                 ? (theme === 'dark' ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" : "text-emerald-600 bg-emerald-50 border-emerald-200") 
                 : (theme === 'dark' ? "text-slate-500 bg-slate-950 border-slate-800" : "text-slate-400 bg-slate-50 border-slate-200")
             )}>
               {ws.status}
             </span>
          </div>
          
          <div className="mt-8 relative z-10">
             <h4 className={cn("text-xl font-black tracking-tighter transition-colors", theme === 'dark' ? "text-slate-200 group-hover:text-white" : "text-slate-950 group-hover:text-indigo-600")}>{ws.name}</h4>
             <div className="flex items-center gap-2 mt-2 group-hover:translate-x-1 transition-transform">
                <MapPin size={12} className="text-slate-500 opacity-60" />
                <p className={cn("text-[10px] font-mono font-bold truncate tracking-tight uppercase", theme === 'dark' ? "text-slate-600" : "text-slate-400")}>{ws.path}</p>
             </div>
          </div>

          <div className={cn(
            "absolute -right-10 -bottom-10 w-40 h-40 blur-[80px] rounded-full opacity-0 group-hover:opacity-20 transition-opacity",
            ws.color === 'indigo' && 'bg-indigo-500',
            ws.color === 'emerald' && 'bg-emerald-500',
            ws.color === 'amber' && 'bg-amber-500',
            ws.color === 'rose' && 'bg-rose-500'
          )} />
          
          <ChevronRight size={24} className={cn("absolute bottom-8 right-8 transition-all opacity-0 group-hover:opacity-100 group-hover:translate-x-2", theme === 'dark' ? "text-slate-800" : "text-slate-100")} />
        </motion.div>
      ))}
      
      <motion.button 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: workspaces.length * 0.05 }}
        className={cn(
          "p-8 rounded-[40px] border-2 border-dashed border-slate-200 dark:border-slate-800/50 hover:border-indigo-500/50 hover:bg-white dark:hover:bg-slate-950/50 transition-all flex flex-col items-center justify-center gap-4 group active:scale-95 shadow-inner",
          theme === 'light' && "bg-slate-50/50 hover:shadow-2xl hover:shadow-indigo-500/10"
        )}
      >
         <div className={cn(
           "p-4 rounded-full transition-all group-hover:rotate-90 group-hover:scale-110",
           theme === 'dark' ? "bg-slate-900 border border-slate-800 text-slate-500 group-hover:text-indigo-400" : "bg-white border border-slate-100 text-slate-400 group-hover:text-indigo-600 shadow-sm"
         )}>
            <Plus size={28} />
         </div>
         <span className={cn("text-[11px] font-black uppercase tracking-[0.3em]", theme === 'dark' ? "text-slate-600 group-hover:text-indigo-400" : "text-slate-500 group-hover:text-indigo-600")}>Initialize Workspace</span>
      </motion.button>
    </div>
  );
};
