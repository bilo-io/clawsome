// apps/dashboard/src/app/memory/page.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Brain, 
  Search, 
  Plus, 
  LayoutGrid, 
  List, 
  Youtube, 
  Link as LinkIcon, 
  FileText, 
  FileCode, 
  MoreVertical,
  ChevronDown,
  Loader2,
  X,
  Clock,
  ExternalLink,
  ChevronRight,
  Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';

// Global Configuration
const MAX_DOCUMENTS = 10;

type DataType = 'link' | 'youtube' | 'pdf' | 'text';

interface DataPoint {
  id: string;
  type: DataType;
  name: string;
  content: string;
  status: 'processing' | 'ready';
  timestamp: string;
}

interface Memory {
  id: string;
  name: string;
  documents: DataPoint[];
  lastUpdated: string;
}

export default function MemoriesPage() {
  const { theme } = useUIStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDropdownOpen, setIsAddDropdownOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<DataType | null>(null);
  
  // Mock Data
  const [memories, setMemories] = useState<Memory[]>([
    {
      id: '1',
      name: 'Neural Architecture v2',
      documents: [
        { id: 'd1', type: 'pdf', name: 'Specification Doc', content: 'Neural specs...', status: 'ready', timestamp: '2h ago' },
        { id: 'd2', type: 'link', name: 'Reference Paper', content: 'https://arxiv.org/...', status: 'ready', timestamp: '3h ago' },
      ],
      lastUpdated: '2h ago'
    },
    {
      id: '2',
      name: 'Market Analysis Swarm',
      documents: [
        { id: 'd3', type: 'youtube', name: 'Competitor Review', content: 'youtube.com/...', status: 'ready', timestamp: '1d ago' },
        { id: 'd4', type: 'text', name: 'Raw Notes', content: 'Market trends...', status: 'ready', timestamp: '1d ago' },
      ],
      lastUpdated: '1d ago'
    }
  ]);

  const filteredMemories = useMemo(() => {
    return memories.filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [memories, searchQuery]);

  // Handle adding new data point to the FIRST memory for demo purposes
  const handleAddDataPoint = (type: DataType, name: string, content: string) => {
    const newId = Math.random().toString(36).substr(2, 9);
    const newDataPoint: DataPoint = {
      id: newId,
      type,
      name,
      content,
      status: 'processing',
      timestamp: 'just now'
    };

    setMemories(prev => {
      const updated = [...prev];
      if (updated.length > 0) {
        // Add to the top of the specialized "documents" list of the first memory
        updated[0] = {
          ...updated[0],
          documents: [newDataPoint, ...updated[0].documents].slice(0, MAX_DOCUMENTS),
          lastUpdated: 'just now'
        };
      }
      return updated;
    });

    // Simulate processing
    setTimeout(() => {
      setMemories(prev => {
        const updated = [...prev];
        updated[0].documents = updated[0].documents.map(d => 
          d.id === newId ? { ...d, status: 'ready' } : d
        );
        return updated;
      });
    }, 4000);

    setActiveModal(null);
  };

  return (
    <main className="space-y-12 pb-20 max-w-[1600px] mx-auto transition-colors duration-300">
      {/* Header section consistent with dashboard */}
      <header className={cn(
        "flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b transition-colors",
        theme === "dark" ? "border-slate-800/50" : "border-slate-200"
      )}>
        <div>
          <h1 className="text-5xl font-black tracking-tighter flex items-center gap-4 text-black dark:text-white">
             MEMORIES <span className="font-thin opacity-30 text-slate-500">//</span> <span className="text-indigo-600 uppercase">Neural Context</span>
          </h1>
          <div className="flex items-center gap-6 mt-4">
            <p className={cn(
              "text-[10px] font-bold uppercase tracking-[0.25em] flex items-center gap-2",
              theme === "dark" ? "text-slate-500" : "text-slate-600"
            )}>
              Total Context Units: <span className="text-emerald-500 flex items-center gap-2 font-black">{memories.length} Clusters</span>
            </p>
            <div className={cn("w-1 h-3", theme === "dark" ? "bg-slate-800" : "bg-slate-300")} />
            <p className={cn(
              "text-[10px] font-bold uppercase tracking-[0.25em] flex items-center gap-2",
              theme === "dark" ? "text-slate-500" : "text-slate-600"
            )}>
              Storage limit: <span className="text-indigo-500 font-black">{MAX_DOCUMENTS} Docs / Memory</span>
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
           {/* Add Data Gradient Button & Dropdown */}
           <div className="relative">
              <button 
                onClick={() => setIsAddDropdownOpen(!isAddDropdownOpen)}
                className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-[20px] font-black text-sm uppercase tracking-widest shadow-2xl flex items-center gap-3 active:scale-95 transition-all"
              >
                <Plus size={18} className="transition-transform group-hover:rotate-90" />
                Add Data
                <ChevronDown size={14} className={cn("transition-transform", isAddDropdownOpen && "rotate-180")} />
                {/* Glow Overlay */}
                <div className="absolute inset-0 rounded-[20px] bg-indigo-500 blur-xl opacity-0 group-hover:opacity-30 transition-opacity" />
              </button>

              <AnimatePresence>
                {isAddDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className={cn(
                      "absolute right-0 mt-4 w-56 rounded-3xl border shadow-2xl z-[60] overflow-hidden p-2",
                      theme === 'dark' ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
                    )}
                  >
                    {[
                      { icon: LinkIcon, label: 'Link', type: 'link', color: 'text-blue-500' },
                      { icon: Youtube, label: 'YouTube', type: 'youtube', color: 'text-red-500' },
                      { icon: FileText, label: 'PDF Document', type: 'pdf', color: 'text-amber-500' },
                      { icon: FileCode, label: 'Plain Text', type: 'text', color: 'text-emerald-500' },
                    ].map((item) => (
                      <button
                        key={item.type}
                        onClick={() => {
                          setActiveModal(item.type as DataType);
                          setIsAddDropdownOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all",
                          theme === 'dark' ? "text-slate-400 hover:bg-slate-800 hover:text-white" : "text-slate-600 hover:bg-slate-50 hover:text-black"
                        )}
                      >
                        <item.icon size={18} className={item.color} />
                        {item.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
           </div>
        </div>
      </header>

      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="relative w-full max-w-md group">
          <Search className={cn(
            "absolute left-5 top-1/2 -translate-y-1/2 transition-colors",
            theme === 'dark' ? "text-slate-700 group-focus-within:text-indigo-500" : "text-slate-300 group-focus-within:text-indigo-600"
          )} size={20} />
          <input 
            type="text"
            placeholder="Search within neural memories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              "w-full pl-14 pr-6 py-5 rounded-[24px] border outline-none font-bold text-sm transition-all",
              theme === 'dark' ? "bg-slate-950 border-slate-800 focus:border-indigo-500/50 text-white placeholder:text-slate-800" : "bg-white border-slate-100 focus:border-indigo-400 text-slate-900 placeholder:text-slate-300 shadow-sm"
            )}
          />
        </div>

        <div className={cn(
          "flex p-1.5 rounded-2xl border transition-colors",
          theme === 'dark' ? "bg-slate-950 border-slate-800" : "bg-white border-slate-100 shadow-sm"
        )}>
          <button 
            onClick={() => setViewMode('grid')}
            className={cn(
              "p-3 rounded-xl transition-all",
              viewMode === 'grid' 
                ? "bg-indigo-600 text-white shadow-lg" 
                : (theme === 'dark' ? "text-slate-600 hover:text-white" : "text-slate-400 hover:text-black")
            )}
          >
            <LayoutGrid size={18} />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={cn(
              "p-3 rounded-xl transition-all",
              viewMode === 'list' 
                ? "bg-indigo-600 text-white shadow-lg" 
                : (theme === 'dark' ? "text-slate-600 hover:text-white" : "text-slate-400 hover:text-black")
            )}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* Memory View Content */}
      <AnimatePresence mode="popLayout">
        {viewMode === 'grid' ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {filteredMemories.map((memory) => (
              <MemoryCard key={memory.id} memory={memory} theme={theme} />
            ))}
          </motion.div>
        ) : (
          <motion.div layout className="space-y-4">
            {filteredMemories.map((memory) => (
              <MemoryListItem key={memory.id} memory={memory} theme={theme} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals for Add Data */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className={cn(
                "absolute inset-0 backdrop-blur-md transition-colors",
                theme === 'dark' ? "bg-slate-950/80" : "bg-slate-900/40"
              )}
            />
            
            <AddDataModal 
              type={activeModal} 
              onClose={() => setActiveModal(null)} 
              onSubmit={(name, content) => handleAddDataPoint(activeModal, name, content)}
              theme={theme}
            />
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

// Sub-components
function MemoryCard({ memory, theme }: { memory: Memory, theme: 'light' | 'dark' }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      className={cn(
        "group p-8 rounded-[40px] border shadow-2xl relative overflow-hidden transition-all",
        theme === 'dark' ? "bg-slate-900/40 border-slate-800/60 shadow-black/40" : "bg-white border-slate-100 shadow-slate-200/50"
      )}
    >
      <div className="flex justify-between items-start mb-8 relative z-10">
        <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-500">
           <Brain size={28} />
        </div>
        <button className={cn(
          "p-2 rounded-xl border transition-colors",
          theme === 'dark' ? "bg-slate-950 border-slate-800 text-slate-500" : "bg-slate-50 border-slate-100 text-slate-400"
        )}>
           <MoreVertical size={16} />
        </button>
      </div>

      <div className="relative z-10">
        <h3 className={cn("text-2xl font-black tracking-tight mb-2", theme === 'dark' ? "text-white" : "text-slate-900")}>
          {memory.name}
        </h3>
        <p className={cn("text-[10px] font-bold uppercase tracking-widest mb-8", theme === 'dark' ? "text-slate-500" : "text-slate-400")}>
          Updated {memory.lastUpdated}
        </p>

        <div className="space-y-3">
          {memory.documents.map((doc) => (
            <div 
              key={doc.id}
              className={cn(
                "flex items-center justify-between p-3 rounded-2xl border text-sm transition-all",
                theme === 'dark' ? "bg-slate-950 border-slate-800/50" : "bg-slate-50 border-slate-100"
              )}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className={cn(
                  "p-1.5 rounded-lg shrink-0",
                  doc.type === 'youtube' ? 'text-red-500' :
                  doc.type === 'pdf' ? 'text-amber-500' :
                  doc.type === 'link' ? 'text-blue-500' : 'text-emerald-500'
                )}>
                   {doc.type === 'youtube' && <Youtube size={14} />}
                   {doc.type === 'pdf' && <FileText size={14} />}
                   {doc.type === 'link' && <LinkIcon size={14} />}
                   {doc.type === 'text' && <FileCode size={14} />}
                </div>
                <span className={cn("font-bold truncate", theme === 'dark' ? "text-slate-300" : "text-slate-600")}>
                  {doc.name}
                </span>
              </div>
              
              {doc.status === 'processing' ? (
                <Loader2 size={12} className="text-indigo-500 animate-spin" />
              ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              )}
            </div>
          ))}
          {memory.documents.length === 0 && (
            <p className="text-xs text-slate-500 italic p-4 text-center">Neural void. Add data to begin.</p>
          )}
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full" />
    </motion.div>
  );
}

function MemoryListItem({ memory, theme }: { memory: Memory, theme: 'light' | 'dark' }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      className={cn(
        "p-6 rounded-[28px] border transition-all flex items-center justify-between group",
        theme === 'dark' ? "bg-slate-900/40 border-slate-800/60 hover:bg-slate-900" : "bg-white border-slate-100 hover:shadow-xl shadow-slate-200/50"
      )}
    >
      <div className="flex items-center gap-6">
        <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-500">
           <Brain size={20} />
        </div>
        <div>
          <h3 className={cn("text-lg font-black tracking-tight", theme === 'dark' ? "text-white" : "text-slate-900")}>
            {memory.name}
          </h3>
          <p className={cn("text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 mt-1", theme === 'dark' ? "text-slate-600" : "text-slate-400")}>
            {memory.documents.length}/{MAX_DOCUMENTS} Units <span className="text-slate-700">•</span> Updated {memory.lastUpdated}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex -space-x-2">
            {memory.documents.slice(0, 3).map((doc, i) => (
              <div key={i} className={cn(
                "w-8 h-8 rounded-lg border-2 flex items-center justify-center overflow-hidden",
                theme === 'dark' ? "bg-slate-950 border-slate-900 shadow-xl" : "bg-white border-slate-50 shadow-sm"
              )}>
                 {doc.type === 'youtube' && <Youtube size={14} className="text-red-500" />}
                 {doc.type === 'pdf' && <FileText size={14} className="text-amber-500" />}
                 {doc.type === 'link' && <LinkIcon size={14} className="text-blue-500" />}
                 {doc.type === 'text' && <FileCode size={14} className="text-emerald-500" />}
              </div>
            ))}
        </div>
        <button className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center border transition-all hover:scale-105",
          theme === 'dark' ? "bg-slate-950 border-slate-800 text-slate-500 hover:text-white" : "bg-slate-50 border-slate-100 text-slate-400 hover:text-indigo-600 shadow-sm"
        )}>
          <ChevronRight size={18} />
        </button>
      </div>
    </motion.div>
  );
}

interface ModalProps {
  type: DataType;
  onClose: () => void;
  onSubmit: (name: string, content: string) => void;
  theme: 'light' | 'dark';
}

function AddDataModal({ type, onClose, onSubmit, theme }: ModalProps) {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  
  const iconMap = {
    youtube: <Youtube size={28} className="text-red-500" />,
    link: <LinkIcon size={28} className="text-blue-500" />,
    pdf: <FileText size={28} className="text-amber-500" />,
    text: <FileCode size={28} className="text-emerald-500" />
  };

  const labelMap = {
    youtube: 'Video URL',
    link: 'Resource URL',
    pdf: 'File Link / Path',
    text: 'Neural Snippet'
  };

  const titleMap = {
    youtube: 'Ingest YouTube Intelligence',
    link: 'Connect Remote Resource',
    pdf: 'Process PDF Document',
    text: 'Save Memory Fragment'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 40 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className={cn(
        "relative w-full max-w-xl rounded-[48px] shadow-2xl overflow-hidden border transition-all z-[110]",
        theme === 'dark' ? "bg-slate-900 border-slate-800 shadow-black/60" : "bg-white border-slate-100 shadow-slate-200/60"
      )}
    >
      <div className="p-10">
        <div className="flex justify-between items-start mb-10">
          <div className="flex items-center gap-5">
             <div className={cn(
               "p-3 rounded-2xl shadow-lg border transition-all",
               theme === 'dark' ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-100"
             )}>
                {iconMap[type]}
             </div>
             <div>
                <h2 className={cn("text-3xl font-extrabold tracking-tight", theme === 'dark' ? "text-white" : "text-slate-900")}>
                  {titleMap[type]}
                </h2>
                <p className={cn("text-sm font-medium", theme === 'dark' ? "text-slate-500" : "text-slate-400")}>
                  Expand the neural context layer.
                </p>
             </div>
          </div>
          <button 
            onClick={onClose}
            className={cn(
              "p-3 rounded-2xl transition-all border shadow-sm",
              theme === 'dark' 
                ? "bg-slate-950 text-slate-500 border-slate-800 hover:text-white" 
                : "bg-slate-50 text-slate-400 border-slate-100 hover:text-slate-900"
            )}
          >
            <X size={20} />
          </button>
        </div>

        <form 
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(name, content);
          }} 
          className="space-y-8"
        >
          <div className="space-y-3">
            <label className={cn("text-[10px] font-bold uppercase tracking-[0.25em] ml-1", theme === 'dark' ? "text-slate-600" : "text-slate-400")}>
              Context Label
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Core Algorithm Specs"
              className={cn(
                "w-full rounded-2xl px-6 py-4 text-sm font-medium transition-all border outline-none",
                theme === 'dark' 
                  ? "bg-slate-950 border-slate-800 text-white placeholder:text-slate-800 focus:border-indigo-500/50" 
                  : "bg-slate-50 border-slate-100 text-slate-900 placeholder:text-slate-300 focus:border-indigo-400"
              )}
            />
          </div>

          <div className="space-y-3">
            <label className={cn("text-[10px] font-bold uppercase tracking-[0.25em] ml-1", theme === 'dark' ? "text-slate-600" : "text-slate-400")}>
              {labelMap[type]}
            </label>
            {type === 'text' ? (
              <textarea
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter raw text context..."
                rows={4}
                className={cn(
                  "w-full rounded-2xl px-6 py-4 text-sm font-medium transition-all border outline-none resize-none",
                  theme === 'dark' 
                    ? "bg-slate-950 border-slate-800 text-white placeholder:text-slate-800 focus:border-indigo-500/50" 
                    : "bg-slate-50 border-slate-100 text-slate-900 placeholder:text-slate-300 focus:border-indigo-400"
                )}
              />
            ) : (
              <input
                type="text"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={type === 'youtube' ? 'https://youtube.com/watch?v=...' : 'https://...'}
                className={cn(
                  "w-full rounded-2xl px-6 py-4 text-sm font-medium transition-all border outline-none",
                  theme === 'dark' 
                    ? "bg-slate-950 border-slate-800 text-white placeholder:text-slate-800 focus:border-indigo-500/50" 
                    : "bg-slate-50 border-slate-100 text-slate-900 placeholder:text-slate-300 focus:border-indigo-400"
                )}
              />
            )}
          </div>

          <div className="pt-8 flex gap-5">
            <button
              type="button"
              onClick={onClose}
              className={cn(
                "flex-1 px-8 py-4 rounded-[20px] font-bold uppercase tracking-widest text-[11px] transition-all border shadow-sm",
                theme === 'dark' ? "bg-slate-800 border-slate-700 text-slate-400 hover:text-white" : "bg-white border-slate-100 text-slate-500 hover:text-slate-900"
              )}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-[2] px-8 py-4 rounded-[20px] bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold uppercase tracking-widest text-[11px] shadow-xl hover:opacity-90 transition-all active:translate-y-1"
            >
              Initiate Ingestion
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
