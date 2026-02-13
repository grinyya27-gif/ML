import { Home, TrendingUp, GitCompareArrows, Heart, Plus } from 'lucide-react';

interface BottomNavProps {
  onNavigate: (page: string, data?: unknown) => void;
  favCount: number;
  compareCount: number;
}

export function BottomNav({ onNavigate, favCount, compareCount }: BottomNavProps) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#0a0a1a]/90 backdrop-blur-xl border-t border-slate-200 dark:border-white/10 safe-area-bottom">
      <div className="flex items-center justify-around h-14 px-2">
        <button onClick={() => onNavigate('home')} className="flex flex-col items-center gap-0.5 px-3 py-1 text-slate-500 dark:text-slate-400 hover:text-violet-500 transition-colors">
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Главная</span>
        </button>
        <button onClick={() => onNavigate('top', 'subscribers')} className="flex flex-col items-center gap-0.5 px-3 py-1 text-slate-500 dark:text-slate-400 hover:text-violet-500 transition-colors">
          <TrendingUp className="w-5 h-5" />
          <span className="text-[10px]">Рейтинг</span>
        </button>
        <button onClick={() => onNavigate('home')} className="flex items-center justify-center w-12 h-12 -mt-4 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-500 text-white shadow-lg shadow-violet-500/25 hover:scale-110 active:scale-95 transition-transform">
          <Plus className="w-5 h-5" />
        </button>
        <button onClick={() => onNavigate('compare')} className="flex flex-col items-center gap-0.5 px-3 py-1 text-slate-500 dark:text-slate-400 hover:text-violet-500 transition-colors relative">
          <GitCompareArrows className="w-5 h-5" />
          <span className="text-[10px]">Сравнить</span>
          {compareCount > 0 && <span className="absolute -top-0.5 right-1 w-4 h-4 rounded-full bg-violet-500 text-white text-[8px] font-bold flex items-center justify-center">{compareCount}</span>}
        </button>
        <button onClick={() => onNavigate('favorites')} className="flex flex-col items-center gap-0.5 px-3 py-1 text-slate-500 dark:text-slate-400 hover:text-pink-500 transition-colors relative">
          <Heart className="w-5 h-5" />
          <span className="text-[10px]">Избранное</span>
          {favCount > 0 && <span className="absolute -top-0.5 right-1 w-4 h-4 rounded-full bg-pink-500 text-white text-[8px] font-bold flex items-center justify-center">{favCount}</span>}
        </button>
      </div>
    </div>
  );
}
