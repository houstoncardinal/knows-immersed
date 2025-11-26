import { ReactNode, useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CommandPalette } from "./CommandPalette";
import { useAdminShortcuts } from "@/hooks/useKeyboardShortcuts";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Briefcase,
  Package,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Sparkles,
} from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/admin/bookings", icon: Calendar, label: "Bookings" },
  { path: "/admin/clients", icon: Users, label: "Clients" },
  { path: "/admin/projects", icon: Briefcase, label: "Projects" },
  { path: "/admin/equipment", icon: Package, label: "Equipment" },
  { path: "/admin/analytics", icon: BarChart3, label: "Analytics" },
  { path: "/admin/settings", icon: Settings, label: "Settings" },
];

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Enable keyboard shortcuts
  useAdminShortcuts();

  // Add admin-mode class to body to restore normal cursor
  useEffect(() => {
    document.body.classList.add('admin-mode');
    return () => {
      document.body.classList.remove('admin-mode');
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-studio-darker border-r border-border fixed h-full">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-pink flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-gradient-neon">KNOWS</h2>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-primary" : "group-hover:text-primary"} transition-colors`} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-3 px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-cyan to-neon-pink flex items-center justify-center text-white text-sm font-bold">
              {user?.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full border-primary/50 hover:bg-primary/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}>
          <aside className="w-64 bg-studio-darker border-r border-border h-full flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-pink flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-gradient-neon">KNOWS</h2>
                  <p className="text-xs text-muted-foreground">Admin Panel</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <nav className="flex-1 p-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${
                      isActive
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? "text-primary" : "group-hover:text-primary"} transition-colors`} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-border">
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full border-primary/50 hover:bg-primary/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between px-6 py-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </Button>

            <div className="flex-1 lg:flex-none">
              <h1 className="text-2xl font-bold">
                {navItems.find(item => item.path === location.pathname)?.label || "Dashboard"}
              </h1>
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <CommandPalette />
              <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-muted/50">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-cyan to-neon-pink flex items-center justify-center text-white text-sm font-bold">
                  {user?.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.role}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
