import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  User,
  Menu,
  X,
} from "lucide-react";

const menuItems = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Tasks",
    icon: CheckSquare,
    href: "/dashboard/tasks",
  },
  {
    label: "Profile",
    icon: User,
    href: "/dashboard/profile",
  },
];

const Sidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black/20 z-20 md:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}

      <aside
        className={`
          fixed md:relative z-30 md:z-auto
          h-screen flex flex-col
          bg-white border-r border-[#e5e5e5]
          transition-all duration-300 ease-in-out shrink-0
          ${collapsed
            ? "-translate-x-full md:translate-x-0 md:w-16"
            : "translate-x-0 w-64 md:w-56"
          }
        `}
      >

        {/* Logo + Toggle */}
        <div className="h-14 flex items-center justify-between px-4 border-b border-[#e5e5e5] shrink-0">
          {!collapsed && (
            <div className="flex items-center gap-2.5">
              {/* <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground text-background shrink-0">
                <CheckSquare size={14} />
              </div> */}
              <span className="text-sm font-bold tracking-tight text-foreground">
                Dashboard
              </span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`h-8 w-8 flex items-center justify-center rounded-lg hover:bg-[#f0f0f0] text-muted-foreground hover:text-foreground transition-colors ${
              collapsed ? "mx-auto" : ""
            }`}
          >
            {collapsed ? <Menu size={16} /> : <X size={16} />}
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {menuItems.map(({ label, icon: Icon, href }) => {
            const isActive = location.pathname === href;

            return (
              <Link
                key={href}
                to={href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl
                  text-sm font-medium transition-all duration-200
                  ${isActive
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground hover:bg-[#f0f0f0]"
                  }
                  ${collapsed ? "justify-center" : ""}
                `}
                title={collapsed ? label : undefined}
              >
                <Icon size={17} className="shrink-0" />
                {!collapsed && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div className="px-4 py-4 border-t border-[#e5e5e5] shrink-0">
            <p className="text-[11px] text-muted-foreground">
              &copy; 2026 TaskFlow. All rights reserved.
            </p>
          </div>
        )}

      </aside>
    </>
  );
};

export default Sidebar;