// World 2: Problem Planet
// Framework: S.E.E.R. (Spot, Explore, Evaluate, Refine)
// Theme: Problem Spotting & Opportunity Discovery

import { LearningWorld } from './types';

export const problemPlanet: LearningWorld = {
    id: 'world-2',
    worldNumber: 2,
    name: 'Problem Planet',
    emoji: '🔍',
    theme: 'Opportunity Discovery',
    framework: 'S.E.E.R.',
    duration: 60,
    color: 'from-green-600 to-yellow-500',
    mascot: {
        name: 'Mia the Detective',
        emoji: '🦊',
        description: 'Your guide to finding hidden treasure problems!'
    },
    description: 'Every successful idea begins with a problem. Become an Idea Detective and discover opportunities!',
    objectives: [
        'Learn to spot problems around you',
        'Understand who faces these problems',
        'Evaluate which problems matter most',
        'Refine and choose the best opportunity'
    ],
    learningOutcomes: [
        'Spot multiple problems in everyday situations',
        'Explore who faces each problem and why it matters',
        'Evaluate problems based on impact and frequency',
        'Refine and select ONE problem to solve',
        'Use the S.E.E.R. framework confidently'
    ],
    skillsUnlocked: [
        { name: 'Observation', icon: 'Eye', description: 'Seeing what others miss', color: 'text-purple-600 bg-purple-100 border-purple-200' },
        { name: 'Curiosity', icon: 'Search', description: 'Asking the right questions', color: 'text-blue-600 bg-blue-100 border-blue-200' },
        { name: 'Analysis', icon: 'BarChart', description: 'Comparing and evaluating', color: 'text-green-600 bg-green-100 border-green-200' },
        { name: 'Decision-making', icon: 'Target', description: 'Choosing wisely', color: 'text-orange-600 bg-orange-100 border-orange-200' }
    ],
    powerPaths: [
        // POWER PATH 1: SPOT - Find Problems
        {
            id: 'world2-path1',
            name: 'Spot Zone',
            emoji: '👁️',
            duration: 12,
            description: 'Find real-world problems like a detective!',
            image: '/images/problem-planet/spot-zone.png',
            activities: [
                {
                    id: 'w2p1-intro-video',
                    type: 'video',
                    title: '🎥 Mia the Problem Spotter',
                    description: 'Meet Mia who found problems everywhere!',
                    videoPlaceholder: true,
                    videoUrl: 'https://youtu.be/example',
                    content: {
                        narrative: `Mia was an 11-year-old who loved puzzles. One day at school, she noticed something interesting:
• Kids waited a long time to fill their water bottles.
• Many lost their pencils every week.
• The playground slide was always too hot in summer.

Mia didn't ignore these. She wrote them all in her "Problem Notebook."
That evening, she asked herself:
"Which problem affects the most people? Which one really matters?"

She used the S.E.E.R. framework without even knowing it!`,
                        keyPoints: [
                            'Problems are OPPORTUNITIES in disguise',
                            'Look around - problems are everywhere!',
                            'The first step is to SPOT them'
                        ]
                    }
                },
                {
                    id: 'w2p1-seer-intro',
                    type: 'comparison',
                    title: '🔍 The S.E.E.R. Framework',
                    description: 'Your problem-finding superpowers!',
                    content: {
                        type: 'table',
                        headers: ['Step', 'Meaning', 'Example'],
                        rows: [
                            ['S - Spot', 'Find something not working well', 'Water line too slow'],
                            ['E - Explore', 'Understand who faces this issue', 'Students wait long & get late'],
                            ['E - Evaluate', 'Compare problems to find the biggest', 'Pencil loss vs long water line'],
                            ['R - Refine', 'Choose the best opportunity', 'Solve the water filling issue']
                        ]
                    }
                },
                {
                    id: 'w2p1-needs-wants',
                    type: 'comparison',
                    title: '💡 Needs vs Wants',
                    description: 'Understanding what matters most!',
                    content: {
                        type: 'table',
                        headers: ['Type', 'Definition', 'Example'],
                        rows: [
                            ['Need', 'Something important that people MUST have', 'Clean water, healthy food'],
                            ['Want', 'Something nice to have, but not necessary', 'Ice cream, video games']
                        ]
                    }
                }
            ]
        },
        // POWER PATH 2: EXPLORE - Understand Problems
        {
            id: 'world2-path2',
            name: 'Explore Grove',
            emoji: '🌳',
            duration: 12,
            description: 'Understand who faces problems and why!',
            image: '/images/problem-planet/explore-grove.png',
            activities: [
                {
                    id: 'w2p2-detective-worksheet',
                    type: 'creation',
                    title: '🕵️ Problem Detective Worksheet',
                    description: 'Identify problems and who they affect!',
                    content: {
                        type: 'workshop',
                        steps: [
                            {
                                title: 'Spot It!',
                                prompts: [
                                    { id: 'problem1', type: 'text', label: 'Problem 1 you noticed today:', emoji: '1️⃣' },
                                    { id: 'problem2', type: 'text', label: 'Problem 2 you noticed today:', emoji: '2️⃣' },
                                    { id: 'problem3', type: 'text', label: 'Problem 3 you noticed today:', emoji: '3️⃣' }
                                ]
                            },
                            {
                                title: 'Explore It!',
                                prompts: [
                                    {
                                        id: 'whoFaces',
                                        type: 'radio',
                                        label: 'Who faces the problem?',
                                        emoji: '👥',
                                        options: ['Kids', 'Parents', 'Teachers', 'Neighbors', 'Pets']
                                    },
                                    { id: 'howBothers', type: 'textarea', label: 'How does it bother them?', emoji: '😤' }
                                ]
                            },
                            {
                                title: 'Draw It!',
                                prompts: [
                                    { id: 'problemDrawing', type: 'drawing', label: 'Draw the problem and who faces it!', emoji: '🎨' }
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        // POWER PATH 3: EVALUATE - Compare Problems
        {
            id: 'world2-path3',
            name: 'Evaluate Arena',
            emoji: '⚖️',
            duration: 15,
            description: 'Compare & choose important problems!',
            image: '/images/problem-planet/evaluate-arena.png',
            activities: [
                {
                    id: 'w2p3-which-wins',
                    type: 'game',
                    title: '🏆 Which Problem Wins?',
                    description: 'Vote and analyze impact!',
                    content: {
                        type: 'voting-game',
                        rounds: [
                            {
                                problem1: 'Broken benches in school playground',
                                problem2: 'Kids losing erasers',
                                criteria: ['Impact', 'Frequency', 'Urgency']
                            },
                            {
                                problem1: 'Long lunch line',
                                problem2: 'Messy classroom',
                                criteria: ['Impact', 'Frequency', 'Urgency']
                            },
                            {
                                problem1: 'Forgetting homework',
                                problem2: 'Boring school bus rides',
                                criteria: ['Impact', 'Frequency', 'Urgency']
                            }
                        ],
                        teacherTip: 'Discuss why one problem got more votes based on impact, frequency, and urgency.'
                    }
                },
                {
                    id: 'w2p3-evaluation-matrix',
                    type: 'creation',
                    title: '📊 Evaluate Your Problems',
                    description: 'Rate your problems to find the best one!',
                    content: {
                        type: 'evaluation-matrix',
                        criteria: [
                            { name: 'Impact', description: 'How many people does it affect?', emoji: '👥' },
                            { name: 'Frequency', description: 'How often does it happen?', emoji: '🔄' },
                            { name: 'Urgency', description: 'How quickly must it be solved?', emoji: '⏰' }
                        ],
                        scale: ['Low (1)', 'Medium (2)', 'High (3)']
                    }
                }
            ]
        },
        // POWER PATH 4: REFINE - Choose the Best
        {
            id: 'world2-path4',
            name: 'Refine Workshop',
            emoji: '🎯',
            duration: 10,
            description: 'Pick the BEST opportunity to solve!',
            image: '/images/problem-planet/refine-workshop.png',
            activities: [
                {
                    id: 'w2p4-choose-problem',
                    type: 'creation',
                    title: '🎯 Choose Your Problem',
                    description: 'Select the problem you want to solve!',
                    content: {
                        type: 'workshop',
                        steps: [
                            {
                                title: 'My Final Choice',
                                prompts: [
                                    { id: 'chosenProblem', type: 'textarea', label: 'The problem I want to solve is...', emoji: '🎯' },
                                    { id: 'whyChosen', type: 'textarea', label: 'I chose this because...', emoji: '💡' },
                                    { id: 'whoHelp', type: 'text', label: 'I will help...', emoji: '👥' },
                                    { id: 'firstStep', type: 'textarea', label: 'My first step will be...', emoji: '🚀' }
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        // POWER PATH 5: BADGE & JOURNEY BOOK
        {
            id: 'world2-path5',
            name: 'Treasure Map',
            emoji: '🗺️',
            duration: 11,
            description: 'Earn your Problem Hunter badge!',
            image: '/images/problem-planet/treasure-map.png',
            activities: [
                {
                    id: 'w2p5-badge',
                    type: 'creation',
                    title: '🏅 Problem Hunter Badge',
                    description: 'You earned it!',
                    content: {
                        type: 'badge-generation',
                        badgeId: 'BADGE_W2_HUNTER',
                        message: 'Amazing! You\'re now a certified Problem Hunter! 🔍'
                    }
                },
                {
                    id: 'w2p5-journey-book',
                    type: 'creation',
                    title: '📔 Journey Book - Page 2',
                    description: 'Document your discoveries!',
                    content: {
                        type: 'journey-book'
                    }
                }
            ]
        }
    ],
    journeyBookPage: {
        pageNumber: 2,
        title: 'Problems I Discovered',
        prompts: [
            'Problems I Spotted',
            'Who Faces Them',
            'Which Problem I Chose',
            'Why It Matters'
        ]
    },
    badge: {
        id: 'badge-hunter',
        name: 'Problem Hunter Master',
        emoji: '🏅',
        image: '/images/problem-planet/problem-hunter-badge.png'
    },
    homework: {
        title: 'Spot 5 Problems at Home',
        description: 'Observe your home or community and find hidden opportunities!',
        tasks: [
            'List 5 problems you notice',
            'For each, write who faces it',
            'Why it happens',
            'How often it happens',
            'Bring your Problem Notebook next class!'
        ]
    }
};
