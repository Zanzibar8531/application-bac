-- BacMaster : relance automatique des rappels toutes les 10 minutes
-- 1) Remplace TON_SECRET par la même valeur que le secret CRON_SECRET (Edge Functions -> Secrets).
-- 2) SQL Editor -> Run. Le nom de la tâche est fixe : relancer ce script la met à jour, sans doublon.

-- Supprime d'anciennes tâches de rappel (sans erreur si elles n'existent pas)
do $$ declare r record; begin
  for r in select jobid from cron.job where command ilike '%functions/v1/%' loop perform cron.unschedule(r.jobid); end loop;
end $$;

select cron.schedule('bacmaster-reminders', '*/10 * * * *', $job$
  select net.http_post(
    url := 'https://hdctgzziacsblieqhzdc.supabase.co/functions/v1/quick-processor',
    headers := jsonb_build_object('x-cron-secret', 'TON_SECRET'),
    body := '{}'::jsonb
  );
$job$);

-- Vérification : doit afficher une seule ligne « bacmaster-reminders »
select jobid, jobname, schedule, active from cron.job;
