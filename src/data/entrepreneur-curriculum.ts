import { BookOpen, Gamepad2, Rocket, PlayCircle } from "lucide-react";

// Types for rich content
export interface WorksheetPrompt {
    id: string;
    label: string;
    placeholder: string;
    type: "text" | "textarea" | "checkbox" | "radio";
    options?: string[];
}

export interface QuizQuestion {
    id: string;
    question: string;
    type: "multiple-choice" | "open-ended" | "checkbox";
    options?: string[];
    correctAnswer?: string | string[];
}

export interface ConceptCard {
    term: string;
    definition: string;
    example: string;
    icon: string;
}

export interface Superpower {
    letter: string;
    word: string;
    description: string;
    color: string;
}

export interface StoryContent {
    title: string;
    narrative: string;
    teacherPrompts: string[];
    discussionQuestions: string[];
}

export interface ModuleContent {
    story?: StoryContent;
    worksheet?: {
        title: string;
        instructions: string;
        prompts: WorksheetPrompt[];
    };
    quiz?: {
        title: string;
        questions: QuizQuestion[];
    };
    video?: {
        description: string;
        keyPoints: string[];
        scriptPoints?: string[];
    };
    concepts?: {
        title: string;
        cards: ConceptCard[];
    };
    superpowers?: Superpower[];
    infographic?: {
        title: string;
        sections: {
            heading: string;
            content: string;
            icon?: string;
        }[];
    };
}

export interface SimulatorModule {
    id: string;
    title: string;
    type: "video" | "interactive" | "quiz" | "creation" | "story" | "concepts" | "worksheet" | "reflection" | "superpowers";
    duration: string;
    content?: ModuleContent;
}

export interface SimulatorSession {
    id: string;
    title: string;
    description: string;
    duration: string;
    theme?: string;
    objective?: string;
    learningOutcomes?: string[];
    modules: SimulatorModule[];
}

// E.N.T.R.Y Superpowers Framework
export const entrySuperpowers: Superpower[] = [
    {
        letter: "E",
        word: "Empathize",
        description: "Understand people's needs",
        color: "from-rose-500 to-pink-500"
    },
    {
        letter: "N",
        word: "Notice",
        description: "Observe opportunities around you",
        color: "from-amber-500 to-orange-500"
    },
    {
        letter: "T",
        word: "Try",
        description: "Take small steps to test your ideas",
        color: "from-emerald-500 to-teal-500"
    },
    {
        letter: "R",
        word: "Reflect",
        description: "Think about what you learned",
        color: "from-blue-500 to-indigo-500"
    },
    {
        letter: "Y",
        word: "Yourself",
        description: "Believe in your entrepreneurial potential",
        color: "from-purple-500 to-violet-500"
    }
];

// Hour 1: Introduction to Entrepreneurship - Full Content
// Hour 1: Introduction to Entrepreneurship - Teaching
const hour1Teaching: SimulatorSession = {
    id: "h1-teaching",
    title: "Hour 1: Knowledge Foundation",
    description: "Build your mental framework with core concepts. Learn what entrepreneurs are and the E.N.T.R.Y superpowers.",
    duration: "20 min",
    theme: "Foundation",
    objective: "Understand what entrepreneurship is and identify core superpowers.",
    learningOutcomes: [
        "Explain what an entrepreneur is in simple words",
        "Understand the E.N.T.R.Y superpowers framework"
    ],
    modules: [
        {
            id: "h1-m1",
            title: "🎯 Welcome & Icebreaker",
            type: "video",
            duration: "5 min",
            content: {
                video: {
                    description: "Introduction to the entrepreneurship journey with an engaging icebreaker activity",
                    keyPoints: [
                        "Welcome! An entrepreneur sees a problem and says, 'I can solve that!'",
                        "Entrepreneurs are like inventors, helpers, and dreamers all in one!"
                    ]
                },
                infographic: {
                    title: "What is an Entrepreneur?",
                    sections: [
                        { heading: "🔍 Problem Spotter", content: "Sees problems others miss", icon: "search" },
                        { heading: "💡 Idea Creator", content: "Thinks of creative solutions", icon: "lightbulb" },
                        { heading: "🚀 Action Taker", content: "Makes ideas happen!", icon: "rocket" }
                    ]
                }
            }
        },
        {
            id: "h1-m3",
            title: "🧩 Key Concepts",
            type: "concepts",
            duration: "10 min",
            content: {
                concepts: {
                    title: "Understanding Entrepreneurship",
                    cards: [
                        {
                            term: "Entrepreneur",
                            definition: "A person who starts something new to solve a problem or help people",
                            example: "The kid who made a recycled toy or started a bake sale",
                            icon: "🦸"
                        },
                        {
                            term: "Business",
                            definition: "A way to share your product or service and earn money",
                            example: "Lemonade stand, online craft shop",
                            icon: "🏪"
                        },
                        {
                            term: "Innovation",
                            definition: "Thinking of new or better ways to do things",
                            example: "Solar lamp made from waste bottles",
                            icon: "💡"
                        },
                        {
                            term: "Risk-taking",
                            definition: "Trying something even if you're not sure it'll work",
                            example: "Trying a new idea for a school project",
                            icon: "🎯"
                        }
                    ]
                },
                infographic: {
                    title: "Job Taker vs Job Maker",
                    sections: [
                        { heading: "👔 Job Taker", content: "Works for someone else's business", icon: "briefcase" },
                        { heading: "🚀 Job Maker", content: "Creates their own business and jobs for others!", icon: "rocket" }
                    ]
                }
            }
        },
        {
            id: "h1-m4",
            title: "💪 E.N.T.R.Y Superpowers",
            type: "superpowers",
            duration: "5 min",
            content: {
                superpowers: entrySuperpowers,
                infographic: {
                    title: "Your Entrepreneur Superpowers",
                    sections: [
                        { heading: "E - Empathize", content: "Understand people's needs", icon: "heart" },
                        { heading: "N - Notice", content: "Observe opportunities around you", icon: "eye" },
                        { heading: "T - Try", content: "Take small steps to test your ideas", icon: "footprints" },
                        { heading: "R - Reflect", content: "Think about what you learned", icon: "brain" },
                        { heading: "Y - Yourself", content: "Believe in your potential", icon: "star" }
                    ]
                }
            }
        }
    ]
};

// Hour 1: Introduction to Entrepreneurship - Activity
const hour1Activity: SimulatorSession = {
    id: "h1-activity",
    title: "Hour 1: Hands-on Practice",
    description: "Apply your knowledge! Dive into Aarav's story and design your first business idea.",
    duration: "25 min",
    theme: "Practical",
    objective: "Identify examples of entrepreneurship and brainstorm a personal business idea.",
    learningOutcomes: [
        "Identify basic examples of entrepreneurship around them",
        "Begin to see themselves as problem solvers and idea creators"
    ],
    modules: [
        {
            id: "h1-m2",
            title: "📖 Story: Aarav's Lemon Stand",
            type: "story",
            duration: "10 min",
            content: {
                story: {
                    title: "Aarav's Lemon Stand",
                    narrative: `Aarav loved making lemonade on hot days. He noticed people in his neighborhood often felt tired coming home from work. He thought, "What if I set up a small stand?"\n\nAarav didn't just sell lemonade — he saw a problem and created a solution! That's entrepreneurship.`,
                    teacherPrompts: [
                        "What problem did Aarav notice?",
                        "How did he turn his idea into action?"
                    ],
                    discussionQuestions: [
                        "What problem did Aarav solve?",
                        "What skills did Aarav show?"
                    ]
                },
                infographic: {
                    title: "Aarav's Journey",
                    sections: [
                        { heading: "Step 1: Notice", content: "Tired neighbors need refreshment.", icon: "eye" },
                        { heading: "Step 2: Act", content: "Set up a sign and sell lemonade.", icon: "rocket" },
                        { heading: "Step 3: Grow", content: "Use earnings to buy more supplies.", icon: "smile" }
                    ]
                }
            }
        },
        {
            id: "h1-m5",
            title: "✍️ Design Your Business",
            type: "worksheet",
            duration: "15 min",
            content: {
                worksheet: {
                    title: "If I Were an Entrepreneur",
                    instructions: "Imagine yourself as an entrepreneur! Fill in the blanks to design your very own business idea.",
                    prompts: [
                        { id: "problem", label: "The problem I see is", placeholder: "e.g. Too much plastic waste", type: "textarea" },
                        { id: "solution", label: "My idea to solve it is", placeholder: "e.g. Edible water bottles", type: "textarea" },
                        { id: "business-name", label: "My business name would be", placeholder: "Create a cool name", type: "text" }
                    ]
                },
                infographic: {
                    title: "Your First Concept",
                    sections: [
                        { heading: "🌟 The Problem", content: "Start with a real need.", icon: "search" },
                        { heading: "💡 The Solution", content: "Focus on how you help.", icon: "lightbulb" },
                        { heading: "🚀 The Action", content: "Give it a name and start!", icon: "rocket" }
                    ]
                }
            }
        }
    ]
};

// Hour 1: Introduction to Entrepreneurship - Project
const hour1Project: SimulatorSession = {
    id: "h1-project",
    title: "Hour 1: Portfolio Milestone",
    description: "Reflect on your learning and take on a real-world mission.",
    duration: "15 min",
    theme: "Milestone",
    objective: "Consolidate learning and engage with the community.",
    learningOutcomes: [
        "Synthesize what was learned about entrepreneurship",
        "Engage with real-world entrepreneurs"
    ],
    modules: [
        {
            id: "h1-m6",
            title: "🌟 Reflection & Quiz",
            type: "reflection",
            duration: "10 min",
            content: {
                quiz: {
                    title: "Reflection Time",
                    questions: [
                        { id: "q1", question: "Which entrepreneur superpower is most important to you?", type: "multiple-choice", options: ["Creativity", "Courage", "Problem-Solving", "Teamwork", "Learning"] },
                        { id: "q4", question: "What is one thing you learned about entrepreneurship today?", type: "open-ended" }
                    ]
                },
                infographic: {
                    title: "Key Takeaways",
                    sections: [
                        { heading: "✨ Remember", content: "Entrepreneurs are problem solvers", icon: "lightbulb" },
                        { heading: "🌟 Believe", content: "Anyone — even YOU — can be one!", icon: "star" }
                    ]
                }
            }
        },
        {
            id: "h1-m7",
            title: "🏠 Homework Challenge",
            type: "interactive",
            duration: "5 min",
            content: {
                infographic: {
                    title: "Your Mission!",
                    sections: [
                        { heading: "🔍 Find", content: "One entrepreneur in your family or community", icon: "search" },
                        { heading: "❓ Ask Them", content: "Why did they start it?", icon: "message" },
                        { heading: "💡 Discover", content: "What problem are they solving?", icon: "lightbulb" }
                    ]
                },
                worksheet: {
                    title: "Homework Interview",
                    instructions: "Interview an entrepreneur you know and bring your answers to the next class!",
                    prompts: [
                        { id: "entrepreneur-name", label: "Entrepreneur's name", placeholder: "Who did you interview?", type: "text" },
                        { id: "what-they-do", label: "What do they do?", placeholder: "Describe their business", type: "textarea" }
                    ]
                }
            }
        }
    ]
};

export const entrepreneurCurriculum: {
    teaching: SimulatorSession[];
    activity: SimulatorSession[];
    projects: SimulatorSession[];
} = {
    teaching: [
        hour1Teaching,
        ...Array.from({ length: 19 }, (_, i) => {
            const idx = i + 1;
            const title = [
                "Identifying Problems",
                "Sparking Ideas",
                "Understanding Needs",
                "The Solution",
                "Market Research",
                "Customer Personas",
                "Value Proposition",
                "Business Models",
                "Revenue Streams",
                "Cost Structure",
                "Competitor Analysis",
                "Branding Basics",
                "Marketing 101",
                "Sales Funnel",
                "Team Building",
                "Leadership Skills",
                "Financial Basics",
                "Pitching Your Idea",
                "Launch Day Prep"
            ][i];

            return {
                id: `teach-${idx + 1}`,
                title: `Session ${idx + 1}: ${title}`,
                description: "Learn the core concepts of building a startup.",
                duration: "20 min",
                modules: [
                    { id: `m1-${idx}`, title: "Video Intro", type: "video" as const, duration: "5 min" },
                    { id: `m2-${idx}`, title: "Core Concept", type: "interactive" as const, duration: "10 min" },
                    { id: `m3-${idx}`, title: "Quick Quiz", type: "quiz" as const, duration: "5 min" }
                ]
            };
        })
    ],
    activity: [
        hour1Activity,
        ...Array.from({ length: 19 }, (_, i) => ({
            id: `act-${i + 2}`,
            title: `Activity ${i + 2}: ${[
                "Spot the Problem",
                "Brainstorm Blast",
                "Empathy Map",
                "Idea Sketch",
                "Feature Sort",
                "Survey Maker",
                "Persona Builder",
                "Value Canvas",
                "Model Match",
                "Price It Right",
                "Budget Balancer",
                "Competitor Spy",
                "Logo Maker",
                "Ad Creator",
                "Sales Roleplay",
                "Team Roles",
                "Leadership Sim",
                "Profit Calculator",
                "Pitch Deck Builder"
            ][i]
                }`,
            description: "Put your knowledge into action with hands-on tasks.",
            duration: "30 min",
            modules: [
                { id: `m1-${i}`, title: "Instruction", type: "video" as const, duration: "5 min" },
                { id: `m2-${i}`, title: "Hands-on Activity", type: "creation" as const, duration: "20 min" },
                { id: `m3-${i}`, title: "Reflection", type: "quiz" as const, duration: "5 min" }
            ]
        }))
    ],
    projects: [
        hour1Project,
        ...Array.from({ length: 7 }, (_, i) => ({
            id: `proj-${i + 2}`,
            title: `Project ${i + 2}: ${[
                "Problem-Solution Fit",
                "Market Validation",
                "The Business Model",
                "Prototype v1",
                "Brand Identity",
                "Marketing Plan",
                "Financial Plan"
            ][i]
                }`,
            description: "Major milestones in your startup journey.",
            duration: "45 min",
            modules: [
                { id: `m1-${i}`, title: "Project Brief", type: "video" as const, duration: "5 min" },
                { id: `m2-${i}`, title: "Guided Work", type: "creation" as const, duration: "35 min" },
                { id: `m3-${i}`, title: "Submission", type: "interactive" as const, duration: "5 min" }
            ]
        }))
    ]
};
