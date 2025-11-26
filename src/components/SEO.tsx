import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const SEO = ({
  title = "KNOWS STUDIOS - Premier CYC Wall Film & Photography Studio in North Hollywood",
  description = "North Hollywood's premier 1,400 sq ft creative workspace featuring a 16x20ft pre-lit CYC wall, professional lighting, and equipment rentals. Perfect for filmmakers, photographers, and content creators.",
  image = "https://cdn.prod.website-files.com/603f0d7b7e27fb06f0e8ba33/6410f68e1714e4bfddcd18c3_DSC08256.jpg",
  url = "https://knowsstudios.com",
  type = "website",
}: SEOProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector);

      if (!element) {
        element = document.createElement("meta");
        if (property) {
          element.setAttribute("property", name);
        } else {
          element.setAttribute("name", name);
        }
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    // Standard meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", "CYC wall, film studio, photography studio, North Hollywood, Los Angeles, green screen, professional lighting, content creation, video production, photo studio rental");
    updateMetaTag("author", "KNOWS STUDIOS");
    updateMetaTag("robots", "index, follow");
    updateMetaTag("viewport", "width=device-width, initial-scale=1.0");

    // Open Graph meta tags
    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:image", image, true);
    updateMetaTag("og:url", url, true);
    updateMetaTag("og:type", type, true);
    updateMetaTag("og:site_name", "KNOWS STUDIOS", true);
    updateMetaTag("og:locale", "en_US", true);

    // Twitter Card meta tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", image);

    // Additional SEO meta tags
    updateMetaTag("theme-color", "#00ffff");
    updateMetaTag("apple-mobile-web-app-capable", "yes");
    updateMetaTag("apple-mobile-web-app-status-bar-style", "black-translucent");

    // Geo tags for local SEO
    updateMetaTag("geo.region", "US-CA");
    updateMetaTag("geo.placename", "North Hollywood");
    updateMetaTag("geo.position", "34.1718;-118.3761");
    updateMetaTag("ICBM", "34.1718, -118.3761");

    // Business info
    updateMetaTag("business:contact_data:street_address", "7240 Coldwater Canyon Avenue");
    updateMetaTag("business:contact_data:locality", "Los Angeles");
    updateMetaTag("business:contact_data:region", "CA");
    updateMetaTag("business:contact_data:postal_code", "91605");
    updateMetaTag("business:contact_data:country_name", "United States");

  }, [title, description, image, url, type]);

  return null;
};

// Schema.org JSON-LD markup for Local Business
export const LocalBusinessSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://knowsstudios.com/#business",
    "name": "KNOWS STUDIOS",
    "image": [
      "https://cdn.prod.website-files.com/603f0d7b7e27fb06f0e8ba33/6410f68e1714e4bfddcd18c3_DSC08256.jpg",
      "https://cdn.prod.website-files.com/603f0d7b7e27fb06f0e8ba33/6410f68ef34a99a96f777dbc_DSC08280.jpg",
      "https://cdn.prod.website-files.com/603f0d7b7e27fb06f0e8ba33/6410f68d522d53663f34fe07_DSC08264.jpg"
    ],
    "description": "North Hollywood's premier 1,400 sq ft creative workspace featuring a 16x20ft pre-lit CYC wall, professional lighting, and equipment rentals. Perfect for filmmakers, photographers, and content creators.",
    "url": "https://knowsstudios.com",
    "telephone": "+1-323-609-3356",
    "email": "info@knowsstudios.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "7240 Coldwater Canyon Avenue",
      "addressLocality": "Los Angeles",
      "addressRegion": "CA",
      "postalCode": "91605",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 34.1718,
      "longitude": -118.3761
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "priceRange": "$$$",
    "sameAs": [
      "https://www.peerspace.com/pages/listings/5d36714b581d66000fc2f9a2"
    ],
    "areaServed": {
      "@type": "City",
      "name": "Los Angeles"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Studio Rental Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Half Day Studio Rental",
            "description": "4 hours of studio time with basic lighting setup and green screen access"
          },
          "price": "250",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Full Day Studio Rental",
            "description": "8 hours of studio time with full lighting control and all backdrops"
          },
          "price": "450",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Multi-Day Studio Rental",
            "description": "3+ days booking with discounted rate and priority scheduling"
          },
          "price": "400",
          "priceCurrency": "USD"
        }
      ]
    },
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "CYC Wall",
        "value": "16x20 ft pre-lit cyclorama wall"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Studio Space",
        "value": "1,400 square feet"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Parking",
        "value": "Secure gated parking"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "WiFi",
        "value": "High-speed internet"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Bathroom",
        "value": "Full bathroom with shower"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Vanity Room",
        "value": "On-site talent preparation"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

// Schema for the organization
export const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "KNOWS STUDIOS",
    "url": "https://knowsstudios.com",
    "logo": "https://knowsstudios.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-323-609-3356",
      "contactType": "Customer Service",
      "email": "info@knowsstudios.com",
      "areaServed": "US",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://www.peerspace.com/pages/listings/5d36714b581d66000fc2f9a2"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

// Breadcrumb schema
export const BreadcrumbSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://knowsstudios.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Book Studio",
        "item": "https://knowsstudios.com/#contact"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
