// World 4: Idea Galaxy
// Framework: S.C.A.P.E. (Substitute, Combine, Adapt, Put to Another Use, Eliminate)
// Theme: Idea Generation & Creativity

import { LearningWorld } from './types';

export const ideaGalaxy: LearningWorld = {
    id: 'world-4',
    worldNumber: 4,
    name: 'Idea Galaxy',
    emoji: '🌟',
    theme: 'Idea Generation & Creativity',
    framework: 'S.C.A.P.E.',
    duration: 60,
    color: 'from-purple-500 to-indigo-600',
    mascot: {
        name: 'Karo the Creator',
        emoji: '🚀',
        description: 'Your guide to creative idea making!'
    },
    description: 'Every invention came from imagination! Learn to think creatively and generate amazing ideas!',
    objectives: [
        'Use creative thinking to generate ideas',
        'Transform ordinary ideas into extraordinary ones',
        'Apply S.C.A.P.E. to solve problems',
        'Become a confident "idea maker"'
    ],
    learningOutcomes: [
        'Use creative thinking to come up with many ideas',
        'Change or improve an idea using S.C.A.P.E.',
        'Think of new ways to solve a problem',
        'Imagine creative combinations',
        'Simplify ideas to make them better'
    ],
    skillsUnlocked: [
        { name: 'Creativity', icon: 'Sparkles', description: 'Thinking outside the box', color: 'text-purple-600 bg-purple-100 border-purple-200' },
        { name: 'Innovation', icon: 'Lightbulb', description: 'Making new things', color: 'text-yellow-600 bg-yellow-100 border-yellow-200' },
        { name: 'Imagination', icon: 'Cloud', description: 'Dreaming big', color: 'text-blue-600 bg-blue-100 border-blue-200' },
        { name: 'Flexibility', icon: 'Shuffle', description: 'Adapting ideas', color: 'text-green-600 bg-green-100 border-green-200' }
    ],
    powerPaths: [
        // POWER PATH 1: INTRODUCTION TO CREATIVITY
        {
            id: 'world4-path1',
            name: 'Imagination Station',
            emoji: '💭',
            duration: 15,
            description: 'Unlock your creative superpowers!',
            activities: [
                {
                    id: 'w4p1-story',
                    type: 'story',
                    title: '📖 Karo the Idea Maker',
                    description: 'How Karo used S.C.A.P.E.!',
                    content: {
                        narrative: `Karo loved solving puzzles, but often got stuck on ideas.
One day, he wanted to improve school lunchboxes.

Kids complained about:
• Food getting cold
• Spilling
• Forgetting spoons

So Karo used S.C.A.P.E.:
• S - Substitute: "What if lunchboxes were made of warm fabric?"
• C - Combine: "Mix lunchbox + mini heater = warm lunchbox!"
• A - Adapt: "Make lids easier for younger kids"
• P - Put to another use: "Lunchbox becomes a snack tray too!"
• E - Eliminate: "Add a built-in foldable spoon"

Karo didn't choose just one - S.C.A.P.E. helped him think of MANY possibilities!`,
                        keyPoints: [
                            'Creativity is a SKILL you can learn',
                            'S.C.A.P.E. gives you 5 ways to think',
                            'No idea is too weird!'
                        ]
                    }
                },
                {
                    id: 'w4p1-scape-framework',
                    type: 'comparison',
                    title: '🌟 The S.C.A.P.E. Framework',
                    description: 'Your creativity booster!',
                    content: {
                        type: 'table',
                        headers: ['Letter', 'Meaning', 'Example'],
                        rows: [
                            ['S - Substitute', 'Replace something', 'Ice cream stick → edible chocolate stick'],
                            ['C - Combine', 'Mix two ideas', 'Notebook + calculator = study notebook'],
                            ['A - Adapt', 'Change for new users', 'School bag for rainy days'],
                            ['P - Put to Another Use', 'Use in a new way', 'Old bottles as plant pots'],
                            ['E - Eliminate', 'Remove what\'s not needed', 'Remove long instructions, add icons']
                        ]
                    }
                }
            ]
        },
        // POWER PATH 2: S.C.A.P.E. IN ACTION
        {
            id: 'world4-path2',
            name: 'Creation Station',
            emoji: '🔧',
            duration: 20,
            description: 'Apply S.C.A.P.E. to your problem!',
            activities: [
                {
                    id: 'w4p2-scape-builder',
                    type: 'creation',
                    title: '🛠️ S.C.A.P.E. Idea Builder',
                    description: 'Generate creative ideas!',
                    content: {
                        type: 'workshop',
                        steps: [
                            {
                                title: 'My Problem',
                                prompts: [
                                    { id: 'problem', type: 'textarea', label: 'Problem I want to solve:', emoji: '🎯' }
                                ]
                            },
                            {
                                title: 'S.C.A.P.E. Ideas',
                                prompts: [
                                    { id: 'substitute', type: 'textarea', label: 'S - Substitute: What can I replace?', emoji: '🔄' },
                                    { id: 'combine', type: 'textarea', label: 'C - Combine: What can I mix together?', emoji: '➕' },
                                    { id: 'adapt', type: 'textarea', label: 'A - Adapt: How can I change it for someone else?', emoji: '🔀' },
                                    { id: 'putToUse', type: 'textarea', label: 'P - Put to another use: How else can this be used?', emoji: '♻️' },
                                    { id: 'eliminate', type: 'textarea', label: 'E - Eliminate: What can I remove to simplify?', emoji: '✂️' }
                                ]
                            },
                            {
                                title: 'My Favorite Idea',
                                prompts: [
                                    { id: 'favorite', type: 'textarea', label: 'My best idea from S.C.A.P.E. is:', emoji: '⭐' },
                                    { id: 'drawing', type: 'drawing', label: 'Draw your creative idea!', emoji: '🎨' }
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        // POWER PATH 3: RANDOM CREATIVITY GAME
        {
            id: 'world4-path3',
            name: 'Mash-Up Machine',
            emoji: '🎲',
            duration: 15,
            description: 'Create wild idea combinations!',
            activities: [
                {
                    id: 'w4p3-mashup',
                    type: 'game',
                    title: '🎲 Idea Mash-Up Game',
                    description: 'Combine random things!',
                    content: {
                        type: 'mashup-game',
                        objects: ['Umbrella', 'Shoes', 'Backpack', 'Water bottle', 'Pencil', 'Notebook', 'Clock', 'Lamp'],
                        prompts: ['What if ___ could ___?', 'Combine ___ with ___ to make ___']
                    }
                }
            ]
        },
        // POWER PATH 4: IDEA SHOWCASE
        {
            id: 'world4-path4',
            name: 'Showcase Stage',
            emoji: '🎭',
            duration: 5,
            description: 'Share your creative ideas!',
            activities: [
                {
                    id: 'w4p4-share',
                    type: 'discussion',
                    title: '🎤 Share Your Idea',
                    description: 'Present your best idea!',
                    content: {
                        prompts: [
                            'My favorite S.C.A.P.E. idea is...',
                            'It would help people by...',
                            'The creative part is...'
                        ]
                    }
                }
            ]
        },
        // POWER PATH 5: BADGE & JOURNEY BOOK
        {
            id: 'world4-path5',
            name: 'Star Station',
            emoji: '🏅',
            duration: 5,
            description: 'Earn your Creativity Star badge!',
            activities: [
                {
                    id: 'w4p5-badge',
                    type: 'creation',
                    title: '🏅 Creativity Star Badge',
                    description: 'You\'re a creative genius!',
                    content: {
                        type: 'badge-generation',
                        badgeId: 'BADGE_W4_CREATIVITY',
                        message: 'Your imagination knows no limits! 🌟'
                    }
                },
                {
                    id: 'w4p5-journey-book',
                    type: 'creation',
                    title: '📔 Journey Book - Page 4',
                    description: 'Document your creative ideas!',
                    content: {
                        type: 'journey-book'
                    }
                }
            ]
        }
    ],
    journeyBookPage: {
        pageNumber: 4,
        title: 'My Creative Ideas',
        prompts: [
            'Problem I worked on',
            'My S.C.A.P.E. ideas',
            'My favorite creative idea',
            'Draw your invention!'
        ]
    },
    badge: {
        id: 'badge-creativity',
        name: 'Creativity Star',
        emoji: '🌟',
        image: '/images/idea-galaxy/creativity-badge.png'
    },
    homework: {
        title: 'Ten Ideas Challenge',
        description: 'Choose one small problem and generate 10 different ideas!',
        tasks: [
            'Pick one problem at home or school',
            'Use S.C.A.P.E. to generate 10 ideas',
            'Draw your favorite idea',
            'Ask a family member to pick their favorite',
            'Bring your idea poster next class!'
        ]
    }
};
