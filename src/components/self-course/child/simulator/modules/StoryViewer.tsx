import { StoryContent } from "@/data/entrepreneur-curriculum";
import { BookOpen, MessageCircle, ChevronRight } from "lucide-react";
import { useState } from "react";

interface StoryViewerProps {
    story: StoryContent;
}

const StoryViewer = ({ story }: StoryViewerProps) => {
    const [showQuestions, setShowQuestions] = useState(false);

    return (
        <div className="space-y-6">
            {/* Story Header */}
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl border border-amber-200">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white">
                    <BookOpen className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-bold text-amber-900 text-lg">{story.title}</h3>
                    <p className="text-amber-700 text-sm">Story Time! 📖</p>
                </div>
            </div>

            {/* Story Content */}
            <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-300 via-orange-300 to-amber-300 rounded-full" />
                <div className="pl-10 space-y-4">
                    {story.narrative.split('\n\n').map((paragraph, idx) => (
                        <div
                            key={idx}
                            className="p-4 bg-white rounded-lg border border-amber-100 shadow-sm animate-in fade-in slide-in-from-left-2"
                            style={{ animationDelay: `${idx * 150}ms` }}
                        >
                            <p className="text-gray-700 leading-relaxed text-base">
                                {paragraph}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Discussion Questions Toggle */}
            <button
                onClick={() => setShowQuestions(!showQuestions)}
                className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:shadow-md transition-all group"
            >
                <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-blue-900">Discussion Questions</span>
                </div>
                <ChevronRight className={`w-5 h-5 text-blue-600 transition-transform ${showQuestions ? 'rotate-90' : ''}`} />
            </button>

            {/* Discussion Questions */}
            {showQuestions && (
                <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                    {story.discussionQuestions.map((question, idx) => (
                        <div
                            key={idx}
                            className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100"
                        >
                            <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
                                {idx + 1}
                            </div>
                            <p className="text-blue-900 font-medium">{question}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Teacher Prompts (styled subtly) */}
            {story.teacherPrompts && story.teacherPrompts.length > 0 && (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mt-4">
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-2">💡 Teaching Tips</p>
                    <ul className="space-y-1">
                        {story.teacherPrompts.map((prompt, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                <span className="text-gray-400">•</span>
                                {prompt}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default StoryViewer;
