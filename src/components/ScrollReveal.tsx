import { useEffect, useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade";
  className?: string;
}

export const ScrollReveal = ({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: ScrollRevealProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("revealed");
            }, delay);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [delay]);

  const getDirectionClass = () => {
    switch (direction) {
      case "up":
        return "opacity-0 translate-y-16";
      case "down":
        return "opacity-0 -translate-y-16";
      case "left":
        return "opacity-0 translate-x-16";
      case "right":
        return "opacity-0 -translate-x-16";
      case "scale":
        return "opacity-0 scale-90";
      case "fade":
        return "opacity-0";
      default:
        return "opacity-0 translate-y-16";
    }
  };

  return (
    <div
      ref={elementRef}
      className={`
        ${getDirectionClass()}
        transition-all duration-1000 ease-out
        [&.revealed]:opacity-100
        [&.revealed]:translate-y-0
        [&.revealed]:translate-x-0
        [&.revealed]:scale-100
        ${className}
      `}
    >
      {children}
    </div>
  );
};
