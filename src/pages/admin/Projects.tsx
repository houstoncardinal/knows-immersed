import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Briefcase, Plus, Calendar, User, DollarSign } from "lucide-react";

const mockProjects = [
  {
    id: "PRJ-001",
    name: "Winter Fashion Campaign",
    client: "Sarah Martinez",
    status: "in-progress",
    progress: 65,
    startDate: "2025-11-25",
    endDate: "2025-12-05",
    budget: 5000,
    spent: 3250,
    bookings: 3,
  },
  {
    id: "PRJ-002",
    name: "Music Video - Album Release",
    client: "Marcus Chen",
    status: "planning",
    progress: 20,
    startDate: "2025-12-01",
    endDate: "2025-12-15",
    budget: 3500,
    spent: 700,
    bookings: 1,
  },
  {
    id: "PRJ-003",
    name: "Product Photography Series",
    client: "Emily Rodriguez",
    status: "completed",
    progress: 100,
    startDate: "2025-10-15",
    endDate: "2025-11-20",
    budget: 8000,
    spent: 7850,
    bookings: 5,
  },
];

export const AdminProjects = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-800 border border-emerald-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      case "planning":
        return "bg-amber-100 text-amber-800 border border-amber-200";
      default:
        return "bg-slate-100 text-slate-800 border border-slate-200";
    }
  };

  const stats = [
    {
      label: "Active Projects",
      value: mockProjects.filter(p => p.status !== "completed").length,
      icon: Briefcase,
      color: "bg-blue-50 text-blue-700",
    },
    {
      label: "Total Value",
      value: `$${mockProjects.reduce((sum, p) => sum + p.budget, 0).toLocaleString()}`,
      icon: DollarSign,
      color: "bg-emerald-50 text-emerald-700",
    },
    {
      label: "Avg Completion",
      value: `${Math.round(mockProjects.reduce((sum, p) => sum + p.progress, 0) / mockProjects.length)}%`,
      icon: Calendar,
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
                <h1 className="text-4xl font-bold text-slate-900 mb-2">Project Management</h1>
                <p className="text-lg text-slate-600">Advanced multi-booking project tracking and management</p>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    {mockProjects.length} Total Projects
                  </div>
                  <div className="text-sm text-slate-500">
                    Last updated: {new Date().toLocaleTimeString()}
                  </div>
                </div>
              </div>
              <Button className="bg-slate-900 hover:bg-slate-800 text-white">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </div>
          </div>

          {/* Advanced KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockProjects.map((project) => (
              <Card key={project.id} className="bg-white border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-300 p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <Briefcase className="w-8 h-8 text-slate-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1">{project.name}</h3>
                      <p className="text-sm text-slate-500 mb-2">{project.id}</p>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-slate-600">Progress</span>
                    <span className="text-sm font-bold text-slate-900">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${
                        project.status === "completed" ? "bg-emerald-500" :
                        project.status === "in-progress" ? "bg-blue-500" :
                        "bg-amber-500"
                      }`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <User className="w-4 h-4 text-slate-500" />
                      <span className="text-sm font-medium text-slate-500">Client</span>
                    </div>
                    <p className="font-medium text-slate-900">{project.client}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      <span className="text-sm font-medium text-slate-500">Bookings</span>
                    </div>
                    <p className="font-medium text-slate-900">{project.bookings} sessions</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      <span className="text-sm font-medium text-slate-500">Start Date</span>
                    </div>
                    <p className="font-medium text-slate-900">{project.startDate}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="w-4 h-4 text-slate-500" />
                      <span className="text-sm font-medium text-slate-500">Budget</span>
                    </div>
                    <p className="font-medium text-slate-900">${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50">
                    View Details
                  </Button>
                  <Button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white">
                    Manage Project
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
