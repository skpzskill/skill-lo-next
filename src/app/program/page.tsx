import { Metadata } from 'next';
import ProgramsClient from './ProgramsClient';

export const metadata: Metadata = {
    title: "Programs | SkillPreneurZ",
    description: "Explore SkillPreneurZ's comprehensive 25-week programs in Design Thinking, Financial Literacy, and Entrepreneurship for young minds aged 8-18.",
    alternates: {
        canonical: "https://www.skillpreneurz.com/program"
    },
    keywords: "design thinking course, financial literacy for kids, entrepreneurship program, future skills India, youth education programs"
};

export default function ProgramsPage() {
    return <ProgramsClient />;
}
