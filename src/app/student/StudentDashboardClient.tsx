"use client";

import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import StudentSidebar from "@/components/dashboard/StudentSidebar";
import StudentOverview from "@/components/dashboard/student/StudentOverview";
import StudentCourses from "@/components/dashboard/student/StudentCourses";
import StudentProgress from "@/components/dashboard/student/StudentProgress";
import StudentAchievements from "@/components/dashboard/student/StudentAchievements";
import StudentSchedule from "@/components/dashboard/student/StudentSchedule";
import StudentSettings from "@/components/dashboard/student/StudentSettings";

const StudentDashboardClient = () => {
    const [activeSection, setActiveSection] = useState("overview");

    const renderContent = () => {
        switch (activeSection) {
            case "overview":
                return <StudentOverview />;
            case "courses":
                return <StudentCourses />;
            case "progress":
                return <StudentProgress />;
            case "achievements":
                return <StudentAchievements />;
            case "schedule":
                return <StudentSchedule />;
            case "settings":
                return <StudentSettings />;
            default:
                return <StudentOverview />;
        }
    };

    return (
        <SidebarProvider>
            <div className="min-h-screen flex w-full bg-background">
                <StudentSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
                <main className="flex-1 flex flex-col">
                    <header className="h-14 border-b border-border flex items-center px-4 bg-card">
                        <SidebarTrigger className="mr-4" />
                        <h1 className="text-lg font-semibold text-foreground">Student Portal</h1>
                    </header>
                    <div className="flex-1 p-6 overflow-auto">
                        {renderContent()}
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
};

export default StudentDashboardClient;
