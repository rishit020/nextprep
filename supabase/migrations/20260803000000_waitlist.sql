-- NextPrep waitlist signups.
-- Run in the Supabase SQL editor, or via `supabase db push`.

create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  created_at timestamptz not null default now()
);

-- Case-insensitive uniqueness: Student@X.com and student@x.com are one person.
create unique index if not exists waitlist_signups_email_key
  on public.waitlist_signups (lower(email));

alter table public.waitlist_signups enable row level security;

-- The anon key may only INSERT. No select/update/delete policy exists, so the
-- signup list cannot be read back with the public key even if it leaks.
drop policy if exists "anon can join waitlist" on public.waitlist_signups;
create policy "anon can join waitlist"
  on public.waitlist_signups
  for insert
  to anon
  with check (true);
