// Configuration publique Supabase de Bac Master. La clé publishable peut être exposée dans le navigateur.
window.BACMASTER_SUPABASE_CONFIG = {
  url: 'https://hdctgzziacsblieqhzdc.supabase.co',
  publishableKey: 'sb_publishable_dY1yFGioUwLz1VMG45WEGg_K4q-Kane',
  // Clé PUBLIQUE des notifications push (voir GUIDE_NOTIFICATIONS.md). Vide = rappels seulement quand l'appli est ouverte.
  vapidPublicKey: 'BGw7DndwkU3UssfISpUTC5129RuKnbucQXCye3JH2b7OsLafQXKC5eeAo3phlNUgnYrBt0ngo6OJN1qEt6WI-FA',
  reminderFunction: 'quick-processor'   // nom (slug) réel de la fonction dans l'URL Supabase
};
