import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Users,
  DollarSign,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Plus,
  Settings,
  Mail,
  Phone,
  FileText,
  Clock,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Activity {
  id: string;
  type: "booking" | "client" | "project" | "equipment" | "settings" | "user";
  action: "created" | "updated" | "deleted" | "confirmed" | "cancelled" | "completed";
  user: string;
  description: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

const mockActivities: Activity[] = [
  {
    id: "1",
    type: "booking",
    action: "created",
    user: "Admin",
    description: "New booking created for Sarah Martinez",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: "2",
    type: "booking",
    action: "confirmed",
    user: "Admin",
    description: "Booking BK-001 confirmed",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
  },
  {
    id: "3",
    type: "client",
    action: "created",
    user: "Admin",
    description: "New client added: Marcus Chen",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: "4",
    type: "equipment",
    action: "updated",
    user: "Admin",
    description: "Equipment EQ-001 marked as in maintenance",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
  },
  {
    id: "5",
    type: "project",
    action: "completed",
    user: "Admin",
    description: "Project PRJ-005 marked as completed",
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
  },
  {
    id: "6",
    type: "booking",
    action: "cancelled",
    user: "Admin",
    description: "Booking BK-005 cancelled by client request",
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
  },
  {
    id: "7",
    type: "settings",
    action: "updated",
    user: "Admin",
    description: "Pricing settings updated",
    timestamp: new Date(Date.now() - 1000 * 60 * 240),
  },
  {
    id: "8",
    type: "client",
    action: "updated",
    user: "Admin",
    description: "Client CL-012 information updated",
    timestamp: new Date(Date.now() - 1000 * 60 * 300),
  },
];

const getActivityIcon = (type: string, action: string) => {
  if (action === "created") return <Plus className="w-4 h-4" />;
  if (action === "updated") return <Edit className="w-4 h-4" />;
  if (action === "deleted") return <Trash2 className="w-4 h-4" />;
  if (action === "confirmed") return <CheckCircle className="w-4 h-4" />;
  if (action === "cancelled") return <XCircle className="w-4 h-4" />;

  switch (type) {
    case "booking":
      return <Calendar className="w-4 h-4" />;
    case "client":
      return <Users className="w-4 h-4" />;
    case "project":
      return <FileText className="w-4 h-4" />;
    case "settings":
      return <Settings className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
};

const getActivityColor = (action: string) => {
  switch (action) {
    case "created":
      return "bg-green-500/10 text-green-500 border-green-500/20";
    case "updated":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    case "deleted":
      return "bg-red-500/10 text-red-500 border-red-500/20";
    case "confirmed":
      return "bg-green-500/10 text-green-500 border-green-500/20";
    case "cancelled":
      return "bg-red-500/10 text-red-500 border-red-500/20";
    case "completed":
      return "bg-purple-500/10 text-purple-500 border-purple-500/20";
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/20";
  }
};

interface ActivityLogProps {
  limit?: number;
  showHeader?: boolean;
}

export const ActivityLog = ({ limit, showHeader = true }: ActivityLogProps) => {
  const activities = limit ? mockActivities.slice(0, limit) : mockActivities;

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
      {showHeader && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Recent Activity</h2>
          <Badge variant="outline" className="border-primary/50">
            Live
          </Badge>
        </div>
      )}

      <ScrollArea className={limit ? "h-[400px]" : "h-[600px]"}>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className="flex gap-4 p-4 rounded-lg bg-muted/20 hover:bg-muted/40 transition-all group relative"
            >
              {/* Timeline Line */}
              {index !== activities.length - 1 && (
                <div className="absolute left-[30px] top-14 bottom-0 w-px bg-border" />
              )}

              {/* Icon */}
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border ${getActivityColor(activity.action)}`}>
                {getActivityIcon(activity.type, activity.action)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="font-medium">{activity.description}</p>
                  <Badge variant="outline" className="capitalize text-xs flex-shrink-0">
                    {activity.action}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {activity.user}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};
