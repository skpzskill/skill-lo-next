const BASE_URL = 'https://www.skillpreneurz.com';

// Organization Schema
export const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "SkillPreneurZ",
    "alternateName": "SkillPreneurZ India",
    "description": "SkillPreneurZ is India's leading educational platform dedicated to building the future mindset in children and young adults through entrepreneurship, design thinking, financial literacy, and AI skills training.",
    "url": BASE_URL,
    "logo": `${BASE_URL}/favicon.png`,
    "image": `${BASE_URL}/og-image.png`,
    "foundingDate": "2023",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN",
      "addressRegion": "India"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "email": "contact@skillpreneurz.com",
      "areaServed": "IN",
      "availableLanguage": ["English", "Hindi"]
    },
    "sameAs": [
      "https://www.linkedin.com/company/skillpreneurz",
      "https://twitter.com/SkillPreneurZ",
      "https://www.instagram.com/skillpreneurz"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "SkillPreneurZ Courses",
      "itemListElement": [
        {
          "@type": "Course",
          "name": "Design Thinking for Young Minds",
          "description": "Learn creative problem-solving and innovation skills"
        },
        {
          "@type": "Course",
          "name": "Financial Literacy Fundamentals",
          "description": "Master money management and financial planning"
        },
        {
          "@type": "Course",
          "name": "Entrepreneurship & Startup Skills",
          "description": "Build business acumen and entrepreneurial mindset"
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

// Course Schema
interface CourseSchemaProps {
  name: string;
  description: string;
  duration?: string;
  courseCode?: string;
  educationalLevel?: string;
}

export const CourseSchema = ({ name, description, duration, courseCode, educationalLevel }: CourseSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": name,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": "SkillPreneurZ",
      "url": BASE_URL
    },
    ...(duration && { "timeRequired": duration }),
    ...(courseCode && { "courseCode": courseCode }),
    ...(educationalLevel && { "educationalLevel": educationalLevel }),
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": ["online", "blended"],
      "instructor": {
        "@type": "Person",
        "name": "SkillPreneurZ Faculty"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

// Article Schema
interface ArticleSchemaProps {
  headline: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
  mainEntityOfPage?: string;
}

export const ArticleSchema = ({ headline, description, author, datePublished, dateModified, image, url }: ArticleSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": headline,
    "description": description,
    "author": {
      "@type": "Person",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "SkillPreneurZ",
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/favicon.png`
      }
    },
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "image": image || `${BASE_URL}/og-image.png`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

// Breadcrumb Schema
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export const BreadcrumbSchema = ({ items }: BreadcrumbSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

// FAQ Schema
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

export const FAQSchema = ({ faqs }: FAQSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

// WebSite Schema with SearchAction
export const WebSiteSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "SkillPreneurZ",
    "url": BASE_URL,
    "description": "Building the Future Mindset through entrepreneurship, design thinking, and financial literacy education",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${BASE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
