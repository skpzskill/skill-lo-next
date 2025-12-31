import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const StudentProgress = () => {
  const skillProgress = [
    { skill: "Creative Thinking", progress: 80, color: "bg-primary" },
    { skill: "Problem Solving", progress: 70, color: "bg-accent" },
    { skill: "Business Planning", progress: 55, color: "bg-green-500" },
    { skill: "Communication", progress: 65, color: "bg-purple-500" },
    { skill: "AI Fundamentals", progress: 40, color: "bg-blue-500" },
    { skill: "Financial Literacy", progress: 30, color: "bg-yellow-500" },
  ];

  const weeklyActivity = [
    { day: "Mon", hours: 2 },
    { day: "Tue", hours: 1.5 },
    { day: "Wed", hours: 3 },
    { day: "Thu", hours: 2 },
    { day: "Fri", hours: 1 },
    { day: "Sat", hours: 4 },
    { day: "Sun", hours: 2.5 },
  ];

  const maxHours = Math.max(...weeklyActivity.map(d => d.hours));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">My Progress</h2>
        <p className="text-muted-foreground">Track your skill development and learning activity</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills Progress */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Skills Development</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {skillProgress.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground font-medium">{item.skill}</span>
                  <span className="text-muted-foreground">{item.progress}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${item.color} rounded-full transition-all duration-500`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Weekly Activity */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between h-48 gap-2">
              {weeklyActivity.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-gradient-to-t from-primary to-accent rounded-t-md transition-all duration-300 hover:opacity-80"
                    style={{ height: `${(day.hours / maxHours) * 100}%` }}
                  />
                  <span className="text-xs text-muted-foreground">{day.day}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <p className="text-2xl font-bold text-foreground">16 hours</p>
              <p className="text-sm text-muted-foreground">Total this week</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Streak */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Learning Streak 🔥</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-4xl font-bold text-accent">12</p>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </div>
            <div className="flex-1 grid grid-cols-7 gap-1">
              {Array.from({ length: 28 }).map((_, i) => (
                <div 
                  key={i}
                  className={`h-8 rounded ${
                    i < 12 ? 'bg-primary' : i < 20 ? 'bg-primary/30' : 'bg-secondary'
                  }`}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentProgress;
