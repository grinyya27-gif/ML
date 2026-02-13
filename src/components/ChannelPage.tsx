import { useMemo, useState } from 'react';
import {
  ArrowLeft, BadgeCheck, Users, Eye, TrendingUp,
  Calendar, MessageSquare, Globe, Link2, Share2,
  BarChart3, Activity, Clock, Award, Zap, FileText,
  Heart, GitCompareArrows, Copy, Check, X
} from 'lucide-react';
import { Channel } from '../types';
import { formatNumber, formatNumberFull, getCategoryName, getCategoryIcon, channels as allChannels } from '../data';
import { Chart, MiniChart } from './Chart';
import { ChannelCard } from './ChannelCard';

interface ChannelPageProps {
  channel: Channel;
  onBack: () => void;
  onNavigate: (page: string, data?: unknown) => void;
  isFav: boolean;
  isCompare: boolean;
  onToggleFav: (id: number) => void;
  onToggleCompare: (id: number) => void;
  favIds: number[];
  compareIds: number[];
}

export function ChannelPage({ channel, onBack, onNavigate, isFav, isCompare, onToggleFav, onToggleCompare, favIds, compareIds }: ChannelPageProps) {
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const relatedChannels = useMemo(() => {
    return allChannels.filter(ch => ch.category === channel.category && ch.id !== channel.id).slice(0, 4);
  }, [channel]);

  const history = channel.dailyHistory;
  const last7 = history.slice(-7);
  const last30 = history.slice(-30);
  const avgViewsLast7 = Math.floor(last7.reduce((a, d) => a + d.views, 0) / 7);
  const avgGrowthLast7 = Math.floor(last7.reduce((a, d) => a + d.growth, 0) / 7);
  const avgGrowthLast30 = Math.floor(last30.reduce((a, d) => a + d.growth, 0) / 30);
  const maxGrowthDay = Math.max(...last30.map(d => d.growth));
  const minGrowthDay = Math.min(...last30.map(d => d.growth));
  const daysActive = Math.floor((Date.now() - new Date(channel.createdAt).getTime()) / (1000 * 60 * 60 * 24));

  // Position in rankings
  const subsRank = [...allChannels].sort((a, b) => b.subscribers - a.subscribers).findIndex(c => c.id === channel.id) + 1;
  const viewsRank = [...allChannels].sort((a, b) => b.avgViews - a.avgViews).findIndex(c => c.id === channel.id) + 1;
  const growthRank = [...allChannels].sort((a, b) => b.growthDay - a.growthDay).findIndex(c => c.id === channel.id) + 1;

  const handleCopy = () => {
    navigator.clipboard.writeText(channel.links[0]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen pb-12">
      {/* Top bar */}
      <div className="sticky top-16 z-40 bg-white/80 dark:bg-[#08081a]/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-violet-500 transition-colors">
            <ArrowLeft className="w-4 h-4" /><span className="hidden sm:inline">Назад к каталогу</span><span className="sm:hidden">Назад</span>
          </button>
          <div className="flex items-center gap-2">
            <button onClick={() => onNavigate('category', channel.category)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 text-xs text-slate-600 dark:text-slate-400 hover:text-violet-500 transition-colors">
              <span>{getCategoryIcon(channel.category)}</span>{getCategoryName(channel.category)}
            </button>
            <button onClick={() => onToggleCompare(channel.id)} className={`p-2 rounded-lg transition-all ${isCompare ? 'bg-violet-500/20 text-violet-500' : 'bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-violet-500'}`} title="Сравнить">
              <GitCompareArrows className="w-4 h-4" />
            </button>
            <button onClick={() => onToggleFav(channel.id)} className={`p-2 rounded-lg transition-all ${isFav ? 'bg-pink-500/20 text-pink-500' : 'bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-pink-500'}`} title="Избранное">
              <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
            </button>
            <button onClick={() => setShareOpen(true)} className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-violet-500 transition-colors" title="Поделиться">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        {/* Channel Header */}
        <div className="rounded-3xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] overflow-hidden mb-6">
          <div className={`h-28 sm:h-36 bg-gradient-to-r ${channel.avatar} relative`}>
            <div className="absolute inset-0 bg-black/10" />
            <svg className="absolute bottom-0 left-0 right-0 h-16 opacity-20" viewBox="0 0 400 60" preserveAspectRatio="none">
              <polyline points="0,50 30,40 60,45 90,30 120,35 150,20 180,25 210,15 240,18 270,10 300,12 330,5 360,8 400,3" fill="none" stroke="white" strokeWidth="1.5" />
            </svg>
          </div>

          <div className="px-5 sm:px-8 pb-6 -mt-10 sm:-mt-12 relative">
            <div className="flex flex-col sm:flex-row items-start gap-5">
              <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br ${channel.avatar} flex items-center justify-center text-white text-3xl sm:text-4xl font-bold shadow-xl ring-4 ring-white dark:ring-[#0a0a1a] shrink-0`}>
                {channel.name.charAt(0)}
              </div>

              <div className="flex-1 min-w-0 pt-2 sm:pt-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{channel.name}</h1>
                  {channel.verified && <BadgeCheck className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />}
                </div>
                <p className="text-sm text-violet-500 dark:text-violet-400 mt-0.5">{channel.username}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 max-w-2xl leading-relaxed">{channel.fullDescription}</p>

                {/* Rankings */}
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium">
                    🏆 #{subsRank} по подписчикам
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                    👁 #{viewsRank} по просмотрам
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 font-medium">
                    📈 #{growthRank} по приросту
                  </span>
                </div>

                {/* Tags */}
                {channel.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {channel.tags.map(tag => (
                      <span key={tag} className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-violet-500 cursor-pointer transition-colors">#{tag}</span>
                    ))}
                  </div>
                )}

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-2 mt-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 text-xs text-slate-600 dark:text-slate-400"><Globe className="w-3 h-3" /> {channel.language}</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 text-xs text-slate-600 dark:text-slate-400"><Calendar className="w-3 h-3" /> {new Date(channel.createdAt).toLocaleDateString('ru-RU')}</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 text-xs text-slate-600 dark:text-slate-400"><Clock className="w-3 h-3" /> {daysActive} дней</span>
                  <a href={channel.links[0]} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-500/10 text-xs text-violet-600 dark:text-violet-400 hover:bg-violet-500/20 transition-colors">
                    <Link2 className="w-3 h-3" /> Открыть в MAX
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {[
            { label: 'Подписчиков', value: formatNumberFull(channel.subscribers), icon: <Users className="w-4 h-4" />, color: 'from-blue-500 to-cyan-500' },
            { label: 'Ср. просмотры', value: formatNumber(channel.avgViews), icon: <Eye className="w-4 h-4" />, color: 'from-emerald-500 to-teal-500', sub: 'за пост' },
            { label: 'Прирост/день', value: `+${formatNumber(channel.growthDay)}`, icon: <TrendingUp className="w-4 h-4" />, color: 'from-violet-500 to-purple-500', sub: `ср. +${formatNumber(avgGrowthLast7)}/7д` },
            { label: 'ER канала', value: `${channel.er}%`, icon: <Activity className="w-4 h-4" />, color: 'from-amber-500 to-orange-500', sub: 'вовлечённость' },
            { label: 'Постов/день', value: channel.postsPerDay.toString(), icon: <MessageSquare className="w-4 h-4" />, color: 'from-pink-500 to-rose-500', sub: `всего ${formatNumber(channel.totalPosts)}` },
            { label: 'Прирост/мес', value: `+${formatNumber(channel.growthMonth)}`, icon: <BarChart3 className="w-4 h-4" />, color: 'from-indigo-500 to-blue-600', sub: `ср. +${formatNumber(avgGrowthLast30)}/д` },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] p-4 hover:border-violet-500/20 transition-all duration-300 group relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${stat.color} opacity-5 rounded-bl-[32px] group-hover:opacity-10 transition-opacity`} />
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-3 shadow-lg`}>{stat.icon}</div>
              <p className="text-lg font-bold text-slate-900 dark:text-white">{stat.value}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{stat.label}</p>
              {stat.sub && <p className="text-[10px] text-slate-400 mt-0.5">{stat.sub}</p>}
            </div>
          ))}
        </div>

        {/* Detailed Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] p-4">
            <div className="flex items-center justify-between mb-3"><span className="text-xs text-slate-400">Прирост за 7 дней</span><Award className="w-4 h-4 text-violet-500" /></div>
            <p className="text-xl font-bold text-emerald-500">+{formatNumber(channel.growthWeek)}</p>
            <MiniChart data={channel.dailyHistory} dataKey="growth" color="#8b5cf6" />
          </div>
          <div className="rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] p-4">
            <div className="flex items-center justify-between mb-3"><span className="text-xs text-slate-400">Макс. прирост/день</span><Zap className="w-4 h-4 text-amber-500" /></div>
            <p className="text-xl font-bold text-slate-900 dark:text-white">+{formatNumber(maxGrowthDay)}</p>
            <p className="text-[10px] text-slate-400 mt-1">Мин: +{formatNumber(minGrowthDay)}</p>
          </div>
          <div className="rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] p-4">
            <div className="flex items-center justify-between mb-3"><span className="text-xs text-slate-400">Ср. просмотры/7д</span><Eye className="w-4 h-4 text-emerald-500" /></div>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{formatNumber(avgViewsLast7)}</p>
            <MiniChart data={channel.dailyHistory} dataKey="views" color="#10b981" />
          </div>
          <div className="rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] p-4">
            <div className="flex items-center justify-between mb-3"><span className="text-xs text-slate-400">Всего постов</span><FileText className="w-4 h-4 text-blue-500" /></div>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{formatNumberFull(channel.totalPosts)}</p>
            <p className="text-[10px] text-slate-400 mt-1">{channel.postsPerDay} постов/день</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Chart data={channel.dailyHistory} dataKey="subscribers" color="#8b5cf6" gradientId={`subs-${channel.id}`} title="📈 Динамика подписчиков" height={260} />
          <Chart data={channel.dailyHistory} dataKey="views" color="#10b981" gradientId={`views-${channel.id}`} title="👁 Просмотры по дням" height={260} />
        </div>
        <div className="mb-8">
          <Chart data={channel.dailyHistory} dataKey="growth" color="#f59e0b" gradientId={`growth-${channel.id}`} title="🚀 Прирост подписчиков по дням" height={220} />
        </div>

        {/* Daily table */}
        <div className="rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] overflow-hidden mb-8">
          <div className="px-5 py-4 border-b border-slate-100 dark:border-white/5">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">📊 Статистика по дням (последние 14 дней)</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-white/5">
                  <th className="text-left px-5 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Дата</th>
                  <th className="text-right px-5 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Подписчики</th>
                  <th className="text-right px-5 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Прирост</th>
                  <th className="text-right px-5 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Просмотры</th>
                </tr>
              </thead>
              <tbody>
                {history.slice(-14).reverse().map((day, i) => (
                  <tr key={day.date} className={`border-b border-slate-50 dark:border-white/[0.03] hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors ${i === 0 ? 'bg-violet-50/50 dark:bg-violet-500/5' : ''}`}>
                    <td className="px-5 py-3 text-slate-700 dark:text-slate-300 whitespace-nowrap">
                      {new Date(day.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
                      {i === 0 && <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-500">сегодня</span>}
                    </td>
                    <td className="px-5 py-3 text-right font-medium text-slate-900 dark:text-white">{formatNumberFull(day.subscribers)}</td>
                    <td className="px-5 py-3 text-right"><span className="text-emerald-500 font-medium">+{formatNumberFull(day.growth)}</span></td>
                    <td className="px-5 py-3 text-right text-slate-600 dark:text-slate-400">{formatNumberFull(day.views)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Related channels */}
        {relatedChannels.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Похожие каналы в «{getCategoryName(channel.category)}»</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedChannels.map((ch, i) => (
                <ChannelCard key={ch.id} channel={ch} rank={i + 1} onClick={() => onNavigate('channel', ch.id)}
                  isFav={favIds.includes(ch.id)} isCompare={compareIds.includes(ch.id)}
                  onToggleFav={onToggleFav} onToggleCompare={onToggleCompare} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Share Modal */}
      {shareOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShareOpen(false)} />
          <div className="relative w-full max-w-sm rounded-2xl bg-white dark:bg-[#12122a] border border-slate-200 dark:border-white/10 shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Поделиться</h3>
              <button onClick={() => setShareOpen(false)} className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-400"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
              <input type="text" readOnly value={channel.links[0]} className="flex-1 text-sm bg-transparent text-slate-900 dark:text-white outline-none" />
              <button onClick={handleCopy} className={`p-2 rounded-lg transition-all ${copied ? 'bg-emerald-500/20 text-emerald-500' : 'bg-violet-500/10 text-violet-500 hover:bg-violet-500/20'}`}>
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            {copied && <p className="text-xs text-emerald-500 mt-2 text-center">Скопировано!</p>}
          </div>
        </div>
      )}
    </div>
  );
}
