import SkillProgressBars from "./parent/SkillProgressBars";
import WeeklyReportCard from "./parent/WeeklyReportCard";
import StrengthsWeaknesses from "./parent/StrengthsWeaknesses";
import LearningStyleDetection from "./parent/LearningStyleDetection";
import SafetyDashboard from "./parent/SafetyDashboard";

const ParentMode = () => {
  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Parent Dashboard
        </h1>
        <p className="text-muted-foreground">
          Track your child's learning progress and insights
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <SkillProgressBars />
          <LearningStyleDetection />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <WeeklyReportCard />
          <StrengthsWeaknesses />
        </div>
      </div>

      {/* Full Width Safety Dashboard */}
      <SafetyDashboard />
    </div>
  );
};

export default ParentMode;
