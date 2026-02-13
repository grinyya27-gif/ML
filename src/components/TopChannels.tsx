import { TrendingUp, Users, Eye, Crown, ChevronRight } from 'lucide-react';
import { Channel } from '../types';
import { formatNumber } from '../data';
import type { SortBy } from '../types';

interface TopChannelsProps {
  channels: Channel[];
  onChannelClick: (id: number) => void;
  onViewAll: (sort: SortBy) => void;
}

export function TopChannels({ channels, onChannelClick, onViewAll }: TopChannelsProps) {
  const topBySubscribers = [...channels].sort((a, b) => b.subscribers - a.subscribers).slice(0, 5);
  const topByViews = [...channels].sort((a, b) => b.views - a.views).slice(0, 5);
  const topByGrowth = [...channels].sort((a, b) => b.growthDay - a.growthDay).slice(0, 5);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <TopCard
        title="Топ по подписчикам"
        icon={<Users className="w-4 h-4" />}
        gradient="from-blue-500 to-cyan-500"
        channels={topBySubscribers}
        valueKey="subscribers"
        onChannelClick={onChannelClick}
        onViewAll={() => onViewAll('subscribers')}
      />
      <TopCard
        title="Топ по просмотрам"
        icon={<Eye className="w-4 h-4" />}
        gradient="from-emerald-500 to-teal-500"
        channels={topByViews}
        valueKey="views"
        onChannelClick={onChannelClick}
        onViewAll={() => onViewAll('views')}
      />
      <TopCard
        title="Топ по приросту"
        icon={<TrendingUp className="w-4 h-4" />}
        gradient="from-violet-500 to-purple-500"
        channels={topByGrowth}
        valueKey="growthDay"
        isGrowth
        onChannelClick={onChannelClick}
        onViewAll={() => onViewAll('growthDay')}
      />
    </div>
  );
}

interface TopCardProps {
  title: string;
  icon: React.ReactNode;
  gradient: string;
  channels: Channel[];
  valueKey: keyof Channel;
  isGrowth?: boolean;
  onChannelClick: (id: number) => void;
  onViewAll: () => void;
}

function TopCard({ title, icon, gradient, channels, valueKey, isGrowth, onChannelClick, onViewAll }: TopCardProps) {
  return (
    <div className="rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] overflow-hidden hover:border-violet-500/20 transition-all duration-300">
      <div className={`bg-gradient-to-r ${gradient} px-5 py-3.5 flex items-center justify-between`}>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center text-white">
            {icon}
          </div>
          <h3 className="text-sm font-semibold text-white">{title}</h3>
        </div>
        <Crown className="w-4 h-4 text-white/60" />
      </div>
      <div className="p-3">
        {channels.map((ch, i) => (
          <div
            key={ch.id}
            onClick={() => onChannelClick(ch.id)}
            className="flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group cursor-pointer"
          >
            <span className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold shrink-0 ${
              i === 0 ? 'bg-amber-500/15 text-amber-500' :
              i === 1 ? 'bg-slate-300/20 text-slate-400' :
              i === 2 ? 'bg-orange-500/15 text-orange-400' :
              'bg-slate-100 dark:bg-white/5 text-slate-400'
            }`}>
              {i + 1}
            </span>
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${ch.avatar} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
              {ch.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 dark:text-white truncate group-hover:text-violet-500 transition-colors">{ch.name}</p>
              <p className="text-[10px] text-slate-400">{ch.username}</p>
            </div>
            <div className="text-right shrink-0">
              <span className={`text-sm font-bold ${isGrowth ? 'text-emerald-500' : 'text-slate-900 dark:text-white'}`}>
                {isGrowth ? '+' : ''}{formatNumber(ch[valueKey] as number)}
              </span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
          </div>
        ))}
      </div>
      <div className="px-5 pb-4">
        <button
          onClick={onViewAll}
          className="w-full py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-violet-500 hover:bg-violet-500/5 transition-all duration-200"
        >
          Показать полный рейтинг →
        </button>
      </div>
    </div>
  );
}
