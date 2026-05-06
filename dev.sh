#!/usr/bin/env bash
set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Check for required dev tools
if ! command -v node &>/dev/null; then
  echo "Warning: Node.js is not installed. Please install it from https://nodejs.org"
  exit 1
fi

if ! command -v pnpm &>/dev/null; then
  echo "pnpm is not installed."
  read -r -p "Install pnpm now via 'npm install -g pnpm'? [y/N] " answer
  if [[ "$answer" =~ ^[Yy]$ ]]; then
    npm install -g pnpm
  else
    echo "Skipping. Install pnpm manually: https://pnpm.io/installation"
    exit 1
  fi
fi

# Check for required .env files
if [ ! -f "$ROOT_DIR/apps/backend/.env" ]; then
  echo "Missing apps/backend/.env — copy from .env.example or create it"
  exit 1
fi

if [ ! -f "$ROOT_DIR/apps/frontend/.env" ]; then
  echo "Missing apps/frontend/.env — copy from .env.example or create it"
  exit 1
fi

cd "$ROOT_DIR"

# Ensure Prisma client is generated
pnpm --filter @starshield/backend prisma:generate

pnpm dev
