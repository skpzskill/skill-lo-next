// World 3: Customer Cove
// Framework: H.E.A.R.T. (Hear, Empathize, Ask, Reflect, Test-fit)
// Theme: Know Your Customer (Design Thinking)

import { LearningWorld } from './types';

export const customerCove: LearningWorld = {
    id: 'world-3',
    worldNumber: 3,
    name: 'Customer Cove',
    emoji: '❤️',
    theme: 'Know Your Customer',
    framework: 'H.E.A.R.T.',
    duration: 60,
    color: 'from-rose-500 to-pink-600',
    mascot: {
        name: 'Hari the Heart',
        emoji: '💗',
        description: 'Your guide to understanding what people really need!'
    },
    description: 'The most powerful tool in entrepreneurship - knowing your customer through empathy and deep listening!',
    objectives: [
        'Listen carefully to people\'s stories',
        'Understand how they feel',
        'Ask open-ended questions',
        'Match your idea to their real needs'
    ],
    learningOutcomes: [
        'Listen carefully to someone\'s story or difficulty',
        'Understand how the person feels and why',
        'Ask open-ended questions that reveal real needs',
        'Reflect on what the customer is actually trying to solve',
        'Check if their idea truly matches the customer\'s problem'
    ],
    skillsUnlocked: [
        { name: 'Empathy', icon: 'Heart', description: 'Feeling what others feel', color: 'text-pink-600 bg-pink-100 border-pink-200' },
        { name: 'Listening', icon: 'Ear', description: 'Paying full attention', color: 'text-purple-600 bg-purple-100 border-purple-200' },
        { name: 'Questioning', icon: 'HelpCircle', description: 'Asking the right questions', color: 'text-blue-600 bg-blue-100 border-blue-200' },
        { name: 'Understanding', icon: 'Brain', description: 'Reading between the lines', color: 'text-green-600 bg-green-100 border-green-200' }
    ],
    powerPaths: [
        // POWER PATH 1: HEAR - Listen to Stories
        {
            id: 'world3-path1',
            name: 'Listening Lagoon',
            emoji: '👂',
            duration: 12,
            description: 'Learn to really hear what people are saying!',
            activities: [
                {
                    id: 'w3p1-story',
                    type: 'story',
                    title: '📖 Rahul\'s Customer Discovery',
                    description: 'How Rahul learned to listen!',
                    content: {
                        narrative: `Rahul wanted to make a cool app for kids.
But instead of just building it, his teacher said:
"First, go talk to 5 kids and LISTEN to their problems."

Rahul was nervous, but he tried. He asked questions like:
"What makes school hard for you?"
"What do you wish existed?"

He discovered something surprising:
Kids didn't want a game app - they wanted help organizing homework!

Rahul learned the secret: HEAR first, build later.`,
                        keyPoints: [
                            'H - Hear: Listen without interrupting',
                            'Great ideas come from great listening',
                            'Customers know their problems best'
                        ]
                    }
                },
                {
                    id: 'w3p1-heart-framework',
                    type: 'comparison',
                    title: '❤️ The H.E.A.R.T. Framework',
                    description: 'Your customer understanding superpowers!',
                    content: {
                        type: 'table',
                        headers: ['Letter', 'Meaning', 'Kid-Friendly Definition'],
                        rows: [
                            ['H - Hear', 'Listen carefully', 'Pay attention without interrupting'],
                            ['E - Empathize', 'Feel their feelings', 'Imagine being in their shoes'],
                            ['A - Ask', 'Use open questions', 'Ask "Why?", "How?", "Tell me more"'],
                            ['R - Reflect', 'Think about needs', 'What do they really need?'],
                            ['T - Test-fit', 'Match your idea', 'Does your idea actually help?']
                        ]
                    }
                }
            ]
        },
        // POWER PATH 2: EMPATHIZE - Feel Their Feelings
        {
            id: 'world3-path2',
            name: 'Empathy Island',
            emoji: '🫂',
            duration: 15,
            description: 'Walk in your customer\'s shoes!',
            activities: [
                {
                    id: 'w3p2-roleplay',
                    type: 'game',
                    title: '🎭 Customer Role-Play',
                    description: 'Practice understanding feelings!',
                    content: {
                        type: 'roleplay',
                        scenarios: [
                            {
                                character: 'Tired Parent',
                                emoji: '😴',
                                problem: 'I work all day and then have to cook dinner. I\'m so exhausted!',
                                feelings: ['Tired', 'Stressed', 'Overwhelmed'],
                                questions: ['What takes the most time?', 'What would help you?', 'When do you feel most tired?']
                            },
                            {
                                character: 'Forgetful Student',
                                emoji: '🎒',
                                problem: 'I always forget my homework at home. My teacher gets upset!',
                                feelings: ['Embarrassed', 'Worried', 'Frustrated'],
                                questions: ['What do you forget most?', 'When does this happen?', 'What have you tried?']
                            },
                            {
                                character: 'Lonely Grandparent',
                                emoji: '👴',
                                problem: 'My grandchildren live far away. I miss seeing them!',
                                feelings: ['Lonely', 'Sad', 'Missing family'],
                                questions: ['How often do you talk?', 'What do you miss most?', 'What makes you happy?']
                            }
                        ]
                    }
                }
            ]
        },
        // POWER PATH 3: ASK - Great Questions
        {
            id: 'world3-path3',
            name: 'Question Quest',
            emoji: '❓',
            duration: 15,
            description: 'Learn to ask questions that reveal needs!',
            activities: [
                {
                    id: 'w3p3-interview',
                    type: 'creation',
                    title: '🎤 Customer Interview',
                    description: 'Create your interview questions!',
                    content: {
                        type: 'workshop',
                        steps: [
                            {
                                title: 'My Customer Interview',
                                prompts: [
                                    { id: 'customerType', type: 'text', label: 'Who am I interviewing?', emoji: '👤' },
                                    { id: 'problem', type: 'textarea', label: 'What problem are they facing?', emoji: '😤' },
                                    { id: 'question1', type: 'text', label: 'Question 1: Tell me about...', emoji: '1️⃣' },
                                    { id: 'question2', type: 'text', label: 'Question 2: How do you feel when...', emoji: '2️⃣' },
                                    { id: 'question3', type: 'text', label: 'Question 3: What would you wish...', emoji: '3️⃣' }
                                ]
                            },
                            {
                                title: 'Interview Answers',
                                prompts: [
                                    { id: 'answer1', type: 'textarea', label: 'What they said (Answer 1):', emoji: '💬' },
                                    { id: 'answer2', type: 'textarea', label: 'What they said (Answer 2):', emoji: '💬' },
                                    { id: 'insight', type: 'textarea', label: 'What I learned about their real need:', emoji: '💡' }
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        // POWER PATH 4: REFLECT & TEST-FIT
        {
            id: 'world3-path4',
            name: 'Reflection Reef',
            emoji: '🧠',
            duration: 10,
            description: 'Match your idea to real needs!',
            activities: [
                {
                    id: 'w3p4-testfit',
                    type: 'creation',
                    title: '🎯 Does My Idea Fit?',
                    description: 'Check if your idea truly helps!',
                    content: {
                        type: 'workshop',
                        steps: [
                            {
                                title: 'Test-Fit Your Idea',
                                prompts: [
                                    { id: 'myIdea', type: 'textarea', label: 'My idea is...', emoji: '💡' },
                                    { id: 'customerNeed', type: 'textarea', label: 'My customer really needs...', emoji: '❤️' },
                                    {
                                        id: 'doesFit',
                                        type: 'radio',
                                        label: 'Does my idea fit their need?',
                                        emoji: '🎯',
                                        options: ['Yes, perfectly!', 'Mostly, with some changes', 'Not really - I need to rethink']
                                    },
                                    { id: 'changes', type: 'textarea', label: 'Changes I will make:', emoji: '✏️' }
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        // POWER PATH 5: BADGE & JOURNEY BOOK
        {
            id: 'world3-path5',
            name: 'Heart Harbor',
            emoji: '🏅',
            duration: 8,
            description: 'Earn your Empathy Champion badge!',
            activities: [
                {
                    id: 'w3p5-badge',
                    type: 'creation',
                    title: '🏅 Empathy Champion Badge',
                    description: 'You understand customers!',
                    content: {
                        type: 'badge-generation',
                        badgeId: 'BADGE_W3_EMPATHY',
                        message: 'You\'ve mastered the art of understanding customers! ❤️'
                    }
                },
                {
                    id: 'w3p5-journey-book',
                    type: 'creation',
                    title: '📔 Journey Book - Page 3',
                    description: 'Document your customer discoveries!',
                    content: {
                        type: 'journey-book'
                    }
                }
            ]
        }
    ],
    journeyBookPage: {
        pageNumber: 3,
        title: 'Know Your Customer',
        prompts: [
            'Who did you interview?',
            'What problem did they share?',
            'How did it make them feel?',
            'What did you learn about their real need?',
            'Does your idea fit their need?'
        ]
    },
    badge: {
        id: 'badge-empathy',
        name: 'Empathy Champion',
        emoji: '❤️',
        image: '/images/customer-cove/empathy-badge.png'
    },
    homework: {
        title: 'Interview Someone at Home',
        description: 'Practice the H.E.A.R.T. framework with a family member!',
        tasks: [
            'Choose a parent, sibling, or neighbor',
            'Ask about a problem they face',
            'Listen without interrupting',
            'Write down their feelings',
            'Suggest one idea that might help'
        ]
    }
};
