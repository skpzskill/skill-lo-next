// 10-World Interactive Learning Platform Data Structure
// Based on comprehensive curriculum design

export interface LearningZone {
    id: string;
    name: string;
    emoji: string;
    duration: number; // in minutes
    description: string;
    activities: ZoneActivity[];
    image?: string; // Zone image
}

export interface ZoneActivity {
    id: string;
    type: 'story' | 'game' | 'creation' | 'quiz' | 'discussion' | 'video' | 'comparison';
    title: string;
    description: string;
    videoPlaceholder?: boolean; // If true, show video upload placeholder
    videoUrl?: string; // Optional video URL
    image?: string; // Activity image
    content?: any; // Activity-specific content
}

export interface LearningWorld {
    id: string;
    worldNumber: number;
    name: string;
    emoji: string;
    theme: string;
    framework: string;
    duration: number; // total minutes
    color: string; // Tailwind color class
    mascot: {
        name: string;
        emoji: string;
        description: string;
    };
    description: string;
    whatKidsExperience: string;
    learningOutcomes?: string[]; // Learning outcomes for the hour
    zones: LearningZone[];
    journeyBookPage: {
        pageNumber: number;
        title: string;
        prompts: string[];
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
    zonesCompleted: string[];
    badgesEarned: string[];
    currentWorld: string | null;
    currentZone: string | null;
    journeyBookPages: Record<number, any>;
}

// World 1: Discovery Island - COMPLETELY REDESIGNED FOR CREATIVITY
// Framework: E.N.T.R.Y. (Empathize, Notice, Try, Reflect, Yourself)
export const world1: LearningWorld = {
    id: 'world-1',
    worldNumber: 1,
    name: 'Discovery Island',
    emoji: '🌟',
    theme: 'Introduction to Entrepreneurship',
    framework: 'E.N.T.R.Y.',
    duration: 60,
    color: 'from-coral-500 to-sky-500',
    mascot: {
        name: 'Leo the Explorer',
        emoji: '🦁',
        description: 'Your fearless guide on this epic adventure!'
    },
    description: 'Welcome to Discovery Island - where ordinary kids become extraordinary entrepreneurs!',
    whatKidsExperience: '🎯 Discover what makes entrepreneurs special, unlock your superpowers, and create your first business idea!',
    learningOutcomes: [
        'Explain what an entrepreneur is in simple words',
        'Identify basic examples of entrepreneurship around them',
        'Understand the difference between a "job taker" and a "job maker"',
        'Begin to see themselves as problem solvers and idea creators'
    ],
    zones: [
        // ZONE 1: THE KNOWLEDGE QUEST - Concepts & Tables
        {
            id: 'world1-zone1',
            name: 'The Knowledge Quest',
            emoji: '📚',
            duration: 20,
            description: 'Learn the core secrets of entrepreneurship!',
            image: '/images/discovery-island/entrepreneur-intro.png',
            activities: [
                {
                    id: 'w1z1-intro',
                    type: 'story',
                    title: '🎭 What Makes Someone an Entrepreneur?',
                    description: 'Discover the secret powers of entrepreneurs!',
                    image: '/images/discovery-island/entrepreneur-intro.png',
                    content: {
                        narrative: `🦁 Leo says: "Welcome to the Knowledge Quest!

An entrepreneur is NOT just someone who starts a business. 

An entrepreneur is someone who:
👁️ SEES problems others miss
💡 THINKS of creative solutions  
🚀 TAKES ACTION to make it happen
❤️ HELPS people's lives get better

They are the world's PROBLEM SOLVERS! 🌟"`,
                        keyPoints: []
                    }
                },
                {
                    id: 'w1z1-job-maker',
                    type: 'comparison', // New type for Table View
                    title: '👔 Job Taker vs 🚀 Job Maker',
                    description: 'A clear comparison of two important paths.',
                    image: '/images/discovery-island/job-maker-vs-taker.png',
                    content: {
                        narrative: 'Both paths are important, but they are very different! Let\'s compare them side-by-side.',
                        columns: ['Feature', '👔 Job Taker', '🚀 Job Maker (Entrepreneur)'],
                        rows: [
                            ['Role', 'Works for a company', 'Creates their own business'],
                            ['Income', 'Steady, fixed salary', 'Variable - can be huge!'],
                            ['Risk', 'Low risk', 'High risk (but high reward!)'],
                            ['Impact', 'Follows instructions', 'Makes the rules & creates jobs'],
                            ['Goal', 'Job Security', 'Freedom & Innovation']
                        ],
                        discussionQuestions: [
                            { emoji: '🤔', question: 'Which path sounds more exciting to you right now?' }
                        ]
                    }
                },
                {
                    id: 'w1z1-pros-cons',
                    type: 'comparison', // Table View
                    title: '⚖️ The Entrepreneur\'s Balance Sheet',
                    description: 'The Rewards vs The Challenges.',
                    image: '/images/discovery-island/entrepreneur-intro.png',
                    content: {
                        narrative: 'Every adventure has treasures and monsters! Here is the truth about being an entrepreneur.',
                        columns: ['Theme', '🌟 PROS (Advantages)', '⛰️ CONS (Challenges)'],
                        rows: [
                            ['Freedom', 'Be your own Boss! 👑', 'Responsible for everything 🧩'],
                            ['Money', 'No limit on earnings 💰', 'Money might be low at first 📉'],
                            ['Creativity', 'Bring YOUR ideas to life ✨', 'Must solve hard problems 🧠'],
                            ['Time', 'Flexible schedule ⏰', 'Work long hours/weekends 💪']
                        ],
                        discussionQuestions: [
                            { emoji: '💪', question: 'Are the rewards worth the hard work for you?' }
                        ]
                    }
                }
            ]
        },
        // ZONE 2: SKILL LAB - Skills in Action
        {
            id: 'world1-zone2',
            name: 'Skill Lab',
            emoji: '🧪',
            duration: 20,
            description: 'See how Aarav used his Superpowers!',
            image: '/images/discovery-island/aarav-lemonade-stand.png',
            activities: [
                {
                    id: 'w1z2-story-recap',
                    type: 'story',
                    title: '🍋 Aarav\'s E.N.T.R.Y. Story',
                    description: 'Context for the skills!',
                    image: '/images/discovery-island/aarav-lemonade-stand.png',
                    content: {
                        narrative: `Remember Aarav? 
He saw tired neighbors and started a lemonade stand.
But how did he do it? He used the E.N.T.R.Y. Framework!

Let's break down his success...`,
                        keyPoints: []
                    }
                },
                {
                    id: 'w1z2-mindmap',
                    type: 'game',
                    title: '🧠 Framework',
                    description: 'How Aarav used N, T, R, Y!',
                    content: {
                        type: 'interactive-mindmap',
                        centerNode: { text: 'Aarav\'s Superpowers', emoji: '🍋' },
                        nodes: [
                            {
                                id: 'E', letter: 'E', word: 'Empathize', emoji: '❤️',
                                color: 'from-pink-500 to-rose-500',
                                description: 'He felt bad for the tired neighbors.',
                                examples: ['"They look so thirsty!"', 'Putting myself in their shoes', 'Caring about their problem'],
                                activity: { title: 'Feel', task: 'How do your friends feel when they are tired?' }
                            },
                            {
                                id: 'N', letter: 'N', word: 'Notice', emoji: '👀',
                                color: 'from-purple-500 to-indigo-500',
                                description: 'He NOTICED the hot weather and no drinks nearby.',
                                examples: ['Saw the Problem', 'Hot day = Thirsty people', 'No lemonade stand nearby'],
                                activity: { title: 'Look', task: 'Notice one problem in your room.' }
                            },
                            {
                                id: 'T', letter: 'T', word: 'Try', emoji: '🚀',
                                color: 'from-green-500 to-emerald-500',
                                description: 'He TRIED selling lemonade on Saturday.',
                                examples: ['Small Experiment', 'Made a small batch first', 'Tested the price'],
                                activity: { title: 'Act', task: 'Try one small idea today.' }
                            },
                            {
                                id: 'R', letter: 'R', word: 'Reflect', emoji: '🧠',
                                color: 'from-blue-500 to-sky-500',
                                description: 'He realized people wanted COLD drinks, so he added ice!',
                                examples: ['Improved his idea', 'Added ice cubes', 'Changed the sign'],
                                activity: { title: 'Think', task: 'How can you do something better?' }
                            },
                            {
                                id: 'Y', letter: 'Y', word: 'Yourself', emoji: '⭐',
                                color: 'from-amber-400 to-orange-500',
                                description: 'He believed HE could solve the problem!',
                                examples: ['Confidence', 'I can build this!', 'My skills matter'],
                                activity: { title: 'Believe', task: 'Say "I can do it!"' }
                            }
                        ]
                    }
                },
                {
                    id: 'w1z3-game',
                    type: 'game',
                    title: '🎴 Entrepreneur Trading Cards',
                    description: 'Explore other kid heroes!',
                    image: '/images/discovery-island/kid-entrepreneurs.png',
                    content: {
                        entrepreneurs: [
                            { name: 'Mikaila', business: 'Me & The Bees', emoji: '🐝', lesson: 'Turn fear into passion!' },
                            { name: 'Ryan', business: 'Ryan\'s World', emoji: '🎥', lesson: 'Share what you love!' },
                            { name: 'Moziah', business: 'Mo\'s Bows', emoji: '🎀', lesson: 'Look sharp, feel good!' }
                        ]
                    }
                }
            ]
        },
        // ZONE 3: THE INNOVATION WORKSHOP - Specific Workshop Flow
        {
            id: 'world1-zone3',
            name: 'The Innovation Workshop',
            emoji: '💡',
            duration: 30,
            description: 'Your Workshop: "If I Were an Entrepreneur"',
            image: '/images/discovery-island/entrepreneur-intro.png',
            activities: [
                {
                    id: 'w1z3-workshop',
                    type: 'creation',
                    title: '🚀 Future Entrepreneur Workshop',
                    description: 'Imagine yourself as an entrepreneur!',
                    content: {
                        instruction: 'Complete this workshop to build your dream! 🌟',
                        steps: [
                            // Part 1: The Basics
                            {
                                id: 'basics',
                                title: 'Part 1: The Idea',
                                prompts: [
                                    { id: 'name', label: 'My name is:', type: 'text', emoji: '👋' },
                                    { id: 'problem', label: 'The problem I see around me is:', type: 'textarea', emoji: '🔍' },
                                    { id: 'idea', label: 'My idea to solve it is:', type: 'textarea', emoji: '💡' },
                                    { id: 'businessName', label: 'My business name would be:', type: 'text', emoji: '🏷️' },
                                    { id: 'help', label: 'I will help people by:', type: 'textarea', emoji: '🤝' }
                                ],
                                timer: 10 // 10 minutes
                            },
                            // Part 2: Superpowers
                            {
                                id: 'superpowers',
                                title: 'Part 2: Entrepreneur Superpowers',
                                prompts: [
                                    {
                                        id: 'superpower',
                                        label: 'Which entrepreneur superpower is most important to you?',
                                        type: 'radio',
                                        options: ['Creativity', 'Courage', 'Problem-Solving', 'Teamwork', 'Learning'],
                                        emoji: '⚡'
                                    },
                                    { id: 'whySuperpower', label: 'Why?', type: 'textarea', emoji: '❓' },
                                    { id: 'famousEnt', label: 'Name one famous entrepreneur:', type: 'text', emoji: '🌟' },
                                    { id: 'famousCreated', label: 'What did they create?', type: 'text', emoji: '🏗️' }
                                ],
                                timer: 10 // 10 minutes
                            },
                            // Part 3: Reflection & Bonus
                            {
                                id: 'reflection',
                                title: 'Part 3: Reflection & Bonus',
                                prompts: [
                                    { id: 'learned', label: 'One thing I learned about entrepreneurship today:', type: 'textarea', emoji: '🧠' },
                                    { id: 'excited', label: 'What excites you most about being an entrepreneur?', type: 'textarea', emoji: '🎉' },
                                    { id: 'logo', label: 'Bonus: Draw your logo!', type: 'drawing', emoji: '🎨' }
                                ],
                                timer: 5 // 5 minutes
                            }
                        ]
                    }
                }
            ]
        },
        // ZONE 4: CERTIFICATION SUMMIT - Badge Generation
        {
            id: 'world1-zone4',
            name: 'Certification Summit',
            emoji: '🏆',
            duration: 10,
            description: 'Generate your official badge!',
            image: '/images/discovery-island/explorer-badge.png',
            activities: [
                {
                    id: 'w1z4-badge-gen',
                    type: 'creation', // Will handle generation
                    title: '🏅 Badge Generator',
                    description: 'Generating your official Explorer Badge...',
                    content: {
                        type: 'badge-generation',
                        badgeImage: '/images/discovery-island/explorer-badge.png',
                        message: 'Great job! You\'re thinking like an entrepreneur! 🚀',
                        autoDownload: true
                    }
                }
            ]
        }
    ],
    journeyBookPage: {
        pageNumber: 1,
        title: 'My First Discovery',
        prompts: [
            'Problem I Noticed',
            'Entrepreneurs I Found',
            'My Business Idea',
            'My Superpower',
            'What I Learned'
        ]
    },
    badge: {
        id: 'badge-explorer',
        name: 'Young Entrepreneur Explorer',
        emoji: '🏅',
        image: '/images/discovery-island/explorer-badge.png'
    },
    homework: {
        title: 'Interview an Entrepreneur',
        description: 'Find one entrepreneur in your family or community',
        tasks: [
            'Ask: Why did they start it?',
            'Ask: What problem are they solving?',
            'Ask: What do they enjoy about it?',
            'Ask: What advice do they have for a young entrepreneur?',
            'Bring your notes or photos next class!'
        ]
    }
};

// Placeholder data for other worlds (to be filled with full content later)
export const world2: LearningWorld = {
    id: 'world-2',
    worldNumber: 2,
    name: 'Problem Hunter\'s Forest',
    emoji: '🔍',
    theme: 'Opportunity Discovery',
    framework: 'S.E.E.R.',
    duration: 60,
    color: 'from-green-600 to-yellow-500',
    mascot: {
        name: 'Foxy the Detective',
        emoji: '🦊',
        description: 'Your guide to finding hidden treasure problems!'
    },
    description: 'Enter the forest where every problem is a hidden treasure waiting to be found!',
    whatKidsExperience: 'Learn to spot, explore, evaluate, and refine opportunities',
    zones: [
        {
            id: 'world2-zone1',
            name: 'Spot Zone',
            emoji: '👁️',
            duration: 12,
            description: 'Find real-world problems',
            activities: [
                { id: 'w2z1-video', type: 'video', title: 'Mia the Problem Spotter', description: 'Story introduction', videoPlaceholder: true }
            ]
        },
        {
            id: 'world2-zone2',
            name: 'Explore Grove',
            emoji: '🌳',
            duration: 12,
            description: 'Understand who faces problems',
            activities: [
                { id: 'w2z2-activity', type: 'creation', title: 'Problem Detective Worksheet', description: 'Identify problems and who they affect' }
            ]
        },
        {
            id: 'world2-zone3',
            name: 'Evaluate Arena',
            emoji: '⚖️',
            duration: 15,
            description: 'Compare & choose important problems',
            activities: [
                { id: 'w2z3-game', type: 'game', title: 'Which Problem Wins?', description: 'Vote and analyze impact' }
            ]
        },
        {
            id: 'world2-zone4',
            name: 'Refine Workshop',
            emoji: '🎯',
            duration: 10,
            description: 'Pick the BEST opportunity',
            activities: [
                { id: 'w2z4-activity', type: 'creation', title: 'Choose Your Problem', description: 'Select the problem you want to solve' }
            ]
        },
        {
            id: 'world2-zone5',
            name: 'Treasure Map',
            emoji: '🗺️',
            duration: 11,
            description: 'Plan your problem-solving journey',
            activities: [
                { id: 'w2z5-badge', type: 'creation', title: 'Earn Problem Hunter Badge', description: 'Complete your journey!' }
            ]
        }
    ],
    journeyBookPage: {
        pageNumber: 2,
        title: 'Problems I Discovered',
        prompts: ['Problems I Spotted', 'Who Faces Them', 'Which Problem I Chose', 'Why It Matters']
    },
    badge: {
        id: 'badge-hunter',
        name: 'Problem Hunter Master',
        emoji: '🏅'
    },
    homework: {
        title: 'Spot 5 Problems at Home',
        description: 'Observe your home or community',
        tasks: ['List 5 problems you notice', 'For each, write who faces it', 'Why it happens', 'How often it happens']
    }
};

// Export all worlds (add more as they're developed)
export const learningWorlds: LearningWorld[] = [
    world1,
    world2,
    // world3, world4, world5, world6, world7, world8, world9, world10 - to be added
];

// Helper functions
export const getWorldById = (id: string): LearningWorld | undefined => {
    return learningWorlds.find(w => w.id === id);
};

export const getWorldByNumber = (num: number): LearningWorld | undefined => {
    return learningWorlds.find(w => w.worldNumber === num);
};

export const calculateProgress = (progress: StudentProgress): number => {
    const totalWorlds = learningWorlds.length;
    const completedWorlds = progress.worldsCompleted.length;
    return (completedWorlds / totalWorlds) * 100;
};

export const getNextWorld = (currentWorldId: string): LearningWorld | null => {
    const currentWorld = getWorldById(currentWorldId);
    if (!currentWorld) return null;
    return getWorldByNumber(currentWorld.worldNumber + 1) || null;
};

export const isWorldUnlocked = (worldId: string, progress: StudentProgress): boolean => {
    const world = getWorldById(worldId);
    if (!world) return false;
    if (world.worldNumber === 1) return true;
    const previousWorld = getWorldByNumber(world.worldNumber - 1);
    return previousWorld ? progress.worldsCompleted.includes(previousWorld.id) : false;
};
