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
  Zap,
  Target,
  Award,
  Settings,
  Plus,
  Eye,
  Download,
  RefreshCw,
  MoreHorizontal,
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="space-y-8 p-8">
          {/* Advanced Header */}
          <div className="flex items-center justify-between bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-slate-900 mb-2">KNOWS STUDIOS Dashboard</h1>
                <p className="text-lg text-slate-600">Advanced analytics and studio management platform</p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    System Online
                  </div>
                  <div className="text-sm text-slate-500">
                    Last sync: {new Date().toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Data
              </Button>
              <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button className="bg-slate-900 hover:bg-slate-800 text-white">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>

          {/* Advanced KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
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
                        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">{stat.title}</p>
                        <h3 className="text-4xl font-bold text-slate-900 mb-1">{stat.value}</h3>
                        <div className="flex items-center gap-2">
                          <TrendIcon className={`w-4 h-4 ${stat.trend === "up" ? "text-emerald-600" : "text-red-600"}`} />
                          <span className={`text-sm font-bold ${stat.trend === "up" ? "text-emerald-600" : "text-red-600"}`}>
                            {stat.change}
                          </span>
                          <span className="text-sm text-slate-500">vs last month</span>
                        </div>
                      </div>
                      <div className={`p-4 rounded-2xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-8 h-8 ${stat.textColor}`} />
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 rounded-full h-2 mb-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${stat.color}`}
                        style={{ width: stat.title === "Equipment Usage" ? "78%" : "85%" }}
                      ></div>
                    </div>
                    <p className="text-xs text-slate-500">Target: 90%</p>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Advanced Analytics Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Revenue Analytics */}
            <Card className="xl:col-span-2 bg-white border border-slate-200 p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Revenue Analytics</h2>
                  <p className="text-slate-600">Monthly performance and growth trends</p>
                </div>
                <div className="flex items-center gap-3">
                  <select className="px-4 py-2 border border-slate-300 rounded-lg text-sm bg-white">
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                    <option>Last year</option>
                  </select>
                  <Button variant="outline" size="sm">
                    <BarChart3 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Mock Chart Area */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 mb-6 h-64 flex items-center justify-center border-2 border-dashed border-slate-200">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-500 font-medium">Interactive Revenue Chart</p>
                  <p className="text-sm text-slate-400">Real-time data visualization</p>
                </div>
              </div>

              {/* Revenue Breakdown */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-900">$45,280</p>
                  <p className="text-sm text-slate-500">This Month</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-600">+23%</p>
                  <p className="text-sm text-slate-500">Growth</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">$12,450</p>
                  <p className="text-sm text-slate-500">Avg. Booking</p>
                </div>
              </div>
            </Card>

            {/* System Health */}
            <Card className="bg-white border border-slate-200 p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">System Health</h3>
                  <p className="text-slate-600 text-sm">Real-time monitoring</p>
                </div>
                <div className="p-3 bg-emerald-100 rounded-xl">
                  <Activity className="w-6 h-6 text-emerald-600" />
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Server Status</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-emerald-600 font-medium">Online</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Database</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-emerald-600 font-medium">Healthy</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">API Response</span>
                  <span className="text-sm font-bold text-slate-900">45ms</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Uptime</span>
                  <span className="text-sm font-bold text-slate-900">99.9%</span>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">CPU Usage</span>
                    <span className="text-sm font-bold text-slate-900">23%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "23%" }}></div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Advanced Data Tables */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Recent Bookings - Advanced */}
            <Card className="bg-white border border-slate-200 p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Recent Bookings</h3>
                  <p className="text-slate-600 text-sm">Latest client reservations</p>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 hover:bg-slate-50">
                    <Eye className="w-4 h-4 mr-2" />
                    View All
                  </Button>
                  <Button size="sm" className="bg-slate-900 hover:bg-slate-800 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    New
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {recentBookings.map((booking, index) => (
                  <div
                    key={booking.id}
                    className="group flex items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-slate-50 to-white hover:from-slate-100 hover:to-slate-50 transition-all duration-300 border border-slate-200 hover:border-slate-300 hover:shadow-md"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold">
                        {booking.client.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 mb-1">{booking.client}</p>
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {booking.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {booking.time}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold text-xl text-slate-900">{booking.amount}</p>
                        <p className="text-xs text-slate-500 uppercase tracking-wide">{booking.package}</p>
                      </div>
                      <span
                        className={`px-4 py-2 rounded-full text-xs font-bold ${
                          booking.status === "confirmed"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : "bg-amber-100 text-amber-800 border border-amber-200"
                        }`}
                      >
                        {booking.status}
                      </span>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Activity Feed - Advanced */}
            <Card className="bg-white border border-slate-200 p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Activity Feed</h3>
                  <p className="text-slate-600 text-sm">Real-time system updates</p>
                </div>
                <div className="p-3 bg-slate-100 rounded-xl">
                  <Activity className="w-6 h-6 text-slate-600" />
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { time: "2 min ago", action: "New booking confirmed", user: "Sarah Martinez", type: "booking" },
                  { time: "15 min ago", action: "Equipment maintenance completed", user: "System", type: "maintenance" },
                  { time: "1 hour ago", action: "Client payment received", user: "Marcus Chen", type: "payment" },
                  { time: "2 hours ago", action: "New client registered", user: "Emily Rodriguez", type: "user" },
                  { time: "3 hours ago", action: "Monthly report generated", user: "System", type: "report" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div className={`p-2 rounded-lg ${
                      activity.type === "booking" ? "bg-blue-100 text-blue-600" :
                      activity.type === "payment" ? "bg-emerald-100 text-emerald-600" :
                      activity.type === "user" ? "bg-purple-100 text-purple-600" :
                      activity.type === "maintenance" ? "bg-amber-100 text-amber-600" :
                      "bg-slate-100 text-slate-600"
                    }`}>
                      {activity.type === "booking" && <Calendar className="w-4 h-4" />}
                      {activity.type === "payment" && <DollarSign className="w-4 h-4" />}
                      {activity.type === "user" && <Users className="w-4 h-4" />}
                      {activity.type === "maintenance" && <Settings className="w-4 h-4" />}
                      {activity.type === "report" && <BarChart3 className="w-4 h-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900 mb-1">{activity.action}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-slate-500">{activity.user}</p>
                        <p className="text-xs text-slate-400">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Advanced Task Management */}
          <Card className="bg-white border border-slate-200 p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Task Management</h3>
                <p className="text-slate-600 text-sm">Priority-based workflow management</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-sm">
                  <Target className="w-4 h-4 text-slate-600" />
                  <span className="font-medium text-slate-700">5 Active</span>
                </div>
                <Button size="sm" className="bg-slate-900 hover:bg-slate-800 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Task
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {upcomingTasks.map((task) => (
                <div
                  key={task.id}
                  className="group p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-white hover:from-slate-100 hover:to-slate-50 transition-all duration-300 border border-slate-200 hover:border-slate-300 hover:shadow-lg cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-2 rounded-xl ${
                      task.priority === "high"
                        ? "bg-red-100 text-red-600"
                        : task.priority === "medium"
                        ? "bg-amber-100 text-amber-600"
                        : "bg-blue-100 text-blue-600"
                    }`}>
                      <AlertCircle className="w-5 h-5" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      task.priority === "high"
                        ? "bg-red-100 text-red-800"
                        : task.priority === "medium"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-blue-100 text-blue-800"
                    }`}>
                      {task.priority}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
                    {task.task}
                  </h4>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Due: {task.due}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                      <span className="text-xs text-slate-500">Pending</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Advanced Quick Actions */}
          <Card className="bg-white border border-slate-200 p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Quick Actions</h3>
                <p className="text-slate-600 text-sm">Streamlined workflow shortcuts</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Calendar, label: "New Booking", color: "from-blue-500 to-blue-600", hover: "hover:from-blue-600 hover:to-blue-700" },
                { icon: Users, label: "Add Client", color: "from-emerald-500 to-emerald-600", hover: "hover:from-emerald-600 hover:to-emerald-700" },
                { icon: CheckCircle, label: "Complete Task", color: "from-green-500 to-green-600", hover: "hover:from-green-600 hover:to-green-700" },
                { icon: AlertCircle, label: "View Alerts", color: "from-amber-500 to-amber-600", hover: "hover:from-amber-600 hover:to-amber-700" },
                { icon: BarChart3, label: "Analytics", color: "from-purple-500 to-purple-600", hover: "hover:from-purple-600 hover:to-purple-700" },
                { icon: Settings, label: "Settings", color: "from-slate-500 to-slate-600", hover: "hover:from-slate-600 hover:to-slate-700" },
                { icon: Download, label: "Export", color: "from-indigo-500 to-indigo-600", hover: "hover:from-indigo-600 hover:to-indigo-700" },
                { icon: Award, label: "Reports", color: "from-pink-500 to-pink-600", hover: "hover:from-pink-600 hover:to-pink-700" },
              ].map((action, index) => (
                <Button
                  key={index}
                  className={`h-24 bg-gradient-to-br ${action.color} ${action.hover} text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex flex-col items-center justify-center gap-3 group`}
                >
                  <action.icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">{action.label}</span>
                </Button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};
