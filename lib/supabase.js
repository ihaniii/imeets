import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://vctinilepcrueekwaaxr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjdGluaWxlcGNydWVla3dhYXhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5NzQwNzUsImV4cCI6MjA5MzU1MDA3NX0.yzn1ITJ7YjHKr00xqYAxKtf7_HjlNpVsBrbUNZHu77A'
);

