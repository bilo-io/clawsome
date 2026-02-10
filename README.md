- [Anthropic Skills](https://github.com/anthropics/skills/tree/main/skills)
- [Antigravity Skills](https://github.dev/rmyndharis/antigravity-skills/blob/main/skills/startup-analyst/SKILL.md)
```
antigravity-template/
├── .moon/                    # moon workspace config (root only)
├── skills/                   # Reusable AI capabilities
│   └── skill-creator/
│       ├── skill.json        # Metadata for the skill
│       └── index.ts          # Logic for creating new skills
├── agents/                   # Definitions for your AG instances
│   └── architect/
│       └── config.yaml       # Specific agent personas
├── AGENTS.md                 # Registry and documentation for your agents
├── moon.yml                  # moon tasks (build, lint, sync-agents)
├── package.json              # Template dependencies
└── tsconfig.json             # TypeScript configuration
```