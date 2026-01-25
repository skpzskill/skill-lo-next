import { discoveryIsland as world1 } from "@/data/worlds";
import { Check, CheckCircle2, Lock, Star, Trophy, ArrowRight, Brain, Target, Zap, Heart, Search, Palette, MessageCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const ParentMode = () => {
  // Simulate progress for visual purposes
  const mockProgress = {
    powerPathsCompleted: ['world1-path1', 'world1-path2'],
    percentComplete: 40
  };

  // Icon mapping (since we stored string names in data)
  const iconMap: any = {
    Palette: Palette,
    Search: Search,
    Heart: Heart,
    MessageCircle: MessageCircle,
    Zap: Zap
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      {/* 1. New Vibrant Header - Sunrise Gradient */}
      <div className="bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-20">
          <Star className="w-64 h-64 rotate-12" />
        </div>
        <div className="absolute -bottom-10 -left-10 bg-white/10 w-64 h-64 rounded-full blur-3xl"></div>

        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-2 bg-white/20 w-fit px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm border border-white/20">
            <Zap className="w-3 h-3 text-yellow-300 fill-current" />
            Parent Insight Dashboard
          </div>

          <div>
            <h1 className="text-4xl md:text-6xl font-black mb-2 tracking-tight drop-shadow-sm">{world1.theme}</h1>
            <p className="text-xl md:text-2xl text-orange-100 font-medium max-w-2xl leading-relaxed opacity-90">{world1.objectives[0]}</p>
          </div>

          <div className="mt-8 bg-white/15 backdrop-blur-md p-6 rounded-3xl border border-white/20 max-w-3xl shadow-inner">
            <div className="flex justify-between items-end mb-3">
              <div className="flex flex-col">
                <span className="text-sm font-bold uppercase tracking-widest opacity-80 mb-1">Current Mission</span>
                <span className="font-bold text-2xl">{world1.name}</span>
              </div>
              <span className="font-black text-4xl">{mockProgress.percentComplete}%</span>
            </div>
            <Progress value={mockProgress.percentComplete} className="h-5 bg-black/20" indicatorClassName="bg-gradient-to-r from-yellow-300 to-orange-400" />
            <p className="text-sm mt-3 text-white/80 font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> 2 of {world1.powerPaths.length} Power Paths Completed
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 2. Main Content Area */}
        <div className="lg:col-span-8 space-y-8">

          {/* NEW: Superpowers Unlocked Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-gray-800 dark:text-gray-100 flex items-center gap-3">
              <Zap className="w-6 h-6 text-amber-500 fill-current" />
              Superpowers Unlocked
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {world1.skillsUnlocked?.map((skill, idx) => {
                const Icon = iconMap[skill.icon] || Star;
                return (
                  <div key={idx} className={`p-4 rounded-2xl border-2 hover:scale-105 transition-transform duration-300 bg-white dark:bg-gray-800 ${skill.color}`}>
                    <div className="mb-3 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-lg mb-1 leading-tight">{skill.name}</h4>
                    <p className="text-xs opacity-80 font-medium">{skill.description}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Impact & Outcomes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Student Understanding */}
            <div className="bg-orange-50/50 dark:bg-orange-900/10 p-6 rounded-3xl border-2 border-orange-100 dark:border-orange-900/20">
              <h3 className="font-bold text-lg flex items-center gap-2 mb-4 text-orange-800 dark:text-orange-200 uppercase tracking-wide">
                <Brain className="w-5 h-5" />
                Key Takeaways
              </h3>
              <ul className="space-y-3">
                {world1.learningOutcomes?.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-700 dark:text-gray-300 font-medium">
                    <div className="mt-1 w-5 h-5 rounded-full bg-orange-200 text-orange-700 flex items-center justify-center text-xs font-bold shrink-0">
                      {idx + 1}
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Learning Outcomes */}
            <div className="bg-emerald-50/50 dark:bg-emerald-900/10 p-6 rounded-3xl border-2 border-emerald-100 dark:border-emerald-900/20">
              <h3 className="font-bold text-lg flex items-center gap-2 mb-4 text-emerald-800 dark:text-emerald-200 uppercase tracking-wide">
                <Target className="w-5 h-5" />
                Confirmed Skills
              </h3>
              <ul className="space-y-3">
                {world1.learningOutcomes?.map((outcome, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Detailed Curriculum Path */}
          <div className="space-y-5">
            <h3 className="text-2xl font-black text-gray-800 dark:text-gray-100 px-2">Detailed Power Path Progress</h3>
            <div className="space-y-4">
              {world1.powerPaths.map((path, idx) => {
                const isCompleted = mockProgress.powerPathsCompleted.includes(path.id);
                return (
                  <div key={path.id} className={`group p-5 rounded-3xl border-2 flex items-center gap-5 transition-all duration-300 ${isCompleted
                    ? 'bg-white border-green-200 shadow-sm'
                    : 'bg-gray-50/80 border-transparent hover:bg-white hover:border-gray-200 hover:shadow-md'
                    }`}>
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-sm ${isCompleted ? 'bg-green-50' : 'bg-gray-100 group-hover:bg-white'}`}>
                      {path.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-bold text-xl text-gray-900 dark:text-gray-100">{path.name}</h4>
                        {isCompleted && (
                          <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
                            Completed
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 font-medium max-w-md">{path.description}</p>
                    </div>
                    <div className="pr-4">
                      {isCompleted ? (
                        <div className="bg-green-500 text-white p-2 rounded-full shadow-lg shadow-green-200">
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                      ) : (
                        <Lock className="w-6 h-6 text-gray-300 group-hover:text-gray-400 transition-colors" />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* 3. Sidebar - Keeping it clean but vibrant */}
        <div className="lg:col-span-4 space-y-6">
          {/* Badge Vault (Updated Visuals) */}
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-8 rounded-[2.5rem] border-2 border-amber-100 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-200 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <h3 className="font-bold text-amber-900/50 mb-6 uppercase tracking-widest text-xs text-center">Current Certification</h3>

            <div className="relative w-48 h-48 mx-auto mb-6 transition-all duration-500 cursor-pointer">
              <div className="absolute inset-0 bg-yellow-400 blur-[60px] opacity-20 rounded-full animate-pulse"></div>
              <img src={world1.badge.image} alt={world1.badge.name} className="relative z-10 w-full h-full object-contain drop-shadow-xl grayscale group-hover:grayscale-0 transition-all duration-500" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-95 transition-transform duration-500 opacity-60 group-hover:opacity-0">
                <Lock className="w-12 h-12 text-gray-500" />
              </div>
            </div>

            <div className="text-center space-y-2 relative z-10">
              <h4 className="font-black text-2xl text-gray-800">{world1.badge.name}</h4>
              <p className="text-sm text-gray-600 font-medium">Complete all 5 Power Paths to unlock this certification!</p>
            </div>
            <Button className="w-full mt-6 bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold border-none shadow-lg shadow-amber-200/50 h-12 rounded-xl">
              View Badge Requirements
            </Button>
          </div>

          {/* Next World Teaser */}
          <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
            <h3 className="font-bold text-slate-500 mb-4 uppercase tracking-widest text-xs">Up Next</h3>
            <h4 className="text-3xl font-black mb-3 leading-tight">World 2:<br />Problem Hunter's Forest</h4>
            <p className="text-slate-400 text-sm mb-8 font-medium leading-relaxed">Prepare for the S.E.E.R. framework! Kids will learn to spot opportunities in the wild.</p>
            <div className="flex items-center text-sm font-bold text-white group-hover:translate-x-2 transition-transform">
              Sneak Peek <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentMode;
