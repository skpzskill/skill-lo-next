"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Clock, Users, Award, CheckCircle, ArrowRight, Star, Sparkles, PenTool } from 'lucide-react';
import Navigation from '@/components/Navigation';
import JoinDialog from '@/components/JoinDialog';
import Breadcrumb from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { courses, testimonials, faqs } from '@/lib/courses-data';
import RoadmapView from './RoadmapView';

const ProgramsClient = () => {
    const [joinDialogOpen, setJoinDialogOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<string>("entrepreneurship");

    const programs = [
        { id: 'entrepreneurship', label: 'Entrepreneurship' },
        { id: 'design-thinking', label: 'Design Thinking' },
        { id: 'financial-literacy', label: 'Financial Literacy' },
        { id: 'ai-skills', label: 'AI Skills' },
    ];

    // Get current active course data
    const activeData = courses.find(c => c.id === activeTab) || courses[0];

    return (
        <>
            <div className="min-h-screen flex flex-col bg-background">
                <Navigation onJoinClick={() => setJoinDialogOpen(true)} />

                <main className="flex-1 pt-24 pb-16">
                    <div className="container mx-auto px-4">
                        <Breadcrumb items={[{ name: 'Programs', url: '/program' }]} />

                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Next Gen Skills</span> for <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Young Minds</span>
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                Explore the journey for each of our flagship programs.
                            </p>
                        </div>

                        {/* Custom Tabs */}
                        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
                            {programs.map((prog) => (
                                <button
                                    key={prog.id}
                                    onClick={() => setActiveTab(prog.id)}
                                    className={`
                                        px-6 py-3 rounded-full text-sm md:text-base font-semibold transition-all duration-200
                                        ${activeTab === prog.id
                                            ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                                            : 'bg-muted text-muted-foreground hover:bg-muted/80'}
                                    `}
                                >
                                    {prog.label}
                                </button>
                            ))}
                        </div>

                        {/* Active Program Header */}
                        <div className="max-w-6xl mx-auto text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-3xl font-bold mb-12">{activeData.title}</h2>

                            {/* Roadmap Visualization - Moved Here */}
                            <div className="mb-12">
                                <RoadmapView items={activeData.curriculum} />
                            </div>

                            <div className="max-w-4xl mx-auto">
                                <p className="text-lg text-muted-foreground mb-8">
                                    {activeData.description}
                                </p>

                                <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm font-medium">
                                    <span className="flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-lg">
                                        <Sparkles className="w-4 h-4" /> Fun Learnings
                                    </span>
                                    <span className="flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-lg">
                                        <PenTool className="w-4 h-4" /> Real Workshops
                                    </span>
                                    <span className="flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-lg">
                                        <Award className="w-4 h-4" /> Certificate Included
                                    </span>
                                </div>

                                <div className="flex justify-center gap-4">
                                    <Button size="lg" onClick={() => setJoinDialogOpen(true)} className="shadow-xl shadow-primary/20">
                                        Book Free Trial
                                    </Button>
                                    <Button size="lg" variant="outline" asChild>
                                        <Link href={`/program/${activeData.id}`}>
                                            Learn More <ArrowRight className="ml-2 w-4 h-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Testimonials (Keep existing) */}
                    <section className="py-20 bg-muted/50">
                        <div className="container">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold mb-4">What Parents Say</h2>
                            </div>
                            <div className="grid md:grid-cols-3 gap-8">
                                {testimonials.map((testimonial, index) => (
                                    <Card key={index} className="border-0 shadow-lg bg-background">
                                        <CardContent className="p-6">
                                            <div className="flex gap-1 mb-4">
                                                {Array.from({ length: testimonial.rating }).map((_, i) => (
                                                    <Star key={i} className="h-5 w-5 text-accent fill-accent" />
                                                ))}
                                            </div>
                                            <blockquote className="text-muted-foreground mb-4 italic">
                                                "{testimonial.quote}"
                                            </blockquote>
                                            <div>
                                                <p className="font-bold text-foreground">{testimonial.author}</p>
                                                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>

                </main>

                <JoinDialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen} />
            </div>
        </>
    );
};

export default ProgramsClient;

