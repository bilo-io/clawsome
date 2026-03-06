import { useState } from 'react';
import { 
  ThemeProvider, 
  useUI, 
  TestComponent,
  PageHeader,
  SegmentedControl,
  SlideToConfirm,
  ContextAccordion,
  CodeBlock,
  SkillCard,
  AgentCard,
  PermissionToggle,
  QuickActions,
  SystemVitality
} from './index';
import { Settings, User, Zap, Code, Shield } from 'lucide-react';

function Showcase() {
  const { theme, setTheme } = useUI();
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const demoSkill = {
    id: 'demo-skill',
    name: 'Neural Refactor',
    description: 'Autonomous code analysis and optimization engine with real-time feedback loop.',
    icon: 'Terminal',
    content: 'npx clawsome-turbo refactor --target ./src',
    isMarketplace: false
  };

  const demoAgent = {
    id: 'demo-agent-uuid-001',
    name: 'ELARA-7',
    title: 'Senior Logic Architect',
    profilePicture: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&h=200&auto=format&fit=crop',
    createdAt: Date.now()
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 p-8 md:p-16 ${theme === 'dark' ? 'bg-[#020617] text-white' : 'bg-slate-50 text-slate-900'}`}>
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Header Section */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-slate-800/20 pb-12">
          <div>
            <h1 className="text-6xl font-black tracking-tighter mb-4 bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent">
              @clawsome/ui
            </h1>
            <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-xs">
              Shared Component Infrastructure for NightClaw OS
            </p>
          </div>
          
          <div className="flex items-center gap-4 bg-slate-900/40 p-2 rounded-full border border-slate-800">
            <button 
              onClick={() => setTheme('light')}
              className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${theme === 'light' ? 'bg-white text-black shadow-xl' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Light
            </button>
            <button 
              onClick={() => setTheme('dark')}
              className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${theme === 'dark' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Dark
            </button>
          </div>
        </section>

        {/* Foundation Section */}
        <section className="space-y-12">
          <div className="space-y-2">
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
              <span className="p-2 bg-indigo-500/10 text-indigo-500 rounded-xl"><Shield size={20} /></span>
              Foundation
            </h2>
            <div className="h-1 w-20 bg-indigo-500 rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 gap-12">
            <TestComponent />
            
            <PageHeader 
              title="NETWORK TOPOLOGY" 
              statusLabel="System Integrity:"
              statusValue="High-Fidelity"
              statusColor="emerald"
              description="Visual interface for monitoring neural connections and node vitality across the decentralized workforce cluster."
            />
          </div>
        </section>

        {/* Navigation & Controls Section */}
        <section className="space-y-12">
          <div className="space-y-2">
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
              <span className="p-2 bg-emerald-500/10 text-emerald-500 rounded-xl"><Zap size={20} /></span>
              Navigation & Interaction
            </h2>
            <div className="h-1 w-20 bg-emerald-500 rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Segmented Control</span>
              <div className="h-14">
                <SegmentedControl 
                  options={['Default', 'Analytic', 'Neural', 'Ghost']} 
                  value="Neural" 
                  onChange={() => {}} 
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Slide To Confirm</span>
              <SlideToConfirm label="DEPLOY WORKFORCE" onConfirm={() => console.log('Confirmed!')} />
            </div>
          </div>
        </section>

        {/* Content Modules Section */}
        <section className="space-y-12">
          <div className="space-y-2">
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
              <span className="p-2 bg-amber-500/10 text-amber-500 rounded-xl"><Code size={20} /></span>
              Content Modules
            </h2>
            <div className="h-1 w-20 bg-amber-500 rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
             <div className="space-y-8">
                <ContextAccordion title="ARCHITECTURAL BLUEPRINT" icon={<Settings size={18} />} defaultOpen>
                   <p>The system utilizes a modular micro-frontend architecture with shared state synchronization via the global neural mesh. All components are atomic and theme-aware by default.</p>
                </ContextAccordion>
                
                <CodeBlock 
                  code={`function optimizeNeuralMesh(nodes) {\n  return nodes.map(node => ({\n    ...node,\n    vitality: Math.min(100, node.vitality * 1.2),\n    recalibrated: true\n  }));\n}`} 
                  language="javascript" 
                />
             </div>
             
             <div className="space-y-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Display Cards</span>
                  <div className="flex p-1 bg-slate-900/40 rounded-full border border-slate-800">
                    <button onClick={() => setViewMode('grid')} className={`px-4 py-1.5 rounded-full text-[9px] font-black ${viewMode === 'grid' ? 'bg-white text-black' : 'text-slate-500'}`}>GRID</button>
                    <button onClick={() => setViewMode('table')} className={`px-4 py-1.5 rounded-full text-[9px] font-black ${viewMode === 'table' ? 'bg-white text-black' : 'text-slate-500'}`}>TABLE</button>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  <SkillCard skill={demoSkill} viewMode={viewMode} />
                  <AgentCard agent={demoAgent} viewMode={viewMode} />
                </div>
             </div>
          </div>
        </section>

        {/* System Intelligence Section */}
        <section className="space-y-12 pb-24">
          <div className="space-y-2">
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
              <span className="p-2 bg-indigo-500/10 text-indigo-500 rounded-xl"><User size={20} /></span>
              System Systems
            </h2>
            <div className="h-1 w-20 bg-indigo-500 rounded-full" />
          </div>
          
          <div className="space-y-12">
            <QuickActions />
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-12">
              <div className="xl:col-span-2">
                <PermissionToggle />
              </div>
              <div className="xl:col-span-3">
                <SystemVitality />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Showcase />
    </ThemeProvider>
  );
}

export default App;
