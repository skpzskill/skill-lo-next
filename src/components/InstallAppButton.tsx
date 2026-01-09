"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface InstallAppButtonProps {
    mode?: 'mobile' | 'desktop';
}

const InstallAppButton = ({ mode = 'mobile' }: InstallAppButtonProps) => {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            setIsVisible(true);
        };

        window.addEventListener("beforeinstallprompt", handler);

        return () => {
            window.removeEventListener("beforeinstallprompt", handler);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        setDeferredPrompt(null);
        setIsVisible(false);
    };

    if (!isVisible) return null;

    if (mode === 'desktop') {
        return (
            <button
                onClick={handleInstallClick}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium text-sm"
            >
                DOWNLOAD OUR APP <Download className="w-5 h-5 bg-muted rounded p-0.5" />
            </button>
        );
    }

    return (
        <Button variant="outline" size="sm" onClick={handleInstallClick} className="gap-2 w-full justify-start">
            <Download className="w-4 h-4" />
            Install App
        </Button>
    );
};

export default InstallAppButton;
