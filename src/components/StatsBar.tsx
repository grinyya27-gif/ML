import { Users, Eye, TrendingUp, Hash, BadgeCheck, MessageSquare } from 'lucide-react';
import { Channel } from '../types';
import { formatNumber } from '../data';

interface StatsBarProps {
  channels: Channel[];
}

export function StatsBar({ channels }: StatsBarProps) {
  const totalSubs = channels.reduce((acc, ch) => acc + ch.subscribers, 0);
  const totalViews = channels.reduce((acc, ch) => acc + ch.views, 0);
  const totalGrowth = channels.reduce((acc, ch) => acc + ch.growthDay, 0);
  const verifiedCount = channels.filter(ch => ch.verified).length;
  const avgER = (channels.reduce((acc, ch) => acc + ch.er, 0) / channels.length).toFixed(1);

  const stats = [
    { label: 'Каналов в каталоге', value: channels.length.toString(), icon: <Hash className="w-4 h-4" />, color: 'from-blue-500 to-cyan-500' },
    { label: 'Подписчиков всего', value: formatNumber(totalSubs), icon: <Users className="w-4 h-4" />, color: 'from-violet-500 to-purple-500' },
    { label: 'Просмотров всего', value: formatNumber(totalViews), icon: <Eye className="w-4 h-4" />, color: 'from-emerald-500 to-teal-500' },
    { label: 'Прирост за день', value: '+' + formatNumber(totalGrowth), icon: <TrendingUp className="w-4 h-4" />, color: 'from-orange-500 to-red-500' },
    { label: 'Верифицированных', value: verifiedCount.toString(), icon: <BadgeCheck className="w-4 h-4" />, color: 'from-blue-500 to-indigo-500' },
    { label: 'Средний ER', value: avgER + '%', icon: <MessageSquare className="w-4 h-4" />, color: 'from-pink-500 to-rose-500' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
      {stats.map((stat) => (
        <div key={stat.label} className="relative rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] p-4 overflow-hidden group hover:border-violet-500/20 transition-all duration-300">
          <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.color} opacity-5 rounded-bl-[40px] group-hover:opacity-10 transition-opacity`} />
          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-3 shadow-lg`}>{stat.icon}</div>
          <p className="text-xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
          <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">{stat.label}</p>
          <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
        </div>
      ))}
    </div>
  );
}
