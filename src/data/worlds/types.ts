// Shared type definitions for the SkillPreneurZ Learning Worlds
// Power Path = A themed section within a world containing activities

export interface PowerPathActivity {
    id: string;
    type: 'story' | 'game' | 'creation' | 'quiz' | 'discussion' | 'video' | 'comparison';
    title: string;
    description: string;
    videoPlaceholder?: boolean;
    videoUrl?: string;
    image?: string;
    content?: any;
}

export interface PowerPath {
    id: string;
    name: string;
    emoji: string;
    duration: number;
    description: string;
    activities: PowerPathActivity[];
    image?: string;
}

export interface LearningWorld {
    id: string;
    worldNumber: number;
    name: string;
    emoji: string;
    theme: string;
    framework: string;
    duration: number;
    color: string;
    mascot: {
        name: string;
        emoji: string;
        description: string;
    };
    description: string;
    objectives: string[];
    learningOutcomes: string[];
    skillsUnlocked: {
        name: string;
        icon: string;
        description: string;
        color: string;
    }[];
    powerPaths: PowerPath[];
    journeyBookPage: {
        pageNumber: number;
        title: string;
        prompts: string[];
        image?: string;
    };
    badge: {
        id: string;
        name: string;
        emoji: string;
        image?: string;
    };
    homework: {
        title: string;
        description: string;
        tasks: string[];
    };
}

export interface StudentProgress {
    worldsCompleted: string[];
    powerPathsCompleted: string[];
    badgesEarned: string[];
    currentWorld: string | null;
    currentPowerPath: string | null;
    journeyBookPages: Record<number, any>;
    studentName?: string;
}
