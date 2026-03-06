'use client';

import { CodeBlock, PageHeader } from "@clawsome/ui";
import { Terminal, Cpu, ShieldCheck, Zap } from 'lucide-react';

export default function CLIPage() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-32">
      <header className="space-y-4">
        <h1 className="text-4xl font-black tracking-tight">CLI Reference</h1>
        <p className="text-lg text-slate-500 max-w-2xl">
          The Clawsome CLI is your command center for orchestrating neural agents and managing the gateway.
        </p>
      </header>

      <PageHeader 
        title="Interactive Hub" 
        statusLabel="Command:"
        statusValue="clawsome"
        statusColor="indigo"
        description="Launch the premium interactive menu to manage all system processes."
      />

      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
          <Terminal size={24} className="text-indigo-500" />
          Core Commands
        </h2>
        
        <div className="space-y-10">
          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Zap size={18} className="text-amber-500" />
              clawsome start
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Launches the Clawsome Gateway server. Automatically binds to neural endpoints and initializes the dashboard.
            </p>
            <CodeBlock code="clawsome start --port 17871 --no-open" language="bash" />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-500" />
              clawsome doctor
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Runs a complete diagnostic of your environment, checking Bun runtime, Moon tasks, and port availability.
            </p>
            <CodeBlock code="clawsome doctor" language="bash" />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Cpu size={18} className="text-blue-500" />
              clawsome setup
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Enters the interactive setup wizard to configure LLM providers, API keys, and RAG settings.
            </p>
            <CodeBlock code="clawsome setup" language="bash" />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Terminal size={18} className="text-rose-500" />
              clawsome stop
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Gracefully terminates all active gateway processes and cleans up system locks.
            </p>
            <CodeBlock code="clawsome stop" language="bash" />
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight border-b border-slate-200 dark:border-slate-800 pb-4">
          Global Installation
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Install Clawsome globally to access the command hub from any workspace.
        </p>
        <CodeBlock code="bun add -g @clawsome/cli" language="bash" />
      </section>
    </div>
  );
}
