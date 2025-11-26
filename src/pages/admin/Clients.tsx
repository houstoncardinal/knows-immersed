import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  Search,
  Plus,
  Eye,
  Edit,
  Mail,
  Phone,
  MapPin,
  Star,
  TrendingUp,
  Calendar,
} from "lucide-react";

// Mock client data
const mockClients = [
  {
    id: "CL-001",
    name: "Sarah Martinez",
    email: "sarah@email.com",
    phone: "323-555-0123",
    company: "Fashion Forward Inc",
    type: "Corporate",
    totalBookings: 12,
    totalSpent: 5400,
    lastBooking: "2025-11-28",
    status: "active",
    rating: 5,
    notes: "Preferred client - Fashion photographer, books monthly",
  },
  {
    id: "CL-002",
    name: "Marcus Chen",
    email: "marcus@email.com",
    phone: "323-555-0124",
    company: "Indie Music Productions",
    type: "Individual",
    totalBookings: 8,
    totalSpent: 3600,
    lastBooking: "2025-11-29",
    status: "active",
    rating: 5,
    notes: "Music video director, usually books Full Day package",
  },
  {
    id: "CL-003",
    name: "Emily Rodriguez",
    email: "emily@email.com",
    phone: "323-555-0125",
    company: "Content Creators Co",
    type: "Corporate",
    totalBookings: 15,
    totalSpent: 6750,
    lastBooking: "2025-11-30",
    status: "active",
    rating: 5,
    notes: "Regular client - Social media content creation",
  },
  {
    id: "CL-004",
    name: "David Thompson",
    email: "david@email.com",
    phone: "323-555-0126",
    company: "DT Commercial Photography",
    type: "Individual",
    totalBookings: 6,
    totalSpent: 2700,
    lastBooking: "2025-12-01",
    status: "active",
    rating: 4,
    notes: "Commercial photographer - portrait sessions",
  },
  {
    id: "CL-005",
    name: "Jasmine Lee",
    email: "jasmine@email.com",
    phone: "323-555-0127",
    company: "JL Studios",
    type: "Individual",
    totalBookings: 4,
    totalSpent: 1800,
    lastBooking: "2025-10-15",
    status: "inactive",
    rating: 5,
    notes: "Portrait photographer - hasn't booked in over a month",
  },
];

export const AdminClients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState<typeof mockClients[0] | null>(null);

  const filteredClients = mockClients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    {
      label: "Total Clients",
      value: mockClients.length,
      change: "+5 this month",
      color: "from-neon-cyan to-blue-500",
    },
    {
      label: "Active Clients",
      value: mockClients.filter(c => c.status === "active").length,
      change: "89% retention",
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "Avg. Booking Value",
      value: "$450",
      change: "+12% vs last month",
      color: "from-neon-pink to-purple-500",
    },
    {
      label: "Top Client Spend",
      value: `$${Math.max(...mockClients.map(c => c.totalSpent))}`,
      change: "Emily Rodriguez",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Client Management</h1>
            <p className="text-muted-foreground">Manage and track all your clients</p>
          </div>
          <Button className="bg-gradient-to-r from-neon-cyan to-neon-pink hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" />
            Add Client
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all">
              <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
              <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </Card>
          ))}
        </div>

        {/* Search */}
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search clients by name, email, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        {/* Clients Table */}
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Bookings</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Last Booking</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <p className="font-medium">{client.name}</p>
                        <p className="text-xs text-muted-foreground">{client.company}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-xs flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {client.email}
                        </p>
                        <p className="text-xs flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {client.phone}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={client.type === "Corporate" ? "default" : "secondary"}>
                        {client.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{client.totalBookings}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-bold">${client.totalSpent}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{client.lastBooking}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {[...Array(client.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={client.status === "active" ? "default" : "secondary"}
                        className={client.status === "active" ? "bg-green-500/10 text-green-500" : "bg-gray-500/10 text-gray-500"}
                      >
                        {client.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedClient(client)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Client Details Modal */}
        <Dialog open={!!selectedClient} onOpenChange={() => setSelectedClient(null)}>
          <DialogContent className="max-w-2xl bg-studio-darker border-border">
            <DialogHeader>
              <DialogTitle className="text-2xl">Client Profile</DialogTitle>
            </DialogHeader>
            {selectedClient && (
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{selectedClient.name}</h3>
                    <p className="text-muted-foreground">{selectedClient.company}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {[...Array(selectedClient.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                  </div>
                  <Badge
                    variant={selectedClient.status === "active" ? "default" : "secondary"}
                    className={`${selectedClient.status === "active" ? "bg-green-500/10 text-green-500" : "bg-gray-500/10 text-gray-500"} text-base px-4 py-2`}
                  >
                    {selectedClient.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4 bg-muted/20">
                    <p className="text-sm text-muted-foreground mb-1">Total Bookings</p>
                    <p className="text-2xl font-bold">{selectedClient.totalBookings}</p>
                  </Card>
                  <Card className="p-4 bg-muted/20">
                    <p className="text-sm text-muted-foreground mb-1">Total Spent</p>
                    <p className="text-2xl font-bold text-green-500">${selectedClient.totalSpent}</p>
                  </Card>
                </div>

                <div>
                  <h4 className="font-bold mb-3">Contact Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedClient.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedClient.phone}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold mb-3">Client Notes</h4>
                  <p className="text-muted-foreground">{selectedClient.notes}</p>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1 bg-gradient-to-r from-neon-cyan to-blue-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    Create Booking
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
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
