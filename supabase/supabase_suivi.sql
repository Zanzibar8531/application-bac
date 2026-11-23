-- Bac Master : suivi des comptes (réservé aux administrateurs)
-- À exécuter UNE FOIS dans Supabase > SQL Editor, puis cliquer sur « Run ».
-- Ne modifie aucune table existante. Chaque compte ne peut toujours lire que SA progression ;
-- seule la fonction ci-dessous (vérifie le rôle « admin ») renvoie un résumé de tous les comptes.

-- 1) Dernière visite de chaque compte
create table if not exists public.bacmaster_visits (
  user_id text primary key,
  first_seen timestamptz not null default now(),
  last_seen  timestamptz not null default now(),
  visits     integer not null default 1
);
alter table public.bacmaster_visits enable row level security;   -- aucune policy : accès uniquement via les fonctions

-- 2) Appelée par l'appli à chaque connexion (au plus toutes les 30 min par appareil)
create or replace function public.bacmaster_touch()
returns void language sql security definer set search_path = public as $$
  insert into public.bacmaster_visits (user_id) values (auth.uid()::text)
  on conflict (user_id) do update
    set last_seen = now(), visits = public.bacmaster_visits.visits + 1;
$$;
revoke all on function public.bacmaster_touch() from public, anon;
grant execute on function public.bacmaster_touch() to authenticated;

-- 3) Résumé de tous les comptes : uniquement pour un administrateur
create or replace function public.bacmaster_admin_overview()
returns table (user_id text, last_seen timestamptz, visits integer, synced_at timestamptz,
               timelog jsonb, goal jsonb, activity jsonb)
language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from public.bacmaster_profiles p
                 where p.user_id::text = auth.uid()::text and p.role = 'admin') then
    raise exception 'Accès réservé aux administrateurs';
  end if;
  return query
    select p.user_id::text, v.last_seen, v.visits, d.updated_at::timestamptz,
           (d.data::jsonb)->'local'->'bacmaster_timelog',
           (d.data::jsonb)->'local'->'bacmaster_goal',
           (d.data::jsonb)->'local'->'bacmaster_activity'
    from public.bacmaster_profiles p
    left join public.bacmaster_visits v on v.user_id = p.user_id::text
    left join public.user_data d on d.user_id::text = p.user_id::text;
end $$;
revoke all on function public.bacmaster_admin_overview() from public, anon;
grant execute on function public.bacmaster_admin_overview() to authenticated;
