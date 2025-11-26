import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone } from "lucide-react";
import { BookingModal } from "./BookingModal";
import { useState } from "react";

export const Contact = () => {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <section id="contact" className="py-24 bg-studio-darker">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient-neon">Reserve</span> Your Booking Today
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              A multi-use creative workspace catering to artists and creators
            </p>
            <Button
              onClick={() => setBookingOpen(true)}
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold text-lg px-12 py-6 animate-pulse-glow"
            >
              SCHEDULE NOW
            </Button>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="bg-card/30 backdrop-blur-sm border-border p-8 text-center group hover:border-primary/50 transition-all">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-bold text-xl mb-2">FIND</h3>
            <p className="text-muted-foreground">
              7240 Coldwater CYN Avenue<br />
              Los Angeles, CA, 91605
            </p>
          </Card>

          <Card className="bg-card/30 backdrop-blur-sm border-border p-8 text-center group hover:border-primary/50 transition-all">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-bold text-xl mb-2">EMAIL</h3>
            <a
              href="mailto:info@knowsstudios.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              info@knowsstudios.com
            </a>
          </Card>

          <Card className="bg-card/30 backdrop-blur-sm border-border p-8 text-center group hover:border-primary/50 transition-all">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
              <Phone className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-bold text-xl mb-2">TEXT</h3>
            <a
              href="tel:3236093356"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              323 609 3356
            </a>
          </Card>
        </div>
      </div>
    </section>
    <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </>
  );
};
