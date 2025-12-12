"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import JoinDialog from '@/components/JoinDialog';
import Breadcrumb from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { blogPosts } from '@/lib/blog-data';

const BlogClient = () => {
    const [joinDialogOpen, setJoinDialogOpen] = useState(false);
    const featuredPosts = blogPosts.filter(post => post.featured);
    const regularPosts = blogPosts.filter(post => !post.featured);

    return (
        <div className="min-h-screen flex flex-col">
            <Navigation onJoinClick={() => setJoinDialogOpen(true)} />

            <main className="flex-1 pt-20">
                <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
                    <div className="container">
                        <Breadcrumb items={[{ name: 'Blog', url: '/blog' }]} />
                        <div className="max-w-4xl mx-auto text-center">
                            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                                Insights & <span className="text-primary">Resources</span>
                            </h1>
                            <p className="text-xl text-muted-foreground">
                                Expert articles on building future-ready skills in children
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-16">
                    <div className="container">
                        <h2 className="text-2xl font-bold mb-8">Featured Articles</h2>
                        <div className="grid md:grid-cols-2 gap-8 mb-16">
                            {featuredPosts.map((post) => (
                                <Card key={post.slug} className="border-0 shadow-lg overflow-hidden">
                                    <div className="h-48 bg-gradient-to-br from-primary to-primary/70" />
                                    <CardContent className="p-6">
                                        <Badge className="mb-3 bg-accent/10 text-accent">{post.category}</Badge>
                                        <h3 className="text-xl font-bold text-foreground mb-3">
                                            <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                                                {post.title}
                                            </Link>
                                        </h3>
                                        <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                                            <div className="flex items-center gap-4">
                                                <span className="flex items-center gap-1"><User className="h-4 w-4" /> {post.author}</span>
                                                <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {post.readTime}</span>
                                            </div>
                                            <Link href={`/blog/${post.slug}`} className="text-primary hover:underline flex items-center gap-1">
                                                Read <ArrowRight className="h-4 w-4" />
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <h2 className="text-2xl font-bold mb-8">All Articles</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {regularPosts.map((post) => (
                                <Card key={post.slug} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                                    <CardContent className="p-6">
                                        <Badge variant="outline" className="mb-3">{post.category}</Badge>
                                        <h3 className="font-bold text-foreground mb-2">
                                            <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                                                {post.title}
                                            </Link>
                                        </h3>
                                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                                        <div className="text-xs text-muted-foreground flex items-center gap-2">
                                            <Calendar className="h-3 w-3" /> {new Date(post.date).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
            <JoinDialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen} />
        </div>
    );
};

export default BlogClient;
