import { useState, useMemo } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AdvancedDataTable } from "@/components/admin/AdvancedDataTable";
import { FileUpload } from "@/components/admin/FileUpload";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Users,
  TrendingUp,
  DollarSign,
  Award,
  Eye,
  Edit,
  Mail,
  Phone,
  Building2,
  Calendar,
  Star,
  Plus,
  FileText,
  MessageSquare,
} from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";

// Mock client data
const mockClients = [
  {
    id: "CL-001",
    name: "Sarah Martinez",
    email: "sarah@email.com",
    phone: "323-555-0123",
    company: "Fashion Forward Inc.",
    type: "Corporate",
    totalBookings: 12,
    totalSpent: 5400,
    lastBooking: "2025-11-15",
    status: "active",
    rating: 5.0,
    notes: "Prefers morning sessions. VIP client.",
  },
  {
    id: "CL-002",
    client: "Marcus Chen",
    email: "marcus@email.com",
    phone: "323-555-0124",
    company: "Self-Employed",
    type: "Individual",
    totalBookings: 8,
    totalSpent: 2800,
    lastBooking: "2025-10-28",
    status: "active",
    rating: 4.8,
    notes: "Music video producer. Regular client.",
  },
  {
    id: "CL-003",
    name: "Emily Rodriguez",
    email: "emily@email.com",
    phone: "323-555-0125",
    company: "Product Pro Photography",
    type: "Corporate",
    totalBookings: 15,
    totalSpent: 8250,
    lastBooking: "2025-11-20",
    status: "active",
    rating: 4.9,
    notes: "Commercial photography. Needs quick turnaround.",
  },
  {
    id: "CL-004",
    name: "David Thompson",
    email: "david@email.com",
    phone: "323-555-0126",
    company: "Self-Employed",
    type: "Individual",
    totalBookings: 5,
    totalSpent: 1750,
    lastBooking: "2025-09-15",
    status: "inactive",
    rating: 4.5,
    notes: "Portrait photographer. Occasional bookings.",
  },
  {
    id: "CL-005",
    name: "Jasmine Lee",
    email: "jasmine@email.com",
    phone: "323-555-0127",
    company: "Creative Studios LA",
    type: "Corporate",
    totalBookings: 9,
    totalSpent: 4950,
    lastBooking: "2025-11-10",
    status: "active",
    rating: 5.0,
    notes: "High-value client. Always books premium packages.",
  },
];

type Client = typeof mockClients[0];

export const EnhancedClients = () => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showDocuments, setShowDocuments] = useState(false);

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-500 text-yellow-500"
            : "text-gray-400"
        }`}
      />
    ));
  };

  const columns: ColumnDef<Client>[] = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Client ID",
        cell: ({ row }) => (
          <span className="font-mono text-sm font-semibold">
            {row.getValue("id")}
          </span>
        ),
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div>
            <p className="font-medium">{row.getValue("name")}</p>
            <p className="text-xs text-muted-foreground">{row.original.email}</p>
          </div>
        ),
      },
      {
        accessorKey: "company",
        header: "Company",
        cell: ({ row }) => (
          <div>
            <p className="font-medium">{row.getValue("company")}</p>
            <Badge variant="outline" className="text-xs mt-1">
              {row.original.type}
            </Badge>
          </div>
        ),
      },
      {
        accessorKey: "totalBookings",
        header: "Bookings",
        cell: ({ row }) => (
          <div className="text-center">
            <span className="font-semibold">{row.getValue("totalBookings")}</span>
          </div>
        ),
      },
      {
        accessorKey: "totalSpent",
        header: "Total Spent",
        cell: ({ row }) => (
          <span className="font-semibold text-green-500">
            ${row.getValue("totalSpent")}
          </span>
        ),
      },
      {
        accessorKey: "rating",
        header: "Rating",
        cell: ({ row }) => (
          <div className="flex items-center gap-1">
            {getRatingStars(row.getValue("rating"))}
            <span className="text-sm ml-1">{row.getValue("rating")}</span>
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("status") as string;
          return (
            <Badge
              className={
                status === "active"
                  ? "bg-green-500/10 text-green-500 border-green-500/20"
                  : "bg-gray-500/10 text-gray-500 border-gray-500/20"
              }
            >
              {status}
            </Badge>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedClient(row.original)}
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toast.info("Edit client - Coming Soon")}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toast.success("Email sent to client")}
            >
              <Mail className="w-4 h-4 text-primary" />
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  const stats = [
    {
      label: "Total Clients",
      value: mockClients.length,
      icon: Users,
      color: "from-neon-cyan to-blue-500",
    },
    {
      label: "Active Clients",
      value: mockClients.filter((c) => c.status === "active").length,
      icon: TrendingUp,
      color: "from-green-400 to-emerald-500",
    },
    {
      label: "Total Revenue",
      value: `$${mockClients.reduce((sum, c) => sum + c.totalSpent, 0)}`,
      icon: DollarSign,
      color: "from-neon-pink to-purple-500",
    },
    {
      label: "Avg Rating",
      value: (
        mockClients.reduce((sum, c) => sum + c.rating, 0) / mockClients.length
      ).toFixed(1),
      icon: Award,
      color: "from-yellow-400 to-orange-500",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Client Management</h1>
            <p className="text-muted-foreground">
              Manage client relationships and track engagement
            </p>
          </div>

          <Button className="bg-gradient-to-r from-neon-cyan to-neon-pink hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" />
            Add New Client
          </Button>
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

        {/* Data Table */}
        <AdvancedDataTable
          columns={columns}
          data={mockClients}
          searchPlaceholder="Search by name, email, or company..."
          exportFileName="knows-studios-clients"
          enableExport={true}
        />

        {/* Client Details Modal */}
        <Dialog
          open={!!selectedClient}
          onOpenChange={() => setSelectedClient(null)}
        >
          <DialogContent className="max-w-4xl bg-studio-darker border-border max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">Client Profile</DialogTitle>
              <DialogDescription>
                Complete client information and history
              </DialogDescription>
            </DialogHeader>

            {selectedClient && (
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="bookings">Bookings</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                  {/* Header Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <Card className="p-4 bg-muted/20">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          Total Bookings
                        </span>
                      </div>
                      <p className="text-2xl font-bold">
                        {selectedClient.totalBookings}
                      </p>
                    </Card>
                    <Card className="p-4 bg-muted/20">
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-muted-foreground">
                          Total Spent
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-green-500">
                        ${selectedClient.totalSpent}
                      </p>
                    </Card>
                    <Card className="p-4 bg-muted/20">
                      <div className="flex items-center gap-2 mb-1">
                        <Award className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm text-muted-foreground">
                          Rating
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-2xl font-bold">
                          {selectedClient.rating}
                        </p>
                        <div className="flex">
                          {getRatingStars(selectedClient.rating)}
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        Contact Information
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span>{selectedClient.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span>{selectedClient.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-muted-foreground" />
                          <span>{selectedClient.company}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary" />
                        Client Details
                      </h3>
                      <div className="space-y-3 text-sm">
                        <p>
                          <span className="text-muted-foreground">Type:</span>{" "}
                          <Badge variant="outline">{selectedClient.type}</Badge>
                        </p>
                        <p>
                          <span className="text-muted-foreground">Status:</span>{" "}
                          <Badge
                            className={
                              selectedClient.status === "active"
                                ? "bg-green-500/10 text-green-500"
                                : "bg-gray-500/10 text-gray-500"
                            }
                          >
                            {selectedClient.status}
                          </Badge>
                        </p>
                        <p>
                          <span className="text-muted-foreground">
                            Last Booking:
                          </span>{" "}
                          {selectedClient.lastBooking}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex gap-3 pt-4 border-t border-border">
                    <Button className="flex-1 bg-gradient-to-r from-neon-cyan to-blue-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      New Booking
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => toast.success("Email sent")}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Send Email
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Client
                    </Button>
                  </div>
                </TabsContent>

                {/* Bookings Tab */}
                <TabsContent value="bookings" className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Booking history for {selectedClient.name}
                  </p>
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <Card key={i} className="p-4 bg-muted/20">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Full Day Shoot</p>
                            <p className="text-sm text-muted-foreground">
                              November {i * 5}, 2025
                            </p>
                          </div>
                          <Badge className="bg-green-500/10 text-green-500">
                            Completed
                          </Badge>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Documents Tab */}
                <TabsContent value="documents" className="space-y-4">
                  <FileUpload
                    maxSize={10}
                    multiple={true}
                    onUpload={(files) => {
                      toast.success(`${files.length} file(s) uploaded`);
                    }}
                  />
                </TabsContent>

                {/* Notes Tab */}
                <TabsContent value="notes" className="space-y-4">
                  <Card className="p-4 bg-muted/20">
                    <div className="flex items-start gap-2 mb-2">
                      <MessageSquare className="w-4 h-4 text-primary mt-1" />
                      <div className="flex-1">
                        <p className="font-medium mb-1">Internal Notes</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedClient.notes}
                        </p>
                      </div>
                    </div>
                  </Card>
                  <Button variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Note
                  </Button>
                </TabsContent>
              </Tabs>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};
