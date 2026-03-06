import * as p from '@clack/prompts';
import pc from 'picocolors';
import { displayBranding, clawsomeGradient } from '../utils/branding.js';
import gradient from 'gradient-string';
import { writeFileSync } from 'fs';
import path from 'path';

const PROVIDERS = {
  openai: {
    label: 'OpenAI',
    models: [
      { value: 'gpt-4o', label: 'GPT-4o (Omni) — Recommended' },
      { value: 'gpt-4o-mini', label: 'GPT-4o Mini' },
      { value: 'o1-preview', label: 'o1 Preview (Reasoning)' },
      { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
    ],
  },
  anthropic: {
    label: 'Anthropic',
    models: [
      { value: 'claude-3-5-sonnet-latest', label: 'Claude 3.5 Sonnet (Latest) — Recommended' },
      { value: 'claude-3-opus-latest', label: 'Claude 3 Opus' },
      { value: 'claude-3-haiku-latest', label: 'Claude 3 Haiku (Fast)' },
    ],
  },
  gemini: {
    label: 'Google Gemini',
    models: [
      { value: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro — Recommended' },
      { value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro' },
      { value: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash (Fast)' },
    ],
  },
  mistral: {
    label: 'Mistral AI',
    models: [
      { value: 'mistral-large-latest', label: 'Mistral Large — Recommended' },
      { value: 'codestral-latest', label: 'Codestral (Code)' },
      { value: 'mistral-small-latest', label: 'Mistral Small (Fast)' },
    ],
  },
  deepseek: {
    label: 'DeepSeek',
    models: [
      { value: 'deepseek-v3', label: 'DeepSeek V3 — Recommended' },
      { value: 'deepseek-chat', label: 'DeepSeek Chat' },
      { value: 'deepseek-coder-v2', label: 'DeepSeek Coder V2' },
    ],
  },
  groq: {
    label: 'Groq (LPUs)',
    models: [
      { value: 'llama-3.1-70b-versatile', label: 'Llama 3.1 70B — Recommended' },
      { value: 'llama-3.1-8b-instant', label: 'Llama 3.1 8B (Instant)' },
      { value: 'gemma2-9b-it', label: 'Gemma 2 9B' },
    ],
  },
};

const bullet = (msg: string) => pc.bold(pc.cyan(`◆  ${msg}`));

export async function setup(): Promise<void> {
  await displayBranding();

  p.intro(clawsomeGradient(' 🐾  Welcome to Clawsome Setup Wizard '));

  const project = await p.group(
    {
      agentName: () =>
        p.text({
          message: bullet('What would you like to call your primary agent?'),
          placeholder: 'Aura',
          validate: (val) => {
            if (!val) return 'Agent name is required.';
          },
        }),

      projectName: () =>
        p.text({
          message: bullet('What is your project name?'),
          placeholder: 'clawsome-monorepo',
          validate: (val) => {
            if (!val) return 'Project name is required.';
            if (val.length < 3) return 'Must be at least 3 characters.';
          },
        }),

      provider: () =>
        p.select({
          message: bullet('Which LLM provider should power your agents?'),
          options: Object.entries(PROVIDERS).map(([value, info]) => ({
            value,
            label: info.label,
          })),
        }),

      model: ({ results }) =>
        p.select({
          message: bullet(
            `Select a model from ${PROVIDERS[results.provider as keyof typeof PROVIDERS].label}:`
          ),
          options: PROVIDERS[results.provider as keyof typeof PROVIDERS].models,
        }),

      enableRag: () =>
        p.confirm({
          message: bullet('Enable local RAG (Vector database)?'),
          initialValue: true,
        }),

      gatewayPort: () =>
        p.text({
          message: bullet('Gateway port'),
          placeholder: '3000',
          defaultValue: '3000',
        }),

      apiKey: () =>
        p.password({
          message: bullet('Enter your API Key for the selected provider'),
          validate: (val) => {
            if (!val) return 'An API key is required.';
            if (val.length < 8) return 'Key looks too short — double check it.';
          },
        }),
    },
    {
      onCancel: () => {
        p.cancel(pc.red('Setup cancelled. No changes were made.'));
        process.exit(0);
      },
    }
  );

  const s = p.spinner();
  s.start('Synchronizing neural configuration...');
  await new Promise((r) => setTimeout(r, 2000));

  // Write a local .clawsome.json config
  const config = {
    agentName: project.agentName,
    projectName: project.projectName,
    provider: project.provider,
    model: project.model,
    enableRag: project.enableRag,
    gatewayPort: parseInt(project.gatewayPort ?? '3000'),
    createdAt: new Date().toISOString(),
  };
  writeFileSync(
    path.join(process.cwd(), '.clawsome.json'),
    JSON.stringify(config, null, 2)
  );

  s.stop('Configuration written to ' + pc.cyan('.clawsome.json'));

  p.outro(
    gradient(['#06b6d4', '#10b981'])(
      `\n  ✅  All systems ready!\n\n  Agent:    ${pc.bold(project.agentName)}\n  Project:  ${pc.bold(project.projectName)}\n  Model:    ${pc.bold(project.model as string)}\n\n  Run ${pc.bold(pc.cyan('clawsome start'))} to launch the gateway.\n`
    )
  );
}
