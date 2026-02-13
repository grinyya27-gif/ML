import { TrendingUp, Eye, Users, BadgeCheck, Heart, GitCompareArrows } from 'lucide-react';
import { Channel } from '../types';
import { formatNumber } from '../data';
import { MiniChart } from './Chart';

interface ChannelCardProps {
  channel: Channel;
  rank?: number;
  onClick?: () => void;
  isFav?: boolean;
  isCompare?: boolean;
  onToggleFav?: (id: number) => void;
  onToggleCompare?: (id: number) => void;
}

export function ChannelCard({ channel, rank, onClick, isFav, isCompare, onToggleFav, onToggleCompare }: ChannelCardProps) {
  return (
    <div
      className={`group relative rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] p-5 hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300 hover:-translate-y-0.5 ${onClick ? 'cursor-pointer' : ''}`}
    >
      {/* Rank badge */}
      {rank && rank <= 3 && (
        <div className={`absolute -top-2.5 -left-2.5 w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg ${
          rank === 1 ? 'bg-gradient-to-br from-amber-400 to-amber-600 shadow-amber-500/30' :
          rank === 2 ? 'bg-gradient-to-br from-slate-300 to-slate-500 shadow-slate-400/30' :
          'bg-gradient-to-br from-orange-400 to-orange-600 shadow-orange-500/30'
        }`}>{rank}</div>
      )}
      {rank && rank > 3 && (
        <div className="absolute -top-2.5 -left-2.5 w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-violet-500/30">{rank}</div>
      )}

      {/* Action buttons (top-right) */}
      <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        {onToggleCompare && (
          <button
            onClick={(e) => { e.stopPropagation(); onToggleCompare(channel.id); }}
            className={`p-1.5 rounded-lg transition-all ${isCompare ? 'bg-violet-500/20 text-violet-500' : 'bg-slate-100 dark:bg-white/10 text-slate-400 hover:text-violet-500'}`}
            title="Сравнить"
          >
            <GitCompareArrows className="w-3.5 h-3.5" />
          </button>
        )}
        {onToggleFav && (
          <button
            onClick={(e) => { e.stopPropagation(); onToggleFav(channel.id); }}
            className={`p-1.5 rounded-lg transition-all ${isFav ? 'bg-pink-500/20 text-pink-500' : 'bg-slate-100 dark:bg-white/10 text-slate-400 hover:text-pink-500'}`}
            title="Избранное"
          >
            <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
          </button>
        )}
      </div>

      <div onClick={onClick} className="w-full">
        <div className="flex items-start gap-4">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${channel.avatar} flex items-center justify-center text-white text-xl font-bold shadow-lg shrink-0`}>
            {channel.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-slate-900 dark:text-white truncate group-hover:text-violet-500 transition-colors">{channel.name}</h3>
              {channel.verified && <BadgeCheck className="w-4 h-4 text-blue-500 shrink-0" />}
            </div>
            <p className="text-xs text-violet-500 dark:text-violet-400 mb-2">{channel.username}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">{channel.description}</p>
          </div>
        </div>

        {/* Tags */}
        {channel.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {channel.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400">#{tag}</span>
            ))}
          </div>
        )}

        {/* Sparkline */}
        <div className="mt-3 flex items-center justify-between">
          <MiniChart data={channel.dailyHistory} dataKey="subscribers" color="#8b5cf6" width={120} height={28} />
          <span className="text-[10px] text-slate-400">14 дней</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-3 pt-3 border-t border-slate-100 dark:border-white/5">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Users className="w-3.5 h-3.5 text-blue-500" />
              <span className="text-sm font-bold text-slate-900 dark:text-white">{formatNumber(channel.subscribers)}</span>
            </div>
            <span className="text-[10px] text-slate-400">подписчиков</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Eye className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-sm font-bold text-slate-900 dark:text-white">{formatNumber(channel.avgViews)}</span>
            </div>
            <span className="text-[10px] text-slate-400">просмотров</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-violet-500" />
              <span className="text-sm font-bold text-emerald-500">+{formatNumber(channel.growthDay)}</span>
            </div>
            <span className="text-[10px] text-slate-400">за день</span>
          </div>
        </div>

        {/* ER Badge */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[10px] px-2 py-1 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 font-medium">ER: {channel.er}%</span>
          <span className="text-[10px] px-2 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500">{channel.postsPerDay} пост/день</span>
        </div>
      </div>
    </div>
  );
}
