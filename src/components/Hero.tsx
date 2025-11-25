import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://cdn.prod.website-files.com/603f0d7b7e27fb06f0e8ba33/6410f68e1714e4bfddcd18c3_DSC08256.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.4)",
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-studio-darker/50 via-transparent to-studio-darker z-10" />
      
      <div className="relative z-20 container mx-auto px-6 text-center animate-fade-in">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          <span className="block mb-2">Premier</span>
          <span className="text-gradient-neon neon-glow-cyan block">CYC WALL</span>
          <span className="block mt-2">Film & Photography Studio</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          North Hollywood's premier creative workspace designed for artists, filmmakers, and photographers
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => window.open("https://www.peerspace.com/pages/listings/5d36714b581d66000fc2f9a2?utm_source=copy_link&utm_campaign=listing_sharing", "_blank")}
            size="lg"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold text-lg px-8 py-6 group"
          >
            BOOK ON PEERSPACE
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
    </section>
  );
};
