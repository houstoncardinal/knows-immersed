import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Save, Moon, Sun } from "lucide-react";
import { useAdminTheme } from "@/hooks/useAdminTheme";

export const AdminSettings = () => {
  const { theme, toggleTheme } = useAdminTheme();

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="space-y-8 p-8 max-w-4xl">
          {/* Professional Header */}
          <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">Settings</h1>
                <p className="text-lg text-muted-foreground">Advanced studio configuration and preferences management</p>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    System Settings
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Last updated: {new Date().toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Theme Settings */}
          <Card className="bg-card border border-border shadow-sm p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-muted/50 border border-border">
                {theme === "dark" ? (
                  <Moon className="w-8 h-8 text-foreground" />
                ) : (
                  <Sun className="w-8 h-8 text-foreground" />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">Appearance</h2>
                <p className="text-muted-foreground">Customize your admin dashboard appearance</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-6 bg-muted/30 rounded-lg border border-border">
                <div className="flex-1">
                  <p className="font-semibold text-foreground mb-1">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">
                    {theme === "dark" ? "Currently using dark theme" : "Switch to dark theme for better focus"}
                  </p>
                </div>
                <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
              </div>
            </div>
          </Card>

          {/* Studio Information */}
          <Card className="bg-card border border-border shadow-sm p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-muted/50 border border-border">
                <Save className="w-8 h-8 text-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">Studio Information</h2>
                <p className="text-muted-foreground">Basic studio details and contact information</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="studio-name" className="text-sm font-semibold text-foreground">Studio Name</Label>
                <Input id="studio-name" defaultValue="KNOWS STUDIOS" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-foreground">Contact Email</Label>
                <Input id="email" type="email" defaultValue="info@knowsstudios.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-semibold text-foreground">Phone Number</Label>
                <Input id="phone" defaultValue="323 609 3356" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address" className="text-sm font-semibold text-foreground">Address</Label>
                <Input id="address" defaultValue="7240 Coldwater Canyon Avenue, Los Angeles, CA 91605" />
              </div>
            </div>
          </Card>

          {/* Booking Settings */}
          <Card className="bg-card border border-border shadow-sm p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-muted/50 border border-border">
                <Save className="w-8 h-8 text-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">Booking Settings</h2>
                <p className="text-muted-foreground">Configure booking preferences and notification settings</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-6 bg-muted/30 rounded-lg border border-border">
                <div className="flex-1">
                  <p className="font-semibold text-foreground mb-1">Auto-confirm bookings</p>
                  <p className="text-sm text-muted-foreground">Automatically confirm new bookings without manual approval</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between p-6 bg-muted/30 rounded-lg border border-border">
                <div className="flex-1">
                  <p className="font-semibold text-foreground mb-1">Email notifications</p>
                  <p className="text-sm text-muted-foreground">Receive email alerts for new bookings and updates</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-6 bg-muted/30 rounded-lg border border-border">
                <div className="flex-1">
                  <p className="font-semibold text-foreground mb-1">SMS notifications</p>
                  <p className="text-sm text-muted-foreground">Receive SMS alerts for urgent booking changes</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>

          {/* Package Pricing */}
          <Card className="bg-card border border-border shadow-sm p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-muted/50 border border-border">
                <Save className="w-8 h-8 text-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">Package Pricing</h2>
                <p className="text-muted-foreground">Configure pricing for different service packages</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="half-day" className="text-sm font-semibold text-foreground">Half Day (4 hours)</Label>
                <Input id="half-day" type="number" defaultValue="250" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="full-day" className="text-sm font-semibold text-foreground">Full Day (8 hours)</Label>
                <Input id="full-day" type="number" defaultValue="450" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="multi-day" className="text-sm font-semibold text-foreground">Multi-Day (per day)</Label>
                <Input id="multi-day" type="number" defaultValue="400" />
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6">
            <Button variant="outline" className="px-8">
              Cancel
            </Button>
            <Button className="px-8">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
