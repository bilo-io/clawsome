'use client';

import React, { useState } from 'react';
import { Terminal, Activity, Bell, Filter, ChevronRight, LayoutGrid, List, Search, ChevronDown, Clock, ShieldCheck, Box } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardResourceHeader } from '@/components/DashboardResourceHeader';

interface LogEntry {
  id: string;
  time: string;
  level: 'INFO' | 'EXEC' | 'WARN' | 'SUCCESS' | 'ERROR';
  module: string;
  message: string;
  details?: {
    rawOutput?: string;
    environment?: string;
    stackTrace?: string;
    duration?: string;
  };
}

const MOCK_LOGS: LogEntry[] = [
  { 
    id: '1', 
    time: '01:23:45', 
    level: 'INFO', 
    module: 'CORE', 
    message: 'Agent swarm initiated in sandbox-01',
    details: {
      environment: 'production-us-east-1',
      duration: '450ms',
      rawOutput: 'Initializing neural link... \n[OK] Swarm size: 5\n[OK] Isolation level: L2'
    }
  },
  { 
    id: '2', 
    time: '01:23:48', 
    level: 'EXEC', 
    module: 'BASH', 
    message: 'bun run build --filter dashboard',
    details: {
      rawOutput: 'bun build v1.0.0\n  - dashboard [DONE] 1.2s\n  - website [SKIPPED]',
      duration: '1240ms'
    }
  },
  { 
    id: '3', 
    time: '01:24:02', 
    level: 'WARN', 
    module: 'NET', 
    message: 'Inbound socket latency > 200ms',
    details: {
      environment: 'edge-node-04',
      rawOutput: 'Warning: [NET-78] Latency spike detected. Current: 245ms. Threshold: 200ms.'
    }
  },
  { 
    id: '4', 
    time: '01:24:15', 
    level: 'INFO', 
    module: 'OS', 
    message: 'Memory pressure detected - clearing buffers',
    details: {
      environment: 'clawsome-main-node',
      rawOutput: 'Mem: 94% utilized. Triggering GC sweep...\n[OK] Reclaimed 452MB.'
    }
  },
  { 
    id: '5', 
    time: '01:25:01', 
    level: 'SUCCESS', 
    module: 'CORE', 
    message: 'Mission phase 2 synchronized successfully',
    details: {
      duration: '15.4s',
      rawOutput: 'Phase 2: Data Extraction [COMPLETE]\nPhase 3: Vector Encoding [READY]'
    }
  },
];

const getLevelColor = (level: string) => {
  switch (level) {
    case 'EXEC': return 'text-indigo-400';
    case 'WARN': return 'text-amber-500';
    case 'SUCCESS': return 'text-emerald-500';
    case 'ERROR': return 'text-rose-500';
    default: return 'text-slate-400';
  }
};

const getLevelBg = (level: string) => {
  switch (level) {
    case 'EXEC': return 'bg-indigo-500/10 text-indigo-400';
    case 'WARN': return 'bg-amber-500/10 text-amber-500';
    case 'SUCCESS': return 'bg-emerald-500/10 text-emerald-500';
    case 'ERROR': return 'bg-rose-500/10 text-rose-500';
    default: return 'bg-slate-500/10 text-slate-400';
  }
};

export default function LogsPage() {
  const { theme } = useUIStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredLogs = MOCK_LOGS.filter(log => 
    log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.module.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <main className="space-y-10 pb-20 max-w-[1400px] mx-auto">
      <DashboardResourceHeader
        title="Logs"
        description="High-fidelity traceability stream monitoring system-level operations, neural link events, and mission execution traces."
        badge="NC-STREAM"
        statusLabel="Operational Status:"
        statusValue="Live Feed"
        statusColor="emerald"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        renderRight={
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
        }
      />

      <div className="space-y-4">
        {viewMode === 'list' ? (
          <div className={cn(
            "rounded-[32px] border overflow-hidden shadow-2xl transition-all",
            theme === 'dark' ? "bg-slate-950 border-slate-900" : "bg-white border-slate-100 shadow-slate-200/40"
          )}>
            <div className={cn(
              "p-5 border-b flex items-center justify-between text-[11px] font-black uppercase tracking-widest px-8",
              theme === 'dark' ? "bg-slate-900/50 border-slate-800 text-slate-500" : "bg-slate-50/50 border-slate-100 text-slate-400"
            )}>
              <div className="flex items-center gap-10">
                <span className="w-24">Timestamp</span>
                <span className="w-24">Priority</span>
                <span className="w-24">Module</span>
              </div>
              <span className="flex-1 text-right">Event Description</span>
            </div>
            
            <div className={cn(
              "font-mono text-[12px] divide-y",
              theme === 'dark' ? "bg-slate-950 divide-slate-900" : "bg-white divide-slate-100"
            )}>
              {filteredLogs.map((log) => (
                <div key={log.id} className="flex flex-col group">
                  <div 
                    onClick={() => toggleExpand(log.id)}
                    className={cn(
                      "flex items-center gap-10 p-5 px-8 transition-all cursor-pointer",
                      theme === 'dark' ? "hover:bg-slate-900/40" : "hover:bg-slate-50"
                    )}
                  >
                    <span className={cn("w-24 tabular-nums font-bold opacity-40", theme === 'light' && "text-slate-400")}>{log.time}</span>
                    <span className={cn("w-24 font-black flex items-center gap-2", getLevelColor(log.level))}>
                      <span className={cn("w-1.5 h-1.5 rounded-full", getLevelColor(log.level).replace('text-', 'bg-'))} />
                      {log.level}
                    </span>
                    <span className={cn("w-24 font-bold opacity-60", theme === 'light' && "text-slate-500")}>{log.module}</span>
                    <span className={cn("font-medium flex-1 text-right truncate", theme === 'dark' ? "text-slate-300 group-hover:text-white" : "text-slate-700 group-hover:text-slate-950")}>
                      {log.message}
                    </span>
                    <ChevronDown size={14} className={cn(
                      "ml-6 transition-transform duration-300 shrink-0",
                      expandedId === log.id ? "rotate-180" : "opacity-20 group-hover:opacity-100"
                    )} />
                  </div>

                  <AnimatePresence>
                    {expandedId === log.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className={cn(
                          "px-8 py-8 border-t space-y-8",
                          theme === 'dark' ? "bg-slate-900/20 border-slate-900" : "bg-slate-50 border-slate-100"
                        )}>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                             <div className="space-y-2">
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Environment</span>
                                <div className="flex items-center gap-2">
                                   <Box size={14} className="text-indigo-500" />
                                   <span className="font-bold">{log.details?.environment || 'N/A'}</span>
                                </div>
                             </div>
                             <div className="space-y-2">
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Duration</span>
                                <div className="flex items-center gap-2">
                                   <Clock size={14} className="text-emerald-500" />
                                   <span className="font-bold">{log.details?.duration || 'N/A'}</span>
                                </div>
                             </div>
                             <div className="space-y-2">
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Integrity</span>
                                <div className="flex items-center gap-2 text-emerald-500">
                                   <ShieldCheck size={14} />
                                   <span className="font-black">VERIFIED</span>
                                </div>
                             </div>
                          </div>

                          <div className="space-y-3">
                             <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Raw Neural Trace</span>
                             <pre className={cn(
                               "p-6 rounded-2xl border text-[11px] leading-relaxed overflow-x-auto",
                               theme === 'dark' ? "bg-black/40 border-slate-800 text-slate-400" : "bg-white border-slate-200 text-slate-600"
                             )}>
                               {log.details?.rawOutput || 'No trace data captured for this event.'}
                             </pre>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <div className="p-8 flex items-center gap-4 text-indigo-500/50 font-black italic border-t border-slate-900/50">
                 <span className="animate-pulse text-lg">_</span>
                 <span className="text-[11px] uppercase tracking-[0.3em]">Awaiting incoming trace pulses...</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLogs.map((log) => (
              <motion.div
                layout
                key={log.id}
                onClick={() => toggleExpand(log.id)}
                className={cn(
                  "p-8 rounded-[40px] border transition-all cursor-pointer group relative overflow-hidden",
                  theme === 'dark' 
                    ? "bg-slate-900/40 border-slate-800/60 hover:bg-slate-900/60 hover:border-indigo-500/30" 
                    : "bg-white border-slate-100 shadow-xl shadow-slate-200/40 hover:border-indigo-100"
                )}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className={cn("px-4 py-1 rounded-xl text-[10px] font-black tracking-widest", getLevelBg(log.level))}>
                    {log.level}
                  </div>
                  <span className="text-[10px] font-black opacity-40 tabular-nums">{log.time}</span>
                </div>
                
                <h3 className={cn("text-lg font-black tracking-tight mb-2", theme === 'dark' ? "text-white" : "text-slate-900")}>
                  {log.module}
                </h3>
                <p className={cn("text-sm font-medium leading-relaxed italic", theme === 'dark' ? "text-slate-400" : "text-slate-500")}>
                  "{log.message}"
                </p>

                <div className="mt-8 flex items-center justify-between">
                   <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className={cn("w-6 h-6 rounded-full border-2", theme === 'dark' ? "bg-slate-800 border-slate-900" : "bg-slate-100 border-white")} />
                      ))}
                   </div>
                   <div className="flex items-center gap-2 opacity-40 group-hover:opacity-100 transition-all">
                      <span className="text-[9px] font-black uppercase tracking-widest">Trace Detail</span>
                      <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                   </div>
                </div>

                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity"
                )} />
              </motion.div>
            ))}
          </div>
        )}
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
