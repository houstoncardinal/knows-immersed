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
          filter: "brightness(0.3) contrast(1.2) saturate(0.9) grayscale(0.2)",
          transform: `translateY(${offsetY * 0.2}px) scale(1.1)`,
        }}
      />

      {/* Enhanced Professional Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-slate-100/60 z-10" />

      {/* Professional Content Container */}
      <div className="relative z-20 container mx-auto px-6 text-center pt-32 md:pt-40">
        <div className="max-w-6xl mx-auto">

          {/* Professional Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-full text-sm font-semibold text-slate-700 mb-8 shadow-lg">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            North Hollywood's Premier Creative Studio
          </div>

          {/* Main Headline with Enhanced Readability */}
          <div className="mb-12">
            <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-bold leading-none mb-6 text-slate-900 drop-shadow-sm">
              <span className="block mb-4 text-slate-900" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
                KNOWS
              </span>
              <span className="block text-slate-700" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
                STUDIOS
              </span>
            </h1>

            {/* Decorative Line */}
            <div className="w-32 h-1 bg-gradient-to-r from-slate-400 to-slate-500 mx-auto mb-8 rounded-full shadow-sm"></div>
          </div>

          {/* Professional Subheading */}
          <div className="mb-12 max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-6 leading-tight" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.05)' }}>
              Professional CYC Wall Studio
              <br />
              <span className="text-slate-600 font-medium">for Film & Photography</span>
            </h2>

            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-medium">
              Where creativity meets precision. A world-class facility designed for visionary artists,
              acclaimed filmmakers, and professional photographers seeking excellence.
            </p>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button
              onClick={() => setBookingOpen(true)}
              size="lg"
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xl px-16 py-8 shadow-2xl hover:shadow-3xl transition-all duration-300 group border-2 border-slate-800"
            >
              <Crown className="mr-4 w-6 h-6 group-hover:rotate-12 transition-transform" />
              Reserve Your Session
              <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              onClick={scrollToAbout}
              size="lg"
              variant="outline"
              className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xl px-16 py-8 shadow-xl hover:shadow-2xl transition-all duration-300 group bg-white/90 backdrop-blur-sm"
            >
              <Play className="mr-4 w-6 h-6 group-hover:scale-110 transition-transform" />
              Explore Studio
            </Button>
          </div>

          {/* Professional Trust & Reviews */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-center">
              {/* Rating Display */}
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Sparkles key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <div className="text-2xl font-bold text-slate-900 mb-1">5.0</div>
                <div className="text-sm text-slate-600">Average Rating</div>
              </div>

              {/* Review Count */}
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-slate-900 mb-1">150+</div>
                <div className="text-sm text-slate-600">Verified Reviews</div>
              </div>

              {/* Professional Accreditation */}
              <div className="flex flex-col items-center">
                <Crown className="w-6 h-6 text-slate-700 mb-2" />
                <div className="text-sm font-semibold text-slate-900">Industry Certified</div>
                <div className="text-xs text-slate-600">Professional Standards</div>
              </div>
            </div>

            {/* Review Links */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <button className="text-slate-700 hover:text-slate-900 font-medium text-sm underline underline-offset-4 hover:underline-offset-2 transition-all duration-200">
                View Google Reviews →
              </button>
              <button className="text-slate-700 hover:text-slate-900 font-medium text-sm underline underline-offset-4 hover:underline-offset-2 transition-all duration-200">
                Read Testimonials →
              </button>
              <button className="text-slate-700 hover:text-slate-900 font-medium text-sm underline underline-offset-4 hover:underline-offset-2 transition-all duration-200">
                Client Gallery →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-10 h-14 border-2 border-slate-400 rounded-full flex items-start justify-center p-3 bg-white/90 backdrop-blur-sm shadow-lg">
          <div className="w-2 h-5 bg-slate-500 rounded-full animate-pulse" />
        </div>
        <p className="text-sm text-slate-600 mt-3 tracking-wider uppercase font-semibold">Scroll to explore</p>
      </div>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </section>
  );
};
