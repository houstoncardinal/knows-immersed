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

        {/* Professional Footer */}
        <footer className="bg-slate-50 border-t border-slate-200 py-16 pb-24 lg:pb-16 relative overflow-hidden">
          {/* Subtle Background Elements */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-slate-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-slate-300/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-100/10 rounded-full blur-3xl" />

          <div className="container mx-auto px-6 relative z-10">
            {/* Professional Brand Section */}
            <div className="text-center mb-12">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-slate-900">
                <span>KNOWS</span>
                <span className="text-slate-400 mx-3">•</span>
                <span>STUDIOS</span>
              </h3>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                North Hollywood's Premier Creative Studio
                <span className="block text-sm mt-2 text-slate-500">Where Vision Meets Excellence</span>
              </p>
            </div>

            {/* Professional Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Contact Card */}
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center">
                    <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <h4 className="font-bold mb-4 text-center text-slate-900 text-xl">Contact</h4>
                <div className="space-y-3 text-center">
                  <a href="mailto:info@knowsstudios.com" className="block text-slate-600 hover:text-slate-900 transition-colors font-medium">
                    info@knowsstudios.com
                  </a>
                  <a href="tel:3236093356" className="block text-slate-600 hover:text-slate-900 transition-colors font-medium">
                    323 609 3356
                  </a>
                </div>
              </div>

              {/* Location Card */}
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center">
                    <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <h4 className="font-bold mb-4 text-center text-slate-900 text-xl">Location</h4>
                <div className="space-y-2 text-center">
                  <p className="text-slate-600">7240 Coldwater Canyon Avenue</p>
                  <p className="text-slate-600">Los Angeles, CA 91605</p>
                </div>
              </div>

              {/* Hours Card */}
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center">
                    <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <h4 className="font-bold mb-4 text-center text-slate-900 text-xl">Hours</h4>
                <div className="space-y-2 text-center">
                  <p className="text-slate-600">Monday - Sunday</p>
                  <p className="font-semibold text-slate-900">24/7 by Appointment</p>
                </div>
              </div>
            </div>

            {/* Professional Bottom Section */}
            <div className="border-t border-slate-200 pt-8 space-y-6">
              <div className="text-center">
                <p className="text-slate-600 mb-4">
                  © {new Date().getFullYear()} KNOWS STUDIOS. All rights reserved.
                </p>
                <p className="text-sm text-slate-500 mb-6">
                  Crafted with excellence for visionary creators
                </p>

                {/* Professional Trust Badges */}
                <div className="flex flex-wrap items-center justify-center gap-6 mb-6">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Professional Grade</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <span>Premium Equipment</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <div className="w-2 h-2 rounded-full bg-slate-600 animate-pulse" />
                    <span>24/7 Support</span>
                  </div>
                </div>

                {/* Cardinal Consulting Credit */}
                <div className="pt-6 border-t border-slate-200">
                  <p className="text-xs text-slate-400">
                    Designed & Developed by{" "}
                    <a
                      href="https://www.visitcardinal.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-slate-900 transition-all duration-300 font-semibold"
                    >
                      Cardinal Consulting
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(slate-300 1px, transparent 1px),
                linear-gradient(90deg, slate-300 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }} />
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
