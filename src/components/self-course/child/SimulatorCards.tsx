import { useState } from "react";
import { Lightbulb, Bot, Palette, Coins, Mic, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SimulatorType } from "../ChildMode";
import VoiceTutor from "./VoiceTutor";

interface SimulatorCardsProps {
  onSelectSimulator: (simulator: SimulatorType) => void;
}

const simulators = [
  {
    id: "entrepreneurship" as SimulatorType,
    title: "Entrepreneurship Simulator",
    description: "Start your own business adventure!",
    icon: Lightbulb,
    gradient: "from-orange-400 to-red-500",
    bgGradient: "from-orange-50 to-red-50",
    emoji: "💡",
  },
  {
    id: "ai-literacy" as SimulatorType,
    title: "AI Literacy Simulator",
    description: "Discover how AI thinks and works!",
    icon: Bot,
    gradient: "from-violet-500 to-purple-600",
    bgGradient: "from-violet-50 to-purple-50",
    emoji: "🤖",
  },
  {
    id: "design-thinking" as SimulatorType,
    title: "Design Thinking Simulator",
    description: "Solve problems like a designer!",
    icon: Palette,
    gradient: "from-pink-400 to-rose-500",
    bgGradient: "from-pink-50 to-rose-50",
    emoji: "🎨",
  },
  {
    id: "money-skills" as SimulatorType,
    title: "Money Skills Simulator",
    description: "Learn to save, spend & grow money!",
    icon: Coins,
    gradient: "from-emerald-400 to-teal-500",
    bgGradient: "from-emerald-50 to-teal-50",
    emoji: "💰",
  },
];

const SimulatorCards = ({ onSelectSimulator }: SimulatorCardsProps) => {
  const [activeSimulator, setActiveSimulator] = useState<SimulatorType>(null);

  const handleSimulatorClick = (simulatorId: SimulatorType) => {
    setActiveSimulator(simulatorId);
  };

  const handleCloseVoiceTutor = () => {
    setActiveSimulator(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {simulators.map((sim) => (
          <Card
            key={sim.id}
            className={`group cursor-pointer border-2 border-transparent hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] bg-gradient-to-br ${sim.bgGradient} overflow-hidden`}
            onClick={() => handleSimulatorClick(sim.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${sim.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <sim.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-foreground text-lg">{sim.title}</h3>
                    <span className="text-xl">{sim.emoji}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">{sim.description}</p>
                  <div className="pt-2 flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${sim.gradient} text-white`}>
                      <Mic className="w-3 h-3" />
                      Voice + Chat
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Voice Tutor Dialog */}
      {activeSimulator && (
        <VoiceTutor
          simulator={activeSimulator}
          isOpen={!!activeSimulator}
          onClose={handleCloseVoiceTutor}
        />
      )}
    </>
  );
};

export default SimulatorCards;
