import { Search, Sparkles, TrendingUp, Users, BarChart3, Zap } from 'lucide-react';

interface HeroBannerProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onCategoryClick: (cat: string) => void;
  onTopClick: () => void;
}

export function HeroBanner({ searchQuery, onSearchChange, onCategoryClick, onTopClick }: HeroBannerProps) {
  const quickCategories = [
    { id: 'news', label: 'Новости', icon: '📰' },
    { id: 'tech', label: 'Технологии', icon: '💻' },
    { id: 'crypto', label: 'Крипто', icon: '₿' },
    { id: 'business', label: 'Бизнес', icon: '💼' },
    { id: 'entertainment', label: 'Развлечения', icon: '🎭' },
    { id: 'gaming', label: 'Игры', icon: '🎮' },
    { id: 'science', label: 'Наука', icon: '🔬' },
  ];

  return (
    <div className="relative rounded-3xl overflow-hidden mb-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-blue-700" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-60" />
      
      {/* Decorative */}
      <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/5 blur-xl" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/5 blur-xl" />
      <div className="absolute top-10 left-1/4 w-32 h-32 rounded-full bg-cyan-500/10 blur-2xl" />
      
      {/* Chart decoration */}
      <svg className="absolute bottom-0 left-0 right-0 h-24 opacity-10" viewBox="0 0 400 100" preserveAspectRatio="none">
        <polyline points="0,80 40,70 80,75 120,50 160,55 200,35 240,40 280,20 320,25 360,10 400,15" fill="none" stroke="white" strokeWidth="2" />
        <polygon points="0,80 40,70 80,75 120,50 160,55 200,35 240,40 280,20 320,25 360,10 400,15 400,100 0,100" fill="white" fillOpacity="0.05" />
      </svg>

      <div className="relative px-6 sm:px-10 py-10 sm:py-14 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs text-white/80 mb-5 backdrop-blur-sm">
          <Sparkles className="w-3 h-3" />
          Каталог и аналитика каналов MAX
        </div>
        
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight">
          Аналитика каналов
          <br />
          <span className="bg-gradient-to-r from-cyan-300 via-blue-200 to-violet-300 bg-clip-text text-transparent">
            мессенджера MAX
          </span>
        </h2>
        <p className="text-white/60 text-sm sm:text-base mb-8 max-w-lg mx-auto">
          Рейтинги, статистика, графики роста и сравнение каналов. Всё в одном месте.
        </p>

        {/* Search */}
        <div className="max-w-xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="Найти канал по названию, username или тегу..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/15 transition-all text-sm sm:text-base"
          />
        </div>

        {/* Quick tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
          {quickCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => onCategoryClick(cat.id)}
              className="px-3 py-1.5 rounded-full bg-white/10 text-white/70 text-xs hover:bg-white/20 hover:text-white transition-all cursor-pointer border border-white/10 flex items-center gap-1.5"
            >
              <span>{cat.icon}</span> {cat.label}
            </button>
          ))}
        </div>

        {/* Quick action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <button onClick={onTopClick} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/15 backdrop-blur-sm text-white text-sm font-medium hover:bg-white/25 transition-all border border-white/20">
            <TrendingUp className="w-4 h-4" /> Топ каналов
          </button>
          <button onClick={onTopClick} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/15 backdrop-blur-sm text-white text-sm font-medium hover:bg-white/25 transition-all border border-white/20">
            <Users className="w-4 h-4" /> По подписчикам
          </button>
          <button onClick={onTopClick} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/15 backdrop-blur-sm text-white text-sm font-medium hover:bg-white/25 transition-all border border-white/20">
            <BarChart3 className="w-4 h-4" /> Аналитика
          </button>
          <button onClick={onTopClick} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-violet-600 text-sm font-bold hover:shadow-lg transition-all">
            <Zap className="w-4 h-4" /> Быстрый старт
          </button>
        </div>
      </div>
    </div>
  );
}
