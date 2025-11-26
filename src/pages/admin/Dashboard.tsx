import { Card } from "@/components/ui/card";
import { AdminLayout } from "@/components/admin/AdminLayout";
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
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

// Mock data for charts
const revenueData = [
  { month: "Jan", revenue: 35000, bookings: 45, expenses: 12000 },
  { month: "Feb", revenue: 42000, bookings: 52, expenses: 15000 },
  { month: "Mar", revenue: 38000, bookings: 48, expenses: 13000 },
  { month: "Apr", revenue: 51000, bookings: 65, expenses: 16000 },
  { month: "May", revenue: 48000, bookings: 60, expenses: 14500 },
  { month: "Jun", revenue: 55000, bookings: 70, expenses: 17000 },
  { month: "Jul", revenue: 62000, bookings: 78, expenses: 18000 },
  { month: "Aug", revenue: 58000, bookings: 72, expenses: 16500 },
  { month: "Sep", revenue: 67000, bookings: 85, expenses: 19000 },
  { month: "Oct", revenue: 71000, bookings: 90, expenses: 20000 },
  { month: "Nov", revenue: 68000, bookings: 87, expenses: 19500 },
  { month: "Dec", revenue: 75000, bookings: 95, expenses: 21000 },
];

const packageDistribution = [
  { name: "Half Day", value: 35, color: "#00FFFF" },
  { name: "Full Day", value: 45, color: "#FF00FF" },
  { name: "Multi-Day", value: 20, color: "#FFD700" },
];

const equipmentUsage = [
  { equipment: "Cameras", usage: 92 },
  { equipment: "Lighting", usage: 85 },
  { equipment: "Audio", usage: 78 },
  { equipment: "Backdrop", usage: 95 },
  { equipment: "Props", usage: 68 },
];

const clientGrowthData = [
  { month: "Jan", newClients: 12, totalClients: 145, retention: 94 },
  { month: "Feb", newClients: 15, totalClients: 160, retention: 95 },
  { month: "Mar", newClients: 10, totalClients: 170, retention: 93 },
  { month: "Apr", newClients: 18, totalClients: 188, retention: 96 },
  { month: "May", newClients: 22, totalClients: 210, retention: 97 },
  { month: "Jun", newClients: 20, totalClients: 230, retention: 95 },
  { month: "Jul", newClients: 25, totalClients: 255, retention: 98 },
  { month: "Aug", newClients: 19, totalClients: 274, retention: 96 },
  { month: "Sep", newClients: 28, totalClients: 302, retention: 97 },
  { month: "Oct", newClients: 30, totalClients: 332, retention: 98 },
  { month: "Nov", newClients: 26, totalClients: 358, retention: 96 },
  { month: "Dec", newClients: 32, totalClients: 390, retention: 99 },
];

const performanceMetrics = [
  { category: "Bookings", target: 100, actual: 95, lastYear: 78 },
  { category: "Revenue", target: 80, actual: 88, lastYear: 72 },
  { category: "Satisfaction", target: 95, actual: 98, lastYear: 93 },
  { category: "Retention", target: 90, actual: 97, lastYear: 89 },
  { category: "Efficiency", target: 85, actual: 92, lastYear: 80 },
];

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
      <div className="min-h-screen">
        <div className="space-y-8">
          {/* Advanced Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between bg-card rounded-2xl p-6 lg:p-8 border border-border shadow-sm gap-6">
            <div className="flex items-center gap-4 lg:gap-6">
              <div className="p-4 bg-gradient-to-br from-primary to-secondary rounded-2xl">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">KNOWS STUDIOS Dashboard</h1>
                <p className="text-base lg:text-lg text-muted-foreground">Advanced analytics and studio management platform</p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    System Online
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Last sync: {new Date().toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <Button variant="outline" className="flex-1 lg:flex-none">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" className="flex-1 lg:flex-none">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button className="hidden lg:flex">
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
                  className="relative overflow-hidden bg-card border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                    <Icon className="w-full h-full text-foreground" />
                  </div>

                  <div className="p-6 lg:p-8 relative">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">{stat.title}</p>
                        <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-1">{stat.value}</h3>
                        <div className="flex items-center gap-2">
                          <TrendIcon className={`w-4 h-4 ${stat.trend === "up" ? "text-emerald-600" : "text-red-600"}`} />
                          <span className={`text-sm font-bold ${stat.trend === "up" ? "text-emerald-600" : "text-red-600"}`}>
                            {stat.change}
                          </span>
                          <span className="text-sm text-slate-500">vs last month</span>
                        </div>
                      </div>
                      <div className="p-4 rounded-2xl bg-primary/10 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-muted/50 rounded-full h-2 mb-2">
                      <div
                        className="h-2 rounded-full transition-all duration-500 bg-primary"
                        style={{ width: stat.title === "Equipment Usage" ? "78%" : "85%" }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground">Target: 90%</p>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Advanced Analytics Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Revenue Analytics */}
            <Card className="xl:col-span-2 bg-card border border-border p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Revenue Analytics</h2>
                  <p className="text-muted-foreground">Monthly performance and growth trends</p>
                </div>
                <div className="flex items-center gap-3">
                  <select className="px-4 py-2 border border-border rounded-lg text-sm bg-background text-foreground">
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                    <option>Last year</option>
                  </select>
                  <Button variant="outline" size="sm">
                    <BarChart3 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Advanced Revenue Chart */}
              <div className="mb-6">
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00FFFF" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#00FFFF" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF00FF" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#FF00FF" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis
                      dataKey="month"
                      stroke="hsl(var(--muted-foreground))"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      style={{ fontSize: '12px' }}
                      tickFormatter={(value) => `$${value/1000}k`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        color: 'hsl(var(--foreground))'
                      }}
                      formatter={(value: any) => [`$${value.toLocaleString()}`, '']}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#00FFFF"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                      name="Revenue"
                    />
                    <Area
                      type="monotone"
                      dataKey="expenses"
                      stroke="#FF00FF"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorExpenses)"
                      name="Expenses"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Revenue Breakdown */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center p-4 rounded-lg bg-muted/20 border border-border">
                  <p className="text-2xl font-bold text-foreground">$75,000</p>
                  <p className="text-sm text-muted-foreground">This Month</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <p className="text-2xl font-bold text-emerald-600">+23%</p>
                  <p className="text-sm text-muted-foreground">Growth</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <p className="text-2xl font-bold text-primary">$789</p>
                  <p className="text-sm text-muted-foreground">Avg. Booking</p>
                </div>
              </div>
            </Card>

            {/* System Health */}
            <Card className="bg-card border border-border p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">System Health</h3>
                  <p className="text-muted-foreground text-sm">Real-time monitoring</p>
                </div>
                <div className="p-3 bg-emerald-500/10 rounded-xl">
                  <Activity className="w-6 h-6 text-emerald-600" />
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Server Status</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-emerald-600 font-medium">Online</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Database</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-emerald-600 font-medium">Healthy</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">API Response</span>
                  <span className="text-sm font-bold text-foreground">45ms</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Uptime</span>
                  <span className="text-sm font-bold text-foreground">99.9%</span>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">CPU Usage</span>
                    <span className="text-sm font-bold text-foreground">23%</span>
                  </div>
                  <div className="w-full bg-muted/50 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "23%" }}></div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Advanced Secondary Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Trends Line Chart */}
            <Card className="lg:col-span-2 bg-card border border-border p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Booking Trends</h2>
                  <p className="text-muted-foreground">Real-time booking activity and forecasting</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
                    <span className="text-sm font-bold text-primary">↑ 18% Growth</span>
                  </div>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={revenueData}>
                  <defs>
                    <linearGradient id="bookingsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00FFFF" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#00FFFF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.2} />
                  <XAxis
                    dataKey="month"
                    stroke="hsl(var(--muted-foreground))"
                    style={{ fontSize: '11px' }}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    style={{ fontSize: '11px' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                      color: 'hsl(var(--foreground))'
                    }}
                    formatter={(value: any) => [`${value} bookings`, '']}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="bookings"
                    stroke="#00FFFF"
                    strokeWidth={3}
                    dot={{ fill: '#00FFFF', strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 8, fill: '#00FFFF', stroke: '#fff', strokeWidth: 2 }}
                    name="Total Bookings"
                  />
                </LineChart>
              </ResponsiveContainer>

              {/* Booking Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                  <p className="text-2xl font-bold text-primary mb-1">95</p>
                  <p className="text-xs text-muted-foreground font-medium">Peak Month</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20">
                  <p className="text-2xl font-bold text-secondary mb-1">67</p>
                  <p className="text-xs text-muted-foreground font-medium">Average</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20">
                  <p className="text-2xl font-bold text-emerald-600 mb-1">+18%</p>
                  <p className="text-xs text-muted-foreground font-medium">YoY Growth</p>
                </div>
              </div>
            </Card>

            {/* Package Distribution Pie Chart */}
            <Card className="bg-card border border-border p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Package Mix</h3>
                  <p className="text-muted-foreground text-sm">Distribution by type</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
              </div>

              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={packageDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={800}
                  >
                    {packageDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Package Breakdown */}
              <div className="space-y-3 mt-4">
                {packageDistribution.map((pkg, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: pkg.color }}
                      />
                      <span className="text-sm font-medium text-foreground">{pkg.name}</span>
                    </div>
                    <span className="text-sm font-bold text-foreground">{pkg.value}%</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Equipment Utilization Radar Chart */}
          <Card className="bg-card border border-border p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Equipment Utilization Analysis</h2>
                <p className="text-muted-foreground">Multi-dimensional performance tracking across all studio assets</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="px-4 py-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                  <span className="text-sm font-bold text-emerald-600">83.6% Avg</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Radar Chart */}
              <ResponsiveContainer width="100%" height={350}>
                <RadarChart data={equipmentUsage}>
                  <defs>
                    <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00FFFF" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#FF00FF" stopOpacity={0.4}/>
                    </linearGradient>
                  </defs>
                  <PolarGrid stroke="hsl(var(--border))" strokeDasharray="3 3" opacity={0.3} />
                  <PolarAngleAxis
                    dataKey="equipment"
                    stroke="hsl(var(--foreground))"
                    style={{ fontSize: '12px', fontWeight: '600' }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    stroke="hsl(var(--muted-foreground))"
                    style={{ fontSize: '11px' }}
                  />
                  <Radar
                    name="Utilization"
                    dataKey="usage"
                    stroke="#00FFFF"
                    fill="url(#radarGradient)"
                    fillOpacity={0.6}
                    strokeWidth={3}
                    dot={{ fill: '#00FFFF', strokeWidth: 2, r: 5 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                      color: 'hsl(var(--foreground))'
                    }}
                    formatter={(value: any) => [`${value}%`, 'Usage']}
                  />
                </RadarChart>
              </ResponsiveContainer>

              {/* Bar Chart Comparison */}
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={equipmentUsage}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FF00FF" stopOpacity={0.9}/>
                      <stop offset="100%" stopColor="#FFD700" stopOpacity={0.7}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.2} />
                  <XAxis
                    dataKey="equipment"
                    stroke="hsl(var(--muted-foreground))"
                    style={{ fontSize: '11px', fontWeight: '600' }}
                    angle={-15}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    style={{ fontSize: '11px' }}
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                      color: 'hsl(var(--foreground))'
                    }}
                    formatter={(value: any) => [`${value}%`, 'Utilization']}
                  />
                  <Bar
                    dataKey="usage"
                    fill="url(#barGradient)"
                    radius={[8, 8, 0, 0]}
                    animationDuration={1000}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Equipment Performance Cards */}
            <div className="grid grid-cols-5 gap-4 mt-8">
              {equipmentUsage.map((item, idx) => {
                const isHighPerformance = item.usage >= 85;
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border transition-all duration-300 hover:shadow-lg ${
                      isHighPerformance
                        ? 'bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-500/50'
                        : 'bg-amber-500/10 border-amber-500/30 hover:border-amber-500/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Package className={`w-5 h-5 ${isHighPerformance ? 'text-emerald-600' : 'text-amber-600'}`} />
                      <span className={`text-xs font-bold ${isHighPerformance ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {item.usage}%
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-foreground">{item.equipment}</p>
                    <div className="w-full bg-muted/30 rounded-full h-1.5 mt-2">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          isHighPerformance ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${item.usage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Client Growth & Performance Metrics */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Client Growth Analysis */}
            <Card className="bg-card border border-border p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Client Growth Trajectory</h2>
                  <p className="text-muted-foreground">Acquisition, retention, and expansion metrics</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 rounded-lg border border-emerald-500/20">
                    <span className="text-sm font-bold text-emerald-600">↑ 169% Growth</span>
                  </div>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={clientGrowthData}>
                  <defs>
                    <linearGradient id="newClientsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00FFFF" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#00FFFF" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="totalClientsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FFD700" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#FFD700" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.2} />
                  <XAxis
                    dataKey="month"
                    stroke="hsl(var(--muted-foreground))"
                    style={{ fontSize: '11px' }}
                  />
                  <YAxis
                    yAxisId="left"
                    stroke="hsl(var(--muted-foreground))"
                    style={{ fontSize: '11px' }}
                    label={{ value: 'Clients', angle: -90, position: 'insideLeft', style: { fontSize: '10px' } }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="hsl(var(--muted-foreground))"
                    style={{ fontSize: '11px' }}
                    label={{ value: 'New', angle: 90, position: 'insideRight', style: { fontSize: '10px' } }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                  <Legend />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="totalClients"
                    stroke="#FFD700"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#totalClientsGradient)"
                    name="Total Clients"
                  />
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="newClients"
                    stroke="#00FFFF"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#newClientsGradient)"
                    name="New Clients"
                  />
                </AreaChart>
              </ResponsiveContainer>

              {/* Client Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                  <p className="text-2xl font-bold text-primary mb-1">390</p>
                  <p className="text-xs text-muted-foreground font-medium">Total Clients</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20">
                  <p className="text-2xl font-bold text-emerald-600 mb-1">32</p>
                  <p className="text-xs text-muted-foreground font-medium">This Month</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20">
                  <p className="text-2xl font-bold text-amber-600 mb-1">99%</p>
                  <p className="text-xs text-muted-foreground font-medium">Retention</p>
                </div>
              </div>
            </Card>

            {/* Performance Metrics Comparison */}
            <Card className="bg-card border border-border p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Performance Metrics</h2>
                  <p className="text-muted-foreground">Target vs actual vs last year comparison</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl">
                  <Target className="w-6 h-6 text-primary" />
                </div>
              </div>

              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={performanceMetrics}>
                  <defs>
                    <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00FFFF" stopOpacity={0.9}/>
                      <stop offset="100%" stopColor="#00FFFF" stopOpacity={0.6}/>
                    </linearGradient>
                    <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FFD700" stopOpacity={0.7}/>
                      <stop offset="100%" stopColor="#FFD700" stopOpacity={0.4}/>
                    </linearGradient>
                    <linearGradient id="lastYearGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FF00FF" stopOpacity={0.5}/>
                      <stop offset="100%" stopColor="#FF00FF" stopOpacity={0.3}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.2} />
                  <XAxis
                    dataKey="category"
                    stroke="hsl(var(--muted-foreground))"
                    style={{ fontSize: '11px', fontWeight: '600' }}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    style={{ fontSize: '11px' }}
                    domain={[0, 110]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                      color: 'hsl(var(--foreground))'
                    }}
                    formatter={(value: any) => [`${value}%`, '']}
                  />
                  <Legend />
                  <Bar
                    dataKey="actual"
                    fill="url(#actualGradient)"
                    radius={[8, 8, 0, 0]}
                    name="Actual"
                  />
                  <Bar
                    dataKey="target"
                    fill="url(#targetGradient)"
                    radius={[8, 8, 0, 0]}
                    name="Target"
                  />
                  <Bar
                    dataKey="lastYear"
                    fill="url(#lastYearGradient)"
                    radius={[8, 8, 0, 0]}
                    name="Last Year"
                  />
                </BarChart>
              </ResponsiveContainer>

              {/* Performance Summary */}
              <div className="grid grid-cols-5 gap-3 mt-6">
                {performanceMetrics.map((metric) => {
                  const isExceeding = metric.actual > metric.target;
                  const improvement = metric.actual - metric.lastYear;
                  return (
                    <div
                      key={metric.category}
                      className={`p-3 rounded-lg border transition-all duration-300 hover:shadow-md ${
                        isExceeding
                          ? 'bg-emerald-500/10 border-emerald-500/30'
                          : 'bg-amber-500/10 border-amber-500/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Award className={`w-4 h-4 ${isExceeding ? 'text-emerald-600' : 'text-amber-600'}`} />
                        {isExceeding && (
                          <span className="text-xs font-bold text-emerald-600">✓</span>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-foreground mb-1">{metric.category}</p>
                      <p className={`text-lg font-bold ${isExceeding ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {metric.actual}%
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {improvement > 0 ? '+' : ''}{improvement}% YoY
                      </p>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Advanced Data Tables */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Recent Bookings - Advanced */}
            <Card className="bg-card border border-border p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Recent Bookings</h3>
                  <p className="text-muted-foreground text-sm">Latest client reservations</p>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View All
                  </Button>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    New
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {recentBookings.map((booking, index) => (
                  <div
                    key={booking.id}
                    className="group flex items-center justify-between p-6 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-all duration-300 border border-border hover:border-primary/30 hover:shadow-md"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white font-bold">
                        {booking.client.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-bold text-foreground mb-1">{booking.client}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
                        <p className="font-bold text-xl text-foreground">{booking.amount}</p>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">{booking.package}</p>
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
            <Card className="bg-card border border-border p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Activity Feed</h3>
                  <p className="text-muted-foreground text-sm">Real-time system updates</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-xl">
                  <Activity className="w-6 h-6 text-primary" />
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
                  <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className={`p-2 rounded-lg ${
                      activity.type === "booking" ? "bg-blue-100 text-blue-600" :
                      activity.type === "payment" ? "bg-emerald-100 text-emerald-600" :
                      activity.type === "user" ? "bg-purple-100 text-purple-600" :
                      activity.type === "maintenance" ? "bg-amber-100 text-amber-600" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {activity.type === "booking" && <Calendar className="w-4 h-4" />}
                      {activity.type === "payment" && <DollarSign className="w-4 h-4" />}
                      {activity.type === "user" && <Users className="w-4 h-4" />}
                      {activity.type === "maintenance" && <Settings className="w-4 h-4" />}
                      {activity.type === "report" && <BarChart3 className="w-4 h-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground mb-1">{activity.action}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">{activity.user}</p>
                        <p className="text-xs text-muted-foreground/60">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Advanced Task Management */}
          <Card className="bg-card border border-border p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Task Management</h3>
                <p className="text-muted-foreground text-sm">Priority-based workflow management</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-full text-sm">
                  <Target className="w-4 h-4 text-primary" />
                  <span className="font-medium text-foreground">5 Active</span>
                </div>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Task
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {upcomingTasks.map((task) => (
                <div
                  key={task.id}
                  className="group p-6 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-all duration-300 border border-border hover:border-primary/30 hover:shadow-lg cursor-pointer"
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

                  <h4 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {task.task}
                  </h4>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Due: {task.due}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                      <span className="text-xs text-muted-foreground">Pending</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Advanced Quick Actions */}
          <Card className="bg-card border border-border p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Quick Actions</h3>
                <p className="text-muted-foreground text-sm">Streamlined workflow shortcuts</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-xl">
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
