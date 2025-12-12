import { Metadata } from 'next';
import SchoolDashboardClient from './SchoolDashboardClient';

export const metadata: Metadata = {
    title: "School & Parent Portal - SkillPreneurZ",
    description: "Manage students, view reports, and track program progress.",
    robots: "noindex, nofollow",
};

export default function SchoolDashboard() {
    return <SchoolDashboardClient />;
}
