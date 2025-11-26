import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Calendar } from "lucide-react";
import { BookingModal } from "./BookingModal";

interface PowerfulCTAProps {
  variant?: "primary" | "secondary" | "inline";
  title?: string;
  description?: string;
  className?: string;
}

export const PowerfulCTA = ({
  variant = "primary",
  title,
  description,
  className = "",
}: PowerfulCTAProps) => {
  const [bookingOpen, setBookingOpen] = useState(false);

  if (variant === "inline") {
    return (
      <>
        <div className={`group cursor-pointer ${className}`} onClick={() => setBookingOpen(true)}>
          <div className="flex items-center gap-3 p-6 rounded-lg bg-gradient-to-r from-neon-cyan/10 to-neon-pink/10 border border-primary/30 hover:border-primary transition-all duration-500 immersive-card">
            <div className="p-3 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-pink group-hover:scale-110 transition-transform duration-500">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-lg mb-1 group-hover:text-gradient-neon transition-colors">
                {title || "Book Your Studio Time"}
              </p>
              <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">
                {description || "Reserve now and bring your vision to life"}
              </p>
            </div>
            <ArrowRight className="w-6 h-6 text-primary group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
        <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
      </>
    );
  }

  if (variant === "secondary") {
    return (
      <>
        <div className={`text-center p-12 bg-gradient-to-br from-card/50 to-studio-darker rounded-lg border border-border relative overflow-hidden group ${className}`}>
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-neon-cyan/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-neon-pink/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />

          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-neon-cyan to-neon-pink mb-6 animate-pulse-glow">
              <Sparkles className="w-8 h-8 text-white animate-float" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              {title || <><span className="text-gradient-neon">Ready</span> to Create?</>}
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {description || "Transform your creative vision into reality at North Hollywood's premier studio space"}
            </p>
            <Button
              onClick={() => setBookingOpen(true)}
              size="lg"
              className="bg-gradient-to-r from-neon-cyan to-neon-pink hover:opacity-90 text-white font-bold text-lg px-12 py-6 group/btn animate-pulse-glow"
            >
              <Calendar className="mr-2 w-6 h-6 group-hover/btn:rotate-12 transition-transform" />
              BOOK YOUR SESSION
              <ArrowRight className="ml-2 w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
        <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
      </>
    );
  }

  // Primary variant
  return (
    <>
      <div className={`relative overflow-hidden rounded-lg ${className}`}>
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan via-neon-pink to-neon-cyan bg-[length:200%_100%] animate-shimmer opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-studio-darker/90 to-studio-dark/90" />

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-pink/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />

        <div className="relative z-10 p-12 md:p-16 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent" />
            <Sparkles className="w-6 h-6 text-neon-cyan animate-float" />
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-neon-pink to-transparent" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {title || (
              <>
                <span className="text-gradient-neon">Book</span> Your
                <br />
                Creative Session
              </>
            )}
          </h2>

          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            {description || "Experience the perfect blend of professional equipment, versatile space, and creative freedom at KNOWS STUDIOS"}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => setBookingOpen(true)}
              size="lg"
              className="bg-gradient-to-r from-neon-cyan to-neon-pink hover:opacity-90 text-white font-bold text-lg px-12 py-6 group animate-pulse-glow"
            >
              <Calendar className="mr-2 w-6 h-6 group-hover:rotate-12 transition-transform" />
              BOOK NOW
              <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              onClick={() => window.open("tel:3236093356")}
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 font-bold text-lg px-12 py-6"
            >
              CALL US: 323 609 3356
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            Available 7 days a week • Instant booking confirmation
          </p>
        </div>
      </div>
      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </>
  );
};
