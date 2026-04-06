import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye, EyeOff, UserPlus, Fingerprint, Mail, Lock, ArrowLeft } from "lucide-react";  
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; 
import { toast } from "sonner";
import { API_URL } from "@/lib/api";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "faculty"
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);        
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleRoleChange = (val: string) => {
    setFormData(prev => ({ ...prev, role: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role.toUpperCase()
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.success === false) {
        throw new Error(data.message || 'Registration failed');
      }

      toast.success(data.message || 'Account created successfully. Please sign in.');
      navigate("/login");
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred during registration.';
      setError(message);
    } finally {
      setLoading(false);
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

      <div className="w-full max-w-md animate-rise relative z-10 my-8">
        <div className="text-center mb-8 animate-rise-delay-1">
          <div className="inline-flex items-center justify-center h-40 mb-4">
            <img src="logo.png" alt="AttendAI Logo" className="h-20 md:h-28 object-contain drop-shadow-xl transition-transform hover:scale-105 duration-300" />
          </div>
          <h1 className="text-4xl font-display font-bold tracking-tight text-[#0D2237]">Create Account</h1>
          <p className="text-muted-foreground mt-2 text-sm uppercase tracking-widest font-semibold">Join the next generation attendance system</p>
        </div>

        <Card className="shadow-[0_16px_36px_rgba(9,42,58,0.12)] border-[#d2e1e5] backdrop-blur-xl bg-white/95 overflow-hidden relative animate-rise-delay-2">
          <CardHeader className="pb-4 pt-8 border-b border-border/50">
            <div className="flex items-center justify-center gap-2">
              <UserPlus className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-card-foreground">Sign Up</h2>
            </div>
          </CardHeader>
          <CardContent className="pt-8 px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-lg p-3 text-center flex items-center justify-center gap-2">
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name" className="font-medium">Full Name</Label>
                <div className="relative">
                  <Input
                    id="name"
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10 h-12 bg-white/50 focus:bg-white transition-colors"
                    required
                  />
                  <UserPlus className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="font-medium">Email</Label>
                 <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="jane@attendai.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 h-12 bg-white/50 focus:bg-white transition-colors"
                    required
                  />
                  <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                 <Label className="font-medium">Role</Label>
                 <Select value={formData.role} onValueChange={handleRoleChange}>
                    <SelectTrigger className="h-12 bg-white/50 focus:bg-white transition-colors">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="faculty">Faculty Member</SelectItem>   
                      <SelectItem value="admin">System Administrator</SelectItem>
                    </SelectContent>
                 </Select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="font-medium">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder=""
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-10 pr-10 h-12 bg-white/50 focus:bg-white transition-colors"
                      required
                    />
                    <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="font-medium">Confirm</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder=""
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="pl-10 pr-10 h-12 bg-white/50 focus:bg-white transition-colors"
                      required
                    />
                    <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-xs text-muted-foreground flex items-start gap-2 pt-2 bg-secondary/30 p-3 rounded-lg border border-secondary">
                 <Fingerprint className="w-4 h-4 mt-0.5 shrink-0 text-primary/70" />
                 <p className="leading-relaxed">By signing up, you agree to the storing of facial biometric data in compliance with the institution's privacy policy.</p>
              </div>

              <Button type="submit" className="w-full h-12 text-lg font-medium bg-[#2B9FB1] hover:bg-[#23899B] shadow-[0_8px_24px_rgba(43,159,177,0.35)] transition-all mt-4" disabled={loading}>
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center mt-8 text-sm text-muted-foreground font-medium">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline font-bold transition-all">
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  );
}
