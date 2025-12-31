import { Metadata } from 'next';
import SelfCourseClient from './SelfCourseClient';

export const metadata: Metadata = {
    title: "AI Skill Builder - Self Paced Learning",
    description: "Self-paced AI learning platform for students and parents.",
    robots: "noindex, nofollow",
};

export default function SelfCourseAI() {
    return <SelfCourseClient />;
}
