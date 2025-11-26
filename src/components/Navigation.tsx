import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-studio-darker/95 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold tracking-wider text-gradient-neon">
          KNOWS STUDIOS
        </h1>
        
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection("about")}
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("equipment")}
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Equipment
          </button>
          <button
            onClick={() => scrollToSection("gallery")}
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Gallery
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Contact
          </button>
          <ThemeSwitcher />
          <Button
            onClick={() => window.open("https://www.peerspace.com/pages/listings/5d36714b581d66000fc2f9a2?utm_source=copy_link&utm_campaign=listing_sharing", "_blank")}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-3 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-slate-800"
          >
            RESERVE BOOKING
          </Button>
        </div>

        <Button
          onClick={() => window.open("https://www.peerspace.com/pages/listings/5d36714b581d66000fc2f9a2?utm_source=copy_link&utm_campaign=listing_sharing", "_blank")}
          className="md:hidden bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-slate-800"
        >
          BOOK NOW
        </Button>
      </div>
    </nav>
  );
};
