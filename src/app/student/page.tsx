import { Metadata } from 'next';
import StudentDashboardClient from './StudentDashboardClient';

export const metadata: Metadata = {
    title: "Student Dashboard - SkillPreneurZ",
    description: "Track your learning progress, manage courses, and view achievements.",
    robots: "noindex, nofollow", // Dashboards should generally not be indexed
};

export default function StudentDashboardPage() {
    return <StudentDashboardClient />;
}
