// apps/dashboard/src/app/workspaces/page.tsx
'use client';

import React from 'react';
import { WorkspaceGallery } from '@/components/WorkspaceGallery';
import { PageHeader } from '@/components/PageHeader';
import { Briefcase, Globe, Plus, Search, ChevronRight, Activity } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function WorkspacesPage() {
  const { theme } = useUIStore();

  return (
    <main className="space-y-10 pb-20 max-w-[1600px] mx-auto">
      <PageHeader
        title="WORKSPACE HUB"
        badge="NC-CONTEXT"
        statusLabel="Active Contexts:"
        statusValue="Isolated"
        statusColor="emerald"
      >
        <div className="flex items-center gap-4">
           <div className={cn(
             "px-6 py-3 rounded-2xl border flex flex-col items-end shadow-xl transition-all",
             theme === 'dark' ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100 shadow-slate-200/40"
           )}>
              <span className={cn("text-[10px] font-black uppercase tracking-widest", theme === 'dark' ? "text-slate-500" : "text-slate-400")}>Storage Consumption</span>
              <span className="text-2xl font-black text-indigo-500 tracking-tighter">1.4GB</span>
           </div>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
         <div className="lg:col-span-3 space-y-10">
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-500">
                   <Briefcase size={18} />
                 </div>
                 <h2 className={cn("text-[11px] font-black uppercase tracking-[0.3em]", theme === 'dark' ? "text-slate-500" : "text-slate-600")}>Available Environments</h2>
              </div>
              <WorkspaceGallery />
            </section>
         </div>

         <div className="space-y-10">
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-500">
                   <Globe size={18} />
                 </div>
                 <h2 className={cn("text-[11px] font-black uppercase tracking-[0.3em]", theme === 'dark' ? "text-slate-500" : "text-slate-600")}>External Sync</h2>
              </div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  "p-8 rounded-[32px] border transition-all shadow-xl space-y-6",
                  theme === 'dark' ? "bg-slate-900/40 border-slate-800/60 shadow-none" : "bg-white border-slate-100 shadow-slate-200/40"
                )}
              >
                 <div className="flex items-center justify-between">
                    <span className={cn("text-[10px] font-black uppercase tracking-widest", theme === 'dark' ? "text-slate-500" : "text-slate-400")}>GitHub Status</span>
                    <span className="text-[10px] font-black tracking-tighter uppercase px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full border border-emerald-500/20">Operational</span>
                 </div>
                 <div className="flex items-center justify-between">
                    <span className={cn("text-[10px] font-black uppercase tracking-widest", theme === 'dark' ? "text-slate-500" : "text-slate-400")}>CloudFlare Tunnel</span>
                    <span className="text-[10px] font-black tracking-tighter uppercase px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full border border-emerald-500/20">Connected</span>
                 </div>
                 
                 <div className={cn("pt-6 border-t flex flex-col gap-2", theme === 'dark' ? "border-slate-800" : "border-slate-50")}>
                    <button className={cn(
                      "w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 flex items-center justify-between px-6 border hover:shadow-xl",
                      theme === 'dark' ? "bg-slate-900 border-slate-800 text-slate-500 hover:text-white" : "bg-white border-slate-100 text-slate-500 hover:text-emerald-600 hover:border-emerald-100 shadow-sm"
                    )}>
                      Sync Status Repo
                      <Activity size={16} />
                    </button>
                 </div>
              </motion.div>
            </section>
            
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-10 bg-indigo-600 rounded-[48px] shadow-2xl shadow-indigo-600/30 text-white space-y-6 overflow-hidden relative group"
            >
               <div className="relative z-10 space-y-6">
                 <div className="p-3 bg-white/20 w-fit rounded-2xl border border-white/20">
                    <Plus size={24} className="group-hover:rotate-90 transition-transform" />
                 </div>
                 <div className="space-y-2">
                   <h3 className="text-xl font-black uppercase tracking-[0.2em]">NC-Swarms</h3>
                   <p className="text-xs text-indigo-100/80 leading-relaxed font-bold uppercase tracking-widest italic pt-2">
                      Deploy specialized agent swarms to analyze entire workspace galleries for architectural drift.
                   </p>
                 </div>
                 <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:bg-indigo-50 active:scale-95 shadow-xl">
                    Initiate Global Audit
                 </button>
               </div>
               
               {/* Abstract background graphics */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full" />
               <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-700/30 blur-2xl rounded-full" />
            </motion.section>
         </div>
      </div>
    </main>
  );
}
