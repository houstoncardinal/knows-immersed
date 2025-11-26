import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Crown, Menu, X } from "lucide-react";
import { BookingModal } from "./BookingModal";
import { ThemeSwitcher } from "./ThemeSwitcher";

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
      {/* Professional Top Info Bar */}
      <div className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 py-3 hidden md:block transition-all duration-500 ${isScrolled ? "opacity-0 -translate-y-full" : "opacity-100 translate-y-0"} shadow-sm`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <a
                href="tel:3236093356"
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>323 609 3356</span>
              </a>
              <a
                href="mailto:info@knowsstudios.com"
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>info@knowsstudios.com</span>
              </a>
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="w-4 h-4" />
                <span>North Hollywood, CA</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <Crown className="w-4 h-4 text-slate-600" />
              <span className="text-slate-700 font-semibold tracking-wider uppercase">
                Professional Studio
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Main Navigation Header */}
      <header
        className={`
          fixed left-0 right-0 z-50 transition-all duration-500
          ${isScrolled
            ? "top-0 bg-white/95 backdrop-blur-sm shadow-lg border-b border-slate-200 py-4"
            : "top-0 md:top-12 bg-white/90 backdrop-blur-sm py-6"
          }
        `}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Professional Logo */}
            <div className="flex items-center">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="group"
              >
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-3">
                  <span className="group-hover:scale-105 transition-transform duration-300">
                    KNOWS
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="group-hover:scale-105 transition-transform duration-300">
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
                  className="text-sm font-semibold text-slate-600 hover:text-slate-900 hover:scale-105 transition-all duration-300 uppercase tracking-wider"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3">
              <ThemeSwitcher />
              <Button
                onClick={() => setBookingOpen(true)}
                className="hidden md:flex bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-3 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Crown className="w-4 h-4 mr-2" />
                Book Now
              </Button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200 transition-all border border-slate-200"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-slate-700" />
                ) : (
                  <Menu className="w-6 h-6 text-slate-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Professional Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 bg-white border border-slate-200 rounded-2xl mx-6 p-6 shadow-xl animate-fade-in-up">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.sectionId}
                  onClick={() => scrollToSection(item.sectionId)}
                  className="text-left text-lg font-semibold text-slate-600 hover:text-slate-900 hover:translate-x-2 transition-all duration-300 uppercase tracking-wider py-2"
                >
                  {item.label}
                </button>
              ))}

              <div className="border-t border-slate-200 pt-4 mt-4">
                <Button
                  onClick={() => {
                    setBookingOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-4 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Crown className="w-5 h-5 mr-2" />
                  Book Now
                </Button>
              </div>

              {/* Mobile Contact Info */}
              <div className="border-t border-slate-200 pt-4 mt-2 space-y-3 text-sm">
                <a
                  href="tel:3236093356"
                  className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>323 609 3356</span>
                </a>
                <a
                  href="mailto:info@knowsstudios.com"
                  className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
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
