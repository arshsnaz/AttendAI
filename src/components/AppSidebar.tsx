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
  const items = user?.role === "admin" ? adminItems : facultyItems;

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarHeader className="p-3">
        <NavLink
          to="/"
          className={`w-full rounded-2xl border border-[#d2e1e5] bg-[linear-gradient(180deg,#f8fcfd_0%,#edf4f6_100%)] shadow-sm hover:bg-sidebar-accent/60 transition-all duration-300 group ${collapsed ? "flex justify-center p-2" : "flex items-center gap-3 px-3 py-3"}`}
        >
          <div className={`rounded-xl bg-white/90 border border-[#d8e5e9] shadow-inner flex items-center justify-center ${collapsed ? "h-12 w-12" : "h-14 w-14"}`}>
            <img
              src="logo.png"
              alt="AttendAI Logo"
              className={`object-contain drop-shadow-[0_0_12px_rgba(43,159,177,0.22)] ${collapsed ? "h-8 w-8" : "h-10 w-10"}`}
            />
          </div>

          {!collapsed && (
            <div className="min-w-0">
              <h1 className="font-display font-extrabold text-[1.65rem] leading-none bg-clip-text text-transparent bg-gradient-to-r from-[#0B2E45] to-[#2B9FB1] group-hover:from-[#2B9FB1] group-hover:to-[#0B2E45] transition-all duration-300">
                AttendAI
              </h1>
              <p className="text-xs text-sidebar-foreground/65 font-medium mt-1 truncate">Smart, Secure, Effortless</p>
            </div>
          )}
        </NavLink>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 text-[10px] uppercase tracking-wider">
            {!collapsed && "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/dashboard"}
                      className="hover:bg-sidebar-accent/50 rounded-lg transition-colors"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    >
                      <item.icon className="w-4 h-4 mr-2 flex-shrink-0" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        {!collapsed && (
          <div className="text-[10px] text-sidebar-foreground/40 text-center">
            AttendAI v1.0 — Frontend Demo
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
