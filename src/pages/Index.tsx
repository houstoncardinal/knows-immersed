import { useState, useEffect } from "react";
import { ProfessionalHeader } from "@/components/ProfessionalHeader";
import { LuxuryHero } from "@/components/LuxuryHero";
import { About } from "@/components/About";
import { Equipment } from "@/components/Equipment";
import { LuxuryGallery } from "@/components/LuxuryGallery";
import { Contact } from "@/components/Contact";
import { ParticleBackground } from "@/components/ParticleBackground";
import { StatsSection } from "@/components/StatsSection";
import { FloatingCTA } from "@/components/FloatingCTA";
import { MobileAppBar } from "@/components/MobileAppBar";
import { SEO, LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/SEO";
import { Testimonials } from "@/components/Testimonials";
import { PowerfulCTA } from "@/components/PowerfulCTA";
import { PowerfulBooking } from "@/components/PowerfulBooking";
import { LuxuryLoader } from "@/components/LuxuryLoader";
import { ScrollReveal } from "@/components/ScrollReveal";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ensure minimum loading time for smooth experience
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <LuxuryLoader onComplete={() => setIsLoading(false)} />}

      <div className="min-h-screen bg-background relative">
        <SEO />
        <LocalBusinessSchema />
        <OrganizationSchema />
        <BreadcrumbSchema />
        <ParticleBackground />
        <ProfessionalHeader />

        {/* Luxury Hero Section */}
        <LuxuryHero />

        {/* Stats Section with Scroll Reveal */}
        <ScrollReveal direction="up" delay={200}>
          <StatsSection />
        </ScrollReveal>

        {/* About Section with Scroll Reveal */}
        <ScrollReveal direction="up" delay={300}>
          <div id="about">
            <About />
          </div>
        </ScrollReveal>

        {/* Inline CTA */}
        <ScrollReveal direction="scale" delay={200}>
          <div className="container mx-auto px-6 py-12">
            <PowerfulCTA variant="inline" />
          </div>
        </ScrollReveal>

        {/* Powerful Booking Section */}
        <ScrollReveal direction="up" delay={200}>
          <div id="booking">
            <PowerfulBooking />
          </div>
        </ScrollReveal>

        {/* Equipment Section with Scroll Reveal */}
        <ScrollReveal direction="up" delay={200}>
          <div id="equipment">
            <Equipment />
          </div>
        </ScrollReveal>

        {/* Luxury Gallery with Lightbox */}
        <ScrollReveal direction="up" delay={200}>
          <div id="gallery">
            <LuxuryGallery />
          </div>
        </ScrollReveal>

        {/* Secondary CTA */}
        <ScrollReveal direction="scale" delay={200}>
          <div className="container mx-auto px-6 py-12">
            <PowerfulCTA variant="secondary" />
          </div>
        </ScrollReveal>

        {/* Testimonials Section with Scroll Reveal */}
        <ScrollReveal direction="up" delay={200}>
          <Testimonials />
        </ScrollReveal>

        {/* Contact Section with Scroll Reveal */}
        <ScrollReveal direction="up" delay={200}>
          <div id="contact">
            <Contact />
          </div>
        </ScrollReveal>

        <FloatingCTA />
        <MobileAppBar />

        {/* Luxury Footer */}
        <footer className="py-12 pb-24 lg:pb-12 border-t border-[hsl(var(--luxury-gold))]/20 bg-luxury-gradient relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-[hsl(var(--luxury-gold))]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-neon-cyan/5 rounded-full blur-3xl" />

          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold mb-2 luxury-text whitespace-nowrap">
                <span className="text-gradient-luxury">KNOWS</span> STUDIOS
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base">North Hollywood's Premier Creative Studio</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <h4 className="font-bold mb-2 text-gradient-neon">Contact</h4>
                <p className="text-sm text-muted-foreground">info@knowsstudios.com</p>
                <p className="text-sm text-muted-foreground">323 609 3356</p>
              </div>

              <div className="text-center">
                <h4 className="font-bold mb-2 text-gradient-neon">Location</h4>
                <p className="text-sm text-muted-foreground">7240 Coldwater Canyon Avenue</p>
                <p className="text-sm text-muted-foreground">Los Angeles, CA 91605</p>
              </div>

              <div className="text-center">
                <h4 className="font-bold mb-2 text-gradient-neon">Hours</h4>
                <p className="text-sm text-muted-foreground">Monday - Sunday</p>
                <p className="text-sm text-muted-foreground">24/7 by Appointment</p>
              </div>
            </div>

            <div className="text-center border-t border-border/50 pt-8">
              <p className="text-muted-foreground text-sm">
                © {new Date().getFullYear()} KNOWS STUDIOS. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground/60 mt-2">
                Crafted with excellence for visionary creators
              </p>
              <div className="mt-4 pt-4 border-t border-border/30">
                <p className="text-xs text-muted-foreground/40">
                  Created by{" "}
                  <a
                    href="https://www.visitcardinal.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[hsl(var(--luxury-gold))] hover:text-[hsl(var(--luxury-rose-gold))] transition-colors font-medium"
                  >
                    Cardinal Consulting
                  </a>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
