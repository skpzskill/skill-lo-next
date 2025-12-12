import { Badge } from "@/components/ui/badge";

const About = () => {
  return (
    <section id="about" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-3">
              About Us
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Building Tomorrow's Changemakers
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              More than education — it's a movement to empower the next generation of innovators.
            </p>
          </div>

          {/* Our Story */}
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <h3 className="text-xl font-bold text-center mb-4 text-foreground">
              Our Story
            </h3>
            <p className="text-base text-foreground leading-relaxed text-center max-w-4xl mx-auto">
              SkillPreneurZ was born from a simple belief: children are natural entrepreneurs. They ask "why?" constantly, they create, they innovate. We saw a gap in traditional education — too much theory, not enough real-world application. So we built SkillPreneurZ to bridge that gap, teaching kids the mindset and skills they need to thrive in tomorrow's economy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;