import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Equipment } from "@/components/Equipment";
import { EnhancedGallery } from "@/components/EnhancedGallery";
import { Contact } from "@/components/Contact";
import { ParticleBackground } from "@/components/ParticleBackground";
import { StatsSection } from "@/components/StatsSection";
import { FloatingCTA } from "@/components/FloatingCTA";
import { CustomCursor } from "@/components/CustomCursor";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <CustomCursor />
      <ParticleBackground />
      <Navigation />
      <Hero />
      <StatsSection />
      <About />
      <Equipment />
      <EnhancedGallery />
      <Contact />
      <FloatingCTA />
      
      <footer className="py-8 border-t border-border bg-studio-darker">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} KNOWS STUDIOS. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
