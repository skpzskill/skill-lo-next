import { Metadata } from 'next';
import AboutClient from './AboutClient';
import { OrganizationSchema, FAQSchema } from '@/components/StructuredData';
import { faqs } from '@/lib/about-data';

export const metadata: Metadata = {
    title: "About Us - Our Mission to Build Future Entrepreneurs",
    description: "Learn about SkillPreneurZ's mission to transform education in India through entrepreneurship, design thinking, and financial literacy programs for young minds.",
    alternates: {
        canonical: "https://www.skillpreneurz.com/about"
    },
    keywords: "SkillPreneurZ about, education mission India, entrepreneurship education company, future skills organization"
};

const About = () => {
    return (
        <>
            <OrganizationSchema />
            <FAQSchema faqs={faqs} />
            <AboutClient />
        </>
    );
};

export default About;
