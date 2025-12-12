import { Trophy, Star, Target, Zap, Award, Medal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StudentAchievements = () => {
  const achievements = [
    { id: 1, name: "First Steps", description: "Complete your first lesson", icon: Star, earned: true, date: "Oct 15, 2024" },
    { id: 2, name: "Quick Learner", description: "Complete 5 lessons in one day", icon: Zap, earned: true, date: "Oct 20, 2024" },
    { id: 3, name: "Idea Machine", description: "Submit 10 design challenges", icon: Target, earned: true, date: "Nov 1, 2024" },
    { id: 4, name: "Week Warrior", description: "Maintain 7-day streak", icon: Trophy, earned: true, date: "Nov 8, 2024" },
    { id: 5, name: "Problem Solver", description: "Score 90%+ on problem-solving quiz", icon: Award, earned: true, date: "Nov 15, 2024" },
    { id: 6, name: "Innovator", description: "Complete Design Thinking module", icon: Medal, earned: true, date: "Nov 22, 2024" },
    { id: 7, name: "Business Starter", description: "Create your first business plan", icon: Star, earned: true, date: "Nov 28, 2024" },
    { id: 8, name: "AI Explorer", description: "Complete AI fundamentals", icon: Zap, earned: false, date: null },
    { id: 9, name: "Master Entrepreneur", description: "Complete all entrepreneurship modules", icon: Trophy, earned: false, date: null },
    { id: 10, name: "Financial Wizard", description: "Pass all financial literacy tests", icon: Award, earned: false, date: null },
  ];

  const earnedCount = achievements.filter(a => a.earned).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Achievements</h2>
          <p className="text-muted-foreground">Your earned badges and milestones</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-accent">{earnedCount}/{achievements.length}</p>
          <p className="text-sm text-muted-foreground">Achievements Earned</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => (
          <Card 
            key={achievement.id} 
            className={`border-border transition-all ${
              achievement.earned 
                ? 'bg-gradient-to-br from-primary/5 to-accent/5' 
                : 'opacity-50 grayscale'
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  achievement.earned 
                    ? 'bg-gradient-to-br from-primary to-accent' 
                    : 'bg-secondary'
                }`}>
                  <achievement.icon className={`w-6 h-6 ${
                    achievement.earned ? 'text-primary-foreground' : 'text-muted-foreground'
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{achievement.name}</h3>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  {achievement.earned && (
                    <p className="text-xs text-accent mt-1">Earned: {achievement.date}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentAchievements;
