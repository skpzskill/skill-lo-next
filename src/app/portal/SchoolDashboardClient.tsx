"use client";

import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SchoolSidebar from "@/components/dashboard/SchoolSidebar";
import SchoolOverview from "@/components/dashboard/school/SchoolOverview";
import SchoolStudents from "@/components/dashboard/school/SchoolStudents";
import SchoolPrograms from "@/components/dashboard/school/SchoolPrograms";
import SchoolReports from "@/components/dashboard/school/SchoolReports";
import SchoolBilling from "@/components/dashboard/school/SchoolBilling";
import SchoolSettings from "@/components/dashboard/school/SchoolSettings";

const SchoolDashboardClient = () => {
    const [activeSection, setActiveSection] = useState("overview");

    const renderContent = () => {
        switch (activeSection) {
            case "overview":
                return <SchoolOverview />;
            case "students":
                return <SchoolStudents />;
            case "programs":
                return <SchoolPrograms />;
            case "reports":
                return <SchoolReports />;
            case "billing":
                return <SchoolBilling />;
            case "settings":
                return <SchoolSettings />;
            default:
                return <SchoolOverview />;
        }
    };

    return (
        <SidebarProvider>
            <div className="min-h-screen flex w-full bg-background">
                <SchoolSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
                <main className="flex-1 flex flex-col">
                    <header className="h-14 border-b border-border flex items-center px-4 bg-card">
                        <SidebarTrigger className="mr-4" />
                        <h1 className="text-lg font-semibold text-foreground">School & Parent Portal</h1>
                    </header>
                    <div className="flex-1 p-6 overflow-auto">
                        {renderContent()}
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
};

export default SchoolDashboardClient;
