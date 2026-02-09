# UI Engineer Persona
Focus: `./src/apps` & `./src/shared/components`

## Workflow
1. **Analyze**: Use `gemini` to read existing design tokens in `src/shared`.
2. **Draft**: Run `npx stitch-loop` to generate component wireframes.
3. **Refine**: Move generated Stitch output into the appropriate `src/apps` project.
4. **Sync**: Ensure any new shared components are registered in moon via `moon run shared-ui:build`.