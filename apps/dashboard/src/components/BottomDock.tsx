// apps/dashboard/src/components/BottomDock.tsx
'use client';

import React from 'react';
import { useUIStore } from '@/store/useUIStore';
import { Sun, Moon, Maximize2, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export const BottomDock = () => {
  const { 
    glowIntensity, 
    setGlowIntensity, 
    toggleFocusMode, 
    isFocusMode,
    theme,
    setTheme
  } = useUIStore();

  return (
    <div className={cn(
      "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500",
      isFocusMode ? 'translate-y-20 opacity-0' : 'translate-y-0 opacity-100'
    )}>
      <div className={cn(
        "backdrop-blur-xl border p-2 rounded-2xl flex items-center gap-4 shadow-2xl transition-colors duration-300",
        theme === 'dark' ? "bg-slate-900/80 border-slate-800" : "bg-white/80 border-slate-200"
      )}>
        {/* Glow Intensity Slider */}
        <div className={cn(
          "flex items-center gap-3 px-3 py-1 border-r transition-colors duration-300",
          theme === 'dark' ? "border-slate-800" : "border-slate-200"
        )}>
           <Sun size={14} className={theme === 'dark' ? "text-slate-500" : "text-amber-500"} />
           <input 
             type="range" 
             min="0" 
             max="100" 
             value={glowIntensity} 
             onChange={(e) => setGlowIntensity(parseInt(e.target.value))}
             className="w-24 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
           />
           <Moon size={14} className={theme === 'dark' ? "text-indigo-400" : "text-slate-500"} />
        </div>

        {/* Theme Toggle */}
        <div className={cn(
          "flex items-center bg-slate-800/50 rounded-xl p-1 border transition-colors duration-300",
          theme === 'dark' ? "border-slate-700" : "border-slate-200 bg-slate-100"
        )}>
          <button 
            onClick={() => setTheme('light')}
            className={cn(
              "p-1.5 rounded-lg transition-all",
              theme === 'light' ? "bg-white text-amber-500 shadow-sm" : "text-slate-500 hover:text-slate-300"
            )}
          >
            <Sun size={16} />
          </button>
          <button 
            onClick={() => setTheme('dark')}
            className={cn(
              "p-1.5 rounded-lg transition-all",
              theme === 'dark' ? "bg-slate-900 text-indigo-400 shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            <Moon size={16} />
          </button>
        </div>

        <button 
          onClick={toggleFocusMode}
          className={cn(
            "p-2 rounded-lg transition-colors",
            theme === 'dark' ? "hover:bg-slate-800 text-slate-400 hover:text-slate-50" : "hover:bg-slate-100 text-slate-500 hover:text-slate-900"
          )}
          title="Focus Mode"
        >
          <Maximize2 size={18} />
        </button>

        <div className={cn(
          "w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer",
          theme === 'dark' ? "bg-slate-800 border-slate-700 text-slate-400 hover:bg-indigo-600 hover:text-white" : "bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-200"
        )}>
          <User size={16} />
        </div>
      </div>
    </div>
  );
};
