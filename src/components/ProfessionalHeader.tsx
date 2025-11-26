import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Crown, Menu, X } from "lucide-react";
import { BookingModal } from "./BookingModal";

export const ProfessionalHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: "About", sectionId: "about" },
    { label: "Pricing", sectionId: "pricing" },
    { label: "Equipment", sectionId: "equipment" },
    { label: "Gallery", sectionId: "gallery" },
    { label: "Contact", sectionId: "contact" },
  ];

  return (
    <>
      {/* Top Info Bar - Fixed */}
      <div className={`fixed top-0 left-0 right-0 z-50 bg-studio-darker border-b border-border/30 py-3 hidden md:block transition-all duration-500 ${isScrolled ? "opacity-0 -translate-y-full" : "opacity-100 translate-y-0"}`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <a
                href="tel:3236093356"
                className="flex items-center gap-2 text-muted-foreground hover:text-[hsl(var(--luxury-gold))] transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>323 609 3356</span>
              </a>
              <a
                href="mailto:info@knowsstudios.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-[hsl(var(--luxury-gold))] transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>info@knowsstudios.com</span>
              </a>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>North Hollywood, CA</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <Crown className="w-4 h-4 text-[hsl(var(--luxury-gold))]" />
              <span className="text-gradient-luxury font-semibold tracking-wider uppercase">
                Premium Studio Experience
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header
        className={`
          fixed left-0 right-0 z-50 transition-all duration-500
          ${isScrolled
            ? "top-0 glass-luxury shadow-luxury-lg py-4"
            : "top-12 md:top-12 bg-gradient-to-b from-studio-darker/80 to-transparent py-6"
          }
        `}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="group"
              >
                <h1 className="text-2xl md:text-3xl font-bold luxury-text flex items-center gap-3">
                  <span className="text-gradient-luxury group-hover:scale-110 transition-transform duration-300">
                    KNOWS
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-gradient-premium group-hover:scale-110 transition-transform duration-300">
                    STUDIOS
                  </span>
                </h1>
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.sectionId}
                  onClick={() => scrollToSection(item.sectionId)}
                  className="text-sm font-semibold text-foreground/80 hover:text-gradient-luxury hover:scale-105 transition-all duration-300 uppercase tracking-wider"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setBookingOpen(true)}
                className="hidden md:flex bg-gradient-to-r from-[hsl(var(--luxury-gold))] to-[hsl(var(--luxury-rose-gold))] hover:shadow-luxury-lg text-black font-bold px-8 py-3 animate-pulse-luxury transition-all duration-300"
              >
                <Crown className="w-4 h-4 mr-2" />
                BOOK NOW
              </Button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg glass-morphism hover:glass-luxury transition-all"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 glass-luxury rounded-2xl mx-6 p-6 shadow-luxury-xl animate-slide-down">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.sectionId}
                  onClick={() => scrollToSection(item.sectionId)}
                  className="text-left text-lg font-semibold text-foreground/80 hover:text-gradient-luxury hover:translate-x-2 transition-all duration-300 uppercase tracking-wider py-2"
                >
                  {item.label}
                </button>
              ))}

              <div className="border-t border-border/50 pt-4 mt-4">
                <Button
                  onClick={() => {
                    setBookingOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-[hsl(var(--luxury-gold))] to-[hsl(var(--luxury-rose-gold))] hover:shadow-luxury-lg text-black font-bold py-4"
                >
                  <Crown className="w-5 h-5 mr-2" />
                  BOOK NOW
                </Button>
              </div>

              {/* Mobile Contact Info */}
              <div className="border-t border-border/50 pt-4 mt-2 space-y-3 text-sm">
                <a
                  href="tel:3236093356"
                  className="flex items-center gap-2 text-muted-foreground hover:text-[hsl(var(--luxury-gold))] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>323 609 3356</span>
                </a>
                <a
                  href="mailto:info@knowsstudios.com"
                  className="flex items-center gap-2 text-muted-foreground hover:text-[hsl(var(--luxury-gold))] transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>info@knowsstudios.com</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </>
  );
};
