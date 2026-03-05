// apps/dashboard/src/store/useSkillStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Skill {
  id: string;
  name: string;
  icon: string; // Lucide icon name or emoji
  description: string;
  content: string; // Markdown
  isMarketplace?: boolean;
}

interface SkillState {
  mySkills: Skill[];
  marketplaceSkills: Skill[];
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  importSkill: (skillId: string) => void;
  updateSkill: (id: string, updates: Partial<Omit<Skill, 'id'>>) => void;
  deleteSkill: (id: string) => void;
  getSkillById: (id: string) => Skill | undefined;
}

const DEFAULT_MARKETPLACE: Skill[] = [
  {
    id: 'm1',
    name: 'Python Executor',
    icon: 'Terminal',
    description: 'Execute python snippets in a sandboxed environment.',
    content: '# Python Executor\n\nAllows the agent to run Python code to solve complex math or data processing tasks.',
    isMarketplace: true
  },
  {
    id: 'm2',
    name: 'Web Scraper',
    icon: 'Globe',
    description: 'Extract clean markdown content from any URL.',
    content: '# Web Scraper\n\nEquips the agent with the ability to fetch and parse HTML into structured markdown.',
    isMarketplace: true
  },
  {
    id: 'm3',
    name: 'Memory Vector Search',
    icon: 'Database',
    description: 'Search through long-term agent memory using embeddings.',
    content: '# Vector Search\n\nProvides semantic search capabilities over the agent\'s historical context.',
    isMarketplace: true
  },
  {
    id: 'm4',
    name: 'File System Manager',
    icon: 'FileCode',
    description: 'Read, write, and organize files in the workspace.',
    content: '# FS Manager\n\nDirect access to workspace files with safety guards.',
    isMarketplace: true
  },
  {
    id: 'm5',
    name: 'Discord',
    icon: 'MessageCircle',
    description: 'Send and receive messages on Discord.',
    content: '# Discord\n\nEquips the agent with the ability to send and receive messages on Discord.',
    isMarketplace: true
  },
  {
    id: 'm6',
    name: 'GitHub',
    icon: 'Github',
    description: 'Send and receive messages on Discord.',
    content: '# Discord\n\nEquips the agent with the ability to send and receive messages on Discord.',
    isMarketplace: true
  },
  {
    id: 'm7',
    name: 'Twitter',
    icon: 'Twitter',
    description: 'Send and receive messages on Discord.',
    content: '# Discord\n\nEquips the agent with the ability to send and receive messages on Discord.',
    isMarketplace: true
  },
  {
    id: 'm8',
    name: 'Telegram',
    icon: 'Telegram',
    description: 'Send and receive messages on Telegram.',
    content: '# Telegram\n\nEquips the agent with the ability to send and receive messages on Telegram.',
    isMarketplace: true
  },
];

export const useSkillStore = create<SkillState>()(
  persist(
    (set, get) => ({
      mySkills: [],
      marketplaceSkills: DEFAULT_MARKETPLACE,
      addSkill: (skillData) => {
        const newSkill: Skill = {
          ...skillData,
          id: crypto.randomUUID(),
        };
        set((state) => ({ mySkills: [newSkill, ...state.mySkills] }));
      },
      importSkill: (skillId) => {
        const skill = get().marketplaceSkills.find(s => s.id === skillId);
        if (skill && !get().mySkills.some(s => s.name === skill.name)) {
          const newSkill = { ...skill, id: crypto.randomUUID(), isMarketplace: false };
          set((state) => ({ mySkills: [newSkill, ...state.mySkills] }));
        }
      },
      updateSkill: (id, updates) => {
        set((state) => ({
          mySkills: state.mySkills.map((s) =>
            s.id === id ? { ...s, ...updates } : s
          ),
        }));
      },
      deleteSkill: (id) => {
        set((state) => ({
          mySkills: state.mySkills.filter((s) => s.id !== id),
        }));
      },
      getSkillById: (id) => {
        return get().mySkills.find((s) => s.id === id) || get().marketplaceSkills.find((s) => s.id === id);
      },
    }),
    {
      name: 'skill-storage',
    }
  )
);
