// apps/dashboard/src/app/layout.tsx
'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { BottomDock } from "@/components/BottomDock";
import { WorkspaceTabs } from "@/components/WorkspaceTabs";
import { AILab } from "@/components/AILab";
import { CommandModal } from "@/components/CommandModal";
import { useUIStore } from "@/store/useUIStore";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme, glowIntensity } = useUIStore();

  return (
    <html 
      lang="en" 
      className={theme}
      style={{ 
        '--glow-opacity': glowIntensity / 100,
        '--glow-blur': `${glowIntensity * 1.5}px`,
        '--glow-spread': `${glowIntensity / 2}px`,
        '--glow-primary': theme === 'dark' ? 'rgba(99, 102, 241, 1)' : 'rgba(79, 70, 229, 1)',
      } as React.CSSProperties}
    >
      <head>
        <title>Clawsome AI Dashboard</title>
        <meta name="description" content="Advanced Terminal AI Orchestrator" />
        <link rel="icon" href="/clawsome-icon.svg" type="image/svg+xml" />
      </head>
      <body className={cn(
        geistSans.variable, 
        geistMono.variable, 
        "antialiased flex h-screen overflow-hidden transition-colors duration-300",
        theme === 'dark' ? "bg-slate-950 text-slate-50" : "bg-slate-50 text-slate-900"
      )}>
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 relative">
          <WorkspaceTabs />
          <main className="flex-1 overflow-auto p-8 no-scrollbar">
            {children}
          </main>
          <AILab />
          <CommandModal />
          <BottomDock />
        </div>
      </body>
    </html>
  );
}
