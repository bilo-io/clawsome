#!/usr/bin/env bash
# install-cli.sh — builds and globally links @clawsome/cli
# Run from the monorepo root: bun run cli:install

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLI_DIR="$SCRIPT_DIR/apps/cli"

echo ""
echo "🐾  Clawsome CLI — Global Install"
echo "──────────────────────────────────"

# 1. Install deps
echo "📦  Installing dependencies..."
cd "$CLI_DIR"
bun install

# 2. Build
echo "🔨  Building..."
bun run build

# 3. Link globally
echo "🔗  Linking 'clawsome' globally..."
bun link

echo ""
echo "✅  Done! Run 'clawsome --help' to verify."
echo ""
