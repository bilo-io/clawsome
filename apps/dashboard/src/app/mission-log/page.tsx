// apps/dashboard/src/app/mission-log/page.tsx
'use client';

import React from 'react';
import { Terminal, Activity, Bell, Filter, ChevronRight } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';

const logs = [
  { time: '01:23:45', level: 'INFO', module: 'CORE', message: 'Agent swarm initiated in sandbox-01' },
  { time: '01:23:48', level: 'EXEC', module: 'BASH', message: 'bun run build --filter dashboard' },
  { time: '01:24:02', level: 'WARN', module: 'NET', message: 'Inbound socket latency > 200ms' },
  { time: '01:24:15', level: 'INFO', module: 'OS', message: 'Memory pressure detected - clearing buffers' },
  { time: '01:25:01', level: 'SUCCESS', module: 'CORE', message: 'Mission phase 2 synchronized successfully' },
];

const getLevelColor = (level: string) => {
  switch (level) {
    case 'EXEC': return 'text-indigo-400';
    case 'WARN': return 'text-amber-500';
    case 'SUCCESS': return 'text-emerald-500';
    default: return 'text-slate-400';
  }
};

export default function MissionLogPage() {
  const { theme } = useUIStore();

  return (
    <main className="space-y-10 pb-20 max-w-[1400px] mx-auto">
      <PageHeader
        title="MISSION LOG"
        badge="NC-STREAM"
        statusLabel="Operational Status:"
        statusValue="Live Feed"
        statusColor="emerald"
      >
        <div className="flex items-center gap-4">
           <button className={cn(
             "px-6 py-3 rounded-2xl border text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 shadow-sm active:scale-95",
             theme === 'dark' ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white" : "bg-white border-slate-200 text-slate-600 hover:text-slate-950 hover:border-slate-300"
           )}>
              <Filter size={16} /> SET VERBOSITY
           </button>
           <button className="px-6 py-3 bg-indigo-600 rounded-2xl text-[10px] font-bold text-white uppercase tracking-widest transition-all hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 active:scale-95 flex items-center gap-2">
              <Bell size={16} /> ALERTS (2)
           </button>
        </div>
      </PageHeader>

      <div className={cn(
        "rounded-[32px] border overflow-hidden shadow-2xl transition-all",
        theme === 'dark' ? "bg-slate-950 border-slate-900" : "bg-white border-slate-100 shadow-slate-200/40"
      )}>
         <div className={cn(
           "p-5 border-b flex items-center justify-between text-[11px] font-black uppercase tracking-widest",
           theme === 'dark' ? "bg-slate-900/50 border-slate-800 text-slate-500" : "bg-slate-50/50 border-slate-100 text-slate-400"
         )}>
            <div className="flex items-center gap-10">
               <span className="w-20">Timestamp</span>
               <span className="w-20">Priority</span>
               <span className="w-20">Module</span>
            </div>
            <span>Event Description</span>
         </div>
         
         <div className={cn(
           "p-6 font-mono text-[13px] space-y-4 max-h-[60vh] overflow-y-auto no-scrollbar",
           theme === 'dark' ? "bg-slate-950" : "bg-white"
         )}>
            {logs.map((log, i) => (
              <div key={i} className={cn(
                "flex gap-10 group p-2 rounded-xl transition-all border border-transparent",
                theme === 'dark' ? "hover:bg-slate-900/40 hover:border-indigo-500/10" : "hover:bg-slate-50 hover:border-indigo-100"
              )}>
                <span className={cn("w-20 tabular-nums font-bold opacity-40", theme === 'light' && "text-slate-400")}>{log.time}</span>
                <span className={cn("w-20 font-black", getLevelColor(log.level))}>[{log.level}]</span>
                <span className={cn("w-20 font-bold opacity-60", theme === 'light' && "text-slate-500")}>{log.module}</span>
                <span className={cn("font-medium flex-1", theme === 'dark' ? "text-slate-300 group-hover:text-white" : "text-slate-700 group-hover:text-slate-950")}>{log.message}</span>
              </div>
            ))}
            <div className="pt-8 flex items-center gap-4 text-indigo-500/50 font-black italic">
               <span className="animate-pulse text-lg">_</span>
               <span className="text-[11px] uppercase tracking-[0.3em]">Awaiting incoming trace pulses...</span>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className={cn(
           "p-8 rounded-[32px] border transition-all shadow-xl flex items-center gap-6 group",
           theme === 'dark' ? "bg-slate-900/40 border-slate-800/60" : "bg-white border-slate-100 shadow-slate-200/40 hover:border-indigo-100"
         )}>
            <div className="p-4 bg-indigo-500/10 rounded-2xl text-indigo-500 border border-indigo-500/20 group-hover:scale-110 transition-transform">
               <Activity size={28} />
            </div>
            <div>
               <span className={cn("block text-3xl font-black tracking-tighter", theme === 'dark' ? "text-white" : "text-slate-950")}>4.2k</span>
               <span className={cn("text-[10px] font-bold uppercase tracking-[0.2em]", theme === 'dark' ? "text-slate-600" : "text-slate-500")}>Events / Hour</span>
            </div>
         </div>
         <div className={cn(
           "p-8 rounded-[32px] border transition-all shadow-xl flex items-center gap-6 group",
           theme === 'dark' ? "bg-slate-900/40 border-slate-800/60" : "bg-white border-slate-100 shadow-slate-200/40 hover:border-emerald-100"
         )}>
            <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-500 border border-emerald-500/20 group-hover:scale-110 transition-transform">
               <Terminal size={28} />
            </div>
            <div>
               <span className={cn("block text-3xl font-black tracking-tighter", theme === 'dark' ? "text-white" : "text-slate-950")}>842</span>
               <span className={cn("text-[10px] font-bold uppercase tracking-[0.2em]", theme === 'dark' ? "text-slate-600" : "text-slate-500")}>Bash Executions</span>
            </div>
         </div>
         <div className={cn(
           "p-8 rounded-[32px] border transition-all shadow-xl flex items-center gap-6 group border-dashed",
           theme === 'dark' ? "bg-slate-900/20 border-slate-800/60" : "bg-slate-50 border-slate-200 hover:bg-white hover:border-indigo-200"
         )}>
            <div className="p-4 bg-slate-200 dark:bg-slate-800 rounded-2xl text-slate-500 group-hover:rotate-12 transition-transform">
               <Filter size={28} />
            </div>
            <div className="flex-1">
               <button className={cn(
                 "w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 flex items-center justify-between px-5",
                 theme === 'dark' ? "bg-slate-950/50 text-slate-500 hover:text-white" : "bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 shadow-sm"
               )}>
                  Open Audit Filter
                  <ChevronRight size={16} />
               </button>
            </div>
         </div>
      </div>
    </main>
  );
}
