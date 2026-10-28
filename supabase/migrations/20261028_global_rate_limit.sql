-- Global rate limiter shared by every server instance.
-- In-memory limits reset on each serverless instance, so they cannot stop bots on Vercel.
-- Run this once in Supabase (SQL editor) for project "ghooomo".
create table if not exists public.rate_hits (
  key text not null,
  at timestamptz not null default now()
);
create index if not exists rate_hits_key_at_idx on public.rate_hits (key, at desc);
alter table public.rate_hits enable row level security;
revoke all on public.rate_hits from anon, authenticated;

-- Records a hit and returns true when the key is over its limit for the window.
create or replace function public.hit_rate_limit(p_key text, p_limit int, p_window_seconds int)
returns boolean
language plpgsql security definer set search_path = public as $$
declare n int;
begin
  if p_key is null or length(p_key) > 200 then return true; end if;
  insert into public.rate_hits(key) values (p_key);
  select count(*) into n from public.rate_hits
   where key = p_key and at > now() - make_interval(secs => p_window_seconds);
  return n > p_limit;
end $$;
revoke all on function public.hit_rate_limit(text, int, int) from public, anon, authenticated;
grant execute on function public.hit_rate_limit(text, int, int) to service_role;

-- Old hits are useless after a day.
select cron.schedule('ghooomo-rate-hits-cleanup', '15 * * * *', $$delete from public.rate_hits where at < now() - interval '1 day'$$);
