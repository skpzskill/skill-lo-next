import { BookOpen, Clock, Trophy, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const StudentOverview = () => {
  const stats = [
    { title: "Enrolled Courses", value: "3", icon: BookOpen, color: "text-primary" },
    { title: "Hours Learned", value: "24", icon: Clock, color: "text-accent" },
    { title: "Achievements", value: "7", icon: Trophy, color: "text-yellow-500" },
    { title: "Overall Progress", value: "68%", icon: TrendingUp, color: "text-green-500" },
  ];

  const recentCourses = [
    { name: "Design Thinking", progress: 75, nextLesson: "Ideation Techniques" },
    { name: "Entrepreneurship", progress: 45, nextLesson: "Business Model Canvas" },
    { name: "AI Skills", progress: 30, nextLesson: "Introduction to Machine Learning" },
  ];

  const upcomingTasks = [
    { task: "Submit Design Challenge", due: "Tomorrow", course: "Design Thinking" },
    { task: "Watch: Startup Funding", due: "In 2 days", course: "Entrepreneurship" },
    { task: "Complete AI Quiz", due: "In 3 days", course: "AI Skills" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Welcome back, John! 👋</h2>
        <p className="text-muted-foreground">Continue your learning journey</p>
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
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Courses */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Continue Learning</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentCourses.map((course, index) => (
              <div key={index} className="p-4 rounded-lg bg-secondary/50 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-foreground">{course.name}</h4>
                  <span className="text-sm text-muted-foreground">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  Next: {course.nextLesson}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Upcoming Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <div>
                  <p className="font-medium text-foreground">{task.task}</p>
                  <p className="text-sm text-muted-foreground">{task.course}</p>
                </div>
                <span className="text-sm font-medium text-accent">{task.due}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentOverview;
