import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

import { cn } from "@/lib/utils";

interface CTAProps {
  onJoinClick?: () => void;
  className?: string;
}

const CTA = ({ onJoinClick, className }: CTAProps) => {
  return (
    <section id="contact" className={cn("py-16 bg-gradient-to-br from-primary via-primary to-accent/20 relative overflow-hidden", className)}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
            Ready to Shape Your Future?
          </h2>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            Join SkillPreneurZ and start your journey to becoming a future-ready innovator who can adapt, lead, and create in tomorrow's world.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button size="lg" variant="hero" className="group bg-accent text-accent-foreground hover:bg-accent/90" onClick={onJoinClick}>
              Book a Free Trial
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20" onClick={onJoinClick}>
              <Mail className="w-4 h-4" />
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
