import { CommandPreview } from "../../components/CommandPreview";
import { LanguagePreview } from "../../components/LanguagePreview";
import { Terminal, Box, Globe, Shield, ArrowRight, Zap } from "lucide-react";

export default function InstallationPage() {
  return (
    <div className="space-y-16 animate-in fade-in duration-500 pb-24">
      <header className="space-y-4">
        <h1 className="text-4xl font-black tracking-tight">Installation</h1>
        <p className="text-lg text-slate-500 max-w-2xl font-medium leading-relaxed">
          Get started with Clawsome by setting up the global CLI or initializing a dedicated monorepo workspace for your neural agents.
        </p>
      </header>
      
      <section className="space-y-8">
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <Globe className="text-indigo-500" size={24} />
          <h2 className="text-2xl font-black tracking-tight">Global CLI Setup</h2>
        </div>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
          The `clawsome` binary is the entry point for all orchestrations. Install it globally to manage gateways from any project directory.
        </p>
        <CommandPreview 
          commands={{
            npm: "npm install -g @clawsome/cli",
            pnpm: "pnpm add -g @clawsome/cli",
            yarn: "yarn global add @clawsome/cli",
            bun: "bun add -g @clawsome/cli"
          }} 
        />
      </section>

      <section className="space-y-8">
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <Box className="text-emerald-500" size={24} />
          <h2 className="text-2xl font-black tracking-tight">Workspace Initialization</h2>
        </div>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
          If you are starting a fresh project, use the initializer to scaffold a complete monorepo including a pre-configured `packages/ui` library and an `apps/gateway` instance.
        </p>
        
        <LanguagePreview 
          blocks={[
             { 
               label: 'Quick Start', 
               language: 'bash', 
               code: '# Create a new swarm project\nclawsome init my-agent-swarm\n\n# Navigate to your new workspace\ncd my-agent-swarm\n\n# Start the development stack\nbun dev' 
             },
             { 
               label: 'Manual Link', 
               language: 'bash', 
               code: '# Link an existing project to your Clawsome license\nclawsome link-license --env production' 
             }
          ]} 
        />
      </section>
      
      <section className="space-y-8">
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <Zap className="text-amber-500" size={24} />
          <h2 className="text-2xl font-black tracking-tight">Next Steps</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/40 space-y-4">
              <div className="p-3 w-fit bg-indigo-500/10 text-indigo-500 rounded-xl">
                 <Shield size={20} />
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight">Environment Audit</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">Run `clawsome doctor` to ensure your system meets the minimum requirements for neural orchestration.</p>
           </div>
           
           <div className="p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/40 space-y-4">
              <div className="p-3 w-fit bg-emerald-500/10 text-emerald-500 rounded-xl">
                 <Terminal size={20} />
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight">Configure Models</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">Head to the `clawsome setup` wizard to securely bind your LLM provider API keys to the gateway.</p>
           </div>
        </div>
      </section>
    </div>
  );
}
