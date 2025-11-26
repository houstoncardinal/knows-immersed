import { useState, useMemo } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdvancedDataTable } from "@/components/admin/AdvancedDataTable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
  Mail,
  Phone,
  MapPin,
  DollarSign,
} from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Calendar } from "react-big-calendar";
import { dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import { toast } from "sonner";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

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
  {
    id: "BK-006",
    client: "Alex Johnson",
    email: "alex@email.com",
    phone: "323-555-0128",
    date: "2025-12-03",
    time: "10:00 AM - 6:00 PM",
    package: "Full Day",
    status: "pending",
    amount: 450,
    addOns: ["Green Screen"],
    notes: "Corporate headshots",
  },
];

type Booking = typeof mockBookings[0];

export const EnhancedBookings = () => {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [viewMode, setViewMode] = useState<"table" | "calendar">("table");

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: string; icon: any; color: string }> = {
      confirmed: {
        variant: "default",
        icon: CheckCircle,
        color: "bg-green-500/10 text-green-500 border-green-500/20",
      },
      pending: {
        variant: "secondary",
        icon: Clock,
        color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      },
      cancelled: {
        variant: "destructive",
        icon: XCircle,
        color: "bg-red-500/10 text-red-500 border-red-500/20",
      },
    };

    const config = variants[status] || variants.pending;
    const Icon = config.icon;

    return (
      <Badge className={`${config.color} border`}>
        <Icon className="w-3 h-3 mr-1" />
        {status}
      </Badge>
    );
  };

  const columns: ColumnDef<Booking>[] = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Booking ID",
        cell: ({ row }) => (
          <span className="font-mono text-sm font-semibold">{row.getValue("id")}</span>
        ),
      },
      {
        accessorKey: "client",
        header: "Client",
        cell: ({ row }) => (
          <div>
            <p className="font-medium">{row.getValue("client")}</p>
            <p className="text-xs text-muted-foreground">{row.original.email}</p>
          </div>
        ),
      },
      {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => (
          <div>
            <p className="font-medium">{row.getValue("date")}</p>
            <p className="text-xs text-muted-foreground">{row.original.time}</p>
          </div>
        ),
      },
      {
        accessorKey: "package",
        header: "Package",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => getStatusBadge(row.getValue("status")),
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => (
          <span className="font-semibold text-green-500">
            ${row.getValue("amount")}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedBooking(row.original)}
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toast.info("Edit booking - Coming Soon")}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                toast.success("Booking deleted");
              }}
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  // Calendar events
  const calendarEvents = useMemo(
    () =>
      mockBookings.map((booking) => ({
        id: booking.id,
        title: `${booking.client} - ${booking.package}`,
        start: new Date(booking.date + "T10:00:00"),
        end: new Date(booking.date + "T18:00:00"),
        resource: booking,
      })),
    []
  );

  const eventStyleGetter = (event: any) => {
    const status = event.resource.status;
    const colors: Record<string, any> = {
      confirmed: {
        backgroundColor: "#00ffff33",
        borderLeft: "4px solid #00ffff",
      },
      pending: {
        backgroundColor: "#ffff0033",
        borderLeft: "4px solid #ffff00",
      },
      cancelled: {
        backgroundColor: "#ff6b6b33",
        borderLeft: "4px solid #ff6b6b",
      },
    };

    return {
      style: colors[status] || colors.pending,
    };
  };

  const stats = [
    {
      label: "Total Bookings",
      value: mockBookings.length,
      icon: CalendarIcon,
      color: "from-neon-cyan to-blue-500",
    },
    {
      label: "Confirmed",
      value: mockBookings.filter((b) => b.status === "confirmed").length,
      icon: CheckCircle,
      color: "from-green-400 to-emerald-500",
    },
    {
      label: "Pending",
      value: mockBookings.filter((b) => b.status === "pending").length,
      icon: Clock,
      color: "from-yellow-400 to-orange-500",
    },
    {
      label: "Total Revenue",
      value: `$${mockBookings.reduce((sum, b) => sum + b.amount, 0)}`,
      icon: DollarSign,
      color: "from-neon-pink to-purple-500",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Booking Management</h1>
            <p className="text-muted-foreground">
              Manage and track all studio bookings
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => toast.info("Export bookings - Coming Soon")}
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button className="bg-gradient-to-r from-neon-cyan to-neon-pink hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
              New Booking
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className="p-4 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {stat.label}
                    </p>
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                  </div>
                  <div
                    className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Tabs */}
        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)}>
          <TabsList>
            <TabsTrigger value="table">
              <Filter className="w-4 h-4 mr-2" />
              Table View
            </TabsTrigger>
            <TabsTrigger value="calendar">
              <CalendarIcon className="w-4 h-4 mr-2" />
              Calendar View
            </TabsTrigger>
          </TabsList>

          <TabsContent value="table" className="space-y-4">
            <AdvancedDataTable
              columns={columns}
              data={mockBookings}
              searchPlaceholder="Search by client or booking ID..."
              exportFileName="knows-studios-bookings"
              enableExport={true}
            />
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
              <div style={{ height: 600 }}>
                <Calendar
                  localizer={localizer}
                  events={calendarEvents}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: "100%" }}
                  eventPropGetter={eventStyleGetter}
                  onSelectEvent={(event) =>
                    setSelectedBooking(event.resource as Booking)
                  }
                  views={["month", "week", "day"]}
                  defaultView="month"
                />
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Booking Details Modal */}
        <Dialog
          open={!!selectedBooking}
          onOpenChange={() => setSelectedBooking(null)}
        >
          <DialogContent className="max-w-2xl bg-studio-darker border-border">
            <DialogHeader>
              <DialogTitle className="text-2xl">Booking Details</DialogTitle>
              <DialogDescription>
                Viewing details for {selectedBooking?.id}
              </DialogDescription>
            </DialogHeader>

            {selectedBooking && (
              <div className="space-y-6">
                {/* Status */}
                <div className="flex items-center justify-between">
                  {getStatusBadge(selectedBooking.status)}
                  <span className="text-2xl font-bold text-green-500">
                    ${selectedBooking.amount}
                  </span>
                </div>

                {/* Client Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary" />
                      Client Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="text-muted-foreground">Name:</span>{" "}
                        {selectedBooking.client}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Email:</span>{" "}
                        {selectedBooking.email}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Phone:</span>{" "}
                        {selectedBooking.phone}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-primary" />
                      Booking Details
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="text-muted-foreground">Date:</span>{" "}
                        {selectedBooking.date}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Time:</span>{" "}
                        {selectedBooking.time}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Package:</span>{" "}
                        {selectedBooking.package}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Add-ons */}
                {selectedBooking.addOns.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Add-ons</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedBooking.addOns.map((addon, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="border-primary/50"
                        >
                          {addon}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notes */}
                <div>
                  <h3 className="font-semibold mb-2">Notes</h3>
                  <p className="text-sm text-muted-foreground bg-muted/20 p-3 rounded-lg">
                    {selectedBooking.notes}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-border">
                  <Button className="flex-1 bg-gradient-to-r from-neon-cyan to-blue-500">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Booking
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => toast.success("Email sent to client")}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email Client
                  </Button>
                  {selectedBooking.status === "pending" && (
                    <Button className="flex-1 bg-gradient-to-r from-green-400 to-emerald-500">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Confirm
                    </Button>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};
