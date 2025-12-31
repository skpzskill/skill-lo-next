interface InfographicSection {
    heading: string;
    content: string;
    icon?: string;
}

interface InfographicDisplayProps {
    title: string;
    sections: InfographicSection[];
}

const iconMap: Record<string, string> = {
    search: "🔍",
    lightbulb: "💡",
    rocket: "🚀",
    briefcase: "👔",
    heart: "❤️",
    eye: "👁️",
    footprints: "👣",
    brain: "🧠",
    star: "⭐",
    message: "💬",
    smile: "😊",
    camera: "📸",
};

const colorPalettes = [
    { bg: "from-rose-50 to-pink-50", border: "border-rose-200", text: "text-rose-800", accent: "bg-rose-500" },
    { bg: "from-amber-50 to-orange-50", border: "border-amber-200", text: "text-amber-800", accent: "bg-amber-500" },
    { bg: "from-emerald-50 to-teal-50", border: "border-emerald-200", text: "text-emerald-800", accent: "bg-emerald-500" },
    { bg: "from-blue-50 to-indigo-50", border: "border-blue-200", text: "text-blue-800", accent: "bg-blue-500" },
    { bg: "from-purple-50 to-violet-50", border: "border-purple-200", text: "text-purple-800", accent: "bg-purple-500" },
];

const InfographicDisplay = ({ title, sections }: InfographicDisplayProps) => {
    return (
        <div className="space-y-4">
            {/* Title */}
            <div className="text-center">
                <h3 className="text-lg font-bold text-gray-800 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full border border-gray-200">
                    📊 {title}
                </h3>
            </div>

            {/* Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sections.map((section, idx) => {
                    const palette = colorPalettes[idx % colorPalettes.length];
                    const icon = section.icon ? iconMap[section.icon] || "📌" : "📌";

                    return (
                        <div
                            key={idx}
                            className={`group relative overflow-hidden p-6 bg-gradient-to-br ${palette.bg} rounded-2xl border-2 ${palette.border} transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
                        >
                            <div className="flex flex-col gap-4">
                                <div className={`w-14 h-14 rounded-2xl ${palette.accent} flex items-center justify-center text-3xl shadow-lg border-4 border-white/50 group-hover:rotate-12 transition-transform`}>
                                    {icon}
                                </div>
                                <div className="space-y-2">
                                    <h4 className={`text-xl font-black tracking-tight ${palette.text}`}>{section.heading}</h4>
                                    <p className="text-gray-700 font-medium leading-relaxed">{section.content}</p>
                                </div>
                            </div>

                            {/* Decorative element */}
                            <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-white/30 blur-2xl group-hover:scale-150 transition-transform" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default InfographicDisplay;
