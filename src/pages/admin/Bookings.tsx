import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Calendar as CalendarIcon,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  Plus,
} from "lucide-react";
import { format } from "date-fns";

// Mock booking data
const mockBookings = [
  {
    id: "BK-001",
    client: "Sarah Martinez",
    email: "sarah@email.com",
    phone: "323-555-0123",
    date: "2025-11-28",
    time: "10:00 AM - 6:00 PM",
    package: "Full Day",
    status: "confirmed",
    amount: 450,
    addOns: ["Premium Lighting", "Studio Assistant"],
    notes: "Fashion shoot for winter collection",
  },
  {
    id: "BK-002",
    client: "Marcus Chen",
    email: "marcus@email.com",
    phone: "323-555-0124",
    date: "2025-11-29",
    time: "2:00 PM - 6:00 PM",
    package: "Half Day",
    status: "pending",
    amount: 250,
    addOns: [],
    notes: "Music video shoot",
  },
  {
    id: "BK-003",
    client: "Emily Rodriguez",
    email: "emily@email.com",
    phone: "323-555-0125",
    date: "2025-11-30",
    time: "9:00 AM - 5:00 PM",
    package: "Multi-Day (3 days)",
    status: "confirmed",
    amount: 1200,
    addOns: ["Camera Equipment", "Additional Backdrops"],
    notes: "Commercial product photography",
  },
  {
    id: "BK-004",
    client: "David Thompson",
    email: "david@email.com",
    phone: "323-555-0126",
    date: "2025-12-01",
    time: "1:00 PM - 9:00 PM",
    package: "Full Day",
    status: "confirmed",
    amount: 450,
    addOns: ["Premium Lighting"],
    notes: "Portrait session",
  },
  {
    id: "BK-005",
    client: "Jasmine Lee",
    email: "jasmine@email.com",
    phone: "323-555-0127",
    date: "2025-12-02",
    time: "10:00 AM - 2:00 PM",
    package: "Half Day",
    status: "cancelled",
    amount: 250,
    addOns: [],
    notes: "Client requested cancellation",
  },
];

export const AdminBookings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [viewMode, setViewMode] = useState<"table" | "calendar">("table");
  const [selectedBooking, setSelectedBooking] = useState<typeof mockBookings[0] | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "cancelled":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const filteredBookings = mockBookings.filter((booking) => {
    const matchesSearch =
      booking.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header with Actions */}
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Booking Management</h1>
            <p className="text-muted-foreground text-sm sm:text-base">Manage and track all studio bookings</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Button variant="outline" className="flex-1 sm:flex-none">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button className="bg-gradient-to-r from-neon-cyan to-neon-pink hover:opacity-90 flex-1 sm:flex-none">
              <Plus className="w-4 h-4 mr-2" />
              New Booking
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by client name or booking ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "table" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("table")}
              >
                <Filter className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "calendar" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("calendar")}
              >
                <CalendarIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Table View */}
        {viewMode === "table" && (
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Package</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{booking.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{booking.client}</p>
                          <p className="text-xs text-muted-foreground">{booking.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{booking.date}</p>
                          <p className="text-xs text-muted-foreground">{booking.time}</p>
                        </div>
                      </TableCell>
                      <TableCell>{booking.package}</TableCell>
                      <TableCell>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border inline-flex items-center gap-1 ${getStatusColor(booking.status)}`}>
                          {getStatusIcon(booking.status)}
                          {booking.status}
                        </span>
                      </TableCell>
                      <TableCell className="font-bold">${booking.amount}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedBooking(booking)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        )}

        {/* Calendar View */}
        {viewMode === "calendar" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 p-6 bg-card/50 backdrop-blur-sm border-border">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </Card>
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
              <h3 className="font-bold mb-4">
                {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}
              </h3>
              <div className="space-y-3">
                {mockBookings
                  .filter((b) => !selectedDate || b.date === format(selectedDate, "yyyy-MM-dd"))
                  .map((booking) => (
                    <div
                      key={booking.id}
                      className="p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-all cursor-pointer"
                      onClick={() => setSelectedBooking(booking)}
                    >
                      <p className="font-medium mb-1">{booking.client}</p>
                      <p className="text-xs text-muted-foreground mb-2">{booking.time}</p>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                  ))}
              </div>
            </Card>
          </div>
        )}

        {/* Booking Details Modal */}
        <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
          <DialogContent className="max-w-2xl bg-studio-darker border-border">
            <DialogHeader>
              <DialogTitle className="text-2xl">Booking Details</DialogTitle>
            </DialogHeader>
            {selectedBooking && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Booking ID</p>
                    <p className="font-bold">{selectedBooking.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Status</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border inline-flex items-center gap-1 ${getStatusColor(selectedBooking.status)}`}>
                      {getStatusIcon(selectedBooking.status)}
                      {selectedBooking.status}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold mb-3">Client Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Name</p>
                      <p className="font-medium">{selectedBooking.client}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Email</p>
                      <p className="font-medium">{selectedBooking.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Phone</p>
                      <p className="font-medium">{selectedBooking.phone}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold mb-3">Booking Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Date</p>
                      <p className="font-medium">{selectedBooking.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Time</p>
                      <p className="font-medium">{selectedBooking.time}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Package</p>
                      <p className="font-medium">{selectedBooking.package}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Amount</p>
                      <p className="font-bold text-xl">${selectedBooking.amount}</p>
                    </div>
                  </div>
                </div>

                {selectedBooking.addOns.length > 0 && (
                  <div>
                    <h3 className="font-bold mb-3">Add-ons</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedBooking.addOns.map((addon, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                          {addon}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="font-bold mb-3">Notes</h3>
                  <p className="text-muted-foreground">{selectedBooking.notes}</p>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Confirm Booking
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Details
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};
