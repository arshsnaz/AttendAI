import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react";

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

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#EEF3F4]">
      <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors z-20">
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back to Home</span>
      </Link>
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#2B9FB1]/15 rounded-full blur-[120px] mix-blend-multiply pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#0B2E45]/15 rounded-full blur-[120px] mix-blend-multiply pointer-events-none" />
      
      <div className="w-full max-w-md animate-rise relative z-10">
        <div className="text-center mb-8 animate-rise-delay-1">
          <div className="inline-flex items-center justify-center h-40 mb-4">
            <img src="logo.png" alt="AttendAI Logo" className="h-20 md:h-28 object-contain drop-shadow-xl transition-transform hover:scale-105 duration-300" />
          </div>
          <h1 className="text-4xl font-display font-bold tracking-tight text-[#0D2237]">AttendAI</h1>
          <p className="text-muted-foreground mt-2 text-sm uppercase tracking-widest font-semibold">AI-Powered Attendance System</p>
        </div>

        <Card className="shadow-[0_16px_36px_rgba(9,42,58,0.12)] border-[#d2e1e5] backdrop-blur-xl bg-white/95 overflow-hidden relative animate-rise-delay-2">
          <CardHeader className="pb-4 pt-8 border-b border-border/50">
             <div className="flex items-center justify-center text-center">
               <h2 className="text-2xl font-bold text-card-foreground">Sign In</h2>
             </div>
          </CardHeader>
          <CardContent className="pt-8 px-8 pb-8">
              <form onSubmit={handleLoginSubmit} className="space-y-5">
                {error && (
                  <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-lg p-3 text-center">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-medium">Email Address</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@attendai.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 bg-white/50 focus:bg-white transition-colors"
                      required
                    />
                    <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                     <Label htmlFor="password" className="font-medium">Password</Label>
                     <a href="#" className="text-sm text-primary hover:underline font-medium">Forgot password?</a>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder=""
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 h-12 bg-white/50 focus:bg-white transition-colors"
                      required
                    />
                    <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full h-12 text-lg font-medium bg-[#2B9FB1] hover:bg-[#23899B] shadow-[0_8px_24px_rgba(43,159,177,0.35)] transition-all mt-4" disabled={loading}>
                  {loading ? "Authenticating..." : "Continue"}
                </Button>
                
                <p className="text-center mt-6 text-sm text-muted-foreground font-medium">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-primary hover:underline font-bold transition-all">
                    Sign Up here
                  </Link>
                </p>
              </form>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
