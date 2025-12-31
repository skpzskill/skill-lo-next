import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const skills = [
  { name: "Entrepreneurship", progress: 72, color: "bg-orange-500" },
  { name: "AI Literacy", progress: 58, color: "bg-violet-500" },
  { name: "Design Thinking", progress: 85, color: "bg-pink-500" },
  { name: "Financial Literacy", progress: 64, color: "bg-emerald-500" },
];

const SkillProgressBars = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          📊 Skill Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.name} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{skill.name}</span>
              <span className="text-muted-foreground">{skill.progress}%</span>
            </div>
            <div className="relative h-3 bg-muted rounded-full overflow-hidden">
              <div 
                className={`absolute left-0 top-0 h-full ${skill.color} rounded-full transition-all duration-500`}
                style={{ width: `${skill.progress}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SkillProgressBars;
