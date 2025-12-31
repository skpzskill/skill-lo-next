import { Lightbulb, Rocket, TrendingUp, Brain, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Programs = () => {
  const programs = [
    {
      id: "design-thinking",
      icon: Lightbulb,
      title: "Design Thinking",
      description: "Learn creative problem-solving and innovation through design thinking methodology. Kids discover how to identify problems, empathize with users, ideate solutions, and prototype ideas.",
      skills: ["Creative thinking", "Problem solving", "Innovation", "Prototyping"],
      duration: "25 weeks",
      pricing: {
        enterprise: "₹15,000",
        parents: "₹12,000"
      }
    },
    {
      id: "financial-literacy",
      icon: TrendingUp,
      title: "Financial Literacy",
      description: "Understand money management, budgeting, saving, and basic economics through interactive games and real-world activities. Build essential financial skills for life.",
      skills: ["Money management", "Budgeting", "Saving", "Basic economics"],
      duration: "25 weeks",
      pricing: {
        enterprise: "₹15,000",
        parents: "₹12,000"
      }
    },
    {
      id: "entrepreneurship",
      icon: Rocket,
      title: "Entrepreneurship",
      description: "Build your first mini-business from idea to launch! Learn business planning, product development, marketing, and pitching. Turn creative ideas into real ventures.",
      skills: ["Business planning", "Product development", "Marketing", "Pitching"],
      duration: "25 weeks",
      pricing: {
        enterprise: "₹18,000",
        parents: "₹15,000"
      }
    },
    {
      id: "ai-skills",
      icon: Brain,
      title: "AI Skills",
      description: "Explore artificial intelligence and machine learning concepts through hands-on projects. Learn how AI works, build simple AI applications, and understand how to use AI tools responsibly and creatively.",
      skills: ["AI fundamentals", "Machine learning basics", "AI tools", "Ethical AI"],
      duration: "25 weeks",
      pricing: {
        enterprise: "₹18,000",
        parents: "₹15,000"
      }
    }
  ];

  return (
    <section id="programs" className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4">
              Our Programs
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="text-primary">Next Gen</span>{" "}
              <span className="text-accent">Skills</span>{" "}
              <span className="text-foreground">for</span>{" "}
              <span className="text-primary">Young</span>{" "}
              <span className="text-accent">Minds</span>
            </h2>
            <p className="text-base text-muted-foreground max-w-3xl mx-auto">
              Building tomorrow's innovators today. Our programs teach essential startup and entrepreneurial skills through engaging, age-appropriate activities.
            </p>
          </div>

          {/* Programs Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program, index) => (
              <div
                key={index}
                className="group p-6 rounded-xl bg-card border border-border hover:shadow-lg hover:border-primary/50 transition-all duration-300"
              >
                {/* Icon */}
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <program.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 text-foreground">
                  {program.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {program.description}
                </p>

                {/* Skills */}
                <div className="space-y-3 mb-4">
                  <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wide">
                    Key Skills:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {program.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Duration & Enrollment */}
                <div className="space-y-2 mb-4 pb-4 border-b border-border">
                  <p className="text-sm font-semibold text-foreground">
                    Duration: <span className="font-normal text-muted-foreground">{program.duration}</span>
                  </p>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-foreground">Available For:</p>
                    <p className="text-sm text-muted-foreground">✓ Schools & Institutions</p>
                    <p className="text-sm text-muted-foreground">✓ Individual Enrollment</p>
                  </div>
                </div>

                {/* Learn More Button */}
                <Link href={`/program/${program.id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group/btn hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              All programs are designed to be fun, interactive, and practical for young learners.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;