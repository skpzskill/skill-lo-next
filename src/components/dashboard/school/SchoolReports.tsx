import { Download, TrendingUp, Users, Award, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const SchoolReports = () => {
  const monthlyStats = [
    { month: "Sep", students: 180, completions: 45, avgProgress: 65 },
    { month: "Oct", students: 210, completions: 68, avgProgress: 70 },
    { month: "Nov", students: 245, completions: 95, avgProgress: 78 },
  ];

  const topPerformers = [
    { name: "Meera Joshi", grade: "Grade 8", progress: 95, courses: 4 },
    { name: "Rohan Kumar", grade: "Grade 8", progress: 91, courses: 4 },
    { name: "Aarav Sharma", grade: "Grade 8", progress: 85, courses: 3 },
    { name: "Diya Gupta", grade: "Grade 7", progress: 78, courses: 3 },
    { name: "Priya Patel", grade: "Grade 7", progress: 72, courses: 2 },
  ];

  const gradePerformance = [
    { grade: "Grade 6", students: 45, avgProgress: 62 },
    { grade: "Grade 7", students: 85, avgProgress: 74 },
    { grade: "Grade 8", students: 115, avgProgress: 82 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Reports & Analytics</h2>
          <p className="text-muted-foreground">Comprehensive insights into student performance</p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">245</p>
            <p className="text-sm text-muted-foreground">Total Students</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4 text-center">
            <Award className="w-8 h-8 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">150</p>
            <p className="text-sm text-muted-foreground">Courses Completed</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">78%</p>
            <p className="text-sm text-muted-foreground">Avg. Progress</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4 text-center">
            <Calendar className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">92%</p>
            <p className="text-sm text-muted-foreground">Attendance Rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Monthly Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyStats.map((month, index) => (
                <div key={index} className="p-4 rounded-lg bg-secondary/50">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-foreground">{month.month} 2024</h4>
                    <span className="text-sm text-muted-foreground">{month.students} students</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Completions</p>
                      <p className="font-medium text-foreground">{month.completions}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Avg. Progress</p>
                      <p className="font-medium text-foreground">{month.avgProgress}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Top Performers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topPerformers.map((student, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{student.name}</p>
                  <p className="text-sm text-muted-foreground">{student.grade} • {student.courses} courses</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-accent">{student.progress}%</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Grade Performance */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Performance by Grade</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gradePerformance.map((grade, index) => (
              <div key={index} className="text-center p-6 rounded-lg bg-secondary/50">
                <h4 className="text-lg font-bold text-foreground mb-2">{grade.grade}</h4>
                <p className="text-3xl font-bold text-primary mb-2">{grade.avgProgress}%</p>
                <p className="text-sm text-muted-foreground">{grade.students} students enrolled</p>
                <Progress value={grade.avgProgress} className="h-2 mt-4" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchoolReports;
