// apps/dashboard/src/app/agents/page.tsx
'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Grid, 
  List, 
  Plus, 
  Search,
  Filter,
  Bot
} from 'lucide-react';
import { useAgentStore } from '@/store/useAgentStore';
import { AgentCard } from '@/components/AgentCard';
import { CreateAgentModal } from '@/components/CreateAgentModal';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/useUIStore';

export default function AgentsPage() {
  const { agents, deleteAgent } = useAgentStore();
  const { theme } = useUIStore();
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAgents = agents.filter(agent => 
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20">
      {/* Header section */}
      <div className={cn(
        "flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b transition-colors",
        theme === 'dark' ? "border-slate-800/50" : "border-slate-200"
      )}>
        <div>
          <div className="flex items-center gap-4 mb-3">
            <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-600/20 text-white">
              <Bot size={28} />
            </div>
            <h1 className={cn("text-4xl font-bold tracking-tighter", theme === 'dark' ? "text-white" : "text-slate-900")}>
              Agent Registry
            </h1>
          </div>
          <p className={cn("text-sm font-medium tracking-tight", theme === 'dark' ? "text-slate-500" : "text-slate-500")}>
            Manage and orchestrate your autonomous workforce from the central node.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className={cn(
            "rounded-2xl flex p-1 border shadow-sm transition-all",
            theme === 'dark' ? "bg-slate-950 border-slate-800" : "bg-white border-slate-100 shadow-slate-200/40"
          )}>
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                "p-3 rounded-xl transition-all",
                viewMode === 'grid' 
                  ? (theme === 'dark' ? "bg-slate-800 text-indigo-400 shadow-inner" : "bg-slate-50 text-indigo-600 border border-slate-100 shadow-sm") 
                  : "text-slate-500 hover:text-slate-300"
              )}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={cn(
                "p-3 rounded-xl transition-all",
                viewMode === 'table' 
                  ? (theme === 'dark' ? "bg-slate-800 text-indigo-400 shadow-inner" : "bg-slate-50 text-indigo-600 border border-slate-100 shadow-sm") 
                  : "text-slate-500 hover:text-slate-300"
              )}
            >
              <List size={20} />
            </button>
          </div>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[20px] font-bold shadow-xl shadow-indigo-600/20 transition-all active:translate-y-1"
          >
            <Plus size={20} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Deploy New Agent</span>
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <div className="relative flex-1 group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <Search size={20} className={cn("transition-colors", theme === 'dark' ? "text-slate-700 group-focus-within:text-indigo-400" : "text-slate-300 group-focus-within:text-indigo-600")} />
          </div>
          <input
            type="text"
            placeholder="Search agents by name or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              "w-full rounded-[20px] pl-14 pr-6 py-4 text-sm font-medium transition-all border outline-none",
              theme === 'dark' 
                ? "bg-slate-950 border-slate-800 text-white placeholder:text-slate-700 focus:border-indigo-500/50" 
                : "bg-white border-slate-100 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 shadow-sm"
            )}
          />
        </div>
        <button className={cn(
            "flex items-center gap-3 px-5 py-4 rounded-2xl border shadow-sm transition-all group",
            theme === 'dark' ? "bg-slate-900 border-slate-800 text-slate-500 hover:text-white" : "bg-white border-slate-100 text-slate-400 hover:text-slate-900"
          )}>
          <Filter size={20} className="group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Filter</span>
        </button>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {filteredAgents.length > 0 ? (
          viewMode === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {filteredAgents.map((agent) => (
                <AgentCard 
                  key={agent.id} 
                  agent={agent} 
                  viewMode="grid" 
                  onDelete={deleteAgent}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="table"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              className={cn(
                "rounded-[32px] border overflow-hidden shadow-2xl transition-all",
                theme === 'dark' ? "bg-slate-950/50 border-slate-800 shadow-none" : "bg-white border-slate-100 shadow-slate-200/50"
              )}
            >
              <table className="w-full text-left">
                <thead>
                  <tr className={cn(
                    "transition-colors border-b",
                    theme === 'dark' ? "bg-slate-900/50 border-slate-900" : "bg-slate-50/50 border-slate-100"
                  )}>
                    <th className={cn("py-5 px-6 text-[10px] font-bold uppercase tracking-[0.3em]", theme === 'dark' ? "text-slate-600" : "text-slate-400")}>Agent Identity</th>
                    <th className={cn("py-5 px-6 text-[10px] font-bold uppercase tracking-[0.3em]", theme === 'dark' ? "text-slate-600" : "text-slate-400")}>Role / Designation</th>
                    <th className={cn("py-5 px-6 text-[10px] font-bold uppercase tracking-[0.3em]", theme === 'dark' ? "text-slate-600" : "text-slate-400")}>Initialized At</th>
                    <th className={cn("py-5 px-6 text-right text-[10px] font-bold uppercase tracking-[0.3em]", theme === 'dark' ? "text-slate-600" : "text-slate-400")}>Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-transparent">
                  {filteredAgents.map((agent) => (
                    <AgentCard 
                      key={agent.id} 
                      agent={agent} 
                      viewMode="table" 
                      onDelete={deleteAgent}
                    />
                  ))}
                </tbody>
              </table>
            </motion.div>
          )
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
               "flex flex-col items-center justify-center py-32 rounded-[48px] border-2 border-dashed shadow-inner transition-colors",
               theme === 'dark' ? "bg-slate-900/10 border-slate-800/30" : "bg-slate-50 border-slate-200"
            )}
          >
            <div className={cn(
              "w-24 h-24 rounded-[32px] flex items-center justify-center mb-8 shadow-2xl border",
              theme === 'dark' ? "bg-slate-900 border-slate-800 text-slate-700 shadow-black/50" : "bg-white border-slate-100 text-slate-200"
            )}>
              <Users size={48} />
            </div>
            <h3 className={cn("text-2xl font-bold mb-4", theme === 'dark' ? "text-white" : "text-slate-900")}>
               Autonomous Workforce Offline
            </h3>
            <p className={cn("text-sm max-w-sm text-center leading-relaxed font-medium mb-10", theme === 'dark' ? "text-slate-600" : "text-slate-400")}>
              No active neural souls detected. Initialization sequences are ready to begin at your command.
            </p>
            <button
               onClick={() => setIsModalOpen(true)}
               className="flex items-center gap-4 px-12 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[20px] font-bold shadow-xl shadow-indigo-600/20 transition-all active:translate-y-1"
            >
              <Plus size={20} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Initialize High-Level Souls</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <CreateAgentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
