# 🛸 Antigravity Workspace: Source-First
Managed by moon `v2.0.0-rc.2` (via proto)

## 🏗 Repository Layout
- **Global Context**: `. (Root)`
- **Core Logic**: `./src`
- **Applications**: `./src/apps` (Next.js / Frontend)
- **Shared Utilities**: `./src/shared` (Zod schemas, Types, Utils)
- **APIs**: `./src/apis` (Node.js / Express / Fastify)

## 🛠 Integrated Toolchain
- **Moon**: Run `moon run <project>:<task>` for build/test.
- **Stitch**: Use for UI loop generation within `./src/apps`.
- **Gemini CLI**: Use `gemini "@src/**/*.ts"` for deep code analysis.

## 🤖 Active Agents
- **Architect**: Lives in `./agents/architect`. Handles monorepo orchestration.
- **UI Engineer**: Lives in `./agents/ui-engineer`. Specialized in Stitch + React.
- **Backend Expert**: Lives in `./agents/backend-expert`. Focused on `./src/apis`.