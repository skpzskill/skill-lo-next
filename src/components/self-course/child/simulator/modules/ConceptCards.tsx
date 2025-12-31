import { ConceptCard } from "@/data/entrepreneur-curriculum";
import { useState } from "react";

interface ConceptCardsProps {
    title: string;
    cards: ConceptCard[];
}

const ConceptCards = ({ title, cards }: ConceptCardsProps) => {
    const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

    const toggleCard = (index: number) => {
        setFlippedCards(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    };

    const cardColors = [
        "from-rose-400 to-pink-500",
        "from-amber-400 to-orange-500",
        "from-emerald-400 to-teal-500",
        "from-blue-400 to-indigo-500",
    ];

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-center text-gray-800">{title}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cards.map((card, idx) => {
                    const isFlipped = flippedCards.has(idx);
                    return (
                        <div
                            key={idx}
                            onClick={() => toggleCard(idx)}
                            className="relative h-56 cursor-pointer perspective-1000 group"
                        >
                            <div
                                className={`absolute inset-0 transition-all duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
                                style={{
                                    transformStyle: 'preserve-3d',
                                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                                }}
                            >
                                {/* Front of card */}
                                <div
                                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${cardColors[idx % cardColors.length]} p-8 flex flex-col items-center justify-center text-white shadow-xl backface-hidden border-4 border-white/20`}
                                    style={{ backfaceVisibility: 'hidden' }}
                                >
                                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4 backdrop-blur-sm group-hover:scale-110 transition-transform">
                                        <span className="text-4xl">{card.icon}</span>
                                    </div>
                                    <h4 className="text-2xl font-black tracking-tight">{card.term}</h4>
                                    <div className="mt-4 px-4 py-1.5 bg-white/20 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md animate-pulse">
                                        Tap to Reveal
                                    </div>
                                </div>

                                {/* Back of card */}
                                <div
                                    className="absolute inset-0 rounded-3xl bg-white p-8 flex flex-col shadow-2xl border-2 border-gray-100"
                                    style={{
                                        backfaceVisibility: 'hidden',
                                        transform: 'rotateY(180deg)'
                                    }}
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`p-2 rounded-xl bg-gradient-to-br ${cardColors[idx % cardColors.length]} text-white`}>
                                            <span className="text-2xl">{card.icon}</span>
                                        </div>
                                        <h4 className="text-xl font-bold text-gray-900">{card.term}</h4>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed font-medium mb-4">{card.definition}</p>
                                    <div className="bg-gray-50 rounded-2xl p-4 mt-auto border border-gray-100">
                                        <p className="text-[10px] text-primary/60 font-black uppercase tracking-widest mb-1">Real-world Example</p>
                                        <p className="text-sm text-gray-600 italic font-medium">"{card.example}"</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <p className="text-center text-sm font-semibold text-muted-foreground flex items-center justify-center gap-2">
                <span className="animate-bounce">👆</span>
                Click any card to explore the concept!
            </p>
        </div>
    );
};

export default ConceptCards;
