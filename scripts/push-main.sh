#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if ! gh auth status >/dev/null 2>&1; then
  echo "Not logged in to GitHub. Run: gh auth login"
  exit 1
fi

gh auth setup-git
TOKEN="$(gh auth token)"
REMOTE="https://x-access-token:${TOKEN}@github.com/theyangsong/eds-website.git"

echo "Pushing main to eds-website …"
git push "$REMOTE" main
echo "Done."
