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
import { AttendAiLogo } from "@/components/AttendAiLogo";
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
          className={`w-full rounded-2xl border border-[#d2e1e5] bg-gradient-to-br from-white via-[#fcfefe] to-[#f0f7f9] shadow-sm hover:border-[#2B9FB1]/50 hover:shadow-md hover:shadow-[#2B9FB1]/10 transition-all duration-300 group ${
            collapsed ? "flex justify-center p-2" : "flex items-center gap-3 p-2.5"
          }`}
        >
          <div
            className={`rounded-xl bg-gradient-to-br from-[#0B2E45] via-[#103D5B] to-[#2B9FB1] p-[1.5px] shadow-md group-hover:shadow-[#2B9FB1]/30 transition-all duration-300 flex-shrink-0 ${
              collapsed ? "h-11 w-11" : "h-12 w-12"
            }`}
          >
            <div className="w-full h-full rounded-[10px] bg-white flex items-center justify-center p-1.5 transition-transform duration-300 group-hover:scale-[1.02]">
              <AttendAiLogo className="w-full h-full object-contain" showGlow={false} />
            </div>
          </div>

          {!collapsed && (
            <div className="min-w-0 flex-1">
              <h1 className="font-display font-extrabold text-[1.4rem] tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-[#0B2E45] via-[#104868] to-[#2B9FB1]">
                AttendAi
              </h1>
              <p className="text-[11px] text-[#4b6d80] font-medium mt-1 truncate">Smart Face Attendance</p>
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
