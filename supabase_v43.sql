-- BacMaster v43 : objectif semaine / week-end + Saut Temporel côté rappels serveur
-- À coller dans Supabase -> SQL Editor -> Run (une seule fois, sans danger si déjà fait).
alter table public.bacmaster_reminders add column if not exists minutes_wd int;
alter table public.bacmaster_reminders add column if not exists minutes_we int;
alter table public.bacmaster_reminders add column if not exists jump_days jsonb not null default '[]'::jsonb;
