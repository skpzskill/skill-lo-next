import { Metadata } from 'next';
import CoursesClient from './CoursesClient';
import { CourseSchema, FAQSchema } from '@/components/StructuredData';
import { courses, faqs } from '@/lib/courses-data';

export const metadata: Metadata = {
    title: "Courses - Design Thinking, Financial Literacy & Entrepreneurship",
    description: "Explore SkillPreneurZ's comprehensive 25-week courses in Design Thinking, Financial Literacy, and Entrepreneurship for young minds aged 8-18.",
    alternates: {
        canonical: "https://www.skillpreneurz.com/courses"
    },
    keywords: "design thinking course, financial literacy for kids, entrepreneurship program, future skills India, youth education courses"
};

const Courses = () => {
    return (
        <>
            {courses.map(course => (
                <CourseSchema
                    key={course.id}
                    name={course.title}
                    description={course.description}
                    duration={course.duration}
                    courseCode={course.id.toUpperCase()}
                    educationalLevel="Beginner to Intermediate"
                />
            ))}
            <FAQSchema faqs={faqs} />
            <CoursesClient />
        </>
    );
};

export default Courses;
