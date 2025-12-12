import { useState, useRef, useEffect, useCallback } from "react";
import { 
  Mic, MicOff, Volume2, VolumeX, X, Send, Sparkles, Award, 
  RotateCcw, Home, Edit3, User, Bot 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { SimulatorType } from "../ChildMode";
import { 
  getStateMachine, 
  getBadgeName, 
  SimulatorState, 
  getAgeBand,
  ChoiceOption
} from "./simulatorStateMachines";

interface VoiceTutorProps {
  simulator: SimulatorType;
  isOpen: boolean;
  onClose: () => void;
}

const simulatorConfig = {
  entrepreneurship: {
    title: "SkillBuddy",
    subtitle: "Business Game",
    emoji: "💡",
    gradient: "from-orange-400 to-red-500",
    bgGradient: "from-orange-50 to-red-50",
    avatarBg: "bg-gradient-to-br from-orange-400 to-red-500"
  },
  "ai-literacy": {
    title: "PatternPal",
    subtitle: "AI Thinking Game",
    emoji: "🤖",
    gradient: "from-violet-500 to-purple-600",
    bgGradient: "from-violet-50 to-purple-50",
    avatarBg: "bg-gradient-to-br from-violet-500 to-purple-600"
  },
  "design-thinking": {
    title: "UserHero",
    subtitle: "Design Thinking Game",
    emoji: "🎨",
    gradient: "from-pink-400 to-rose-500",
    bgGradient: "from-pink-50 to-rose-50",
    avatarBg: "bg-gradient-to-br from-pink-400 to-rose-500"
  },
  "money-skills": {
    title: "MoneyMentor",
    subtitle: "Money Game",
    emoji: "💰",
    gradient: "from-emerald-400 to-teal-500",
    bgGradient: "from-emerald-50 to-teal-50",
    avatarBg: "bg-gradient-to-br from-emerald-400 to-teal-500"
  }
};

interface Message {
  role: "user" | "assistant";
  content: string;
}

const VoiceTutor = ({ simulator, isOpen, onClose }: VoiceTutorProps) => {
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
  
  // Voice states
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(true);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // @ts-ignore - Web Speech API types
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognitionAPI) {
        const recognition = new SpeechRecognitionAPI();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInput(transcript);
          setIsListening(false);
          // Auto-send after voice input
          setTimeout(() => {
            if (transcript.trim()) {
              processUserInput(transcript.trim());
            }
          }, 500);
        };
        
        recognition.onerror = () => {
          setIsListening(false);
        };
        
        recognition.onend = () => {
          setIsListening(false);
        };
        
        recognitionRef.current = recognition;
      } else {
        setVoiceSupported(false);
      }
      
      synthRef.current = window.speechSynthesis;
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Text-to-speech function with more human-like voice
  const speak = useCallback((text: string) => {
    if (isMuted || !synthRef.current) return;
    
    // Cancel any ongoing speech
    synthRef.current.cancel();
    
    // Clean text for speech (remove emojis and special characters)
    const cleanText = text.replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
                          .replace(/[🎮🎯🌟💡🚀🎉🏪🏫🌍📌💰⭐🏅✅🤔➡️🐱🐕🐯🚗🪑📚🍎🍔🍌🍕🐾💨🔤🏠🌿🍟🔴🟤🌱🍳]/g, '');
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Get available voices and select a more natural one
    const voices = synthRef.current.getVoices();
    
    // Prefer natural/enhanced voices for a more human tone
    const preferredVoices = [
      'Google UK English Female',
      'Google US English',
      'Samantha',
      'Karen',
      'Victoria',
      'Microsoft Zira',
      'Microsoft David',
      'Google UK English Male',
      'Alex',
      'Daniel'
    ];
    
    let selectedVoice = voices.find(v => 
      preferredVoices.some(pv => v.name.includes(pv))
    );
    
    // Fallback to any English female voice for friendlier tone
    if (!selectedVoice) {
      selectedVoice = voices.find(v => 
        v.lang.startsWith('en') && v.name.toLowerCase().includes('female')
      );
    }
    
    // Fallback to any English voice
    if (!selectedVoice) {
      selectedVoice = voices.find(v => v.lang.startsWith('en'));
    }
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    // More natural speech settings
    utterance.rate = 0.95; // Slightly slower for clarity
    utterance.pitch = 1.05; // Slightly higher for friendlier tone
    utterance.volume = 1.0;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    synthRef.current.speak(utterance);
  }, [isMuted]);

  // Initialize with first bot message
  useEffect(() => {
    if (isOpen) {
      const firstHandler = stateMachine["GREETING"];
      if (firstHandler) {
        setIsTyping(true);
        setTimeout(() => {
          const firstMessage = firstHandler.getBotMessage(simulatorState);
          setMessages([{ role: "assistant", content: firstMessage }]);
          const choices = firstHandler.getChoices?.(simulatorState) || null;
          setCurrentChoices(choices);
          setIsTyping(false);
          speak(firstMessage);
        }, 500);
      }
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, currentChoices]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const toggleMute = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsMuted(!isMuted);
    setIsSpeaking(false);
  };

  const processUserInput = async (userMessage: string) => {
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsTyping(true);
    setCurrentChoices(null);
    setShowCustomInput(false);
    setInput("");

    const currentHandler = stateMachine[simulatorState.currentState];
    if (!currentHandler) {
      setIsTyping(false);
      return;
    }

    const result = currentHandler.processInput(userMessage, simulatorState);
    
    const newState: SimulatorState = {
      ...simulatorState,
      currentState: result.nextState,
      data: { ...simulatorState.data, ...result.data },
      messagesCount: simulatorState.messagesCount + 1,
      ageBand: result.data?.ageBand || simulatorState.ageBand
    };

    if (result.nextState === "COMPLETE") {
      newState.completed = true;
      newState.badgeEarned = getBadgeName(simulator);
      
      const progress = JSON.parse(localStorage.getItem('skillpreneurz-progress') || '{}');
      progress.badges = (progress.badges || 0) + 1;
      progress.lessons = (progress.lessons || 0) + 1;
      progress.lastCompleted = new Date().toISOString();
      localStorage.setItem('skillpreneurz-progress', JSON.stringify(progress));
    }

    setSimulatorState(newState);

    setTimeout(() => {
      if (result.nextState !== "COMPLETE") {
        const nextHandler = stateMachine[result.nextState];
        if (nextHandler) {
          const botMessage = nextHandler.getBotMessage(newState);
          setMessages(prev => [...prev, { role: "assistant", content: botMessage }]);
          const choices = nextHandler.getChoices?.(newState) || null;
          setCurrentChoices(choices);
          speak(botMessage);
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
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    
    const initialState = {
      currentState: "GREETING",
      ageBand: null,
      data: {},
      messagesCount: 0,
      completed: false,
      badgeEarned: null
    };
    
    setSimulatorState(initialState);
    setShowCustomInput(false);
    
    const firstHandler = stateMachine["GREETING"];
    if (firstHandler) {
      const firstMessage = firstHandler.getBotMessage(initialState);
      setMessages([{ role: "assistant", content: firstMessage }]);
      const choices = firstHandler.getChoices?.(initialState) || null;
      setCurrentChoices(choices);
      speak(firstMessage);
    }
  };

  const handleClose = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    if (recognitionRef.current) {
      recognitionRef.current.abort();
    }
    setIsListening(false);
    setIsSpeaking(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-4xl w-[95vw] h-[90vh] p-0 gap-0 flex flex-col overflow-hidden">
        {/* Header */}
        <div className={`bg-gradient-to-r ${config.gradient} text-white p-4 flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full ${config.avatarBg} flex items-center justify-center text-2xl shadow-lg`}>
              {config.emoji}
            </div>
            <div>
              <h2 className="font-bold text-lg">{config.title}</h2>
              <p className="text-sm text-white/80">{config.subtitle}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Mute/Unmute TTS */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="text-white hover:bg-white/20"
              title={isMuted ? "Unmute voice" : "Mute voice"}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className={`w-5 h-5 ${isSpeaking ? 'animate-pulse' : ''}`} />}
            </Button>
            
            {/* Close */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Chat Area */}
        <ScrollArea className={`flex-1 p-4 bg-gradient-to-br ${config.bgGradient}`} ref={scrollRef}>
          <div className="space-y-4 max-w-2xl mx-auto pb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className={`w-8 h-8 rounded-full ${config.avatarBg} flex items-center justify-center text-white text-sm flex-shrink-0`}>
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                
                <Card
                  className={`max-w-[80%] p-4 ${
                    message.role === "user"
                      ? `bg-gradient-to-r ${config.gradient} text-white border-0`
                      : "bg-white shadow-md border-0"
                  }`}
                >
                  <p className="text-sm md:text-base whitespace-pre-line">{message.content}</p>
                </Card>
                
                {message.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className={`w-8 h-8 rounded-full ${config.avatarBg} flex items-center justify-center text-white text-sm flex-shrink-0`}>
                  <Bot className="w-4 h-4" />
                </div>
                <Card className="bg-white shadow-md p-4 border-0">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 animate-pulse text-primary" />
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
              <div className="flex flex-col gap-2 max-w-2xl mx-auto pt-2">
                <div className="flex flex-wrap gap-2 justify-center">
                  {currentChoices.map((choice, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => handleChoiceSelect(choice)}
                      className="text-sm px-4 py-2 h-auto whitespace-normal text-left bg-white hover:bg-primary hover:text-white transition-all duration-200 border-2 hover:border-transparent shadow-sm hover:shadow-md"
                    >
                      {choice.label}
                    </Button>
                  ))}
                </div>
                
                {/* Other option */}
                <div className="flex justify-center mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowCustomInput(!showCustomInput)}
                    className="text-muted-foreground hover:text-foreground gap-2"
                  >
                    <Edit3 className="w-4 h-4" />
                    {showCustomInput ? "Hide custom answer" : "Type or speak my own answer"}
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
                    <Button variant="outline" onClick={handleRestart} className="gap-2">
                      <RotateCcw className="w-4 h-4" />
                      Play Again
                    </Button>
                    <Button onClick={handleClose} className={`gap-2 bg-gradient-to-r ${config.gradient} hover:opacity-90`}>
                      <Home className="w-4 h-4" />
                      Explore More
                    </Button>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        {!simulatorState.completed && (
          <div className="p-4 bg-white border-t flex flex-col gap-3">
            {/* Voice/Text Input */}
            <div className="max-w-2xl mx-auto w-full flex gap-2 items-center">
              {/* Microphone Button */}
              <Button
                variant={isListening ? "default" : "outline"}
                size="icon"
                onClick={toggleListening}
                disabled={!voiceSupported}
                className={`h-12 w-12 rounded-full transition-all ${
                  isListening 
                    ? `bg-gradient-to-r ${config.gradient} animate-pulse shadow-lg` 
                    : 'hover:bg-primary/10'
                }`}
                title={voiceSupported ? (isListening ? "Stop listening" : "Tap to speak") : "Voice not supported"}
              >
                {isListening ? (
                  <Mic className="w-5 h-5 text-white" />
                ) : (
                  <MicOff className="w-5 h-5" />
                )}
              </Button>

              {/* Text Input */}
              {(showCustomInput || !currentChoices) && (
                <>
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                    placeholder="Tap mic to talk, or type here…"
                    className="flex-1 h-12"
                    disabled={isTyping}
                  />
                  <Button 
                    onClick={handleSend}
                    disabled={isTyping || !input.trim()}
                    className={`h-12 px-4 bg-gradient-to-r ${config.gradient} hover:opacity-90`}
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </>
              )}
              
              {!showCustomInput && currentChoices && (
                <p className="text-sm text-muted-foreground flex-1 text-center">
                  Tap a choice above, speak, or type your own answer
                </p>
              )}
            </div>
            
            {/* Listening indicator */}
            {isListening && (
              <div className="text-center">
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${config.gradient} text-white text-sm animate-pulse`}>
                  <Mic className="w-4 h-4" />
                  Listening... speak now!
                </span>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default VoiceTutor;

