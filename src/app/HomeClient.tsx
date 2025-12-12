"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Mission from "@/components/Mission";
import Features from "@/components/Features";
import Programs from "@/components/Programs";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
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

            <Footer />

            <JoinDialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen} />
        </div>
    );
};

export default HomeClient;

