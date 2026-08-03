#!/usr/bin/env bash
# How many people are on the waitlist, and (with --list) who.
#
#   ./scripts/waitlist.sh          -> count only, uses the public anon key
#   ./scripts/waitlist.sh --list   -> full list, needs SUPABASE_SERVICE_ROLE_KEY
set -euo pipefail

cd "$(dirname "$0")/.."
[ -f .env.local ] || { echo "No .env.local found." >&2; exit 1; }
# shellcheck disable=SC1091
set -a; source .env.local; set +a

if [ "${1:-}" = "--list" ]; then
  if [ -z "${SUPABASE_SERVICE_ROLE_KEY:-}" ]; then
    echo "Set SUPABASE_SERVICE_ROLE_KEY in .env.local to read addresses." >&2
    echo "The anon key deliberately cannot read them back." >&2
    exit 1
  fi
  curl -s "$SUPABASE_URL/rest/v1/waitlist_signups?select=email,created_at&order=created_at.desc" \
    -H "apikey: $SUPABASE_SERVICE_ROLE_KEY" \
    -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY"
  echo
  exit 0
fi

COUNT=$(curl -s -X POST "$SUPABASE_URL/rest/v1/rpc/waitlist_count" \
  -H "apikey: $SUPABASE_ANON_KEY" \
  -H "Authorization: Bearer $SUPABASE_ANON_KEY" \
  -H "Content-Type: application/json" -d '{}')

echo "Unistep waitlist: ${COUNT} signup(s)"
