import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Database, CheckCircle2, AlertCircle, ExternalLink, Sparkles } from 'lucide-react';
import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured, saveSupabaseConfig } from '@/lib/supabase';
import { toast } from 'sonner';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SupabaseConnectModal = ({ open, onOpenChange }: Props) => {
  const [url, setUrl] = useState(isSupabaseConfigured() ? SUPABASE_URL : '');
  const [anonKey, setAnonKey] = useState(isSupabaseConfigured() ? SUPABASE_ANON_KEY : '');
  const [testing, setTesting] = useState(false);

  const handleSave = () => {
    if (!url || !anonKey) {
      toast.error('Please enter both Supabase URL and Anon Key');
      return;
    }

    if (!url.startsWith('https://')) {
      toast.error('Supabase URL must start with https://');
      return;
    }

    setTesting(true);
    try {
      saveSupabaseConfig(url, anonKey);
      toast.success('Supabase database connected successfully! Reloading...');
      onOpenChange(false);
    } catch (e) {
      toast.error('Failed to save Supabase connection settings.');
    } finally {
      setTesting(false);
    }
  };

  const handleClear = () => {
    saveSupabaseConfig('', '');
    toast.info('Cleared Supabase credentials.');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-2xl border-[#d2e1e5] p-6">
        <DialogHeader>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold font-display text-[#0D2237]">
                Connect Supabase Database
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                Link your cloud PostgreSQL database to store real student biometrics and attendance records.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Status Badge */}
          <div className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
            isSupabaseConfigured()
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-amber-50 border-amber-200 text-amber-800'
          }`}>
            <div className="flex items-center gap-2">
              {isSupabaseConfigured() ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-600" />
              )}
              <span className="font-semibold">
                {isSupabaseConfigured() ? 'Connected to Supabase' : 'Running on Local Fallback / Dev DB'}
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-slate-700">Project URL (VITE_SUPABASE_URL)</Label>
            <Input
              placeholder="https://xyzproject.supabase.co"
              value={url}
              onChange={e => setUrl(e.target.value)}
              className="rounded-xl font-mono text-xs border-[#d2e1e5]"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-slate-700">Anon Public Key (VITE_SUPABASE_ANON_KEY)</Label>
            <Input
              type="password"
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              value={anonKey}
              onChange={e => setAnonKey(e.target.value)}
              className="rounded-xl font-mono text-xs border-[#d2e1e5]"
            />
          </div>

          <div className="p-3 bg-cyan-50/70 border border-cyan-200 rounded-xl text-xs text-cyan-900 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold">
              <Sparkles className="w-4 h-4 text-[#2B9FB1]" />
              <span>How to setup your Supabase database:</span>
            </div>
            <ol className="list-decimal list-inside space-y-1 text-[11px] text-cyan-800 pl-1">
              <li>Create a free project at <a href="https://supabase.com" target="_blank" rel="noreferrer" className="underline font-semibold inline-flex items-center gap-0.5">supabase.com <ExternalLink className="w-3 h-3" /></a></li>
              <li>Go to <strong>SQL Editor</strong> and paste the contents of <code className="bg-cyan-100 px-1 rounded">supabase_schema.sql</code>.</li>
              <li>Copy your <strong>Project URL</strong> and <strong>anon key</strong> from Settings $\rightarrow$ API into the fields above.</li>
            </ol>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          {isSupabaseConfigured() && (
            <Button variant="ghost" onClick={handleClear} className="text-xs text-rose-600 hover:bg-rose-50 rounded-xl">
              Disconnect
            </Button>
          )}
          <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-xl">
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl" disabled={testing}>
            Save & Connect
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
