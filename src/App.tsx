import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { LuxuryGallery } from "./components/LuxuryGallery";
import { AdminLogin } from "./pages/admin/Login";
import { AdminDashboard } from "./pages/admin/Dashboard";
import { EnhancedBookings } from "./pages/admin/EnhancedBookings";
import { EnhancedClients } from "./pages/admin/EnhancedClients";
import { AdminProjects } from "./pages/admin/Projects";
import { AdminEquipment } from "./pages/admin/Equipment";
import { EnhancedAnalytics } from "./pages/admin/EnhancedAnalytics";
import { AdminSettings } from "./pages/admin/Settings";
import { Storyboard } from "./pages/admin/Storyboard";
import { Moodboard } from "./pages/admin/Moodboard";
import { Script } from "./pages/admin/Script";
import { Timeline } from "./pages/admin/Timeline";
import { NotificationProvider } from "./components/admin/NotificationProvider";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const queryClient = new QueryClient();

// Admin redirect component
const AdminRedirect = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-studio-darker flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return <Navigate to={isAuthenticated ? "/admin/dashboard" : "/admin/login"} replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <NotificationProvider />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/gallery" element={<LuxuryGallery />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminRedirect />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/bookings"
              element={
                <ProtectedRoute>
                  <EnhancedBookings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/clients"
              element={
                <ProtectedRoute>
                  <EnhancedClients />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/projects"
              element={
                <ProtectedRoute>
                  <AdminProjects />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/equipment"
              element={
                <ProtectedRoute>
                  <AdminEquipment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <ProtectedRoute>
                  <EnhancedAnalytics />
                </ProtectedRoute>
              }
            />
            {/* Creative Tools for Video Directors */}
            <Route
              path="/admin/storyboard"
              element={
                <ProtectedRoute>
                  <Storyboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/moodboard"
              element={
                <ProtectedRoute>
                  <Moodboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/script"
              element={
                <ProtectedRoute>
                  <Script />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/timeline"
              element={
                <ProtectedRoute>
                  <Timeline />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute>
                  <AdminSettings />
                </ProtectedRoute>
              }
            />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
