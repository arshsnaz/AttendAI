import { createClient } from '@supabase/supabase-js';

// Read from Vite environment variables or localStorage override with defaults
const envUrl = import.meta.env.VITE_SUPABASE_URL || '';
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const storedUrl = typeof window !== 'undefined' ? localStorage.getItem('attendai_supabase_url') || '' : '';
const storedKey = typeof window !== 'undefined' ? localStorage.getItem('attendai_supabase_key') || '' : '';

export const SUPABASE_URL = storedUrl || envUrl || 'https://qqnhpxpzvabafdyytnq.supabase.co';
export const SUPABASE_ANON_KEY = storedKey || envKey || 'sb_publishable_34E0dX43DWMckO56qB1phA_PlzUX4DV';

export const isSupabaseConfigured = (): boolean => {
  return (
    !!SUPABASE_URL &&
    SUPABASE_URL.startsWith('https://') &&
    !!SUPABASE_ANON_KEY &&
    SUPABASE_ANON_KEY.length > 10
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
