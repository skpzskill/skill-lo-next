"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Target, Users, Award, BookOpen, CheckCircle, TrendingUp } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import JoinDialog from '@/components/JoinDialog';
import Breadcrumb from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { values, milestones } from '@/lib/about-data';

const AboutClient = () => {
    const [joinDialogOpen, setJoinDialogOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col">
            <Navigation onJoinClick={() => setJoinDialogOpen(true)} />

            <main className="flex-1 pt-20">
                {/* Hero Section */}
                <section className="relative py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
                    <div className="container">
                        <Breadcrumb items={[{ name: 'About Us', url: '/about' }]} />

                        <div className="max-w-4xl mx-auto text-center">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                                Building the <span className="text-primary">Future Mindset</span>
                            </h1>
                            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                                At SkillPreneurZ, we're on a mission to transform how young minds learn, think, and create.
                                We believe that the entrepreneurs, innovators, and leaders of tomorrow are sitting in classrooms today,
                                waiting for the right spark to ignite their potential.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Button size="lg" onClick={() => setJoinDialogOpen(true)}>
                                    Book a Free Trial
                                </Button>
                                <Button size="lg" variant="outline" asChild>
                                    <Link href="/courses">Explore Our Courses</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-16 bg-primary text-primary-foreground">
                    <div className="container">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            <div>
                                <p className="text-4xl md:text-5xl font-bold mb-2">10,000+</p>
                                <p className="text-primary-foreground/80">Students Empowered</p>
                            </div>
                            <div>
                                <p className="text-4xl md:text-5xl font-bold mb-2">50+</p>
                                <p className="text-primary-foreground/80">Partner Schools</p>
                            </div>
                            <div>
                                <p className="text-4xl md:text-5xl font-bold mb-2">15+</p>
                                <p className="text-primary-foreground/80">Cities in India</p>
                            </div>
                            <div>
                                <p className="text-4xl md:text-5xl font-bold mb-2">95%</p>
                                <p className="text-primary-foreground/80">Parent Satisfaction</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Story Section */}
                <section className="py-20">
                    <div className="container">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                                    Our Story: From Vision to Reality
                                </h2>
                                <div className="space-y-4 text-muted-foreground leading-relaxed">
                                    <p>
                                        SkillPreneurZ was born from a simple observation: traditional education, while valuable,
                                        often fails to prepare students for the rapidly evolving demands of the modern world.
                                        Our founders, a team of educators, entrepreneurs, and technologists, came together with
                                        a shared vision to bridge this gap.
                                    </p>
                                    <p>
                                        We noticed that while schools excel at teaching mathematics, science, and languages,
                                        they often overlook critical life skills like financial literacy, creative problem-solving,
                                        and entrepreneurial thinking. These are the skills that will define success in the 21st century.
                                    </p>
                                    <p>
                                        Starting with a pilot program in just five schools, we developed a curriculum that
                                        combines academic rigor with practical, hands-on learning experiences. The response was
                                        overwhelming – students were engaged, parents were thrilled, and teachers saw transformations
                                        in how students approached challenges.
                                    </p>
                                    <p>
                                        Today, SkillPreneurZ has grown into a movement. We've touched the lives of over 10,000
                                        students across India, partnering with schools, parents, and communities who share our
                                        belief that every child deserves the opportunity to develop their entrepreneurial potential.
                                    </p>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8">
                                    <h3 className="text-2xl font-bold text-foreground mb-6">Our Journey</h3>
                                    <div className="space-y-6">
                                        {milestones.map((milestone, index) => (
                                            <div key={index} className="flex gap-4">
                                                <div className="flex-shrink-0 w-16 text-primary font-bold">{milestone.year}</div>
                                                <div className="flex-1 pb-6 border-b border-border last:border-0 last:pb-0">
                                                    <p className="text-foreground">{milestone.achievement}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="py-20 bg-muted">
                    <div className="container">
                        <div className="grid md:grid-cols-2 gap-8">
                            <Card className="border-0 shadow-lg">
                                <CardContent className="p-8">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="p-3 rounded-full bg-primary/10">
                                            <Target className="h-8 w-8 text-accent" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed">
                                        To democratize entrepreneurship education and make 21st-century skills accessible to every
                                        child in India, regardless of their background. We aim to nurture a generation of creative
                                        thinkers, problem solvers, and responsible leaders who will shape a better tomorrow.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="border-0 shadow-lg">
                                <CardContent className="p-8">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="p-3 rounded-full bg-primary/10">
                                            <TrendingUp className="h-8 w-8 text-accent" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-foreground">Our Vision</h2>
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed">
                                        To become India's most impactful educational platform for future skills, creating a
                                        nationwide ecosystem where young minds learn to innovate, lead, and make a positive
                                        difference in their communities and beyond.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Core Values */}
                <section className="py-20">
                    <div className="container">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Core Values</h2>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                These principles guide everything we do, from curriculum design to student interactions.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {values.map((value, index) => (
                                <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                                    <CardContent className="p-6">
                                        <div className="mx-auto mb-4 p-4 rounded-full bg-accent/10 w-fit">
                                            <value.icon className="h-8 w-8 text-accent" />
                                        </div>
                                        <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                                        <p className="text-muted-foreground text-sm">{value.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="py-20 bg-muted">
                    <div className="container">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                                    Why Parents & Schools Choose SkillPreneurZ
                                </h2>
                                <div className="space-y-4">
                                    {[
                                        'Research-backed curriculum developed by education experts',
                                        'Hands-on projects that apply learning to real-world scenarios',
                                        'Small batch sizes ensuring personalized attention',
                                        'Regular progress reports and parent engagement',
                                        'Certified instructors passionate about youth development',
                                        'AI-powered learning tools for enhanced engagement',
                                        'Flexible scheduling to accommodate busy families',
                                        'Safe, inclusive learning environment'
                                    ].map((point, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                                            <p className="text-foreground">{point}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-primary rounded-2xl p-6 text-primary-foreground">
                                    <BookOpen className="h-10 w-10 mb-4 text-accent" />
                                    <h3 className="text-2xl font-bold mb-2">25-Week</h3>
                                    <p className="text-primary-foreground/80">Comprehensive Programs</p>
                                </div>
                                <div className="bg-accent rounded-2xl p-6 text-accent-foreground">
                                    <Users className="h-10 w-10 mb-4" />
                                    <h3 className="text-2xl font-bold mb-2">12:1</h3>
                                    <p className="text-accent-foreground/80">Student-Teacher Ratio</p>
                                </div>
                                <div className="bg-accent rounded-2xl p-6 text-accent-foreground">
                                    <Award className="h-10 w-10 mb-4" />
                                    <h3 className="text-2xl font-bold mb-2">100%</h3>
                                    <p className="text-accent-foreground/80">Project Completion</p>
                                </div>
                                <div className="bg-primary rounded-2xl p-6 text-primary-foreground">
                                    <Target className="h-10 w-10 mb-4 text-accent" />
                                    <h3 className="text-2xl font-bold mb-2">3 Core</h3>
                                    <p className="text-primary-foreground/80">Skill Programs</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-primary text-primary-foreground">
                    <div className="container text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Ready to Transform Your Child's Future?
                        </h2>
                        <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                            Join thousands of forward-thinking parents who have chosen SkillPreneurZ to prepare their children for the future.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button size="lg" variant="secondary" onClick={() => setJoinDialogOpen(true)}>
                                Book a Free Trial
                            </Button>
                            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                                <Link href="/contact">Contact Us</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
            <JoinDialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen} />
        </div>
    );
};

export default AboutClient;
