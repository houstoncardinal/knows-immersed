import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles, Crown } from "lucide-react";
import { useParallax } from "@/hooks/useScrollAnimation";
import { useEffect, useState } from "react";
import { BookingModal } from "./BookingModal";

export const LuxuryHero = () => {
  const offsetY = useParallax();
  const [bookingOpen, setBookingOpen] = useState(false);

  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Professional Background Image */}
      <div
        className="absolute inset-0 z-0 transition-transform duration-500 ease-out"
        style={{
          backgroundImage: "url('/images/6410f68e1714e4bfddcd18c3_DSC08256.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.4) contrast(1.1) saturate(0.8) grayscale(0.1)",
          transform: `translateY(${offsetY * 0.2}px) scale(1.1)`,
        }}
      />

      {/* Professional Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/50 to-slate-50/85 z-10" />

      {/* Subtle Professional Elements */}
      <div className="absolute inset-0 z-10 opacity-30">
        <div className="absolute top-20 left-20 w-64 h-64 bg-slate-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-16 w-96 h-96 bg-slate-300/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-slate-100/10 rounded-full blur-3xl" />
      </div>

      {/* Professional Grid Pattern */}
      <div className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(slate-300 1px, transparent 1px),
            linear-gradient(90deg, slate-300 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-6 text-center pt-32 md:pt-40">

        {/* Professional Headline */}
        <div className="mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-slate-100 border border-slate-200 rounded-full text-sm font-medium text-slate-700 mb-8">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            North Hollywood's Premier Creative Studio
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight text-slate-900">
            <span className="block mb-4">KNOWS</span>
            <span className="block text-slate-700">STUDIOS</span>
          </h1>

          <div className="w-24 h-1 bg-gradient-to-r from-slate-300 to-slate-400 mx-auto mb-8 rounded-full"></div>

          <p className="text-xl md:text-2xl text-slate-600 mb-6 max-w-4xl mx-auto font-light leading-relaxed">
            Professional CYC Wall Studio for Film & Photography
          </p>

          <p className="text-lg text-slate-500 mb-12 max-w-3xl mx-auto leading-relaxed">
            Where creativity meets precision. A world-class facility designed for visionary artists,
            acclaimed filmmakers, and professional photographers seeking excellence.
          </p>
        </div>

        {/* Professional CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <Button
            onClick={() => setBookingOpen(true)}
            size="lg"
            className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-lg px-12 py-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <Crown className="mr-3 w-5 h-5 group-hover:rotate-12 transition-transform" />
            Reserve Your Session
            <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button
            onClick={scrollToAbout}
            size="lg"
            variant="outline"
            className="border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-lg px-12 py-6 shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <Play className="mr-3 w-5 h-5 group-hover:scale-110 transition-transform" />
            Explore Studio
          </Button>
        </div>

        {/* Professional Trust Indicators */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          <div className="text-center">
            <div className="w-16 h-16 bg-slate-100 border border-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-slate-600" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">5-Star Rated</h3>
            <p className="text-sm text-slate-500">Trusted by industry professionals</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-slate-100 border border-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Crown className="w-8 h-8 text-slate-600" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Premium Service</h3>
            <p className="text-sm text-slate-500">Dedicated support & VIP treatment</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-slate-100 border border-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-slate-600" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Professional Equipment</h3>
            <p className="text-sm text-slate-500">Industry-leading gear & technology</p>
          </div>
        </div>
      </div>

      {/* Professional Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-8 h-12 border-2 border-slate-300 rounded-full flex items-start justify-center p-2 bg-white/80 backdrop-blur-sm shadow-sm">
          <div className="w-1.5 h-4 bg-slate-400 rounded-full animate-pulse" />
        </div>
        <p className="text-xs text-slate-500 mt-2 tracking-wider uppercase font-medium">Scroll to explore</p>
      </div>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </section>
  );
};
