import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Send, Sparkles, Award, RotateCcw, Home, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SimulatorType } from "../ChildMode";
import {
  getStateMachine,
  getBadgeName,
  SimulatorState,
  getAgeBand,
  ChoiceOption
} from "./simulatorStateMachines";

interface SimulatorChatProps {
  simulator: SimulatorType;
  onBack: () => void;
}

const simulatorConfig = {
  entrepreneurship: {
    title: "Entrepreneurship Simulator",
    emoji: "💡",
    gradient: "from-orange-400 to-red-500",
    bgGradient: "from-orange-50 to-red-50",
    botName: "BizBuddy"
  },
  "entre-skills-sim": {
    title: "Entrepreneur Skills Simulator",
    emoji: "🚀",
    gradient: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-50 to-indigo-50",
    botName: "SkillMentor"
  },
  "ai-literacy": {
    title: "AI Literacy Simulator",
    emoji: "🤖",
    gradient: "from-violet-500 to-purple-600",
    bgGradient: "from-violet-50 to-purple-50",
    botName: "PatternPal"
  },
  "design-thinking": {
    title: "Design Thinking Simulator",
    emoji: "🎨",
    gradient: "from-pink-400 to-rose-500",
    bgGradient: "from-pink-50 to-rose-50",
    botName: "DesignBot"
  },
  "money-skills": {
    title: "Money Skills Simulator",
    emoji: "💰",
    gradient: "from-emerald-400 to-teal-500",
    bgGradient: "from-emerald-50 to-teal-50",
    botName: "MoneyMentor"
  }
};

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SimulatorChat = ({ simulator, onBack }: SimulatorChatProps) => {
  const config = simulatorConfig[simulator!];
  const stateMachine = getStateMachine(simulator);

  const [simulatorState, setSimulatorState] = useState<SimulatorState>({
    currentState: "GREETING",
    ageBand: null,
    data: {},
    messagesCount: 0,
    completed: false,
    badgeEarned: null
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentChoices, setCurrentChoices] = useState<ChoiceOption[] | null>(null);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize with first bot message
  useEffect(() => {
    const firstHandler = stateMachine["GREETING"];
    if (firstHandler) {
      setIsTyping(true);
      setTimeout(() => {
        const firstMessage = firstHandler.getBotMessage(simulatorState);
        setMessages([{ role: "assistant", content: firstMessage }]);
        const choices = firstHandler.getChoices?.(simulatorState) || null;
        setCurrentChoices(choices);
        setIsTyping(false);
      }, 500);
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, currentChoices]);

  const processUserInput = async (userMessage: string) => {
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsTyping(true);
    setCurrentChoices(null);
    setShowCustomInput(false);
    setInput("");

    // Process the input through state machine
    const currentHandler = stateMachine[simulatorState.currentState];
    if (!currentHandler) {
      setIsTyping(false);
      return;
    }

    // Get next state
    const result = currentHandler.processInput(userMessage, simulatorState);

    // Update state with new data
    const newState: SimulatorState = {
      ...simulatorState,
      currentState: result.nextState,
      data: { ...simulatorState.data, ...result.data },
      messagesCount: simulatorState.messagesCount + 1,
      ageBand: result.data?.ageBand || simulatorState.ageBand
    };

    // Check if completed
    if (result.nextState === "COMPLETE") {
      newState.completed = true;
      newState.badgeEarned = getBadgeName(simulator);

      // Update local storage for progress tracking
      const progress = JSON.parse(localStorage.getItem('skillpreneurz-progress') || '{}');
      progress.badges = (progress.badges || 0) + 1;
      progress.lessons = (progress.lessons || 0) + 1;
      progress.lastCompleted = new Date().toISOString();
      localStorage.setItem('skillpreneurz-progress', JSON.stringify(progress));
    }

    setSimulatorState(newState);

    // Simulate typing delay for more natural feel
    setTimeout(() => {
      if (result.nextState !== "COMPLETE") {
        const nextHandler = stateMachine[result.nextState];
        if (nextHandler) {
          const botMessage = nextHandler.getBotMessage(newState);
          setMessages(prev => [...prev, { role: "assistant", content: botMessage }]);
          const choices = nextHandler.getChoices?.(newState) || null;
          setCurrentChoices(choices);
        }
      }
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  const handleChoiceSelect = (choice: ChoiceOption) => {
    processUserInput(choice.value);
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    processUserInput(input.trim());
  };

  const handleRestart = () => {
    setSimulatorState({
      currentState: "GREETING",
      ageBand: null,
      data: {},
      messagesCount: 0,
      completed: false,
      badgeEarned: null
    });
    setShowCustomInput(false);
    const firstHandler = stateMachine["GREETING"];
    if (firstHandler) {
      const initialState = {
        currentState: "GREETING",
        ageBand: null,
        data: {},
        messagesCount: 0,
        completed: false,
        badgeEarned: null
      };
      const firstMessage = firstHandler.getBotMessage(initialState);
      setMessages([{ role: "assistant", content: firstMessage }]);
      const choices = firstHandler.getChoices?.(initialState) || null;
      setCurrentChoices(choices);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-gradient-to-br ${config.bgGradient}`}>
      {/* Header */}
      <div className={`bg-gradient-to-r ${config.gradient} text-white p-4 shadow-lg`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{config.emoji}</span>
              <div>
                <h1 className="text-lg font-bold">{config.title}</h1>
                <p className="text-xs text-white/80">with {config.botName}</p>
              </div>
            </div>
          </div>

          {simulatorState.completed && (
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-medium hidden sm:inline">Badge Earned!</span>
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4 max-w-2xl mx-auto pb-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <Card
                className={`max-w-[85%] p-4 ${message.role === "user"
                    ? `bg-gradient-to-r ${config.gradient} text-white border-0`
                    : "bg-white shadow-md border-0"
                  }`}
              >
                <p className="text-sm md:text-base whitespace-pre-line">{message.content}</p>
              </Card>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <Card className="bg-white shadow-md p-4 border-0">
                <div className="flex items-center gap-2">
                  <Sparkles className={`w-4 h-4 animate-pulse`} style={{ color: 'var(--primary)' }} />
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Choice Buttons */}
          {currentChoices && !isTyping && !simulatorState.completed && (
            <div className="flex flex-col gap-2 max-w-2xl mx-auto">
              <div className="flex flex-wrap gap-2 justify-center">
                {currentChoices.map((choice, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => handleChoiceSelect(choice)}
                    className={`text-sm px-4 py-2 h-auto whitespace-normal text-left bg-white hover:bg-gradient-to-r hover:${config.gradient} hover:text-white transition-all duration-200 border-2 hover:border-transparent shadow-sm hover:shadow-md`}
                  >
                    {choice.label}
                  </Button>
                ))}
              </div>

              {/* Other option - custom input toggle */}
              <div className="flex justify-center mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCustomInput(!showCustomInput)}
                  className="text-muted-foreground hover:text-foreground gap-2"
                >
                  <Edit3 className="w-4 h-4" />
                  {showCustomInput ? "Hide custom answer" : "Type my own answer"}
                </Button>
              </div>
            </div>
          )}

          {/* Completion Card */}
          {simulatorState.completed && (
            <div className="flex justify-center pt-4">
              <Card className="bg-gradient-to-br from-yellow-100 to-amber-100 border-2 border-yellow-300 p-6 text-center max-w-md">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-amber-800 mb-2">
                  🎉 Congratulations! 🎉
                </h3>
                <p className="text-amber-700 mb-4">
                  You earned the <span className="font-bold">{simulatorState.badgeEarned}</span> badge!
                </p>
                <div className="flex gap-2 justify-center">
                  <Button
                    variant="outline"
                    onClick={handleRestart}
                    className="gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Play Again
                  </Button>
                  <Button
                    onClick={onBack}
                    className={`gap-2 bg-gradient-to-r ${config.gradient} hover:opacity-90`}
                  >
                    <Home className="w-4 h-4" />
                    Explore More
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Custom Input Area - shown when user wants to type own answer or no choices available */}
      {!simulatorState.completed && (showCustomInput || !currentChoices) && (
        <div className="p-4 bg-white/80 backdrop-blur border-t">
          <div className="max-w-2xl mx-auto flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
              placeholder="Type your own answer... ✨"
              className="flex-1 bg-white"
              disabled={isTyping}
            />
            <Button
              onClick={handleSend}
              disabled={isTyping || !input.trim()}
              className={`bg-gradient-to-r ${config.gradient} hover:opacity-90`}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimulatorChat;
