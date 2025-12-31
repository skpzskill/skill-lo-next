import { Shield, CheckCircle, AlertTriangle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SafetyDashboard = () => {
  const safetyChecks = [
    { 
      label: "Content Moderation", 
      status: "passed", 
      description: "All content reviewed for age-appropriateness" 
    },
    { 
      label: "No Harmful Language", 
      status: "passed", 
      description: "Zero instances of harmful content detected" 
    },
    { 
      label: "Privacy Protected", 
      status: "passed", 
      description: "No personal information shared" 
    },
    { 
      label: "Screen Time Limit", 
      status: "warning", 
      description: "Approaching daily limit (45/60 mins)" 
    },
  ];

  return (
    <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-green-600" />
          Safety Dashboard
          <Badge className="ml-2 bg-green-500">All Clear</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {safetyChecks.map((check) => (
            <div 
              key={check.label}
              className={`p-4 rounded-lg border ${
                check.status === "passed" 
                  ? "bg-white border-green-200" 
                  : "bg-amber-50 border-amber-200"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {check.status === "passed" ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                )}
                <span className="font-medium text-sm">{check.label}</span>
              </div>
              <p className="text-xs text-muted-foreground">{check.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>Last safety scan: 2 minutes ago</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default SafetyDashboard;
