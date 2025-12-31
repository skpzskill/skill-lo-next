import { Search, Filter, MoreVertical, Mail, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const SchoolStudents = () => {
  const students = [
    { id: 1, name: "Aarav Sharma", grade: "Grade 8", email: "aarav.s@school.edu", courses: 3, progress: 85, status: "active" },
    { id: 2, name: "Priya Patel", grade: "Grade 7", email: "priya.p@school.edu", courses: 2, progress: 72, status: "active" },
    { id: 3, name: "Rohan Kumar", grade: "Grade 8", email: "rohan.k@school.edu", courses: 4, progress: 91, status: "active" },
    { id: 4, name: "Ananya Singh", grade: "Grade 6", email: "ananya.s@school.edu", courses: 2, progress: 45, status: "needs-attention" },
    { id: 5, name: "Vikram Reddy", grade: "Grade 7", email: "vikram.r@school.edu", courses: 3, progress: 68, status: "active" },
    { id: 6, name: "Meera Joshi", grade: "Grade 8", email: "meera.j@school.edu", courses: 4, progress: 95, status: "active" },
    { id: 7, name: "Arjun Nair", grade: "Grade 6", email: "arjun.n@school.edu", courses: 1, progress: 30, status: "needs-attention" },
    { id: 8, name: "Diya Gupta", grade: "Grade 7", email: "diya.g@school.edu", courses: 3, progress: 78, status: "active" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Students</h2>
          <p className="text-muted-foreground">Manage and monitor enrolled students</p>
        </div>
        <Button>
          <Mail className="w-4 h-4 mr-2" />
          Invite Students
        </Button>
      </div>

      {/* Search and Filter */}
      <Card className="border-border">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search students..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-foreground">All Students ({students.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 text-muted-foreground font-medium">Student</th>
                  <th className="text-left p-3 text-muted-foreground font-medium">Grade</th>
                  <th className="text-left p-3 text-muted-foreground font-medium">Courses</th>
                  <th className="text-left p-3 text-muted-foreground font-medium">Progress</th>
                  <th className="text-left p-3 text-muted-foreground font-medium">Status</th>
                  <th className="text-left p-3 text-muted-foreground font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b border-border last:border-0 hover:bg-secondary/30">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                          <span className="text-primary-foreground font-semibold text-sm">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-foreground">{student.grade}</td>
                    <td className="p-3 text-foreground">{student.courses} courses</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Progress value={student.progress} className="w-20 h-2" />
                        <span className="text-sm text-foreground">{student.progress}%</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge 
                        variant={student.status === "active" ? "default" : "destructive"}
                        className={student.status === "active" ? "bg-green-500" : ""}
                      >
                        {student.status === "active" ? "Active" : "Needs Attention"}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <TrendingUp className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchoolStudents;
