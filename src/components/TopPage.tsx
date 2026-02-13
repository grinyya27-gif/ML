import { useState, useMemo } from 'react';
import { ArrowLeft, Users, Eye, TrendingUp, BadgeCheck, Crown } from 'lucide-react';
import { channels, formatNumber, formatNumberFull } from '../data';
import { MiniChart } from './Chart';
import type { SortBy, TimePeriod } from '../types';

interface TopPageProps {
  initialSort: SortBy;
  onBack: () => void;
  onChannelClick: (id: number) => void;
}

export function TopPage({ initialSort, onBack, onChannelClick }: TopPageProps) {
  const [sortBy, setSortBy] = useState<SortBy>(initialSort);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('day');

  const sorted = useMemo(() => {
    const key = sortBy === 'growthDay'
      ? (timePeriod === 'day' ? 'growthDay' : timePeriod === 'week' ? 'growthWeek' : 'growthMonth')
      : sortBy;
    return [...channels].sort((a, b) => (b[key] as number) - (a[key] as number));
  }, [sortBy, timePeriod]);

  const sortTabs = [
    { key: 'subscribers' as SortBy, label: 'По подписчикам', icon: <Users className="w-4 h-4" /> },
    { key: 'views' as SortBy, label: 'По просмотрам', icon: <Eye className="w-4 h-4" /> },
    { key: 'growthDay' as SortBy, label: 'По приросту', icon: <TrendingUp className="w-4 h-4" /> },
  ];

  const getGradient = (rank: number) => {
    if (rank === 1) return 'from-amber-400 to-amber-600';
    if (rank === 2) return 'from-slate-300 to-slate-500';
    if (rank === 3) return 'from-orange-400 to-orange-600';
    return 'from-violet-500 to-purple-600';
  };

  return (
    <div className="min-h-screen pb-12">
      <div className="sticky top-16 z-40 bg-white/80 dark:bg-[#08081a]/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-violet-500 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Назад
          </button>
          <div className="flex items-center gap-2">
            <Crown className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-semibold text-slate-900 dark:text-white">Топ каналов MAX</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">🏆 Рейтинг каналов MAX</h1>
          <p className="text-sm text-slate-500">Полный рейтинг всех каналов по разным метрикам</p>
        </div>

        {/* Sort tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
          <div className="flex items-center bg-slate-100 dark:bg-white/5 rounded-xl p-1 border border-slate-200 dark:border-white/[0.06]">
            {sortTabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setSortBy(tab.key)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  sortBy === tab.key
                    ? 'bg-white dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {sortBy === 'growthDay' && (
            <div className="flex items-center bg-slate-100 dark:bg-white/5 rounded-xl p-1 border border-slate-200 dark:border-white/[0.06]">
              {(['day', 'week', 'month'] as TimePeriod[]).map(p => (
                <button
                  key={p}
                  onClick={() => setTimePeriod(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    timePeriod === p
                      ? 'bg-white dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  {p === 'day' ? 'День' : p === 'week' ? 'Неделя' : 'Месяц'}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Table */}
        <div className="rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 dark:border-white/5">
                  <th className="text-left px-5 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider w-12">#</th>
                  <th className="text-left px-5 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Канал</th>
                  <th className="text-right px-5 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Подписчики</th>
                  <th className="text-right px-5 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider hidden sm:table-cell">Просмотры</th>
                  <th className="text-right px-5 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider hidden md:table-cell">Прирост</th>
                  <th className="text-right px-5 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider hidden lg:table-cell">ER</th>
                  <th className="text-right px-5 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider hidden lg:table-cell">График</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((ch, i) => {
                  const rank = i + 1;
                  const growthKey = timePeriod === 'day' ? 'growthDay' : timePeriod === 'week' ? 'growthWeek' : 'growthMonth';
                  return (
                    <tr
                      key={ch.id}
                      onClick={() => onChannelClick(ch.id)}
                      className={`border-b border-slate-50 dark:border-white/[0.03] hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer ${
                        rank <= 3 ? 'bg-gradient-to-r from-amber-50/50 dark:from-amber-500/5 to-transparent' : ''
                      }`}
                    >
                      <td className="px-5 py-4">
                        <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${getGradient(rank)} flex items-center justify-center text-white text-xs font-bold shadow-md`}>
                          {rank}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${ch.avatar} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                            {ch.name.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-slate-900 dark:text-white text-sm truncate">{ch.name}</span>
                              {ch.verified && <BadgeCheck className="w-3.5 h-3.5 text-blue-500 shrink-0" />}
                            </div>
                            <span className="text-xs text-slate-400">{ch.username}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <span className="font-bold text-sm text-slate-900 dark:text-white">{formatNumber(ch.subscribers)}</span>
                        <br />
                        <span className="text-[10px] text-slate-400">{formatNumberFull(ch.subscribers)}</span>
                      </td>
                      <td className="px-5 py-4 text-right hidden sm:table-cell">
                        <span className="font-medium text-sm text-slate-700 dark:text-slate-300">{formatNumber(ch.avgViews)}</span>
                      </td>
                      <td className="px-5 py-4 text-right hidden md:table-cell">
                        <span className="text-sm font-bold text-emerald-500">+{formatNumber(ch[growthKey])}</span>
                        <br />
                        <span className="text-[10px] text-slate-400">/{timePeriod === 'day' ? 'день' : timePeriod === 'week' ? 'нед.' : 'мес.'}</span>
                      </td>
                      <td className="px-5 py-4 text-right hidden lg:table-cell">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          ch.er >= 40 ? 'bg-emerald-500/10 text-emerald-500' :
                          ch.er >= 37 ? 'bg-blue-500/10 text-blue-500' :
                          'bg-slate-100 dark:bg-white/5 text-slate-500'
                        }`}>
                          {ch.er}%
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right hidden lg:table-cell">
                        <MiniChart data={ch.dailyHistory} dataKey="subscribers" color="#8b5cf6" width={80} height={28} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
