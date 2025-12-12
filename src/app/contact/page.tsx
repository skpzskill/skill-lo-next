import { Metadata } from 'next';
import ContactClient from './ContactClient';
import { OrganizationSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
    title: "Contact Us - Get in Touch with SkillPreneurZ",
    description: "Contact SkillPreneurZ for inquiries about our entrepreneurship, design thinking, and financial literacy programs. We're here to help parents, schools, and organizations.",
    alternates: {
        canonical: "https://www.skillpreneurz.com/contact"
    },
    keywords: "contact SkillPreneurZ, education inquiry India, school partnership, parent inquiry, future skills contact"
};

const Contact = () => {
    return (
        <>
            <OrganizationSchema />
            <ContactClient />
        </>
    );
};

export default Contact;
