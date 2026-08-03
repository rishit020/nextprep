-- Expose ONLY the signup count, never the list of emails.
--
-- security definer lets this run with the owner's privileges so it can read the
-- table, while the anon role still has no SELECT policy of its own. The result
-- is an aggregate: callers learn how many people signed up, never who.
create or replace function public.waitlist_count()
returns bigint
language sql
security definer
set search_path = public
as $$
  select count(*) from public.waitlist_signups;
$$;

revoke all on function public.waitlist_count() from public;
grant execute on function public.waitlist_count() to anon;
