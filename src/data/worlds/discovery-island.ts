// World 1: Discovery Island
// Framework: E.N.T.R.Y. (Empathize, Notice, Try, Reflect, Yourself)
// Theme: Introduction to Entrepreneurship

import { LearningWorld } from './types';

export const discoveryIsland: LearningWorld = {
    id: 'world-1',
    worldNumber: 1,
    name: 'Discovery Island',
    emoji: '🏝️',
    theme: 'Entrepreneurship Exploration',
    framework: 'E.N.T.R.Y.',
    duration: 60,
    color: 'from-blue-400 to-teal-400',
    mascot: {
        name: 'Eco the Elephant',
        emoji: '🐘',
        description: 'A wise guide who remembers everything about starting a business!'
    },
    description: 'Welcome to Discovery Island - where ordinary kids become extraordinary entrepreneurs!',
    objectives: [
        'What makes an entrepreneur special (Superpowers)',
        'The difference between Job Makers vs Takers',
        'How to create a simple business idea'
    ],
    learningOutcomes: [
        'Explain what an entrepreneur is in simple words',
        'Identify basic examples of entrepreneurship around them',
        'Understand the difference between a "job taker" and a "job maker"',
        'Begin to see themselves as problem solvers and idea creators'
    ],
    skillsUnlocked: [
        { name: 'Creativity', icon: 'Palette', description: 'Thinking outside the box', color: 'text-pink-600 bg-pink-100 border-pink-200' },
        { name: 'Problem-solving', icon: 'Search', description: 'Seeing opportunities', color: 'text-blue-600 bg-blue-100 border-blue-200' },
        { name: 'Clear Thinking', icon: 'Heart', description: 'Purpose driven thinking process', color: 'text-red-600 bg-red-100 border-red-200' },
        { name: 'Communication', icon: 'MessageCircle', description: 'Sharing ideas clearly', color: 'text-green-600 bg-green-100 border-green-200' },
        { name: 'Confidence', icon: 'Zap', description: 'Believing in yourself', color: 'text-amber-600 bg-amber-100 border-amber-200' }
    ],
    powerPaths: [
        // POWER PATH 1: THE KNOWLEDGE QUEST - Concepts & Tables
        {
            id: 'world1-path1',
            name: 'The Knowledge Quest',
            emoji: '🗺️',
            duration: 15,
            description: 'Learn the difference between Job Makers and Job Takers!',
            image: '/images/discovery-island/job-maker-vs-taker.png',
            activities: [
                {
                    id: 'w1p1-intro-story',
                    type: 'story',
                    title: '📖 Meet Aarav!',
                    description: 'A story about a boy who saw a problem...',
                    image: '/images/discovery-island/aarav-lemonade-stand.png',
                    content: {
                        narrative: `This is Aarav. 
He noticed his neighbors were hot and thirsty after working in the garden.
Instead of just watching, he decided to DO something.

He started a lemonade stand! 🍋`,
                        keyPoints: [
                            'Entrepreneurs SEE problems.',
                            'Entrepreneurs SOLVE problems.',
                            'Entrepreneurs TAKE ACTION.'
                        ]
                    }
                },
                {
                    id: 'w1p1-aarav-video',
                    type: 'video',
                    title: '🎥 Aarav\'s Lemonade Idea',
                    description: 'Watch how Aarav started his business!',
                    videoPlaceholder: true,
                    videoUrl: 'https://youtu.be/YTyGCC7b9kU',
                    image: '/images/discovery-island/aarav-lemonade-stand.png'
                },
                {
                    id: 'w1p1-job-maker-vs-taker',
                    type: 'comparison',
                    title: '⚖️ Job Maker vs Job Taker',
                    description: 'What is the difference?',
                    image: '/images/discovery-island/job-maker-vs-taker.png',
                    content: {
                        type: 'table',
                        headers: ['Characteristic', 'Job Taker (Employee)', 'Job Maker (Entrepreneur)'],
                        rows: [
                            ['Goal', 'To earn a salary', 'To solve problems & create value'],
                            ['Risk', 'Low risk (steady check)', 'High risk (no guarantee)'],
                            ['Responsibility', 'Follows instructions', 'Creates the instructions'],
                            ['Reward', 'Stable income', 'Unlimited potential & freedom']
                        ]
                    }
                },
                {
                    id: 'w1p1-balance-sheet',
                    type: 'comparison',
                    title: '📊 Entrepreneur\'s Check',
                    description: 'Pros vs Cons',
                    image: '/images/discovery-island/job-maker-vs-taker.png',
                    content: {
                        type: 'pros-cons',
                        headers: ['The Hard Stuff (Cons)', 'The Best Stuff (Pros)'],
                        rows: [
                            ['You might fail at first', 'You are your own boss'],
                            ['You work long hours', 'You can change the world'],
                            ['No guaranteed money', 'You make money from your ideas'],
                            ['It can be lonely', 'You build your own team']
                        ]
                    }
                }
            ]
        },
        // POWER PATH 2: SKILL LAB - Skills in Action
        {
            id: 'world1-path2',
            name: 'Skill Lab',
            emoji: '🧪',
            duration: 20,
            description: 'See how Aarav used his Superpowers!',
            image: '/images/discovery-island/aarav-lemonade-stand.png',
            activities: [
                {
                    id: 'w1p2-story-recap',
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
                    id: 'w1p2-mindmap',
                    type: 'game',
                    title: '🧠 E.N.T.R.Y. Framework',
                    description: 'How Aarav used E, N, T, R, Y!',
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
                    id: 'w1p2-trading-cards',
                    type: 'game',
                    title: '🎴 Entrepreneur Trading Cards',
                    description: 'Explore other kid heroes!',
                    image: '/images/discovery-island/kid-entrepreneurs.png',
                    content: {
                        entrepreneurs: [
                            {
                                id: 'mikaila',
                                name: 'Mikaila',
                                business: 'Me & The Bees',
                                emoji: '🐝',
                                color: 'from-amber-400 to-orange-500',
                                skill: 'Selling',
                                difficulty: 'Easy',
                                storyFrames: [
                                    'Mikaila was stung by two bees in one week! Ouch! 🐝',
                                    'Instead of being scared, she learned about bees and how they help nature. 🌻',
                                    'She created "Me & The Bees" lemonade to save them! 🍋'
                                ],
                                challenge: {
                                    text: 'Mikaila needs to price her lemonade. What is the best choice?',
                                    options: ['$100 (Too expensive!)', '$3.00 (Fair price)', 'Free (No money earned)'],
                                    correctIndex: 1,
                                    feedback: 'Great! $3 is a fair price that covers costs and makes profit.'
                                },
                                powerReward: 'Passion Power'
                            },
                            {
                                id: 'ryan',
                                name: 'Ryan',
                                business: 'Ryan\'s World',
                                emoji: '🎥',
                                color: 'from-red-500 to-pink-600',
                                skill: 'Marketing',
                                difficulty: 'Medium',
                                storyFrames: [
                                    'Ryan loved playing with toys more than anything. 🚗',
                                    'He asked his mom: "Why can\'t I be on YouTube?" 📹',
                                    'Now he shares his fun with millions of kids worldwide! 🌎'
                                ],
                                challenge: {
                                    text: 'Ryan wants to show a cool new toy. What should he do?',
                                    options: ['Hide it in a box', 'Make a fun video playing with it', 'Tell no one'],
                                    correctIndex: 1,
                                    feedback: 'Perfect! Videos help people SEE how fun the toy is.'
                                },
                                powerReward: 'Visibility Boost'
                            },
                            {
                                id: 'moziah',
                                name: 'Moziah',
                                business: 'Mo\'s Bows',
                                emoji: '🎀',
                                color: 'from-blue-500 to-indigo-600',
                                skill: 'Design',
                                difficulty: 'Hard',
                                storyFrames: [
                                    'Moziah couldn\'t find cool bow ties for kids. 👔',
                                    'He used his grandma\'s scrap fabric to make his own! 🧵',
                                    'Even the NBA stars started wearing his stylish creations! 🏀'
                                ],
                                challenge: {
                                    text: 'Moziah has leftover blue fabric. What should he make?',
                                    options: ['Throw it away', 'Design a "Limited Edition" Blue Bow', 'Give up'],
                                    correctIndex: 1,
                                    feedback: 'Genius! Using scraps for special items reduces waste and builds hype.'
                                },
                                powerReward: 'Style Icon'
                            }
                        ]
                    }
                }
            ]
        },
        // POWER PATH 3: THE INNOVATION WORKSHOP
        {
            id: 'world1-path3',
            name: 'The Innovation Lab',
            emoji: '💡',
            duration: 25,
            description: 'Create your OWN business idea!',
            image: '/images/discovery-island/kid-entrepreneurs.png',
            activities: [
                {
                    id: 'w1p3-workshop',
                    type: 'creation',
                    title: '📝 If I Were an Entrepreneur',
                    description: 'Imagine your own business!',
                    image: '/images/discovery-island/kid-entrepreneurs.png',
                    content: {
                        type: 'workshop',
                        steps: [
                            {
                                title: 'Part 1: The Basics',
                                timer: 10,
                                prompts: [
                                    { id: 'name', type: 'text', label: 'My name is...', emoji: '👤' },
                                    { id: 'problem', type: 'textarea', label: 'The problem I see around me is...', emoji: '🧐' },
                                    { id: 'idea', type: 'textarea', label: 'My idea to solve it is...', emoji: '💡' },
                                    { id: 'businessName', type: 'text', label: 'My business name would be...', emoji: '🏷️' },
                                    { id: 'help', type: 'textarea', label: 'I will help people by...', emoji: '🤝' }
                                ]
                            },
                            {
                                title: 'Part 2: Entrepreneur Superpowers',
                                prompts: [
                                    {
                                        id: 'superpower',
                                        type: 'radio',
                                        label: 'Which entrepreneur superpower is most important to you?',
                                        emoji: '⚡',
                                        options: ['Creativity', 'Courage', 'Problem-Solving', 'Teamwork', 'Learning']
                                    },
                                    { id: 'superpowerWhy', type: 'textarea', label: 'Explain your choice:', emoji: '❓' },
                                    { id: 'famous', type: 'text', label: 'Name one famous entrepreneur:', emoji: '🌟' },
                                    { id: 'famousCreated', type: 'text', label: 'What they created:', emoji: '🏗️' }
                                ]
                            },
                            {
                                title: 'Part 3: Reflection & Bonus',
                                prompts: [
                                    { id: 'learned', type: 'textarea', label: 'One thing you learned today:', emoji: '🧠' },
                                    { id: 'excited', type: 'textarea', label: 'What excites you most?', emoji: '😆' },
                                    { id: 'logo', type: 'drawing', label: 'Bonus: Draw your logo!', emoji: '🎨' }
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        // POWER PATH 4: CERTIFICATION SUMMIT
        {
            id: 'world1-path4',
            name: 'The Summit',
            emoji: '🏔️',
            duration: 5,
            description: 'Claim your official badge!',
            image: '/images/discovery-island/explorer-badge.png',
            activities: [
                {
                    id: 'w1p4-badge',
                    type: 'creation',
                    title: '🏅 Your Explorer Badge',
                    description: 'You earned it!',
                    image: '/images/discovery-island/explorer-badge.png',
                    content: {
                        type: 'badge-generation',
                        badgeId: 'BADGE_W1_EXPLORER',
                        message: 'Great job! You\'re thinking like an entrepreneur! 🚀'
                    }
                }
            ]
        },
        // POWER PATH 5: JOURNEY BOOK
        {
            id: 'world1-path5',
            name: 'My Journey Book',
            emoji: '📔',
            duration: 5,
            description: 'Review your adventure.',
            image: '/images/discovery-island/journey-book-cover.jpg',
            activities: [
                {
                    id: 'w1p5-journey-book',
                    type: 'creation',
                    title: '📔 View My Book',
                    description: 'See your story so far.',
                    content: {
                        type: 'journey-book'
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
