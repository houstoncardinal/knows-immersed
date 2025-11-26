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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="space-y-8 p-8 max-w-4xl">
          {/* Professional Header */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-slate-900 mb-2">Settings</h1>
                <p className="text-lg text-slate-600">Advanced studio configuration and preferences management</p>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    System Settings
                  </div>
                  <div className="text-sm text-slate-500">
                    Last updated: {new Date().toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Studio Information */}
          <Card className="bg-white border border-slate-200 shadow-sm p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <Save className="w-8 h-8 text-slate-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-1">Studio Information</h2>
                <p className="text-slate-600">Basic studio details and contact information</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="studio-name" className="text-sm font-semibold text-slate-700">Studio Name</Label>
                <Input id="studio-name" defaultValue="KNOWS STUDIOS" className="border-slate-300 focus:border-slate-400" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-slate-700">Contact Email</Label>
                <Input id="email" type="email" defaultValue="info@knowsstudios.com" className="border-slate-300 focus:border-slate-400" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-semibold text-slate-700">Phone Number</Label>
                <Input id="phone" defaultValue="323 609 3356" className="border-slate-300 focus:border-slate-400" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address" className="text-sm font-semibold text-slate-700">Address</Label>
                <Input id="address" defaultValue="7240 Coldwater Canyon Avenue, Los Angeles, CA 91605" className="border-slate-300 focus:border-slate-400" />
              </div>
            </div>
          </Card>

          {/* Booking Settings */}
          <Card className="bg-white border border-slate-200 shadow-sm p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <Save className="w-8 h-8 text-slate-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-1">Booking Settings</h2>
                <p className="text-slate-600">Configure booking preferences and notification settings</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-6 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 mb-1">Auto-confirm bookings</p>
                  <p className="text-sm text-slate-600">Automatically confirm new bookings without manual approval</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between p-6 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 mb-1">Email notifications</p>
                  <p className="text-sm text-slate-600">Receive email alerts for new bookings and updates</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-6 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 mb-1">SMS notifications</p>
                  <p className="text-sm text-slate-600">Receive SMS alerts for urgent booking changes</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>

          {/* Package Pricing */}
          <Card className="bg-white border border-slate-200 shadow-sm p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <Save className="w-8 h-8 text-slate-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-1">Package Pricing</h2>
                <p className="text-slate-600">Configure pricing for different service packages</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="half-day" className="text-sm font-semibold text-slate-700">Half Day (4 hours)</Label>
                <Input id="half-day" type="number" defaultValue="250" className="border-slate-300 focus:border-slate-400" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="full-day" className="text-sm font-semibold text-slate-700">Full Day (8 hours)</Label>
                <Input id="full-day" type="number" defaultValue="450" className="border-slate-300 focus:border-slate-400" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="multi-day" className="text-sm font-semibold text-slate-700">Multi-Day (per day)</Label>
                <Input id="multi-day" type="number" defaultValue="400" className="border-slate-300 focus:border-slate-400" />
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6">
            <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8">
              Cancel
            </Button>
            <Button className="bg-slate-900 hover:bg-slate-800 text-white px-8">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
