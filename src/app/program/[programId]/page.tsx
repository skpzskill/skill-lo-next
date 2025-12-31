import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProgramDetailClient from './ProgramDetailClient';
import { programsData } from '@/lib/courses-data';
import { CourseSchema, BreadcrumbSchema } from '@/components/StructuredData';

interface PageProps {
    params: Promise<{ programId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { programId } = await params;
    const program = programsData[programId as keyof typeof programsData];

    if (!program) {
        return {
            title: 'Program Not Found',
        };
    }

    return {
        title: `${program.title} Program - SkillPreneurZ`,
        description: program.description,
        alternates: {
            canonical: `https://www.skillpreneurz.com/program/${program.id}`,
        },
        keywords: `${program.title}, ${program.skills.join(', ')}, SkillPreneurZ courses`,
        openGraph: {
            title: `${program.title} Program - SkillPreneurZ`,
            description: program.description,
            type: 'website',
        }
    };
}

export default async function ProgramDetailPage({ params }: PageProps) {
    const { programId } = await params;
    const program = programsData[programId as keyof typeof programsData];

    if (!program) {
        notFound();
    }

    // Schema Data
    const breadcrumbItems = [
        { name: 'Home', url: 'https://www.skillpreneurz.com' },
        { name: 'Programs', url: 'https://www.skillpreneurz.com/courses' },
        { name: program.title, url: `https://www.skillpreneurz.com/program/${program.id}` }
    ];

    return (
        <>
            <CourseSchema
                name={program.title}
                description={program.description}
                duration={program.duration}
                courseCode={program.id.toUpperCase()}
                educationalLevel="Beginner to Intermediate"
            />
            <BreadcrumbSchema items={breadcrumbItems} />

            <ProgramDetailClient programId={programId} />
        </>
    );
}

export async function generateStaticParams() {
    return Object.keys(programsData).map((programId) => ({
        programId,
    }));
}
