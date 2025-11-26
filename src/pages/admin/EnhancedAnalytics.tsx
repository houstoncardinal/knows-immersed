import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Calendar,
  Download,
  RefreshCw,
  Activity,
  Target,
  Award,
  Zap,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { exportAnalyticsToPDF } from "@/lib/exports";
import { toast } from "sonner";

// Enhanced mock data
const revenueData = [
  { month: "Jan", revenue: 12500, bookings: 45, clients: 32 },
  { month: "Feb", revenue: 15200, bookings: 52, clients: 38 },
  { month: "Mar", revenue: 18900, bookings: 61, clients: 45 },
  { month: "Apr", revenue: 22100, bookings: 68, clients: 52 },
  { month: "May", revenue: 25800, bookings: 74, clients: 58 },
  { month: "Jun", revenue: 28900, bookings: 82, clients: 65 },
  { month: "Jul", revenue: 31200, bookings: 89, clients: 71 },
  { month: "Aug", revenue: 34500, bookings: 95, clients: 76 },
  { month: "Sep", revenue: 38200, bookings: 102, clients: 82 },
  { month: "Oct", revenue: 42100, bookings: 108, clients: 87 },
  { month: "Nov", revenue: 45600, bookings: 115, clients: 91 },
  { month: "Dec", revenue: 48900, bookings: 122, clients: 95 },
];

const packageDistribution = [
  { name: "Full Day", value: 545, revenue: 245250, percentage: 65 },
  { name: "Half Day", value: 356, revenue: 89000, percentage: 25 },
  { name: "Multi-Day", value: 89, revenue: 89000, percentage: 15 },
  { name: "VIP Experience", value: 45, revenue: 67500, percentage: 10 },
];

const clientGrowth = [
  { month: "Jan", new: 12, returning: 20, churned: 3 },
  { month: "Feb", new: 15, returning: 23, churned: 2 },
  { month: "Mar", new: 18, returning: 27, churned: 4 },
  { month: "Apr", new: 22, returning: 30, churned: 3 },
  { month: "May", new: 25, returning: 33, churned: 2 },
  { month: "Jun", new: 28, returning: 37, churned: 5 },
];

const hourlyBookings = [
  { hour: "8AM", bookings: 12 },
  { hour: "10AM", bookings: 28 },
  { hour: "12PM", bookings: 45 },
  { hour: "2PM", bookings: 52 },
  { hour: "4PM", bookings: 38 },
  { hour: "6PM", bookings: 25 },
  { hour: "8PM", bookings: 15 },
];

const COLORS = ["#00ffff", "#ff00ff", "#00ff00", "#ffff00", "#ff6b6b"];

export const EnhancedAnalytics = () => {
  const [timeRange, setTimeRange] = useState("12months");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    toast.info("Refreshing analytics data...");

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsRefreshing(false);
    toast.success("Analytics data updated successfully");
  };

  const handleExport = () => {
    toast.info("Generating PDF report...");

    const stats = {
      "Total Revenue": "$402,400",
      "Total Bookings": "1,013",
      "Active Clients": "95",
      "Average Booking Value": "$397",
    };

    setTimeout(() => {
      exportAnalyticsToPDF(stats, [], "knows-studios-analytics");
      toast.success("Analytics report exported successfully");
    }, 1000);
  };

  // Calculate stats
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalBookings = revenueData.reduce((sum, item) => sum + item.bookings, 0);
  const avgBookingValue = totalRevenue / totalBookings;
  const growthRate = ((revenueData[11].revenue - revenueData[0].revenue) / revenueData[0].revenue * 100).toFixed(1);

  const stats = [
    {
      title: "Total Revenue",
      value: `$${(totalRevenue / 1000).toFixed(1)}K`,
      change: `+${growthRate}%`,
      trend: "up",
      icon: DollarSign,
      color: "from-green-400 to-emerald-500",
    },
    {
      title: "Total Bookings",
      value: totalBookings.toString(),
      change: "+23%",
      trend: "up",
      icon: Calendar,
      color: "from-neon-cyan to-blue-500",
    },
    {
      title: "Active Clients",
      value: "95",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "from-neon-pink to-purple-500",
    },
    {
      title: "Avg Booking Value",
      value: `$${avgBookingValue.toFixed(0)}`,
      change: "+8%",
      trend: "up",
      icon: Target,
      color: "from-orange-400 to-red-500",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Advanced Analytics</h1>
            <p className="text-muted-foreground">Real-time insights and performance metrics</p>
          </div>

          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="12months">Last 12 Months</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              className="bg-gradient-to-r from-neon-cyan/10 to-neon-pink/10 border-primary/50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all immersive-card group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <h3 className="text-3xl font-bold group-hover:text-gradient-neon transition-all">{stat.value}</h3>
                  </div>
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className={`w-4 h-4 ${stat.trend === "up" ? "text-green-500" : "text-red-500 rotate-180"}`} />
                  <span className={`text-sm font-medium ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-muted-foreground">vs last period</span>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Charts Tabs */}
        <Tabs defaultValue="revenue" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
          </TabsList>

          {/* Revenue Tab */}
          <TabsContent value="revenue" className="space-y-6">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
              <h3 className="text-xl font-bold mb-6">Revenue Overview</h3>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00ffff" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00ffff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 20%)" />
                  <XAxis dataKey="month" stroke="hsl(0 0% 60%)" />
                  <YAxis stroke="hsl(0 0% 60%)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0 0% 8%)",
                      border: "1px solid hsl(0 0% 20%)",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#00ffff"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
                <h3 className="text-xl font-bold mb-6">Monthly Bookings</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 20%)" />
                    <XAxis dataKey="month" stroke="hsl(0 0% 60%)" />
                    <YAxis stroke="hsl(0 0% 60%)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(0 0% 8%)",
                        border: "1px solid hsl(0 0% 20%)",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="bookings" fill="#ff00ff" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
                <h3 className="text-xl font-bold mb-6">Peak Booking Hours</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={hourlyBookings} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 20%)" />
                    <XAxis type="number" stroke="hsl(0 0% 60%)" />
                    <YAxis dataKey="hour" type="category" stroke="hsl(0 0% 60%)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(0 0% 8%)",
                        border: "1px solid hsl(0 0% 20%)",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="bookings" fill="#00ffff" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>
          </TabsContent>

          {/* Clients Tab */}
          <TabsContent value="clients" className="space-y-6">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
              <h3 className="text-xl font-bold mb-6">Client Growth & Retention</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={clientGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 20%)" />
                  <XAxis dataKey="month" stroke="hsl(0 0% 60%)" />
                  <YAxis stroke="hsl(0 0% 60%)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0 0% 8%)",
                      border: "1px solid hsl(0 0% 20%)",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="new"
                    stroke="#00ffff"
                    strokeWidth={2}
                    name="New Clients"
                  />
                  <Line
                    type="monotone"
                    dataKey="returning"
                    stroke="#00ff00"
                    strokeWidth={2}
                    name="Returning Clients"
                  />
                  <Line
                    type="monotone"
                    dataKey="churned"
                    stroke="#ff6b6b"
                    strokeWidth={2}
                    name="Churned"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          {/* Packages Tab */}
          <TabsContent value="packages" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
                <h3 className="text-xl font-bold mb-6">Package Distribution</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={packageDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name} (${percentage}%)`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {packageDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(0 0% 8%)",
                        border: "1px solid hsl(0 0% 20%)",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
                <h3 className="text-xl font-bold mb-6">Revenue by Package</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={packageDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 20%)" />
                    <XAxis dataKey="name" stroke="hsl(0 0% 60%)" />
                    <YAxis stroke="hsl(0 0% 60%)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(0 0% 8%)",
                        border: "1px solid hsl(0 0% 20%)",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="revenue" radius={[8, 8, 0, 0]}>
                      {packageDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-neon-cyan to-blue-500">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">Conversion Rate</p>
                <h3 className="text-2xl font-bold mb-2">87.5%</h3>
                <p className="text-xs text-muted-foreground">
                  +5.2% from last month
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-neon-pink to-purple-500">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">Client Satisfaction</p>
                <h3 className="text-2xl font-bold mb-2">4.9/5.0</h3>
                <p className="text-xs text-muted-foreground">
                  Based on 245 reviews
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">Repeat Rate</p>
                <h3 className="text-2xl font-bold mb-2">64%</h3>
                <p className="text-xs text-muted-foreground">
                  Clients booking again
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};
