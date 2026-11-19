-- ITIHASAM: online class leaderboard
-- Run once in Supabase → SQL Editor (project ebmjiebcbyrobaxntgfa).
--
-- Security model
--  • The table has RLS enabled and NO policies, so the public (anon) key can
--    never read or write it directly.
--  • Browsers only call two SECURITY DEFINER functions:
--      submit_score(...)      — create/update your own row; each row is
--                               protected by a per-device secret (stored hashed)
--      class_leaderboard(code) — read the ranking of ONE class code
--  • Secrets are never returned. Scores are self-reported by the browser, so
--    treat the board as friendly competition, not tamper-proof grading.

create table if not exists public.leaderboard_scores (
  id          uuid primary key,
  secret_hash text not null,
  class_code  text not null check (class_code ~ '^[A-Z0-9-]{3,20}$'),
  name        text not null check (char_length(name) between 1 and 24),
  points      integer not null default 0 check (points between 0 and 100000),
  level       integer not null default 1 check (level between 1 and 5),
  stamps      integer not null default 0 check (stamps between 0 and 28),
  streak      integer not null default 0 check (streak between 0 and 3650),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.leaderboard_scores enable row level security;
revoke all on table public.leaderboard_scores from anon, authenticated;

create index if not exists leaderboard_scores_class_points_idx
  on public.leaderboard_scores (class_code, points desc);

-- Create or update your own score row
create or replace function public.submit_score(
  p_id uuid,
  p_secret text,
  p_class text,
  p_name text,
  p_points integer,
  p_level integer,
  p_stamps integer,
  p_streak integer
) returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_hash text := encode(sha256(convert_to(coalesce(p_secret, ''), 'UTF8')), 'hex');
  v_existing text;
begin
  if p_secret is null or char_length(p_secret) < 24 then
    raise exception 'invalid secret';
  end if;

  select secret_hash into v_existing from public.leaderboard_scores where id = p_id;

  if v_existing is null then
    insert into public.leaderboard_scores (id, secret_hash, class_code, name, points, level, stamps, streak)
    values (p_id, v_hash, upper(trim(p_class)), trim(p_name), p_points, p_level, p_stamps, p_streak);
  elsif v_existing = v_hash then
    update public.leaderboard_scores
       set class_code = upper(trim(p_class)),
           name       = trim(p_name),
           points     = p_points,
           level      = p_level,
           stamps     = p_stamps,
           streak     = p_streak,
           updated_at = now()
     where id = p_id;
  else
    raise exception 'not allowed';
  end if;
end;
$$;

-- Remove your own row (when a student leaves a class)
create or replace function public.remove_score(p_id uuid, p_secret text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  delete from public.leaderboard_scores
   where id = p_id
     and secret_hash = encode(sha256(convert_to(coalesce(p_secret, ''), 'UTF8')), 'hex');
end;
$$;

-- Ranking for one class code (no secrets, no ids)
create or replace function public.class_leaderboard(p_class text)
returns table (name text, points integer, level integer, stamps integer, streak integer, updated_at timestamptz)
language sql
stable
security definer
set search_path = public
as $$
  select s.name, s.points, s.level, s.stamps, s.streak, s.updated_at
    from public.leaderboard_scores s
   where s.class_code = upper(trim(p_class))
   order by s.points desc, s.stamps desc, s.updated_at asc
   limit 100;
$$;

revoke all on function public.submit_score(uuid, text, text, text, integer, integer, integer, integer) from public;
revoke all on function public.remove_score(uuid, text) from public;
revoke all on function public.class_leaderboard(text) from public;
grant execute on function public.submit_score(uuid, text, text, text, integer, integer, integer, integer) to anon, authenticated;
grant execute on function public.remove_score(uuid, text) to anon, authenticated;
grant execute on function public.class_leaderboard(text) to anon, authenticated;
