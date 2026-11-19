-- ITIHASAM: stop submit_score errors from leaking row data.
-- Run once in Supabase → SQL Editor, after 20261119000000_online_leaderboard.sql.
--
-- Before: a value that broke a table CHECK constraint (e.g. 999999 points)
-- produced Postgres error 23514, whose "details" field echoes the whole failing
-- row — including secret_hash. Now every input is validated up front with a
-- short, generic message, and any unexpected database error is replaced by a
-- generic one, so no row contents can ever reach the browser.

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
  v_class text := upper(trim(coalesce(p_class, '')));
  v_name text := trim(coalesce(p_name, ''));
  v_hash text;
  v_existing text;
begin
  -- 1. Validate everything before touching the table
  if p_id is null then
    raise exception 'invalid score' using errcode = '22023';
  end if;
  if p_secret is null or char_length(p_secret) < 24 or char_length(p_secret) > 200 then
    raise exception 'invalid secret' using errcode = '22023';
  end if;
  if v_class !~ '^[A-Z0-9-]{3,20}$' then
    raise exception 'invalid class code' using errcode = '22023';
  end if;
  if char_length(v_name) not between 1 and 24 then
    raise exception 'invalid name' using errcode = '22023';
  end if;
  if p_points is null or p_points not between 0 and 100000
     or p_level is null or p_level not between 1 and 5
     or p_stamps is null or p_stamps not between 0 and 28
     or p_streak is null or p_streak not between 0 and 3650 then
    raise exception 'invalid score' using errcode = '22023';
  end if;

  v_hash := encode(sha256(convert_to(p_secret, 'UTF8')), 'hex');

  -- 2. Insert or update; never let a raw database error (which could echo the
  --    row) escape to the caller
  begin
    select secret_hash into v_existing from public.leaderboard_scores where id = p_id;

    if v_existing is null then
      insert into public.leaderboard_scores (id, secret_hash, class_code, name, points, level, stamps, streak)
      values (p_id, v_hash, v_class, v_name, p_points, p_level, p_stamps, p_streak);
    elsif v_existing = v_hash then
      update public.leaderboard_scores
         set class_code = v_class,
             name       = v_name,
             points     = p_points,
             level      = p_level,
             stamps     = p_stamps,
             streak     = p_streak,
             updated_at = now()
       where id = p_id;
    else
      raise exception 'not allowed' using errcode = '42501';
    end if;
  exception
    when insufficient_privilege then
      raise exception 'not allowed' using errcode = '42501';
    when others then
      raise exception 'could not save score' using errcode = 'P0001';
  end;
end;
$$;

revoke all on function public.submit_score(uuid, text, text, text, integer, integer, integer, integer) from public;
grant execute on function public.submit_score(uuid, text, text, text, integer, integer, integer, integer) to anon, authenticated;
