import { ReactNode, useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CommandPalette } from "./CommandPalette";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { AIAssistant } from "./AIAssistant";
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
  ChevronDown,
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
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  // Enable keyboard shortcuts
  useAdminShortcuts();

  // Add admin-mode class to body to restore normal cursor
  useEffect(() => {
    document.body.classList.add('admin-mode');
    return () => {
      document.body.classList.remove('admin-mode');
    };
  }, []);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (profileMenuOpen && !target.closest('.profile-dropdown')) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileMenuOpen]);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-card border-r border-border fixed h-full shadow-lg">
        <div className="p-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-bold text-foreground tracking-tight mb-1">
              KNOWS STUDIOS
            </h2>
            <p className="text-sm text-muted-foreground">
              Admin Dashboard
            </p>
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
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }`}
              >
                <Icon className={`w-5 h-5 transition-colors duration-200 ${
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                }`} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-4 px-4 py-3 rounded-lg bg-muted/30">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm font-bold text-white">
              {user?.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate text-foreground">
                {user?.name}
              </p>
              <p className="text-xs truncate text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </div>

          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}>
          <aside className="w-64 bg-card border-r border-border h-full flex flex-col shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground tracking-tight mb-1">
                  KNOWS STUDIOS
                </h2>
                <p className="text-sm text-muted-foreground">
                  Admin Dashboard
                </p>
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
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    }`}
                  >
                    <Icon className={`w-5 h-5 transition-colors duration-200 ${
                      isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                    }`} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-border">
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full"
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
        <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
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
              <h1 className="text-2xl font-bold text-foreground">
                {navItems.find(item => item.path === location.pathname)?.label || "Dashboard"}
              </h1>
            </div>

            <div className="hidden lg:flex items-center gap-4">
              {/* Theme Selector */}
              <ThemeSwitcher />

              <CommandPalette />

              {/* Profile Dropdown */}
              <div className="relative profile-dropdown">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm font-bold text-white">
                    {user?.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-foreground">
                      {user?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user?.role}
                    </p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${profileMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-lg py-2 z-50">
                    <Link
                      to="/admin/settings"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-muted/50 transition-colors"
                    >
                      <Settings className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">Settings</span>
                    </Link>
                    <div className="border-t border-border my-2"></div>
                    <button
                      onClick={() => {
                        setProfileMenuOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-destructive/10 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4 text-destructive" />
                      <span className="text-sm text-destructive">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* AI Assistant */}
      <AIAssistantWrapper currentPage={location.pathname} />
    </div>
  );
};

// AI Assistant Wrapper Component
const AIAssistantWrapper = ({ currentPage }: { currentPage: string }) => {
  const [isAIOpen, setIsAIOpen] = useState(false);

  return (
    <AIAssistant
      isOpen={isAIOpen}
      onToggle={() => setIsAIOpen(!isAIOpen)}
      currentPage={currentPage}
    />
  );
};
