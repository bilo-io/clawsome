'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Download as DownloadIcon, 
  Terminal, 
  Apple, 
  Monitor, 
  Cloud,
  ChevronRight,
  Zap,
  Globe
} from 'lucide-react';
import Link from 'next/link';

export default function DownloadPage() {
  const versions = [
    {
      os: "MacOS",
      icon: Apple,
      version: "v2.0.4-stable",
      size: "84MB",
      link: "#",
      featured: true,
    },
    {
      os: "Windows",
      icon: Monitor,
      version: "v2.0.4-stable",
      size: "92MB",
      link: "#",
    },
    {
      os: "Linux",
      icon: Terminal,
      version: "v2.0.4-beta",
      size: "76MB",
      link: "#",
    }
  ];

  return (
    <div className="pt-40 pb-32 px-8 flex flex-col items-center min-h-[90vh]">
      <div className="max-w-5xl w-full">
         {/* Feature Header */}
         <div className="flex flex-col items-center text-center mb-20">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-4 bg-indigo-500 rounded-3xl shadow-2xl shadow-indigo-500/20 mb-8"
            >
              <DownloadIcon size={48} className="text-white" />
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 dark:text-white">
              Launch the <span className="gradient-text">Nightclaw Terminal</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl font-medium">
              Experience the power of a fully autonomous AI operating system on your local machine.
            </p>
         </div>

         {/* OS Grid */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 px-8">
            {versions.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-10 rounded-[3rem] border transition-all flex flex-col items-center text-center ${v.featured ? 'border-indigo-500/30 bg-indigo-50/20 dark:bg-indigo-500/5 neon-glow' : 'border-slate-200 dark:border-slate-800'}`}
              >
                 <v.icon size={48} className={v.featured ? 'text-indigo-500' : 'text-slate-400 dark:text-slate-600'} />
                 <h2 className="mt-8 text-2xl font-black dark:text-white">{v.os}</h2>
                 <p className="mt-2 text-slate-500 font-bold uppercase text-[10px] tracking-widest">{v.version} — {v.size}</p>
                 <button className={`mt-10 px-8 py-4 w-full rounded-2xl font-black text-sm transition-all shadow-lg ${v.featured ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/20 hover:scale-105 active:scale-95' : 'bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-800'}`}>
                    Download Installer
                 </button>
              </motion.div>
            ))}
         </div>

         {/* Alternative Methods */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
            <div className="p-8 glass-panel rounded-[2.5rem] flex items-start gap-6 border-indigo-500/10 transition-all hover:bg-slate-50 dark:hover:bg-slate-900/50">
               <div className="p-4 bg-indigo-500/10 rounded-2xl">
                  <Cloud size={24} className="text-indigo-500" />
               </div>
               <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-black dark:text-white">Cloud IDE</h3>
                  <p className="text-slate-600 dark:text-slate-400 font-medium">Run Nightclaw in our managed cloud environment. No installation required.</p>
                  <Link href="/login" className="mt-2 flex items-center gap-2 text-indigo-500 font-bold text-sm group">
                     Open in Browser
                     <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
               </div>
            </div>

            <div className="p-8 glass-panel rounded-[2.5rem] flex items-start gap-6 border-indigo-500/10 transition-all hover:bg-slate-50 dark:hover:bg-slate-900/50">
               <div className="p-4 bg-emerald-500/10 rounded-2xl">
                  <Zap size={24} className="text-emerald-500" />
               </div>
               <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-black dark:text-white">Nightclaw CLI</h3>
                  <p className="text-slate-600 dark:text-slate-400 font-medium font-mono text-sm px-3 py-1 bg-slate-100 dark:bg-black rounded-lg w-fit">npm i -g @nightclaw/cli</p>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">FOR POWER OPERATORS</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
