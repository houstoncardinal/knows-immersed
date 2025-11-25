import { Card } from "@/components/ui/card";
import { CheckCircle2, Package, Wifi, Camera, Car, Droplet } from "lucide-react";

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
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-background to-studio-darker">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-slide-up">
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
                className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 p-6 group hover:scale-105"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-card/30 backdrop-blur-sm border border-border rounded-lg p-8">
            <h3 className="text-3xl font-bold mb-4">
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
