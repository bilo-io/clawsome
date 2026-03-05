// apps/dashboard/src/app/analytics/page.tsx
'use client';

import React from 'react';
import { Cpu, BarChart3, PieChart, TrendingUp, Zap, ChevronRight } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import { PageHeader } from '@/components/PageHeader';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const resourceData = [
  { name: '00:00', cpu: 45, mem: 60, cost: 2.1 },
  { name: '04:00', cpu: 32, mem: 55, cost: 1.8 },
  { name: '08:00', cpu: 65, mem: 75, cost: 3.5 },
  { name: '12:00', cpu: 85, mem: 80, cost: 4.2 },
  { name: '16:00', cpu: 55, mem: 65, cost: 2.8 },
  { name: '20:00', cpu: 40, mem: 60, cost: 2.4 },
];

export default function AnalyticsPage() {
  const { theme } = useUIStore();
  
  return (
    <main className="space-y-10 pb-20 max-w-[1600px] mx-auto">
      <PageHeader
        title="ANALYTICS"
        badge="NC-TELEMETRY"
        statusLabel="Data Sampling:"
        statusValue="High Precision"
        statusColor="indigo"
      >
        <div className="flex items-center gap-4">
           <div className={cn(
             "px-6 py-3 rounded-2xl border flex flex-col items-end shadow-xl",
             theme === 'dark' ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100 shadow-slate-200/40"
           )}>
              <span className={cn("text-[10px] font-black uppercase tracking-widest", theme === 'dark' ? "text-slate-500" : "text-slate-400")}>Efficiency Rating</span>
              <span className="text-2xl font-black text-emerald-500 tracking-tighter">92.4%</span>
           </div>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <motion.section 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className={cn(
             "p-8 rounded-[40px] border shadow-xl space-y-8",
             theme === 'dark' ? "bg-slate-900/40 border-slate-800/60 shadow-none" : "bg-white border-slate-100 shadow-slate-200/40"
           )}
         >
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-500">
                     <BarChart3 size={20} />
                  </div>
                  <h2 className={cn("text-lg font-bold tracking-tight", theme === 'dark' ? "text-white" : "text-slate-950")}>Resource Load History</h2>
               </div>
               <span className={cn("text-[10px] font-black uppercase tracking-widest", theme === 'dark' ? "text-slate-500" : "text-slate-400")}>Last 24 Hours</span>
            </div>
            <div className="h-72 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={resourceData}>
                     <defs>
                        <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                           <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#1e293b' : '#f1f5f9'} vertical={false} />
                     <XAxis dataKey="name" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} tick={{ fontWeight: 700 }} />
                     <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} tick={{ fontWeight: 700 }} />
                     <Tooltip 
                        contentStyle={{ 
                          backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff', 
                          border: theme === 'dark' ? '1px solid #1e293b' : '1px solid #f1f5f9', 
                          borderRadius: '16px',
                          boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
                        }}
                        itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                     />
                     <Area type="monotone" dataKey="cpu" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorCpu)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </motion.section>

         <motion.section 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           className={cn(
             "p-8 rounded-[40px] border shadow-xl space-y-8",
             theme === 'dark' ? "bg-slate-900/40 border-slate-800/60 shadow-none" : "bg-white border-slate-100 shadow-slate-200/40"
           )}
         >
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-500">
                     <TrendingUp size={20} />
                  </div>
                  <h2 className={cn("text-lg font-bold tracking-tight", theme === 'dark' ? "text-white" : "text-slate-950")}>Project Run-Rate</h2>
               </div>
               <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Estimated +2.4%</span>
            </div>
            <div className="h-72 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={resourceData}>
                     <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#1e293b' : '#f1f5f9'} vertical={false} />
                     <XAxis dataKey="name" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} tick={{ fontWeight: 700 }} />
                     <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} tick={{ fontWeight: 700 }} />
                     <Tooltip 
                        contentStyle={{ 
                          backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff', 
                          border: theme === 'dark' ? '1px solid #1e293b' : '1px solid #f1f5f9', 
                          borderRadius: '16px',
                          boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
                        }}
                        itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                     />
                     <Line type="monotone" dataKey="cost" stroke="#10b981" strokeWidth={4} dot={{ r: 6, fill: '#10b981', strokeWidth: 2, stroke: theme === 'dark' ? '#0f172a' : '#fff' }} />
                  </LineChart>
               </ResponsiveContainer>
            </div>
         </motion.section>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
         {[
           { label: 'Token Throughput', value: '42.8k', unit: '/min', icon: Zap, color: 'text-amber-500', bgColor: 'bg-amber-500/10' },
           { label: 'Active Runtimes', value: '12', unit: 'INSTANCES', icon: Cpu, color: 'text-indigo-500', bgColor: 'bg-indigo-500/10' },
           { label: 'Latency (Avg)', value: '142', unit: 'MS', icon: TrendingUp, color: 'text-emerald-500', bgColor: 'bg-emerald-500/10' },
           { label: 'Distribution', value: '8', unit: 'REGIONS', icon: PieChart, color: 'text-rose-500', bgColor: 'bg-rose-500/10' },
         ].map((stat, i) => (
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.2 + i * 0.05 }}
             key={stat.label} 
             className={cn(
               "p-8 rounded-[32px] border transition-all shadow-xl group overflow-hidden relative",
               theme === 'dark' ? "bg-slate-900/40 border-slate-800/60 shadow-none" : "bg-white border-slate-100 shadow-slate-200/40 hover:border-indigo-100"
             )}
           >
              <div className={cn("p-3 w-fit rounded-2xl mb-6 shadow-inner border border-transparent group-hover:scale-110 transition-transform", stat.bgColor, theme === 'light' && "border-slate-100")}>
                <stat.icon size={26} className={stat.color} />
              </div>
              <div className="relative z-10">
                <span className={cn("block text-4xl font-black tracking-tighter mb-2", theme === 'dark' ? "text-white" : "text-slate-950")}>{stat.value}</span>
                <div className="flex items-center justify-between">
                   <span className={cn("text-[10px] font-black uppercase tracking-[0.2em]", theme === 'dark' ? "text-slate-600" : "text-slate-500")}>{stat.label}</span>
                   <span className={cn("text-[10px] font-mono font-black", theme === 'dark' ? "text-slate-700" : "text-indigo-600/60")}>{stat.unit}</span>
                </div>
              </div>
              
              {/* Subtle ambient light */}
              <div className={cn(
                "absolute -bottom-10 -right-10 w-24 h-24 blur-3xl rounded-full opacity-0 group-hover:opacity-20 transition-opacity",
                stat.bgColor.replace('/10', '')
              )} />
           </motion.div>
         ))}
      </div>
    </main>
  );
}
