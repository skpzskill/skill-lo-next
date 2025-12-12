"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Mission from "@/components/Mission";
import Features from "@/components/Features";
import Programs from "@/components/Programs";
import CTA from "@/components/CTA";
import JoinDialog from "@/components/JoinDialog";

const HomeClient = () => {
    const [joinDialogOpen, setJoinDialogOpen] = useState(false);

    return (
        <div className="min-h-screen">
            <Navigation onJoinClick={() => setJoinDialogOpen(true)} />
            <main>
                <Hero onJoinClick={() => setJoinDialogOpen(true)} />
                <About />
                <Mission />
                <Features />
                <Programs />
                <CTA onJoinClick={() => setJoinDialogOpen(true)} />
            </main>
            <footer className="py-8 bg-card border-t border-border">
                <div className="container mx-auto px-4 text-center text-muted-foreground">
                    <p>© 2025 SkillPreneurZ. Building the Future Mindset.</p>
                </div>
            </footer>

            <JoinDialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen} />
        </div>
    );
};

export default HomeClient;
