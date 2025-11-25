const images = [
  {
    url: "https://cdn.prod.website-files.com/603f0d7b7e27fb06f0e8ba33/6410f68e1714e4bfddcd18c3_DSC08256.jpg",
    alt: "Pre lit CYC Wall in North Hollywood with ground access",
  },
  {
    url: "https://cdn.prod.website-files.com/603f0d7b7e27fb06f0e8ba33/6410f68ef34a99a96f777dbc_DSC08280.jpg",
    alt: "The cyc wall is 16x20 feet with ground level access",
  },
  {
    url: "https://cdn.prod.website-files.com/603f0d7b7e27fb06f0e8ba33/6410f68d522d53663f34fe07_DSC08264.jpg",
    alt: "Studio interior view",
  },
  {
    url: "https://cdn.prod.website-files.com/603f0d7b7e27fb06f0e8ba33/64118819b1b54f569e48f9e1_knows-vanity-room.jpg",
    alt: "Vanity room in Los Angeles, North Hollywood convenient for on site talent",
  },
  {
    url: "https://cdn.prod.website-files.com/603f0d7b7e27fb06f0e8ba33/6410f68ea7be8de9686359b3_DSC08307.jpg",
    alt: "Our green screen in Los Angeles is 12 feet wide",
  },
  {
    url: "https://cdn.prod.website-files.com/603f0d7b7e27fb06f0e8ba33/6410f68e9398222302918dba_DSC08300.jpg",
    alt: "We also have a tech blue 9 foot screen on site",
  },
  {
    url: "https://cdn.prod.website-files.com/603f0d7b7e27fb06f0e8ba33/6410f68e36a9bb31a40f80aa_DSC08336.jpg",
    alt: "Our CYC wall in Los Angeles uses industry standard lighting",
  },
  {
    url: "https://cdn.prod.website-files.com/603f0d7b7e27fb06f0e8ba33/6410f68d0322f8da5803d234_DSC08260.jpg",
    alt: "Multicolor CYC wall in North Hollywood",
  },
];

export const Gallery = () => {
  return (
    <section id="gallery" className="py-24 bg-gradient-to-b from-studio-darker to-background">
      <div className="container mx-auto px-6">
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
              className="relative group overflow-hidden rounded-lg aspect-square cursor-pointer"
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-studio-darker/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-sm text-foreground/90">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
