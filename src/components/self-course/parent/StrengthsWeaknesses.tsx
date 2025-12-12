import { TrendingUp, TrendingDown, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const StrengthsWeaknesses = () => {
  const strengths = [
    "Creative problem-solving",
    "Visual learning",
    "Team collaboration",
    "Quick concept grasp",
  ];

  const areasToImprove = [
    "Mathematical calculations",
    "Long-form reading",
    "Time management",
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-violet-500" />
          AI-Generated Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Strengths */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-green-600">
            <TrendingUp className="w-4 h-4" />
            Strengths
          </div>
          <div className="flex flex-wrap gap-2">
            {strengths.map((strength) => (
              <Badge key={strength} variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-200">
                {strength}
              </Badge>
            ))}
          </div>
        </div>

        {/* Areas to Improve */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-amber-600">
            <TrendingDown className="w-4 h-4" />
            Areas to Improve
          </div>
          <div className="flex flex-wrap gap-2">
            {areasToImprove.map((area) => (
              <Badge key={area} variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-200">
                {area}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-4 p-3 bg-violet-50 border border-violet-200 rounded-lg">
          <p className="text-sm text-violet-700">
            <span className="font-semibold">💡 Recommendation:</span> Consider focusing on money math activities this week to strengthen calculation skills.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StrengthsWeaknesses;
