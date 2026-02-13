import { ArrowLeft, X, Users, Eye, TrendingUp, Activity, MessageSquare, BarChart3, BadgeCheck } from 'lucide-react';
import { Channel } from '../types';
import { formatNumber, formatNumberFull } from '../data';
import { MiniChart } from './Chart';

interface ComparePageProps {
  channels: Channel[];
  onBack: () => void;
  onRemove: (id: number) => void;
  onChannelClick: (id: number) => void;
}

export function ComparePage({ channels, onBack, onRemove, onChannelClick }: ComparePageProps) {
  if (channels.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-3xl bg-violet-500/10 flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-violet-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Нет каналов для сравнения</h2>
          <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">Добавьте каналы для сравнения, нажав на иконку сравнения на карточке канала</p>
          <button onClick={onBack} className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 text-white text-sm font-medium hover:shadow-lg transition-all">
            Вернуться к каталогу
          </button>
        </div>
      </div>
    );
  }

  const metrics = [
    { key: 'subscribers', label: 'Подписчики', icon: <Users className="w-4 h-4 text-blue-500" />, format: (v: number) => formatNumberFull(v) },
    { key: 'avgViews', label: 'Ср. просмотры', icon: <Eye className="w-4 h-4 text-emerald-500" />, format: (v: number) => formatNumber(v) },
    { key: 'growthDay', label: 'Прирост/день', icon: <TrendingUp className="w-4 h-4 text-violet-500" />, format: (v: number) => '+' + formatNumber(v), isGrowth: true },
    { key: 'growthWeek', label: 'Прирост/неделя', icon: <TrendingUp className="w-4 h-4 text-purple-500" />, format: (v: number) => '+' + formatNumber(v), isGrowth: true },
    { key: 'growthMonth', label: 'Прирост/месяц', icon: <TrendingUp className="w-4 h-4 text-indigo-500" />, format: (v: number) => '+' + formatNumber(v), isGrowth: true },
    { key: 'er', label: 'ER', icon: <Activity className="w-4 h-4 text-amber-500" />, format: (v: number) => v + '%' },
    { key: 'postsPerDay', label: 'Постов/день', icon: <MessageSquare className="w-4 h-4 text-pink-500" />, format: (v: number) => v.toString() },
    { key: 'totalPosts', label: 'Всего постов', icon: <MessageSquare className="w-4 h-4 text-rose-500" />, format: (v: number) => formatNumberFull(v) },
  ];

  const getBestValue = (key: string) => {
    const vals = channels.map(c => c[key as keyof Channel] as number);
    return Math.max(...vals);
  };

  return (
    <div className="min-h-screen pb-12">
      <div className="sticky top-16 z-40 bg-white/80 dark:bg-[#08081a]/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-violet-500 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Назад
          </button>
          <span className="text-sm font-semibold text-slate-900 dark:text-white">Сравнение каналов ({channels.length})</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">⚖️ Сравнение каналов</h1>

        <div className="rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 dark:border-white/5">
                  <th className="text-left px-5 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider min-w-[160px]">Метрика</th>
                  {channels.map(ch => (
                    <th key={ch.id} className="px-5 py-4 text-center min-w-[180px]">
                      <div className="flex flex-col items-center gap-2">
                        <div className="relative">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${ch.avatar} flex items-center justify-center text-white text-lg font-bold cursor-pointer hover:scale-110 transition-transform`}
                               onClick={() => onChannelClick(ch.id)}>
                            {ch.name.charAt(0)}
                          </div>
                          <button onClick={() => onRemove(ch.id)} className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors">
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-semibold text-slate-900 dark:text-white cursor-pointer hover:text-violet-500 transition-colors" onClick={() => onChannelClick(ch.id)}>
                            {ch.name}
                          </span>
                          {ch.verified && <BadgeCheck className="w-3 h-3 text-blue-500" />}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Graph row */}
                <tr className="border-b border-slate-50 dark:border-white/[0.03]">
                  <td className="px-5 py-4 text-sm font-medium text-slate-700 dark:text-slate-300">📈 График</td>
                  {channels.map(ch => (
                    <td key={ch.id} className="px-5 py-4 text-center">
                      <div className="flex justify-center">
                        <MiniChart data={ch.dailyHistory} dataKey="subscribers" color="#8b5cf6" width={120} height={40} />
                      </div>
                    </td>
                  ))}
                </tr>
                {metrics.map(metric => {
                  const best = getBestValue(metric.key);
                  return (
                    <tr key={metric.key} className="border-b border-slate-50 dark:border-white/[0.03] hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          {metric.icon}
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{metric.label}</span>
                        </div>
                      </td>
                      {channels.map(ch => {
                        const val = ch[metric.key as keyof Channel] as number;
                        const isBest = val === best && channels.length > 1;
                        return (
                          <td key={ch.id} className="px-5 py-3.5 text-center">
                            <span className={`text-sm font-bold ${isBest ? 'text-emerald-500' : metric.isGrowth ? 'text-violet-500' : 'text-slate-900 dark:text-white'}`}>
                              {metric.format(val)}
                            </span>
                            {isBest && <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-medium">лучший</span>}
                          </td>
                        );
                      })}
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
