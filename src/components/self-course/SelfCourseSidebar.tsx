import { Baby, Users, Home, Sparkles } from "lucide-react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

interface SelfCourseSidebarProps {
  mode: "child" | "parent";
  onModeChange: (mode: "child" | "parent") => void;
}

const SelfCourseSidebar = ({ mode, onModeChange }: SelfCourseSidebarProps) => {
  return (
    <Sidebar className="border-r border-sidebar-border bg-gradient-to-b from-violet-100 to-sky-100">
      <SidebarHeader className="p-4 border-b border-sidebar-border/50">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-bold text-lg bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
              AI Skill Builder
            </span>
            <p className="text-xs text-muted-foreground">Learn by doing ✨</p>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
            Switch Mode
          </p>

          <Button
            variant={mode === "child" ? "default" : "outline"}
            className={`w-full justify-start gap-3 h-12 ${mode === "child"
                ? "bg-gradient-to-r from-orange-400 to-pink-500 text-white border-0 shadow-lg"
                : "hover:bg-orange-50"
              }`}
            onClick={() => onModeChange("child")}
          >
            <Baby className="w-5 h-5" />
            <div className="text-left">
              <p className="font-semibold">Child Mode</p>
              <p className="text-xs opacity-80">Fun & Interactive</p>
            </div>
          </Button>

          <Button
            variant={mode === "parent" ? "default" : "outline"}
            className={`w-full justify-start gap-3 h-12 ${mode === "parent"
                ? "bg-gradient-to-r from-blue-500 to-violet-600 text-white border-0 shadow-lg"
                : "hover:bg-blue-50"
              }`}
            onClick={() => onModeChange("parent")}
          >
            <Users className="w-5 h-5" />
            <div className="text-left">
              <p className="font-semibold">Parent Mode</p>
              <p className="text-xs opacity-80">Analytics & Reports</p>
            </div>
          </Button>
        </div>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border/50">
        <Link href="/">
          <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground">
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Button>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SelfCourseSidebar;
