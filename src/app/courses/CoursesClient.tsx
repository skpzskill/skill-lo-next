"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Clock, Users, Award, CheckCircle, ArrowRight, Star } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import JoinDialog from '@/components/JoinDialog';
import Breadcrumb from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { courses, testimonials, faqs } from '@/lib/courses-data';

const CoursesClient = () => {
    const [joinDialogOpen, setJoinDialogOpen] = useState(false);

    return (
        <>
            <div className="min-h-screen flex flex-col">
                <Navigation onJoinClick={() => setJoinDialogOpen(true)} />

                <main className="flex-1 pt-20">
                    {/* Hero Section */}
                    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
                        <div className="container">
                            <Breadcrumb items={[{ name: 'Courses', url: '/courses' }]} />

                            <div className="max-w-4xl mx-auto text-center">
                                <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
                                    3 Comprehensive Programs
                                </Badge>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                                    Future-Ready Skills for <span className="text-primary">Young Minds</span>
                                </h1>
                                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                                    Our carefully crafted 25-week programs equip students with essential 21st-century skills
                                    through hands-on projects, expert mentorship, and real-world applications. Each course
                                    is designed to build confidence, creativity, and critical thinking.
                                </p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <Button size="lg" onClick={() => setJoinDialogOpen(true)}>
                                        Book a Free Trial
                                    </Button>
                                    <Button size="lg" variant="outline" asChild>
                                        <Link href="#courses">View All Courses</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Program Highlights */}
                    <section className="py-16 bg-primary text-primary-foreground">
                        <div className="container">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                                <div className="flex flex-col items-center">
                                    <Clock className="h-10 w-10 mb-3 text-accent" />
                                    <p className="text-2xl font-bold">25 Weeks</p>
                                    <p className="text-primary-foreground/80">Per Program</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Users className="h-10 w-10 mb-3 text-accent" />
                                    <p className="text-2xl font-bold">12 Students</p>
                                    <p className="text-primary-foreground/80">Max Batch Size</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Award className="h-10 w-10 mb-3 text-accent" />
                                    <p className="text-2xl font-bold">Certificate</p>
                                    <p className="text-primary-foreground/80">Upon Completion</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    {/* Using a generic icon or one from lucide directly since imported */}
                                    <Award className="h-10 w-10 mb-3 text-accent" /> {/* Reused Award or another appropriate icon like Lightbulb if imported */}
                                    <p className="text-2xl font-bold">Hands-On</p>
                                    <p className="text-primary-foreground/80">Project-Based</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Courses Grid */}
                    <section id="courses" className="py-20">
                        <div className="container">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                    Our Flagship Programs
                                </h2>
                                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                    Each program is designed with input from educators, entrepreneurs, and child development experts.
                                </p>
                            </div>

                            <div className="space-y-16">
                                {courses.map((course, index) => (
                                    <Card key={course.id} className="border-0 shadow-xl overflow-hidden">
                                        <div className={`grid lg:grid-cols-2 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                                            {/* Course Image/Icon Side */}
                                            <div className={`bg-gradient-to-br from-primary to-primary/80 p-12 flex items-center justify-center ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                                                <div className="text-center text-primary-foreground">
                                                    <course.icon className="h-24 w-24 mx-auto mb-6 text-accent" />
                                                    <h3 className="text-3xl font-bold mb-4">{course.title}</h3>
                                                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                                                        {course.skills.map((skill, i) => (
                                                            <Badge key={i} variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-0">
                                                                {skill}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                    <div className="flex justify-center gap-6 text-sm">
                                                        <span className="flex items-center gap-2">
                                                            <Clock className="h-4 w-4 text-accent" /> {course.duration}
                                                        </span>
                                                        <span className="flex items-center gap-2">
                                                            <Users className="h-4 w-4 text-accent" /> {course.ageGroup}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Course Details Side */}
                                            <CardContent className={`p-8 lg:p-12 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                                    {course.description}
                                                </p>

                                                <div className="mb-6">
                                                    <h4 className="font-bold text-foreground mb-3">What You'll Learn:</h4>
                                                    <div className="grid sm:grid-cols-2 gap-2">
                                                        {course.curriculum.slice(0, 6).map((item, i) => (
                                                            <div key={i} className="flex items-start gap-2">
                                                                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                                                                <span className="text-sm text-muted-foreground">{item}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="mb-8">
                                                    <h4 className="font-bold text-foreground mb-3">Learning Outcomes:</h4>
                                                    <ul className="space-y-2">
                                                        {course.outcomes.slice(0, 3).map((outcome, i) => (
                                                            <li key={i} className="flex items-start gap-2">
                                                                <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                                                <span className="text-sm text-muted-foreground">{outcome}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="flex flex-wrap gap-4">
                                                    <Button asChild>
                                                        <Link href={`/program/${course.id}`}>
                                                            Learn More <ArrowRight className="ml-2 h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="outline" onClick={() => setJoinDialogOpen(true)}>
                                                        Book Free Trial
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Testimonials */}
                    <section className="py-20 bg-muted">
                        <div className="container">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                    What Parents & Educators Say
                                </h2>
                                <p className="text-xl text-muted-foreground">
                                    Join thousands of satisfied families who trust SkillPreneurZ
                                </p>
                            </div>
                            <div className="grid md:grid-cols-3 gap-8">
                                {testimonials.map((testimonial, index) => (
                                    <Card key={index} className="border-0 shadow-lg">
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

                    {/* FAQ Section */}
                    <section className="py-20">
                        <div className="container">
                            <div className="max-w-3xl mx-auto">
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                        Frequently Asked Questions
                                    </h2>
                                </div>
                                <div className="space-y-6">
                                    {faqs.map((faq, index) => (
                                        <Card key={index} className="border-0 shadow-md">
                                            <CardContent className="p-6">
                                                <h3 className="font-bold text-foreground mb-2">{faq.question}</h3>
                                                <p className="text-muted-foreground">{faq.answer}</p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="py-20 bg-primary text-primary-foreground">
                        <div className="container text-center">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Start Your Child's Journey Today
                            </h2>
                            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                                Give your child the gift of future-ready skills. Book a free trial session and see the transformation begin.
                            </p>
                            <Button size="lg" variant="secondary" onClick={() => setJoinDialogOpen(true)}>
                                Book a Free Trial
                            </Button>
                        </div>
                    </section>
                </main>

                <Footer />
                <JoinDialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen} />
            </div>
        </>
    );
};

export default CoursesClient;
