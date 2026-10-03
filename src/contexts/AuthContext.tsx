import React, { createContext, useContext, useState, ReactNode } from "react";
import { API_URL } from "@/lib/api";

export type UserRole = "admin" | "faculty";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  error: string;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("attendai_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const resData = await response.json().catch(() => ({}));
      
      if (response.ok && resData.success) {
        const jwtData = resData.data;

        const userData: User = {
          id: String(jwtData?.id || email),
          name: jwtData.username || email.split('@')[0],
          email: email,
          role: (jwtData.role || "faculty").toLowerCase() as UserRole,
        };
        
        setUser(userData);
        localStorage.setItem("attendai_user", JSON.stringify(userData));
        localStorage.setItem("attendai_token", jwtData.token);
        
        setLoading(false);
        return true;
      }

      // If backend fails or user is not seeded yet in a running instance, allow standard demo accounts
      const cleanEmail = email.trim().toLowerCase();
      if (
        (cleanEmail === "admin@attendai.com" && password === "admin123") ||
        (cleanEmail === "faculty@attendai.com" && password === "admin123")
      ) {
        const isFaculty = cleanEmail.includes("faculty");
        const userData: User = {
          id: isFaculty ? "faculty-001" : "admin-001",
          name: isFaculty ? "Prof. Sarah Jenkins" : "System Administrator",
          email: cleanEmail,
          role: isFaculty ? "faculty" : "admin",
        };
        setUser(userData);
        localStorage.setItem("attendai_user", JSON.stringify(userData));
        localStorage.setItem("attendai_token", "demo-token-" + Date.now());
        setLoading(false);
        return true;
      }

      setError(resData.message || "Invalid email or password");
      setLoading(false);
      return false;
    } catch (err) {
      console.warn("Backend auth offline or network error, checking demo credentials...", err);
      const cleanEmail = email.trim().toLowerCase();
      if (
        (cleanEmail === "admin@attendai.com" && password === "admin123") ||
        (cleanEmail === "faculty@attendai.com" && password === "admin123")
      ) {
        const isFaculty = cleanEmail.includes("faculty");
        const userData: User = {
          id: isFaculty ? "faculty-001" : "admin-001",
          name: isFaculty ? "Prof. Sarah Jenkins" : "System Administrator",
          email: cleanEmail,
          role: isFaculty ? "faculty" : "admin",
        };
        setUser(userData);
        localStorage.setItem("attendai_user", JSON.stringify(userData));
        localStorage.setItem("attendai_token", "demo-token-" + Date.now());
        setLoading(false);
        return true;
      }

      setError("Network connection error");
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("attendai_user");
    localStorage.removeItem("attendai_token");
  };

  const clearError = () => setError("");

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading, error, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");        
  return ctx;
}
