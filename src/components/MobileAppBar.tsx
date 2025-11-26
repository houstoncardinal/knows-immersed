import { useState, useEffect } from "react";
import { Home, Info, Camera, Calendar, Mail, Menu } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: Home, href: "#" },
  { id: "about", label: "About", icon: Info, href: "#about" },
  { id: "gallery", label: "Gallery", icon: Camera, href: "#gallery" },
  { id: "booking", label: "Book", icon: Calendar, href: "#booking" },
  { id: "contact", label: "Contact", icon: Mail, href: "#contact" },
];

export const MobileAppBar = () => {
  const [activeItem, setActiveItem] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      // Update active item based on scroll position
      const sections = navItems.map(item => ({
        id: item.id,
        element: document.querySelector(item.href),
      }));

      const currentSection = sections.find((section) => {
        if (!section.element) return false;
        const rect = section.element.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom >= 150;
      });

      if (currentSection) {
        setActiveItem(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    setActiveItem(id);

    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(href);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <>
      {/* Mobile Bottom Navigation - Always visible on mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
        {/* Backdrop with blur */}
        <div className="absolute inset-0 bg-studio-darker/95 backdrop-blur-xl border-t border-primary/20" />

        {/* Glow effect */}
        <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-50" />

        {/* Navigation Items */}
        <div className="relative flex items-center justify-around px-2 py-3 safe-area-bottom">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href, item.id)}
                className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "text-primary scale-105"
                    : "text-muted-foreground hover:text-foreground active:scale-95"
                }`}
              >
                <div
                  className={`relative flex items-center justify-center transition-all duration-300 ${
                    isActive ? "scale-110" : ""
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-all duration-300 ${
                      isActive ? "drop-shadow-[0_0_8px_hsl(var(--neon-cyan))]" : ""
                    }`}
                  />
                  {isActive && (
                    <div className="absolute inset-0 bg-neon-cyan/20 rounded-full blur-md animate-pulse" />
                  )}
                </div>
                <span
                  className={`text-[10px] font-medium transition-all duration-300 ${
                    isActive ? "opacity-100 font-semibold" : "opacity-70"
                  }`}
                >
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>

        {/* Active indicator */}
        <div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-neon-cyan to-neon-pink transition-all duration-500 ease-out"
          style={{
            width: `${100 / navItems.length}%`,
            transform: `translateX(${navItems.findIndex((item) => item.id === activeItem) * 100}%)`,
          }}
        />
      </nav>

      {/* Safe area padding for devices with notches/home indicators */}
      <style>{`
        @supports (padding-bottom: env(safe-area-inset-bottom)) {
          .safe-area-bottom {
            padding-bottom: calc(0.75rem + env(safe-area-inset-bottom));
          }
        }
      `}</style>
    </>
  );
};
