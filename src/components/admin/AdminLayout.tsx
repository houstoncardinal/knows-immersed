import { ReactNode, useState, useEffect, createContext, useContext } from "react";
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
  Palette,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";

// Theme Context
type Theme = 'professional' | 'dark' | 'light' | 'neon';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

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

const getThemeStyles = (theme: Theme) => {
  switch (theme) {
    case 'professional':
      return {
        sidebar: 'bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-slate-700',
        sidebarText: 'text-white',
        sidebarTextMuted: 'text-slate-300',
        navActive: 'bg-slate-700/50 text-white border-slate-600',
        navHover: 'hover:bg-slate-700/30 text-slate-300 hover:text-white',
        header: 'bg-white/95 backdrop-blur-sm border-slate-200',
        headerText: 'text-slate-900',
        card: 'bg-white border-slate-200',
        cardText: 'text-slate-900',
      };
    case 'dark':
      return {
        sidebar: 'bg-gray-900 border-gray-700',
        sidebarText: 'text-white',
        sidebarTextMuted: 'text-gray-300',
        navActive: 'bg-gray-700 text-white border-gray-600',
        navHover: 'hover:bg-gray-700 text-gray-300 hover:text-white',
        header: 'bg-gray-900 border-gray-700',
        headerText: 'text-white',
        card: 'bg-gray-800 border-gray-700',
        cardText: 'text-white',
      };
    case 'light':
      return {
        sidebar: 'bg-white border-gray-200',
        sidebarText: 'text-gray-900',
        sidebarTextMuted: 'text-gray-600',
        navActive: 'bg-blue-50 text-blue-700 border-blue-200',
        navHover: 'hover:bg-gray-50 text-gray-600 hover:text-gray-900',
        header: 'bg-white border-gray-200',
        headerText: 'text-gray-900',
        card: 'bg-white border-gray-200',
        cardText: 'text-gray-900',
      };
    case 'neon':
      return {
        sidebar: 'bg-studio-darker border-border',
        sidebarText: 'text-white',
        sidebarTextMuted: 'text-muted-foreground',
        navActive: 'bg-primary/10 text-primary border-primary/20',
        navHover: 'hover:bg-muted/50 text-muted-foreground hover:text-foreground',
        header: 'bg-background/95 backdrop-blur-sm border-border',
        headerText: 'text-foreground',
        card: 'bg-card/50 backdrop-blur-sm border-border',
        cardText: 'text-foreground',
      };
    default:
      return getThemeStyles('professional');
  }
};

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>('professional');
  const [showThemeMenu, setShowThemeMenu] = useState(false);

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

  const themeStyles = getThemeStyles(theme);

  const ThemeSelector = () => (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowThemeMenu(!showThemeMenu)}
        className={`flex items-center gap-2 border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors ${
          theme === 'professional' ? 'bg-white' : theme === 'dark' ? 'bg-gray-800 border-gray-600 text-white hover:bg-gray-700' : 'bg-white'
        }`}
      >
        <Palette className="w-4 h-4" />
        <span className="capitalize text-sm">{theme}</span>
      </Button>

      {showThemeMenu && (
        <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-xl border py-2 z-50 ${
          theme === 'professional' ? 'bg-white border-slate-200' :
          theme === 'dark' ? 'bg-gray-800 border-gray-600' :
          theme === 'light' ? 'bg-white border-gray-200' :
          'bg-studio-darker border-border'
        }`}>
          {[
            { name: 'professional', icon: Monitor, label: 'Professional' },
            { name: 'dark', icon: Moon, label: 'Dark' },
            { name: 'light', icon: Sun, label: 'Light' },
            { name: 'neon', icon: Sparkles, label: 'Neon' },
          ].map((themeOption) => {
            const Icon = themeOption.icon;
            return (
              <button
                key={themeOption.name}
                onClick={() => {
                  setTheme(themeOption.name as Theme);
                  setShowThemeMenu(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors rounded-md mx-1 ${
                  theme === themeOption.name ? (
                    theme === 'professional' ? 'bg-slate-100 text-slate-900' :
                    theme === 'dark' ? 'bg-gray-700 text-white' :
                    theme === 'light' ? 'bg-blue-50 text-blue-700' :
                    'bg-primary/10 text-primary'
                  ) : (
                    theme === 'professional' ? 'text-slate-700 hover:bg-slate-50' :
                    theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' :
                    theme === 'light' ? 'text-gray-700 hover:bg-gray-50' :
                    'text-foreground hover:bg-muted/50'
                  )
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{themeOption.label}</span>
                {theme === themeOption.name && (
                  <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`min-h-screen flex transition-colors duration-300 ${
        theme === 'professional' ? 'bg-gradient-to-br from-slate-50 via-white to-slate-100' :
        theme === 'dark' ? 'bg-gray-900' :
        theme === 'light' ? 'bg-gray-50' :
        'bg-background'
      }`}>
        {/* Sidebar - Desktop */}
        <aside className={`hidden lg:flex flex-col w-64 ${themeStyles.sidebar} border-r fixed h-full transition-colors duration-300`}>
          <div className="p-6 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className={`p-4 rounded-2xl ${
                theme === 'professional' ? 'bg-white/10' :
                theme === 'dark' ? 'bg-gray-700' :
                theme === 'light' ? 'bg-blue-100' :
                'bg-gradient-to-br from-neon-cyan to-neon-pink'
              } flex items-center justify-center`}>
                <Sparkles className={`w-8 h-8 ${
                  theme === 'light' ? 'text-blue-600' : 'text-white'
                }`} />
              </div>
              <div>
                <h2 className={`text-2xl font-bold ${
                  theme === 'professional' ? 'text-white' :
                  theme === 'dark' ? 'text-white' :
                  theme === 'light' ? 'text-gray-900' :
                  'text-gradient-neon'
                }`}>
                  KNOWS STUDIOS
                </h2>
                <p className={`text-sm ${
                  theme === 'professional' ? 'text-slate-300' :
                  theme === 'dark' ? 'text-gray-300' :
                  theme === 'light' ? 'text-gray-600' :
                  'text-muted-foreground'
                }`}>
                  Administrative Portal
                </p>
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
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? themeStyles.navActive
                      : themeStyles.navHover
                  }`}
                >
                  <Icon className={`w-5 h-5 transition-colors duration-200 ${
                    isActive ? (
                      theme === 'professional' ? 'text-white' :
                      theme === 'dark' ? 'text-white' :
                      theme === 'light' ? 'text-blue-700' :
                      'text-primary'
                    ) : (
                      theme === 'professional' ? 'text-slate-300 group-hover:text-white' :
                      theme === 'dark' ? 'text-gray-300 group-hover:text-white' :
                      theme === 'light' ? 'text-gray-600 group-hover:text-gray-900' :
                      'text-muted-foreground group-hover:text-primary'
                    )
                  }`} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-slate-700">
            <div className="flex items-center gap-3 mb-4 px-4 py-3 rounded-lg bg-slate-800/50">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${
                theme === 'professional' ? 'bg-white/10 text-white' :
                theme === 'dark' ? 'bg-gray-700 text-white' :
                theme === 'light' ? 'bg-blue-100 text-blue-700' :
                'bg-gradient-to-br from-neon-cyan to-neon-pink text-white'
              }`}>
                {user?.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold truncate ${
                  theme === 'professional' ? 'text-white' :
                  theme === 'dark' ? 'text-white' :
                  theme === 'light' ? 'text-gray-900' :
                  'text-foreground'
                }`}>
                  {user?.name}
                </p>
                <p className={`text-xs truncate ${
                  theme === 'professional' ? 'text-slate-300' :
                  theme === 'dark' ? 'text-gray-300' :
                  theme === 'light' ? 'text-gray-600' :
                  'text-muted-foreground'
                }`}>
                  {user?.email}
                </p>
              </div>
            </div>

            {/* Theme Selector */}
            <div className="mb-3">
              <ThemeSelector />
            </div>

            <Button
              onClick={handleLogout}
              variant="outline"
              className={`w-full transition-colors duration-200 ${
                theme === 'professional' ? 'border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white' :
                theme === 'dark' ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white' :
                theme === 'light' ? 'border-gray-300 text-gray-700 hover:bg-gray-100' :
                'border-primary/50 hover:bg-primary/10'
              }`}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </aside>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}>
            <aside className={`w-64 ${themeStyles.sidebar} border-r h-full flex flex-col`} onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-4 rounded-2xl ${
                    theme === 'professional' ? 'bg-white/10' :
                    theme === 'dark' ? 'bg-gray-700' :
                    theme === 'light' ? 'bg-blue-100' :
                    'bg-gradient-to-br from-neon-cyan to-neon-pink'
                  } flex items-center justify-center`}>
                    <Sparkles className={`w-8 h-8 ${
                      theme === 'light' ? 'text-blue-600' : 'text-white'
                    }`} />
                  </div>
                  <div>
                    <h2 className={`text-2xl font-bold ${
                      theme === 'professional' ? 'text-white' :
                      theme === 'dark' ? 'text-white' :
                      theme === 'light' ? 'text-gray-900' :
                      'text-gradient-neon'
                    }`}>
                      KNOWS STUDIOS
                    </h2>
                    <p className={`text-sm ${
                      theme === 'professional' ? 'text-slate-300' :
                      theme === 'dark' ? 'text-gray-300' :
                      theme === 'light' ? 'text-gray-600' :
                      'text-muted-foreground'
                    }`}>
                      Administrative Portal
                    </p>
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
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                        isActive
                          ? themeStyles.navActive
                          : themeStyles.navHover
                      }`}
                    >
                      <Icon className={`w-5 h-5 transition-colors duration-200 ${
                        isActive ? (
                          theme === 'professional' ? 'text-white' :
                          theme === 'dark' ? 'text-white' :
                          theme === 'light' ? 'text-blue-700' :
                          'text-primary'
                        ) : (
                          theme === 'professional' ? 'text-slate-300 group-hover:text-white' :
                          theme === 'dark' ? 'text-gray-300 group-hover:text-white' :
                          theme === 'light' ? 'text-gray-600 group-hover:text-gray-900' :
                          'text-muted-foreground group-hover:text-primary'
                        )
                      }`} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-slate-700">
                <div className="mb-3">
                  <ThemeSelector />
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className={`w-full transition-colors duration-200 ${
                    theme === 'professional' ? 'border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white' :
                    theme === 'dark' ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white' :
                    theme === 'light' ? 'border-gray-300 text-gray-700 hover:bg-gray-100' :
                    'border-primary/50 hover:bg-primary/10'
                  }`}
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
          <header className={`sticky top-0 z-40 ${themeStyles.header} transition-colors duration-300`}>
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
                <h1 className={`text-2xl font-bold ${themeStyles.headerText}`}>
                  {navItems.find(item => item.path === location.pathname)?.label || "Dashboard"}
                </h1>
              </div>

              <div className="hidden lg:flex items-center gap-4">
                <ThemeSelector />
                <CommandPalette />
                <div className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  theme === 'professional' ? 'bg-slate-100' :
                  theme === 'dark' ? 'bg-gray-800' :
                  theme === 'light' ? 'bg-gray-100' :
                  'bg-muted/50'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    theme === 'professional' ? 'bg-slate-900 text-white' :
                    theme === 'dark' ? 'bg-gray-700 text-white' :
                    theme === 'light' ? 'bg-blue-100 text-blue-700' :
                    'bg-gradient-to-br from-neon-cyan to-neon-pink text-white'
                  }`}>
                    {user?.name.charAt(0)}
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${
                      theme === 'professional' ? 'text-slate-900' :
                      theme === 'dark' ? 'text-white' :
                      theme === 'light' ? 'text-gray-900' :
                      'text-foreground'
                    }`}>
                      {user?.name}
                    </p>
                    <p className={`text-xs ${
                      theme === 'professional' ? 'text-slate-600' :
                      theme === 'dark' ? 'text-gray-300' :
                      theme === 'light' ? 'text-gray-600' :
                      'text-muted-foreground'
                    }`}>
                      {user?.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-6">
            <ThemeContext.Provider value={{ theme, setTheme }}>
              {children}
            </ThemeContext.Provider>
          </main>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};
