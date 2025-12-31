"use client";

import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import SelfCourseSidebar from "@/components/self-course/SelfCourseSidebar";
import ChildMode from "@/components/self-course/ChildMode";
import ParentMode from "@/components/self-course/ParentMode";

const SelfCourseClient = () => {
    const [mode, setMode] = useState<"child" | "parent">("child");

    return (
        <SidebarProvider>
            <div className="min-h-screen flex w-full bg-gradient-to-br from-sky-50 via-violet-50 to-amber-50">
                <SelfCourseSidebar mode={mode} onModeChange={setMode} />
                <main className="flex-1 overflow-auto">
                    {mode === "child" ? <ChildMode /> : <ParentMode />}
                </main>
            </div>
        </SidebarProvider>
    );
};

export default SelfCourseClient;
