import { Card } from "@/components/ui/card";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ActivityLog } from "@/components/admin/ActivityLog";
import {
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertCircle,
  Package,
  BarChart3,
  Activity,
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
    color: "bg-blue-500",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
  },
  {
    title: "Active Clients",
    value: "89",
    change: "+8%",
    trend: "up",
    icon: Users,
    color: "bg-emerald-500",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-700",
  },
  {
    title: "Monthly Revenue",
    value: "$45,280",
    change: "+23%",
    trend: "up",
    icon: DollarSign,
    color: "bg-green-500",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
  },
  {
    title: "Equipment Usage",
    value: "78%",
    change: "-5%",
    trend: "down",
    icon: Package,
    color: "bg-amber-500",
    bgColor: "bg-amber-50",
    textColor: "text-amber-700",
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
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
            <p className="text-slate-600 mt-1">Welcome back! Here's what's happening with your studio.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-slate-500">Last updated</p>
              <p className="text-sm font-medium text-slate-900">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
            return (
              <Card
                key={index}
                className="p-6 bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-600 mb-1">{stat.title}</p>
                    <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.textColor}`} />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TrendIcon className={`w-4 h-4 ${stat.trend === "up" ? "text-emerald-600" : "text-red-600"}`} />
                  <span className={`text-sm font-semibold ${stat.trend === "up" ? "text-emerald-600" : "text-red-600"}`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-slate-500">vs last month</span>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Bookings */}
          <Card className="p-6 bg-white border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">Recent Bookings</h2>
              <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 hover:bg-slate-50">
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-all duration-200 border border-slate-100"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 mb-1">{booking.client}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {booking.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {booking.time}
                      </span>
                      <span className="px-2 py-1 bg-slate-200 rounded text-xs font-medium">{booking.package}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-lg text-slate-900">{booking.amount}</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === "confirmed"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          : "bg-amber-100 text-amber-800 border border-amber-200"
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
        <Card className="p-6 bg-white border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Upcoming Tasks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {upcomingTasks.map((task) => (
              <div
                key={task.id}
                className="p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-all duration-200 border border-slate-100 cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-1 p-1.5 rounded-full ${
                    task.priority === "high"
                      ? "bg-red-100"
                      : task.priority === "medium"
                      ? "bg-amber-100"
                      : "bg-blue-100"
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      task.priority === "high"
                        ? "bg-red-500"
                        : task.priority === "medium"
                        ? "bg-amber-500"
                        : "bg-blue-500"
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900 mb-1 group-hover:text-slate-700">{task.task}</p>
                    <p className="text-xs text-slate-500">Due: {task.due}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6 bg-white border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-20 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 flex flex-col items-center justify-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>New Booking</span>
            </Button>
            <Button className="h-20 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors duration-200 flex flex-col items-center justify-center gap-2">
              <Users className="w-5 h-5" />
              <span>Add Client</span>
            </Button>
            <Button className="h-20 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200 flex flex-col items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Mark Complete</span>
            </Button>
            <Button className="h-20 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors duration-200 flex flex-col items-center justify-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span>View Alerts</span>
            </Button>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};
