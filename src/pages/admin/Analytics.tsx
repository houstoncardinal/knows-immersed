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
  Package,
  Clock,
  Star,
  Download,
  RefreshCw,
  Eye,
  Target,
  Zap,
  Award,
  Activity,
  PieChart,
  LineChart,
  BarChart,
} from "lucide-react";

// Mock analytics data
const revenueData = [
  { month: "Jan", revenue: 12500, bookings: 45 },
  { month: "Feb", revenue: 15200, bookings: 52 },
  { month: "Mar", revenue: 18900, bookings: 61 },
  { month: "Apr", revenue: 22100, bookings: 68 },
  { month: "May", revenue: 25800, bookings: 74 },
  { month: "Jun", revenue: 28900, bookings: 82 },
  { month: "Jul", revenue: 31200, bookings: 89 },
  { month: "Aug", revenue: 34500, bookings: 95 },
  { month: "Sep", revenue: 38200, bookings: 102 },
  { month: "Oct", revenue: 42100, bookings: 108 },
  { month: "Nov", revenue: 45600, bookings: 115 },
  { month: "Dec", revenue: 48900, bookings: 122 },
];

const packagePerformance = [
  { name: "Full Day", revenue: 245600, bookings: 545, percentage: 65 },
  { name: "Half Day", revenue: 89200, bookings: 356, percentage: 25 },
  { name: "VIP Experience", revenue: 67500, bookings: 45, percentage: 10 },
];

const clientMetrics = [
  { metric: "New Clients", value: 89, change: "+12%", trend: "up" },
  { metric: "Returning Clients", value: 156, change: "+8%", trend: "up" },
  { metric: "Average Rating", value: 4.9, change: "+0.1", trend: "up" },
  { metric: "Client Retention", value: "94%", change: "+2%", trend: "up" },
];

const equipmentUtilization = [
  { equipment: "CYC Wall", utilization: 87, status: "high" },
  { equipment: "Lighting Kit A", utilization: 72, status: "medium" },
  { equipment: "Camera Package", utilization: 65, status: "medium" },
  { equipment: "Green Screen", utilization: 58, status: "medium" },
  { equipment: "Audio Equipment", utilization: 45, status: "low" },
];

const topClients = [
  { name: "Fashion Forward Inc.", bookings: 12, revenue: 8400, rating: 5.0 },
  { name: "Creative Studios LA", bookings: 8, revenue: 5600, rating: 4.9 },
  { name: "Product Pro Photography", bookings: 15, revenue: 5250, rating: 4.8 },
  { name: "Music Video Masters", bookings: 6, revenue: 4200, rating: 4.9 },
  { name: "Commercial Creations", bookings: 9, revenue: 3780, rating: 4.7 },
];

export const AdminAnalytics = () => {
  const [timeRange, setTimeRange] = useState("12months");
  const [selectedMetric, setSelectedMetric] = useState("revenue");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "high":
        return "text-green-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-red-500";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-muted-foreground text-sm sm:text-base">Comprehensive insights into your studio performance</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="3months">Last 3 months</SelectItem>
                <SelectItem value="12months">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 sm:flex-none">
                <Download className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Export Report</span>
                <span className="sm:hidden">Export</span>
              </Button>
              <Button variant="outline" className="flex-1 sm:flex-none">
                <RefreshCw className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Refresh</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {clientMetrics.map((metric, index) => (
            <Card key={index} className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{metric.metric}</p>
                  <h3 className="text-3xl font-bold">{metric.value}</h3>
                </div>
                <div className={`p-3 rounded-lg bg-gradient-to-br ${
                  metric.trend === "up"
                    ? "from-green-400 to-emerald-500"
                    : "from-red-400 to-red-500"
                }`}>
                  {metric.trend === "up" ? (
                    <TrendingUp className="w-6 h-6 text-white" />
                  ) : (
                    <TrendingDown className="w-6 h-6 text-white" />
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium ${
                  metric.trend === "up" ? "text-green-500" : "text-red-500"
                }`}>
                  {metric.change}
                </span>
                <span className="text-sm text-muted-foreground">vs last period</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <Tabs defaultValue="revenue" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto">
            <TabsTrigger value="revenue" className="text-xs sm:text-sm">Revenue Trends</TabsTrigger>
            <TabsTrigger value="packages" className="text-xs sm:text-sm">Package Performance</TabsTrigger>
            <TabsTrigger value="equipment" className="text-xs sm:text-sm">Equipment Usage</TabsTrigger>
            <TabsTrigger value="clients" className="text-xs sm:text-sm">Top Clients</TabsTrigger>
          </TabsList>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 p-6 bg-card/50 backdrop-blur-sm border-border">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Revenue & Bookings Trend</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-neon-cyan"></div>
                    <span className="text-sm">Revenue</span>
                    <div className="w-3 h-3 rounded-full bg-neon-pink ml-4"></div>
                    <span className="text-sm">Bookings</span>
                  </div>
                </div>
                {/* Placeholder for chart - would use recharts or similar */}
                <div className="h-80 bg-gradient-to-br from-muted/20 to-muted/40 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <LineChart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Revenue & Bookings Chart</p>
                    <p className="text-xs text-muted-foreground mt-2">Interactive chart would be rendered here</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
                <h3 className="text-xl font-bold mb-6">Monthly Summary</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-green-500" />
                      <span className="font-medium">Total Revenue</span>
                    </div>
                    <span className="font-bold text-xl">$489,000</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-blue-500" />
                      <span className="font-medium">Total Bookings</span>
                    </div>
                    <span className="font-bold text-xl">1,247</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-purple-500" />
                      <span className="font-medium">Growth Rate</span>
                    </div>
                    <span className="font-bold text-xl text-green-500">+23%</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="packages" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
                <h3 className="text-xl font-bold mb-6">Package Performance</h3>
                <div className="space-y-4">
                  {packagePerformance.map((pkg, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{pkg.name}</span>
                        <span className="text-sm text-muted-foreground">{pkg.percentage}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-neon-cyan to-neon-pink h-2 rounded-full"
                          style={{ width: `${pkg.percentage}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{pkg.bookings} bookings</span>
                        <span className="font-bold">${pkg.revenue.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
                <h3 className="text-xl font-bold mb-6">Package Insights</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Award className="w-5 h-5 text-green-500" />
                      <span className="font-medium text-green-600">Top Performer</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Full Day package generates 65% of total revenue with highest client satisfaction.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Target className="w-5 h-5 text-blue-500" />
                      <span className="font-medium text-blue-600">Growth Opportunity</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      VIP Experience shows 40% month-over-month growth potential.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="equipment" className="space-y-6">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
              <h3 className="text-xl font-bold mb-6">Equipment Utilization</h3>
              <div className="space-y-6">
                {equipmentUtilization.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.equipment}</span>
                      <span className={`text-sm font-bold ${getStatusColor(item.status)}`}>
                        {item.utilization}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${
                          item.status === "high"
                            ? "bg-gradient-to-r from-green-400 to-emerald-500"
                            : item.status === "medium"
                            ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                            : "bg-gradient-to-r from-red-400 to-red-500"
                        }`}
                        style={{ width: `${item.utilization}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Utilization Rate</span>
                      <span className={`font-medium ${getStatusColor(item.status)}`}>
                        {item.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="clients" className="space-y-6">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
              <h3 className="text-xl font-bold mb-6">Top Performing Clients</h3>
              <div className="space-y-4">
                {topClients.map((client, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/20 hover:bg-muted/40 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-cyan to-neon-pink flex items-center justify-center text-white font-bold">
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{client.name}</p>
                        <p className="text-sm text-muted-foreground">{client.bookings} bookings</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${client.revenue.toLocaleString()}</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-muted-foreground">{client.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Additional Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-6 h-6 text-neon-cyan" />
              <h3 className="text-lg font-bold">Performance Insights</h3>
            </div>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-sm font-medium text-green-600 mb-1">Peak Hours</p>
                <p className="text-xs text-muted-foreground">2-6 PM shows 40% higher booking rates</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p className="text-sm font-medium text-blue-600 mb-1">Best Days</p>
                <p className="text-xs text-muted-foreground">Wednesdays & Thursdays have 25% more bookings</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-yellow-500" />
              <h3 className="text-lg font-bold">Optimization Tips</h3>
            </div>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <p className="text-sm font-medium text-yellow-600 mb-1">Increase Rates</p>
                <p className="text-xs text-muted-foreground">Consider 10% rate increase for peak seasons</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <p className="text-sm font-medium text-purple-600 mb-1">Equipment Upgrade</p>
                <p className="text-xs text-muted-foreground">Audio equipment utilization is below optimal</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-green-500" />
              <h3 className="text-lg font-bold">Revenue Forecast</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                <span className="text-sm">Next Month</span>
                <span className="font-bold text-green-500">+$8,200</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                <span className="text-sm">Next Quarter</span>
                <span className="font-bold text-green-500">+$28,500</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                <span className="text-sm">Next Year</span>
                <span className="font-bold text-green-500">+$125,000</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};
