import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Package, Wifi, Camera, Car, Droplet } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const features = [
  {
    icon: Package,
    title: "1,400 sq. ft. Warehouse",
    description: "Ideal for various production setups with ample space for equipment and crew",
  },
  {
    icon: Camera,
    title: "16x20 ft Pre-Lit Cyclorama Wall",
    description: "Equipped with DigitalFoto S300 lighting featuring full RGB capabilities",
  },
  {
    icon: CheckCircle2,
    title: "Ground-Level Access",
    description: "8 ft tilt-up garage door for easy equipment load-in and load-out",
  },
  {
    icon: Car,
    title: "Secure Parking",
    description: "Two dedicated gated parking spots with additional lot space",
  },
  {
    icon: Droplet,
    title: "Comfortable Amenities",
    description: "Full bathroom with shower and vanity room for on-site talent prep",
  },
  {
    icon: Wifi,
    title: "High-Speed Wi-Fi",
    description: "Seamless connectivity for your entire production workflow",
  },
];

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useScrollAnimation(sectionRef, 0.2);

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-gradient-to-b from-background to-studio-darker relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-neon-pink/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "4s" }} />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "6s" }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-gradient-neon">KNOWS STUDIOS</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Located in the heart of North Hollywood, KNOWS STUDIOS is a versatile creative workspace 
            designed for artists, filmmakers, and photographers. Our facility is tailored to meet diverse 
            production needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className={`bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-700 p-6 group immersive-card relative overflow-hidden ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-neon-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="w-6 h-6 text-primary group-hover:animate-float" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-gradient-neon transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm group-hover:text-foreground/80 transition-colors">
                      {feature.description}
                    </p>
                  </div>
                </div>
                {/* Corner accent */}
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/20 group-hover:border-primary/50 transition-colors duration-500" />
              </Card>
            );
          })}
        </div>

        <div className={`mt-16 text-center transition-all duration-700 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          <div className="inline-block bg-card/30 backdrop-blur-sm border border-border rounded-lg p-8 hover:border-primary/50 transition-all duration-500 group immersive-card relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h3 className="text-3xl font-bold mb-4 relative z-10">
              We offer <span className="text-gradient-neon">1,400 square feet</span>,
              <span className="text-gradient-neon"> 16ft x 20ft cyc wall</span>,
              and equipment to bring your visual needs to life.
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};
