import Link from "next/link";
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Youtube, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SkillPreneurZLogo from './SkillPreneurZLogo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background" role="contentinfo">
      {/* Newsletter Section */}
      <div className="border-b border-background/10">
        <div className="container py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Stay Updated with Future Skills Insights
            </h2>
            <p className="text-background/70 mb-6">
              Join 10,000+ parents and educators receiving weekly tips on building entrepreneurial mindsets in children.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
                aria-label="Email address for newsletter"
                required
              />
              <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Subscribe <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <SkillPreneurZLogo className="h-10 w-10" />
              <span className="text-xl font-bold">SkillPreneurZ</span>
            </div>
            <p className="text-background/70 leading-relaxed">
              Building the Future Mindset through innovative entrepreneurship education, design thinking, and financial literacy programs for young minds.
            </p>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com/company/skillpreneurz"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-background/10 hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/SkillPreneurZ"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-background/10 hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/skillpreneurz"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-background/10 hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com/@skillpreneurz"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-background/10 hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Subscribe to our YouTube channel"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-background/70 hover:text-accent transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="text-background/70 hover:text-accent transition-colors">
                    Our Courses
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-background/70 hover:text-accent transition-colors">
                    Blog & Resources
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-background/70 hover:text-accent transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/self-course" className="text-background/70 hover:text-accent transition-colors">
                    AI Skill Builder
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Our Programs</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/program/design-thinking" className="text-background/70 hover:text-accent transition-colors">
                  Design Thinking
                </Link>
              </li>
              <li>
                <Link href="/program/financial-literacy" className="text-background/70 hover:text-accent transition-colors">
                  Financial Literacy
                </Link>
              </li>
              <li>
                <Link href="/program/entrepreneurship" className="text-background/70 hover:text-accent transition-colors">
                  Entrepreneurship
                </Link>
              </li>
              <li>
                <Link href="/student" className="text-background/70 hover:text-accent transition-colors">
                  Student Portal
                </Link>
              </li>
              <li>
                <Link href="/portal" className="text-background/70 hover:text-accent transition-colors">
                  School/Parent Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <address className="not-italic space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                <span className="text-background/70">
                  SkillPreneurZ Education Pvt Ltd<br />
                  India
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent flex-shrink-0" />
                <a href="mailto:contact@skillpreneurz.com" className="text-background/70 hover:text-accent transition-colors">
                  contact@skillpreneurz.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent flex-shrink-0" />
                <a href="tel:+919876543210" className="text-background/70 hover:text-accent transition-colors">
                  +91 98765 43210
                </a>
              </div>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/60">
            <p>© {currentYear} SkillPreneurZ. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy-policy" className="hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-accent transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap.xml" className="hover:text-accent transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
