import { useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mic, MessageSquare, Play, Gamepad2, PenTool, CheckCircle2, ChevronLeft, BookOpen, Lightbulb, Zap, ClipboardList, Target, Sparkles } from "lucide-react";
import { entrepreneurCurriculum, SimulatorSession, SimulatorModule } from "@/data/entrepreneur-curriculum";
import { cn } from "@/lib/utils";
import {
    StoryViewer,
    ConceptCards,
    WorksheetActivity,
    SuperpowersDisplay,
    ReflectionQuiz,
    InfographicDisplay,
    VideoModule
} from "./modules";

interface EntreSkillsSimulatorProps {
    onBack: () => void;
}

// Icon mapping for module types
const moduleIcons: Record<string, React.ReactNode> = {
    video: <Play className="w-4 h-4" />,
    interactive: <Gamepad2 className="w-4 h-4" />,
    creation: <PenTool className="w-4 h-4" />,
    quiz: <CheckCircle2 className="w-4 h-4" />,
    story: <BookOpen className="w-4 h-4" />,
    concepts: <Lightbulb className="w-4 h-4" />,
    superpowers: <Zap className="w-4 h-4" />,
    worksheet: <ClipboardList className="w-4 h-4" />,
    reflection: <Target className="w-4 h-4" />,
};

const EntreSkillsSimulator = ({ onBack }: EntreSkillsSimulatorProps) => {
    const [activeTab, setActiveTab] = useState("teaching");
    const [voiceMode, setVoiceMode] = useState(false);
    const [completedSessions, setCompletedSessions] = useState<string[]>([]);
    const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());
    const [activeModule, setActiveModule] = useState<SimulatorModule | null>(null);
    const [activeSession, setActiveSession] = useState<SimulatorSession | null>(null);

    // Calculate stats
    const totalSessions = 48; // 20 + 20 + 8
    const progress = (completedSessions.length / totalSessions) * 100;

    const handleModuleComplete = (moduleId: string) => {
        setCompletedModules(prev => new Set(prev).add(moduleId));
        setActiveModule(null);
    };

    const renderModuleContent = (module: SimulatorModule) => {
        const content = module.content;

        if (!content) {
            return (
                <div className="flex flex-col items-center justify-center text-center space-y-4 p-8 bg-muted/50 rounded-lg border border-dashed border-border">
                    <Sparkles className="w-16 h-16 text-primary animate-pulse" />
                    <p className="text-muted-foreground">Content coming soon!</p>
                </div>
            );
        }

        return (
            <div className="space-y-6">
                {/* Story Content */}
                {content.story && (
                    <StoryViewer story={content.story} />
                )}

                {/* Video Content */}
                {content.video && (
                    <VideoModule
                        description={content.video.description}
                        keyPoints={content.video.keyPoints}
                        scriptPoints={content.video.scriptPoints}
                    />
                )}

                {/* Concept Cards */}
                {content.concepts && (
                    <ConceptCards
                        title={content.concepts.title}
                        cards={content.concepts.cards}
                    />
                )}

                {/* Superpowers */}
                {content.superpowers && (
                    <SuperpowersDisplay superpowers={content.superpowers} />
                )}

                {/* Worksheet */}
                {content.worksheet && (
                    <WorksheetActivity
                        title={content.worksheet.title}
                        instructions={content.worksheet.instructions}
                        prompts={content.worksheet.prompts}
                        onComplete={() => handleModuleComplete(module.id)}
                    />
                )}

                {/* Quiz/Reflection */}
                {content.quiz && (
                    <ReflectionQuiz
                        title={content.quiz.title}
                        questions={content.quiz.questions}
                        onComplete={() => handleModuleComplete(module.id)}
                    />
                )}

                {/* Infographic */}
                {content.infographic && (
                    <InfographicDisplay
                        title={content.infographic.title}
                        sections={content.infographic.sections}
                    />
                )}
            </div>
        );
    };

    const renderSessionList = (sessions: SimulatorSession[]) => (
        <div className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
                {sessions.map((session, index) => (
                    <AccordionItem
                        key={session.id}
                        value={session.id}
                        className="border border-border/50 rounded-lg mb-4 px-4 bg-card/50 backdrop-blur-sm hover:shadow-md transition-all"
                    >
                        <AccordionTrigger className="hover:no-underline py-4">
                            <div className="flex items-center gap-4 text-left w-full">
                                <div
                                    className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                                        completedSessions.includes(session.id)
                                            ? "bg-green-500 text-white"
                                            : "bg-primary/10 text-primary"
                                    )}
                                >
                                    {completedSessions.includes(session.id) ? (
                                        <CheckCircle2 className="w-5 h-5" />
                                    ) : (
                                        index + 1
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-foreground">{session.title}</h4>
                                    <p className="text-sm text-muted-foreground">{session.duration} • {session.modules.length} Modules</p>
                                </div>
                                {session.theme && (
                                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                                        {session.theme}
                                    </span>
                                )}
                                {voiceMode && (
                                    <div className="flex items-center gap-1.5 px-2 py-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full text-white text-xs shrink-0 animate-pulse">
                                        <Mic className="w-3 h-3" />
                                        <span>Voice Active</span>
                                    </div>
                                )}
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4">
                            <div className="pl-12 pr-4 space-y-4">
                                <p className="text-sm text-muted-foreground bg-background/50 p-3 rounded-md border border-border/50">
                                    {session.description}
                                </p>

                                {/* Learning Outcomes */}
                                {session.learningOutcomes && session.learningOutcomes.length > 0 && (
                                    <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-200 dark:border-green-900">
                                        <p className="text-xs font-semibold text-green-800 dark:text-green-400 uppercase tracking-wide mb-2">🎯 Learning Outcomes</p>
                                        <ul className="space-y-1">
                                            {session.learningOutcomes.map((outcome, idx) => (
                                                <li key={idx} className="text-sm text-green-700 dark:text-green-300 flex items-start gap-2">
                                                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                                                    {outcome}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className="grid gap-2">
                                    {session.modules.map((module) => {
                                        const isCompleted = completedModules.has(module.id);
                                        return (
                                            <div
                                                key={module.id}
                                                className={cn(
                                                    "flex items-center gap-3 p-2 rounded-md transition-colors cursor-pointer group",
                                                    isCompleted
                                                        ? "bg-green-50 dark:bg-green-950/30 hover:bg-green-100"
                                                        : "hover:bg-accent/10"
                                                )}
                                                onClick={() => {
                                                    setActiveSession(session);
                                                    setActiveModule(module);
                                                }}
                                            >
                                                <div className={cn(
                                                    "w-8 h-8 rounded-md flex items-center justify-center shrink-0 transition-colors",
                                                    isCompleted
                                                        ? "bg-green-500 text-white"
                                                        : "bg-secondary group-hover:bg-accent group-hover:text-white"
                                                )}>
                                                    {isCompleted ? (
                                                        <CheckCircle2 className="w-4 h-4" />
                                                    ) : (
                                                        moduleIcons[module.type] || <Play className="w-4 h-4" />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium text-sm">{module.title}</p>
                                                    <p className="text-xs text-muted-foreground">{module.duration}</p>
                                                </div>
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <div className={cn(
                                                        "px-2 py-1 rounded text-xs",
                                                        isCompleted
                                                            ? "bg-green-500 text-white"
                                                            : "bg-primary text-primary-foreground"
                                                    )}>
                                                        {isCompleted ? "Review" : "Start"}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <Button
                                    className="w-full mt-2"
                                    variant="default"
                                    disabled={completedSessions.includes(session.id)}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (!completedSessions.includes(session.id)) {
                                            setCompletedSessions([...completedSessions, session.id]);
                                        }
                                    }}
                                >
                                    {completedSessions.includes(session.id) ? "Completed" : "Mark Complete"}
                                </Button>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );

    return (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="pl-0 hover:bg-transparent hover:text-primary transition-colors text-muted-foreground"
                        onClick={onBack}
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Back to Simulators
                    </Button>
                    <h2 className="text-2xl font-bold text-foreground">Entrepreneur Skills Simulator</h2>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>🚀 48 Sessions</span>
                        <span>⏱️ 29-44 Hours Content</span>
                    </div>
                </div>

                <div className="flex items-center gap-4 bg-card p-3 rounded-xl border border-border shadow-sm">
                    <div className="flex flex-col text-right">
                        <span className="text-sm font-semibold">Interaction Mode</span>
                        <span className="text-xs text-muted-foreground">{voiceMode ? "Voice + Chat" : "Standard"}</span>
                    </div>
                    <Switch checked={voiceMode} onCheckedChange={setVoiceMode}>
                        <span className="sr-only">Toggle Voice Mode</span>
                    </Switch>
                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center transition-colors", voiceMode ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white" : "bg-muted text-muted-foreground")}>
                        {voiceMode ? <Mic className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
                    </div>
                </div>
            </div>

            {/* Progress */}
            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Course Progress</span>
                    <span className="font-semibold text-primary">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
            </div>

            {/* Curriculum Tabs */}
            <Tabs defaultValue="teaching" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8 h-12">
                    <TabsTrigger value="teaching" className="text-sm md:text-base">Targeted Teaching</TabsTrigger>
                    <TabsTrigger value="activity" className="text-sm md:text-base">Activity Sessions</TabsTrigger>
                    <TabsTrigger value="projects" className="text-sm md:text-base">Projects</TabsTrigger>
                </TabsList>
                <TabsContent value="teaching" className="mt-0">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-2xl border border-blue-100 dark:border-blue-900">
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-1">Knowledge Foundation</h3>
                            <p className="text-blue-700/80 dark:text-blue-300/80 text-sm">Build your mental framework with core concepts.</p>
                        </div>
                        {renderSessionList(entrepreneurCurriculum.teaching)}
                    </div>
                </TabsContent>
                <TabsContent value="activity" className="mt-0">
                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 p-6 rounded-2xl border border-orange-100 dark:border-orange-900">
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-orange-900 dark:text-orange-100 mb-1">Hands-on Practice</h3>
                            <p className="text-orange-700/80 dark:text-orange-300/80 text-sm">Apply what you've learned in real scenarios.</p>
                        </div>
                        {renderSessionList(entrepreneurCurriculum.activity)}
                    </div>
                </TabsContent>
                <TabsContent value="projects" className="mt-0">
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-2xl border border-purple-100 dark:border-purple-900">
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-purple-900 dark:text-purple-100 mb-1">Capstone Projects</h3>
                            <p className="text-purple-700/80 dark:text-purple-300/80 text-sm">Build your portfolio with major milestones.</p>
                        </div>
                        {renderSessionList(entrepreneurCurriculum.projects)}
                    </div>
                </TabsContent>
            </Tabs>

            {/* Module Player Dialog */}
            <Dialog open={!!activeModule} onOpenChange={(open) => !open && setActiveModule(null)}>
                <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white">
                                {activeModule && (moduleIcons[activeModule.type] || <Play className="w-4 h-4" />)}
                            </div>
                            {activeModule?.title}
                        </DialogTitle>
                        <DialogDescription>
                            {activeSession?.title} • {activeModule?.duration}
                        </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="flex-1 pr-4">
                        <div className="py-6 px-1">
                            {activeModule && renderModuleContent(activeModule)}
                        </div>
                    </ScrollArea>
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="outline" onClick={() => setActiveModule(null)}>Close</Button>
                        <Button
                            onClick={() => activeModule && handleModuleComplete(activeModule.id)}
                            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                        >
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Complete Module
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default EntreSkillsSimulator;
