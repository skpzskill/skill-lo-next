import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
    ChevronLeft,
    ChevronDown,
    CheckCircle2,
    Play,
    Trophy,
    Sparkles,
    Clock,
    Target,
    ArrowRight,
    Star,
    Zap,
    Lightbulb,
    Search,
    Rocket,
    Heart,
    Brain,
    Gift,
    Palette,
    Users,
    Crown,
    Layout,
    Sticker,
    Download,
    Share2,
    Smile,
    ArrowUpRight
} from "lucide-react";
import { learningWorlds, LearningWorld, LearningZone, ZoneActivity, StudentProgress, calculateProgress } from "@/data/learning-worlds";
import { cn } from "@/lib/utils";

interface EntreSkillsSimulatorProps {
    onBack: () => void;
}

type ViewMode = 'map' | 'world' | 'zone' | 'activity';

const EntreSkillsSimulator = ({ onBack }: EntreSkillsSimulatorProps) => {
    // State management
    const [progress, setProgress] = useState<StudentProgress>({
        worldsCompleted: [],
        zonesCompleted: [],
        badgesEarned: [],
        currentWorld: null,
        currentZone: null,
        journeyBookPages: {}
    });

    const [viewMode, setViewMode] = useState<ViewMode>('map');
    const [selectedWorld, setSelectedWorld] = useState<LearningWorld | null>(null);
    const [selectedZone, setSelectedZone] = useState<LearningZone | null>(null);
    const [selectedActivity, setSelectedActivity] = useState<ZoneActivity | null>(null);
    const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
    const [mindMapProgress, setMindMapProgress] = useState<string[]>([]);
    const [selectedMindMapNode, setSelectedMindMapNode] = useState<any | null>(null);
    const mindMapDetailsRef = useRef<HTMLDivElement>(null);

    // Calculate overall progress
    const overallProgress = calculateProgress(progress);

    // Handle world selection
    const handleWorldClick = (world: LearningWorld) => {
        setSelectedWorld(world);
        setViewMode('world');
        setProgress(prev => ({ ...prev, currentWorld: world.id }));
    };

    // Handle zone selection
    const handleZoneClick = (zone: LearningZone) => {
        setSelectedZone(zone);
        setCurrentActivityIndex(0);
        setSelectedActivity(zone.activities[0]);
        setViewMode('zone');
        setProgress(prev => ({ ...prev, currentZone: zone.id }));
    };

    // Navigate activities
    const handleNextActivity = () => {
        if (selectedZone && currentActivityIndex < selectedZone.activities.length - 1) {
            const nextIndex = currentActivityIndex + 1;
            setCurrentActivityIndex(nextIndex);
            setSelectedActivity(selectedZone.activities[nextIndex]);
        }
    };

    const handlePrevActivity = () => {
        if (selectedZone && currentActivityIndex > 0) {
            const prevIndex = currentActivityIndex - 1;
            setCurrentActivityIndex(prevIndex);
            setSelectedActivity(selectedZone.activities[prevIndex]);
        }
    };

    // Handle zone completion
    const handleZoneComplete = () => {
        if (selectedZone) {
            setProgress(prev => ({
                ...prev,
                zonesCompleted: [...prev.zonesCompleted, selectedZone.id]
            }));
            setViewMode('world');
            setSelectedZone(null);
        }
    };

    // Handle world completion
    const handleWorldComplete = () => {
        if (selectedWorld) {
            setProgress(prev => ({
                ...prev,
                worldsCompleted: [...prev.worldsCompleted, selectedWorld.id],
                badgesEarned: [...prev.badgesEarned, selectedWorld.badge.id]
            }));
            setViewMode('map');
            setSelectedWorld(null);
        }
    };

    // Render activity content
    const renderActivityContent = (activity: ZoneActivity) => {
        if (activity.videoPlaceholder) {
            return (
                <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
                    {activity.image && (
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
                            <img
                                src={activity.image}
                                alt={activity.title}
                                className="w-full h-auto object-cover max-h-[400px]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                                <h4 className="text-white text-3xl font-bold">{activity.title}</h4>
                            </div>
                        </div>
                    )}

                    <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-8 rounded-3xl border-4 border-dashed border-purple-300 dark:border-purple-700">
                        <div className="flex flex-col items-center justify-center text-center space-y-6">
                            <div className="relative">
                                <div className="absolute inset-0 bg-purple-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                                <Play className="w-20 h-20 text-purple-500 relative z-10" />
                            </div>
                            <div>
                                <h4 className="font-bold text-2xl text-purple-900 dark:text-purple-100 mb-2">
                                    🎬 Watch & Learn!
                                </h4>
                                <p className="text-lg text-purple-700 dark:text-purple-300 mb-6 max-w-lg mx-auto">
                                    {activity.description}
                                </p>
                                <div className="flex gap-3 justify-center">
                                    <Button size="lg" className="bg-purple-500 hover:bg-purple-600">
                                        <Play className="w-5 h-5 mr-2" />
                                        Play Video
                                    </Button>
                                    <Button size="lg" variant="outline">
                                        View Transcript
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {activity.content?.discussion && (
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border-2 border-primary/20 shadow-xl">
                            <h4 className="font-bold text-2xl mb-6 flex items-center gap-3 text-primary">
                                <Users className="w-7 h-7" />
                                Let's Discuss!
                            </h4>
                            <div className="grid gap-4">
                                {activity.content.discussion.map((q: string, i: number) => (
                                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
                                        <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                                            {i + 1}
                                        </div>
                                        <p className="text-lg font-medium">{q}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            );
        }

        switch (activity.type) {
            case 'story':
                return (
                    <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
                        {activity.image && (
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
                                <img
                                    src={activity.image}
                                    alt={activity.title}
                                    className="w-full h-auto object-cover max-h-[400px]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                                    <h4 className="text-white text-3xl font-bold">{activity.title}</h4>
                                </div>
                            </div>
                        )}

                        <div className="bg-white dark:bg-gray-800/50 p-8 rounded-3xl border-2 border-primary/20 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Sparkles className="w-24 h-24 text-primary" />
                            </div>
                            <div className="prose prose-xl dark:prose-invert max-w-none relative z-10">
                                <p className="text-xl leading-relaxed whitespace-pre-line text-foreground/90 font-medium">
                                    {activity.content?.narrative}
                                </p>
                            </div>
                        </div>

                        {activity.content?.keyPoints && (
                            <div className={cn(
                                "grid gap-6",
                                typeof activity.content.keyPoints[0] === 'string' ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
                            )}>
                                {activity.content.keyPoints.map((point: any, idx: number) => {
                                    if (typeof point === 'string') {
                                        return (
                                            <div key={idx} className="bg-primary/5 p-4 rounded-2xl flex items-center gap-4 border border-primary/10">
                                                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0">
                                                    {idx + 1}
                                                </div>
                                                <p className="font-semibold text-foreground/80">{point}</p>
                                            </div>
                                        );
                                    } else {
                                        // Handle structured Object points (like Job Maker vs Taker)
                                        return (
                                            <div key={idx} className={cn(
                                                "p-6 rounded-2xl border-4",
                                                point.type === 'maker' ? "bg-green-50/50 dark:bg-green-950/20 border-green-200" : "bg-blue-50/50 dark:bg-blue-950/20 border-blue-200"
                                            )}>
                                                <h4 className="font-bold text-xl mb-4 flex items-center gap-2">
                                                    {point.title}
                                                </h4>
                                                <ul className="space-y-2">
                                                    {point.points?.map((p: string, i: number) => (
                                                        <li key={i} className="flex items-start gap-2">
                                                            <div className={cn("w-2 h-2 rounded-full mt-2 shrink-0", point.type === 'maker' ? "bg-green-500" : "bg-blue-500")} />
                                                            <span>{p}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        )}

                        {activity.content?.discussionQuestions && (
                            <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 p-8 rounded-3xl border-2 border-blue-500/20">
                                <h4 className="font-bold text-2xl mb-6 flex items-center gap-3 text-blue-600">
                                    <Users className="w-8 h-8" />
                                    Discovery Circle - Let's Talk!
                                </h4>
                                <div className="grid gap-4">
                                    {activity.content.discussionQuestions.map((q: any, idx: number) => (
                                        <div key={idx} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-blue-200 dark:border-blue-900 group hover:border-blue-500 transition-all">
                                            <div className="flex gap-4">
                                                <span className="text-4xl">{q.emoji || '❓'}</span>
                                                <div>
                                                    <p className="text-xl font-bold mb-2">{q.question}</p>
                                                    {q.hint && (
                                                        <p className="text-muted-foreground flex items-center gap-2">
                                                            <Lightbulb className="w-4 h-4 text-amber-500" />
                                                            Hint: {q.hint}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                );

            case 'comparison':
                return (
                    <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
                        {activity.image && (
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 h-64">
                                <img
                                    src={activity.image}
                                    alt={activity.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                                    <h4 className="text-white text-3xl font-bold">{activity.title}</h4>
                                </div>
                            </div>
                        )}

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-xl border-2 border-primary/10">
                            <p className="text-xl text-center mb-8 font-medium text-muted-foreground">{activity.content?.narrative}</p>

                            <div className="overflow-hidden rounded-xl border-2 border-primary/20">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-primary/10">
                                            {activity.content?.columns?.map((col: string, i: number) => (
                                                <th key={i} className="p-4 text-left font-bold text-lg md:text-xl border-b-2 border-primary/20 first:pl-6">{col}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {activity.content?.rows?.map((row: string[], i: number) => (
                                            <tr key={i} className="even:bg-muted/30 hover:bg-muted/50 transition-colors">
                                                {row.map((cell: string, j: number) => (
                                                    <td key={j} className="p-4 text-lg border-b border-primary/10 first:font-bold first:pl-6">
                                                        {cell}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {activity.content?.discussionQuestions && (
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border-2 border-blue-200 dark:border-blue-800">
                                <h4 className="font-bold text-xl mb-4 flex items-center gap-2 text-blue-600 dark:text-blue-400">
                                    <Users className="w-6 h-6" />
                                    Let's Discuss!
                                </h4>
                                {activity.content.discussionQuestions.map((q: any, i: number) => (
                                    <div key={i} className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                                        <span className="text-3xl">{q.emoji}</span>
                                        <p className="text-lg font-medium">{q.question}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );

            case 'creation':
                // Helper to render prompts
                const renderPrompt = (prompt: any) => (
                    <div key={prompt.id} className="space-y-4">
                        <label className="text-xl font-bold flex items-center gap-3">
                            <span className="text-3xl bg-green-100 dark:bg-green-900 rounded-full w-12 h-12 flex items-center justify-center shadow-sm">
                                {prompt.emoji || '✨'}
                            </span>
                            {prompt.label}
                        </label>

                        {prompt.type === 'text' && (
                            <input type="text" className="w-full p-4 rounded-xl border-2 border-primary/20 bg-background text-lg font-medium focus:ring-2 focus:ring-primary" placeholder="Type here..." />
                        )}
                        {prompt.type === 'textarea' && (
                            <textarea className="w-full p-4 rounded-xl border-2 border-primary/20 bg-background text-lg font-medium focus:ring-2 focus:ring-primary h-32 resize-none" placeholder="Share your thoughts..." />
                        )}
                        {prompt.type === 'radio' && (
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                                {prompt.options.map((opt: string) => (
                                    <Button key={opt} variant="outline" className="h-auto py-4 text-lg justify-start px-6 border-2">
                                        <div className="w-5 h-5 rounded-full border-2 border-current mr-3" />
                                        {opt}
                                    </Button>
                                ))}
                            </div>
                        )}
                        {prompt.type === 'drawing' && (
                            <div className="aspect-video bg-white dark:bg-stone-900 rounded-xl border-2 border-dashed border-primary/40 flex items-center justify-center cursor-pointer hover:bg-primary/5 transition-colors group">
                                <div className="text-center group-hover:scale-110 transition-transform">
                                    <Palette className="w-12 h-12 mx-auto text-primary/40 mb-2" />
                                    <p className="font-bold text-primary/60">Tap to Start Drawing</p>
                                </div>
                            </div>
                        )}
                    </div>
                );

                return (
                    <div className="space-y-6 animate-in slide-in-from-bottom duration-500">
                        {/* New Wrapper for Multi-Step Workshop */}
                        {activity.content?.steps ? (
                            <div className="space-y-12">
                                {activity.content.steps.map((step: any, idx: number) => (
                                    <div key={idx} className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border-2 border-primary/10 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 bg-primary/10 text-primary font-black px-6 py-2 rounded-bl-2xl text-xl">
                                            STEP {idx + 1}
                                        </div>
                                        <h3 className="text-3xl font-black mb-8 text-primary">{step.title}</h3>
                                        <div className="space-y-8">
                                            {step.prompts.map((p: any) => renderPrompt(p))}
                                        </div>
                                        {step.timer && (
                                            <div className="mt-8 flex items-center gap-2 text-muted-foreground font-semibold bg-stone-100 dark:bg-stone-900 w-fit px-4 py-2 rounded-full">
                                                <Clock className="w-5 h-5" />
                                                Suggested Time: {step.timer} Minutes
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <div className="flex justify-center pt-8">
                                    <Button size="lg" className="text-2xl h-20 px-12 rounded-full shadow-2xl hover:scale-105 transition-transform bg-gradient-to-r from-green-500 to-emerald-600 border-4 border-white/20">
                                        <Trophy className="w-8 h-8 mr-3 animate-bounce" />
                                        Complete Workshop!
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Fallback for Legacy/Badge/Journey */}
                                {activity.image && !activity.content?.type && (
                                    <div className="w-full max-h-[300px] rounded-3xl overflow-hidden shadow-lg border-2 border-white/20">
                                        <img src={activity.image} alt={activity.title} className="w-full h-full object-cover" />
                                    </div>
                                )}

                                {(activity.content?.prompts || activity.content?.instruction) && (
                                    <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border-2 border-primary/20">
                                        <h4 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                            <Sparkles className="w-6 h-6 text-yellow-500" />
                                            {activity.description}
                                        </h4>
                                        <p className="text-lg mb-6 text-muted-foreground">{activity.content?.instruction}</p>

                                        {activity.content?.prompts && (
                                            <div className="space-y-8">
                                                {activity.content.prompts.map((p: any) => renderPrompt(p))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Badge Generation Logic */}
                                {(activity.content?.type === 'badge-generation' || activity.content?.type === 'badge-unlock') && (
                                    <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border-2 border-primary/20 text-center py-12 space-y-6">
                                        <div className="w-64 h-64 mx-auto relative animate-bounce">
                                            <div className="absolute inset-0 bg-yellow-400 blur-3xl opacity-30 animate-pulse" />
                                            <img src={activity.content?.badgeImage || activity.image} className="relative z-10 drop-shadow-2xl" alt="Badge" />
                                        </div>
                                        <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                                            OFFICIAL EXPLORER!
                                        </h3>
                                        <p className="text-xl font-medium text-muted-foreground">{activity.content?.message || "You did it!"}</p>
                                        <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-xl px-12 py-6 rounded-2xl shadow-xl">
                                            <Download className="w-6 h-6 mr-2" />
                                            Save My Badge
                                        </Button>
                                    </div>
                                )}

                                {/* Journey Book Logic */}
                                {activity.content?.type === 'journey-book' && (
                                    <div className="space-y-8">
                                        <div className="bg-stone-50 dark:bg-stone-950 p-8 rounded-xl border-8 border-stone-200 dark:border-stone-800 shadow-2xl min-h-[600px] flex flex-col relative overflow-hidden">
                                            {/* Journey Book Rendering Logic Here */}
                                            <div className="text-center p-12">
                                                <h2 className="text-4xl font-serif text-stone-800 dark:text-stone-200">My Adventure Book</h2>
                                                <p className="text-stone-500 mt-4">Coming soon...</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        <Button size="lg" className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-xl py-8 font-black">
                            <Star className="w-6 h-6 mr-3" />
                            SAVE MY WORK!
                        </Button>
                    </div>
                );

            case 'quiz':
                return (
                    <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
                        {activity.content?.results ? (
                            <div className="grid gap-6">
                                <div className="text-center space-y-4 mb-8">
                                    <div className="text-7xl">🎉</div>
                                    <h3 className="text-4xl font-black">Your Discovery Result!</h3>
                                    <p className="text-xl text-muted-foreground">{activity.description}</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {Object.entries(activity.content.results).map(([key, result]: [string, any]) => (
                                        <div key={key} className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] border-4 border-primary/10 shadow-xl space-y-4 hover:border-primary transition-all group overflow-hidden relative">
                                            <div className="absolute -top-4 -right-4 text-9xl opacity-5 group-hover:opacity-10 transition-opacity">
                                                {result.emoji}
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="text-5xl">{result.emoji}</span>
                                                <h4 className="text-2xl font-bold">{result.title}</h4>
                                            </div>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {result.description}
                                            </p>
                                            <div className="bg-primary/5 p-4 rounded-2xl flex items-center gap-3">
                                                <Smile className="w-6 h-6 text-primary" />
                                                <span className="font-bold text-primary">{result.motto}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Button size="lg" className="w-full py-8 text-2xl font-black mt-8" onClick={() => setViewMode('world')}>
                                    EXPLORE MORE SUPERPOWERS!
                                </Button>
                            </div>
                        ) : (
                            <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 p-8 rounded-3xl border-2 border-violet-200 dark:border-violet-800 shadow-xl">
                                <h4 className="font-bold text-2xl mb-6 flex items-center gap-3">
                                    <Trophy className="w-7 h-7 text-violet-500" />
                                    {activity.title}
                                </h4>
                                {activity.content?.questions?.map((q: any, idx: number) => (
                                    <div key={idx} className="mb-8 last:mb-0">
                                        <div className="flex gap-4 mb-4">
                                            <div className="w-10 h-10 rounded-full bg-violet-500 text-white flex items-center justify-center font-bold shrink-0">
                                                {idx + 1}
                                            </div>
                                            <p className="font-bold text-2xl">{q.q}</p>
                                        </div>
                                        <div className="grid gap-3 pl-14">
                                            {q.options?.map((opt: any, optIdx: number) => (
                                                <label key={optIdx} className="flex items-center gap-4 p-6 rounded-2xl border-2 border-violet-200 dark:border-violet-800 hover:bg-violet-100 dark:hover:bg-violet-900/50 cursor-pointer transition-all hover:scale-102 bg-white dark:bg-gray-900 group">
                                                    <input type="radio" name={`q${idx}`} className="w-6 h-6 accent-violet-500" />
                                                    <div className="flex-1">
                                                        <span className="text-lg font-bold block mb-1">{opt.text}</span>
                                                        <span className="text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">Select this if it feels like YOU!</span>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                <Button size="lg" className="w-full mt-6 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-2xl py-8 font-black">
                                    <Sparkles className="w-6 h-6 mr-3" />
                                    SEE MY RESULTS!
                                </Button>
                            </div>
                        )}
                    </div>
                );

            case 'game':
                if (activity.content?.type === 'interactive-mindmap') {
                    return (
                        <div className="space-y-6 animate-in zoom-in duration-500">
                            <div className="bg-gradient-to-br from-indigo-500/5 to-purple-500/5 p-4 rounded-3xl border-2 border-indigo-500/20 relative overflow-hidden min-h-[400px] flex flex-col items-center justify-center">
                                {/* Center Node */}
                                <div className="relative z-10 w-36 h-36 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-2xl flex flex-col items-center justify-center text-white text-center p-3 border-6 border-white dark:border-gray-800 animate-pulse">
                                    <span className="text-4xl mb-1">{activity.content.centerNode.emoji}</span>
                                    <span className="font-bold text-xs leading-tight">{activity.content.centerNode.text}</span>
                                </div>

                                {/* Connecting Lines (Simplified) */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                                    <div className="w-[75%] h-[75%] border-4 border-dashed border-indigo-500 rounded-full animate-spin-slow"></div>
                                </div>

                                {/* Nodes */}
                                {activity.content.nodes.map((node: any, idx: number) => {
                                    const angle = (idx * (360 / activity.content.nodes.length)) * (Math.PI / 180);
                                    const x = 50 + 35 * Math.cos(angle);
                                    const y = 50 + 35 * Math.sin(angle);
                                    const isUnlocked = mindMapProgress.includes(node.id);

                                    return (
                                        <div
                                            key={node.id}
                                            onClick={() => {
                                                setSelectedMindMapNode(node);
                                                if (!isUnlocked) setMindMapProgress([...mindMapProgress, node.id]);
                                                // Auto-scroll to details after a short delay to allow re-render
                                                setTimeout(() => {
                                                    mindMapDetailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                }, 100);
                                            }}
                                            className={cn(
                                                "absolute w-20 h-20 rounded-full shadow-lg border-4 border-white dark:border-gray-800 cursor-pointer transition-all hover:scale-110 z-20 flex flex-col items-center justify-center text-white font-bold",
                                                `bg-gradient-to-br ${node.color}`,
                                                isUnlocked ? "opacity-100 ring-4 ring-green-500 ring-offset-4 ring-offset-transparent scale-110 z-30 shadow-2xl" : "opacity-90 hover:opacity-100"
                                            )}
                                            style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                                        >
                                            <span className="text-2xl">{node.emoji}</span>
                                            <span className="text-sm">{node.letter}</span>
                                            {isUnlocked && (
                                                <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1 shadow-md">
                                                    <CheckCircle2 className="w-3 h-3 text-white" />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Down Arrow Indicator if node clicked */}
                            {!selectedMindMapNode && mindMapProgress.length > 0 && (
                                <div className="flex flex-col items-center animate-bounce text-muted-foreground opacity-50">
                                    <p className="text-xs font-bold mb-1">Click a bubble for details!</p>
                                    <ChevronDown className="w-6 h-6" />
                                </div>
                            )}

                            {/* Selected Node Details */}
                            {selectedMindMapNode && (
                                <div
                                    ref={mindMapDetailsRef}
                                    className="bg-white dark:bg-gray-800 p-6 rounded-3xl border-4 border-indigo-500/30 shadow-2xl animate-in slide-in-from-bottom duration-300 scroll-mt-24"
                                >
                                    <div className="flex items-center gap-5 mb-5">
                                        <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-lg", `bg-gradient-to-br ${selectedMindMapNode.color}`)}>
                                            {selectedMindMapNode.emoji}
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-bold">{selectedMindMapNode.word}</h4>
                                            <p className="text-lg text-muted-foreground">{selectedMindMapNode.description}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-primary/5 p-6 rounded-2xl">
                                            <h5 className="font-bold text-lg mb-4 flex items-center gap-2">
                                                <Target className="w-5 h-5 text-primary" />
                                                Examples
                                            </h5>
                                            <ul className="space-y-3">
                                                {selectedMindMapNode.examples.map((ex: string, i: number) => (
                                                    <li key={i} className="flex items-start gap-2">
                                                        <span>✨</span>
                                                        <span className="text-lg">{ex}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="bg-amber-500/10 p-6 rounded-2xl border-2 border-amber-500/20">
                                            <h5 className="font-bold text-lg mb-4 flex items-center gap-2 text-amber-600">
                                                <Zap className="w-5 h-5" />
                                                {selectedMindMapNode.activity.title}
                                            </h5>
                                            <p className="text-xl font-bold text-amber-700 dark:text-amber-400">
                                                {selectedMindMapNode.activity.task}
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() => setSelectedMindMapNode(null)}
                                        className="w-full mt-6"
                                        variant="outline"
                                    >
                                        Close Details
                                    </Button>
                                </div>
                            )}

                            <div className="flex justify-between items-center bg-white dark:bg-gray-900 p-4 rounded-2xl border">
                                <span className="font-bold">Superpowers Unlocked: {mindMapProgress.length} / {activity.content.nodes.length}</span>
                                <Progress value={(mindMapProgress.length / activity.content.nodes.length) * 100} className="w-1/2" />
                            </div>
                        </div>
                    );
                }

                if (activity.content?.entrepreneurs) {
                    return (
                        <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
                            {activity.image && (
                                <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white dark:border-gray-800">
                                    <img
                                        src={activity.image}
                                        alt="Kid Entrepreneurs"
                                        className="w-full h-64 object-cover"
                                    />
                                </div>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {activity.content.entrepreneurs.map((ent: any, idx: number) => (
                                    <div key={idx} className="group perspective-1000">
                                        <div className={cn(
                                            "bg-gradient-to-br p-6 rounded-[2rem] border-4 border-white dark:border-gray-800 shadow-xl transition-all duration-500 transform group-hover:rotate-y-12 h-full flex flex-col",
                                            ent.color || "from-blue-500 to-indigo-600"
                                        )}>
                                            <div className="text-center mb-4">
                                                <div className="text-7xl mb-2 group-hover:scale-110 transition-transform">{ent.emoji}</div>
                                                <h4 className="text-2xl font-black text-white">{ent.name}</h4>
                                                <Badge className="bg-white/20 text-white border-0 mt-2">{ent.age}</Badge>
                                            </div>
                                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-white space-y-3 flex-1">
                                                <div>
                                                    <p className="text-xs uppercase font-bold opacity-60">Business</p>
                                                    <p className="font-bold">{ent.business}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs uppercase font-bold opacity-60">Success</p>
                                                    <p className="text-sm">{ent.achievement}</p>
                                                </div>
                                                <div className="pt-2 border-t border-white/20">
                                                    <p className="text-xs uppercase font-bold opacity-60">Lesson</p>
                                                    <p className="text-sm font-medium italic">"{ent.lesson}"</p>
                                                </div>
                                            </div>
                                            <Button className="mt-4 bg-white text-primary border-0 hover:bg-white/90">
                                                Read Full Story
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                }

                if (activity.content?.problems) {
                    return (
                        <div className="space-y-6">
                            <div className="bg-amber-100 dark:bg-amber-900/20 p-6 rounded-2xl border-2 border-amber-200 dark:border-amber-800 flex items-start gap-4">
                                <Search className="w-8 h-8 text-amber-500 shrink-0 mt-1" />
                                <p className="text-lg font-medium">{activity.content.instructions}</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {activity.content.problems.map((p: any) => (
                                    <Button
                                        key={p.id}
                                        variant="outline"
                                        className="h-auto p-6 flex flex-col items-start text-left gap-2 rounded-2xl hover:border-primary hover:bg-primary/5 border-2"
                                        onClick={() => {/* Handle problem selection */ }}
                                    >
                                        <span className="text-lg font-bold">{p.text}</span>
                                        <span className="text-xs text-muted-foreground">+{p.points} Points</span>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    );
                }

                return (
                    <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 p-12 rounded-3xl border-4 border-blue-300 dark:border-blue-700 shadow-2xl animate-in zoom-in duration-500">
                        <div className="flex flex-col items-center justify-center text-center space-y-6">
                            <div className="text-8xl animate-bounce">🎮</div>
                            <div>
                                <h4 className="font-bold text-3xl text-blue-900 dark:text-blue-100 mb-4">
                                    Let's Play!
                                </h4>
                                <p className="text-xl text-blue-700 dark:text-blue-300 mb-6">
                                    {activity.description}
                                </p>
                                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-xl px-8 py-6">
                                    <Play className="w-6 h-6 mr-3" />
                                    Start Game
                                </Button>
                            </div>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="text-center p-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/30 dark:to-gray-800/30 rounded-3xl">
                        <Sparkles className="w-16 h-16 mx-auto mb-4 text-primary animate-pulse" />
                        <p className="text-xl text-muted-foreground">More fun activities coming soon!</p>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-pink-950/20">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-border shadow-lg">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onBack}
                                className="hover:bg-primary/10"
                            >
                                <ChevronLeft className="w-4 h-4 mr-1" />
                                Back
                            </Button>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    SkillPreneurZ Adventure
                                </h1>
                                <p className="text-sm text-muted-foreground">Your entrepreneurship journey awaits!</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="text-right">
                                <div className="text-3xl font-bold text-primary">{Math.round(overallProgress)}%</div>
                                <div className="text-xs text-muted-foreground">Progress</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Trophy className="w-6 h-6 text-yellow-500" />
                                <span className="font-bold text-lg">{progress.badgesEarned.length}</span>
                            </div>
                        </div>
                    </div>

                    <Progress value={overallProgress} className="h-2 mt-3" />
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                {/* World Map View */}
                {viewMode === 'map' && (
                    <div className="animate-in fade-in slide-in-from-bottom duration-700">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold mb-4">Choose Your Adventure!</h2>
                            <p className="text-xl text-muted-foreground">Click on a world to start your journey</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                            {learningWorlds.map((world, idx) => {
                                const isCompleted = progress.worldsCompleted.includes(world.id);
                                const isCurrent = progress.currentWorld === world.id;

                                return (
                                    <div
                                        key={world.id}
                                        onClick={() => handleWorldClick(world)}
                                        className={cn(
                                            "relative p-8 rounded-3xl border-4 transition-all duration-300 cursor-pointer group hover:scale-105 hover:shadow-2xl",
                                            isCompleted && "bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border-green-500 shadow-green-500/50",
                                            isCurrent && !isCompleted && "bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 border-blue-500 ring-4 ring-blue-500/50 shadow-blue-500/50",
                                            !isCompleted && !isCurrent && "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-primary"
                                        )}
                                        style={{ animationDelay: `${idx * 100}ms` }}
                                    >
                                        {isCompleted && (
                                            <div className="absolute -top-4 -right-4">
                                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-xl animate-bounce">
                                                    <CheckCircle2 className="w-8 h-8 text-white" />
                                                </div>
                                            </div>
                                        )}

                                        <div className="text-center space-y-4">
                                            <div className="text-7xl mb-4 group-hover:scale-110 transition-transform">{world.emoji}</div>
                                            <Badge variant="outline" className="text-sm px-3 py-1">
                                                World {world.worldNumber}
                                            </Badge>
                                            <h3 className="text-2xl font-bold">{world.name}</h3>
                                            <p className="text-sm text-muted-foreground">{world.description}</p>

                                            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-4 border-t border-border">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    {world.duration} min
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Target className="w-4 h-4" />
                                                    {world.zones.length} zones
                                                </span>
                                            </div>

                                            <Button className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground" size="lg">
                                                {isCurrent ? 'Continue' : 'Start'} Adventure
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* World Detail View */}
                {viewMode === 'world' && selectedWorld && (
                    <div className="animate-in fade-in slide-in-from-right duration-500">
                        <Button
                            variant="ghost"
                            onClick={() => setViewMode('map')}
                            className="mb-6"
                        >
                            <ChevronLeft className="w-4 h-4 mr-2" />
                            Back to Map
                        </Button>

                        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-2xl border-4 border-primary/20 mb-8 max-w-5xl mx-auto">
                            <div className="flex items-start gap-5 mb-6">
                                <div className="text-7xl">{selectedWorld.emoji}</div>
                                <div className="flex-1">
                                    <h2 className="text-3xl font-bold mb-2">{selectedWorld.name}</h2>
                                    <p className="text-lg text-muted-foreground mb-3">{selectedWorld.whatKidsExperience}</p>
                                    <div className="flex items-center gap-3">
                                        <Badge className="text-sm px-3 py-1">{selectedWorld.framework}</Badge>
                                        <Badge variant="outline" className="text-sm px-3 py-1">{selectedWorld.theme}</Badge>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 p-5 rounded-2xl border-2 border-primary/20 mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="text-4xl">{selectedWorld.mascot.emoji}</div>
                                    <div>
                                        <p className="font-bold text-lg">{selectedWorld.mascot.name}</p>
                                        <p className="text-sm text-muted-foreground">{selectedWorld.mascot.description}</p>
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <Sparkles className="w-6 h-6 text-primary" />
                                Learning Zones
                            </h3>

                            <div className="grid gap-4">
                                {selectedWorld.zones.map((zone, idx) => {
                                    const isZoneCompleted = progress.zonesCompleted.includes(zone.id);
                                    return (
                                        <div
                                            key={zone.id}
                                            onClick={() => handleZoneClick(zone)}
                                            className={cn(
                                                "p-6 rounded-2xl border-3 cursor-pointer transition-all hover:scale-102 hover:shadow-xl",
                                                isZoneCompleted
                                                    ? "bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border-green-500"
                                                    : "bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-gray-200 dark:border-gray-700 hover:border-primary"
                                            )}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={cn(
                                                    "w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold shrink-0",
                                                    isZoneCompleted ? "bg-green-500 text-white" : "bg-primary/20 text-primary"
                                                )}>
                                                    {isZoneCompleted ? <CheckCircle2 className="w-7 h-7" /> : idx + 1}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <span className="text-3xl">{zone.emoji}</span>
                                                        <h4 className="font-bold text-xl">{zone.name}</h4>
                                                    </div>
                                                    <p className="text-muted-foreground mb-2">{zone.description}</p>
                                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                        <span>{zone.duration} min</span>
                                                        <span>•</span>
                                                        <span>{zone.activities.length} activities</span>
                                                    </div>
                                                </div>
                                                <Button size="lg" className={isZoneCompleted ? "bg-green-500 hover:bg-green-600" : ""}>
                                                    {isZoneCompleted ? 'Review' : 'Start'}
                                                    <ArrowRight className="w-4 h-4 ml-2" />
                                                </Button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mt-6 flex gap-3">
                                <Button variant="outline" size="sm" onClick={() => setViewMode('map')} className="flex-1">
                                    Back to Map
                                </Button>
                                <Button size="sm" onClick={handleWorldComplete} className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                                    <Trophy className="w-4 h-4 mr-2" />
                                    Complete World
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Zone Activity View */}
                {viewMode === 'zone' && selectedZone && selectedActivity && (
                    <div className="animate-in fade-in slide-in-from-right duration-500 max-w-5xl mx-auto">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setViewMode('world')}
                            className="mb-4"
                        >
                            <ChevronLeft className="w-4 h-4 mr-2" />
                            Back to {selectedWorld?.name}
                        </Button>

                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-2xl border-4 border-primary/20">
                            {/* Zone Header */}
                            <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-border">
                                <div className="flex items-center gap-4">
                                    <span className="text-4xl">{selectedZone.emoji}</span>
                                    <div>
                                        <h2 className="text-2xl font-bold leading-tight">{selectedZone.name}</h2>
                                        <p className="text-sm text-muted-foreground">{selectedZone.description}</p>
                                    </div>
                                </div>
                                <div className="text-right shrink-0">
                                    <div className="text-xs text-muted-foreground">Activity</div>
                                    <div className="text-xl font-bold text-primary">
                                        {currentActivityIndex + 1} / {selectedZone.activities.length}
                                    </div>
                                </div>
                            </div>

                            {/* Activity Content */}
                            <div className="mb-6">
                                <h3 className="text-xl font-bold mb-4">{selectedActivity.title}</h3>
                                {renderActivityContent(selectedActivity)}
                            </div>

                            {/* Navigation */}
                            <div className="flex gap-4 pt-4 border-t-2 border-border">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handlePrevActivity}
                                    disabled={currentActivityIndex === 0}
                                    className="flex-1"
                                >
                                    <ChevronLeft className="w-4 h-4 mr-2" />
                                    Previous
                                </Button>

                                {currentActivityIndex === selectedZone.activities.length - 1 ? (
                                    <Button
                                        size="sm"
                                        onClick={handleZoneComplete}
                                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                                    >
                                        <CheckCircle2 className="w-4 h-4 mr-2" />
                                        Complete Zone!
                                    </Button>
                                ) : (
                                    <Button
                                        size="sm"
                                        onClick={handleNextActivity}
                                        className="flex-1"
                                    >
                                        Next Activity
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
};

export default EntreSkillsSimulator;
