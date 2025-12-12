import { Users, Clock, Calendar, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const SchoolPrograms = () => {
  const programs = [
    {
      id: 1,
      name: "Design Thinking",
      description: "Creative problem-solving and innovation methodology",
      enrolledStudents: 68,
      maxCapacity: 100,
      avgProgress: 72,
      startDate: "Sep 1, 2024",
      endDate: "Feb 28, 2025",
      status: "active",
      price: "₹15,000/student",
    },
    {
      id: 2,
      name: "Entrepreneurship",
      description: "Build mini-businesses from idea to launch",
      enrolledStudents: 85,
      maxCapacity: 100,
      avgProgress: 65,
      startDate: "Sep 1, 2024",
      endDate: "Feb 28, 2025",
      status: "active",
      price: "₹18,000/student",
    },
    {
      id: 3,
      name: "AI Skills",
      description: "Artificial intelligence and machine learning fundamentals",
      enrolledStudents: 52,
      maxCapacity: 75,
      avgProgress: 58,
      startDate: "Oct 1, 2024",
      endDate: "Mar 31, 2025",
      status: "active",
      price: "₹18,000/student",
    },
    {
      id: 4,
      name: "Financial Literacy",
      description: "Money management, budgeting, and basic economics",
      enrolledStudents: 40,
      maxCapacity: 80,
      avgProgress: 80,
      startDate: "Aug 15, 2024",
      endDate: "Jan 31, 2025",
      status: "active",
      price: "₹15,000/student",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Programs</h2>
          <p className="text-muted-foreground">Manage your enrolled programs</p>
        </div>
        <Button>Add New Program</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {programs.map((program) => (
          <Card key={program.id} className="border-border overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-primary to-accent" />
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{program.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{program.description}</p>
                </div>
                <Badge className="bg-green-500">{program.status}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-foreground">{program.enrolledStudents}/{program.maxCapacity} students</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-accent" />
                  <span className="text-foreground">{program.price}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Class Average Progress</span>
                  <span className="text-foreground font-medium">{program.avgProgress}%</span>
                </div>
                <Progress value={program.avgProgress} className="h-2" />
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{program.startDate} - {program.endDate}</span>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1">
                  View Details
                </Button>
                <Button variant="ghost" size="icon">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SchoolPrograms;
