import {
  LayoutDashboard,
  Users,
  ScanFace,
  Camera,
  ClipboardList,
  FileBarChart,
  Settings,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const adminItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Students", url: "/students", icon: Users },
  { title: "Face Registration", url: "/face-registration", icon: Camera },
  { title: "Attendance", url: "/attendance", icon: ClipboardList },
  { title: "Reports", url: "/reports", icon: FileBarChart },
];

const facultyItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Mark Attendance", url: "/attendance", icon: ScanFace },
  { title: "View Records", url: "/records", icon: ClipboardList },
  { title: "Reports", url: "/reports", icon: FileBarChart },
];

export function AppSidebar() {
  const { user } = useAuth();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const isAdmin = user?.role?.toUpperCase() === "ADMIN" || !user?.role;
  const items = isAdmin ? adminItems : facultyItems;

  return (
    <Sidebar collapsible="icon" className="border-r border-[#d2e1e5] bg-[#EEF3F4]">
      <SidebarHeader className="p-3">
        <NavLink
          to="/"
          className={`w-full rounded-2xl border border-[#d2e1e5] bg-gradient-to-b from-white to-[#f0f6f8] shadow-sm hover:border-[#2B9FB1]/50 hover:shadow-md transition-all duration-300 group ${collapsed ? "flex justify-center p-2" : "flex items-center gap-3 px-3 py-3"}`}
        >
          <div className={`rounded-xl bg-white border border-[#d8e5e9] shadow-inner flex items-center justify-center ${collapsed ? "h-12 w-12" : "h-14 w-14"}`}>
            <img
              src="logo.png"
              alt="AttendAI Logo"
              className={`object-contain drop-shadow-[0_0_12px_rgba(43,159,177,0.25)] ${collapsed ? "h-8 w-8" : "h-10 w-10"}`}
            />
          </div>

          {!collapsed && (
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h1 className="font-display font-extrabold text-[1.65rem] leading-none bg-clip-text text-transparent bg-gradient-to-r from-[#0B2E45] to-[#2B9FB1]">
                  AttendAI
                </h1>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#2B9FB1]/15 text-[#2B9FB1]">
                  AI
                </span>
              </div>
              <p className="text-xs text-sidebar-foreground/70 font-medium mt-1 truncate">Smart Face Attendance</p>
            </div>
          )}
        </NavLink>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60 text-[11px] font-bold uppercase tracking-wider px-3">
            {!collapsed && "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/dashboard"}
                      className="flex items-center rounded-xl px-3 py-2.5 text-[#325264] hover:bg-white/80 hover:text-[#0B2E45] transition-all duration-200"
                      activeClassName="bg-gradient-to-r from-[#2B9FB1] to-[#1E7D8C] text-white font-semibold shadow-md shadow-[#2B9FB1]/20 hover:text-white"
                    >
                      <item.icon className="w-4 h-4 mr-2.5 flex-shrink-0" />
                      {!collapsed && <span className="text-sm tracking-tight">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3 border-t border-[#d2e1e5]/60">
        {!collapsed ? (
          <div className="rounded-xl bg-white/70 border border-[#d2e1e5] p-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold text-[#0B2E45]">System Active</span>
            </div>
            <span className="text-[10px] font-mono font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
              v1.2 AI
            </span>
          </div>
        ) : (
          <div className="flex justify-center">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
