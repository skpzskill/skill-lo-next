import { SimulatorType } from "../ChildMode";

export type AgeBand = "8-10" | "11-13" | "14-16";

export interface ChoiceOption {
  label: string;
  value: string;
}

export interface SimulatorState {
  currentState: string;
  ageBand: AgeBand | null;
  data: Record<string, any>;
  messagesCount: number;
  completed: boolean;
  badgeEarned: string | null;
}

export interface StateHandler {
  getBotMessage: (state: SimulatorState) => string;
  getChoices?: (state: SimulatorState) => ChoiceOption[] | null;
  processInput: (input: string, state: SimulatorState) => { nextState: string; data?: Record<string, any> };
  isEnd?: boolean;
}

// Helper to get age band
export const getAgeBand = (age: number): AgeBand | null => {
  if (age >= 8 && age <= 10) return "8-10";
  if (age >= 11 && age <= 13) return "11-13";
  if (age >= 14 && age <= 16) return "14-16";
  return null;
};

// Helper to adjust language by age
export const adjustForAge = (ageBand: AgeBand | null, simple: string, medium: string, advanced: string): string => {
  if (!ageBand || ageBand === "8-10") return simple;
  if (ageBand === "11-13") return medium;
  return advanced;
};

// =====================================================
// ENTREPRENEURSHIP SIMULATOR
// =====================================================
export const entrepreneurshipStates: Record<string, StateHandler> = {
  GREETING: {
    getBotMessage: () => "Hi! I'm BizBuddy, your business game friend! 🚀 Let's create a tiny business together. First, how old are you?",
    getChoices: () => [
      { label: "8 years", value: "8" },
      { label: "9 years", value: "9" },
      { label: "10 years", value: "10" },
      { label: "11 years", value: "11" },
      { label: "12 years", value: "12" },
      { label: "13 years", value: "13" },
      { label: "14 years", value: "14" },
      { label: "15 years", value: "15" },
      { label: "16 years", value: "16" }
    ],
    processInput: (input, state) => {
      const age = parseInt(input.trim());
      if (!isNaN(age) && age >= 8 && age <= 16) {
        return { nextState: "SCENARIO_CHOICE", data: { age, ageBand: getAgeBand(age) } };
      }
      return { nextState: "GREETING", data: { retryAge: true } };
    }
  },
  SCENARIO_CHOICE: {
    getBotMessage: (state) => {
      if (state.data.retryAge) {
        return "Oops! Please pick your age! 😊";
      }
      return adjustForAge(state.ageBand,
        "Awesome! 🎉 Now pick what sounds fun:",
        "Great! Let's pick a business type:",
        "Perfect! Choose your business direction:"
      );
    },
    getChoices: () => [
      { label: "🛍️ Sell something", value: "1" },
      { label: "🏫 Solve a school problem", value: "2" },
      { label: "🌍 Help your community", value: "3" }
    ],
    processInput: (input) => {
      const choice = input.trim();
      if (["1", "2", "3"].includes(choice)) {
        const scenarios = { "1": "sell", "2": "school", "3": "community" };
        return { nextState: "PROBLEM_EXPLORATION", data: { scenarioType: scenarios[choice as "1"|"2"|"3"] } };
      }
      return { nextState: "SCENARIO_CHOICE", data: { retry: true } };
    }
  },
  PROBLEM_EXPLORATION: {
    getBotMessage: (state) => {
      const type = state.data.scenarioType;
      if (type === "sell") {
        return "Cool choice! 🏪 What would you like to sell?";
      }
      if (type === "school") {
        return "Smart choice! 🏫 What's a problem you notice at school?";
      }
      return "Wonderful! 🌍 What's something in your community that could be better?";
    },
    getChoices: (state) => {
      const type = state.data.scenarioType;
      if (type === "sell") {
        return [
          { label: "🍪 Homemade snacks", value: "Homemade snacks like cookies" },
          { label: "🎨 Art and drawings", value: "Art and drawings" },
          { label: "🧶 Handmade crafts", value: "Handmade crafts" },
          { label: "📱 Tech help for elders", value: "Tech help for elderly" }
        ];
      }
      if (type === "school") {
        return [
          { label: "📚 Heavy backpacks", value: "Kids carry too many heavy books" },
          { label: "⏰ Long lunch lines", value: "Lunch lines are too long" },
          { label: "🔍 Lost items", value: "Students lose things easily" },
          { label: "😴 Boring breaks", value: "Breaks are boring" }
        ];
      }
      return [
        { label: "🌱 Dirty parks", value: "Parks need cleaning" },
        { label: "🐕 Stray animals", value: "Stray animals need care" },
        { label: "👴 Lonely elderly", value: "Elderly people are lonely" },
        { label: "📖 Kids need tutoring", value: "Kids need help with studies" }
      ];
    },
    processInput: (input, state) => {
      return { nextState: "IDEA_GENERATION", data: { problem: input.trim() } };
    }
  },
  IDEA_GENERATION: {
    getBotMessage: (state) => {
      return adjustForAge(state.ageBand,
        `I love it! "${state.data.problem}" is a real problem! 💡 What's your idea to fix this?`,
        `Great observation! "${state.data.problem}" sounds worth solving. 💡 What solution could you create?`,
        `Excellent problem identification! "${state.data.problem}" has real potential. 💡 What value can you provide?`
      );
    },
    getChoices: (state) => {
      const problem = state.data.problem?.toLowerCase() || "";
      if (problem.includes("snack") || problem.includes("cookie")) {
        return [
          { label: "🏪 Start a snack stall", value: "Start a small snack stall at school" },
          { label: "📦 Subscription boxes", value: "Weekly snack subscription boxes" },
          { label: "🎁 Party snack packages", value: "Special party snack packages" }
        ];
      }
      if (problem.includes("book") || problem.includes("heavy")) {
        return [
          { label: "📱 Digital textbook app", value: "Digital textbook sharing app" },
          { label: "🎒 Locker rental service", value: "School locker rental service" },
          { label: "📚 Book sharing system", value: "Book sharing between students" }
        ];
      }
      return [
        { label: "🏠 Home-based service", value: "Start a simple service from home" },
        { label: "👥 Team project", value: "Create a team to solve this together" },
        { label: "📲 Simple app idea", value: "Create a simple app or website" }
      ];
    },
    processInput: (input) => {
      return { nextState: "CUSTOMER_SIMULATION", data: { idea: input.trim() } };
    }
  },
  CUSTOMER_SIMULATION: {
    getBotMessage: (state) => {
      return adjustForAge(state.ageBand,
        `"${state.data.idea}" sounds cool! 🛒 I'm a customer now. Why should I buy from you?`,
        `Interesting idea: "${state.data.idea}"! 🛒 Let's role-play. Why should I choose your solution?`,
        `"${state.data.idea}" - let's test this. 🛒 I'm your target customer. Give me your pitch!`
      );
    },
    getChoices: () => [
      { label: "💰 It's affordable", value: "It's cheaper than other options" },
      { label: "⭐ Better quality", value: "The quality is much better" },
      { label: "❤️ Made with love", value: "It's made with care and love" },
      { label: "🌿 Eco-friendly", value: "It's good for the environment" }
    ],
    processInput: (input) => {
      return { nextState: "MONEY_CALCULATION", data: { pitch: input.trim() } };
    }
  },
  MONEY_CALCULATION: {
    getBotMessage: (state) => {
      return adjustForAge(state.ageBand,
        "Great pitch! 💰 Let's do some fun math!\n\nImagine each person pays ₹10 and 20 people buy.\nHow much money comes in total?",
        "Nice selling! 💰 Time for business math:\n\nIf each customer pays ₹10 and you get 20 customers, what's your total revenue?",
        "Solid value proposition! 💰 Let's calculate:\n\nAt ₹10 per unit with 20 customers, what's your gross revenue?"
      );
    },
    getChoices: () => [
      { label: "₹100", value: "100" },
      { label: "₹150", value: "150" },
      { label: "₹200", value: "200" },
      { label: "₹250", value: "250" }
    ],
    processInput: (input) => {
      const answer = parseInt(input.replace(/[^0-9]/g, ''));
      const correct = answer === 200;
      return { nextState: "PROFIT_CALCULATION", data: { revenueAnswer: answer, revenueCorrect: correct } };
    }
  },
  PROFIT_CALCULATION: {
    getBotMessage: (state) => {
      const feedback = state.data.revenueCorrect 
        ? "Exactly right! ₹200! 🎉" 
        : "The answer is ₹200 (₹10 × 20 = ₹200). That's your revenue! 😊";
      
      return adjustForAge(state.ageBand,
        `${feedback}\n\nNow, suppose it costs ₹120 to make everything. What's your profit?\n(Hint: Profit = Money In - Money Out)`,
        `${feedback}\n\nNow for profit calculation: If your costs are ₹120, what's your profit?`,
        `${feedback}\n\nProfit analysis: With ₹120 in operational costs, calculate your net profit.`
      );
    },
    getChoices: () => [
      { label: "₹60", value: "60" },
      { label: "₹80", value: "80" },
      { label: "₹100", value: "100" },
      { label: "₹120", value: "120" }
    ],
    processInput: (input) => {
      const answer = parseInt(input.replace(/[^0-9]/g, ''));
      const correct = answer === 80;
      return { nextState: "PREFERENCE_REFLECTION", data: { profitAnswer: answer, profitCorrect: correct } };
    }
  },
  PREFERENCE_REFLECTION: {
    getBotMessage: (state) => {
      const feedback = state.data.profitCorrect 
        ? "You got it! ₹80 profit! 🌟" 
        : "The profit is ₹80 (₹200 - ₹120 = ₹80). You just calculated your first profit! 🌟";
      
      return `${feedback}\n\nOne more question! Which part did you enjoy MOST?`;
    },
    getChoices: () => [
      { label: "💡 Thinking of ideas", value: "1" },
      { label: "🗣️ Talking to customers", value: "2" },
      { label: "🔢 Playing with numbers", value: "3" }
    ],
    processInput: (input) => {
      const prefs = { "1": "ideation", "2": "sales", "3": "finance" };
      const pref = prefs[input.trim() as "1"|"2"|"3"] || "ideation";
      return { nextState: "SUMMARY", data: { preference: pref } };
    }
  },
  SUMMARY: {
    getBotMessage: (state) => {
      const prefMessages = {
        ideation: "You love coming up with ideas - you're a natural innovator! 💡",
        sales: "You enjoy connecting with people - you're a born salesperson! 🤝",
        finance: "You like working with numbers - you're a future financial whiz! 📊"
      };
      
      return `🎊 AMAZING JOB! Here's what you accomplished:\n\n📌 Problem: ${state.data.problem}\n💡 Your Idea: ${state.data.idea}\n💰 You calculated: ₹80 profit!\n⭐ Your strength: ${prefMessages[state.data.preference as keyof typeof prefMessages]}\n\n🏅 YOU EARNED THE "MINI FOUNDER" BADGE! 🏅`;
    },
    processInput: () => ({ nextState: "COMPLETE" }),
    isEnd: true
  }
};

// =====================================================
// AI LITERACY SIMULATOR
// =====================================================
export const aiLiteracyStates: Record<string, StateHandler> = {
  GREETING: {
    getBotMessage: () => "Hello, future AI explorer! 🤖 I'm PatternPal, your AI-thinking coach! Let's discover how computers learn to think. First, how old are you?",
    getChoices: () => [
      { label: "8 years", value: "8" },
      { label: "9 years", value: "9" },
      { label: "10 years", value: "10" },
      { label: "11 years", value: "11" },
      { label: "12 years", value: "12" },
      { label: "13 years", value: "13" },
      { label: "14 years", value: "14" },
      { label: "15 years", value: "15" },
      { label: "16 years", value: "16" }
    ],
    processInput: (input) => {
      const age = parseInt(input.trim());
      if (!isNaN(age) && age >= 8 && age <= 16) {
        return { nextState: "RULES_EXPLAIN", data: { age, ageBand: getAgeBand(age) } };
      }
      return { nextState: "GREETING", data: { retryAge: true } };
    }
  },
  RULES_EXPLAIN: {
    getBotMessage: (state) => {
      if (state.data.retryAge) {
        return "Please pick your age! 🤖";
      }
      return adjustForAge(state.ageBand,
        "Awesome! 🧠 AI is like a super smart helper that finds patterns - just like how you notice that all dogs bark! We'll play 3 quick games. Ready?",
        "Great! 🧠 AI works by finding patterns in data and making predictions. We'll do 3 challenges. Ready to start?",
        "Perfect! 🧠 AI systems identify patterns, classify data, and make predictions. Let's explore through 3 exercises. Ready?"
      );
    },
    getChoices: () => [
      { label: "✅ Yes, let's go!", value: "yes" },
      { label: "🤔 Tell me more first", value: "more" }
    ],
    processInput: (input) => {
      if (input.toLowerCase().includes("more")) {
        return { nextState: "RULES_EXPLAIN", data: { moreInfo: true } };
      }
      return { nextState: "TASK_GROUPING" };
    }
  },
  TASK_GROUPING: {
    getBotMessage: (state) => {
      return adjustForAge(state.ageBand,
        "🎮 GAME 1: Grouping!\n\nLook at these: Apple 🍎, Burger 🍔, Banana 🍌, Pizza 🍕\n\nWhich ones go together?",
        "🎮 CHALLENGE 1: Classification!\n\nItems: Apple, Burger, Banana, Pizza\n\nHow would you group these?",
        "🎮 EXERCISE 1: Data Classification\n\nDataset: [Apple, Burger, Banana, Pizza]\n\nClassify into 2 categories."
      );
    },
    getChoices: () => [
      { label: "🍎🍌 Fruits vs 🍔🍕 Fast Food", value: "fruits_vs_fastfood" },
      { label: "🌿 Healthy vs 🍟 Junk Food", value: "healthy_vs_junk" },
      { label: "🔴 Red/Yellow vs 🟤 Mixed colors", value: "by_color" },
      { label: "🌱 Raw vs 🍳 Cooked", value: "raw_vs_cooked" }
    ],
    processInput: (input) => {
      return { nextState: "GROUPING_FEEDBACK", data: { groupingAnswer: input.trim() } };
    }
  },
  GROUPING_FEEDBACK: {
    getBotMessage: (state) => {
      return adjustForAge(state.ageBand,
        `Nice thinking! 🌟\n\nYou grouped them correctly! AI does this too - it learns which things are similar based on features!\n\nReady for the next game?`,
        `Good work! 🌟\n\nAI classification works the same way - finding shared attributes! Ready for the next challenge?`,
        `Excellent analysis! 🌟\n\nMachine learning models use similar feature-based classification! Ready for the next exercise?`
      );
    },
    getChoices: () => [
      { label: "➡️ Yes, next game!", value: "next" }
    ],
    processInput: () => ({ nextState: "TASK_RULE_GUESS" })
  },
  TASK_RULE_GUESS: {
    getBotMessage: (state) => {
      return adjustForAge(state.ageBand,
        "🎮 GAME 2: Guess My Rule!\n\nI pick: Cat 🐱, Dog 🐕, Tiger 🐯\nI DON'T pick: Car 🚗, Chair 🪑, Book 📚\n\nWhat's my secret rule?",
        "🎮 CHALLENGE 2: Pattern Recognition!\n\nINCLUDED: Cat, Dog, Tiger\nEXCLUDED: Car, Chair, Book\n\nWhat rule determines inclusion?",
        "🎮 EXERCISE 2: Rule Inference\n\nPositive class: {Cat, Dog, Tiger}\nNegative class: {Car, Chair, Book}\n\nIdentify the classification rule."
      );
    },
    getChoices: () => [
      { label: "🐾 They are animals", value: "animals" },
      { label: "💨 They can move", value: "can_move" },
      { label: "🔤 They have 3 letters", value: "three_letters" },
      { label: "🏠 You find them at home", value: "at_home" }
    ],
    processInput: (input) => {
      const answer = input.toLowerCase();
      const isCorrect = answer.includes("animal") || answer === "animals";
      return { nextState: "RULE_FEEDBACK", data: { ruleAnswer: input.trim(), ruleCorrect: isCorrect } };
    }
  },
  RULE_FEEDBACK: {
    getBotMessage: (state) => {
      const feedback = state.data.ruleCorrect 
        ? "🎯 You got it! The rule is: ANIMALS (living creatures)!"
        : "🎯 Good try! The rule was: ANIMALS (living things)!";
      
      return adjustForAge(state.ageBand,
        `${feedback}\n\nCats, dogs, and tigers are all animals. Cars and books are not alive! This is exactly how AI learns!\n\nReady for the last game?`,
        `${feedback}\n\nThe common feature is that they're all living creatures. AI learns to recognize these patterns!\n\nReady for the final challenge?`,
        `${feedback}\n\nThe classifier learns: animals vs non-living objects. This is supervised learning!\n\nReady for the final exercise?`
      );
    },
    getChoices: () => [
      { label: "➡️ Yes, last game!", value: "next" }
    ],
    processInput: () => ({ nextState: "TASK_SEQUENCE" })
  },
  TASK_SEQUENCE: {
    getBotMessage: (state) => {
      return adjustForAge(state.ageBand,
        "🎮 GAME 3: What Comes Next?\n\nLook at this pattern: 2, 4, 6, 8, ?\n\nWhat number comes next?",
        "🎮 CHALLENGE 3: Sequence Prediction\n\nPattern: 2, 4, 6, 8, ?\n\nPredict the next value.",
        "🎮 EXERCISE 3: Pattern Extrapolation\n\nSequence: [2, 4, 6, 8, ?]\n\nPredict the next element."
      );
    },
    getChoices: () => [
      { label: "9", value: "9" },
      { label: "10", value: "10" },
      { label: "12", value: "12" },
      { label: "16", value: "16" }
    ],
    processInput: (input) => {
      const answer = parseInt(input.replace(/[^0-9]/g, ''));
      const correct = answer === 10;
      return { nextState: "REFLECTION", data: { sequenceAnswer: answer, sequenceCorrect: correct } };
    }
  },
  REFLECTION: {
    getBotMessage: (state) => {
      const feedback = state.data.sequenceCorrect 
        ? "🎯 Perfect! 10 is correct!" 
        : "🎯 The answer is 10 - each number adds 2!";
      
      return `${feedback}\n\nThe pattern is: add 2 each time! AI uses patterns like this to predict.\n\n🤔 Which game was EASIEST for you?`;
    },
    getChoices: () => [
      { label: "📦 Grouping things", value: "1" },
      { label: "🔍 Guessing the rule", value: "2" },
      { label: "🔢 Finding the pattern", value: "3" }
    ],
    processInput: (input) => {
      return { nextState: "SUMMARY", data: { reflection: input.trim() } };
    }
  },
  SUMMARY: {
    getBotMessage: () => {
      return `🎊 YOU'RE AN AI THINKER NOW!\n\nYou just practiced the 3 main things AI does:\n✅ Grouping (Classification)\n✅ Finding Rules (Pattern Recognition)\n✅ Predicting (Sequence Analysis)\n\n🏅 YOU EARNED THE "PATTERN FINDER" BADGE! 🏅\n\nAI isn't magic - it's pattern finding, just like you did today!`;
    },
    processInput: () => ({ nextState: "COMPLETE" }),
    isEnd: true
  }
};

// =====================================================
// DESIGN THINKING SIMULATOR
// =====================================================
export const designThinkingStates: Record<string, StateHandler> = {
  GREETING: {
    getBotMessage: () => "Welcome, Creative Problem Solver! 🎨 I'm DesignBot, and today YOU get to help someone with a real problem. First, how old are you?",
    getChoices: () => [
      { label: "8 years", value: "8" },
      { label: "9 years", value: "9" },
      { label: "10 years", value: "10" },
      { label: "11 years", value: "11" },
      { label: "12 years", value: "12" },
      { label: "13 years", value: "13" },
      { label: "14 years", value: "14" },
      { label: "15 years", value: "15" },
      { label: "16 years", value: "16" }
    ],
    processInput: (input) => {
      const age = parseInt(input.trim());
      if (!isNaN(age) && age >= 8 && age <= 16) {
        return { nextState: "PROBLEM_CHOICE", data: { age, ageBand: getAgeBand(age) } };
      }
      return { nextState: "GREETING", data: { retryAge: true } };
    }
  },
  PROBLEM_CHOICE: {
    getBotMessage: (state) => {
      if (state.data.retryAge) {
        return "Please pick your age! 🎨";
      }
      return adjustForAge(state.ageBand,
        "Awesome! 🌟 I'm going to pretend to be someone with a problem. Pick which person I should be:",
        "Great! 🌟 I'll role-play as someone with a problem. Choose my persona:",
        "Perfect! 🌟 I'll adopt a user persona. Select the challenge:"
      );
    },
    getChoices: () => [
      { label: "🎒 Kid with heavy backpack", value: "1" },
      { label: "📚 Student stressed about homework", value: "2" },
      { label: "🔊 Someone bothered by noisy classroom", value: "3" }
    ],
    processInput: (input) => {
      const problems = {
        "1": { type: "backpack", persona: "I'm Alex, and my backpack is SO heavy! My shoulders hurt after walking to school." },
        "2": { type: "homework", persona: "I'm Jamie, and I have so much homework every day. I never have time to play or relax!" },
        "3": { type: "noise", persona: "I'm Sam, and my classroom is always so noisy. I can't concentrate on anything!" }
      };
      const choice = input.trim() as "1"|"2"|"3";
      const selected = problems[choice] || problems["1"];
      return { nextState: "EMPATHY_Q1", data: { problem: selected } };
    }
  },
  EMPATHY_Q1: {
    getBotMessage: (state) => {
      return `Now I'm ${state.data.problem.persona}\n\n🔍 STEP 1: EMPATHY\n\nAsk me a question to understand my problem better!`;
    },
    getChoices: () => [
      { label: "🤔 How often does this happen?", value: "How often does this happen?" },
      { label: "😢 How does it make you feel?", value: "How does it make you feel?" },
      { label: "🔧 What have you tried?", value: "What have you tried to fix it?" },
      { label: "⭐ What would be perfect?", value: "What would be the perfect solution?" }
    ],
    processInput: (input) => {
      return { nextState: "EMPATHY_A1", data: { question1: input.trim() } };
    }
  },
  EMPATHY_A1: {
    getBotMessage: (state) => {
      const answers: Record<string, string> = {
        backpack: "Hmm, well my backpack has all my books, water bottle, lunch box, and sports clothes. I think it weighs like... a lot! I walk about 10 minutes to school and my shoulders hurt every day.",
        homework: "I usually have math, reading, and sometimes a project. It takes me like 2-3 hours every day! I start after my snack but then I'm tired and it takes even longer.",
        noise: "Everyone talks at the same time, chairs scrape, and sometimes kids yell across the room. It happens during group work mostly. My head gets all fuzzy and I can't think!"
      };
      return `${answers[state.data.problem.type]}\n\nGood question! Ask me your SECOND question!`;
    },
    getChoices: () => [
      { label: "⏰ When is it worst?", value: "When is it the worst?" },
      { label: "👨‍👩‍👧 Who else is affected?", value: "Who else has this problem?" },
      { label: "💡 Any ideas to fix it?", value: "Do you have any ideas to fix it?" },
      { label: "🎯 What would help most?", value: "What would help you the most?" }
    ],
    processInput: (input) => {
      return { nextState: "EMPATHY_A2", data: { question2: input.trim() } };
    }
  },
  EMPATHY_A2: {
    getBotMessage: (state) => {
      const answers: Record<string, string> = {
        backpack: "I've tried putting things in different pockets but it doesn't help much. My parents say I need to carry less but I need all this stuff! The worst part is going up the stairs.",
        homework: "I sometimes watch videos while doing homework... that might not help. I wish I could do it faster or have less of it. My favorite subjects are art and gym because no homework!",
        noise: "The teacher tells everyone to be quiet but after 5 minutes it gets loud again. I've tried covering my ears but then I can't hear the teacher. I sit in the middle of the room."
      };
      return `${answers[state.data.problem.type]}\n\nInteresting! One more - ask your THIRD question!`;
    },
    getChoices: () => [
      { label: "🌟 What's your dream solution?", value: "What's your dream solution?" },
      { label: "💪 What makes it easier?", value: "What makes it easier sometimes?" },
      { label: "🚫 What makes it worse?", value: "What makes it worse?" },
      { label: "✨ If magic existed?", value: "If you had magic, what would you change?" }
    ],
    processInput: (input) => {
      return { nextState: "EMPATHY_A3", data: { question3: input.trim() } };
    }
  },
  EMPATHY_A3: {
    getBotMessage: (state) => {
      const answers: Record<string, string> = {
        backpack: "I'd love it if my back didn't hurt anymore and I could run to school if I wanted to! Maybe a magic floating backpack? Haha! But seriously, something lighter would be amazing.",
        homework: "I wish homework was more fun or shorter. Or maybe if I could finish it faster so I have time for video games and playing with friends! And not feel so tired after.",
        noise: "I want to be able to focus and not feel stressed. Maybe a quiet corner or something? Or if everyone just talked a little softer. I like my friends but it's just too much sometimes."
      };
      return `${answers[state.data.problem.type]}\n\n✅ Great job asking questions! Now let's move to STEP 2!`;
    },
    getChoices: () => [
      { label: "➡️ Continue to Step 2", value: "next" }
    ],
    processInput: () => ({ nextState: "PROBLEM_STATEMENT" })
  },
  PROBLEM_STATEMENT: {
    getBotMessage: (state) => {
      return adjustForAge(state.ageBand,
        `🎯 STEP 2: DEFINE the Problem\n\nBased on what you learned, pick the BEST way to describe my problem:`,
        `🎯 STEP 2: Problem Definition\n\nSynthesize your research. Which problem statement fits best?`,
        `🎯 STEP 2: Problem Statement\n\nCreate a clear problem statement based on your user research:`
      );
    },
    getChoices: (state) => {
      const type = state.data.problem.type;
      if (type === "backpack") {
        return [
          { label: "The backpack is too heavy to carry comfortably", value: "The problem is that the backpack is too heavy, causing shoulder pain during the walk to school" },
          { label: "There's too much stuff to carry", value: "The problem is that students need to carry too many items which makes the bag heavy" },
          { label: "The walk to school is too long", value: "The problem is that the walk to school is too long for carrying heavy items" }
        ];
      }
      if (type === "homework") {
        return [
          { label: "Homework takes too much time", value: "The problem is that homework takes too long, leaving no time for fun" },
          { label: "Homework is boring and tiring", value: "The problem is that homework is boring which makes it feel like it takes forever" },
          { label: "There's too much homework", value: "The problem is that there's too much homework assigned every day" }
        ];
      }
      return [
        { label: "The classroom is too noisy to focus", value: "The problem is that classroom noise makes it hard to concentrate" },
        { label: "Students don't follow quiet rules", value: "The problem is that students don't stay quiet even when asked" },
        { label: "There's no quiet space available", value: "The problem is that there's no quiet space for students who need to focus" }
      ];
    },
    processInput: (input) => {
      return { nextState: "IDEA_LISTING", data: { problemStatement: input.trim() } };
    }
  },
  IDEA_LISTING: {
    getBotMessage: (state) => {
      return adjustForAge(state.ageBand,
        `Nice problem statement! 🧠 STEP 3: IDEATE\n\nPick 3 ideas that could help solve this problem:`,
        `Good definition! 🧠 STEP 3: Ideation\n\nSelect 3 potential solutions:`,
        `Solid problem framing! 🧠 STEP 3: Ideation Phase\n\nChoose 3 solution concepts:`
      );
    },
    getChoices: (state) => {
      const type = state.data.problem.type;
      if (type === "backpack") {
        return [
          { label: "🎒 Wheeled backpack", value: "A backpack with wheels like a suitcase" },
          { label: "🏫 School lockers", value: "Keep some books in school lockers" },
          { label: "📱 Digital textbooks", value: "Use tablets instead of heavy books" },
          { label: "📅 Rotating schedule", value: "Only carry what's needed each day" }
        ];
      }
      if (type === "homework") {
        return [
          { label: "⏱️ Timer method", value: "Use a timer to work in short focused bursts" },
          { label: "🎮 Gamify homework", value: "Turn homework into a game with rewards" },
          { label: "👥 Study buddy", value: "Do homework with a friend to make it fun" },
          { label: "📋 Priority list", value: "Do hardest homework first when not tired" }
        ];
      }
      return [
        { label: "🎧 Noise-canceling headphones", value: "Use headphones to block noise" },
        { label: "🏠 Quiet corner", value: "Create a quiet corner in the classroom" },
        { label: "🚦 Noise meter", value: "Visual noise meter that shows when it's too loud" },
        { label: "✋ Hand signals", value: "Use hand signals instead of shouting" }
      ];
    },
    processInput: (input) => {
      return { nextState: "IDEA_SELECTION", data: { ideas: input.trim() } };
    }
  },
  IDEA_SELECTION: {
    getBotMessage: () => {
      return "Love the creativity! 🌈 Now pick your FAVORITE idea and tell me why!";
    },
    getChoices: () => [
      { label: "👆 My first idea is best", value: "first" },
      { label: "✌️ My second idea is best", value: "second" },
      { label: "🤟 My third idea is best", value: "third" }
    ],
    processInput: (input) => {
      return { nextState: "IDEA_IMPROVEMENT", data: { selectedIdea: input.trim() } };
    }
  },
  IDEA_IMPROVEMENT: {
    getBotMessage: (state) => {
      return adjustForAge(state.ageBand,
        `Great choice! 🔧 STEP 4: PROTOTYPE\n\nHow can you make this idea even BETTER?`,
        `Solid selection! 🔧 STEP 4: Prototyping\n\nHow would you enhance this solution?`,
        `Good justification! 🔧 STEP 4: Prototype Iteration\n\nHow would you refine this concept?`
      );
    },
    getChoices: () => [
      { label: "🎨 Make it more colorful/fun", value: "Add fun colors and designs to make it appealing" },
      { label: "💰 Make it cheaper", value: "Find ways to make it more affordable" },
      { label: "🔧 Make it easier to use", value: "Simplify it so anyone can use it easily" },
      { label: "🌿 Make it eco-friendly", value: "Use recycled or sustainable materials" }
    ],
    processInput: (input) => {
      return { nextState: "DIFFICULTY_REFLECTION", data: { improvedIdea: input.trim() } };
    }
  },
  DIFFICULTY_REFLECTION: {
    getBotMessage: () => {
      return `Wow, that sounds amazing! I love it! 🎉\n\n🤔 Before we finish, which step was HARDEST for you?`;
    },
    getChoices: () => [
      { label: "❓ Asking questions (Empathy)", value: "1" },
      { label: "✍️ Writing the problem (Define)", value: "2" },
      { label: "💡 Coming up with ideas (Ideate)", value: "3" },
      { label: "🔧 Improving the idea (Prototype)", value: "4" }
    ],
    processInput: (input) => {
      const difficulties = { "1": "empathy", "2": "define", "3": "ideate", "4": "prototype" };
      return { nextState: "SUMMARY", data: { hardestStep: difficulties[input.trim() as "1"|"2"|"3"|"4"] || "ideate" } };
    }
  },
  SUMMARY: {
    getBotMessage: (state) => {
      return `🎊 YOU'RE A DESIGN THINKER NOW!\n\nYou just completed the Design Thinking process:\n\n✅ EMPATHIZE: Asked 3 great questions\n✅ DEFINE: Created a clear problem statement\n✅ IDEATE: Generated multiple solutions\n✅ PROTOTYPE: Improved your best idea\n\n🏅 YOU EARNED THE "CREATIVE PROBLEM SOLVER" BADGE! 🏅\n\nThe step you found hardest (${state.data.hardestStep}) is totally normal - everyone has different strengths!`;
    },
    processInput: () => ({ nextState: "COMPLETE" }),
    isEnd: true
  }
};

// =====================================================
// MONEY SKILLS SIMULATOR
// =====================================================
export const moneySkillsStates: Record<string, StateHandler> = {
  GREETING: {
    getBotMessage: () => "Hey there, future Money Master! 💰 I'm MoneyMentor, and we're going to practice with some pretend pocket money! First, how old are you?",
    getChoices: () => [
      { label: "8 years", value: "8" },
      { label: "9 years", value: "9" },
      { label: "10 years", value: "10" },
      { label: "11 years", value: "11" },
      { label: "12 years", value: "12" },
      { label: "13 years", value: "13" },
      { label: "14 years", value: "14" },
      { label: "15 years", value: "15" },
      { label: "16 years", value: "16" }
    ],
    processInput: (input) => {
      const age = parseInt(input.trim());
      if (!isNaN(age) && age >= 8 && age <= 16) {
        return { nextState: "SCENARIO_SETUP", data: { age, ageBand: getAgeBand(age) } };
      }
      return { nextState: "GREETING", data: { retryAge: true } };
    }
  },
  SCENARIO_SETUP: {
    getBotMessage: (state) => {
      if (state.data.retryAge) {
        return "Please pick your age! 💰";
      }
      return adjustForAge(state.ageBand,
        "Awesome! 🎉 Imagine you just got ₹200 as pocket money!\n\nHere's what you could spend it on:\n🍿 Snacks - ₹80\n📚 Story Book - ₹120\n🎮 Game - ₹200\n🐷 Save for later - any amount!\n\nReady to start?",
        "Great! 🎉 You have ₹200 to manage.\n\nSpending options:\n• Snacks - ₹80\n• Book - ₹120\n• Game - ₹200\n• Savings - variable\n\nReady to continue?",
        "Perfect! 🎉 Budget scenario: ₹200 available.\n\nExpenditure options:\n• Consumables (snacks) - ₹80\n• Educational (book) - ₹120\n• Entertainment (game) - ₹200\n• Savings allocation - flexible\n\nReady to proceed?"
      );
    },
    getChoices: () => [
      { label: "✅ Ready!", value: "ready" }
    ],
    processInput: () => ({ nextState: "WANTS_NEEDS" })
  },
  WANTS_NEEDS: {
    getBotMessage: (state) => {
      return adjustForAge(state.ageBand,
        "🤔 First, let's think: Which of these are NEEDS (must have) vs WANTS (nice to have)?",
        "🤔 Classify these items as NEEDS (essential) or WANTS (discretionary):",
        "🤔 Categorize expenditures as Essential (needs) vs Discretionary (wants):"
      );
    },
    getChoices: () => [
      { label: "🍿 Snacks = WANT, 📚 Book = NEED", value: "Snacks are wants, books are needs for learning" },
      { label: "🎮 Game = WANT, 🐷 Saving = NEED", value: "Games are wants, saving is important" },
      { label: "Everything is a WANT", value: "All of these are wants, not needs" },
      { label: "📚 Book = NEED, rest = WANTS", value: "Only the book is a need, everything else is a want" }
    ],
    processInput: (input) => {
      return { nextState: "WANTS_NEEDS_FEEDBACK", data: { wantsNeedsAnswer: input.trim() } };
    }
  },
  WANTS_NEEDS_FEEDBACK: {
    getBotMessage: (state) => {
      return adjustForAge(state.ageBand,
        "Good thinking! 🌟\n\nHere's a tip: Food CAN be a need (you need to eat!), but snacks are usually wants. Books help you learn. Games are definitely wants! Saving is SMART but not a 'need'.\n\nThe trick is: NEEDS keep you healthy and safe. WANTS make life more fun!\n\nReady to make a budget?",
        "Nice analysis! 🌟\n\nPerspective: Necessities (food for nutrition) differ from treats (snacks for pleasure). Educational materials can be needs or wants. Entertainment is typically discretionary.\n\nReady to plan your budget?",
        "Solid reasoning! 🌟\n\nFramework: Needs fulfill basic requirements; wants provide utility beyond survival. Context matters!\n\nReady for budget planning?"
      );
    },
    getChoices: () => [
      { label: "➡️ Let's make a budget!", value: "next" }
    ],
    processInput: () => ({ nextState: "BUDGET_DRAFT" })
  },
  BUDGET_DRAFT: {
    getBotMessage: () => {
      return "💵 TIME TO BUDGET!\n\nYou have ₹200. How would you spend it?\n\n(Remember: Total can't be more than ₹200!)";
    },
    getChoices: () => [
      { label: "🍿₹80 snacks + 🐷₹120 save", value: "I will spend ₹80 on snacks and save ₹120" },
      { label: "📚₹120 book + 🐷₹80 save", value: "I will spend ₹120 on book and save ₹80" },
      { label: "🎮₹200 game (no savings)", value: "I will spend ₹200 on game and save ₹0" },
      { label: "🍿₹80 + 📚₹120 (no savings)", value: "I will spend ₹80 on snacks, ₹120 on book, and save ₹0" }
    ],
    processInput: (input) => {
      const numbers = input.match(/\d+/g)?.map(Number) || [];
      const total = numbers.reduce((a, b) => a + b, 0);
      const saved = numbers.find(n => input.toLowerCase().includes('save') && n > 0) || 0;
      return { nextState: "FUTURE_EVENT", data: { budgetPlan: input.trim(), budgetTotal: total, budgetNumbers: numbers, savedAmount: saved } };
    }
  },
  FUTURE_EVENT: {
    getBotMessage: (state) => {
      // Extract saved amount from the budget plan
      const plan = state.data.budgetPlan?.toLowerCase() || "";
      let saved = 0;
      if (plan.includes("save ₹120") || plan.includes("save 120")) saved = 120;
      else if (plan.includes("save ₹80") || plan.includes("save 80")) saved = 80;
      else if (plan.includes("save ₹0") || plan.includes("no savings")) saved = 0;
      
      return adjustForAge(state.ageBand,
        `Great budget! 💰\n\n⚠️ SURPRISE! Next week, there's a school trip that costs ₹150!\n\nYou planned to save ₹${saved}. Will you have enough for the trip?`,
        `Smart planning! 💰\n\n⚠️ UNEXPECTED EXPENSE: School trip next week - ₹150 required!\n\nYour savings: ₹${saved}. Can you cover this?`,
        `Good allocation! 💰\n\n⚠️ LIQUIDITY EVENT: ₹150 required for upcoming school trip!\n\nPlanned savings: ₹${saved}. Analyze your situation.`
      );
    },
    getChoices: (state) => {
      const plan = state.data.budgetPlan?.toLowerCase() || "";
      let saved = 0;
      if (plan.includes("save ₹120") || plan.includes("save 120")) saved = 120;
      else if (plan.includes("save ₹80") || plan.includes("save 80")) saved = 80;
      
      if (saved >= 150) {
        return [
          { label: "✅ Yes, I have enough!", value: "yes_enough" },
          { label: "❌ No, I'm short", value: "no_short" }
        ];
      }
      return [
        { label: "❌ No, I need ₹" + (150 - saved) + " more", value: "no_short" },
        { label: "✅ Yes, I think I have enough", value: "yes_enough" }
      ];
    },
    processInput: (input) => {
      return { nextState: "SAVE_RULE", data: { futureAnswer: input.trim() } };
    }
  },
  SAVE_RULE: {
    getBotMessage: (state) => {
      const plan = state.data.budgetPlan?.toLowerCase() || "";
      let saved = 0;
      if (plan.includes("save ₹120") || plan.includes("save 120")) saved = 120;
      else if (plan.includes("save ₹80") || plan.includes("save 80")) saved = 80;
      
      const hasEnough = saved >= 150;
      const feedback = hasEnough 
        ? "Nice! You saved enough! 🎉" 
        : `With ₹${saved} saved, you'd be ₹${150 - saved} short. That's okay - let's learn a trick!`;
      
      return adjustForAge(state.ageBand,
        `${feedback}\n\n🌟 MONEY TIP: "Save First" Rule!\n\nTry to save 20% of money FIRST, before spending.\n20% of ₹200 = ₹40\n\nSo you'd save ₹40 first, then have ₹160 left to spend!\n\nReady to try a new plan?`,
        `${feedback}\n\n🌟 FINANCIAL PRINCIPLE: Pay Yourself First!\n\nAllocate 20% to savings before discretionary spending.\n20% × ₹200 = ₹40 minimum savings.\n\nReady to revise your budget?`,
        `${feedback}\n\n🌟 WEALTH BUILDING PRINCIPLE: Prioritize Savings!\n\nRecommended: 20% savings rate minimum.\nCalculation: 0.20 × ₹200 = ₹40 allocation.\n\nReady for an optimized budget?`
      );
    },
    getChoices: () => [
      { label: "➡️ Let's try again!", value: "got it" }
    ],
    processInput: () => ({ nextState: "NEW_PLAN" })
  },
  NEW_PLAN: {
    getBotMessage: () => {
      return "💪 NEW CHALLENGE!\n\nMake a NEW plan where you save at least ₹40 FIRST!\n\n(Remember: Save first, then spend the rest!)";
    },
    getChoices: () => [
      { label: "🐷₹40 save + 🍿₹80 snacks + 📚₹80 book", value: "I will save ₹40, spend ₹80 on snacks, ₹80 on book" },
      { label: "🐷₹60 save + 📚₹120 book + ₹20 left", value: "I will save ₹60, spend ₹120 on book, keep ₹20" },
      { label: "🐷₹100 save + 🍿₹80 snacks + ₹20 left", value: "I will save ₹100, spend ₹80 on snacks" },
      { label: "🐷₹50 save + 🍿₹70 snacks + 📚₹80 book", value: "I will save ₹50, spend ₹70 on snacks, ₹80 on book" }
    ],
    processInput: (input) => {
      const numbers = input.match(/\d+/g)?.map(Number) || [];
      const saved = numbers[0] || 0;
      return { nextState: "REFLECTION", data: { newPlan: input.trim(), newSaved: saved, savesEnough: saved >= 40 } };
    }
  },
  REFLECTION: {
    getBotMessage: (state) => {
      const feedback = state.data.savesEnough 
        ? `Excellent! Saving ₹${state.data.newSaved} first is smart! 🌟` 
        : "Good try! Even small savings add up over time! 🌟";
      
      return `${feedback}\n\n🤔 Last question: What would you change about how you use money in REAL life?`;
    },
    getChoices: () => [
      { label: "💰 Save more before spending", value: "I would save more before spending" },
      { label: "🛒 Think twice before buying", value: "I would think twice before buying things" },
      { label: "📝 Keep track of my money", value: "I would keep track of where my money goes" },
      { label: "🎯 Set savings goals", value: "I would set a goal for what I want to save for" }
    ],
    processInput: (input) => {
      return { nextState: "SUMMARY", data: { reflection: input.trim() } };
    }
  },
  SUMMARY: {
    getBotMessage: (state) => {
      return `🎊 YOU'RE A MONEY MASTER NOW!\n\nToday you learned:\n✅ Needs vs Wants - knowing the difference\n✅ Budgeting - planning your money\n✅ Save First - the 20% rule\n✅ Emergency Planning - preparing for surprises\n\nYour commitment: "${state.data.reflection?.substring(0, 50)}..."\n\n🏅 YOU EARNED THE "SMART SAVER" BADGE! 🏅\n\nRemember: Small savings today = Big dreams tomorrow! 🚀`;
    },
    processInput: () => ({ nextState: "COMPLETE" }),
    isEnd: true
  }
};

// Get state machine for simulator type
export const getStateMachine = (type: SimulatorType): Record<string, StateHandler> => {
  switch (type) {
    case "entrepreneurship": return entrepreneurshipStates;
    case "ai-literacy": return aiLiteracyStates;
    case "design-thinking": return designThinkingStates;
    case "money-skills": return moneySkillsStates;
    default: return entrepreneurshipStates;
  }
};

export const getBadgeName = (type: SimulatorType): string => {
  switch (type) {
    case "entrepreneurship": return "Mini Founder";
    case "ai-literacy": return "Pattern Finder";
    case "design-thinking": return "Creative Problem Solver";
    case "money-skills": return "Smart Saver";
    default: return "Skill Badge";
  }
};
