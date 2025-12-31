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
import { OrganizationSchema, WebSiteSchema } from "@/components/StructuredData";

const HomeClient = () => {
    const [joinDialogOpen, setJoinDialogOpen] = useState(false);

    return (
        <div className="min-h-screen">
            <OrganizationSchema />
            <WebSiteSchema />
            <Navigation onJoinClick={() => setJoinDialogOpen(true)} />
            <main>
                <Hero onJoinClick={() => setJoinDialogOpen(true)} />
                <About />
                <Mission />
                <Features />
                <Programs />

                <div className="bg-gradient-to-br from-primary via-primary to-accent/20">
                    <CTA onJoinClick={() => setJoinDialogOpen(true)} className="bg-transparent" />
                    <Footer className="bg-transparent" />
                </div>

            </main>

            <JoinDialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen} />
        </div>
    );
};

export default HomeClient;

