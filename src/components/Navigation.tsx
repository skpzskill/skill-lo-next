import { Button } from "@/components/ui/button";
import { Menu, GraduationCap, Building, Sparkles } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


interface NavigationProps {
  onJoinClick?: () => void;
}

const Navigation = ({ onJoinClick }: NavigationProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              SkillPreneurZ
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#programs" className="text-foreground hover:text-primary transition-colors">
              Programs
            </a>
            <a href="#mission" className="text-foreground hover:text-primary transition-colors">
              Mission
            </a>
            <Link href="/self-course" className="text-foreground hover:text-primary transition-colors flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-accent" />
              AI Skill Builder
            </Link>

            {/* Portal Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Portals
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/student" className="flex items-center gap-2 cursor-pointer">
                    <GraduationCap className="w-4 h-4" />
                    Student Portal
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/portal" className="flex items-center gap-2 cursor-pointer">
                    <Building className="w-4 h-4" />
                    School/Parent Portal
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="heroPrimary" size="sm" onClick={onJoinClick}>
              Book a Free Trial
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="md:hidden p-2 hover:bg-accent/10 rounded-lg transition-colors">
                <Menu className="w-6 h-6 text-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <a href="#about">About</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="#programs">Programs</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="#mission">Mission</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/self-course" className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  AI Skill Builder
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/student" className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Student Portal
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/portal" className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  School/Parent Portal
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
