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
import { AdminLogin } from "./pages/admin/Login";
import { AdminDashboard } from "./pages/admin/Dashboard";
import { EnhancedBookings } from "./pages/admin/EnhancedBookings";
import { EnhancedClients } from "./pages/admin/EnhancedClients";
import { AdminProjects } from "./pages/admin/Projects";
import { AdminEquipment } from "./pages/admin/Equipment";
import { EnhancedAnalytics } from "./pages/admin/EnhancedAnalytics";
import { AdminSettings } from "./pages/admin/Settings";
import { NotificationProvider } from "./components/admin/NotificationProvider";

const queryClient = new QueryClient();

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

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLogin />} />
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
