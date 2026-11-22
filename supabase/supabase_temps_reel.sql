-- BacMaster — synchronisation en vrai temps réel (un chapitre = une ligne)
-- À coller UNE FOIS dans Supabase > SQL Editor > Run. Sans danger si relancé.

create table if not exists public.bacmaster_chapters (
  id          text primary key,                 -- 'Matière::Chapitre'
  subject     text not null,
  chapter     text not null,
  content     jsonb not null default '{}'::jsonb,
  deleted     boolean not null default false,
  updated_at  timestamptz not null default now(),
  updated_by  uuid
);
create index if not exists bacmaster_chapters_updated_idx on public.bacmaster_chapters (updated_at);

-- Qui peut modifier ? (même logique que les rôles existants : admin / editor)
create or replace function public.bm_can_edit() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.bacmaster_profiles p
                 where p.user_id = auth.uid() and p.role in ('admin','editor'));
$$;
grant execute on function public.bm_can_edit() to authenticated;

alter table public.bacmaster_chapters enable row level security;
drop policy if exists bm_chapters_read   on public.bacmaster_chapters;
drop policy if exists bm_chapters_insert on public.bacmaster_chapters;
drop policy if exists bm_chapters_update on public.bacmaster_chapters;
create policy bm_chapters_read   on public.bacmaster_chapters for select to authenticated using (true);
create policy bm_chapters_insert on public.bacmaster_chapters for insert to authenticated with check (public.bm_can_edit());
create policy bm_chapters_update on public.bacmaster_chapters for update to authenticated using (public.bm_can_edit()) with check (public.bm_can_edit());

-- Heure et auteur posés par le serveur (évite les décalages d'horloge entre appareils)
create or replace function public.bm_chapters_touch() returns trigger
language plpgsql as $$
begin
  new.updated_at := clock_timestamp();
  new.updated_by := auth.uid();
  return new;
end $$;
drop trigger if exists bm_chapters_touch on public.bacmaster_chapters;
create trigger bm_chapters_touch before insert or update on public.bacmaster_chapters
  for each row execute function public.bm_chapters_touch();

-- Active le temps réel (cours + progression personnelle)
do $$ begin
  if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='bacmaster_chapters') then
    alter publication supabase_realtime add table public.bacmaster_chapters;
  end if;
  if exists (select 1 from information_schema.tables where table_schema='public' and table_name='user_data')
     and not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='user_data') then
    alter publication supabase_realtime add table public.user_data;
  end if;
end $$;
