import { useState } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight, Grid3x3, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GalleryImage {
  id: number;
  url: string;
  category: string;
  title: string;
  description: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    url: "/images/6410f68e1714e4bfddcd18c3_DSC08256.jpg",
    category: "Studio",
    title: "Main Studio Space",
    description: "Our premium 2,000 sq ft cyclorama wall studio"
  },
  {
    id: 2,
    url: "/images/6410f68ef34a99a96f777dbc_DSC08280.jpg",
    category: "Studio",
    title: "Studio Interior",
    description: "Professional studio environment with premium lighting"
  },
  {
    id: 3,
    url: "/images/6410f68d522d53663f34fe07_DSC08264.jpg",
    category: "Studio",
    title: "CYC Wall Setup",
    description: "Our signature cyclorama wall for seamless backgrounds"
  },
  {
    id: 4,
    url: "/images/64118819b1b54f569e48f9e1_knows-vanity-room.jpg",
    category: "Studio",
    title: "Vanity Room",
    description: "Comfortable preparation area for talent and clients"
  },
  {
    id: 5,
    url: "/images/6410f68ea7be8de9686359b3_DSC08307.jpg",
    category: "Equipment",
    title: "Professional Equipment",
    description: "State-of-the-art cameras and production gear"
  },
  {
    id: 6,
    url: "/images/6410f68e9398222302918dba_DSC08300.jpg",
    category: "Equipment",
    title: "Lighting Setup",
    description: "Professional lighting equipment and accessories"
  },
  {
    id: 7,
    url: "/images/6410f68e36a9bb31a40f80aa_DSC08336.jpg",
    category: "Studio",
    title: "Production Area",
    description: "Versatile space for film and photography productions"
  },
  {
    id: 8,
    url: "/images/6410f68d0322f8da5803d234_DSC08260.jpg",
    category: "Studio",
    title: "Creative Workspace",
    description: "Modern studio environment designed for creativity"
  },
];

const categories = ["All", "Studio", "Equipment"];

export const LuxuryGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number>(0);

  const filteredImages =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <section id="gallery" className="py-24 bg-studio-darker relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[hsl(var(--luxury-gold))]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-cinematic-reveal">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[hsl(var(--luxury-gold))] to-transparent" />
            <ImageIcon className="w-6 h-6 text-[hsl(var(--luxury-gold))] animate-pulse-luxury" />
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[hsl(var(--luxury-gold))] to-transparent" />
          </div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6 luxury-text">
            Studio <span className="text-gradient-luxury">Gallery</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our world-class facilities and see the magic created by talented artists
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-12 animate-slide-in-up">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-6 py-3 rounded-full font-semibold transition-all duration-300
                ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-[hsl(var(--luxury-gold))] to-[hsl(var(--luxury-rose-gold))] text-black shadow-luxury-lg scale-105"
                    : "glass-morphism hover:glass-luxury hover:scale-105 shadow-luxury-sm"
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-2xl luxury-card-3d cursor-pointer animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => openLightbox(index)}
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="inline-block px-3 py-1 rounded-full bg-[hsl(var(--luxury-gold))]/20 text-[hsl(var(--luxury-gold))] text-xs font-semibold mb-3">
                    {image.category}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{image.title}</h3>
                  <p className="text-sm text-muted-foreground">{image.description}</p>
                </div>

                {/* Zoom Icon */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-12 h-12 rounded-full glass-luxury flex items-center justify-center shadow-luxury-md">
                    <ZoomIn className="w-6 h-6 text-[hsl(var(--luxury-gold))]" />
                  </div>
                </div>
              </div>

              {/* Animated Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[hsl(var(--luxury-gold))]/50 rounded-2xl transition-colors duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center luxury-backdrop animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-10 w-14 h-14 rounded-full glass-luxury flex items-center justify-center hover:bg-white/10 transition-colors shadow-luxury-lg group"
          >
            <X className="w-7 h-7 text-white group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-6 z-10 w-14 h-14 rounded-full glass-luxury flex items-center justify-center hover:bg-white/10 transition-colors shadow-luxury-lg group"
          >
            <ChevronLeft className="w-8 h-8 text-white group-hover:-translate-x-1 transition-transform" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-6 z-10 w-14 h-14 rounded-full glass-luxury flex items-center justify-center hover:bg-white/10 transition-colors shadow-luxury-lg group"
          >
            <ChevronRight className="w-8 h-8 text-white group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Image Container */}
          <div
            className="relative max-w-7xl max-h-[90vh] mx-auto px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-luxury-xl animate-scale-in">
              <img
                src={filteredImages[selectedImage].url}
                alt={filteredImages[selectedImage].title}
                className="max-w-full max-h-[85vh] object-contain"
              />

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 glass-luxury p-6 m-4 rounded-xl">
                <div className="inline-block px-3 py-1 rounded-full bg-[hsl(var(--luxury-gold))]/20 text-[hsl(var(--luxury-gold))] text-xs font-semibold mb-3">
                  {filteredImages[selectedImage].category}
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gradient-luxury">
                  {filteredImages[selectedImage].title}
                </h3>
                <p className="text-muted-foreground">
                  {filteredImages[selectedImage].description}
                </p>
                <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <span>
                    {selectedImage + 1} / {filteredImages.length}
                  </span>
                  <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[hsl(var(--luxury-gold))] to-[hsl(var(--luxury-rose-gold))]"
                      style={{
                        width: `${((selectedImage + 1) / filteredImages.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
