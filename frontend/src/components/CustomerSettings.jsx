import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Settings, Bell, Mail, Phone, Clock, Shield } from 'lucide-react';

export function CustomerSettings() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
          <Settings className="size-6 text-white" />
        </div>
        <div>
          <h2 className="bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent">
            Customer Settings
          </h2>
          <p className="text-slate-600">
            Configure system preferences and notification settings
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Notification Settings */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-all">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Bell className="size-5 text-blue-600" />
              </div>
              <h3 className="text-slate-900">Notification Preferences</h3>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-slate-600">Receive ticket updates via email</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Alerts</Label>
                  <p className="text-slate-600">High priority ticket alerts</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Desktop Notifications</Label>
                  <p className="text-slate-600">Browser push notifications</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Daily Summary</Label>
                  <p className="text-slate-600">Daily performance report at 6 PM</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </Card>

        {/* Contact Preferences */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-all">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Phone className="size-5 text-green-600" />
              </div>
              <h3 className="text-slate-900">Contact Settings</h3>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Primary Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 size-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="support@bank.com"
                    className="pl-10"
                    defaultValue="support@retailbank.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Support Hotline</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 size-4 text-slate-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="pl-10"
                    defaultValue="+1 (800) 555-BANK"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="backup-email">Backup Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 size-4 text-slate-400" />
                  <Input
                    id="backup-email"
                    type="email"
                    placeholder="backup@bank.com"
                    className="pl-10"
                    defaultValue="escalation@retailbank.com"
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Business Hours */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-all">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="size-5 text-purple-600" />
              </div>
              <h3 className="text-slate-900">Business Hours</h3>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-slate-700">Monday - Friday</span>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  8:00 AM - 6:00 PM
                </Badge>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-slate-700">Saturday</span>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  9:00 AM - 2:00 PM
                </Badge>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-slate-700">Sunday</span>
                <Badge variant="outline" className="bg-slate-100 text-slate-600 border-slate-200">
                  Closed
                </Badge>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-slate-700">Holiday Hours</span>
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                  Variable
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Security Settings */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-all">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Shield className="size-5 text-red-600" />
              </div>
              <h3 className="text-slate-900">Security & Privacy</h3>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-slate-600">Enhanced account security</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Session Timeout</Label>
                  <p className="text-slate-600">Auto-logout after inactivity</p>
                </div>
                <Badge variant="outline">15 minutes</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Data Encryption</Label>
                  <p className="text-slate-600">AES-256 encryption enabled</p>
                </div>
                <Badge className="bg-green-500">Active</Badge>
              </div>

              <Button variant="outline" className="w-full mt-4">
                Change Password
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline">Reset to Defaults</Button>
        <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/30">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
