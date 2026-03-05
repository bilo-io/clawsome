// apps/dashboard/src/app/chat/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MessageSquare, ChevronRight } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/PageHeader';

const CHAT_TRANSITION = { duration: 0.35, ease: [0.32, 0.72, 0, 1] as const };
const LIST_EXIT_X = -80;
const LIST_ENTER_X = -80;

const MOCK_CHATS = [
  { id: '1', title: 'Workspace analysis & security audit', preview: 'NC-01 on-line. Scanning workspace...', updatedAt: '2m ago' },
  { id: '2', title: 'Token usage & cost breakdown', preview: 'Retrieving telemetry. Over the last 24h...', updatedAt: '15m ago' },
  { id: '3', title: 'Mission logs summary', preview: 'Searching logs. Recent missions: REF-781...', updatedAt: '1h ago' },
  { id: '4', title: 'Senior Dev agent profile', preview: "Neural profile updated. Identity: 'Senior Engineer'...", updatedAt: 'Yesterday' },
  { id: '5', title: 'Dashboard refactor scope', preview: 'Proposed scope: Sidebar, Usage charts...', updatedAt: '2 days ago' },
];

export default function ChatListPage() {
  const router = useRouter();
  const { theme } = useUIStore();
  const [exitingId, setExitingId] = useState<string | null>(null);

  const handleSelectChat = (id: string) => {
    setExitingId(id);
  };

  const handleListExitComplete = () => {
    if (exitingId) {
      router.push(`/chat/${exitingId}`);
      /* Do not clear exitingId: keep list in exit state until unmount to avoid flash */
    }
  };

  return (
    <main className="h-[calc(100vh-120px)] flex flex-col relative overflow-hidden">
      <PageHeader
        title="AGENT TERMINAL"
        badge="MISSION_CONTROL"
        statusLabel="Active Protocol:"
        statusValue="NC-CORE-7"
        statusColor="indigo"
      />

      <div className="flex-1 flex min-h-0 pt-6">
        <motion.div
          className="w-full max-w-md shrink-0 pr-6"
          initial={{ opacity: 0, x: LIST_ENTER_X }}
          animate={
            exitingId
              ? { opacity: 0, x: LIST_EXIT_X }
              : { opacity: 1, x: 0 }
          }
          transition={CHAT_TRANSITION}
          onAnimationComplete={() => {
            if (exitingId) handleListExitComplete();
          }}
        >
          <div className={cn(
            "rounded-[32px] border overflow-hidden shadow-xl transition-colors",
            theme === 'dark' ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-100 shadow-slate-200/40"
          )}>
            <div className={cn(
              "px-6 py-4 border-b",
              theme === 'dark' ? "border-slate-800" : "border-slate-100"
            )}>
              <h2 className={cn("text-[10px] font-black uppercase tracking-[0.25em]", theme === 'dark' ? "text-slate-500" : "text-slate-400")}>
                Recent threads
              </h2>
            </div>
            <ul className="divide-y divide-slate-200 dark:divide-slate-800">
              {MOCK_CHATS.map((chat) => (
                <li key={chat.id}>
                  <button
                    type="button"
                    onClick={() => handleSelectChat(chat.id)}
                    disabled={!!exitingId}
                    className={cn(
                      "w-full flex items-center gap-4 px-6 py-5 text-left transition-colors disabled:pointer-events-none",
                      theme === 'dark' ? "hover:bg-slate-800/60" : "hover:bg-slate-50"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
                      theme === 'dark' ? "bg-slate-800 text-indigo-400" : "bg-slate-100 text-indigo-600"
                    )}>
                      <MessageSquare size={22} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn(
                        "text-sm font-bold truncate",
                        theme === 'dark' ? "text-slate-200" : "text-slate-900"
                      )}>
                        {chat.title}
                      </p>
                      <p className={cn(
                        "text-[11px] truncate mt-0.5",
                        theme === 'dark' ? "text-slate-500" : "text-slate-400"
                      )}>
                        {chat.preview}
                      </p>
                      <p className={cn(
                        "text-[10px] font-bold uppercase tracking-widest mt-1",
                        theme === 'dark' ? "text-slate-600" : "text-slate-400"
                      )}>
                        {chat.updatedAt}
                      </p>
                    </div>
                    <ChevronRight size={20} className={cn("shrink-0", theme === 'dark' ? "text-slate-500" : "text-slate-400")} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {!exitingId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.25 }}
            className={cn(
              "flex-1 flex items-center justify-center rounded-[32px] border border-dashed",
              theme === 'dark' ? "border-slate-800/50 bg-slate-950/20" : "border-slate-200 bg-slate-50/50"
            )}
          >
            <p className={cn(
              "text-[10px] font-black uppercase tracking-[0.3em]",
              theme === 'dark' ? "text-slate-600" : "text-slate-400"
            )}>
              Select a thread
            </p>
          </motion.div>
        )}
      </div>

    </main>
  );
}
