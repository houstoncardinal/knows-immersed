import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar as CalendarIcon, Clock, Package, Sparkles, Camera, Video, Mic, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { BookingConfirmation } from "./BookingConfirmation";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const packages = [
  {
    id: "half-day",
    name: "Half Day",
    duration: "4 hours",
    price: 250,
    description: "Perfect for quick shoots and content creation",
    features: ["4 hours studio time", "Basic lighting setup", "Green screen access"],
  },
  {
    id: "full-day",
    name: "Full Day",
    duration: "8 hours",
    price: 450,
    description: "Ideal for comprehensive productions",
    features: ["8 hours studio time", "Full lighting control", "All backdrops included", "Vanity room access"],
    popular: true,
  },
  {
    id: "multi-day",
    name: "Multi-Day",
    duration: "Custom",
    price: 400,
    priceNote: "per day",
    description: "Best value for extended projects",
    features: ["3+ days booking", "Discounted rate", "Priority scheduling", "Equipment storage"],
  },
];

const addOns = [
  { id: "lighting", name: "Premium Lighting Package", price: 75 },
  { id: "backdrop", name: "Additional Backdrops", price: 50 },
  { id: "assistant", name: "Studio Assistant", price: 100 },
  { id: "equipment", name: "Camera Equipment Rental", price: 150 },
];

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
];

export const BookingModal = ({ open, onOpenChange }: BookingModalProps) => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedPackage, setSelectedPackage] = useState("full-day");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectDetails: "",
  });

  const calculateTotal = () => {
    const packagePrice = packages.find(p => p.id === selectedPackage)?.price || 0;
    const addOnsTotal = selectedAddOns.reduce((sum, addonId) => {
      const addon = addOns.find(a => a.id === addonId);
      return sum + (addon?.price || 0);
    }, 0);
    return packagePrice + addOnsTotal;
  };

  const handleAddOnToggle = (addonId: string) => {
    setSelectedAddOns(prev =>
      prev.includes(addonId)
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const generateConfirmationNumber = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 7);
    return `KS-${timestamp}-${random}`.toUpperCase();
  };

  const handleSubmit = () => {
    if (!selectedDate || !selectedTimeSlot || !formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    const selectedPkg = packages.find(p => p.id === selectedPackage);
    const bookingDetails = {
      date: selectedDate,
      time: selectedTimeSlot,
      packageName: selectedPkg?.name || "",
      duration: selectedPkg?.duration || "",
      addOns: selectedAddOns.map(id => addOns.find(a => a.id === id)?.name || "").filter(Boolean),
      total: calculateTotal(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      projectDetails: formData.projectDetails,
      confirmationNumber: generateConfirmationNumber(),
    };

    console.log("Booking submitted:", bookingDetails);
    setConfirmedBooking(bookingDetails);
    setShowConfirmation(true);
    toast.success("Booking request submitted! We'll contact you shortly.");

    // Optional: Redirect to Peerspace after confirmation
    setTimeout(() => {
      window.open("https://www.peerspace.com/pages/listings/5d36714b581d66000fc2f9a2?utm_source=copy_link&utm_campaign=listing_sharing", "_blank");
    }, 5000);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setConfirmedBooking(null);
    onOpenChange(false);
    // Reset form
    setStep(1);
    setSelectedDate(undefined);
    setSelectedPackage("full-day");
    setSelectedTimeSlot("");
    setSelectedAddOns([]);
    setFormData({
      name: "",
      email: "",
      phone: "",
      projectDetails: "",
    });
  };

  if (showConfirmation && confirmedBooking) {
    return (
      <Dialog open={open} onOpenChange={handleCloseConfirmation}>
        <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-4xl lg:max-w-6xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto bg-studio-darker border-border/50 mx-4 sm:mx-auto p-0">
          <BookingConfirmation bookingDetails={confirmedBooking} onClose={handleCloseConfirmation} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-4xl lg:max-w-6xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto bg-studio-darker border-border/50 mx-4 sm:mx-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl sm:text-3xl font-bold">
            <span className="text-gradient-neon">Book Your Session</span>
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-base sm:text-lg">
            Reserve KNOWS STUDIOS for your next creative project
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8 gap-2 sm:gap-4 px-2">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base transition-all ${
                    step >= s
                      ? "bg-gradient-to-r from-neon-cyan to-neon-pink text-white scale-110"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {s}
                </div>
                {s < 4 && (
                  <div
                    className={`w-6 h-1 sm:w-12 sm:h-1 mx-1 sm:mx-2 transition-all ${
                      step > s ? "bg-gradient-to-r from-neon-cyan to-neon-pink" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Select Package */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Choose Your Package</h3>
                <p className="text-muted-foreground">Select the best option for your project</p>
              </div>
              <RadioGroup value={selectedPackage} onValueChange={setSelectedPackage}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {packages.map((pkg) => (
                    <Card
                      key={pkg.id}
                      className={`relative p-6 cursor-pointer transition-all hover:scale-105 ${
                        selectedPackage === pkg.id
                          ? "border-2 border-neon-cyan bg-neon-cyan/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedPackage(pkg.id)}
                    >
                      {pkg.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <span className="bg-gradient-to-r from-neon-cyan to-neon-pink text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> POPULAR
                          </span>
                        </div>
                      )}
                      <RadioGroupItem value={pkg.id} className="sr-only" />
                      <div className="text-center mb-4">
                        <Package className="w-12 h-12 mx-auto mb-3 text-primary" />
                        <h4 className="text-xl font-bold mb-1">{pkg.name}</h4>
                        <p className="text-sm text-muted-foreground">{pkg.duration}</p>
                      </div>
                      <div className="text-center mb-4">
                        <span className="text-4xl font-bold text-gradient-neon">${pkg.price}</span>
                        {pkg.priceNote && <span className="text-sm text-muted-foreground ml-1">{pkg.priceNote}</span>}
                      </div>
                      <p className="text-sm text-muted-foreground text-center mb-4">{pkg.description}</p>
                      <ul className="space-y-2">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="text-sm flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>
              </RadioGroup>
              <div className="flex justify-end">
                <Button
                  onClick={() => setStep(2)}
                  size="lg"
                  className="bg-gradient-to-r from-neon-cyan to-neon-pink hover:opacity-90"
                >
                  Continue <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Select Date & Time */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Pick Your Date & Time</h3>
                <p className="text-muted-foreground">When would you like to book the studio?</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Label className="text-lg mb-4 flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-primary" /> Select Date
                  </Label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border border-border bg-card/50 p-4"
                    disabled={(date) => date < new Date()}
                  />
                </div>
                <div>
                  <Label className="text-lg mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" /> Select Time Slot
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot}
                        variant={selectedTimeSlot === slot ? "default" : "outline"}
                        className={`${
                          selectedTimeSlot === slot
                            ? "bg-gradient-to-r from-neon-cyan to-neon-pink"
                            : "hover:border-primary"
                        }`}
                        onClick={() => setSelectedTimeSlot(slot)}
                      >
                        {slot}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <Button onClick={() => setStep(1)} variant="outline">
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  size="lg"
                  disabled={!selectedDate || !selectedTimeSlot}
                  className="bg-gradient-to-r from-neon-cyan to-neon-pink hover:opacity-90"
                >
                  Continue <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Add-ons */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Enhance Your Experience</h3>
                <p className="text-muted-foreground">Optional add-ons to elevate your production</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addOns.map((addon) => (
                  <Card
                    key={addon.id}
                    className={`p-4 cursor-pointer transition-all hover:scale-105 ${
                      selectedAddOns.includes(addon.id)
                        ? "border-2 border-neon-pink bg-neon-pink/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => handleAddOnToggle(addon.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <Checkbox
                          checked={selectedAddOns.includes(addon.id)}
                          onCheckedChange={(checked) => {
                            handleAddOnToggle(addon.id);
                          }}
                          onClick={(e) => e.stopPropagation()}
                          className="mt-1 w-6 h-6"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold mb-1">{addon.name}</h4>
                        <p className="text-2xl font-bold text-gradient-neon">+${addon.price}</p>
                      </div>
                      <div className="flex-shrink-0 text-primary">
                        {addon.id === "lighting" && <Camera className="w-8 h-8" />}
                        {addon.id === "backdrop" && <Video className="w-8 h-8" />}
                        {addon.id === "assistant" && <Mic className="w-8 h-8" />}
                        {addon.id === "equipment" && <Camera className="w-8 h-8" />}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              <div className="flex justify-between">
                <Button onClick={() => setStep(2)} variant="outline">
                  Back
                </Button>
                <Button
                  onClick={() => setStep(4)}
                  size="lg"
                  className="bg-gradient-to-r from-neon-cyan to-neon-pink hover:opacity-90"
                >
                  Continue <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Contact Info & Confirmation */}
          {step === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Final Details</h3>
                <p className="text-muted-foreground">Tell us about yourself and your project</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(323) 609-3356"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="details">Project Details</Label>
                    <Textarea
                      id="details"
                      value={formData.projectDetails}
                      onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                      placeholder="Tell us about your project..."
                      className="mt-2 min-h-32"
                    />
                  </div>
                </div>
                <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-primary/20 h-fit sticky top-4">
                  <h4 className="text-xl font-bold mb-4 text-gradient-neon">Booking Summary</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between pb-2 border-b border-border">
                      <span className="text-muted-foreground">Package:</span>
                      <span className="font-bold">{packages.find(p => p.id === selectedPackage)?.name}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-border">
                      <span className="text-muted-foreground">Date:</span>
                      <span className="font-bold">{selectedDate ? format(selectedDate, "PPP") : "Not selected"}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-border">
                      <span className="text-muted-foreground">Time:</span>
                      <span className="font-bold">{selectedTimeSlot || "Not selected"}</span>
                    </div>
                    {selectedAddOns.length > 0 && (
                      <div className="pt-2">
                        <span className="text-muted-foreground block mb-2">Add-ons:</span>
                        {selectedAddOns.map((addonId) => {
                          const addon = addOns.find(a => a.id === addonId);
                          return (
                            <div key={addonId} className="flex justify-between ml-4 mb-1">
                              <span className="text-xs">{addon?.name}</span>
                              <span className="text-xs font-bold">${addon?.price}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    <div className="flex justify-between pt-4 border-t-2 border-primary">
                      <span className="text-lg font-bold">Total:</span>
                      <span className="text-2xl font-bold text-gradient-neon">${calculateTotal()}</span>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="flex justify-between">
                <Button onClick={() => setStep(3)} variant="outline">
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  size="lg"
                  className="bg-gradient-to-r from-neon-cyan to-neon-pink hover:opacity-90 animate-pulse-glow"
                >
                  Complete Booking <Sparkles className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
