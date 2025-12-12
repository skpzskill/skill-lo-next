import { Metadata } from 'next';
import AboutClient from './AboutClient';
import { OrganizationSchema, FAQSchema } from '@/components/StructuredData';
import { faqs } from '@/lib/about-data';

export const metadata: Metadata = {
    title: "About Us - Our Mission to Build Future Entrepreneurs",
    description: "Learn about SkillPreneurZ's mission to transform education globally through entrepreneurship, skill building, startup education, design thinking, and financial literacy programs for young minds.",
    alternates: {
        canonical: "https://www.skillpreneurz.com/about"
    },
    keywords: "SkillPreneurZ about, education mission, entrepreneurship education company, skill building organization, startup education platform"
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
