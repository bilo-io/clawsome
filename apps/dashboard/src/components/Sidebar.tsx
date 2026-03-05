// apps/dashboard/src/components/Sidebar.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Zap,
  LayoutDashboard,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Bot,
  BrainCircuit,
  MessageCircle,
  Shield,
  Cpu,
  BarChart3,
  ListTodo,
  History,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  href: string;
  status?: 'active';
}

interface SidebarCategory {
  title: string;
  items: SidebarItem[];
}

export const Sidebar = () => {
  const pathname = usePathname();
  const { 
    isSidebarExpanded, 
    toggleSidebar, 
    glowIntensity,
    theme
  } = useUIStore();

  const [openCategories, setOpenCategories] = useState<string[]>(['Main Hub', 'Agentic', 'Operations']);

  const toggleCategory = (title: string) => {
    if (title === 'Main Hub') return; 
    setOpenCategories(prev => 
      prev.includes(title) 
        ? prev.filter(t => t !== title) 
        : [...prev, title]
    );
  };

  const categories: SidebarCategory[] = [
    {
      title: 'Main Hub',
      items: [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
        { icon: BarChart3, label: 'Usage', href: '/usage' },
      ]
    },
    {
      title: 'Agentic',
      items: [
        { icon: Bot, label: 'Agents', href: '/agents' },
        { icon: Sparkles, label: 'Skills', href: '/skills' },
        { icon: BrainCircuit, label: 'Swarms', href: '/swarms' },
      ]
    },
    {
      title: 'Operations',
      items: [
        { icon: MessageCircle, label: 'Chats', status: 'active', href: '/chat' },
        { icon: ListTodo, label: 'Mission Log', href: '/mission-log' },
        { icon: History, label: 'Smart History', href: '/history' },
        { icon: Cpu, label: 'Analytics', href: '/analytics' },
        { icon: Shield, label: 'Security', href: '/security' },
      ]
    }
  ];

  return (
    <aside 
      className={cn(
        "h-screen transition-all duration-300 flex flex-col z-50 border-r shadow-2xl",
        theme === 'dark' ? "bg-slate-950 border-slate-900" : "bg-white border-slate-200",
        isSidebarExpanded ? "w-64" : "w-20"
      )}
    >
      <div className={cn(
        "p-6 flex items-center justify-between border-b",
        theme === 'dark' ? "border-slate-900 bg-black/20" : "border-slate-100 bg-slate-50/50"
      )}>
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-500/20">
            <Zap size={20} className="text-white fill-white" />
          </div>
          {isSidebarExpanded && (
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={cn(
                "font-bold tracking-tighter text-xl",
                theme === 'dark' ? "text-white" : "text-black"
              )}
            >
              NIGHTCLAW
            </motion.span>
          )}
        </div>
        <button 
          onClick={toggleSidebar}
          className={cn(
            "p-1 rounded-md transition-colors",
            theme === 'dark' ? "hover:bg-slate-900 text-slate-500" : "hover:bg-slate-200 text-slate-400"
          )}
        >
          {isSidebarExpanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 space-y-6 no-scrollbar px-4">
        {categories.map((category) => {
          const isOpen = openCategories.includes(category.title);
          
          return (
            <div key={category.title} className="flex flex-col">
              {/* Category Header */}
              {isSidebarExpanded && category.title !== 'Main Hub' ? (
                <button
                  onClick={() => toggleCategory(category.title)}
                  className={cn(
                    "flex items-center justify-between w-full px-2 py-2 text-xs font-bold uppercase tracking-[0.2em] transition-colors group mb-2 text-left",
                    theme === 'dark' ? "text-slate-600 hover:text-slate-300" : "text-slate-700 hover:text-black"
                  )}
                >
                  <span className="truncate">{category.title}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={14} />
                  </motion.div>
                </button>
              ) : (
                isSidebarExpanded && (
                  <div className={cn(
                    "px-2 py-2 text-xs font-bold uppercase tracking-[0.2em] mb-2",
                    theme === 'dark' ? "text-slate-600" : "text-slate-600"
                  )}>
                    {category.title}
                  </div>
                )
              )}

              {/* Category Items */}
              <AnimatePresence initial={false}>
                {(isOpen || !isSidebarExpanded) && (
                  <motion.div
                    initial={isSidebarExpanded ? { height: 0, opacity: 0 } : undefined}
                    animate={isSidebarExpanded ? { height: 'auto', opacity: 1 } : undefined}
                    exit={isSidebarExpanded ? { height: 0, opacity: 0 } : undefined}
                    className="space-y-1"
                  >
                    {category.items.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "group relative flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border",
                            isActive 
                              ? (theme === 'dark' ? "bg-indigo-600/10 border-indigo-500/30 text-white" : "bg-indigo-50 border-indigo-200 shadow-sm text-indigo-700") 
                              : (theme === 'dark' ? "hover:bg-slate-900 border-transparent hover:border-slate-800 text-slate-400 hover:text-white" : "hover:bg-slate-50 border-transparent hover:border-slate-200 text-slate-600 hover:text-slate-950")
                          )}
                        >
                          <item.icon 
                            size={20} 
                            className={cn(
                              "transition-colors shrink-0",
                              isActive 
                                ? "text-indigo-500" 
                                : (theme === 'dark' ? "text-slate-500 group-hover:text-indigo-400" : "text-slate-500 group-hover:text-indigo-600")
                            )} 
                          />
                          
                          {isSidebarExpanded && (
                            <div className="flex-1 flex items-center justify-between min-w-0">
                              <span className={cn(
                                "text-sm font-semibold transition-colors truncate",
                                isActive 
                                  ? (theme === 'dark' ? "text-white" : "text-indigo-700") 
                                  : (theme === 'dark' ? "text-slate-400 group-hover:text-white" : "text-slate-700 group-hover:text-black")
                              )}>
                                {item.label}
                              </span>
                              {item.status === 'active' && (
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse" />
                              )}
                            </div>
                          )}

                          {!isSidebarExpanded && item.status === 'active' && (
                            <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse" />
                          )}

                          {/* Glow Overlay */}
                          <div 
                            className={cn(
                              "absolute inset-0 rounded-xl opacity-0 transition-opacity bg-indigo-500 blur-md -z-10",
                              isActive ? "opacity-10" : "group-hover:opacity-10"
                            )}
                            style={{ filter: `blur(${glowIntensity / 10}px)` }}
                          />
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      <div className={cn(
        "p-4 border-t",
        theme === 'dark' ? "border-slate-900 bg-black/20" : "border-slate-100 bg-slate-50/50"
      )}>
        <div className={cn(
          "p-4 rounded-2xl transition-all",
          theme === 'dark' ? "bg-slate-900/50 border border-slate-800" : "bg-white border border-slate-200 shadow-sm",
          isSidebarExpanded ? 'opacity-100' : 'opacity-0 scale-95 pointer-events-none'
        )}>
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border border-white/10" />
             <div className="flex flex-col">
                 <span className={cn("text-xs font-bold", theme === 'dark' ? "text-white" : "text-black")}>BiloDev</span>
                <span className="text-[10px] text-indigo-500 font-mono text-nowrap font-bold">OP_CLEARANCE: S3</span>
             </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
