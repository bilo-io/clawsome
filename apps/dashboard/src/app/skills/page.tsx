// apps/dashboard/src/app/skills/page.tsx
'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Grid, 
  List, 
  ShoppingCart,
  Zap,
  Filter,
  PackageCheck,
  Cpu
} from 'lucide-react';
import { useSkillStore } from '@/store/useSkillStore';
import { SkillCard } from '@/components/SkillCard';
import { PageHeader } from '@/components/PageHeader';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/useUIStore';

export default function SkillsPage() {
  const { mySkills, marketplaceSkills } = useSkillStore();
  const { theme } = useUIStore();
  const [activeTab, setActiveTab] = useState<'my' | 'marketplace'>('my');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const currentSkills = activeTab === 'my' ? mySkills : marketplaceSkills;
  
  const filteredSkills = currentSkills.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isSkillImported = (skillName: string) => {
    return mySkills.some(s => s.name === skillName);
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 pb-20">
      {/* Header */}
      <PageHeader
        title="NEURAL MODULES"
        badge="NC-SKILLS"
        statusLabel="Capability Status:"
        statusValue="Local Sync Active"
        statusColor="indigo"
        className="pb-10 gap-8"
      >
        <div className={cn(
          "flex items-center gap-2 p-1.5 rounded-[24px] border transition-all shadow-xl",
          theme === 'dark' ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-100 shadow-slate-200/40"
        )}>
          <button
            onClick={() => setActiveTab('my')}
            className={cn(
              "flex items-center gap-3 px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95",
              activeTab === 'my' 
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                : (theme === 'dark' ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-600")
            )}
          >
            <PackageCheck size={18} />
            <span>INSTALLED</span>
          </button>
          <button
            onClick={() => setActiveTab('marketplace')}
            className={cn(
              "flex items-center gap-3 px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95",
              activeTab === 'marketplace' 
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                : (theme === 'dark' ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-600")
            )}
          >
            <ShoppingCart size={18} />
            <span>MARKETPLACE</span>
          </button>
        </div>
      </PageHeader>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="relative flex-1 group w-full">
          <Search size={20} className={cn("absolute left-5 top-1/2 -translate-y-1/2 transition-colors", theme === 'dark' ? "text-slate-700 group-focus-within:text-indigo-400" : "text-slate-400 group-focus-within:text-indigo-600")} />
          <input
            type="text"
            placeholder={`Search ${activeTab === 'my' ? 'installed' : 'marketplace'} skills...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              "w-full rounded-[24px] pl-14 pr-6 py-5 text-sm font-bold transition-all border outline-none shadow-xl",
              theme === 'dark' 
                ? "bg-slate-950 border-slate-800 text-white placeholder:text-slate-700 focus:border-indigo-500/50" 
                : "bg-white border-slate-100 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 shadow-slate-200/40"
            )}
          />
        </div>
        
        <div className="flex gap-4 scroll-mt-20">
          <div className={cn(
            "rounded-[20px] flex p-1.5 border shadow-xl transition-all",
            theme === 'dark' ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-100 shadow-slate-200/40"
          )}>
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                "p-3 rounded-xl transition-all active:scale-95",
                viewMode === 'grid' 
                  ? (theme === 'dark' ? "bg-slate-800 text-indigo-400 shadow-inner" : "bg-slate-50 text-indigo-600 border border-slate-100 shadow-inner") 
                  : "text-slate-500 hover:text-slate-300"
              )}
            >
              <Grid size={22} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={cn(
                "p-3 rounded-xl transition-all active:scale-95",
                viewMode === 'table' 
                  ? (theme === 'dark' ? "bg-slate-800 text-indigo-400 shadow-inner" : "bg-slate-50 text-indigo-600 border border-slate-100 shadow-inner") 
                  : "text-slate-500 hover:text-slate-300"
              )}
            >
              <List size={22} />
            </button>
          </div>
          <button className={cn(
            "flex items-center gap-3 px-6 py-4 rounded-[20px] border shadow-xl transition-all group active:scale-95",
            theme === 'dark' ? "bg-slate-900/60 border-slate-800 text-slate-500 hover:text-white" : "bg-white border-slate-100 text-slate-500 hover:text-slate-950"
          )}>
            <Filter size={20} className="group-hover:rotate-12 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-widest">Filter</span>
          </button>
        </div>
      </div>

      {/* Content Rendering */}
      <AnimatePresence mode="wait">
        {filteredSkills.length > 0 ? (
          <motion.div
            key={`${activeTab}-${viewMode}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                {filteredSkills.map((skill, i) => (
                  <SkillCard 
                    key={skill.id} 
                    skill={skill} 
                    viewMode="grid" 
                    isImported={isSkillImported(skill.name)}
                  />
                ))}
              </div>
            ) : (
              <div className={cn(
                "rounded-[40px] overflow-hidden border shadow-2xl transition-all",
                theme === 'dark' ? "bg-slate-950/50 border-slate-800" : "bg-white border-slate-100 shadow-slate-200/50"
              )}>
                <table className="w-full text-left">
                  <thead>
                    <tr className={cn(
                      "transition-colors",
                      theme === 'dark' ? "bg-slate-900/50" : "bg-slate-50/50"
                    )}>
                      <th className={cn("py-6 px-10 text-[10px] font-black uppercase tracking-[0.3em]", theme === 'dark' ? "text-slate-600" : "text-slate-400")}>Module Hub</th>
                      <th className={cn("py-6 px-10 text-[10px] font-black uppercase tracking-[0.3em]", theme === 'dark' ? "text-slate-600" : "text-slate-400")}>Description</th>
                      <th className={cn("py-6 px-10 text-right text-[10px] font-black uppercase tracking-[0.3em]", theme === 'dark' ? "text-slate-600" : "text-slate-400")}>Neural Sync</th>
                    </tr>
                  </thead>
                  <tbody className={cn("divide-y", theme === 'dark' ? "divide-slate-900" : "divide-slate-50")}>
                    {filteredSkills.map((skill) => (
                      <SkillCard 
                        key={skill.id} 
                        skill={skill} 
                        viewMode="table" 
                        isImported={isSkillImported(skill.name)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
               "flex flex-col items-center justify-center py-40 rounded-[64px] border-2 border-dashed shadow-inner transition-colors",
               theme === 'dark' ? "bg-slate-900/10 border-slate-800/30" : "bg-slate-50/50 border-slate-200"
            )}
          >
            <div className={cn(
              "w-32 h-32 rounded-[40px] flex items-center justify-center mb-10 shadow-2xl border transition-all animate-pulse",
              theme === 'dark' ? "bg-slate-900 border-slate-800 text-slate-700 shadow-black/50" : "bg-white border-slate-100 text-slate-200 shadow-slate-200/50"
            )}>
              {activeTab === 'my' ? <Cpu size={64} strokeWidth={1} /> : <ShoppingCart size={64} strokeWidth={1} />}
            </div>
            <h3 className={cn("text-3xl font-black mb-4 tracking-tighter", theme === 'dark' ? "text-white" : "text-slate-950")}>
              {searchQuery ? 'NO MATCHING TRACES' : activeTab === 'my' ? 'NEURAL INTERFACE EMPTY' : 'REPOSITORY OFFLINE'}
            </h3>
            <p className={cn("text-sm max-w-sm text-center leading-loose font-bold uppercase tracking-[0.1em] mb-12", theme === 'dark' ? "text-slate-600" : "text-slate-400")}>
              {activeTab === 'my' 
                ? 'Your agent is currently in raw state. Access the Marketplace to begin neural capability expansion.' 
                : 'Refresh your neural link to retrieve the latest verified skill modules from the global repository.'}
            </p>
            {activeTab === 'my' && !searchQuery && (
              <button
                onClick={() => setActiveTab('marketplace')}
                className="flex items-center gap-4 px-12 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[24px] text-[10px] font-black uppercase tracking-widest transition-all shadow-2xl shadow-indigo-600/30 active:scale-95"
              >
                <ShoppingCart size={20} />
                <span>Access Marketplace</span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
