'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Plus, 
  FolderKanban, 
  LayoutGrid, 
  List, 
  MoreVertical,
  ChevronRight,
  Target,
  Users,
  Clock,
  CircleDot
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/useUIStore';
import { PageHeader } from '@/components/PageHeader';

interface Project {
  id: string;
  name: string;
  type: string;
  agents: { name: string; avatar?: string }[];
  status: 'In Progress' | 'Planned' | 'Completed';
  lastUpdated: string;
  taskCount: number;
}

const PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'Neural Engine V2',
    type: 'Content Creation',
    agents: [
      { name: 'Apex-01' },
      { name: 'Core-AI' },
      { name: 'Synthetix' }
    ],
    status: 'In Progress',
    lastUpdated: '2h ago',
    taskCount: 12
  },
  {
    id: 'p2',
    name: 'Neo-City Chronicles',
    type: 'Game Design',
    agents: [
      { name: 'Lore-Master' },
      { name: 'World-Builder' }
    ],
    status: 'In Progress',
    lastUpdated: '5h ago',
    taskCount: 24
  },
  {
    id: 'p3',
    name: 'Aether Storefront',
    type: 'E-commerce',
    agents: [
      { name: 'Shop-Bot' },
      { name: 'Payment-Gate' },
      { name: 'User-Proxy' }
    ],
    status: 'Planned',
    lastUpdated: '1d ago',
    taskCount: 8
  },
  {
    id: 'p4',
    name: 'Digital Concierge',
    type: 'Personal Admin',
    agents: [
      { name: 'Alfred-AI' }
    ],
    status: 'Completed',
    lastUpdated: '3d ago',
    taskCount: 45
  },
  {
    id: 'p5',
    name: 'Quantum Analysis',
    type: 'Research',
    agents: [
      { name: 'Q-Prime' },
      { name: 'Data-Cruncher' },
      { name: 'Stat-Bot' }
    ],
    status: 'In Progress',
    lastUpdated: '15m ago',
    taskCount: 62
  }
];

export default function ProjectsPage() {
  const { theme } = useUIStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProjects = PROJECTS.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10 max-w-[1600px] mx-auto">
      <PageHeader 
        title="OPERATIONAL PROJECTS"
        badge="NC-PROJECTS"
        statusLabel="Project Success Rate:"
        statusValue="94.2% (OPTIMAL)"
        statusColor="indigo"
      >
        <div className="flex items-center gap-4">
          <div className="flex bg-slate-100 dark:bg-slate-900/50 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
             <button 
                onClick={() => setViewMode('grid')}
                className={cn(
                  "p-2 rounded-xl transition-all",
                  viewMode === 'grid' ? "bg-white dark:bg-indigo-600 shadow-xl text-indigo-600 dark:text-white" : "text-slate-500 hover:text-indigo-400"
                )}
             >
                <LayoutGrid size={18} />
             </button>
             <button 
                onClick={() => setViewMode('list')}
                className={cn(
                  "p-2 rounded-xl transition-all",
                  viewMode === 'list' ? "bg-white dark:bg-indigo-600 shadow-xl text-indigo-600 dark:text-white" : "text-slate-500 hover:text-indigo-400"
                )}
             >
                <List size={18} />
             </button>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-2xl shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all">
            <Plus size={18} />
            Initialize Project
          </button>
        </div>
      </PageHeader>

      <section className="relative w-full group">
        {/* High-intensity outer glow */}
        <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[40px] blur-2xl opacity-0 group-focus-within:opacity-20 transition duration-700" />
        
        {/* Border Gradient Container */}
        <div className="relative p-[1px] rounded-[33px] bg-slate-200 dark:bg-slate-800 transition-all duration-500 group-focus-within:bg-gradient-to-r group-focus-within:from-indigo-500 group-focus-within:via-purple-500 group-focus-within:to-pink-500 group-focus-within:shadow-2xl">
          <div className={cn(
            "relative rounded-[32px] flex items-center transition-all duration-300",
            theme === 'dark' ? "bg-slate-950 px-1" : "bg-white"
          )}>
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
              <Search size={20} />
            </div>
            <input 
              type="text"
              placeholder="SEARCH PROJECT REVERB..."
              className={cn(
                "w-full py-5 pl-16 pr-6 rounded-[32px] border-none focus:ring-0 font-mono text-sm tracking-widest uppercase transition-all bg-transparent",
                theme === 'dark' 
                  ? "text-indigo-100 placeholder:text-slate-700" 
                  : "text-indigo-900 placeholder:text-slate-300"
              )}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      <div className={cn(
        viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8" 
          : "space-y-4"
      )}>
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link href={`/projects/${project.id}`} className="block group">
                {viewMode === 'grid' ? (
                  <div className={cn(
                    "relative h-full p-8 rounded-[48px] border transition-all overflow-hidden",
                    theme === 'dark' 
                      ? "bg-slate-900/40 border-slate-800/60 hover:bg-slate-900 hover:border-indigo-500/30 shadow-none" 
                      : "bg-white border-slate-100 shadow-2xl shadow-slate-200/40 hover:border-indigo-200"
                  )}>
                    <div className="flex justify-between items-start mb-10">
                       <div className="flex flex-col gap-1">
                          <span className={cn(
                            "text-[10px] font-black tracking-widest uppercase mb-1",
                            theme === 'dark' ? "text-slate-600" : "text-slate-400"
                          )}>
                             {project.type}
                          </span>
                          <h3 className={cn(
                            "text-2xl font-black group-hover:text-indigo-500 transition-colors uppercase tracking-tight",
                            theme === 'dark' ? "text-white" : "text-slate-900"
                          )}>
                             {project.name}
                          </h3>
                       </div>
                       <div className={cn(
                         "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter border",
                         project.status === 'In Progress' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                         project.status === 'Planned' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                         "bg-slate-500/10 text-slate-500 border-slate-500/20"
                       )}>
                          {project.status}
                       </div>
                    </div>

                    <div className="flex flex-col gap-8">
                       <div className="flex items-center justify-between">
                          <div className="flex flex-col gap-2">
                             <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                <Users size={12} className="text-indigo-500" />
                                Assigned Agents
                             </div>
                             <div className="flex -space-x-4 pl-1">
                                {project.agents.map((agent, i) => (
                                   <div 
                                      key={i} 
                                      className={cn(
                                        "w-10 h-10 rounded-2xl border-4 transition-transform group-hover:scale-110",
                                        theme === 'dark' ? "bg-slate-800 border-slate-950" : "bg-white border-white shadow-sm"
                                      )}
                                      title={agent.name}
                                   >
                                      <div className="w-full h-full rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] font-black text-white">
                                         {agent.name.charAt(0)}
                                      </div>
                                   </div>
                                ))}
                             </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                             <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">
                                Tasks
                                <Target size={12} className="text-indigo-500" />
                             </div>
                             <span className={cn("text-2xl font-black font-mono", theme === 'dark' ? "text-white" : "text-black")}>
                                {project.taskCount}
                             </span>
                          </div>
                       </div>

                       <div className={cn(
                          "pt-6 border-t flex items-center justify-between",
                          theme === 'dark' ? "border-slate-800/50" : "border-slate-100"
                       )}>
                          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                             <Clock size={12} />
                             {project.lastUpdated}
                          </div>
                          <div className="flex items-center gap-1 group-hover:gap-2 transition-all text-indigo-600 font-black text-[11px] uppercase tracking-widest">
                             ACCESS ARCHIVE
                             <ChevronRight size={14} />
                          </div>
                       </div>
                    </div>

                    {/* Industrial background accent */}
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                       <FolderKanban size={120} />
                    </div>
                  </div>
                ) : (
                  <div className={cn(
                    "p-4 rounded-[28px] border flex items-center gap-6 transition-all",
                    theme === 'dark' 
                      ? "bg-slate-900/40 border-slate-800/60 hover:bg-slate-900 hover:border-indigo-500/30 shadow-none" 
                      : "bg-white border-slate-100 shadow-xl shadow-slate-200/20 hover:border-indigo-200"
                  )}>
                     <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500">
                        <CircleDot size={20} />
                     </div>
                     <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                           <h3 className={cn("text-lg font-black uppercase tracking-tight", theme === 'dark' ? "text-white" : "text-slate-900 text-slate-900")}>
                              {project.name}
                           </h3>
                           <span className={cn(
                             "px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest border",
                             project.status === 'In Progress' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                             project.status === 'Planned' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                             "bg-slate-500/10 text-slate-500 border-slate-500/20"
                           )}>
                              {project.status}
                           </span>
                        </div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{project.type}</p>
                     </div>
                     <div className="flex -space-x-3">
                        {project.agents.map((agent, i) => (
                           <div key={i} className="w-8 h-8 rounded-xl border-2 border-slate-950 bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-[8px] font-black text-white">
                              {agent.name.charAt(0)}
                           </div>
                        ))}
                     </div>
                     <div className="flex flex-col items-end min-w-[100px]">
                        <span className={cn("text-base font-black font-mono", theme === 'dark' ? "text-white" : "text-black")}>{project.taskCount} TASKS</span>
                        <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">{project.lastUpdated}</span>
                     </div>
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredProjects.length === 0 && (
         <div className="py-40 text-center flex flex-col items-center gap-6">
            <div className="p-10 rounded-full bg-slate-100 dark:bg-slate-900/50 text-slate-400 border border-slate-200 dark:border-slate-800 shadow-inner">
               <Search size={48} className="opacity-20" />
            </div>
            <div>
               <h3 className="text-xl font-black dark:text-white uppercase tracking-tight">Empty Project Void</h3>
               <p className="text-slate-500 font-medium">No projects found matching your neural signature.</p>
            </div>
         </div>
      )}
    </div>
  );
}
