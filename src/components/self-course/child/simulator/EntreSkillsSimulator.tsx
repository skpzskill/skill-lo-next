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
import { learningWorlds, LearningWorld, PowerPath as LearningZone, PowerPathActivity as ZoneActivity, StudentProgress, calculateProgress } from "@/data/learning-worlds";
import { cn } from "@/lib/utils";

interface EntreSkillsSimulatorProps {
    onBack: () => void;
}

type ViewMode = 'map' | 'world' | 'zone' | 'activity';

const EntreSkillsSimulator = ({ onBack }: EntreSkillsSimulatorProps) => {
    // State management
    const [progress, setProgress] = useState<StudentProgress>({
        worldsCompleted: [],
        powerPathsCompleted: [],
        badgesEarned: [],
        currentWorld: null,
        currentPowerPath: null,
        journeyBookPages: {}
    });

    const [viewMode, setViewMode] = useState<ViewMode>('map');
    const [selectedWorld, setSelectedWorld] = useState<LearningWorld | null>(null);
    const [selectedPowerPath, setSelectedPowerPath] = useState<LearningZone | null>(null);
    const [selectedActivity, setSelectedActivity] = useState<ZoneActivity | null>(null);

    // Interactive Trading Cards State
    const [activeCard, setActiveCard] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<string>('Story');
    const [cardProgress, setCardProgress] = useState<Record<string, 'locked' | 'playable' | 'mastered'>>({});

    const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
    // Mind Map State
    const [mindMapProgress, setMindMapProgress] = useState<string[]>([]);
    const [selectedMindMapNode, setSelectedMindMapNode] = useState<any | null>(null);
    const mindMapDetailsRef = useRef<HTMLDivElement>(null);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    // Calculate overall progress
    const overallProgress = calculateProgress(progress);

    // Handle world selection
    const handleWorldClick = (world: LearningWorld) => {
        setSelectedWorld(world);
        setViewMode('world');
        setProgress(prev => ({ ...prev, currentWorld: world.id }));
    };

    // Handle Power Path selection
    const handlePowerPathClick = (path: LearningZone) => {
        setSelectedPowerPath(path);
        setCurrentActivityIndex(0);
        setSelectedActivity(path.activities[0]);
        setIsVideoPlaying(false);
        setViewMode('zone');
        setProgress(prev => ({ ...prev, currentPowerPath: path.id }));
    };

    // Navigate activities
    const handleNextActivity = () => {
        if (selectedPowerPath && currentActivityIndex < selectedPowerPath.activities.length - 1) {
            const nextIndex = currentActivityIndex + 1;
            setCurrentActivityIndex(nextIndex);
            setSelectedActivity(selectedPowerPath.activities[nextIndex]);
            setIsVideoPlaying(false);
        }
    };

    const handlePrevActivity = () => {
        if (selectedPowerPath && currentActivityIndex > 0) {
            const prevIndex = currentActivityIndex - 1;
            setCurrentActivityIndex(prevIndex);
            setSelectedActivity(selectedPowerPath.activities[prevIndex]);
            setIsVideoPlaying(false);
        }
    };

    // Handle zone completion
    // Handle Power Path completion
    const handlePowerPathComplete = () => {
        if (selectedPowerPath) {
            setProgress(prev => ({
                ...prev,
                powerPathsCompleted: [...prev.powerPathsCompleted, selectedPowerPath.id]
            }));
            setViewMode('world');
            setSelectedPowerPath(null);
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
                        {activity.videoUrl ? (
                            <div className="space-y-6">
                                <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl bg-black">
                                    {activity.videoUrl.includes('youtube') || activity.videoUrl.includes('youtu.be') ? (
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={(() => {
                                                const url = activity.videoUrl;
                                                if (url.includes('youtu.be/')) return url.replace('youtu.be/', 'www.youtube.com/embed/');
                                                if (url.includes('watch?v=')) return url.replace('watch?v=', 'embed/');
                                                return url;
                                            })()}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    ) : (
                                        <video controls className="w-full h-full">
                                            <source src={activity.videoUrl} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    )}
                                </div>
                                <div className="text-center">
                                    <h4 className="font-bold text-2xl text-purple-900 dark:text-purple-100 mb-2">
                                        🎬 Watch & Learn!
                                    </h4>
                                    <p className="text-lg text-purple-700 dark:text-purple-300 mb-4 max-w-lg mx-auto">
                                        {activity.description}
                                    </p>
                                    <Button size="lg" variant="outline" className="bg-white/50 border-purple-200 hover:bg-white/80">
                                        View Transcript
                                    </Button>
                                </div>
                            </div>
                        ) : (
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
                                    <Button size="lg" className="bg-purple-500 hover:bg-purple-600">
                                        <Play className="w-5 h-5 mr-2" />
                                        Video Coming Soon
                                    </Button>
                                </div>
                            </div>
                        )}
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
                                    <div className="space-y-8 py-8">
                                        <div className="max-w-md mx-auto relative group">
                                            {/* Radium Glow Aura */}
                                            <div className="absolute -inset-4 bg-[#a3e635] rounded-[3rem] blur-3xl opacity-10 group-hover:opacity-25 transition-opacity animate-pulse"></div>

                                            {/* The Book Container */}
                                            <div className="relative bg-white rounded-[1.5rem] border-4 border-gray-200 shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-700 aspect-[3/4.2] transform hover:rotate-1 transition-transform">
                                                <img
                                                    src="/images/discovery-island/journey-book-cover.jpg"
                                                    className="w-full h-full object-cover"
                                                    alt="Journey Book Cover"
                                                />
                                            </div>

                                            {/* Book Shadow */}
                                            <div className="w-[70%] h-6 bg-black/20 blur-xl rounded-full mx-auto mt-6"></div>
                                        </div>

                                        <div className="flex flex-col items-center gap-4">
                                            <Button size="lg" className="bg-[#a3e635] hover:bg-[#8ecb2b] text-black font-black text-xl px-12 py-8 rounded-2xl shadow-[0_10px_0_#6a9d1d] active:translate-y-[2px] active:shadow-none transition-all uppercase">
                                                Activate Journey Book!
                                            </Button>
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
                                <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white dark:border-gray-800 relative group">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                    <img
                                        src={activity.image}
                                        alt="Kid Entrepreneurs"
                                        className="w-full h-64 object-cover"
                                    />
                                    <div className="absolute bottom-6 left-6 z-20 text-white">
                                        <h3 className="text-3xl font-black mb-2">Entrepreneur Trading Cards</h3>
                                        <p className="text-lg opacity-90">Collect them all by mastering skills!</p>
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {activity.content.entrepreneurs.map((ent: any) => {
                                    const cardState = cardProgress[ent.id] || 'locked'; // 'locked', 'playable', 'mastered'
                                    const isExpanded = activeCard === ent.id;

                                    if (isExpanded) {
                                        return (
                                            <div key={ent.id} className="col-span-1 md:col-span-3 bg-white dark:bg-gray-800 rounded-[2.5rem] border-4 border-primary/20 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                                                {/* Header */}
                                                <div className={`bg-gradient-to-r ${ent.color} p-6 text-white flex justify-between items-center`}>
                                                    <div className="flex items-center gap-4">
                                                        <div className="text-5xl bg-white/20 rounded-2xl p-2 backdrop-blur-sm">{ent.emoji}</div>
                                                        <div>
                                                            <h3 className="text-3xl font-black">{ent.name}</h3>
                                                            <p className="font-bold opacity-90">{ent.business}</p>
                                                        </div>
                                                    </div>
                                                    <Button variant="ghost" className="text-white hover:bg-white/20" onClick={() => setActiveCard(null)}>
                                                        Close Card
                                                    </Button>
                                                </div>

                                                {/* Tabs */}
                                                <div className="p-2 bg-gray-50 dark:bg-gray-900/50 flex gap-2 overflow-x-auto">
                                                    {['Story', 'Skill Play', 'Power Unlock'].map((tab) => (
                                                        <button
                                                            key={tab}
                                                            onClick={() => setActiveTab(tab)}
                                                            className={cn(
                                                                "flex-1 py-3 px-6 rounded-xl font-bold transition-all text-sm uppercase tracking-wide",
                                                                activeTab === tab
                                                                    ? "bg-white shadow-md text-primary"
                                                                    : "hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500"
                                                            )}
                                                        >
                                                            {tab}
                                                        </button>
                                                    ))}
                                                </div>

                                                {/* Content */}
                                                <div className="p-8 min-h-[400px]">
                                                    {activeTab === 'Story' && (
                                                        <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
                                                            <div className="grid gap-4">
                                                                {ent.storyFrames.map((frame: string, idx: number) => (
                                                                    <div key={idx} className="flex gap-4 items-start p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100">
                                                                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${ent.color} text-white flex items-center justify-center font-bold shrink-0`}>
                                                                            {idx + 1}
                                                                        </div>
                                                                        <p className="text-lg font-medium">{frame}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <Button size="lg" className="w-full mt-4" onClick={() => setActiveTab('Skill Play')}>
                                                                Start Challenge <ArrowRight className="w-4 h-4 ml-2" />
                                                            </Button>
                                                        </div>
                                                    )}

                                                    {activeTab === 'Skill Play' && (
                                                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                                            <div className="bg-indigo-50 dark:bg-indigo-950/30 p-6 rounded-3xl text-center">
                                                                <h4 className="text-2xl font-bold text-indigo-900 dark:text-indigo-200 mb-2">
                                                                    {ent.skill} Challenge! ⚡
                                                                </h4>
                                                                <p className="text-lg text-indigo-700 dark:text-indigo-300">
                                                                    {ent.challenge.text}
                                                                </p>
                                                            </div>

                                                            <div className="grid gap-3">
                                                                {ent.challenge.options.map((opt: string, idx: number) => (
                                                                    <button
                                                                        key={idx}
                                                                        onClick={() => {
                                                                            if (idx === ent.challenge.correctIndex) {
                                                                                // Success logic
                                                                                setCardProgress(prev => ({ ...prev, [ent.id]: 'mastered' }));
                                                                                setActiveTab('Power Unlock');
                                                                            } else {
                                                                                // Error feedback (could add toast)
                                                                                alert("Try again! Think like an entrepreneur.");
                                                                            }
                                                                        }}
                                                                        className="p-6 text-left rounded-2xl border-2 border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all font-bold text-lg"
                                                                    >
                                                                        {opt}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {activeTab === 'Power Unlock' && (
                                                        <div className="text-center py-12 animate-in zoom-in duration-500">
                                                            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-xl mb-6 animate-bounce">
                                                                <Star className="w-16 h-16 text-white" />
                                                            </div>
                                                            <h3 className="text-4xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                                                                POWER UNLOCKED!
                                                            </h3>
                                                            <p className="text-2xl font-bold text-gray-800 dark:text-white mb-8">
                                                                {ent.powerReward}
                                                            </p>
                                                            <Button size="lg" className="px-12 py-6 text-xl rounded-full" onClick={() => setActiveCard(null)}>
                                                                Collect & Continue
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    }

                                    return (
                                        <div
                                            key={ent.id}
                                            onClick={() => {
                                                setActiveCard(ent.id);
                                                setActiveTab('Story');
                                            }}
                                            className="group perspective-1000 cursor-pointer h-full"
                                        >
                                            <div className={cn(
                                                "bg-white dark:bg-gray-800 p-1 rounded-[2.5rem] border-4 border-gray-100 dark:border-gray-800 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col relative overflow-hidden",
                                                cardState === 'mastered' ? "ring-4 ring-yellow-400 ring-offset-4 ring-offset-white dark:ring-offset-gray-950" : ""
                                            )}>
                                                {/* Front Design */}
                                                <div className={`h-40 bg-gradient-to-br ${ent.color} rounded-[2rem] flex items-center justify-center relative overflow-hidden`}>
                                                    <div className="text-8xl transform group-hover:scale-110 transition-transform duration-500">{ent.emoji}</div>
                                                    {cardState === 'mastered' && (
                                                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full">
                                                            <CheckCircle2 className="w-6 h-6 text-white" />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="p-6 text-center space-y-2 flex-1 flex flex-col items-center">
                                                    <h4 className="text-2xl font-black text-gray-900 dark:text-white">{ent.name}</h4>
                                                    <Badge variant="secondary" className="mb-2">{ent.skill}</Badge>
                                                    <div className="flex items-center gap-1 text-xs font-bold text-muted-foreground uppercase tracking-widest mt-auto">
                                                        <span>Difficulty:</span>
                                                        <span className={cn(
                                                            ent.difficulty === 'Easy' ? "text-green-500" :
                                                                ent.difficulty === 'Medium' ? "text-yellow-500" : "text-red-500"
                                                        )}>{ent.difficulty}</span>
                                                    </div>
                                                </div>

                                                <div className="p-4 pt-0">
                                                    <div className={cn(
                                                        "w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors",
                                                        cardState === 'mastered'
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-gray-100 text-gray-500 group-hover:bg-primary group-hover:text-white"
                                                    )}>
                                                        {cardState === 'mastered' ? (
                                                            <>
                                                                <Star className="w-4 h-4 fill-current" />
                                                                Mastered
                                                            </>
                                                        ) : (
                                                            <>
                                                                Play Card
                                                                <ArrowRight className="w-4 h-4" />
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <Button size="lg" className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-xl py-8 font-black">
                                <Star className="w-6 h-6 mr-3" />
                                SAVE MY COLLECTION!
                            </Button>
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
                                                    {world.powerPaths.length} Power Paths
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
                                    <p className="text-lg text-muted-foreground mb-3">{selectedWorld.description}</p>
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
                                Power Paths
                            </h3>

                            <div className="grid gap-4">
                                {selectedWorld.powerPaths.map((path, idx) => {
                                    const isPathCompleted = progress.powerPathsCompleted.includes(path.id);
                                    return (
                                        <div
                                            key={path.id}
                                            onClick={() => handlePowerPathClick(path)}
                                            className={cn(
                                                "p-6 rounded-2xl border-3 cursor-pointer transition-all hover:scale-102 hover:shadow-xl",
                                                isPathCompleted
                                                    ? "bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border-green-500"
                                                    : "bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-gray-200 dark:border-gray-700 hover:border-primary"
                                            )}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={cn(
                                                    "w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold shrink-0",
                                                    isPathCompleted ? "bg-green-500 text-white" : "bg-primary/20 text-primary"
                                                )}>
                                                    {isPathCompleted ? <CheckCircle2 className="w-7 h-7" /> : idx + 1}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <span className="text-3xl">{path.emoji}</span>
                                                        <h4 className="font-bold text-xl">{path.name}</h4>
                                                    </div>
                                                    <p className="text-muted-foreground mb-2">{path.description}</p>
                                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                        <span>{path.duration} min</span>
                                                        <span>•</span>
                                                        <span>{path.activities.length} activities</span>
                                                    </div>
                                                </div>
                                                <Button size="lg" className={isPathCompleted ? "bg-green-500 hover:bg-green-600" : ""}>
                                                    {isPathCompleted ? 'Review' : 'Start'}
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

                {/* Power Path Activity View */}
                {viewMode === 'zone' && selectedPowerPath && selectedActivity && (
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
                                    <span className="text-4xl">{selectedPowerPath.emoji}</span>
                                    <div>
                                        <h2 className="text-2xl font-bold leading-tight">{selectedPowerPath.name}</h2>
                                        <p className="text-sm text-muted-foreground">{selectedPowerPath.description}</p>
                                    </div>
                                </div>
                                <div className="text-right shrink-0">
                                    <div className="text-xs text-muted-foreground">Activity</div>
                                    <div className="text-xl font-bold text-primary">
                                        {currentActivityIndex + 1} / {selectedPowerPath.activities.length}
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

                                {currentActivityIndex === selectedPowerPath.activities.length - 1 ? (
                                    <Button
                                        size="sm"
                                        onClick={handlePowerPathComplete}
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
