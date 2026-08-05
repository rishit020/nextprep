#!/usr/bin/env bash
#
# Push the values in .env.local to this project's Vercel environments.
#
# Reads secrets from your machine and hands them to Vercel directly. Nothing is
# printed, and .env.local stays gitignored — no secret ever reaches the repo.
#
#   ./scripts/vercel-env.sh
#
set -euo pipefail

cd "$(dirname "$0")/.."

ENV_FILE=".env.local"
# WAITLIST_NOTIFY_* are not secret, but Vercel needs them set all the same.
VARS=(SUPABASE_URL SUPABASE_ANON_KEY RESEND_API_KEY WAITLIST_NOTIFY_TO WAITLIST_NOTIFY_FROM)
TARGETS=(production preview development)

command -v vercel >/dev/null || {
  echo "vercel CLI not found. Install it with: npm i -g vercel@latest" >&2
  exit 1
}

[ -f "$ENV_FILE" ] || { echo "$ENV_FILE not found — nothing to push." >&2; exit 1; }

vercel whoami >/dev/null 2>&1 || { echo "Not logged in. Run: vercel login" >&2; exit 1; }

# Creating or attaching the Vercel project is a prerequisite for env vars.
[ -d .vercel ] || { echo "==> Linking this directory to a Vercel project"; vercel link; }

set -a
# shellcheck disable=SC1090
. "$ENV_FILE"
set +a

for name in "${VARS[@]}"; do
  value="${!name-}"
  if [ -z "$value" ]; then
    echo "  skip $name (empty in $ENV_FILE)"
    continue
  fi
  for target in "${TARGETS[@]}"; do
    # Replace rather than append: re-running must not stack duplicates.
    vercel env rm "$name" "$target" --yes >/dev/null 2>&1 || true
    printf '%s' "$value" | vercel env add "$name" "$target" >/dev/null 2>&1
  done
  echo "  set $name (${#value} chars) -> ${TARGETS[*]}"
done

echo
echo "Done. Redeploy for the new values to take effect:"
echo "  vercel --prod"
