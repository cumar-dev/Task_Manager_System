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
  { label: "Home",      href: "/home"},
  { label: "Dashboard", href: "/dashboard" },
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
    <header className="sticky top-0 z-999 w-full border-b border-[#e5e5e5] shadow-sm my-5">
      <div className="flex h-18 items-center justify-between px-8 gap-6">

        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2.5 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-foreground text-background">
            <CheckSquare size={16} />
          </div>
          <span className="text-base font-bold tracking-tight text-foreground">
            TaskFlow
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ label, href}) => {
            const isActive = location.pathname === href;
            return (
              <Link
                key={href}
                to={href}
                className={`flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                  ${isActive
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground hover:bg-[#f0f0f0]"
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
                className="flex items-center gap-2 px-3 h-9 rounded-xl border border-[#e5e5e5] bg-[#f0f0f0] hover:bg-[#e5e5e5] transition-all"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-background text-[10px] font-bold">
                  {getInitials(user?.name)}
                </div>
                <span className="text-sm font-semibold hidden sm:block text-foreground">
                  {user?.name?.split(" ")[0] ?? "User"}
                </span>
                <ChevronDown size={13} className="text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-60 p-2 rounded-2xl border border-[#e5e5e5] shadow-lg bg-white mt-1"
            >
              {/* User Info */}
              <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-[#f0f0f0] mb-1">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background text-sm font-bold shrink-0">
                  {getInitials(user?.name)}
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="text-sm font-bold truncate text-foreground">
                    {user?.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user?.email}
                  </p>
                </div>
              </div>

              <DropdownMenuSeparator className="my-1.5 bg-[#e5e5e5]" />

              <DropdownMenuItem asChild>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2.5 cursor-pointer px-3 py-2.5 rounded-xl text-sm font-medium text-foreground"
                >
                  <LayoutDashboard size={15} className="text-muted-foreground" />
                  Dashboard
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link
                  to="/profile"
                  className="flex items-center gap-2.5 cursor-pointer px-3 py-2.5 rounded-xl text-sm font-medium text-foreground"
                >
                  <User size={15} className="text-muted-foreground" />
                  Profile
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="my-1.5 bg-[#e5e5e5]" />

              <DropdownMenuItem
                onClick={logout}
                className="flex items-center gap-2.5 cursor-pointer px-3 py-2.5 rounded-xl text-sm font-medium text-destructive focus:text-destructive focus:bg-destructive/10"
              >
                <LogOut size={15} />
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