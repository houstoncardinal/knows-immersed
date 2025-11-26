# KNOWS STUDIOS - Quick Reference Guide

## 🚀 Development Server
```bash
npm run dev
# Running at: http://localhost:8081/
```

## 🎨 New Components

### SEO Components
- `<SEO />` - Meta tags and Open Graph
- `<LocalBusinessSchema />` - Business schema markup
- `<OrganizationSchema />` - Organization schema
- `<BreadcrumbSchema />` - Navigation schema

### Booking System
- `<BookingModal />` - 4-step booking wizard
- `<BookingConfirmation />` - Post-booking confirmation page

### CTAs
- `<PowerfulCTA variant="inline" />` - Compact CTA
- `<PowerfulCTA variant="secondary" />` - Featured CTA
- `<PowerfulCTA variant="primary" />` - Full immersive CTA

### Content
- `<Testimonials />` - Animated testimonial carousel

## 🎭 New CSS Classes

### Animations
```css
.animate-scale-in          /* Scale entrance */
.animate-slide-in-up       /* Slide from bottom */
.animate-slide-in-down     /* Slide from top */
.animate-slide-in-left     /* Slide from right */
.animate-slide-in-right    /* Slide from left */
.animate-bounce-in         /* Bouncy entrance */
.animate-flip-in           /* 3D flip entrance */
.animate-zoom-in           /* Zoom entrance */
.animate-glow-border       /* Pulsing border */
.animate-pulse-scale       /* Pulsing scale */
.animate-float             /* Floating element */
.animate-shimmer           /* Shimmer effect */
```

### Hover Effects
```css
.hover-lift                /* Lift on hover */
.hover-glow                /* Glow on hover */
.hover-scale               /* Scale on hover */
.immersive-card            /* 3D card transform */
```

### Performance
```css
.gpu-accelerated           /* GPU optimization */
.scroll-reveal             /* Scroll animation */
```

## 📊 SEO Features

### Meta Tags (Automatic)
- Title, Description, Keywords
- Open Graph (Facebook, LinkedIn)
- Twitter Cards
- Geo-location data
- Mobile optimization

### Schema.org (Automatic)
- LocalBusiness with full details
- Organization information
- Breadcrumb navigation
- Service catalog with pricing

## 🎯 Conversion Funnels

### Main Booking Flow
Hero → Stats → About → **CTA** → Equipment → Gallery → **CTA** → Testimonials → Contact

### Booking Steps
1. Select Package → 2. Choose Date/Time → 3. Add Services → 4. Confirm → 5. Success

## 📱 CTA Placements

1. **Hero Section** - Primary CTA in modal
2. **After About** - Inline CTA
3. **After Gallery** - Secondary CTA
4. **Contact Section** - Final CTA
5. **Floating Button** - Always visible on scroll

## 🎨 Color Variables

```css
--neon-cyan: 180 100% 50%
--neon-pink: 340 100% 60%
--studio-dark: 0 0% 5%
--studio-darker: 0 0% 3%
```

## 📞 Contact Information

- **Phone**: 323 609 3356
- **Email**: info@knowsstudios.com
- **Address**: 7240 Coldwater Canyon Avenue, Los Angeles, CA 91605
- **Peerspace**: [Booking Link](https://www.peerspace.com/pages/listings/5d36714b581d66000fc2f9a2)

## 🔧 Key Features

### Booking System
✅ 4-step wizard
✅ Package selection (Half/Full/Multi-day)
✅ Calendar integration
✅ Time slot selection
✅ Add-ons marketplace
✅ Real-time pricing
✅ Confirmation page
✅ Download confirmation
✅ Share functionality

### SEO
✅ Complete meta tags
✅ Schema.org markup
✅ Local SEO optimized
✅ Social sharing ready
✅ Mobile-first

### Animations
✅ 15+ keyframe animations
✅ Scroll-triggered reveals
✅ 3D card transforms
✅ Parallax effects
✅ Hover micro-interactions
✅ GPU-accelerated

### CTAs
✅ Multiple variants
✅ Strategic placement
✅ High-converting design
✅ Mobile-optimized
✅ Animated backgrounds

## 🚀 Performance Tips

1. **Images**: Already optimized via CDN
2. **Animations**: GPU-accelerated with `transform: translateZ(0)`
3. **CSS**: Efficient selectors and minimal repaints
4. **Code Splitting**: React lazy loading ready
5. **Caching**: Browser caching headers recommended

## 📈 Analytics to Track

- Booking form starts
- Booking completions
- CTA click-through rates
- Time on page
- Scroll depth
- Phone/email clicks

## 🎓 Usage Examples

### Adding a CTA
```tsx
import { PowerfulCTA } from "@/components/PowerfulCTA";

// Inline variant
<PowerfulCTA variant="inline" />

// Secondary variant
<PowerfulCTA
  variant="secondary"
  title="Custom Title"
  description="Custom description"
/>
```

### Using Animations
```tsx
<div className="animate-scale-in hover-lift">
  <Card>Content</Card>
</div>
```

### Scroll Reveals
```tsx
<div className="scroll-reveal">
  {/* Will fade in on scroll */}
</div>
```

## 🐛 Troubleshooting

### Animations not working?
- Check browser compatibility
- Verify CSS is loaded
- Clear browser cache

### Booking modal issues?
- Check form validation
- Verify all required fields
- Test date/time selection

### SEO not showing?
- Verify meta tags in browser inspector
- Use Google Rich Results Test
- Check robots.txt

## 📚 Documentation

- **Main Enhancements**: See `ENHANCEMENTS.md`
- **Complete Details**: See `COMPLETE-ENHANCEMENTS.md`
- **This Guide**: `QUICK-REFERENCE.md`

---

**Need Help?**
- Check browser console for errors
- Verify component imports
- Review prop types
- Test in incognito mode

**Support**: info@knowsstudios.com
