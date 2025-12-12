import { useState } from "react";
import { Target, Users, Rocket, CheckCircle2, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Mission = () => {
  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null);

  const pillars = [
    {
      icon: Rocket,
      title: "Startup Thinking",
      description: "Learn to think like founders — identifying opportunities, solving problems, and building solutions from the ground up.",
      benefits: [
        "Problem identification skills",
        "Opportunity recognition",
        "MVP development mindset"
      ],
      color: "primary"
    },
    {
      icon: Star,
      title: "Innovation Mindset",
      description: "Develop creative problem-solving abilities and learn to innovate across industries and disciplines.",
      benefits: [
        "Creative thinking",
        "Cross-industry insights",
        "Adaptive learning"
      ],
      color: "accent"
    },
    {
      icon: Users,
      title: "Real-World Creation",
      description: "Bridge the gap between education and execution by building actual projects and bringing ideas to life.",
      benefits: [
        "Project execution",
        "Collaborative building",
        "Launch experience"
      ],
      color: "primary"
    }
  ];

  return (
    <section id="mission" className="py-16 bg-secondary/20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Mission Statement */}
          <div className="text-center mb-12 space-y-4">
            <Badge variant="outline" className="mb-2">
              Our Mission
            </Badge>
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent/80 mb-6 shadow-lg hover:scale-110 transition-transform">
              <Target className="w-7 h-7 text-primary-foreground" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Shaping Tomorrow's Leaders
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              To build <span className="text-accent font-semibold">future-ready innovators</span> who can adapt, lead, and thrive in a dynamic, tech-powered world.
            </p>
            
            {/* Mission Highlights */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {["Hands-on Learning", "Real Projects", "Expert Mentorship", "Global Community"].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border hover:border-primary/50 transition-all hover:shadow-md"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Key Pillars */}
          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredPillar(index)}
                onMouseLeave={() => setHoveredPillar(null)}
                className="group relative p-8 rounded-2xl bg-card border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-${pillar.color}/10 flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-accent/80 transition-all duration-300 group-hover:scale-110`}>
                  <pillar.icon className={`w-7 h-7 text-${pillar.color} group-hover:text-primary-foreground transition-colors`} />
                </div>

                {/* Number Badge */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center text-sm font-bold text-foreground">
                  {index + 1}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 text-foreground">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {pillar.description}
                </p>

                {/* Benefits (shown on hover) */}
                <div
                  className={`space-y-2 transition-all duration-300 ${
                    hoveredPillar === index
                      ? "opacity-100 max-h-40"
                      : "opacity-0 max-h-0 overflow-hidden"
                  }`}
                >
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wide mb-2">
                      Key Benefits:
                    </p>
                    {pillar.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2 mb-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                        <span className="text-sm text-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Sparkles = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

export default Mission;
