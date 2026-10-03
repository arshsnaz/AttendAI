import { createClient } from '@supabase/supabase-js';

// Read from Vite environment variables or localStorage override
const envUrl = import.meta.env.VITE_SUPABASE_URL || '';
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const storedUrl = typeof window !== 'undefined' ? localStorage.getItem('attendai_supabase_url') || '' : '';
const storedKey = typeof window !== 'undefined' ? localStorage.getItem('attendai_supabase_key') || '' : '';

export const SUPABASE_URL = storedUrl || envUrl || 'https://your-project-id.supabase.co';
export const SUPABASE_ANON_KEY = storedKey || envKey || 'your-anon-key';

export const isSupabaseConfigured = (): boolean => {
  return (
    !!SUPABASE_URL &&
    SUPABASE_URL !== 'https://your-project-id.supabase.co' &&
    !!SUPABASE_ANON_KEY &&
    SUPABASE_ANON_KEY !== 'your-anon-key'
  );
};

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

export const saveSupabaseConfig = (url: string, key: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('attendai_supabase_url', url.trim());
    localStorage.setItem('attendai_supabase_key', key.trim());
    window.location.reload();
  }
};
