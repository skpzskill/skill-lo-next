import { WorksheetPrompt } from "@/data/entrepreneur-curriculum";
import { useState } from "react";
import { PenTool, Sparkles } from "lucide-react";

interface WorksheetActivityProps {
    title: string;
    instructions: string;
    prompts: WorksheetPrompt[];
    onComplete?: (answers: Record<string, string>) => void;
}

const WorksheetActivity = ({ title, instructions, prompts, onComplete }: WorksheetActivityProps) => {
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (id: string, value: string) => {
        setAnswers(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = () => {
        setSubmitted(true);
        onComplete?.(answers);
    };

    const filledCount = prompts.filter(p => answers[p.id]?.trim()).length;
    const progress = (filledCount / prompts.length) * 100;

    if (submitted) {
        return (
            <div className="space-y-6 text-center py-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto animate-bounce">
                    <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Great Work! 🎉</h3>
                <p className="text-gray-600">You've completed your entrepreneur worksheet!</p>

                <div className="mt-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 text-left">
                    <h4 className="font-bold text-purple-900 mb-4">Your Business Idea:</h4>
                    {prompts.map(prompt => (
                        <div key={prompt.id} className="mb-4">
                            <p className="text-sm text-purple-600 font-medium">{prompt.label}</p>
                            <p className="text-gray-800 bg-white rounded-lg p-3 mt-1 border border-purple-100">
                                {answers[prompt.id] || "(not filled)"}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl border border-purple-200">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white">
                    <PenTool className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-bold text-purple-900 text-lg">{title}</h3>
                    <p className="text-purple-700 text-sm">{instructions}</p>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold text-purple-600">{filledCount} / {prompts.length}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
                {prompts.map((prompt, idx) => (
                    <div
                        key={prompt.id}
                        className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <label className="block font-medium text-gray-800 mb-2">
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-600 text-sm font-bold mr-2">
                                {idx + 1}
                            </span>
                            {prompt.label}
                        </label>
                        {prompt.type === "textarea" ? (
                            <textarea
                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all"
                                rows={3}
                                placeholder={prompt.placeholder}
                                value={answers[prompt.id] || ""}
                                onChange={(e) => handleChange(prompt.id, e.target.value)}
                            />
                        ) : (
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                placeholder={prompt.placeholder}
                                value={answers[prompt.id] || ""}
                                onChange={(e) => handleChange(prompt.id, e.target.value)}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Submit Button */}
            <button
                onClick={handleSubmit}
                disabled={filledCount < prompts.length}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${filledCount >= prompts.length
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:scale-[1.02]"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
            >
                {filledCount >= prompts.length ? "✨ Submit My Idea!" : `Fill all ${prompts.length} fields to submit`}
            </button>
        </div>
    );
};

export default WorksheetActivity;
