import { categories, channels } from '../data';
import { useMemo } from 'react';

interface CategorySidebarProps {
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
}

export function CategorySidebar({ selectedCategory, onCategoryChange }: CategorySidebarProps) {
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: channels.length };
    channels.forEach(ch => {
      counts[ch.category] = (counts[ch.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] p-3 sticky top-24">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 mb-2">
          Категории
        </h3>
        <nav className="space-y-0.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-violet-500/10 to-purple-500/10 text-violet-600 dark:text-violet-400 font-medium border border-violet-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white border border-transparent'
              }`}
            >
              <span className="text-base">{cat.icon}</span>
              <span className="flex-1 text-left">{cat.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                selectedCategory === cat.id
                  ? 'bg-violet-500/20 text-violet-600 dark:text-violet-400'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-400'
              }`}>
                {categoryCounts[cat.id] || 0}
              </span>
            </button>
          ))}
        </nav>

        {/* Quick stats in sidebar */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5 px-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
            Быстрые ссылки
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Всего каналов</span>
              <span className="font-bold text-slate-900 dark:text-white">{channels.length}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Верифицированных</span>
              <span className="font-bold text-emerald-500">{channels.filter(c => c.verified).length}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Категорий</span>
              <span className="font-bold text-violet-500">{categories.length - 1}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
