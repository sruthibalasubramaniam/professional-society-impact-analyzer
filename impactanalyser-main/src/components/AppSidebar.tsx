import { NavLink, useLocation } from "react-router-dom";
import { BarChart3, Calendar, Users, LayoutDashboard, TrendingUp } from "lucide-react";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/events", label: "Events", icon: Calendar },
  { to: "/students", label: "Students", icon: Users },
  { to: "/analytics", label: "Analytics", icon: TrendingUp },
];

const AppSidebar = () => {
  const location = useLocation();

  return (
    <aside className="sidebar-gradient w-64 min-h-screen p-6 flex flex-col shrink-0">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-sidebar-primary-foreground" />
        </div>
        <div>
          <h1 className="text-sm font-heading font-bold text-sidebar-primary-foreground">Impact</h1>
          <p className="text-xs text-sidebar-foreground/60">Analyzer</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1.5">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-sidebar-border">
        <p className="text-xs text-sidebar-foreground/40">Professional Society</p>
        <p className="text-xs text-sidebar-foreground/40">Activity Impact Analyzer</p>
      </div>
    </aside>
  );
};

export default AppSidebar;
