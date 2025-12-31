import { Metadata } from 'next';
import ContactClient from './ContactClient';
import { OrganizationSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
    title: "Contact Us - Get in Touch with SkillPreneurZ",
    description: "Contact SkillPreneurZ for inquiries about our entrepreneurship, design thinking, and financial literacy programs. We're here to help parents, schools, and organizations.",
    alternates: {
        canonical: "https://www.skillpreneurz.com/contact"
    },
    keywords: "contact SkillPreneurZ, education inquiry, school partnership, parent inquiry, startup education contact, skill building inquiry"
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
