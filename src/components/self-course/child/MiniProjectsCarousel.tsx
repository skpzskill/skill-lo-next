import { useState } from "react";
import { Store, School, PiggyBank, Cpu, Mic } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SimulatorType } from "../ChildMode";
import VoiceTutor from "./VoiceTutor";

interface MiniProjectsCarouselProps {
  onSelectProject?: (simulator: SimulatorType) => void;
}

const projects = [
  {
    id: 1,
    title: "Build a Tiny Business",
    description: "Create your own lemonade stand or craft shop!",
    icon: Store,
    gradient: "from-amber-400 to-orange-500",
    bgGradient: "from-amber-50 to-orange-50",
    emoji: "🏪",
    difficulty: "Easy",
    duration: "30 mins",
    simulator: "entrepreneurship" as SimulatorType,
  },
  {
    id: 2,
    title: "Fix a School Problem",
    description: "Use design thinking to solve a real problem!",
    icon: School,
    gradient: "from-blue-400 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50",
    emoji: "🏫",
    difficulty: "Medium",
    duration: "45 mins",
    simulator: "design-thinking" as SimulatorType,
  },
  {
    id: 3,
    title: "Pocket Money Planner",
    description: "Plan how to save and spend your allowance!",
    icon: PiggyBank,
    gradient: "from-pink-400 to-rose-500",
    bgGradient: "from-pink-50 to-rose-50",
    emoji: "🐷",
    difficulty: "Easy",
    duration: "20 mins",
    simulator: "money-skills" as SimulatorType,
  },
  {
    id: 4,
    title: "Train a Rule-Based AI",
    description: "Create simple rules to make AI decisions!",
    icon: Cpu,
    gradient: "from-violet-500 to-indigo-600",
    bgGradient: "from-violet-50 to-indigo-50",
    emoji: "🧠",
    difficulty: "Hard",
    duration: "60 mins",
    simulator: "ai-literacy" as SimulatorType,
  },
];

const MiniProjectsCarousel = ({ onSelectProject }: MiniProjectsCarouselProps) => {
  const [activeSimulator, setActiveSimulator] = useState<SimulatorType>(null);

  const handleProjectClick = (simulatorId: SimulatorType) => {
    setActiveSimulator(simulatorId);
  };

  const handleCloseVoiceTutor = () => {
    setActiveSimulator(null);
  };

  return (
    <>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {projects.map((project) => (
            <CarouselItem key={project.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
              <Card className={`h-full border-2 border-transparent hover:border-primary/30 transition-all duration-300 hover:shadow-lg bg-gradient-to-br ${project.bgGradient}`}>
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center shadow-md`}>
                      <project.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl">{project.emoji}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-bold text-foreground">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className={`px-2 py-1 rounded-full bg-gradient-to-r ${project.gradient} text-white font-medium`}>
                      {project.difficulty}
                    </span>
                    <span className="px-2 py-1 rounded-full bg-muted text-muted-foreground">
                      ⏱️ {project.duration}
                    </span>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full mt-2 hover:bg-white/50 gap-2"
                    onClick={() => handleProjectClick(project.simulator)}
                  >
                    <Mic className="w-4 h-4" />
                    Start Project 🚀
                  </Button>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-4" />
        <CarouselNext className="hidden md:flex -right-4" />
      </Carousel>

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

export default MiniProjectsCarousel;
