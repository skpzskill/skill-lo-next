import { Lightbulb, DollarSign, Rocket, Clock, Users, Award, CheckCircle, Star, TrendingUp, Brain } from 'lucide-react';

export const courses = [
    {
        id: 'design-thinking',
        title: 'Design Thinking for Young Minds',
        shortDescription: 'Master creative problem-solving and innovation skills',
        description: 'Design Thinking is a human-centered approach to innovation that draws from the designer\'s toolkit to integrate the needs of people, the possibilities of technology, and the requirements for business success. In this comprehensive 25-week program, students learn to approach challenges with empathy, define problems clearly, ideate creative solutions, prototype rapidly, and test their ideas in real-world contexts.',
        icon: Lightbulb,
        duration: '25 Weeks',
        ageGroup: '10-16 years',
        batchSize: '12 students',
        skills: ['Creative Problem Solving', 'Empathy Mapping', 'Prototyping', 'User Research', 'Iteration'],
        curriculum: [
            'Understanding Human-Centered Design',
            'Empathy and User Research Techniques',
            'Defining Problems and Opportunities',
            'Ideation and Brainstorming Methods',
            'Rapid Prototyping Techniques',
            'Testing and Iteration Processes',
            'Real-World Design Challenges',
            'Final Capstone Project'
        ],
        outcomes: [
            'Develop a systematic approach to solving complex problems',
            'Build empathy and understand diverse perspectives',
            'Create and test prototypes for real-world challenges',
            'Present ideas confidently to peers and mentors',
            'Complete a portfolio of design thinking projects'
        ]
    },
    {
        id: 'financial-literacy',
        title: 'Financial Literacy Fundamentals',
        shortDescription: 'Master money management and financial planning',
        description: 'Financial literacy is one of the most crucial life skills that traditional education often overlooks. This 25-week program transforms complex financial concepts into engaging, age-appropriate lessons that stick. Students learn everything from basic budgeting and saving to understanding investments, entrepreneurship financing, and the psychology of money.',
        icon: DollarSign,
        duration: '25 Weeks',
        ageGroup: '12-18 years',
        batchSize: '12 students',
        skills: ['Budgeting', 'Saving Strategies', 'Investment Basics', 'Business Finance', 'Money Psychology'],
        curriculum: [
            'Understanding Money and Its Value',
            'Budgeting and Expense Tracking',
            'Smart Saving Strategies',
            'Introduction to Banking and Interest',
            'Investment Fundamentals',
            'Entrepreneurship and Business Finance',
            'Digital Money and Fintech',
            'Financial Decision Making'
        ],
        outcomes: [
            'Create and maintain personal budgets',
            'Understand saving and compound interest',
            'Make informed financial decisions',
            'Recognize investment opportunities',
            'Plan for short and long-term financial goals'
        ]
    },
    {
        id: 'entrepreneurship',
        title: 'Entrepreneurship & Startup Skills',
        shortDescription: 'Build business acumen and entrepreneurial mindset',
        description: 'Entrepreneurship is not just about starting businesses—it\'s a mindset that combines creativity, resilience, and strategic thinking. This comprehensive 25-week program takes students through the complete journey of building a venture, from identifying opportunities to pitching to investors. Students work on real micro-business projects and learn from successful entrepreneurs.',
        icon: Rocket,
        duration: '25 Weeks',
        ageGroup: '12-18 years',
        batchSize: '12 students',
        skills: ['Business Planning', 'Market Research', 'Pitch Presentation', 'Team Leadership', 'Growth Strategy'],
        curriculum: [
            'The Entrepreneurial Mindset',
            'Identifying Problems and Opportunities',
            'Market Research and Customer Discovery',
            'Business Model Development',
            'Product Development and MVP',
            'Marketing and Sales Fundamentals',
            'Team Building and Leadership',
            'Pitching and Fundraising Basics'
        ],
        outcomes: [
            'Develop and validate business ideas',
            'Create comprehensive business plans',
            'Conduct effective market research',
            'Build and lead small teams',
            'Present pitches to mock investors'
        ]
    },
    {
        id: 'ai-skills',
        title: 'AI Skills',
        shortDescription: 'Explore AI and machine learning through hands-on projects',
        description: 'Our AI Skills program introduces children to the fascinating world of artificial intelligence. Through age-appropriate projects and activities, kids learn how AI works, build simple AI applications, and understand how to use AI tools responsibly and creatively.',
        icon: Brain,
        duration: '25 Weeks',
        ageGroup: '10-16 years',
        batchSize: '12 students',
        skills: ['AI fundamentals', 'Machine learning basics', 'AI tools', 'Ethical AI'],
        curriculum: [
            "What is AI and how does it work?",
            "Machine learning basics",
            "Building simple AI projects",
            "Using AI tools creatively",
            "Ethics and responsible AI use",
            "Future of AI and careers"
        ],
        outcomes: [
            'Understand AI basics and concepts',
            'Build and train simple AI models',
            'Use AI tools for creative projects',
            'Understand ethical implications of AI',
            'Explore future career paths in AI'
        ]
    }
];

export const programsData = {
    "design-thinking": {
        ...courses[0],
        format: "Interactive workshops and projects",
        pricing: {
            enterprise: "₹15,000",
            parents: "₹12,000"
        },
        fullDescription: courses[0].description // Mapping for consistency
    },
    "financial-literacy": {
        ...courses[1],
        icon: TrendingUp, // Override/Ensure icon matches if needed, though DollarSign vs TrendingUp was inconsistent in previous files
        format: "Games, simulations, and activities",
        pricing: {
            enterprise: "₹15,000",
            parents: "₹12,000"
        },
        fullDescription: courses[1].description
    },
    "entrepreneurship": {
        ...courses[2],
        format: "Project-based learning with real business launch",
        pricing: {
            enterprise: "₹18,000",
            parents: "₹15,000"
        },
        fullDescription: courses[2].description
    },
    "ai-skills": {
        id: "ai-skills",
        title: "AI Skills",
        icon: Brain,
        description: "Explore artificial intelligence and machine learning concepts through hands-on projects. Learn how AI works, build simple AI applications, and understand how to use AI tools responsibly and creatively.",
        skills: ["AI fundamentals", "Machine learning basics", "AI tools", "Ethical AI"],
        fullDescription: "Our AI Skills program introduces children to the fascinating world of artificial intelligence. Through age-appropriate projects and activities, kids learn how AI works and how to use it responsibly.",
        curriculum: [
            "What is AI and how does it work?",
            "Machine learning basics",
            "Building simple AI projects",
            "Using AI tools creatively",
            "Ethics and responsible AI use",
            "Future of AI and careers"
        ],
        ageGroup: "Ages 10-16",
        duration: "25 weeks",
        format: "Hands-on projects and experiments",
        pricing: {
            enterprise: "₹18,000",
            parents: "₹15,000"
        },
        batchSize: '12 students', // Defaulting
        outcomes: ['Understand AI basics', 'Build simple models', 'Ethical usage'] // Defaulting
    }
};

export const testimonials = [
    {
        quote: 'My daughter has completely transformed after joining the Design Thinking program. She now approaches every problem with curiosity instead of frustration.',
        author: 'Priya Sharma',
        role: 'Parent, Mumbai',
        rating: 5
    },
    {
        quote: 'The Financial Literacy course taught my son more about money in 6 months than I learned in 20 years. He now saves 30% of his pocket money!',
        author: 'Rajesh Kumar',
        role: 'Parent, Delhi',
        rating: 5
    },
    {
        quote: 'As a school principal, partnering with SkillPreneurZ was the best decision we made. Our students are now more confident and creative.',
        author: 'Dr. Meena Iyer',
        role: 'Principal, Bangalore',
        rating: 5
    }
];

export const faqs = [
    {
        question: 'How are SkillPreneurZ courses delivered?',
        answer: 'Our courses are delivered through a blend of online and offline sessions, depending on your preference. Live interactive sessions, hands-on projects, and self-paced learning modules ensure comprehensive skill development.'
    },
    {
        question: 'What is the class size and student-to-teacher ratio?',
        answer: 'We maintain small batch sizes of maximum 12 students per class to ensure personalized attention. Our student-to-teacher ratio is designed to maximize individual learning outcomes.'
    },
    {
        question: 'Are there any prerequisites for enrolling?',
        answer: 'No specific prerequisites are required. Our courses are designed for beginners and we assess each student to place them in age-appropriate batches.'
    },
    {
        question: 'Can I try before committing to a full program?',
        answer: 'Yes! We offer free trial sessions where your child can experience our teaching methodology and interact with our instructors before enrollment.'
    }
];
