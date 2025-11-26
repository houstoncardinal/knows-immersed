import { CheckCircle, Calendar, Clock, Package, Mail, Phone, MapPin, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";

interface BookingConfirmationProps {
  bookingDetails: {
    date: Date;
    time: string;
    packageName: string;
    duration: string;
    addOns: string[];
    total: number;
    name: string;
    email: string;
    phone: string;
    projectDetails: string;
    confirmationNumber: string;
  };
  onClose: () => void;
}

export const BookingConfirmation = ({ bookingDetails, onClose }: BookingConfirmationProps) => {
  const handleDownloadConfirmation = () => {
    // Create a text version of the confirmation
    const confirmationText = `
KNOWS STUDIOS - Booking Confirmation

Confirmation Number: ${bookingDetails.confirmationNumber}

Date: ${format(bookingDetails.date, "EEEE, MMMM d, yyyy")}
Time: ${bookingDetails.time}
Package: ${bookingDetails.packageName} (${bookingDetails.duration})
${bookingDetails.addOns.length > 0 ? `Add-ons: ${bookingDetails.addOns.join(", ")}` : ""}
Total: $${bookingDetails.total}

Contact Information:
Name: ${bookingDetails.name}
Email: ${bookingDetails.email}
Phone: ${bookingDetails.phone}

Project Details: ${bookingDetails.projectDetails}

Studio Address:
7240 Coldwater Canyon Avenue
Los Angeles, CA 91605

Thank you for booking with KNOWS STUDIOS!
We look forward to seeing you.

For questions, contact us at:
Email: info@knowsstudios.com
Phone: 323 609 3356
    `.trim();

    const blob = new Blob([confirmationText], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `KNOWS-STUDIOS-Confirmation-${bookingDetails.confirmationNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const shareData = {
      title: "KNOWS STUDIOS Booking Confirmation",
      text: `Booked studio time at KNOWS STUDIOS on ${format(bookingDetails.date, "MMMM d, yyyy")} at ${bookingDetails.time}. Confirmation: ${bookingDetails.confirmationNumber}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Share failed:", err);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-fade-in">
      <div className="max-w-3xl w-full">
        {/* Success Animation */}
        <div className="text-center mb-8 animate-scale-in">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-neon-cyan to-neon-pink mb-6 animate-pulse-glow">
            <CheckCircle className="w-16 h-16 text-white animate-float" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-neon">Booking Confirmed!</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Your studio time has been reserved
          </p>
        </div>

        {/* Confirmation Details */}
        <Card className="bg-card/50 backdrop-blur-sm border-border p-8 mb-6">
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground mb-2">Confirmation Number</p>
            <p className="text-3xl font-bold text-gradient-neon tracking-wider">
              {bookingDetails.confirmationNumber}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/20">
              <div className="p-3 rounded-lg bg-primary/10">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Date</p>
                <p className="font-bold">{format(bookingDetails.date, "EEEE, MMMM d, yyyy")}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/20">
              <div className="p-3 rounded-lg bg-primary/10">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Time</p>
                <p className="font-bold">{bookingDetails.time}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/20">
              <div className="p-3 rounded-lg bg-primary/10">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Package</p>
                <p className="font-bold">{bookingDetails.packageName}</p>
                <p className="text-sm text-muted-foreground">{bookingDetails.duration}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/20">
              <div className="p-3 rounded-lg bg-primary/10">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Location</p>
                <p className="font-bold text-sm">7240 Coldwater Canyon Ave</p>
                <p className="text-sm text-muted-foreground">Los Angeles, CA 91605</p>
              </div>
            </div>
          </div>

          {bookingDetails.addOns.length > 0 && (
            <div className="mb-6 p-4 rounded-lg bg-muted/20">
              <p className="text-sm text-muted-foreground mb-2">Add-ons</p>
              <ul className="space-y-1">
                {bookingDetails.addOns.map((addon, idx) => (
                  <li key={idx} className="text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {addon}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="border-t-2 border-primary/20 pt-6">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">Total</span>
              <span className="text-3xl font-bold text-gradient-neon">${bookingDetails.total}</span>
            </div>
          </div>
        </Card>

        {/* Next Steps */}
        <Card className="bg-card/50 backdrop-blur-sm border-border p-6 mb-6">
          <h3 className="text-xl font-bold mb-4 text-gradient-neon">What's Next?</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-bold">Check Your Email</p>
                <p className="text-sm text-muted-foreground">
                  A confirmation email has been sent to {bookingDetails.email}
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Phone className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-bold">We'll Contact You</p>
                <p className="text-sm text-muted-foreground">
                  Our team will reach out within 24 hours to confirm details
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Calendar className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-bold">Prepare for Your Session</p>
                <p className="text-sm text-muted-foreground">
                  Review our studio guidelines and bring your creative vision
                </p>
              </div>
            </li>
          </ul>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={handleDownloadConfirmation}
            variant="outline"
            className="flex-1 border-primary/50 hover:border-primary hover:bg-primary/10"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Confirmation
          </Button>
          <Button
            onClick={handleShare}
            variant="outline"
            className="flex-1 border-primary/50 hover:border-primary hover:bg-primary/10"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share
          </Button>
          <Button
            onClick={onClose}
            className="flex-1 bg-gradient-to-r from-neon-cyan to-neon-pink hover:opacity-90"
          >
            Done
          </Button>
        </div>

        {/* Contact Info */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p className="mb-2">Need to make changes?</p>
          <p>
            Email: <a href="mailto:info@knowsstudios.com" className="text-primary hover:underline">info@knowsstudios.com</a>
            {" | "}
            Phone: <a href="tel:3236093356" className="text-primary hover:underline">323 609 3356</a>
          </p>
        </div>
      </div>
    </div>
  );
};
