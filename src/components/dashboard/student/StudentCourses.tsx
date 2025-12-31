import { Play, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const StudentCourses = () => {
  const courses = [
    {
      id: 1,
      name: "Design Thinking",
      description: "Learn creative problem-solving and innovation methodology",
      progress: 75,
      totalLessons: 20,
      completedLessons: 15,
      duration: "25 weeks",
      status: "in-progress",
    },
    {
      id: 2,
      name: "Entrepreneurship",
      description: "Build your first mini-business from idea to launch",
      progress: 45,
      totalLessons: 24,
      completedLessons: 11,
      duration: "25 weeks",
      status: "in-progress",
    },
    {
      id: 3,
      name: "AI Skills",
      description: "Explore artificial intelligence and machine learning",
      progress: 30,
      totalLessons: 20,
      completedLessons: 6,
      duration: "25 weeks",
      status: "in-progress",
    },
    {
      id: 4,
      name: "Financial Literacy",
      description: "Understand money management, budgeting, and saving",
      progress: 0,
      totalLessons: 18,
      completedLessons: 0,
      duration: "25 weeks",
      status: "not-started",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">My Courses</h2>
        <p className="text-muted-foreground">Track and continue your enrolled programs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="border-border overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-primary to-accent" />
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{course.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{course.description}</p>
                </div>
                <Badge 
                  variant={course.status === "in-progress" ? "default" : "secondary"}
                  className={course.status === "in-progress" ? "bg-primary" : ""}
                >
                  {course.status === "in-progress" ? "In Progress" : "Not Started"}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-foreground">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
              </div>

              <Button className="w-full" variant={course.status === "in-progress" ? "default" : "outline"}>
                <Play className="w-4 h-4 mr-2" />
                {course.status === "in-progress" ? "Continue Learning" : "Start Course"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentCourses;
