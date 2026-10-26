-- Bac Master : synchronisation de la progression personnelle entre appareils.
-- À exécuter UNE FOIS dans Supabase > SQL Editor.
-- Utilise la table user_data existante ; chaque compte ne peut lire/écrire que sa propre ligne.

alter table public.user_data enable row level security;

grant select, insert, update, delete on public.user_data to authenticated;

drop policy if exists "Chaque utilisateur voit ses données" on public.user_data;
drop policy if exists "BacMaster users manage own progress" on public.user_data;
create policy "BacMaster users manage own progress"
on public.user_data
for all
to authenticated
using (user_id = (select auth.uid())::text)
with check (user_id = (select auth.uid())::text);

-- Active les notifications temps réel sur user_data, sans ajouter la table deux fois.
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'user_data'
  ) then
    alter publication supabase_realtime add table public.user_data;
  end if;
end $$;
