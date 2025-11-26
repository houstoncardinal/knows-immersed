import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles, Crown } from "lucide-react";
import { useParallax } from "@/hooks/useScrollAnimation";
import { useEffect, useState } from "react";
import { BookingModal } from "./BookingModal";

export const LuxuryHero = () => {
  const offsetY = useParallax();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-studio-darker">
      {/* Cinematic Background Image with Parallax */}
      <div
        className="absolute inset-0 z-0 transition-transform duration-500 ease-out"
        style={{
          backgroundImage: "url('/images/6410f68e1714e4bfddcd18c3_DSC08256.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.3) contrast(1.2) saturate(1.3)",
          transform: `translateY(${offsetY * 0.3}px) translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px) scale(1.2)`,
        }}
      />

      {/* Premium Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-studio-darker/80 via-studio-darker/40 to-studio-darker/90 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-studio-darker/60 via-transparent to-studio-darker/60 z-10" />

      {/* Luxury Animated Gradient Orbs */}
      <div
        className="absolute inset-0 z-10 opacity-50 transition-all duration-700"
        style={{
          background: `
            radial-gradient(circle at ${50 + mousePosition.x * 0.5}% ${50 + mousePosition.y * 0.5}%, hsl(var(--luxury-gold) / 0.2), transparent 40%),
            radial-gradient(circle at ${30 + mousePosition.x * 0.3}% ${70 + mousePosition.y * 0.3}%, hsl(var(--neon-cyan) / 0.15), transparent 50%),
            radial-gradient(circle at ${70 - mousePosition.x * 0.3}% ${30 - mousePosition.y * 0.3}%, hsl(var(--neon-pink) / 0.15), transparent 50%)
          `,
        }}
      />

      {/* Floating Luxury Particles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[hsl(var(--luxury-gold))] rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              opacity: 0.3 + Math.random() * 0.4,
            }}
          />
        ))}
      </div>

      {/* Decorative Luxury Geometric Shapes */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 border border-[hsl(var(--luxury-gold))]/20 rounded-full z-10 animate-float-3d shadow-luxury-lg"
        style={{
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[32rem] h-[32rem] border border-neon-cyan/20 rounded-full z-10 animate-float-3d shadow-luxury-lg"
        style={{
          animationDelay: "2s",
          transform: `translate(${-mousePosition.x * 0.3}px, ${-mousePosition.y * 0.3}px)`,
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] border border-neon-pink/10 rounded-full z-10 animate-float-3d shadow-luxury-lg"
        style={{
          animationDelay: "4s",
          transform: `translate(calc(-50% + ${mousePosition.x * 0.2}px), calc(-50% + ${mousePosition.y * 0.2}px))`,
        }}
      />

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-6 text-center pt-32 md:pt-40">
        {/* Animated Logo */}
        <div className="mb-16 animate-cinematic-reveal">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <div className="flex items-center">
              {["K", "N", "O", "W", "S"].map((letter, i) => (
                <span
                  key={i}
                  className="inline-block text-4xl sm:text-5xl md:text-7xl font-bold tracking-[0.1em] sm:tracking-[0.2em] luxury-text text-shimmer-luxury hover:scale-110 transition-all duration-300 cursor-default"
                  style={{
                    animation: `cinematic-reveal 1s ease-out ${i * 0.1}s both`,
                    transform: `translateY(${Math.sin((offsetY + i * 100) * 0.01) * 10}px) translateZ(${i * 10}px)`,
                    textShadow: "0 0 40px hsl(var(--luxury-gold) / 0.5), 0 10px 30px rgba(0,0,0,0.8)",
                  }}
                >
                  {letter}
                </span>
              ))}
            </div>
            <span className="inline-block text-4xl sm:text-5xl md:text-7xl font-bold text-gradient-luxury animate-pulse">•</span>
            <div className="flex items-center">
              {["S", "T", "U", "D", "I", "O", "S"].map((letter, i) => (
                <span
                  key={i + 5}
                  className="inline-block text-4xl sm:text-5xl md:text-7xl font-bold tracking-[0.1em] sm:tracking-[0.2em] luxury-text text-shimmer-luxury hover:scale-110 transition-all duration-300 cursor-default"
                  style={{
                    animation: `cinematic-reveal 1s ease-out ${(i + 5) * 0.1}s both`,
                    transform: `translateY(${Math.sin((offsetY + (i + 5) * 100) * 0.01) * 10}px) translateZ(${(i + 5) * 10}px)`,
                    textShadow: "0 0 40px hsl(var(--luxury-rose-gold) / 0.5), 0 10px 30px rgba(0,0,0,0.8)",
                  }}
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Luxury Headline */}
        <div className="mb-8 animate-cinematic-reveal px-4" style={{ animationDelay: "1s" }}>
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold mb-6 leading-tight luxury-text text-center">
            <span
              className="block mb-2 sm:mb-4 hover:scale-105 transition-transform duration-500 inline-block"
              style={{
                textShadow: "0 20px 60px rgba(0,0,0,0.8), 0 0 80px hsl(var(--luxury-gold) / 0.3)",
              }}
            >
              Premium
            </span>
            <span
              className="text-gradient-premium block hover:scale-105 transition-transform duration-500 inline-block text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] leading-none"
              style={{
                textShadow: "0 0 80px hsl(var(--neon-cyan) / 0.6), 0 20px 60px rgba(0,0,0,0.8)",
              }}
            >
              CYC WALL
            </span>
            <span
              className="block mt-2 sm:mt-4 text-3xl sm:text-5xl md:text-6xl lg:text-7xl hover:scale-105 transition-transform duration-500 inline-block leading-tight"
              style={{
                textShadow: "0 20px 60px rgba(0,0,0,0.8)",
              }}
            >
              Film & Photography Studio
            </span>
          </h1>
        </div>

        {/* Luxury Tagline */}
        <div className="animate-slide-in-up" style={{ animationDelay: "1.3s" }}>
          <p className="text-2xl md:text-3xl text-muted-foreground mb-4 max-w-4xl mx-auto font-light">
            Where <span className="text-gradient-luxury font-semibold">Vision</span> Meets{" "}
            <span className="text-gradient-premium font-semibold">Reality</span>
          </p>
          <p className="text-lg md:text-xl text-muted-foreground/80 mb-12 max-w-3xl mx-auto">
            North Hollywood's premier creative sanctuary for visionary artists, acclaimed filmmakers, and professional photographers
          </p>
        </div>

        {/* Premium CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-bounce-in"
          style={{ animationDelay: "1.6s" }}
        >
          <Button
            onClick={() => setBookingOpen(true)}
            size="lg"
            className="bg-gradient-to-r from-[hsl(var(--luxury-gold))] via-[hsl(var(--luxury-rose-gold))] to-[hsl(var(--luxury-gold))] hover:shadow-luxury-xl text-black font-bold text-xl px-12 py-8 group shadow-luxury-lg animate-pulse-luxury transition-all duration-500"
          >
            <Crown className="mr-3 w-6 h-6 group-hover:rotate-12 transition-transform" />
            RESERVE YOUR SESSION
            <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Button>

          <Button
            onClick={scrollToAbout}
            size="lg"
            variant="outline"
            className="glass-luxury border-[hsl(var(--luxury-gold))]/30 text-foreground hover:border-[hsl(var(--luxury-gold))] hover:shadow-luxury-md font-bold text-xl px-12 py-8 group transition-all duration-500"
          >
            <Play className="mr-3 w-6 h-6 group-hover:scale-110 transition-transform" />
            VIRTUAL TOUR
          </Button>
        </div>

        {/* Trust Indicators */}
        <div
          className="mt-16 flex flex-wrap gap-8 justify-center items-center animate-slide-in-up"
          style={{ animationDelay: "1.9s" }}
        >
          <div className="flex items-center gap-2 glass-morphism px-6 py-3 rounded-lg">
            <Sparkles className="w-5 h-5 text-[hsl(var(--luxury-gold))]" />
            <span className="text-sm font-semibold">5-Star Rated</span>
          </div>
          <div className="flex items-center gap-2 glass-morphism px-6 py-3 rounded-lg">
            <Crown className="w-5 h-5 text-[hsl(var(--luxury-gold))]" />
            <span className="text-sm font-semibold">VIP Service</span>
          </div>
          <div className="flex items-center gap-2 glass-morphism px-6 py-3 rounded-lg">
            <Sparkles className="w-5 h-5 text-neon-cyan" />
            <span className="text-sm font-semibold">Premium Equipment</span>
          </div>
        </div>
      </div>

      {/* Luxury Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-8 h-12 border-2 border-[hsl(var(--luxury-gold))]/50 rounded-full flex items-start justify-center p-2 glass-morphism shadow-luxury-md">
          <div className="w-1.5 h-4 bg-gradient-to-b from-[hsl(var(--luxury-gold))] to-transparent rounded-full animate-pulse" />
        </div>
        <p className="text-xs text-muted-foreground mt-2 tracking-wider uppercase">Scroll</p>
      </div>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </section>
  );
};
