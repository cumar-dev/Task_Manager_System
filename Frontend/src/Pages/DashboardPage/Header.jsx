import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/lib/store/authStore";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Home,
  LayoutDashboard,
  ChevronDown,
  LogOut,
  User,
  CheckSquare,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

const navLinks = [
  { label: "Home", href: "/home", icon: Home },
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
];

const Header = () => {
  const location = useLocation();
  const { user, clearAuth } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

const logout = async () => {
  if (!confirm("Are you sure you want to logout?")) return;

  clearAuth();

  localStorage.removeItem("token");
  localStorage.removeItem("user");

  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");

  queryClient.clear();

  navigate("/login", { replace: true });
};

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Gradient background matching auth pages */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-background to-primary/5 backdrop-blur-md border-b border-border" />

      <div className="relative flex h-16 items-center justify-between px-8 gap-6">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-3 shrink-0 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md group-hover:shadow-lg transition-shadow">
            <CheckSquare size={18} />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            Task<span className="text-primary">Flow</span>
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-1 ">
          {navLinks.map(({ label, href, icon: Icon }) => {
            const isActive = location.pathname === href;
            return (
              <Link
                key={href}
                to={href}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? " text-foreground shadow-sm border border-border"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/60"
                  }`}
              >
                {/* <Icon size={15} /> */}
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2.5 px-3 py-2 h-10 rounded-xl border border-border bg-background/60 hover:bg-background transition-all"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  {getInitials(user?.name)}
                </div>
                <div className="hidden sm:flex flex-col items-start">
                  <span className="text-xs font-semibold text-foreground leading-none">
                    {user?.name?.split(" ")[0] ?? "User"}
                  </span>
                  <span className="text-[10px] text-muted-foreground leading-none mt-0.5">
                    {user?.role ?? "Member"}
                  </span>
                </div>
                <ChevronDown
                  size={13}
                  className="text-muted-foreground hidden sm:block"
                />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-60 p-2 rounded-2xl shadow-lg border border-border mt-1"
            >
              {/* User Info */}
              <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-muted/50 mb-1">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0 shadow-sm">
                  {getInitials(user?.name)}
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="text-sm font-semibold truncate text-foreground">
                    {user?.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user?.email}
                  </p>
                </div>
              </div>

              <DropdownMenuSeparator className="my-1.5" />

              {/* Profile */}
              <DropdownMenuItem asChild>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-3 cursor-pointer px-3 py-2.5 rounded-xl text-sm font-medium"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted">
                    <LayoutDashboard size={14} />
                  </div>
                  Dashboard
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="my-1.5" />
              <DropdownMenuItem asChild>
                <Link
                  to="/profile"
                  className="flex items-center gap-3 cursor-pointer px-3 py-2.5 rounded-xl text-sm font-medium"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted">
                    <User size={14} />
                  </div>
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-1.5" />
              {/* Sign out */}
              <DropdownMenuItem
                onClick={logout}
                className="flex items-center gap-3 cursor-pointer px-3 py-2.5 rounded-xl text-sm font-medium text-destructive focus:text-destructive focus:bg-destructive/10"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-destructive/10">
                  <LogOut size={14} className="text-destructive" />
                </div>
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
