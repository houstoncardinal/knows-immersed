import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useParallax } from "@/hooks/useScrollAnimation";
import { useEffect, useState } from "react";
import { BookingModal } from "./BookingModal";

export const Hero = () => {
  const offsetY = useParallax();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0 transition-transform duration-300 ease-out"
        style={{
          backgroundImage: "url('https://cdn.prod.website-files.com/603f0d7b7e27fb06f0e8ba33/6410f68e1714e4bfddcd18c3_DSC08256.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.35) contrast(1.1) saturate(1.2)",
          transform: `translateY(${offsetY * 0.5}px) translate(${mousePosition.x}px, ${mousePosition.y}px) scale(1.15)`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-studio-darker/70 via-studio-darker/30 to-studio-darker z-10" />

      {/* Animated gradient overlay */}
      <div
        className="absolute inset-0 z-10 opacity-40 transition-all duration-500"
        style={{
          background: `radial-gradient(circle at ${50 + mousePosition.x}% ${50 + mousePosition.y}%, hsl(var(--neon-cyan) / 0.25), transparent 50%), radial-gradient(circle at ${50 - mousePosition.x}% ${50 - mousePosition.y}%, hsl(var(--neon-pink) / 0.15), transparent 60%)`,
        }}
      />

      {/* Decorative geometric shapes */}
      <div
        className="absolute top-1/4 left-1/4 w-64 h-64 border border-neon-cyan/20 rounded-full z-10 animate-float"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 border border-neon-pink/20 rounded-full z-10 animate-float"
        style={{ animationDelay: "1s" }}
      />
      
      <div className="relative z-20 container mx-auto px-6 text-center animate-fade-in perspective-1000">
        <div className="mb-8">
          <div className="inline-block">
            {["K", "N", "O", "W", "S"].map((letter, i) => (
              <span
                key={i}
                className="inline-block text-4xl md:text-5xl font-bold tracking-widest neon-glow-cyan hover:scale-125 transition-transform cursor-default"
                style={{
                  animation: `fade-in 0.5s ease-out ${i * 0.1}s both`,
                  transform: `translateY(${Math.sin((offsetY + i * 100) * 0.01) * 10}px)`,
                }}
              >
                {letter}
              </span>
            ))}
            <span className="inline-block text-4xl md:text-5xl font-bold tracking-widest mx-2">•</span>
            {["S", "T", "U", "D", "I", "O", "S"].map((letter, i) => (
              <span
                key={i + 5}
                className="inline-block text-4xl md:text-5xl font-bold tracking-widest neon-glow-pink hover:scale-125 transition-transform cursor-default"
                style={{
                  animation: `fade-in 0.5s ease-out ${(i + 5) * 0.1}s both`,
                  transform: `translateY(${Math.sin((offsetY + (i + 5) * 100) * 0.01) * 10}px)`,
                }}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight" style={{ textShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
          <span className="block mb-2 animate-slide-up hover:scale-105 transition-transform inline-block" style={{ animationDelay: "0.8s" }}>Premier</span>
          <span className="text-gradient-neon block animate-slide-up hover:scale-105 transition-transform inline-block" style={{ animationDelay: "1s", textShadow: "0 0 40px hsl(var(--neon-cyan) / 0.5)" }}>CYC WALL</span>
          <span className="block mt-2 animate-slide-up hover:scale-105 transition-transform inline-block" style={{ animationDelay: "1.2s" }}>Film & Photography Studio</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          North Hollywood's premier creative workspace designed for artists, filmmakers, and photographers
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => setBookingOpen(true)}
            size="lg"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold text-lg px-8 py-6 group"
          >
            BOOK YOUR SESSION
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button
            onClick={scrollToAbout}
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 font-bold text-lg px-8 py-6"
          >
            EXPLORE STUDIO
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary rounded-full" />
        </div>
      </div>
      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </section>
  );
};
