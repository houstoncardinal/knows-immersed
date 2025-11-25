import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, X } from "lucide-react";

export const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Show after scrolling past first viewport
      if (scrollPosition > windowHeight * 0.5 && !isHidden) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHidden]);

  if (isHidden) return null;

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 transition-all duration-500 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-20 pointer-events-none"
      }`}
    >
      <div className="relative group">
        <Button
          onClick={() => setIsHidden(true)}
          variant="ghost"
          size="icon"
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-muted/80 hover:bg-muted opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X className="w-4 h-4" />
        </Button>
        
        <Button
          onClick={() => window.open("https://www.peerspace.com/pages/listings/5d36714b581d66000fc2f9a2?utm_source=copy_link&utm_campaign=listing_sharing", "_blank")}
          size="lg"
          className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold px-8 py-6 shadow-2xl animate-pulse-glow group"
        >
          <Calendar className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
          BOOK NOW
        </Button>
      </div>
    </div>
  );
};
