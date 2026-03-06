import { CommandPreview } from "../../components/CommandPreview";
import { LanguagePreview } from "../../components/LanguagePreview";

export default function InstallationPage() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-24">
      <header className="space-y-4">
        <h1 className="text-4xl font-black tracking-tight">Installation</h1>
        <p className="text-lg text-slate-500 max-w-2xl">
          Everything you need to configure Clawsome globally or install specific packages individually.
        </p>
      </header>
      
      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight border-b border-slate-200 dark:border-slate-800 pb-4">
          Global CLI Intstallation
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          The easiest way to orchestrate Neural Agents across your enterprise is by installing the CLI toolkit globally using your preferred package manager.
        </p>
        <CommandPreview 
          commands={{
            npm: "npm install -g @clawsome/turbo",
            pnpm: "pnpm add -g @clawsome/turbo",
            yarn: "yarn global add @clawsome/turbo",
            bun: "bun add -g @clawsome/turbo"
          }} 
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight border-b border-slate-200 dark:border-slate-800 pb-4">
          Monorepo Initialization
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          If you are starting a fresh project, the CLI can scaffold the entire monorepo automatically, installing the necessary `apps/dashboard`, `packages/ui` and MCP definitions.
        </p>
        
        <LanguagePreview 
          blocks={[
             { label: 'Scaffold Project', language: 'bash', code: 'clawsome-turbo init my-agent-swarm\ncd my-agent-swarm\n\n# Start development servers\npnpm dev' },
             { label: 'Configure Secrets', language: 'bash', code: '# Generate a secure environment and bind to vault\nclawsome-turbo link-vault --staging' }
          ]} 
        />
      </section>
      
      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight border-b border-slate-200 dark:border-slate-800 pb-4">
          Next Steps
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xl">
           Once your workspace is running, you can connect your existing resources or head to the architecture section to learn how agents communicate.
        </p>
      </section>
    </div>
  );
}
