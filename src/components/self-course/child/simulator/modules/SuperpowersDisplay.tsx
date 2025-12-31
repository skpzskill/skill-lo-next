import { Superpower } from "@/data/entrepreneur-curriculum";
import { useState } from "react";
import { Zap, Heart, Eye, Footprints, Brain, Star } from "lucide-react";

interface SuperpowersDisplayProps {
    superpowers: Superpower[];
}

const iconMap: Record<string, React.ReactNode> = {
    E: <Heart className="w-8 h-8" />,
    N: <Eye className="w-8 h-8" />,
    T: <Footprints className="w-8 h-8" />,
    R: <Brain className="w-8 h-8" />,
    Y: <Star className="w-8 h-8" />,
};

const SuperpowersDisplay = ({ superpowers }: SuperpowersDisplayProps) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-100 to-fuchsia-100 rounded-full">
                    <Zap className="w-5 h-5 text-violet-600" />
                    <span className="font-bold text-violet-900">Entrepreneur Superpowers!</span>
                </div>
                <p className="text-gray-600">Remember these with E.N.T.R.Y</p>
            </div>

            {/* E.N.T.R.Y Display */}
            <div className="flex justify-center gap-2 text-4xl font-black">
                {superpowers.map((power, idx) => (
                    <span
                        key={idx}
                        className={`bg-gradient-to-br ${power.color} bg-clip-text text-transparent cursor-pointer hover:scale-110 transition-transform`}
                        onMouseEnter={() => setActiveIndex(idx)}
                        onMouseLeave={() => setActiveIndex(null)}
                    >
                        {power.letter}
                    </span>
                ))}
            </div>

            {/* Active Superpower Detail */}
            {activeIndex !== null && (
                <div className={`p-4 bg-gradient-to-r ${superpowers[activeIndex].color} rounded-xl text-white text-center animate-in fade-in zoom-in duration-200`}>
                    <p className="font-bold text-lg">{superpowers[activeIndex].word}</p>
                    <p className="text-white/90">{superpowers[activeIndex].description}</p>
                </div>
            )}

            {/* All Superpowers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {superpowers.map((power, idx) => (
                    <div
                        key={idx}
                        className={`group relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br ${power.color} text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl cursor-pointer border-4 border-white/10`}
                        onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                    >
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-start">
                                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md shadow-inner border border-white/30 group-hover:scale-110 transition-transform">
                                    <span className="text-4xl font-black">{power.letter}</span>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                                    {iconMap[power.letter]}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-black text-2xl tracking-tight">{power.word}</h4>
                                <p className="text-white/90 font-medium leading-relaxed">{power.description}</p>
                            </div>
                        </div>

                        {/* Background decoration */}
                        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10 blur-3xl group-hover:scale-150 transition-transform" />
                    </div>
                ))}
            </div>

            {/* Tip */}
            <div className="text-center p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-200">
                <p className="text-amber-800">
                    💡 <strong>Tip:</strong> Use E.N.T.R.Y to remember these superpowers!
                    They'll help you become an amazing entrepreneur.
                </p>
            </div>
        </div>
    );
};

export default SuperpowersDisplay;
