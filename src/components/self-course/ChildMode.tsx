import { useState } from "react";
import SimulatorCards from "./child/SimulatorCards";
import MiniProjectsCarousel from "./child/MiniProjectsCarousel";
import ProgressPreview from "./child/ProgressPreview";
import EntreSkillsSimulator from "./child/simulator/EntreSkillsSimulator";

export type SimulatorType = "entrepreneurship" | "entre-skills-sim" | "ai-literacy" | "design-thinking" | "money-skills" | null;

const ChildMode = () => {
  const [selectedSimulator, setSelectedSimulator] = useState<string | null>(null);

  if (selectedSimulator === "entre-skills-sim") {
    return <EntreSkillsSimulator onBack={() => setSelectedSimulator(null)} />;
  }

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
          Hey there, Future Leader! 🚀
        </h1>
        <p className="text-muted-foreground text-lg">
          Choose a skill and learn by doing!
        </p>
      </div>

      {/* Progress Preview */}
      <ProgressPreview />

      {/* Simulator Cards */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <span className="text-2xl">🎮</span> Skill Simulators
        </h2>
        <SimulatorCards onSelectSimulator={setSelectedSimulator} />
      </div>

      {/* Mini Projects Carousel */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <span className="text-2xl">🛠️</span> Mini Projects
        </h2>
        <MiniProjectsCarousel onSelectProject={() => { }} />
      </div>
    </div>
  );
};

export default ChildMode;
