import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.REACT_APP_SUPABASE_URL ||
  'https://fxqggdbkekpuxqzljizt.supabase.co';

const supabaseAnonKey =
  process.env.REACT_APP_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4cWdnZGJrZWtwdXhxemxqaXp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxMjc1MTMsImV4cCI6MjA5MzcwMzUxM30.7txp3V3MTAXLQ6vuqZZw0_nwoId-dw4RHHGL4ZTQMpo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);