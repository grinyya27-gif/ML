import { SortBy, TimePeriod } from '../types';
import { ArrowUpDown, Users, Eye, TrendingUp, BadgeCheck } from 'lucide-react';

interface SortTabsProps {
  sortBy: SortBy;
  timePeriod: TimePeriod;
  onSortChange: (sort: SortBy) => void;
  onTimePeriodChange: (period: TimePeriod) => void;
  verifiedOnly: boolean;
  onVerifiedOnlyChange: (v: boolean) => void;
}

export function SortTabs({ sortBy, timePeriod, onSortChange, onTimePeriodChange, verifiedOnly, onVerifiedOnlyChange }: SortTabsProps) {
  const sortOptions: { key: SortBy; label: string; shortLabel: string; icon: React.ReactNode }[] = [
    { key: 'subscribers', label: 'Подписчики', shortLabel: 'Подп.', icon: <Users className="w-3.5 h-3.5" /> },
    { key: 'views', label: 'Просмотры', shortLabel: 'Просм.', icon: <Eye className="w-3.5 h-3.5" /> },
    { key: 'growthDay', label: 'Прирост', shortLabel: 'Прирост', icon: <TrendingUp className="w-3.5 h-3.5" /> },
  ];

  const periodOptions: { key: TimePeriod; label: string }[] = [
    { key: 'day', label: 'День' },
    { key: 'week', label: 'Неделя' },
    { key: 'month', label: 'Месяц' },
  ];

  const isGrowth = sortBy === 'growthDay' || sortBy === 'growthWeek' || sortBy === 'growthMonth';

  return (
    <div className="rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] p-4 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center">
              <ArrowUpDown className="w-4 h-4 text-slate-400" />
            </div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 hidden sm:inline">Сортировка:</span>
          </div>
          <div className="flex items-center bg-slate-100 dark:bg-white/5 rounded-xl p-1 border border-slate-200 dark:border-white/[0.06]">
            {sortOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => onSortChange(opt.key)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                  (sortBy === opt.key || (isGrowth && opt.key === 'growthDay'))
                    ? 'bg-white dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                {opt.icon}
                <span className="hidden sm:inline">{opt.label}</span>
                <span className="sm:hidden">{opt.shortLabel}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {isGrowth && (
            <div className="flex items-center bg-slate-100 dark:bg-white/5 rounded-xl p-1 border border-slate-200 dark:border-white/[0.06]">
              {periodOptions.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => onTimePeriodChange(opt.key)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                    timePeriod === opt.key
                      ? 'bg-white dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          {/* Verified filter */}
          <button
            onClick={() => onVerifiedOnlyChange(!verifiedOnly)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 border ${
              verifiedOnly
                ? 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                : 'bg-slate-100 dark:bg-white/5 text-slate-500 border-slate-200 dark:border-white/[0.06] hover:text-blue-500'
            }`}
          >
            <BadgeCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Верифицированные</span>
            <span className="sm:hidden">✓</span>
          </button>
        </div>
      </div>
    </div>
  );
}
