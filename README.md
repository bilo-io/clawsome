# Clawsome OS

> **Neural Agent Orchestration Platform** — a decentralised AI swarm workspace.

## Monorepo Structure

```
clawsome/
├── apps/
│   ├── cli/           # @clawsome/cli    — Clawsome command-line interface
│   ├── dashboard/     # @clawsome/dashboard — Nightclaw OS web dashboard (port 3000)
│   ├── docs/          # @clawsome/docs   — Developer documentation (port 3002)
│   ├── gateway/       # @clawsome/gateway — AI gateway server
│   └── website/       # @clawsome/website — Marketing website (port 3001)
├── packages/
│   └── ui/            # @clawsome/ui     — Shared component library
└── bunfig.toml
```

---

## Prerequisites

| Tool | Min Version | Install |
|------|-------------|---------|
| Bun | 1.x | [bun.sh](https://bun.sh) |
| Node.js | 20.x | [nodejs.org](https://nodejs.org) _(required by some tooling)_ |

---

## Getting Started

### 1. Clone & install

```bash
git clone https://github.com/bilo-io/clawsome.git
cd clawsome
bun install
```

### 2. Start the apps

```bash
# Dashboard (http://localhost:3000)
cd apps/dashboard && bun dev

# Website  (http://localhost:3001)
cd apps/website  && bun dev

# Docs     (http://localhost:3002)
cd apps/docs     && bun dev

# UI Library showcase
cd packages/ui   && bun dev
```

Or use moon to run all at once:

```bash
moon run :dev
```

---

## CLI (`clawsome`)

The `@clawsome/cli` package provides the `clawsome` command for managing your local gateway and stepping through the setup wizard.

### Local development setup

```bash
# 1. Navigate to the CLI package
cd apps/cli

# 2. Install dependencies (already done if you ran bun install at root)
bun install

# 3. Run directly without a build step
bun run src/index.ts --help

# 4. Or link it globally for the real `clawsome` command experience:
bun link
clawsome --help
```

> After `bun link`, the `clawsome` binary resolves to the built `dist/index.js`.
> To rebuild after changes: `bun run build` inside `apps/cli`.

### Available commands

| Command | Description |
|---------|-------------|
| `clawsome --help` / `-h` | Display help for all commands |
| `clawsome --version` / `-v` | Print the current CLI version |
| `clawsome setup` | Interactive wizard — configure agent, LLM provider, API key, and ports. Writes `.clawsome.json`. |
| `clawsome start` | Starts the gateway server, logs the gateway and dashboard URLs, and opens the dashboard in your browser |
| `clawsome start --port 4000` | Start gateway on a custom port |
| `clawsome start --no-open` | Start gateway without auto-opening the browser |
| `clawsome stop` | Gracefully stops the gateway process (reads the PID from `.clawsome.pid`) |
| `clawsome doctor` | Diagnoses your environment — checks Node, pnpm, Bun, workspace files, Git, and TypeScript |

### Typical dev workflow

```bash
# First time — run setup wizard
clawsome setup

# Day-to-day
clawsome start
# → Gateway running at http://localhost:3000
# → Dashboard at  http://localhost:3000 (opens automatically)

# When done
clawsome stop

# Something wrong?
clawsome doctor
```

---

## Packages

### `@clawsome/ui`

Shared React component library. Import in any app:

```ts
import { ThemeProvider, PageHeader, AgentCard } from '@clawsome/ui';
```

Components: `PageHeader`, `SegmentedControl`, `SlideToConfirm`, `ContextAccordion`, `CodeBlock`, `SkillCard`, `AgentCard`, `PermissionToggle`, `QuickActions`, `SystemVitality`.

---

## References

- [Anthropic Skills](https://github.com/anthropics/skills/tree/main/skills)
- [Antigravity Skills](https://github.dev/rmyndharis/antigravity-skills/blob/main/skills/startup-analyst/SKILL.md)