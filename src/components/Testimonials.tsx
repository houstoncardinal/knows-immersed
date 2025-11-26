import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "Sarah Martinez",
    role: "Fashion Photographer",
    rating: 5,
    text: "KNOWS STUDIOS transformed my vision into reality. The CYC wall and lighting setup are absolutely perfect for high-end fashion shoots. The space is immaculate and the equipment is top-tier.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  },
  {
    name: "Marcus Chen",
    role: "Music Video Director",
    rating: 5,
    text: "This is hands down the best studio in North Hollywood. The flexibility of the space and the professional-grade lighting made our music video shoot seamless. Will definitely be back!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  },
  {
    name: "Emily Rodriguez",
    role: "Content Creator",
    rating: 5,
    text: "Perfect studio for content creation! The natural light options combined with the professional lighting setup give me endless creative possibilities. The team is amazing too!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
  },
  {
    name: "David Thompson",
    role: "Commercial Director",
    rating: 5,
    text: "We've shot multiple commercial projects here. The ground-level access makes load-in/out a breeze, and the 1,400 sq ft gives us plenty of room for large productions. Highly recommend!",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
  },
  {
    name: "Jasmine Lee",
    role: "Portrait Photographer",
    rating: 5,
    text: "The RGB lighting capabilities are incredible! I can create any mood or atmosphere I want. The vanity room is a huge plus for my clients. This studio has everything!",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop",
  },
];

export const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useScrollAnimation(sectionRef, 0.2);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push({ ...testimonials[index], index });
    }
    return visible;
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-background to-studio-darker relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-neon-pink/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />

      <div className="container mx-auto px-6 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center justify-center gap-2 mb-6">
            <Star className="w-8 h-8 text-secondary fill-secondary animate-float" />
            <Star className="w-10 h-10 text-secondary fill-secondary animate-float" style={{ animationDelay: "0.2s" }} />
            <Star className="w-8 h-8 text-secondary fill-secondary animate-float" style={{ animationDelay: "0.4s" }} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our <span className="text-gradient-neon">Clients Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join hundreds of satisfied creators who trust KNOWS STUDIOS for their productions
          </p>
        </div>

        {/* Desktop view - 3 cards */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 mb-8">
          {getVisibleTestimonials().map((testimonial, idx) => (
            <Card
              key={`${testimonial.name}-${idx}`}
              className={`bg-card/40 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-700 p-8 group immersive-card relative overflow-hidden ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              } ${idx === 1 ? "scale-105 border-primary/30" : ""}`}
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Quote icon */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-16 h-16 text-primary" />
              </div>

              <div className="relative z-10">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-secondary fill-secondary group-hover:scale-110 transition-transform"
                      style={{ transitionDelay: `${i * 0.05}s` }}
                    />
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="text-foreground/90 mb-6 text-sm leading-relaxed group-hover:text-foreground transition-colors">
                  "{testimonial.text}"
                </p>

                {/* Author info */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan to-neon-pink rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity" />
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-primary/20 group-hover:border-primary/50 transition-all relative z-10"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-foreground group-hover:text-gradient-neon transition-colors">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Corner accent */}
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-primary/20 group-hover:border-primary/50 transition-colors duration-500" />
            </Card>
          ))}
        </div>

        {/* Mobile view - 1 card */}
        <div className="md:hidden mb-8">
          <Card
            className={`bg-card/40 backdrop-blur-sm border-border border-primary/30 transition-all duration-700 p-8 group relative overflow-hidden ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-pink/5 opacity-50" />

            <div className="absolute top-4 right-4 opacity-20">
              <Quote className="w-16 h-16 text-primary" />
            </div>

            <div className="relative z-10">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-secondary fill-secondary"
                  />
                ))}
              </div>

              <p className="text-foreground/90 mb-6 text-sm leading-relaxed">
                "{testimonials[currentIndex].text}"
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/50"
                />
                <div>
                  <p className="font-bold text-foreground">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <Button
            onClick={prevTestimonial}
            variant="outline"
            size="icon"
            className="border-primary/50 hover:border-primary hover:bg-primary/10 transition-all group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </Button>

          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary w-8"
                    : "bg-primary/30 hover:bg-primary/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <Button
            onClick={nextTestimonial}
            variant="outline"
            size="icon"
            className="border-primary/50 hover:border-primary hover:bg-primary/10 transition-all group"
          >
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};
