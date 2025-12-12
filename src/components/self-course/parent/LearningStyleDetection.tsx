import { Eye, Ear, Hand, Brain } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const learningStyles = [
  { 
    name: "Visual", 
    percentage: 45, 
    icon: Eye, 
    color: "text-blue-500",
    bgColor: "bg-blue-100",
    description: "Learns best through images and diagrams"
  },
  { 
    name: "Auditory", 
    percentage: 20, 
    icon: Ear, 
    color: "text-purple-500",
    bgColor: "bg-purple-100",
    description: "Prefers listening and verbal instructions"
  },
  { 
    name: "Kinesthetic", 
    percentage: 30, 
    icon: Hand, 
    color: "text-orange-500",
    bgColor: "bg-orange-100",
    description: "Learns through hands-on activities"
  },
  { 
    name: "Logical", 
    percentage: 5, 
    icon: Brain, 
    color: "text-green-500",
    bgColor: "bg-green-100",
    description: "Analytical and pattern-based learning"
  },
];

const LearningStyleDetection = () => {
  const primaryStyle = learningStyles.reduce((prev, current) => 
    prev.percentage > current.percentage ? prev : current
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🧠 Learning Style Detection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {learningStyles.map((style) => (
            <div 
              key={style.name} 
              className={`p-3 rounded-lg ${style.bgColor} ${style.name === primaryStyle.name ? 'ring-2 ring-primary' : ''}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <style.icon className={`w-4 h-4 ${style.color}`} />
                <span className="font-medium text-sm">{style.name}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{style.percentage}%</p>
              <p className="text-xs text-muted-foreground mt-1">{style.description}</p>
            </div>
          ))}
        </div>
        
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            <span className="font-semibold">Primary Style:</span> Your child is primarily a <strong>{primaryStyle.name}</strong> learner. We recommend activities with more visual elements!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningStyleDetection;
