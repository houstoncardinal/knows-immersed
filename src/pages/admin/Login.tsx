import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { SignInPage, Testimonial } from "@/components/ui/sign-in";
import { toast } from "sonner";

// KNOWS STUDIOS testimonials for admin login
const adminTestimonials: Testimonial[] = [
  {
    avatarSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    name: "Sarah Martinez",
    handle: "@sarahfilm",
    text: "KNOWS STUDIOS transformed our production workflow. The admin tools are incredibly intuitive and powerful."
  },
  {
    avatarSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    name: "Marcus Chen",
    handle: "@marcusdirects",
    text: "Managing bookings and equipment has never been easier. The dashboard gives us complete control over our studio operations."
  },
  {
    avatarSrc: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    name: "Emily Rodriguez",
    handle: "@emilycreates",
    text: "The analytics and reporting features help us optimize our studio usage and maximize revenue. Game-changing!"
  },
];

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
    <div className="bg-background text-foreground">
      <SignInPage
        title={
          <span className="font-light text-foreground tracking-tighter">
            Welcome to <span className="text-gradient-neon font-semibold">KNOWS STUDIOS</span>
          </span>
        }
        description="Access your admin dashboard to manage bookings, equipment, and studio operations"
        heroImageSrc="https://images.unsplash.com/photo-1642615835477-d303d7dc9ee9?w=2160&q=80"
        testimonials={adminTestimonials}
        onSignIn={handleSignIn}
        onGoogleSignIn={handleGoogleSignIn}
        onResetPassword={handleResetPassword}
        onCreateAccount={handleCreateAccount}
      />

      {/* Demo credentials overlay */}
      <div className="fixed bottom-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-4 text-sm max-w-xs">
        <p className="font-medium mb-2 text-primary">Demo Credentials:</p>
        <p className="text-muted-foreground">
          <strong>Email:</strong> admin@knowsstudios.com<br />
          <strong>Password:</strong> admin123
        </p>
      </div>
    </div>
  );
};
