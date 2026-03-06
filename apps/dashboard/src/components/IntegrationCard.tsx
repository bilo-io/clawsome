'use client';

import React from 'react';
import {
  MessageSquare,
  MessageCircle,
  Send,
  Github,
  LayoutList,
  FileText,
  Plus,
  Settings,
  Trash2,
  ChevronRight,
  Power,
  PowerOff,
} from 'lucide-react';
import type { Integration, IntegrationStatus } from '@/store/useIntegrationStore';
import { useIntegrationStore } from '@/store/useIntegrationStore';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useUIStore } from '@/store/useUIStore';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  MessageSquare,
  MessageCircle,
  Send,
  Github,
  LayoutList,
  FileText,
};

const statusConfig: Record<IntegrationStatus, { label: string; className: string }> = {
  pending: { label: 'Pending', className: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
  active: { label: 'Active', className: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
  inactive: { label: 'Inactive', className: 'bg-slate-500/10 text-slate-500 border-slate-500/20' },
};

interface IntegrationCardProps {
  integration: Integration;
  viewMode: 'grid' | 'table';
  isInstalled?: boolean;
  /** 'installed' = show status and Configure/Enable/Disable; 'marketplace' = show Add or Added */
  source: 'installed' | 'marketplace';
}

export function IntegrationCard({ integration, viewMode, isInstalled, source }: IntegrationCardProps) {
  const { addIntegration, removeIntegration, setConfigured, updateIntegration } = useIntegrationStore();
  const { theme } = useUIStore();
  const Icon = iconMap[integration.icon] ?? MessageSquare;
  const status = statusConfig[integration.status];

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addIntegration(integration.id);
  };

  const handleConfigure = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateIntegration(integration.id, { status: 'active' });
  };

  const handleDisconnect = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    removeIntegration(integration.id);
  };

  const handleToggleActive = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setConfigured(integration.id, integration.status !== 'active');
  };

  if (viewMode === 'table') {
    return (
      <motion.tr
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className={cn(
          'group transition-all border-b',
          theme === 'dark' ? 'border-slate-900 hover:bg-slate-900/40' : 'border-slate-100/50 hover:bg-slate-50/50'
        )}
      >
        <td className="py-6 px-10">
          <div className="flex items-center gap-6">
            <div
              className={cn(
                'p-3 rounded-2xl transition-all shadow-inner border group-hover:scale-110',
                theme === 'dark' ? 'bg-slate-900 text-indigo-400 border-indigo-500/10' : 'bg-white text-indigo-600 border-slate-100 shadow-slate-200/40'
              )}
            >
              <Icon size={20} />
            </div>
            <span className={cn('text-lg font-black tracking-tighter', theme === 'dark' ? 'text-white' : 'text-slate-950')}>
              {integration.name}
            </span>
          </div>
        </td>
        <td className={cn('py-6 px-10 text-xs font-bold uppercase tracking-widest opacity-60 truncate max-w-[300px]', theme === 'light' && 'text-slate-500')}>
          {integration.description}
        </td>
        <td className="py-6 px-10">
          {source === 'installed' ? (
            <span className={cn('text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border', status.className)}>
              {status.label}
            </span>
          ) : null}
        </td>
        <td className="py-6 px-10 text-right">
          <div className="flex items-center justify-end gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
            {source === 'marketplace' && !isInstalled ? (
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-indigo-600 text-white shadow-indigo-600/30 hover:bg-indigo-500 transition-all active:scale-95"
              >
                <Plus size={16} /> Add
              </button>
            ) : source === 'marketplace' && isInstalled ? (
              <span className={cn('text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl', theme === 'dark' ? 'bg-slate-800 text-slate-500' : 'bg-slate-100 text-slate-400')}>
                Added
              </span>
            ) : source === 'installed' && integration.status === 'pending' ? (
              <>
                <button
                  onClick={handleConfigure}
                  className={cn(
                    'flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95',
                    theme === 'dark' ? 'bg-slate-900 border border-slate-800 text-amber-400 hover:text-white' : 'bg-amber-50 border border-amber-200 text-amber-600 hover:bg-amber-100'
                  )}
                >
                  <Settings size={16} /> Configure
                </button>
                <button onClick={handleDisconnect} className="p-3 rounded-xl border transition-all active:scale-90 text-slate-400 hover:text-rose-500" title="Remove">
                  <Trash2 size={18} />
                </button>
              </>
            ) : source === 'installed' ? (
              <>
                <button
                  onClick={handleToggleActive}
                  className={cn(
                    'flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95',
                    integration.status === 'active'
                      ? theme === 'dark' ? 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400' : 'bg-slate-50 border border-slate-200 text-slate-500 hover:text-rose-600'
                      : 'bg-emerald-600 text-white shadow-emerald-600/30 hover:bg-emerald-500'
                  )}
                >
                  {integration.status === 'active' ? <><PowerOff size={16} /> Disable</> : <><Power size={16} /> Enable</>}
                </button>
                <button onClick={handleDisconnect} className="p-3 rounded-xl border transition-all active:scale-90 text-slate-400 hover:text-rose-500" title="Remove">
                  <Trash2 size={18} />
                </button>
              </>
            ) : null}
          </div>
        </td>
      </motion.tr>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -10 }}
      className={cn(
        'group relative rounded-[48px] p-10 transition-all border shadow-2xl flex flex-col h-full overflow-hidden',
        theme === 'dark'
          ? 'bg-slate-950/40 border-slate-900/60 hover:bg-slate-950/60 hover:border-indigo-500/20'
          : 'bg-white border-slate-100 hover:border-indigo-100 shadow-slate-200/40 hover:shadow-indigo-500/5'
      )}
    >
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div
          className={cn(
            'p-5 rounded-[24px] transition-all shadow-inner border group-hover:scale-110',
            theme === 'dark' ? 'bg-slate-900 text-indigo-400 border-indigo-500/20' : 'bg-slate-50 text-indigo-600 border-slate-100'
          )}
        >
          <Icon size={32} />
        </div>
        {source === 'installed' && (
          <span className={cn('text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border', status.className)}>
            {status.label}
          </span>
        )}
      </div>
      <h3 className={cn('text-xl font-black tracking-tighter mb-2', theme === 'dark' ? 'text-white' : 'text-slate-950')}>
        {integration.name}
      </h3>
      <p className={cn('text-sm font-bold uppercase tracking-widest opacity-70 mb-8 flex-1', theme === 'dark' ? 'text-slate-400' : 'text-slate-500')}>
        {integration.description}
      </p>
      <div className="flex items-center gap-3">
        {source === 'marketplace' && !isInstalled ? (
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-indigo-600 text-white shadow-indigo-600/30 hover:bg-indigo-500 transition-all active:scale-95"
          >
            <Plus size={18} /> Add
          </button>
        ) : source === 'marketplace' && isInstalled ? (
          <span className={cn('text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl', theme === 'dark' ? 'bg-slate-800 text-slate-500' : 'bg-slate-100 text-slate-400')}>
            Added
          </span>
        ) : source === 'installed' && integration.status === 'pending' ? (
          <>
            <button
              onClick={handleConfigure}
              className={cn(
                'flex items-center gap-2 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95',
                theme === 'dark' ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400' : 'bg-amber-50 border border-amber-200 text-amber-600'
              )}
            >
              <Settings size={18} /> Configure
            </button>
            <button onClick={handleDisconnect} className="p-3 rounded-xl border transition-all text-slate-400 hover:text-rose-500" title="Remove">
              <Trash2 size={18} />
            </button>
          </>
        ) : source === 'installed' ? (
          <>
            <button
              onClick={handleToggleActive}
              className={cn(
                'flex items-center gap-2 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95',
                integration.status === 'active'
                  ? theme === 'dark' ? 'bg-slate-900 border border-slate-800 text-slate-400' : 'bg-slate-50 border border-slate-200 text-slate-500'
                  : 'bg-emerald-600 text-white shadow-emerald-600/30 hover:bg-emerald-500'
              )}
            >
              {integration.status === 'active' ? <><PowerOff size={18} /> Disable</> : <><Power size={18} /> Enable</>}
            </button>
            <button onClick={handleDisconnect} className="p-3 rounded-xl border transition-all text-slate-400 hover:text-rose-500" title="Remove">
              <Trash2 size={18} />
            </button>
          </>
        ) : null}
      </div>
    </motion.div>
  );
}
