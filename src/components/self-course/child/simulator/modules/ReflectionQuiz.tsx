import { QuizQuestion } from "@/data/entrepreneur-curriculum";
import { useState } from "react";
import { CheckCircle2, MessageCircle, Trophy } from "lucide-react";

interface ReflectionQuizProps {
    title: string;
    questions: QuizQuestion[];
    onComplete?: (answers: Record<string, string | string[]>) => void;
}

const ReflectionQuiz = ({ title, questions, onComplete }: ReflectionQuizProps) => {
    const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const handleAnswer = (questionId: string, answer: string | string[]) => {
        setAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            setSubmitted(true);
            onComplete?.(answers);
        }
    };

    const handlePrev = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    const currentQ = questions[currentQuestion];
    const isAnswered = answers[currentQ?.id] !== undefined && answers[currentQ?.id] !== "";
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    if (submitted) {
        return (
            <div className="space-y-6 text-center py-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mx-auto animate-bounce">
                    <Trophy className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Reflection Complete! 🌟</h3>
                <p className="text-gray-600">You've shared your thoughts on entrepreneurship!</p>

                <div className="mt-6 space-y-4 text-left">
                    {questions.map((q, idx) => (
                        <div key={q.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <p className="text-sm text-gray-500 font-medium mb-1">Question {idx + 1}</p>
                            <p className="font-semibold text-gray-800 mb-2">{q.question}</p>
                            <p className="text-gray-700 bg-white rounded-lg p-3 border border-gray-100">
                                {Array.isArray(answers[q.id])
                                    ? (answers[q.id] as string[]).join(", ")
                                    : answers[q.id] || "(not answered)"}
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
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-100 to-teal-100 rounded-xl border border-green-200">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-white">
                    <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-bold text-green-900 text-lg">{title}</h3>
                    <p className="text-green-700 text-sm">Share your thoughts!</p>
                </div>
            </div>

            {/* Progress */}
            <div className="space-y-1">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Question {currentQuestion + 1} of {questions.length}</span>
                    <span className="font-semibold text-green-600">{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-green-500 to-teal-500 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Question Card */}
            <div className="p-6 bg-white rounded-2xl border-2 border-gray-100 shadow-sm min-h-[250px] flex flex-col">
                <div className="flex items-start gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-teal-500 text-white flex items-center justify-center font-bold shrink-0">
                        {currentQuestion + 1}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800">{currentQ.question}</h4>
                </div>

                <div className="flex-1">
                    {currentQ.type === "multiple-choice" && currentQ.options && (
                        <div className="grid gap-2">
                            {currentQ.options.map((option) => {
                                const isSelected = answers[currentQ.id] === option;
                                return (
                                    <button
                                        key={option}
                                        onClick={() => handleAnswer(currentQ.id, option)}
                                        className={`p-4 rounded-xl border-2 text-left transition-all ${isSelected
                                                ? "border-green-500 bg-green-50 text-green-800"
                                                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? "border-green-500 bg-green-500" : "border-gray-300"
                                                }`}>
                                                {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                                            </div>
                                            <span className="font-medium">{option}</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {currentQ.type === "open-ended" && (
                        <textarea
                            className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none transition-all"
                            placeholder="Share your thoughts here..."
                            value={(answers[currentQ.id] as string) || ""}
                            onChange={(e) => handleAnswer(currentQ.id, e.target.value)}
                        />
                    )}
                </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-3">
                <button
                    onClick={handlePrev}
                    disabled={currentQuestion === 0}
                    className={`flex-1 py-3 rounded-xl font-semibold transition-all ${currentQuestion === 0
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                >
                    ← Previous
                </button>
                <button
                    onClick={handleNext}
                    disabled={!isAnswered}
                    className={`flex-1 py-3 rounded-xl font-semibold transition-all ${isAnswered
                            ? "bg-gradient-to-r from-green-500 to-teal-500 text-white hover:shadow-lg"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                >
                    {currentQuestion === questions.length - 1 ? "Complete ✨" : "Next →"}
                </button>
            </div>
        </div>
    );
};

export default ReflectionQuiz;
