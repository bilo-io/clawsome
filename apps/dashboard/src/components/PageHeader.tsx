'use client';

import React from 'react';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';

export type PageHeaderStatusColor = 'indigo' | 'emerald';

const statusColorClasses: Record<PageHeaderStatusColor, string> = {
  indigo: 'bg-indigo-400 text-indigo-400',
  emerald: 'bg-emerald-500 text-emerald-500',
};

export interface PageHeaderProps {
  /** Main title (e.g. "NEURAL MODULES", "SECURITY HUD") */
  title: string;
  /** Badge after // (e.g. "NC-SKILLS", "NC-SHIELD") */
  badge: string;
  /** Status line label (e.g. "Capability Status:", "Runtime Integrity:") */
  statusLabel: string;
  /** Status value with pulse dot (e.g. "Local Sync Active", "Verified") */
  statusValue: string;
  /** Color for status dot and value */
  statusColor?: PageHeaderStatusColor;
  /** Optional right-side content (tabs, buttons, etc.) */
  children?: React.ReactNode;
  /** Optional extra class for the header wrapper */
  className?: string;
}

export function PageHeader({
  title,
  badge,
  statusLabel,
  statusValue,
  statusColor = 'indigo',
  children,
  className,
}: PageHeaderProps) {
  const { theme } = useUIStore();
  const [dotClass, valueClass] = statusColorClasses[statusColor].split(' ');

  return (
    <header
      className={cn(
        'flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b transition-colors',
        theme === 'dark' ? 'border-slate-800/50' : 'border-slate-200',
        className
      )}
    >
      <div>
        <h1
          className={cn(
            'text-4xl font-black tracking-tighter flex items-center gap-4',
            theme === 'dark' ? 'text-white' : 'text-black'
          )}
        >
          {title}{' '}
          <span className="font-thin opacity-30 text-slate-500">//</span>{' '}
          <span className="text-indigo-600 uppercase">{badge}</span>
        </h1>
        <div className="flex items-center gap-4 mt-3">
          <p
            className={cn(
              'text-[10px] font-bold uppercase tracking-[0.25em] flex items-center gap-2',
              theme === 'dark' ? 'text-slate-500' : 'text-slate-600'
            )}
          >
            {statusLabel}{' '}
            <span className={cn(valueClass, 'flex items-center gap-2 font-black')}>
              <span className={cn('w-2 h-2 rounded-full animate-pulse', dotClass)} />
              {statusValue}
            </span>
          </p>
        </div>
      </div>
      {children ? <div className="flex items-center gap-4">{children}</div> : null}
    </header>
  );
}
