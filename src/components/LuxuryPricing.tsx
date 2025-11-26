import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Star, Crown, Sparkles, Zap } from "lucide-react";
import { BookingModal } from "./BookingModal";

interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  price: number;
  duration: string;
  icon: typeof Star;
  gradient: string;
  features: string[];
  exclusive: string[];
  popular?: boolean;
  luxury?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    id: "essential",
    name: "Essential",
    tagline: "Perfect for Quick Sessions",
    price: 250,
    duration: "Half Day (4 hours)",
    icon: Sparkles,
    gradient: "from-blue-500/20 to-cyan-500/20",
    features: [
      "4 Hours Studio Access",
      "Basic Lighting Setup",
      "WiFi & Parking Included",
      "Green Screen Available",
      "Sound System Access",
    ],
    exclusive: [],
  },
  {
    id: "professional",
    name: "Professional",
    tagline: "Most Popular Choice",
    price: 450,
    duration: "Full Day (8 hours)",
    icon: Star,
    gradient: "from-neon-cyan/20 to-neon-pink/20",
    features: [
      "8 Hours Studio Access",
      "Professional Lighting Package",
      "WiFi & Parking Included",
      "Green Screen Available",
      "Premium Sound System",
      "Equipment Storage",
      "Makeup/Wardrobe Area",
      "Kitchen Access",
    ],
    exclusive: [
      "Priority Booking",
      "Flexible Overtime Options",
    ],
    popular: true,
  },
  {
    id: "platinum",
    name: "Platinum VIP",
    tagline: "Ultimate Creative Experience",
    price: 1200,
    duration: "3 Days Package",
    icon: Crown,
    gradient: "from-[hsl(var(--luxury-gold))]/20 to-[hsl(var(--luxury-rose-gold))]/20",
    features: [
      "24 Hours Total Studio Access",
      "Premium Lighting & Grip Package",
      "WiFi & Reserved Parking",
      "Green Screen & Cyc Wall",
      "Premium Sound & Monitors",
      "Dedicated Equipment Storage",
      "Full Kitchen & Lounge Access",
      "Makeup/Wardrobe Suite",
    ],
    exclusive: [
      "Complimentary Studio Assistant",
      "Priority 24/7 Support",
      "Equipment Delivery Service",
      "Free Reshoot Day (within 30 days)",
      "VIP Client Status",
      "Exclusive Networking Events",
    ],
    luxury: true,
  },
];

export const LuxuryPricing = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const handleBooking = (tierId: string) => {
    setSelectedTier(tierId);
    setBookingOpen(true);
  };

  return (
    <section className="py-24 bg-luxury-gradient overflow-hidden relative">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[hsl(var(--luxury-gold))]/10 rounded-full blur-3xl animate-float-3d" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-pink/10 rounded-full blur-3xl animate-float-3d" style={{ animationDelay: "2s" }} />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-cinematic-reveal">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[hsl(var(--luxury-gold))] to-transparent" />
            <Zap className="w-6 h-6 text-[hsl(var(--luxury-gold))] animate-pulse-luxury" />
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[hsl(var(--luxury-gold))] to-transparent" />
          </div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6 luxury-text">
            Premium <span className="text-gradient-luxury">Packages</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the perfect package for your creative vision. All packages include our world-class facilities and professional support.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingTiers.map((tier, index) => {
            const Icon = tier.icon;
            const isPopular = tier.popular;
            const isLuxury = tier.luxury;

            return (
              <div
                key={tier.id}
                className={`relative group animate-scale-in ${isLuxury ? "md:-mt-8" : ""}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-neon-cyan to-neon-pink px-6 py-2 rounded-full text-sm font-bold text-white shadow-luxury-lg animate-pulse-glow">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                {/* Luxury Badge */}
                {isLuxury && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-[hsl(var(--luxury-gold))] to-[hsl(var(--luxury-rose-gold))] px-6 py-2 rounded-full text-sm font-bold text-black shadow-luxury-xl animate-pulse-luxury">
                      <Crown className="w-4 h-4 inline mr-2" />
                      VIP EXPERIENCE
                    </div>
                  </div>
                )}

                {/* Card */}
                <div
                  className={`
                    relative h-full rounded-2xl p-8
                    ${isLuxury ? "glass-luxury luxury-card-3d shadow-luxury-xl" : "glass-morphism hover-luxury shadow-luxury-md"}
                    ${isPopular ? "border-2 border-primary/30" : ""}
                    ${isLuxury ? "border-2 border-[hsl(var(--luxury-gold))]/30" : ""}
                  `}
                >
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${tier.gradient} rounded-2xl opacity-50 pointer-events-none`} />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`inline-flex p-4 rounded-2xl mb-6 ${isLuxury ? "bg-gradient-to-br from-[hsl(var(--luxury-gold))] to-[hsl(var(--luxury-rose-gold))]" : "bg-gradient-to-br from-neon-cyan to-neon-pink"} shadow-luxury-md`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Tier Name */}
                    <h3 className={`text-3xl font-bold mb-2 ${isLuxury ? "text-gradient-luxury" : ""}`}>
                      {tier.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">{tier.tagline}</p>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className={`text-5xl font-bold ${isLuxury ? "text-shimmer-luxury" : "text-gradient-neon"}`}>
                          ${tier.price}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{tier.duration}</p>
                    </div>

                    {/* CTA Button */}
                    <Button
                      onClick={() => handleBooking(tier.id)}
                      className={`w-full mb-8 text-lg py-6 ${isLuxury
                        ? "bg-gradient-to-r from-[hsl(var(--luxury-gold))] to-[hsl(var(--luxury-rose-gold))] hover:opacity-90 text-black font-bold shadow-luxury-lg"
                        : isPopular
                          ? "bg-gradient-to-r from-neon-cyan to-neon-pink hover:opacity-90 text-white font-bold"
                          : "bg-card hover:bg-card/80 border border-primary/30"
                      }`}
                    >
                      {isLuxury ? "Reserve VIP Experience" : "Book Now"}
                    </Button>

                    {/* Features */}
                    <div className="space-y-4">
                      <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        Included Features
                      </div>
                      {tier.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className={`p-1 rounded-full mt-0.5 ${isLuxury ? "bg-[hsl(var(--luxury-gold))]/20" : "bg-primary/20"}`}>
                            <Check className={`w-4 h-4 ${isLuxury ? "text-[hsl(var(--luxury-gold))]" : "text-primary"}`} />
                          </div>
                          <span className="text-sm text-foreground">{feature}</span>
                        </div>
                      ))}

                      {/* Exclusive Features */}
                      {tier.exclusive.length > 0 && (
                        <>
                          <div className="border-t border-border/50 pt-4 mt-6">
                            <div className="text-sm font-semibold text-gradient-luxury uppercase tracking-wider mb-3 flex items-center gap-2">
                              <Sparkles className="w-4 h-4" />
                              Exclusive Benefits
                            </div>
                          </div>
                          {tier.exclusive.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className="p-1 rounded-full bg-[hsl(var(--luxury-gold))]/20 mt-0.5">
                                <Star className="w-4 h-4 text-[hsl(var(--luxury-gold))] fill-[hsl(var(--luxury-gold))]" />
                              </div>
                              <span className="text-sm font-medium text-foreground">{feature}</span>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-slide-in-up" style={{ animationDelay: "0.8s" }}>
          <p className="text-muted-foreground mb-4">
            Need a custom package?{" "}
            <a href="#contact" className="text-gradient-luxury font-semibold hover:underline">
              Contact us
            </a>{" "}
            for tailored solutions
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span>Flexible Scheduling</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span>Professional Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span>Premium Equipment</span>
            </div>
          </div>
        </div>
      </div>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </section>
  );
};
