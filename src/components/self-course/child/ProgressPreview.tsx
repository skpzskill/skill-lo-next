import { useEffect, useState } from "react";
import { Flame, Trophy, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ProgressData {
  streak: number;
  badges: number;
  lessons: number;
  lastCompleted: string | null;
}

const ProgressPreview = () => {
  const [progress, setProgress] = useState<ProgressData>({
    streak: 0,
    badges: 0,
    lessons: 0,
    lastCompleted: null
  });

  useEffect(() => {
    // Load progress from local storage
    const loadProgress = () => {
      const stored = localStorage.getItem('skillpreneurz-progress');
      if (stored) {
        const data = JSON.parse(stored);
        
        // Calculate streak
        const today = new Date().toDateString();
        const lastDate = data.lastCompleted ? new Date(data.lastCompleted).toDateString() : null;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        let streak = data.streak || 0;
        
        if (lastDate === today) {
          // Already completed today, keep streak
        } else if (lastDate === yesterday.toDateString()) {
          // Completed yesterday, streak continues
        } else if (lastDate && lastDate !== today) {
          // Streak broken if more than a day passed
          const lastCompleted = new Date(data.lastCompleted);
          const daysDiff = Math.floor((new Date().getTime() - lastCompleted.getTime()) / (1000 * 60 * 60 * 24));
          if (daysDiff > 1) {
            streak = 0;
          }
        }
        
        setProgress({
          streak: streak,
          badges: data.badges || 0,
          lessons: data.lessons || 0,
          lastCompleted: data.lastCompleted
        });
      } else {
        // Initialize with some demo data for first-time users
        const initialData = {
          streak: 7,
          badges: 12,
          lessons: 28,
          lastCompleted: new Date().toISOString()
        };
        localStorage.setItem('skillpreneurz-progress', JSON.stringify(initialData));
        setProgress(initialData);
      }
    };

    loadProgress();

    // Listen for storage changes (when simulator completes)
    const handleStorageChange = () => loadProgress();
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom event for same-tab updates
    window.addEventListener('progressUpdate', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('progressUpdate', handleStorageChange);
    };
  }, []);

  return (
    <div className="grid grid-cols-3 gap-3 md:gap-4">
      {/* Daily Streak */}
      <Card className="bg-gradient-to-br from-orange-100 to-amber-100 border-orange-200/50 hover:shadow-md transition-shadow">
        <CardContent className="p-4 text-center">
          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-md">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <p className="text-2xl font-bold text-orange-600">{progress.streak}</p>
          <p className="text-xs text-orange-700/70 font-medium">Day Streak 🔥</p>
        </CardContent>
      </Card>

      {/* Badges Earned */}
      <Card className="bg-gradient-to-br from-violet-100 to-purple-100 border-violet-200/50 hover:shadow-md transition-shadow">
        <CardContent className="p-4 text-center">
          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-md">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <p className="text-2xl font-bold text-violet-600">{progress.badges}</p>
          <p className="text-xs text-violet-700/70 font-medium">Badges 🏆</p>
        </CardContent>
      </Card>

      {/* Lessons Completed */}
      <Card className="bg-gradient-to-br from-emerald-100 to-teal-100 border-emerald-200/50 hover:shadow-md transition-shadow">
        <CardContent className="p-4 text-center">
          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-md">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <p className="text-2xl font-bold text-emerald-600">{progress.lessons}</p>
          <p className="text-xs text-emerald-700/70 font-medium">Lessons ✓</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressPreview;
