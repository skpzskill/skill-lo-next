import { Play, Lightbulb, Target, BookOpen } from "lucide-react";

interface VideoModuleProps {
    description: string;
    keyPoints: string[];
    scriptPoints?: string[];
}

const VideoModule = ({ description, keyPoints, scriptPoints }: VideoModuleProps) => {
    return (
        <div className="space-y-6">
            {/* Video Placeholder */}
            <div className="relative aspect-video bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                            <Play className="w-8 h-8 text-blue-600 ml-1" />
                        </div>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span>Video Content</span>
                </div>

                <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white/90 text-sm">{description}</p>
                </div>
            </div>

            {/* Key Points */}
            <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <div className="flex items-center gap-2 mb-4">
                    <Target className="w-5 h-5 text-blue-600" />
                    <h4 className="font-bold text-blue-900">Key Learning Points</h4>
                </div>
                <div className="space-y-2">
                    {keyPoints.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-blue-100">
                            <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
                                {idx + 1}
                            </div>
                            <p className="text-gray-700">{point}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Script Points (Teacher Reference) */}
            {scriptPoints && scriptPoints.length > 0 && (
                <div className="p-5 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-200">
                    <div className="flex items-center gap-2 mb-4">
                        <BookOpen className="w-5 h-5 text-amber-600" />
                        <h4 className="font-bold text-amber-900">Talking Points</h4>
                    </div>
                    <div className="space-y-3">
                        {scriptPoints.map((point, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                                <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                                <p className="text-amber-800 italic">"{point}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoModule;
