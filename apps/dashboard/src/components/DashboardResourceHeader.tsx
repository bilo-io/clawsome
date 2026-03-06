'use client';

import React from 'react';
import Link from 'next/link';
import { Search, List, Plus, Filter, LayoutGrid, ChevronLeft } from 'lucide-react';
import { PageHeader, PageHeaderStatusColor } from './PageHeader';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/useUIStore';

export interface DashboardResourceHeaderProps {
  // Level 1: Page Identity
  title: string;
  badge: string;
  statusLabel: string;
  statusValue: string;
  statusColor?: PageHeaderStatusColor;
  
  // Optional Back Link
  backLink?: {
    label: string;
    href: string;
  };

  // Visibility control for collection-specific toolbar
  isCollection?: boolean;

  // Level 2: Toolbar & Controls (Only if isCollection is true)
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;

  // View Controls
  viewMode?: string;
  onViewModeChange?: (mode: any) => void;

  // Optional Filter
  onFilterClick?: () => void;
  showFilter?: boolean;

  // Render Props / Slots
  renderRight?: React.ReactNode | (() => React.ReactNode); // Top right slot
  toolbarActions?: React.ReactNode; // Extra things next to View Toggles (Level 2)
}

export function DashboardResourceHeader({
  title,
  badge,
  statusLabel,
  statusValue,
  statusColor = 'indigo',
  backLink,
  isCollection = true,
  searchQuery = '',
  onSearchChange,
  searchPlaceholder = 'SEARCH...',
  viewMode,
  onViewModeChange,
  onFilterClick,
  showFilter = false,
  renderRight,
  toolbarActions,
}: DashboardResourceHeaderProps) {
  const { theme } = useUIStore();

  const renderedRight = typeof renderRight === 'function' ? renderRight() : renderRight;

  return (
    <div className="space-y-10">
      {/* Back Link if available */}
      {backLink && (
        <Link 
          href={backLink.href} 
          className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 hover:text-indigo-500 transition-colors w-fit mb-[-24px]"
        >
          <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          {backLink.label}
        </Link>
      )}

      {/* Level 1: Page Identity & Primary Actions */}
      <PageHeader
        title={title}
        badge={badge}
        statusLabel={statusLabel}
        statusValue={statusValue}
        statusColor={statusColor}
      >
        <div className="flex items-center gap-4">
          {renderedRight}
        </div>
      </PageHeader>

      {/* Level 2: Toolbar (Only if isCollection is true) */}
      {isCollection && (
        <div className="flex flex-col md:flex-row gap-6 items-center">
          {/* Search Bar - Fancy Styled */}
          <div className="relative flex-1 group w-full">
            <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[40px] blur-2xl opacity-0 group-focus-within:opacity-20 transition duration-700 pointer-events-none" />
            
            <div className="relative p-[1px] rounded-[24px] bg-slate-200 dark:bg-slate-800 transition-all duration-500 group-focus-within:bg-gradient-to-r group-focus-within:from-indigo-500 group-focus-within:via-purple-500 group-focus-within:to-pink-500 group-focus-within:shadow-2xl">
              <div className={cn(
                "relative rounded-[23px] flex items-center transition-all duration-300",
                theme === 'dark' ? "bg-slate-950 px-1" : "bg-white"
              )}>
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                  <Search size={20} />
                </div>
                <input
                  type="text"
                  placeholder={searchPlaceholder.toUpperCase()}
                  className={cn(
                    "w-full py-5 pl-16 pr-6 rounded-[23px] border-none focus:ring-0 font-mono text-sm tracking-widest uppercase transition-all bg-transparent",
                    theme === 'dark' 
                      ? "text-indigo-100 placeholder:text-slate-700" 
                      : "text-indigo-900 placeholder:text-slate-300"
                  )}
                  value={searchQuery}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Controls (Filter, View Toggles, Additional Actions) */}
          <div className="flex items-center gap-4">
            {toolbarActions}

            {showFilter && (
              <button
                onClick={onFilterClick}
                className={cn(
                  "flex items-center gap-3 px-6 py-4 rounded-[20px] border shadow-xl transition-all group active:scale-95",
                  theme === 'dark' ? "bg-slate-900 border-slate-800 text-slate-500 hover:text-white" : "bg-white border-slate-100 text-slate-400 hover:text-slate-900"
                )}
              >
                <Filter size={18} className="group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Filter</span>
              </button>
            )}

            {viewMode && onViewModeChange && (
              <div className={cn(
                "rounded-[20px] flex p-1.5 border shadow-xl transition-all",
                theme === 'dark' ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-100 shadow-slate-200/40"
              )}>
                <button
                  onClick={() => onViewModeChange('grid')}
                  className={cn(
                    "p-3 rounded-xl transition-all active:scale-95",
                    viewMode === 'grid' 
                      ? (theme === 'dark' ? "bg-slate-800 text-indigo-400 shadow-inner" : "bg-slate-50 text-indigo-600 border border-slate-100 shadow-inner") 
                      : "text-slate-500 hover:text-slate-300"
                  )}
                >
                  <LayoutGrid size={20} />
                </button>
                <button
                  onClick={() => onViewModeChange('list')}
                  className={cn(
                    "p-3 rounded-xl transition-all active:scale-95",
                    viewMode === 'list'
                      ? (theme === 'dark' ? "bg-slate-800 text-indigo-400 shadow-inner" : "bg-slate-50 text-indigo-600 border border-slate-100 shadow-inner") 
                      : "text-slate-500 hover:text-slate-300"
                  )}
                >
                  <List size={22} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
