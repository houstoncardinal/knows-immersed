import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Save } from "lucide-react";

export const AdminSettings = () => {
  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your studio settings and preferences</p>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-6">Studio Information</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="studio-name">Studio Name</Label>
              <Input id="studio-name" defaultValue="KNOWS STUDIOS" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="email">Contact Email</Label>
              <Input id="email" type="email" defaultValue="info@knowsstudios.com" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" defaultValue="323 609 3356" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input id="address" defaultValue="7240 Coldwater Canyon Avenue, Los Angeles, CA 91605" className="mt-2" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-6">Booking Settings</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Auto-confirm bookings</p>
                <p className="text-sm text-muted-foreground">Automatically confirm new bookings without manual approval</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email notifications</p>
                <p className="text-sm text-muted-foreground">Receive email alerts for new bookings and updates</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">SMS notifications</p>
                <p className="text-sm text-muted-foreground">Receive SMS alerts for urgent booking changes</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-6">Package Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="half-day">Half Day (4 hours)</Label>
              <Input id="half-day" type="number" defaultValue="250" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="full-day">Full Day (8 hours)</Label>
              <Input id="full-day" type="number" defaultValue="450" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="multi-day">Multi-Day (per day)</Label>
              <Input id="multi-day" type="number" defaultValue="400" className="mt-2" />
            </div>
          </div>
        </Card>

        <div className="flex justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button className="bg-gradient-to-r from-neon-cyan to-neon-pink">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};
