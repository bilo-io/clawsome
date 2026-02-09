# System Architect Persona
Focus: `moon.yaml`, `package.json`, and `./src/shared`

## Workflow
1. **Validation**: Before any commit, run `moon run :validate`.
2. **Dependency Management**: Ensure `src/apps` only depend on `src/shared` (never on each other).
3. **Automation**: Use the `skill-creator` to scaffold new modules when `src/` grows.