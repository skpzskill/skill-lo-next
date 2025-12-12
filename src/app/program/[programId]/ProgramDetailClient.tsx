"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import JoinDialog from "@/components/JoinDialog";
import { programsData } from "@/lib/courses-data";

// Define the shape of a program object based on programsData
type ProgramKey = keyof typeof programsData;
type ProgramData = typeof programsData[ProgramKey];

interface ProgramDetailClientProps {
    programId: string;
}

const ProgramDetailClient = ({ programId }: ProgramDetailClientProps) => {
    const [joinDialogOpen, setJoinDialogOpen] = useState(false);

    const program = programsData[programId as ProgramKey];

    if (!program) return null;

    const Icon = program.icon;

    return (
        <div className="min-h-screen">
            <Navigation onJoinClick={() => setJoinDialogOpen(true)} />

            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-gradient-to-br from-primary/10 via-background to-accent/10">
                <div className="container mx-auto px-4">
                    <Link href="/courses">
                        {/* Changed /#programs to /courses as likely destination */}
                        <Button variant="ghost" className="mb-6">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Programs
                        </Button>
                    </Link>

                    <div className="max-w-4xl">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent/80 flex items-center justify-center">
                                <Icon className="w-8 h-8 text-primary-foreground" />
                            </div>
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                                    {program.title}
                                </h1>
                            </div>
                        </div>

                        <p className="text-xl text-muted-foreground mb-6">
                            {program.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-8">
                            {program.skills.map((skill, idx) => (
                                <span
                                    key={idx}
                                    className="px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Program Details */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl">
                        {/* Overview */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4 text-foreground">Program Overview</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {program.fullDescription}
                            </p>
                        </div>

                        {/* Curriculum */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-6 text-foreground">What You'll Learn</h2>
                            <div className="grid gap-4">
                                {program.curriculum.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border">
                                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                                        <p className="text-foreground">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Program Info */}
                        <div className="grid md:grid-cols-3 gap-6 mb-12">
                            <div className="p-6 rounded-xl bg-card border border-border">
                                <h3 className="font-semibold mb-2 text-foreground">Age Group</h3>
                                <p className="text-muted-foreground">{program.ageGroup}</p>
                            </div>
                            <div className="p-6 rounded-xl bg-card border border-border">
                                <h3 className="font-semibold mb-2 text-foreground">Duration</h3>
                                <p className="text-muted-foreground">{program.duration}</p>
                            </div>
                            <div className="p-6 rounded-xl bg-card border border-border">
                                <h3 className="font-semibold mb-2 text-foreground">Format</h3>
                                <p className="text-muted-foreground">{program.format}</p>
                            </div>
                        </div>

                        {/* Enrollment Options Section */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-6 text-foreground">Enrollment Options</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="p-8 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20">
                                    <h3 className="text-2xl font-bold mb-2 text-foreground">Enterprise</h3>
                                    <p className="text-lg font-semibold text-accent mb-4">Request a Quote</p>
                                    <p className="text-muted-foreground mb-4">For schools and educational institutions</p>
                                    <Button variant="outline" className="w-full" onClick={() => setJoinDialogOpen(true)}>Get Demo</Button>
                                </div>
                                <div className="p-8 rounded-xl bg-gradient-to-br from-accent/5 to-primary/5 border border-accent/20">
                                    <h3 className="text-2xl font-bold mb-2 text-foreground">Parents</h3>
                                    <p className="text-lg font-semibold text-accent mb-4">Request a Quote</p>
                                    <p className="text-muted-foreground mb-4">For individual enrollment</p>
                                    <Button variant="outline" className="w-full" onClick={() => setJoinDialogOpen(true)}>Get Demo</Button>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
                            <h3 className="text-2xl font-bold mb-4 text-foreground">Ready to Get Started?</h3>
                            <p className="text-muted-foreground mb-6">
                                Join this program and start your learning journey today!
                            </p>
                            <Button size="lg" variant="heroPrimary" onClick={() => setJoinDialogOpen(true)}>
                                Enroll Now
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="py-8 bg-card border-t border-border">
                <div className="container mx-auto px-4 text-center text-muted-foreground">
                    <p>© 2025 SkillPreneurZ. Building the Future Mindset.</p>
                </div>
            </footer>

            <JoinDialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen} />
        </div>
    );
};

export default ProgramDetailClient;
