import { Metadata } from 'next';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
    title: "Blog - Insights on Future Skills Education",
    description: "Read expert articles on entrepreneurship education, design thinking, financial literacy, and preparing children for the future. Tips for parents and educators.",
    alternates: {
        canonical: "https://www.skillpreneurz.com/blog"
    },
    keywords: "education blog, parenting tips, entrepreneurship for kids, design thinking articles, financial literacy children"
};

const Blog = () => {
    return <BlogClient />;
};

export default Blog;
