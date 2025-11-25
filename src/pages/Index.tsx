import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Equipment } from "@/components/Equipment";
import { Gallery } from "@/components/Gallery";
import { Contact } from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <About />
      <Equipment />
      <Gallery />
      <Contact />
      
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
