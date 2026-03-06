#!/usr/bin/env bun
// apps/gateway/src/index.ts
import { Command } from 'commander';
import figlet from 'figlet';
import gradient from 'gradient-string';
import * as p from '@clack/prompts';
import pc from 'picocolors';
import { startServer } from './server';
import { DEFAULT_PORT } from '@antigravity/core';
import { CLAWSOME_ASCII, clawsomeGradient, clearConsole } from '../../cli/src/utils/branding';

const program = new Command();

const PROVIDERS = {
  openai: {
    label: 'OpenAI',
    models: [
      { value: 'o1-preview', label: 'o1-preview' },
      { value: 'o1-mini', label: 'o1-mini' },
      { value: 'gpt-4o', label: 'GPT-4o (Omni)' },
      { value: 'gpt-4o-mini', label: 'GPT-4o-mini' },
      { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
      { value: 'gpt-4', label: 'GPT-4' },
      { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
      { value: 'text-davinci-003', label: 'Text Davinci 003' },
      { value: 'gpt-4-32k', label: 'GPT-4 32k' },
      { value: 'gpt-4-0125-preview', label: 'GPT-4 0125 Preview' },
    ]
  },
  anthropic: {
    label: 'Anthropic',
    models: [
      { value: 'claude-3-5-sonnet-20240620', label: 'Claude 3.5 Sonnet' },
      { value: 'claude-3-opus-20240229', label: 'Claude 3 Opus' },
      { value: 'claude-3-sonnet-20240229', label: 'Claude 3 Sonnet' },
      { value: 'claude-3-haiku-20240307', label: 'Claude 3 Haiku' },
      { value: 'claude-2.1', label: 'Claude 2.1' },
      { value: 'claude-2.0', label: 'Claude 2.0' },
      { value: 'claude-instant-1.2', label: 'Claude Instant 1.2' },
      { value: 'claude-3-5-sonnet-latest', label: 'Claude 3.5 Sonnet (Latest)' },
      { value: 'claude-3-opus-latest', label: 'Claude 3 Opus (Latest)' },
      { value: 'claude-3-haiku-latest', label: 'Claude 3 Haiku (Latest)' },
    ]
  },
  gemini: {
    label: 'Google Gemini',
    models: [
      { value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro' },
      { value: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash' },
      { value: 'gemini-1.0-pro', label: 'Gemini 1.0 Pro' },
      { value: 'gemini-pro-vision', label: 'Gemini Pro Vision' },
      { value: 'gemini-ultra', label: 'Gemini Ultra (Vertex)' },
      { value: 'gemini-1.5-pro-latest', label: 'Gemini 1.5 Pro (Latest)' },
      { value: 'gemini-1.5-flash-8b', label: 'Gemini 1.5 Flash 8B' },
      { value: 'text-bison-001', label: 'PaLM 2 Text' },
      { value: 'chat-bison-001', label: 'PaLM 2 Chat' },
      { value: 'code-bison-001', label: 'PaLM 2 Code' },
    ]
  },
  meta: {
    label: 'Meta (Llama)',
    models: [
      { value: 'llama-3.1-405b', label: 'Llama 3.1 405B' },
      { value: 'llama-3.1-70b', label: 'Llama 3.1 70B' },
      { value: 'llama-3.1-8b', label: 'Llama 3.1 8B' },
      { value: 'llama-3-70b', label: 'Llama 3 70B' },
      { value: 'llama-3-8b', label: 'Llama 3 8B' },
      { value: 'llama-2-70b', label: 'Llama 2 70B' },
      { value: 'codellama-34b', label: 'Code Llama 34B' },
      { value: 'llama-3.2-11b', label: 'Llama 3.2 11B (Vision)' },
      { value: 'llama-guard-3', label: 'Llama Guard 3' },
      { value: 'llama-3.2-1b', label: 'Llama 3.2 1B (Mobile)' },
    ]
  },
  mistral: {
    label: 'Mistral AI',
    models: [
      { value: 'mistral-large-latest', label: 'Mistral Large' },
      { value: 'mistral-medium-latest', label: 'Mistral Medium' },
      { value: 'mistral-small-latest', label: 'Mistral Small' },
      { value: 'codestral-latest', label: 'Codestral' },
      { value: 'pixtral-12b', label: 'Pixtral 12B' },
      { value: 'open-mistral-7b', label: 'Mistral 7B' },
      { value: 'open-mixtral-8x7b', label: 'Mixtral 8x7B' },
      { value: 'open-mixtral-8x22b', label: 'Mixtral 8x22B' },
      { value: 'mistral-embed', label: 'Mistral Embed' },
      { value: 'mistral-nemo', label: 'Mistral NeMo' },
    ]
  },
  groq: {
    label: 'Groq (LPUs)',
    models: [
      { value: 'llama-3.1-70b-versatile', label: 'Llama 3.1 70B (Versatile)' },
      { value: 'llama-3.1-8b-instant', label: 'Llama 3.1 8B (Instant)' },
      { value: 'llama3-70b-8192', label: 'Llama 3 70B' },
      { value: 'llama3-8b-8192', label: 'Llama 3 8B' },
      { value: 'mixtral-8x7b-32768', label: 'Mixtral 8x7B' },
      { value: 'gemma-7b-it', label: 'Gemma 7B' },
      { value: 'gemma2-9b-it', label: 'Gemma 2 9B' },
      { value: 'llava-v1.5-7b-4096-preview', label: 'LLaVA 1.5 7B' },
      { value: 'whisper-large-v3', label: 'Whisper Large v3' },
      { value: 'distil-whisper-large-v3-en', label: 'Distil Whisper Large' },
    ]
  },
  perplexity: {
    label: 'Perplexity',
    models: [
      { value: 'llama-3-sonar-large-32k-online', label: 'Sonar Large Online' },
      { value: 'llama-3-sonar-small-32k-online', label: 'Sonar Small Online' },
      { value: 'llama-3-sonar-large-32k-chat', label: 'Sonar Large Chat' },
      { value: 'llama-3-sonar-small-32k-chat', label: 'Sonar Small Chat' },
      { value: 'mixtral-8x7b-instruct', label: 'Mixtral 8x7B Instruct' },
      { value: 'mistral-7b-instruct', label: 'Mistral 7B Instruct' },
      { value: 'sonar-reasoning', label: 'Sonar Reasoning' },
      { value: 'sonar-reasoning-pro', label: 'Sonar Reasoning Pro' },
      { value: 'pplx-7b-online', label: 'PPLX 7B Online' },
      { value: 'pplx-70b-online', label: 'PPLX 70B Online' },
    ]
  },
  deepseek: {
    label: 'DeepSeek',
    models: [
      { value: 'deepseek-chat', label: 'DeepSeek Chat' },
      { value: 'deepseek-coder', label: 'DeepSeek Coder' },
      { value: 'deepseek-v2', label: 'DeepSeek V2' },
      { value: 'deepseek-v2.5', label: 'DeepSeek V2.5' },
      { value: 'deepseek-v3', label: 'DeepSeek V3 (Beta)' },
      { value: 'deepseek-coder-v2', label: 'DeepSeek Coder V2' },
      { value: 'deepseek-llm-67b-chat', label: 'DeepSeek 67B' },
      { value: 'deepseek-math-7b-rl', label: 'DeepSeek Math' },
      { value: 'deepseek-moe-16b-chat', label: 'DeepSeek MoE 16B' },
      { value: 'deepseek-coder-33b-instruct', label: 'DeepSeek Coder 33B' },
    ]
  },
};

const formatMessage = (msg: string) => {
  return pc.bold(pc.cyan(`● ${msg}`));
};

const displayBranding = () => {
  clearConsole();
  console.log(clawsomeGradient.multiline(CLAWSOME_ASCII));
};

program
  .name('clawsome')
  .description('Clawsome Gateway CLI')
  .version('0.1.0');

program
  .command('setup')
  .description('Initialize gateway configuration')
  .action(async () => {
    displayBranding();

    p.intro(clawsomeGradient(' Welcome to Clawsome Gateway Setup '));

    const project = await p.group(
      {
        agentName: () =>
          p.text({
            message: formatMessage('What would you like to call me? (Default Agent Name)'),
            placeholder: 'Aura',
            validate: (value) => {
              if (!value) return 'Please enter a name for your agent';
            },
          }),
        projectName: () =>
          p.text({
            message: formatMessage('What is your project name?'),
            placeholder: 'nightclaw-monolith',
            validate: (value) => {
              if (!value) return 'Please enter a name';
              if (value.length < 3) return 'Name must be at least 3 characters';
            },
          }),
        provider: () =>
          p.select({
            message: formatMessage('Which LLM provider would you like to use?'),
            options: Object.entries(PROVIDERS).map(([value, info]) => ({
              value,
              label: info.label,
            })),
          }),
        model: ({ results }) =>
          p.select({
            message: formatMessage(`Which model from ${PROVIDERS[results.provider as keyof typeof PROVIDERS].label}?`),
            options: PROVIDERS[results.provider as keyof typeof PROVIDERS].models,
          }),
        rag: () =>
          p.confirm({
            message: formatMessage('Enable local RAG (Vector Database)?'),
            initialValue: true,
          }),
        apiKey: () =>
          p.password({
            message: formatMessage('Enter your API Key'),
            validate: (value) => {
              if (!value) return 'API Key is required';
            },
          }),
      },
      {
        onCancel: () => {
          p.cancel('Setup cancelled. See you later!');
          process.exit(0);
        },
      }
    );

    const s = p.spinner();
    s.start('Initializing gateway neural links...');
    
    // Simulate complex validation and setup delay
    await new Promise((resolve) => setTimeout(resolve, 2500));
    
    s.stop('Neural synchronization complete.');

    p.outro(
      gradient(['#06b6d4', '#10b981'])(
        `Setup complete! Your gateway for "${project.projectName}" is ready.\nDefault active agent: ${pc.bold(project.agentName)}`
      )
    );
  });

program
  .command('start')
  .description('Start the gateway server')
  .option('-p, --port <number>', 'port to listen on', DEFAULT_PORT.toString())
  .action((options) => {
    const port = parseInt(options.port);
    startServer(port);
  });

program
  .command('dev')
  .description('Start the gateway server in dev mode')
  .action(() => {
    console.log('Starting in dev mode...');
    startServer();
  });

program.parse();
