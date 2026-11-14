# Ivied

Ivied is a college-planning assistant for high school students. This repository currently contains the public waitlist page for [ivied.app](https://ivied.app).

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Copy `.env.example` to `.env.local` and configure:

- `SUPABASE_URL` and `SUPABASE_ANON_KEY` for waitlist storage.
- `RESEND_API_KEY`, `WAITLIST_NOTIFY_TO`, and `WAITLIST_NOTIFY_FROM` for optional signup notifications.
- `SUPABASE_SERVICE_ROLE_KEY` only when using `scripts/waitlist.sh --list` locally.

The app still accepts signups when Resend is not configured. It reports an error rather than pretending a signup worked when Supabase is unavailable.

## Checks

```bash
npm run lint
npm run build
```
