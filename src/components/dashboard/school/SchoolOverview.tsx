import { Users, BookOpen, TrendingUp, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const SchoolOverview = () => {
  const stats = [
    { title: "Total Students", value: "245", icon: Users, color: "text-primary", change: "+12 this month" },
    { title: "Active Programs", value: "4", icon: BookOpen, color: "text-accent", change: "All running" },
    { title: "Avg. Completion", value: "78%", icon: TrendingUp, color: "text-green-500", change: "+5% from last month" },
    { title: "Monthly Billing", value: "₹3,67,500", icon: DollarSign, color: "text-purple-500", change: "Due: Dec 15" },
  ];

  const programPerformance = [
    { name: "Design Thinking", students: 68, avgProgress: 72, completion: 45 },
    { name: "Entrepreneurship", students: 85, avgProgress: 65, completion: 32 },
    { name: "AI Skills", students: 52, avgProgress: 58, completion: 18 },
    { name: "Financial Literacy", students: 40, avgProgress: 80, completion: 55 },
  ];

  const recentActivity = [
    { action: "New enrollment", details: "15 students enrolled in AI Skills", time: "2 hours ago" },
    { action: "Course completed", details: "Sarah M. completed Design Thinking", time: "5 hours ago" },
    { action: "Payment received", details: "Monthly subscription renewed", time: "1 day ago" },
    { action: "Achievement unlocked", details: "Class 8B reached 80% completion", time: "2 days ago" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Dashboard Overview</h2>
        <p className="text-muted-foreground">Lincoln High School - Program Analytics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Program Performance */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Program Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {programPerformance.map((program, index) => (
              <div key={index} className="p-4 rounded-lg bg-secondary/50 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-foreground">{program.name}</h4>
                  <span className="text-sm text-muted-foreground">{program.students} students</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Avg. Progress</span>
                    <span className="text-foreground">{program.avgProgress}%</span>
                  </div>
                  <Progress value={program.avgProgress} className="h-2" />
                </div>
                <p className="text-sm text-accent">{program.completion} students completed</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.details}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SchoolOverview;
