import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Package, Plus, Search, AlertCircle, CheckCircle, Settings } from "lucide-react";
import { useState } from "react";

const mockEquipment = [
  {
    id: "EQ-001",
    name: "Aputure LS 1200d Pro LED",
    category: "Lighting",
    status: "available",
    condition: "excellent",
    lastMaintenance: "2025-11-01",
    nextMaintenance: "2026-02-01",
    value: 2500,
    usage: "78%",
  },
  {
    id: "EQ-002",
    name: "DigitalFoto S300",
    category: "Lighting",
    status: "in-use",
    condition: "good",
    lastMaintenance: "2025-10-15",
    nextMaintenance: "2026-01-15",
    value: 1800,
    usage: "85%",
  },
  {
    id: "EQ-003",
    name: "Sony Playback Speaker",
    category: "Audio",
    status: "available",
    condition: "excellent",
    lastMaintenance: "2025-11-10",
    nextMaintenance: "2026-02-10",
    value: 800,
    usage: "45%",
  },
  {
    id: "EQ-004",
    name: "ASTERA PIXELTUBE SET OF 8",
    category: "Lighting",
    status: "maintenance",
    condition: "good",
    lastMaintenance: "2025-11-20",
    nextMaintenance: "2025-12-20",
    value: 3200,
    usage: "92%",
  },
];

export const AdminEquipment = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEquipment = mockEquipment.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500/10 text-green-500";
      case "in-use":
        return "bg-blue-500/10 text-blue-500";
      case "maintenance":
        return "bg-yellow-500/10 text-yellow-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Equipment Inventory</h1>
            <p className="text-muted-foreground">Manage and track all studio equipment</p>
          </div>
          <Button className="bg-gradient-to-r from-neon-cyan to-neon-pink">
            <Plus className="w-4 h-4 mr-2" />
            Add Equipment
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Total Items</p>
            <p className="text-3xl font-bold">{mockEquipment.length}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Available</p>
            <p className="text-3xl font-bold text-green-500">
              {mockEquipment.filter(e => e.status === "available").length}
            </p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-2">In Use</p>
            <p className="text-3xl font-bold text-blue-500">
              {mockEquipment.filter(e => e.status === "in-use").length}
            </p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Maintenance</p>
            <p className="text-3xl font-bold text-yellow-500">
              {mockEquipment.filter(e => e.status === "maintenance").length}
            </p>
          </Card>
        </div>

        <Card className="p-6">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search equipment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredEquipment.map((item) => (
              <Card key={item.id} className="p-6 bg-muted/20 hover:bg-muted/30 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-neon-cyan to-blue-500">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.id} • {item.category}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(item.status)}>
                    {item.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Condition</p>
                    <div className="flex items-center gap-1">
                      {item.condition === "excellent" ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-yellow-500" />
                      )}
                      <span className="capitalize">{item.condition}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Value</p>
                    <p className="font-bold">${item.value}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Usage</p>
                    <p className="font-bold">{item.usage}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Next Service</p>
                    <p className="font-bold text-xs">{item.nextMaintenance}</p>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full mt-4">
                  <Settings className="w-4 h-4 mr-2" />
                  Manage
                </Button>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};
