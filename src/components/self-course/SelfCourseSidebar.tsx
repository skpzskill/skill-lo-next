import { Baby, Users, Home, Sparkles, PanelLeft } from "lucide-react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

interface SelfCourseSidebarProps {
  mode: "child" | "parent";
  onModeChange: (mode: "child" | "parent") => void;
}

const SelfCourseSidebar = ({ mode, onModeChange }: SelfCourseSidebarProps) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border bg-gradient-to-b from-violet-100 to-sky-100">
      <SidebarHeader className="p-4 border-b border-sidebar-border/50 flex flex-row items-center justify-between">
        {!isCollapsed && (
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center shadow-md shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="overflow-hidden">
              <span className="font-bold text-base bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent whitespace-nowrap">
                AI Skill Builder
              </span>
            </div>
          </Link>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center shadow-md mx-auto">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
        )}
        <SidebarTrigger className="ml-auto" />
      </SidebarHeader>

      <SidebarContent className="p-4">
        <div className="space-y-2">
          {!isCollapsed && (
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3 animate-in fade-in duration-300">
              Switch Mode
            </p>
          )}

          <Button
            variant={mode === "child" ? "default" : "outline"}
            className={`w-full justify-start gap-3 h-12 ${mode === "child"
              ? "bg-gradient-to-r from-orange-400 to-pink-500 text-white border-0 shadow-lg"
              : "hover:bg-orange-50"
              } ${isCollapsed ? 'px-0 justify-center' : ''}`}
            onClick={() => onModeChange("child")}
            title="Child Mode"
          >
            <Baby className="w-5 h-5 shrink-0" />
            {!isCollapsed && (
              <div className="text-left overflow-hidden">
                <p className="font-semibold truncate">Child Mode</p>
                <p className="text-xs opacity-80 truncate">Fun & Interactive</p>
              </div>
            )}
          </Button>

          <Button
            variant={mode === "parent" ? "default" : "outline"}
            className={`w-full justify-start gap-3 h-12 ${mode === "parent"
              ? "bg-gradient-to-r from-blue-500 to-violet-600 text-white border-0 shadow-lg"
              : "hover:bg-blue-50"
              } ${isCollapsed ? 'px-0 justify-center' : ''}`}
            onClick={() => onModeChange("parent")}
            title="Parent Mode"
          >
            <Users className="w-5 h-5 shrink-0" />
            {!isCollapsed && (
              <div className="text-left overflow-hidden">
                <p className="font-semibold truncate">Parent Mode</p>
                <p className="text-xs opacity-80 truncate">Analytics & Reports</p>
              </div>
            )}
          </Button>
        </div>
      </SidebarContent>

      <SidebarFooter className="p-3 border-t border-sidebar-border/50">
        <Link href="/student">
          <Button variant="default" size="sm" className={`w-full justify-center gap-2 bg-gradient-to-r from-violet-500 to-pink-500 text-white hover:from-violet-600 hover:to-pink-600 ${isCollapsed ? 'px-0' : ''}`} title="Dashboard">
            <Home className="w-3.5 h-3.5 shrink-0" />
            {!isCollapsed && <span>Dashboard</span>}
          </Button>
        </Link>
        <Link href="/">
          <Button variant="ghost" size="sm" className={`w-full justify-center gap-2 text-muted-foreground hover:text-foreground text-xs h-8 ${isCollapsed ? 'px-0' : ''}`} title="Back to Home">
            {!isCollapsed && <span>Back to Home</span>}
            {isCollapsed && <PanelLeft className="w-3 h-3" />}
          </Button>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SelfCourseSidebar;

