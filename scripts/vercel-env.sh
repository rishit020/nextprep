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
#
# `vercel link` REWRITES .env.local with a VERCEL_OIDC_TOKEN, discarding
# whatever was in it. Back the file up first and merge our keys back on top of
# whatever Vercel wrote, or linking silently destroys every secret in it.
if [ ! -d .vercel ]; then
  backup="${ENV_FILE}.backup.$$"
  cp "$ENV_FILE" "$backup"
  echo "==> Backed up $ENV_FILE to $backup"
  echo "==> Linking this directory to a Vercel project"
  vercel link
  if ! cmp -s "$ENV_FILE" "$backup"; then
    echo "==> vercel link rewrote $ENV_FILE — restoring your values"
    # Keep anything Vercel added that we did not already have.
    added=$(grep -E '^VERCEL_' "$ENV_FILE" 2>/dev/null || true)
    cp "$backup" "$ENV_FILE"
    if [ -n "$added" ]; then
      printf '\n# --- written by `vercel link`, leave as is ---\n%s\n' "$added" >> "$ENV_FILE"
    fi
  fi
  rm -f "$backup"
fi

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
