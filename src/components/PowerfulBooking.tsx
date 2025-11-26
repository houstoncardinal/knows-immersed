import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Calendar as CalendarIcon,
  Clock,
  Package,
  Sparkles,
  Camera,
  Video,
  Mic,
  CreditCard,
  Shield,
  Star,
  CheckCircle,
  ArrowRight,
  Crown,
  Zap,
  Users,
  Timer,
  Info,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Award,
  TrendingUp,
  CalendarDays,
  UserCheck,
  Lock,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  X,
  Check
} from "lucide-react";
import { format, addDays, isSameDay, startOfDay, addHours, isBefore, isAfter } from "date-fns";
import { toast } from "sonner";
import { BookingConfirmation } from "./BookingConfirmation";

interface TimeSlot {
  time: string;
  available: boolean;
  price: number;
}

interface BookingData {
  date: Date | undefined;
  timeSlot: string;
  package: string;
  addOns: string[];
  name: string;
  email: string;
  phone: string;
  projectType: string;
  projectDetails: string;
  depositAmount: number;
  totalAmount: number;
}

const packages = [
  {
    id: "half-day",
    name: "Half Day Session",
    duration: "4 hours",
    basePrice: 250,
    description: "Perfect for quick shoots and content creation",
    features: ["4 hours studio time", "Basic lighting setup", "Green screen access", "WiFi included"],
    icon: Camera,
    popular: false,
  },
  {
    id: "full-day",
    name: "Full Day Production",
    duration: "8 hours",
    basePrice: 450,
    description: "Ideal for comprehensive productions and shoots",
    features: ["8 hours studio time", "Full lighting control", "All backdrops included", "Vanity room access", "Kitchen access"],
    icon: Video,
    popular: true,
  },
  {
    id: "vip-experience",
    name: "VIP Experience",
    duration: "12 hours",
    basePrice: 750,
    description: "Ultimate creative experience with premium support",
    features: ["12 hours studio time", "Premium lighting package", "Studio assistant included", "Priority equipment access", "VIP amenities", "Post-production consultation"],
    icon: Crown,
    popular: false,
    luxury: true,
  },
];

const addOns = [
  { id: "premium-lighting", name: "Premium Lighting Package", price: 75, description: "Professional LED lighting setup" },
  { id: "additional-backdrop", name: "Additional Backdrops", price: 50, description: "Extra seamless backdrops" },
  { id: "studio-assistant", name: "Studio Assistant", price: 100, description: "Professional crew member" },
  { id: "camera-equipment", name: "Camera Equipment Rental", price: 150, description: "DSLR, lenses, and accessories" },
  { id: "audio-package", name: "Audio Recording Package", price: 85, description: "Microphones and audio interface" },
  { id: "grip-package", name: "Grip & Support Equipment", price: 60, description: "Stands, clamps, and rigging" },
];

const projectTypes = [
  "Photography Session",
  "Video Production",
  "Commercial Shoot",
  "Content Creation",
  "Music Video",
  "Film Production",
  "Podcast Recording",
  "Live Streaming",
  "Other"
];

const timeSlots: TimeSlot[] = [
  { time: "9:00 AM", available: true, price: 0 },
  { time: "10:00 AM", available: true, price: 0 },
  { time: "11:00 AM", available: false, price: 0 },
  { time: "12:00 PM", available: true, price: 0 },
  { time: "1:00 PM", available: true, price: 0 },
  { time: "2:00 PM", available: false, price: 0 },
  { time: "3:00 PM", available: true, price: 0 },
  { time: "4:00 PM", available: true, price: 0 },
  { time: "5:00 PM", available: true, price: 0 },
  { time: "6:00 PM", available: false, price: 0 },
  { time: "7:00 PM", available: true, price: 0 },
  { time: "8:00 PM", available: true, price: 0 },
];

// Mock unavailable dates (for demo purposes)
const unavailableDates = [
  addDays(new Date(), 2),
  addDays(new Date(), 5),
  addDays(new Date(), 12),
];

export const PowerfulBooking = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [selectedPackage, setSelectedPackage] = useState<string>("full-day");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [bookingStep, setBookingStep] = useState<'calendar' | 'details' | 'payment' | 'confirmation'>('calendar');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [autoSaved, setAutoSaved] = useState(false);

  const [bookingData, setBookingData] = useState<BookingData>({
    date: undefined,
    timeSlot: "",
    package: "full-day",
    addOns: [],
    name: "",
    email: "",
    phone: "",
    projectType: "",
    projectDetails: "",
    depositAmount: 0,
    totalAmount: 0,
  });

  // Auto-save functionality
  useEffect(() => {
    const autoSaveData = {
      selectedDate,
      selectedTimeSlot,
      selectedPackage,
      selectedAddOns,
      bookingData,
      timestamp: Date.now()
    };

    if (selectedDate || selectedTimeSlot || bookingData.name) {
      localStorage.setItem('knows-booking-draft', JSON.stringify(autoSaveData));
      setAutoSaved(true);
      setTimeout(() => setAutoSaved(false), 2000);
    }
  }, [selectedDate, selectedTimeSlot, selectedPackage, selectedAddOns, bookingData]);

  // Load auto-saved data on mount
  useEffect(() => {
    const saved = localStorage.getItem('knows-booking-draft');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        const age = Date.now() - data.timestamp;
        // Only restore if less than 24 hours old
        if (age < 24 * 60 * 60 * 1000) {
        setSelectedDate(data.selectedDate ? new Date(data.selectedDate) : undefined);
        setSelectedTimeSlot(data.selectedTimeSlot || "");
        setSelectedPackage(data.selectedPackage || "full-day");
        setSelectedAddOns(data.selectedAddOns || []);
        setBookingData(data.bookingData || bookingData);
        }
      } catch (e) {
        // Ignore invalid saved data
      }
    }
  }, []);

  // Calculate total and deposit
  const calculateTotals = () => {
    const pkg = packages.find(p => p.id === selectedPackage);
    const packagePrice = pkg?.basePrice || 0;
    const addOnsTotal = selectedAddOns.reduce((sum, addonId) => {
      const addon = addOns.find(a => a.id === addonId);
      return sum + (addon?.price || 0);
    }, 0);
    const total = packagePrice + addOnsTotal;
    const deposit = Math.round(total * 0.3); // 30% deposit

    return { total, deposit };
  };

  const { total, deposit } = calculateTotals();

  // Check if date is available
  const isDateAvailable = (date: Date) => {
    return !unavailableDates.some(unavailableDate =>
      isSameDay(unavailableDate, date) || date < startOfDay(new Date())
    );
  };

  // Handle add-on toggle
  const handleAddOnToggle = (addonId: string) => {
    setSelectedAddOns(prev =>
      prev.includes(addonId)
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  // Handle booking progression
  const handleContinueToDetails = () => {
    if (!selectedDate || !selectedTimeSlot) {
      toast.error("Please select a date and time slot");
      return;
    }
    setBookingStep('details');
  };

  const handleContinueToPayment = () => {
    if (!bookingData.name || !bookingData.email || !bookingData.phone || !bookingData.projectType) {
      toast.error("Please fill in all required fields");
      return;
    }
    setBookingStep('payment');
  };

  const handleCompleteBooking = () => {
    const pkg = packages.find(p => p.id === selectedPackage);
    const bookingDetails = {
      date: selectedDate,
      time: selectedTimeSlot,
      packageName: pkg?.name || "",
      duration: pkg?.duration || "",
      addOns: selectedAddOns.map(id => addOns.find(a => a.id === id)?.name || "").filter(Boolean),
      total: total,
      deposit: deposit,
      name: bookingData.name,
      email: bookingData.email,
      phone: bookingData.phone,
      projectType: bookingData.projectType,
      projectDetails: bookingData.projectDetails,
      confirmationNumber: `KS-${Date.now().toString(36).toUpperCase()}`,
    };

    setConfirmedBooking(bookingDetails);
    setShowConfirmation(true);
    toast.success("Booking confirmed! Processing payment...");

    // Simulate payment processing
    setTimeout(() => {
      toast.success("Payment processed successfully!");
    }, 2000);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setConfirmedBooking(null);
    // Reset form
    setBookingStep('calendar');
    setSelectedDate(undefined);
    setSelectedTimeSlot("");
    setSelectedPackage("full-day");
    setSelectedAddOns([]);
    setBookingData({
      date: undefined,
      timeSlot: "",
      package: "full-day",
      addOns: [],
      name: "",
      email: "",
      phone: "",
      projectType: "",
      projectDetails: "",
      depositAmount: 0,
      totalAmount: 0,
    });
  };

  if (showConfirmation && confirmedBooking) {
    return (
      <section className="py-24 bg-luxury-gradient relative overflow-hidden">
        <div className="container mx-auto px-6">
          <BookingConfirmation bookingDetails={confirmedBooking} onClose={handleCloseConfirmation} />
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-24 bg-luxury-gradient relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[hsl(var(--luxury-gold))]/10 rounded-full blur-3xl animate-float-3d" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-pink/10 rounded-full blur-3xl animate-float-3d" style={{ animationDelay: "2s" }} />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-cinematic-reveal">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[hsl(var(--luxury-gold))] to-transparent" />
            <CalendarIcon className="w-6 h-6 text-[hsl(var(--luxury-gold))] animate-pulse-luxury" />
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[hsl(var(--luxury-gold))] to-transparent" />
          </div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6 luxury-text">
            Reserve Your <span className="text-gradient-luxury">Studio</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            Interactive booking system with real-time availability. Secure your spot with a deposit and get instant confirmation.
          </p>

          {/* PeerSpace Booking Option */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Alternative booking option:</p>
              <a
                href="https://www.peerspace.com/pages/listings/5d36714b581d66000fc2f9a2?utm_source=copy_link&utm_campaign=listing_sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg group"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Book with PeerSpace
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <p className="text-xs text-muted-foreground mt-2">External booking platform • Instant confirmation</p>
            </div>
          </div>

          {/* Auto-save indicator */}
          {autoSaved && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-sm text-green-600 animate-fade-in">
              <CheckCircle className="w-4 h-4" />
              Progress auto-saved
            </div>
          )}

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex items-center gap-2 px-3 py-1 bg-card/50 border border-border/50 rounded-full text-xs">
                    <Lock className="w-3 h-3 text-green-500" />
                    SSL Secured
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>256-bit SSL encryption for secure transactions</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex items-center gap-2 px-3 py-1 bg-card/50 border border-border/50 rounded-full text-xs">
                    <Timer className="w-3 h-3 text-blue-500" />
                    Instant Booking
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Get instant confirmation after payment</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex items-center gap-2 px-3 py-1 bg-card/50 border border-border/50 rounded-full text-xs">
                    <RefreshCw className="w-3 h-3 text-purple-500" />
                    Free Cancellation
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Cancel up to 24 hours before booking</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-12 gap-4">
          {[
            { step: 'calendar', label: 'Select Date & Time', icon: CalendarIcon },
            { step: 'details', label: 'Project Details', icon: Package },
            { step: 'payment', label: 'Secure Booking', icon: CreditCard },
          ].map((item, index) => {
            const isActive = bookingStep === item.step;
            const isCompleted = (
              (bookingStep === 'details' && index < 1) ||
              (bookingStep === 'payment' && index < 2) ||
              (bookingStep === 'confirmation' && index < 3)
            );

            return (
              <div key={item.step} className="flex items-center">
                <div className={`flex items-center gap-3 px-4 py-2 rounded-full transition-all ${
                  isActive ? 'bg-gradient-to-r from-neon-cyan to-neon-pink text-white scale-105' :
                  isCompleted ? 'bg-[hsl(var(--luxury-gold))] text-black' :
                  'bg-muted text-muted-foreground'
                }`}>
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                {index < 2 && (
                  <div className={`w-12 h-1 mx-2 transition-all ${
                    isCompleted ? 'bg-[hsl(var(--luxury-gold))]' : 'bg-muted'
                  }`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Calendar Step */}
        {bookingStep === 'calendar' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 animate-fade-in">
            {/* Calendar Section */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 md:w-6 md:h-6 text-[hsl(var(--luxury-gold))]" />
                  Select Your Date
                </h3>
                <div className="overflow-x-auto">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-lg border border-border bg-card/50 p-3 md:p-6 shadow-luxury-md min-w-[280px]"
                    disabled={(date) => !isDateAvailable(date)}
                  />
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3 md:gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span>Unavailable</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Time Slots & Package Selection */}
            <div className="space-y-6">
              {/* Time Slots */}
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 md:w-6 md:h-6 text-[hsl(var(--luxury-gold))]" />
                  Available Time Slots
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot.time}
                      variant={selectedTimeSlot === slot.time ? "default" : "outline"}
                      disabled={!slot.available}
                      size="sm"
                      className={`text-xs md:text-sm px-2 py-2 md:px-3 md:py-2 h-auto ${
                        selectedTimeSlot === slot.time
                          ? "bg-gradient-to-r from-neon-cyan to-neon-pink border-none"
                          : slot.available
                            ? "hover:border-[hsl(var(--luxury-gold))] hover:bg-[hsl(var(--luxury-gold))]/10"
                            : "opacity-50 cursor-not-allowed"
                      }`}
                      onClick={() => slot.available && setSelectedTimeSlot(slot.time)}
                    >
                      {slot.time}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Package Selection */}
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 md:w-6 md:h-6 text-[hsl(var(--luxury-gold))]" />
                  Choose Your Package
                </h3>
                <RadioGroup value={selectedPackage} onValueChange={setSelectedPackage}>
                  <div className="space-y-3">
                    {packages.map((pkg) => {
                      const Icon = pkg.icon;
                      return (
                        <Card
                          key={pkg.id}
                          className={`relative p-3 md:p-4 cursor-pointer transition-all hover:scale-105 ${
                            selectedPackage === pkg.id
                              ? "border-2 border-neon-cyan bg-neon-cyan/5 shadow-luxury-md"
                              : "border-border hover:border-[hsl(var(--luxury-gold))]/50"
                          }`}
                          onClick={() => setSelectedPackage(pkg.id)}
                        >
                          {pkg.popular && (
                            <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-neon-cyan to-neon-pink text-xs px-2 py-1">
                              <Star className="w-3 h-3 mr-1" /> Popular
                            </Badge>
                          )}
                          {pkg.luxury && (
                            <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-[hsl(var(--luxury-gold))] to-[hsl(var(--luxury-rose-gold))] text-black text-xs px-2 py-1">
                              <Crown className="w-3 h-3 mr-1" /> VIP
                            </Badge>
                          )}
                          <div className="flex items-start gap-3 md:gap-4">
                            <RadioGroupItem value={pkg.id} className="mt-1" />
                            <Icon className="w-6 h-6 md:w-8 md:h-8 text-primary mt-1 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-base md:text-lg truncate">{pkg.name}</h4>
                              <p className="text-xs md:text-sm text-muted-foreground mb-2 line-clamp-2">{pkg.description}</p>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                                <span className="text-xl md:text-2xl font-bold text-gradient-neon">${pkg.basePrice}</span>
                                <span className="text-xs md:text-sm text-muted-foreground">{pkg.duration}</span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </RadioGroup>
              </div>

              {/* Continue Button */}
              <Button
                onClick={handleContinueToDetails}
                size="lg"
                className="w-full bg-gradient-to-r from-[hsl(var(--luxury-gold))] to-[hsl(var(--luxury-rose-gold))] hover:opacity-90 text-black font-bold text-base md:text-lg py-4 md:py-6"
                disabled={!selectedDate || !selectedTimeSlot}
              >
                Continue to Details <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </div>
          </div>
        )}

        {/* Details Step */}
        {bookingStep === 'details' && (
          <div className="max-w-4xl mx-auto animate-fade-in px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
              {/* Form Section */}
              <div className="space-y-6">
                <h3 className="text-xl md:text-2xl font-bold mb-6">Project Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-4 h-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Enter your full legal name as it appears on your ID</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Input
                      id="name"
                      value={bookingData.name}
                      onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                      placeholder="John Doe"
                      className={`${validationErrors.name ? 'border-red-500' : ''}`}
                    />
                    {validationErrors.name && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {validationErrors.name}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="email">Email *</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-4 h-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>We'll send your booking confirmation here</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Input
                      id="email"
                      type="email"
                      value={bookingData.email}
                      onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                      placeholder="john@example.com"
                      className={`${validationErrors.email ? 'border-red-500' : ''}`}
                    />
                    {validationErrors.email && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {validationErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-4 h-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>For booking confirmations and studio access</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                      placeholder="(323) 609-3356"
                      className={`${validationErrors.phone ? 'border-red-500' : ''}`}
                    />
                    {validationErrors.phone && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {validationErrors.phone}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="projectType">Project Type *</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-4 h-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Helps us prepare the right equipment for your shoot</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Select value={bookingData.projectType} onValueChange={(value) => setBookingData({ ...bookingData, projectType: value })}>
                      <SelectTrigger className={`${validationErrors.projectType ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
                        {projectTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {validationErrors.projectType && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {validationErrors.projectType}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="projectDetails">Project Details</Label>
                  <Textarea
                    id="projectDetails"
                    value={bookingData.projectDetails}
                    onChange={(e) => setBookingData({ ...bookingData, projectDetails: e.target.value })}
                    placeholder="Tell us about your project, team size, equipment needs, etc..."
                    className="mt-2 min-h-32"
                  />
                </div>

                {/* Add-ons */}
                <div>
                  <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[hsl(var(--luxury-gold))]" />
                    Optional Add-ons
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {addOns.map((addon) => (
                      <Card
                        key={addon.id}
                        className={`p-3 cursor-pointer transition-all hover:scale-105 ${
                          selectedAddOns.includes(addon.id)
                            ? "border-2 border-neon-pink bg-neon-pink/5"
                            : "border-border hover:border-[hsl(var(--luxury-gold))]/50"
                        }`}
                        onClick={() => handleAddOnToggle(addon.id)}
                      >
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={selectedAddOns.includes(addon.id)}
                            onCheckedChange={() => handleAddOnToggle(addon.id)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <h5 className="font-bold text-sm">{addon.name}</h5>
                            <p className="text-xs text-muted-foreground mb-1">{addon.description}</p>
                            <span className="text-sm font-bold text-gradient-neon">+${addon.price}</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {/* Booking Summary */}
              <div className="space-y-6">
                <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-[hsl(var(--luxury-gold))]/20 sticky top-4">
                  <h4 className="text-xl font-bold mb-4 text-gradient-luxury flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Booking Summary
                  </h4>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between pb-2 border-b border-border">
                      <span className="text-muted-foreground">Date:</span>
                      <span className="font-bold">{selectedDate ? format(selectedDate, "PPP") : "Not selected"}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-border">
                      <span className="text-muted-foreground">Time:</span>
                      <span className="font-bold">{selectedTimeSlot || "Not selected"}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-border">
                      <span className="text-muted-foreground">Package:</span>
                      <span className="font-bold">{packages.find(p => p.id === selectedPackage)?.name}</span>
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
                      <span className="text-2xl font-bold text-gradient-neon">${total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Required Deposit (30%):</span>
                      <span className="text-lg font-bold text-[hsl(var(--luxury-gold))]">${deposit}</span>
                    </div>
                  </div>
                </Card>

                <div className="flex gap-4">
                  <Button
                    onClick={() => setBookingStep('calendar')}
                    variant="outline"
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleContinueToPayment}
                    size="lg"
                    className="flex-1 bg-gradient-to-r from-neon-cyan to-neon-pink hover:opacity-90"
                  >
                    Continue to Payment <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Step */}
        {bookingStep === 'payment' && (
          <div className="max-w-2xl mx-auto animate-fade-in px-4 md:px-6">
            <Card className="p-6 md:p-8 bg-gradient-to-br from-card to-card/50 border-[hsl(var(--luxury-gold))]/20">
              <div className="text-center mb-8">
                <CreditCard className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 text-[hsl(var(--luxury-gold))]" />
                <h3 className="text-xl md:text-2xl font-bold mb-2">Secure Your Booking</h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Pay a ${deposit} deposit to reserve your spot. Full payment due on arrival.
                </p>
              </div>

              {/* Payment Form Placeholder */}
              <div className="space-y-6">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    className="mt-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-green-600">256-bit SSL encryption • PCI compliant</span>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={() => setBookingStep('details')}
                    variant="outline"
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleCompleteBooking}
                    size="lg"
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 animate-pulse-glow"
                  >
                    <CreditCard className="mr-2 w-5 h-5" />
                    Pay ${deposit} Deposit
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Trust Indicators */}
        <div className="text-center mt-16 animate-slide-in-up">
          <div className="flex flex-wrap gap-8 justify-center text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4 text-blue-500" />
              <span>Instant Confirmation</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-500" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[hsl(var(--luxury-gold))]" />
              <span>Free Cancellation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
