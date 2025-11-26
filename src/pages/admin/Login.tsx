import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { SignInPage } from "@/components/ui/sign-in";
import { toast } from "sonner";

export const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Add admin-mode class to body to restore normal cursor on login page
  useEffect(() => {
    document.body.classList.add('admin-mode');
    return () => {
      document.body.classList.remove('admin-mode');
    };
  }, []);

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const { email, password } = data as { email: string; password: string };

    try {
      const success = await login(email, password);
      if (success) {
        toast.success("Welcome back to KNOWS STUDIOS Admin!");
        navigate("/admin/dashboard");
      } else {
        toast.error("Invalid credentials. Please check your email and password.");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  const handleGoogleSignIn = () => {
    toast.info("Google authentication coming soon!");
  };

  const handleResetPassword = () => {
    toast.info("Password reset functionality coming soon!");
  };

  const handleCreateAccount = () => {
    toast.info("Account creation is managed by system administrators.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="flex min-h-screen">
        {/* Left side - Professional branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.05),transparent_50%)]" />
          </div>

          {/* Professional content */}
          <div className="relative z-10 flex flex-col justify-center px-16 text-white">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h1 className="text-4xl font-bold mb-4 leading-tight">
                KNOWS STUDIOS
                <span className="block text-xl font-normal text-slate-300 mt-2">
                  Administrative Portal
                </span>
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed max-w-md">
                Professional studio management platform for seamless operations,
                booking coordination, and equipment oversight.
              </p>
            </div>

            {/* Professional stats/features */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-bold text-blue-400 mb-1">500+</div>
                <div className="text-sm text-slate-400">Bookings Managed</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-bold text-emerald-400 mb-1">24/7</div>
                <div className="text-sm text-slate-400">System Monitoring</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-bold text-purple-400 mb-1">50+</div>
                <div className="text-sm text-slate-400">Equipment Items</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-bold text-amber-400 mb-1">99.9%</div>
                <div className="text-sm text-slate-400">Uptime</div>
              </div>
            </div>


          </div>
        </div>

        {/* Right side - Login form */}
        <div className="flex-1 flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-md">
            {/* Mobile header */}
            <div className="lg:hidden text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">KNOWS STUDIOS</h1>
              <p className="text-slate-600">Administrative Portal</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back</h2>
                <p className="text-slate-600">Sign in to access your admin dashboard</p>
              </div>

              <form onSubmit={handleSignIn} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-400"
                      placeholder="admin@knowsstudios.com"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-400"
                      placeholder="Enter your password"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" name="remember" className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500" />
                    <span className="ml-2 text-sm text-slate-600">Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => toast.info("Password reset functionality coming soon!")}
                    className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Sign In to Dashboard
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-slate-500">
                  Need help? Contact{" "}
                  <a href="mailto:admin@knowsstudios.com" className="text-blue-600 hover:text-blue-500 font-medium">
                    system administrator
                  </a>
                </p>
              </div>
            </div>

            {/* Professional footer */}
            <div className="mt-8 text-center text-xs text-slate-500">
              <p>© 2025 KNOWS STUDIOS. All rights reserved.</p>
              <p className="mt-1">Secure administrative access • SSL Encrypted</p>
            </div>
          </div>
        </div>
      </div>

      {/* Demo credentials overlay - positioned to avoid overlap */}
      <div className="fixed bottom-6 left-6 bg-white/95 backdrop-blur-sm border border-slate-200 rounded-xl p-4 text-sm max-w-xs shadow-xl z-50">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <p className="font-semibold text-slate-900">Demo Access</p>
        </div>
        <div className="space-y-1 text-slate-700">
          <p><span className="font-medium">Email:</span> admin@knowsstudios.com</p>
          <p><span className="font-medium">Password:</span> admin123</p>
        </div>
        {/* Close button for better UX */}
        <button
          onClick={(e) => e.currentTarget.parentElement?.remove()}
          className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Close demo info"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};
