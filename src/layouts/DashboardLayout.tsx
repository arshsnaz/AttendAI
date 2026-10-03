import { useState } from "react";
import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Bell,
  Search,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  LogOut,
  User,
  Shield,
  Activity,
  Scan,
  Database
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { isSupabaseConfigured } from "@/lib/supabase";
import { SupabaseConnectModal } from "@/components/SupabaseConnectModal";

const NOTIFICATIONS = [
  {
    id: 1,
    title: "AI Live Session Active",
    description: "Camera feed streaming on Morning Attendance.",
    time: "2 mins ago",
    unread: true,
    icon: Scan,
    color: "text-cyan-500 bg-cyan-50"
  },
  {
    id: 2,
    title: "Biometric Dataset Vectorized",
    description: "25 face samples verified for student STU-1004.",
    time: "15 mins ago",
    unread: true,
    icon: CheckCircle2,
    color: "text-emerald-500 bg-emerald-50"
  },
  {
    id: 3,
    title: "Monthly Compliance Ready",
    description: "98.7% punctuality index generated in Reports.",
    time: "1 hour ago",
    unread: false,
    icon: Sparkles,
    color: "text-indigo-500 bg-indigo-50"
  },
];

const DashboardLayout = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [supabaseModalOpen, setSupabaseModalOpen] = useState(false);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const getInitials = (name?: string) => {
    if (!name) return "AI";
    return name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();
  };

  const getPageTitle = (pathname: string) => {
    if (pathname.includes("/attendance")) return "Live Attendance HUD";
    if (pathname.includes("/students")) return "Student Directory";
    if (pathname.includes("/face-registration")) return "Face Studio";
    if (pathname.includes("/records")) return "Attendance Records";
    if (pathname.includes("/reports")) return "Analytics & Reports";
    return "Dashboard";
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#EEF3F4] text-[#0D2237]">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Header */}
          <header className="h-16 flex items-center justify-between border-b border-[#d2e1e5] bg-white/80 px-4 md:px-6 sticky top-0 z-30 backdrop-blur-md transition-all">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-[#325264] hover:bg-slate-100 rounded-lg p-2" />
              <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-500">
                <span>AttendAi</span>
                <span>/</span>
                <span className="text-[#0B2E45] font-bold">{getPageTitle(location.pathname)}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Supabase Database Connection Button */}
              <button
                onClick={() => setSupabaseModalOpen(true)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border shadow-sm ${
                  isSupabaseConfigured()
                    ? "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100"
                    : "bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100"
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {isSupabaseConfigured() ? "Supabase Live" : "Connect Supabase"}
                </span>
              </button>

              {/* Live Backend Indicator */}
              <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                <span>API Ready</span>
              </div>

              {/* Notifications Popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <button className="relative p-2 rounded-xl hover:bg-slate-100 text-[#5d7a87] transition-colors">
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#2B9FB1] rounded-full border-2 border-white ring-1 ring-cyan-400/50" />
                    )}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0 rounded-2xl border-[#d2e1e5] shadow-xl" align="end">
                  <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50">
                    <div>
                      <h4 className="font-bold text-sm text-[#0D2237]">Notifications</h4>
                      <p className="text-[11px] text-muted-foreground">{unreadCount} unread updates</p>
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllRead}
                        className="text-[11px] font-semibold text-[#2B9FB1] hover:underline"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                    {notifications.map(n => {
                      const Icon = n.icon;
                      return (
                        <div
                          key={n.id}
                          className={`p-3.5 flex gap-3 hover:bg-slate-50 transition-colors ${
                            n.unread ? "bg-cyan-50/30" : ""
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${n.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-800 leading-tight">{n.title}</p>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{n.description}</p>
                            <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </PopoverContent>
              </Popover>

              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2.5 hover:bg-slate-100 rounded-xl px-2.5 py-1.5 transition-colors outline-none">
                  <Avatar className="w-8 h-8 rounded-xl ring-2 ring-[#2B9FB1]/30">
                    <AvatarFallback className="bg-gradient-to-br from-[#2B9FB1] to-[#0B2E45] text-white text-xs font-bold rounded-xl">
                      {getInitials(user?.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-xs font-bold text-[#0D2237] leading-none">{user?.name || "Faculty"}</p>
                    <p className="text-[10px] text-[#2B9FB1] font-semibold capitalize mt-0.5">
                      {user?.role || "Staff"}
                    </p>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 p-1.5 rounded-2xl border-[#d2e1e5] shadow-xl">
                  <DropdownMenuLabel className="p-2">
                    <p className="text-xs font-bold text-[#0D2237]">{user?.name}</p>
                    <p className="text-[11px] text-muted-foreground">{user?.email}</p>
                    <Badge variant="outline" className="mt-1 text-[10px] capitalize text-[#2B9FB1] border-cyan-200 bg-cyan-50">
                      {user?.role}
                    </Badge>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-100" />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center gap-2 p-2 rounded-xl text-xs font-medium cursor-pointer">
                      <Activity className="w-4 h-4 text-[#2B9FB1]" /> Dashboard Overview
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/attendance" className="flex items-center gap-2 p-2 rounded-xl text-xs font-medium cursor-pointer">
                      <Scan className="w-4 h-4 text-[#2B9FB1]" /> Live Camera Scanner
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSupabaseModalOpen(true)} className="flex items-center gap-2 p-2 rounded-xl text-xs font-medium cursor-pointer">
                    <Database className="w-4 h-4 text-emerald-600" /> Supabase Database
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-100" />
                  <DropdownMenuItem
                    onClick={logout}
                    className="flex items-center gap-2 p-2 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Main Outlet */}
          <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
      <SupabaseConnectModal open={supabaseModalOpen} onOpenChange={setSupabaseModalOpen} />
    </SidebarProvider>
  );
};

export default DashboardLayout;
