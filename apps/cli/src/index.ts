#!/usr/bin/env node
// apps/cli/src/index.ts

import { Command } from 'commander';
import { setup } from './commands/setup.js';
import { start } from './commands/start.js';
import { stop } from './commands/stop.js';
import { doctor } from './commands/doctor.js';
import { displayBrandingSync } from './utils/branding.js';
import pc from 'picocolors';

const program = new Command();

// ─── Programme Meta ────────────────────────────────────────────────────────────
program
  .name('clawsome')
  .description(pc.cyan('Clawsome OS — Neural Agent Orchestration Platform'))
  .version('0.1.0', '-v, --version', 'Print the current version')
  .helpOption('-h, --help', 'Display help for a command')
  .addHelpText('beforeAll', () => {
    displayBrandingSync();
    return '';
  });

// ─── clawsome setup ───────────────────────────────────────────────────────────
program
  .command('setup')
  .description('Run the interactive setup wizard to initialise Clawsome for your project')
  .action(setup);

// ─── clawsome start ───────────────────────────────────────────────────────────
program
  .command('start')
  .description('Start the Clawsome Gateway and open the Dashboard')
  .option('-p, --port <number>', 'Port to run the gateway on', '3000')
  .option('--no-open', 'Do not automatically open the Dashboard in the browser')
  .action(start);

// ─── clawsome stop ────────────────────────────────────────────────────────────
program
  .command('stop')
  .description('Stop the running Clawsome Gateway process')
  .action(stop);

// ─── clawsome doctor ──────────────────────────────────────────────────────────
program
  .command('doctor')
  .description('Diagnose your Clawsome environment and report issues')
  .action(doctor);

// ─── Parse ────────────────────────────────────────────────────────────────────
program.parse(process.argv);
