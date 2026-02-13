import { categories } from '../data';

interface MobileCategoryBarProps {
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
}

export function MobileCategoryBar({ selectedCategory, onCategoryChange }: MobileCategoryBarProps) {
  return (
    <div className="lg:hidden mb-6 -mx-4 px-4 overflow-x-auto">
      <div className="flex items-center gap-2 min-w-max pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-violet-500/15 to-purple-500/15 text-violet-600 dark:text-violet-400 border border-violet-500/25'
                : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 border border-transparent hover:border-slate-200 dark:hover:border-white/10'
            }`}
          >
            <span>{cat.icon}</span>
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
