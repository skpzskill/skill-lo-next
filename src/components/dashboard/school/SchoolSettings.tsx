import { Building, Users, Bell, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const SchoolSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Settings</h2>
        <p className="text-muted-foreground">Manage your organization settings</p>
      </div>

      <div className="grid gap-6">
        {/* Organization Info */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Building className="w-5 h-5" />
              Organization Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="orgName">Organization Name</Label>
                <Input id="orgName" defaultValue="Lincoln High School" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="orgType">Organization Type</Label>
                <Input id="orgType" defaultValue="High School" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="orgEmail">Contact Email</Label>
                <Input id="orgEmail" type="email" defaultValue="admin@lincolnhigh.edu" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="orgPhone">Phone Number</Label>
                <Input id="orgPhone" defaultValue="+91 98765 43210" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="orgAddress">Address</Label>
                <Input id="orgAddress" defaultValue="123 Education Lane, Mumbai, Maharashtra 400001" />
              </div>
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        {/* Admin Users */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Users className="w-5 h-5" />
              Admin Users
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {[
                { name: "Rajesh Kumar", email: "rajesh.k@lincolnhigh.edu", role: "Super Admin" },
                { name: "Priya Sharma", email: "priya.s@lincolnhigh.edu", role: "Admin" },
                { name: "Amit Patel", email: "amit.p@lincolnhigh.edu", role: "Coordinator" },
              ].map((admin, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <span className="text-primary-foreground font-semibold text-sm">
                        {admin.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{admin.name}</p>
                      <p className="text-sm text-muted-foreground">{admin.email}</p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">{admin.role}</span>
                </div>
              ))}
            </div>
            <Button variant="outline">Add Admin User</Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Student Progress Reports</p>
                <p className="text-sm text-muted-foreground">Weekly summary of student performance</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">New Enrollment Alerts</p>
                <p className="text-sm text-muted-foreground">Get notified when students enroll</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Billing Reminders</p>
                <p className="text-sm text-muted-foreground">Reminders before payment due dates</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Course Completion Notifications</p>
                <p className="text-sm text-muted-foreground">Celebrate student completions</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Shield className="w-5 h-5" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Session Timeout</p>
                <p className="text-sm text-muted-foreground">Auto logout after 30 minutes of inactivity</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Button variant="outline">Change Password</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SchoolSettings;
