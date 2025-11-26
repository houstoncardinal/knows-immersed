import { useRef, useEffect, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const stats = [
  { value: 1400, suffix: " sq ft", label: "Studio Space" },
  { value: 16, suffix: "x20 ft", label: "CYC Wall" },
  { value: 15, suffix: "+", label: "Equipment Options" },
  { value: 100, suffix: "%", label: "RGB Capability" },
];

export const StatsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useScrollAnimation(sectionRef, 0.3);
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    stats.forEach((stat, index) => {
      let currentStep = 0;
      const increment = stat.value / steps;

      const timer = setInterval(() => {
        currentStep++;
        setCounts((prev) => {
          const newCounts = [...prev];
          newCounts[index] = Math.min(
            Math.floor(increment * currentStep),
            stat.value
          );
          return newCounts;
        });

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, interval);
    });
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-studio-darker relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent" />
        <div className="absolute top-1/2 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-neon-pink to-transparent -translate-x-1/2" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center transform transition-all duration-700 group hover:scale-110 cursor-default ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4 relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan/20 to-neon-pink/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="text-5xl md:text-6xl font-bold text-gradient-neon block relative z-10 group-hover:scale-110 transition-transform duration-500">
                  {counts[index]}
                  {stat.suffix}
                </span>
              </div>
              <p className="text-muted-foreground uppercase tracking-wider text-sm font-medium group-hover:text-foreground transition-colors">
                {stat.label}
              </p>
              {/* Underline effect */}
              <div className="mx-auto mt-2 w-0 h-0.5 bg-gradient-to-r from-neon-cyan to-neon-pink group-hover:w-16 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
