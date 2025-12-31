import { Book, Lightbulb, Trophy, TrendingUp } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Book,
      title: "Entrepreneurial Learning",
      description: "Comprehensive curriculum designed to develop business acumen and startup skills from day one.",
    },
    {
      icon: Lightbulb,
      title: "Creative Innovation",
      description: "Foster creative thinking and innovation through hands-on projects and real-world challenges.",
    },
    {
      icon: Trophy,
      title: "Future-Ready Skills",
      description: "Master the skills that matter in tomorrow's economy — from tech to leadership to adaptability.",
    },
    {
      icon: TrendingUp,
      title: "Growth Mindset",
      description: "Cultivate resilience, continuous learning, and the ability to thrive in dynamic environments.",
    },
  ];

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              What Sets Us Apart
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Experience a transformative approach to learning that prepares you for the challenges and opportunities of tomorrow.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex gap-4 p-5 rounded-xl bg-card border border-border hover:shadow-md transition-all group"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
