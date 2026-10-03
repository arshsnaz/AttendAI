import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock, ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";
import { AttendAiLogo } from "@/components/AttendAiLogo";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    const success = await login(email, password);
    if (success) {
      navigate(from, { replace: true });
    }
  };

  const handleQuickLogin = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    clearError();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#EEF3F4]">
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-[#325264] hover:text-[#0B2E45] transition-colors z-20 font-semibold text-xs sm:text-sm bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#d2e1e5]"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </Link>

      <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-[#2B9FB1]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-[#0B2E45]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md animate-rise relative z-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-3xl bg-gradient-to-br from-[#0B2E45] via-[#103D5B] to-[#2B9FB1] p-[2px] shadow-xl mb-3">
            <div className="w-full h-full rounded-[22px] bg-white flex items-center justify-center p-3">
              <AttendAiLogo className="w-full h-full object-contain" showGlow />
            </div>
          </div>
          <h1 className="text-3xl font-display font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#0B2E45] via-[#104868] to-[#2B9FB1]">
            AttendAi
          </h1>
          <p className="text-muted-foreground mt-1 text-xs uppercase tracking-widest font-bold">
            AI-Powered Attendance Management
          </p>
        </div>

        <Card className="shadow-xl border-[#d2e1e5] backdrop-blur-xl bg-white/95 rounded-3xl overflow-hidden relative">
          <CardHeader className="pb-3 pt-6 border-b border-[#d2e1e5]/60 text-center">
            <h2 className="text-xl font-bold font-display text-[#0B2E45]">Sign In to Workspace</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Enter your institutional credentials below
            </p>
          </CardHeader>

          <CardContent className="pt-6 px-6 sm:px-8 pb-8 space-y-5">
            {/* Quick Demo Fill Pills */}
            <div className="rounded-2xl bg-gradient-to-br from-[#2B9FB1]/10 to-[#0B2E45]/5 border border-[#2B9FB1]/20 p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-[#0B2E45] flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#2B9FB1]" /> Quick 1-Click Credentials:
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickLogin("admin@attendai.com", "admin123")}
                  className="py-1.5 px-2.5 rounded-xl bg-white text-[11px] font-bold text-[#0B2E45] border border-[#d2e1e5] hover:border-[#2B9FB1] hover:bg-[#2B9FB1]/10 transition-all text-center truncate shadow-sm"
                >
                  👑 System Admin
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin("faculty@attendai.com", "admin123")}
                  className="py-1.5 px-2.5 rounded-xl bg-white text-[11px] font-bold text-[#0B2E45] border border-[#d2e1e5] hover:border-[#2B9FB1] hover:bg-[#2B9FB1]/10 transition-all text-center truncate shadow-sm"
                >
                  👨‍🏫 Faculty Member
                </button>
              </div>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive text-xs rounded-xl p-3 text-center font-medium">
                  {error}
                </div>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-bold text-[#0B2E45]">
                  Email Address
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@attendai.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11 bg-slate-50 border-[#d2e1e5] rounded-xl focus:bg-white transition-colors text-xs sm:text-sm"
                    required
                  />
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs font-bold text-[#0B2E45]">
                    Password
                  </Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-11 bg-slate-50 border-[#d2e1e5] rounded-xl focus:bg-white transition-colors text-xs sm:text-sm"
                    required
                  />
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-11 text-sm font-bold bg-gradient-to-r from-[#2B9FB1] to-[#1E7D8C] hover:opacity-95 text-white shadow-md shadow-[#2B9FB1]/25 rounded-xl transition-all mt-2"
                disabled={loading}
              >
                {loading ? "Verifying Credentials..." : "Sign In to Dashboard"}
              </Button>

              <div className="pt-3 text-center border-t border-[#d2e1e5]/60 mt-4">
                <p className="text-[11px] text-muted-foreground font-medium flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2B9FB1]" />
                  <span>Institutional Workspace • Accounts Provisioned by Administration</span>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
