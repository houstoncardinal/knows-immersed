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
        return "bg-green-500/10 text-green-500";
      case "in-progress":
        return "bg-blue-500/10 text-blue-500";
      case "planning":
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
            <h1 className="text-3xl font-bold mb-2">Project Management</h1>
            <p className="text-muted-foreground">Track and manage multi-booking projects</p>
          </div>
          <Button className="bg-gradient-to-r from-neon-cyan to-neon-pink">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Active Projects</p>
            <p className="text-3xl font-bold">2</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Total Value</p>
            <p className="text-3xl font-bold">$16,500</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Avg Completion</p>
            <p className="text-3xl font-bold">68%</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockProjects.map((project) => (
            <Card key={project.id} className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-neon-cyan to-blue-500">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{project.name}</h3>
                    <p className="text-sm text-muted-foreground">{project.id}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-bold">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{project.client}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{project.bookings} bookings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{project.startDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">${project.spent} / ${project.budget}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full">View Details</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};
