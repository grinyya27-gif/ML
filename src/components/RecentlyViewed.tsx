import { Clock, ChevronRight, BadgeCheck } from 'lucide-react';
import { Channel } from '../types';
import { formatNumber } from '../data';

interface RecentlyViewedProps {
  channels: Channel[];
  onChannelClick: (id: number) => void;
}

export function RecentlyViewed({ channels, onChannelClick }: RecentlyViewedProps) {
  if (channels.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-4 h-4 text-slate-400" />
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Недавно просмотренные</h3>
      </div>
      <div className="overflow-x-auto -mx-4 px-4">
        <div className="flex gap-3 min-w-max pb-2">
          {channels.slice(0, 6).map(ch => (
            <button
              key={ch.id}
              onClick={() => onChannelClick(ch.id)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] hover:border-violet-500/30 transition-all group min-w-[200px]"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${ch.avatar} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                {ch.name.charAt(0)}
              </div>
              <div className="text-left min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium text-slate-900 dark:text-white truncate group-hover:text-violet-500 transition-colors">{ch.name}</span>
                  {ch.verified && <BadgeCheck className="w-3 h-3 text-blue-500 shrink-0" />}
                </div>
                <span className="text-[10px] text-slate-400">{formatNumber(ch.subscribers)} подп.</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
