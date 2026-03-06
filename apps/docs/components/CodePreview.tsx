'use client';

import React, { useState } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import { Copy, Check } from 'lucide-react';
import { useUI, cn } from '@clawsome/ui';

interface CodePreviewProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
}

export function CodePreview({ code, language = 'bash', showLineNumbers = false }: CodePreviewProps) {
  const [copied, setCopied] = useState(false);
  const { theme } = useUI();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightedCode = hljs.highlightAuto(code, language ? [language] : undefined).value;

  return (
    <div className={cn(
      "relative group rounded-[24px] overflow-hidden border transition-colors my-6 shadow-xl",
      theme === 'dark' ? "bg-slate-950 border-slate-800" : "bg-slate-900 border-slate-800" // Keep dark for both to preserve syntax colors
    )}>
      <div className={cn(
        "flex items-center justify-between px-6 py-3 border-b text-xs font-mono font-bold tracking-[0.2em] uppercase",
        "bg-slate-900 border-slate-800 text-slate-400"
      )}>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700 hover:bg-rose-500 transition-colors" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700 hover:bg-amber-500 transition-colors" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700 hover:bg-emerald-500 transition-colors" />
          </div>
          <span className="ml-4 opacity-70">{language}</span>
        </div>
        <button 
          onClick={handleCopy}
          className="flex items-center gap-2 hover:text-white transition-colors active:scale-95"
        >
          {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          {copied ? <span className="text-emerald-400">Copied</span> : 'Copy'}
        </button>
      </div>
      <div className="p-6 overflow-x-auto text-[13px] font-mono leading-relaxed text-slate-300">
        <pre><code className={`language-${language}`} dangerouslySetInnerHTML={{ __html: highlightedCode }} /></pre>
      </div>
    </div>
  );
}
