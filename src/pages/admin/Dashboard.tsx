import { Card } from "@/components/ui/card";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ActivityLog } from "@/components/admin/ActivityLog";
import {
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data - Replace with real API calls
const stats = [
  {
    title: "Total Bookings",
    value: "127",
    change: "+12%",
    trend: "up",
    icon: Calendar,
    color: "from-neon-cyan to-blue-500",
  },
  {
    title: "Active Clients",
    value: "89",
    change: "+8%",
    trend: "up",
    icon: Users,
    color: "from-neon-pink to-purple-500",
  },
  {
    title: "Monthly Revenue",
    value: "$45,280",
    change: "+23%",
    trend: "up",
    icon: DollarSign,
    color: "from-green-400 to-emerald-500",
  },
  {
    title: "Equipment Usage",
    value: "78%",
    change: "-5%",
    trend: "down",
    icon: Package,
    color: "from-orange-400 to-red-500",
  },
];

const recentBookings = [
  {
    id: "1",
    client: "Sarah Martinez",
    date: "2025-11-28",
    time: "10:00 AM",
    package: "Full Day",
    status: "confirmed",
    amount: "$450",
  },
  {
    id: "2",
    client: "Marcus Chen",
    date: "2025-11-29",
    time: "2:00 PM",
    package: "Half Day",
    status: "pending",
    amount: "$250",
  },
  {
    id: "3",
    client: "Emily Rodriguez",
    date: "2025-11-30",
    time: "9:00 AM",
    package: "Multi-Day",
    status: "confirmed",
    amount: "$1,200",
  },
  {
    id: "4",
    client: "David Thompson",
    date: "2025-12-01",
    time: "1:00 PM",
    package: "Full Day",
    status: "confirmed",
    amount: "$450",
  },
];

const upcomingTasks = [
  { id: "1", task: "Equipment maintenance check", due: "Today", priority: "high" },
  { id: "2", task: "Client follow-up: Marcus Chen", due: "Tomorrow", priority: "medium" },
  { id: "3", task: "Monthly inventory audit", due: "Dec 5", priority: "low" },
  { id: "4", task: "Review pending bookings", due: "Today", priority: "high" },
];

export const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all immersive-card"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <h3 className="text-3xl font-bold">{stat.value}</h3>
                  </div>
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className={`w-4 h-4 ${stat.trend === "up" ? "text-green-500" : "text-red-500 rotate-180"}`} />
                  <span className={`text-sm font-medium ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-muted-foreground">vs last month</span>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Bookings */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Recent Bookings</h2>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/20 hover:bg-muted/40 transition-all group"
                >
                  <div className="flex-1">
                    <p className="font-medium mb-1">{booking.client}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {booking.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {booking.time}
                      </span>
                      <span>{booking.package}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-lg">{booking.amount}</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === "confirmed"
                          ? "bg-green-500/10 text-green-500 border border-green-500/20"
                          : "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Activity Log */}
          <ActivityLog limit={8} showHeader={true} />
        </div>

        {/* Upcoming Tasks */}
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
          <h2 className="text-xl font-bold mb-6">Upcoming Tasks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {upcomingTasks.map((task) => (
              <div
                key={task.id}
                className="p-4 rounded-lg bg-muted/20 hover:bg-muted/40 transition-all group cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-1 p-1 rounded ${
                    task.priority === "high"
                      ? "bg-red-500/20"
                      : task.priority === "medium"
                      ? "bg-yellow-500/20"
                      : "bg-blue-500/20"
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      task.priority === "high"
                        ? "bg-red-500"
                        : task.priority === "medium"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-1">{task.task}</p>
                    <p className="text-xs text-muted-foreground">Due: {task.due}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
          <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-20 bg-gradient-to-br from-neon-cyan to-blue-500 hover:opacity-90">
              <Calendar className="w-5 h-5 mr-2" />
              New Booking
            </Button>
            <Button className="h-20 bg-gradient-to-br from-neon-pink to-purple-500 hover:opacity-90">
              <Users className="w-5 h-5 mr-2" />
              Add Client
            </Button>
            <Button className="h-20 bg-gradient-to-br from-green-400 to-emerald-500 hover:opacity-90">
              <CheckCircle className="w-5 h-5 mr-2" />
              Mark Complete
            </Button>
            <Button className="h-20 bg-gradient-to-br from-orange-400 to-red-500 hover:opacity-90">
              <AlertCircle className="w-5 h-5 mr-2" />
              View Alerts
            </Button>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};
