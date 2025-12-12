import { Download, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const WeeklyReportCard = () => {
  const weeklyStats = [
    { label: "Sessions Completed", value: "12" },
    { label: "Time Spent", value: "4h 32m" },
    { label: "New Skills Unlocked", value: "3" },
    { label: "Quizzes Passed", value: "8" },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-500" />
          Weekly Report Card
        </CardTitle>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="w-4 h-4" />
          Download PDF
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {weeklyStats.map((stat) => (
            <div key={stat.label} className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-700">
            <span className="font-semibold">🎉 Weekly Highlight:</span> Your child showed exceptional creativity in the Design Thinking module!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyReportCard;
