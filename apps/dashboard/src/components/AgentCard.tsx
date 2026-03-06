// apps/dashboard/src/components/AgentCard.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { User, Edit2, Trash2 } from 'lucide-react';
import { Agent } from '@/store/useAgentStore';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useUIStore } from '@/store/useUIStore';

interface AgentCardProps {
  agent: Agent;
  viewMode: 'grid' | 'table';
  onDelete?: (id: string) => void;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, viewMode, onDelete }) => {
  const { theme } = useUIStore();

  if (viewMode === 'table') {
    return (
      <tr 
        className={cn(
          "group border-b transition-colors",
          theme === 'dark' ? "border-slate-900 hover:bg-slate-900/30" : "border-slate-100 hover:bg-slate-50"
        )}
      >
        <td className="py-5 px-4">
          <div className="flex items-center gap-4">
            <div className={cn(
               "w-11 h-11 rounded-full overflow-hidden border transition-all",
               theme === 'dark' ? "bg-slate-800 border-slate-700 shadow-xl" : "bg-white border-slate-200 shadow-sm"
            )}>
              {agent.profilePicture ? (
                <img src={agent.profilePicture} alt={agent.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <User size={20} />
                </div>
              )}
            </div>
            <div>
              <div className={cn("text-base font-bold tracking-tight", theme === 'dark' ? "text-white" : "text-slate-900")}>{agent.name}</div>
              <div className={cn("text-[9px] font-bold uppercase tracking-widest", theme === 'dark' ? "text-slate-600" : "text-slate-400")}>#SOUL-ID: {agent.id.slice(0, 8)}</div>
            </div>
          </div>
        </td>
        <td className={cn("py-5 px-4 text-sm font-medium", theme === 'dark' ? "text-slate-400" : "text-slate-500")}>
          {agent.title}
        </td>
        <td className={cn("py-5 px-4 text-sm font-mono tracking-tighter opacity-70", theme === 'dark' ? "text-slate-500" : "text-slate-400")}>
          {new Date(agent.createdAt).toLocaleDateString()}
        </td>
        <td className="py-5 px-4 text-right">
          <div className="flex items-center justify-end gap-2">
            <Link 
              href={`/agents/${agent.id}`}
              className={cn(
                "p-2.5 rounded-xl transition-all border",
                theme === 'dark' ? "bg-slate-800 border-slate-700 text-slate-500 hover:text-indigo-400" : "bg-slate-50 border-slate-100 text-slate-400 hover:text-indigo-600"
              )}
            >
              <Edit2 size={16} />
            </Link>
            <button 
              onClick={() => onDelete?.(agent.id)}
              className={cn(
                "p-2.5 rounded-xl transition-all border",
                theme === 'dark' ? "bg-slate-800 border-slate-700 text-slate-500 hover:text-rose-400" : "bg-slate-50 border-slate-100 text-slate-400 hover:text-rose-600"
              )}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <div
      className={cn(
        "group relative rounded-[40px] p-8 transition-all border shadow-xl flex flex-col h-full",
        theme === 'dark' 
          ? "bg-slate-900/40 border-slate-800/60 shadow-none hover:bg-slate-900 hover:border-indigo-500/30" 
          : "bg-white border-slate-100 shadow-slate-200/40 hover:border-indigo-200 hover:shadow-2xl"
      )}
    >
      <div className="flex justify-between items-start mb-8">
        <div className={cn(
           "w-20 h-20 rounded-[30px] overflow-hidden border shadow-2xl transition-all group-hover:scale-110 group-hover:rotate-2",
           theme === 'dark' ? "bg-slate-800 border-slate-700 shadow-black/40" : "bg-slate-50 border-white shadow-slate-200/50"
        )}>
          {agent.profilePicture ? (
            <img src={agent.profilePicture} alt={agent.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400/50">
              <User size={36} />
            </div>
          )}
        </div>
        <div className="flex gap-2.5">
           <Link 
            href={`/agents/${agent.id}`}
            className={cn(
              "p-3 rounded-2xl transition-all border",
              theme === 'dark' ? "bg-slate-800/50 border-slate-800 text-slate-500 hover:text-indigo-400" : "bg-slate-50 border-slate-100 text-slate-400 hover:text-indigo-600 shadow-sm"
            )}
          >
            <Edit2 size={18} />
          </Link>
          <button 
            onClick={() => onDelete?.(agent.id)}
            className={cn(
              "p-3 rounded-2xl transition-all border",
              theme === 'dark' ? "bg-slate-800/50 border-slate-800 text-slate-500 hover:text-rose-400" : "bg-slate-50 border-slate-100 text-slate-400 hover:text-rose-600 shadow-sm"
            )}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1">
        <h3 className={cn(
          "text-2xl font-bold transition-colors mb-2",
          theme === 'dark' ? "text-white group-hover:text-indigo-400" : "text-slate-900 group-hover:text-indigo-600"
        )}>
          {agent.name}
        </h3>
        <p className={cn(
          "text-sm font-bold tracking-tight mb-6 uppercase tracking-widest",
          theme === 'dark' ? "text-slate-600" : "text-slate-400"
        )}>
          {agent.title}
        </p>
      </div>

      <div className={cn(
        "pt-6 border-t flex items-center justify-between",
        theme === 'dark' ? "border-slate-800/50" : "border-slate-100"
      )}>
        <span className={cn(
          "text-[9px] font-bold uppercase tracking-[0.2em] font-mono",
          theme === 'dark' ? "text-slate-700" : "text-slate-500"
        )}>
          #SOUL_SYNC: {agent.id.slice(0, 8)}
        </span>
        <div className="flex -space-x-2.5">
           <div className="w-6 h-6 rounded-full border-2 border-slate-900 bg-indigo-500 shadow-sm" />
           <div className="w-6 h-6 rounded-full border-2 border-slate-900 bg-purple-500 shadow-sm opacity-60" />
        </div>
      </div>

      {/* Decorative Glow Overlay */}
      <div className={cn(
        "absolute inset-0 rounded-[40px] opacity-0 transition-opacity bg-indigo-500/5 blur-3xl pointer-events-none -z-10",
        "group-hover:opacity-100"
      )} />
    </div>
  );
};
