import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ReleasesPage() {
  const releases = [
    { version: "v0.1.0", date: "March 2026", features: ["Initial Monorepo Architecture", "@clawsome/ui shared package", "Nightclaw OS Dashboard MVP", "Developer Documentation App"] },
    { version: "v0.0.1", date: "February 2026", features: ["Proof of concept AI swarm implementation", "Basic command line structure"] },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-24">
      <header className="space-y-4">
        <h1 className="text-4xl font-black tracking-tight">Release Notes</h1>
        <p className="text-lg text-slate-500 max-w-2xl">
          Track the evolution of the Clawsome monorepo and system architecture.
        </p>
      </header>
      
      <section className="space-y-16 mt-16">
        {releases.map((release, index) => (
          <div key={release.version} className="relative pl-8 md:pl-0">
             <div className="hidden md:block absolute left-[120px] top-6 w-8 border-t-2 border-dashed border-indigo-500/30" />
             <div className="flex flex-col md:flex-row gap-6 md:gap-16 items-start">
                <div className="w-24 shrink-0 font-bold text-sm text-slate-400 uppercase tracking-widest pt-2">
                  {release.date}
                </div>
                
                <div className="flex-1 p-8 rounded-[40px] border dark:border-slate-800 border-slate-200 bg-white dark:bg-slate-900 shadow-sm relative group hover:border-indigo-500/30 transition-colors">
                  <div className="absolute -left-3 top-6 w-6 h-6 rounded-full bg-slate-950 border-4 border-slate-800 dark:border-slate-900 group-hover:border-indigo-500 transition-colors hidden md:block" />
                  <h3 className="text-2xl font-black tracking-tighter mb-6 flex items-center gap-3">
                    <span className="text-indigo-500">{release.version}</span>
                  </h3>
                  
                  <ul className="space-y-4">
                    {release.features.map(f => (
                      <li key={f} className="flex items-start gap-4 text-sm text-slate-600 dark:text-slate-400">
                        <ArrowRight size={16} className="text-indigo-500/50 mt-0.5 shrink-0" />
                        <span className="leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
                  
                </div>
             </div>
          </div>
        ))}
      </section>
    </div>
  );
}
