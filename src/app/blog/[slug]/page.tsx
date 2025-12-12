import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPostClient from './BlogPostClient';
import { blogPosts } from '@/lib/blog-data';
import { ArticleSchema, BreadcrumbSchema } from '@/components/StructuredData';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: `${post.title} - SkillPreneurZ Blog`,
        description: post.excerpt,
        alternates: {
            canonical: `https://www.skillpreneurz.com/blog/${post.slug}`,
        },
        keywords: `${post.category}, blog, SkillPreneurZ, education`,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.date,
            authors: [post.author],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
        }
    };
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    // Schema Data
    const breadcrumbItems = [
        { name: 'Home', url: 'https://www.skillpreneurz.com' },
        { name: 'Blog', url: 'https://www.skillpreneurz.com/blog' },
        { name: post.title, url: `https://www.skillpreneurz.com/blog/${post.slug}` }
    ];

    return (
        <>
            <ArticleSchema
                headline={post.title}
                description={post.excerpt}
                author={post.author}
                datePublished={post.date}
                url={`https://www.skillpreneurz.com/blog/${post.slug}`}
                image="https://www.skillpreneurz.com/og-image.png" // Fallback or distinct image if available
            />
            <BreadcrumbSchema items={breadcrumbItems} />

            <BlogPostClient post={post} />
        </>
    );
}
