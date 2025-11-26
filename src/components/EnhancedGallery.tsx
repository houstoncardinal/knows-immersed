import { useState, useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const images = [
  {
    url: "https://cdn.prod.website-files.com/603f0d7b7e27fb06f0e8ba33/6410f68e1714e4bfddcd18c3_DSC08256.jpg",
    alt: "Pre lit CYC Wall in North Hollywood with ground access",
    category: "CYC Wall",
  },
  {
    url: "https://cdn.prod.website-files.com/603f0d7b7e27fb06f0e8ba33/6410f68ef34a99a96f777dbc_DSC08280.jpg",
    alt: "The cyc wall is 16x20 feet with ground level access",
    category: "CYC Wall",
  },
  {
    url: "https://cdn.prod.website-files.com/603f0d7b7e27fb06f0e8ba33/6410f68d522d53663f34fe07_DSC08264.jpg",
    alt: "Studio interior view",
    category: "Interior",
  },
  {
    url: "https://cdn.prod.website-files.com/603f0d7b7e27fb06f0e8ba33/64118819b1b54f569e48f9e1_knows-vanity-room.jpg",
    alt: "Vanity room in Los Angeles, North Hollywood convenient for on site talent",
    category: "Amenities",
  },
  {
    url: "https://cdn.prod.website-files.com/603f0d7b7e27fb06f0e8ba33/6410f68ea7be8de9686359b3_DSC08307.jpg",
    alt: "Our green screen in Los Angeles is 12 feet wide",
    category: "Backdrops",
  },
  {
    url: "https://cdn.prod.website-files.com/603f0d7b7e27fb06f0e8ba33/6410f68e9398222302918dba_DSC08300.jpg",
    alt: "We also have a tech blue 9 foot screen on site",
    category: "Backdrops",
  },
  {
    url: "https://cdn.prod.website-files.com/603f0d7b7e27fb06f0e8ba33/6410f68e36a9bb31a40f80aa_DSC08336.jpg",
    alt: "Our CYC wall in Los Angeles uses industry standard lighting",
    category: "Lighting",
  },
  {
    url: "https://cdn.prod.website-files.com/603f0d7b7e27fb06f0e8ba33/6410f68d0322f8da5803d234_DSC08260.jpg",
    alt: "Multicolor CYC wall in North Hollywood",
    category: "CYC Wall",
  },
];

export const EnhancedGallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useScrollAnimation(sectionRef, 0.1);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <section
        id="gallery"
        ref={sectionRef}
        className="py-24 bg-gradient-to-b from-studio-darker to-background relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-neon-cyan/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-pink/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Studio <span className="text-gradient-neon">Gallery</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Explore our versatile space and professional equipment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className={`relative group overflow-hidden rounded-lg aspect-square cursor-pointer immersive-card ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: `${index * 0.1}s`,
                  transformStyle: "preserve-3d",
                }}
                onClick={() => openLightbox(index)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 to-neon-pink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75 group-hover:saturate-150"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-studio-darker via-studio-darker/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-end p-6 z-20">
                  <span className="text-xs font-bold text-primary mb-2 tracking-wider uppercase animate-shimmer">
                    {image.category}
                  </span>
                  <p className="text-sm text-foreground/90 text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{image.alt}</p>
                </div>

                {/* Animated border */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent animate-shimmer" />
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-pink to-transparent animate-shimmer" />
                  <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-neon-cyan to-transparent animate-shimmer" />
                  <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-neon-pink to-transparent animate-shimmer" />
                </div>

                {/* Corner accents */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-studio-darker/95 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in">
          <Button
            onClick={closeLightbox}
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-foreground hover:text-primary z-10"
          >
            <X className="w-8 h-8" />
          </Button>

          <Button
            onClick={prevImage}
            variant="ghost"
            size="icon"
            className="absolute left-4 text-foreground hover:text-primary z-10"
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>

          <Button
            onClick={nextImage}
            variant="ghost"
            size="icon"
            className="absolute right-4 text-foreground hover:text-primary z-10"
          >
            <ChevronRight className="w-8 h-8" />
          </Button>

          <div className="max-w-6xl max-h-[90vh] relative">
            <img
              src={images[currentIndex].url}
              alt={images[currentIndex].alt}
              className="max-w-full max-h-[90vh] object-contain rounded-lg animate-scale-in"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-studio-darker to-transparent p-6 rounded-b-lg">
              <span className="text-xs font-bold text-primary mb-2 tracking-wider block">
                {images[currentIndex].category}
              </span>
              <p className="text-foreground">{images[currentIndex].alt}</p>
              <p className="text-muted-foreground text-sm mt-2">
                {currentIndex + 1} / {images.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
