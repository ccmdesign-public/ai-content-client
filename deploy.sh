#!/usr/bin/env bash
set -euo pipefail

# Navigate to project root (works from anywhere inside the repo)
REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
ENV_FILE="$(cd "$REPO_DIR/.." && pwd)/.env"

echo "=========================================="
echo "Client deploy started: $(date)"
echo "=========================================="

# Export env vars so subprocesses can access them
if [ -f "$ENV_FILE" ]; then
  set -a
  source "$ENV_FILE"
  set +a
else
  echo "WARNING: No .env file found at $ENV_FILE"
fi

cd "$REPO_DIR"

# Ensure dependencies are installed
npm install --prefer-offline 2>/dev/null || npm install

# Build for production
npm run build

echo "=========================================="
echo "Client deploy finished: $(date)"
echo "=========================================="
