"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, Clock } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import JoinDialog from '@/components/JoinDialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Define specialized type locally or import if available. Since it's from blog-data which is just an array, we can infer or define interface.
interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    content: string; // Assuming content field exists based on usage placeholders
    author: string;
    date: string;
    readTime: string;
    category: string;
    featured?: boolean;
}

interface BlogPostClientProps {
    post: BlogPost;
}

const BlogPostClient = ({ post }: BlogPostClientProps) => {
    const [joinDialogOpen, setJoinDialogOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col">
            <Navigation onJoinClick={() => setJoinDialogOpen(true)} />

            <main className="flex-1 pt-20">
                <div className="container mx-auto px-4 py-12 max-w-4xl">
                    <Link href="/blog">
                        <Button variant="ghost" className="mb-6">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Blog
                        </Button>
                    </Link>

                    <article>
                        <Badge className="mb-4 bg-accent/10 text-accent">{post.category}</Badge>
                        <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap gap-6 text-muted-foreground mb-8 pb-8 border-b border-border">
                            <span className="flex items-center gap-2">
                                <User className="h-4 w-4" /> {post.author}
                            </span>
                            <span className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" /> {new Date(post.date).toLocaleDateString('en-IN', { dateStyle: 'long' })}
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock className="h-4 w-4" /> {post.readTime}
                            </span>
                        </div>

                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <p className="lead text-xl text-muted-foreground mb-8">
                                {post.excerpt}
                            </p>
                            <div className="bg-muted p-6 rounded-lg mb-8">
                                <p className="italic text-muted-foreground text-center">
                                    [Full blog post content would go here. This is a placeholder.]
                                    {/* Ideally render post.content here */}
                                </p>
                            </div>
                        </div>
                    </article>

                    <div className="mt-12 pt-8 border-t border-border text-center">
                        <h3 className="text-2xl font-bold mb-4">Enjoyed this article?</h3>
                        <p className="text-muted-foreground mb-6">
                            Share it with other parents and educators who might find it useful.
                        </p>
                        <Button size="lg" onClick={() => setJoinDialogOpen(true)}>
                            Subscribe for More Updates
                        </Button>
                    </div>
                </div>
            </main>

            <Footer />
            <JoinDialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen} />
        </div>
    );
};

export default BlogPostClient;
