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
        return "bg-emerald-100 text-emerald-800 border border-emerald-200";
      case "in-use":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      case "maintenance":
        return "bg-amber-100 text-amber-800 border border-amber-200";
      default:
        return "bg-slate-100 text-slate-800 border border-slate-200";
    }
  };

  const stats = [
    {
      label: "Total Items",
      value: mockEquipment.length,
      icon: Package,
      color: "bg-slate-50 text-slate-700",
    },
    {
      label: "Available",
      value: mockEquipment.filter(e => e.status === "available").length,
      icon: CheckCircle,
      color: "bg-emerald-50 text-emerald-700",
    },
    {
      label: "In Use",
      value: mockEquipment.filter(e => e.status === "in-use").length,
      icon: Settings,
      color: "bg-blue-50 text-blue-700",
    },
    {
      label: "Maintenance",
      value: mockEquipment.filter(e => e.status === "maintenance").length,
      icon: AlertCircle,
      color: "bg-amber-50 text-amber-700",
    },
  ];

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="space-y-8 p-8">
          {/* Professional Header */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-slate-900 mb-2">Equipment Inventory</h1>
                <p className="text-lg text-slate-600">Advanced equipment management and maintenance tracking</p>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    {filteredEquipment.length} Equipment Items
                  </div>
                  <div className="text-sm text-slate-500">
                    Last updated: {new Date().toLocaleTimeString()}
                  </div>
                </div>
              </div>
              <Button className="bg-slate-900 hover:bg-slate-800 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Equipment
              </Button>
            </div>
          </div>

          {/* Advanced KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={index}
                  className="relative overflow-hidden bg-white border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                    <Icon className="w-full h-full" />
                  </div>

                  <div className="p-8 relative">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">{stat.label}</p>
                        <h3 className="text-4xl font-bold text-slate-900 mb-1">{stat.value}</h3>
                      </div>
                      <div className={`p-4 rounded-2xl ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8" />
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 rounded-full h-2 mb-2">
                      <div
                        className="h-2 rounded-full transition-all duration-500 bg-slate-500"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                    <p className="text-xs text-slate-500">Performance: Excellent</p>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Search */}
          <Card className="p-6 bg-white border border-slate-200 shadow-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search equipment by name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-slate-300 focus:border-slate-400"
              />
            </div>
          </Card>

          {/* Equipment Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredEquipment.map((item) => (
              <Card key={item.id} className="bg-white border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-300 p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <Package className="w-8 h-8 text-slate-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1">{item.name}</h3>
                      <p className="text-sm text-slate-500 mb-2">{item.id} • {item.category}</p>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-slate-500 mb-1">Condition</p>
                    <div className="flex items-center gap-2">
                      {item.condition === "excellent" ? (
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                      )}
                      <span className="font-medium capitalize text-slate-900">{item.condition}</span>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-slate-500 mb-1">Value</p>
                    <p className="text-xl font-bold text-slate-900">${item.value.toLocaleString()}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-slate-500 mb-1">Usage Rate</p>
                    <p className="text-xl font-bold text-slate-900">{item.usage}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-slate-500 mb-1">Next Service</p>
                    <p className="text-sm font-bold text-slate-900">{item.nextMaintenance}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50">
                    <Settings className="w-4 h-4 mr-2" />
                    Manage
                  </Button>
                  <Button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white">
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
