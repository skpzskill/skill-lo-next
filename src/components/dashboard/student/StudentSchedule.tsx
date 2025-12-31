import { Calendar, Clock, Video, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const StudentSchedule = () => {
  const todayClasses = [
    { time: "10:00 AM", title: "Design Thinking - Prototyping", type: "Live Session", duration: "60 min" },
    { time: "2:00 PM", title: "Entrepreneurship Workshop", type: "Workshop", duration: "90 min" },
  ];

  const weekSchedule = [
    { day: "Monday", classes: [
      { time: "10:00 AM", title: "Design Thinking", type: "Live" },
      { time: "3:00 PM", title: "AI Skills", type: "Self-paced" },
    ]},
    { day: "Tuesday", classes: [
      { time: "11:00 AM", title: "Entrepreneurship", type: "Live" },
    ]},
    { day: "Wednesday", classes: [
      { time: "10:00 AM", title: "Design Thinking", type: "Workshop" },
      { time: "2:00 PM", title: "AI Skills", type: "Live" },
    ]},
    { day: "Thursday", classes: [
      { time: "11:00 AM", title: "Entrepreneurship", type: "Live" },
      { time: "4:00 PM", title: "Mentor Session", type: "1-on-1" },
    ]},
    { day: "Friday", classes: [
      { time: "10:00 AM", title: "Weekly Review", type: "Group" },
    ]},
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Schedule</h2>
        <p className="text-muted-foreground">Your upcoming classes and sessions</p>
      </div>

      {/* Today's Classes */}
      <Card className="border-border bg-gradient-to-br from-primary/5 to-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Calendar className="w-5 h-5 text-primary" />
            Today's Classes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {todayClasses.map((classItem, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-card border border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Video className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{classItem.title}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{classItem.time}</span>
                    <span>•</span>
                    <span>{classItem.duration}</span>
                  </div>
                </div>
              </div>
              <Badge variant="outline" className="border-primary text-primary">
                {classItem.type}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Weekly Schedule */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-foreground">This Week</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weekSchedule.map((day, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-28 flex-shrink-0">
                  <p className="font-semibold text-foreground">{day.day}</p>
                </div>
                <div className="flex-1 space-y-2">
                  {day.classes.map((classItem, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-4 h-4 text-primary" />
                        <span className="text-foreground">{classItem.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{classItem.time}</span>
                        <Badge variant="secondary" className="text-xs">
                          {classItem.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentSchedule;
