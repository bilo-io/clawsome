'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Command, Terminal, Sparkles, ChevronRight, Play } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 px-8 overflow-hidden min-h-[90vh] flex flex-col justify-center items-center text-center">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -right-1/4 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full -z-10" />

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 p-1 px-4 bg-indigo-500/10 border border-indigo-500/20 rounded-full flex items-center gap-2 group"
      >
        <Sparkles size={14} className="text-indigo-500 group-hover:animate-spin-slow" />
        <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-500">
          Nightclaw OS: v2.0 is now live
        </span>
        <ChevronRight size={14} className="text-indigo-400 group-hover:translate-x-1 transition-transform" />
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-5xl md:text-7xl lg:text-8xl font-black md:max-w-4xl tracking-tighter mb-8 leading-[1.1] dark:text-white"
      >
        Automate the web with <span className="gradient-text">autonomous swarms</span>
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mb-12 font-medium"
      >
        Deploy intelligent agents that browse, click, and process information. Nightclaw is the first OS built for agentic workflows at scale.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center gap-6"
      >
        <Link 
          href="/download" 
          className="group flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-3xl font-black text-lg shadow-2xl shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95"
        >
          <Terminal size={20} className="group-hover:rotate-12 transition-transform" />
          Get Nightclaw Free
        </Link>
        <button className="flex items-center gap-3 px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-3xl font-black text-lg transition-all hover:border-indigo-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/80 active:scale-95 group">
          <div className="p-1 px-1 bg-indigo-500/10 rounded-full group-hover:bg-indigo-500/20 transition-colors">
            <Play size={16} className="text-indigo-500 fill-indigo-500" />
          </div>
          Watch the Demo
        </button>
      </motion.div>

      {/* App Preview Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-20 w-full max-w-5xl rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-3 bg-slate-100/50 dark:bg-slate-900/50 glass-panel shadow-2xl"
      >
        <div className="w-full h-80 md:h-[500px] bg-slate-50 dark:bg-black rounded-3xl border border-slate-200 dark:border-slate-900 flex items-center justify-center overflow-hidden relative">
          {/* Dashboard Screenshot Mockup */}
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-purple-500/5" />
          <div className="flex flex-col items-center gap-4 z-10">
            <Command size={48} className="text-slate-300 dark:text-slate-800" />
            <span className="text-xs font-black uppercase tracking-[0.5em] text-slate-300 dark:text-slate-800">
              [ OS PREVIEW INTERFACE ]
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
