import { ArrowLeft, Heart } from 'lucide-react';
import { Channel } from '../types';
import { ChannelCard } from './ChannelCard';

interface FavoritesPageProps {
  channels: Channel[];
  onBack: () => void;
  onChannelClick: (id: number) => void;
  onToggleFav: (id: number) => void;
  onToggleCompare: (id: number) => void;
  compareIds: number[];
}

export function FavoritesPage({ channels, onBack, onChannelClick, onToggleFav, onToggleCompare, compareIds }: FavoritesPageProps) {
  if (channels.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-3xl bg-pink-500/10 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-pink-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Нет избранных каналов</h2>
          <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">Нажмите ❤️ на карточке канала, чтобы добавить его в избранное</p>
          <button onClick={onBack} className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 text-white text-sm font-medium hover:shadow-lg transition-all">
            Вернуться к каталогу
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-12">
      <div className="sticky top-16 z-40 bg-white/80 dark:bg-[#08081a]/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-violet-500 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Назад
          </button>
          <span className="text-sm font-semibold text-slate-900 dark:text-white">❤️ Избранное ({channels.length})</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">❤️ Избранные каналы</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {channels.map((ch, i) => (
            <ChannelCard
              key={ch.id}
              channel={ch}
              rank={i + 1}
              onClick={() => onChannelClick(ch.id)}
              isFav={true}
              isCompare={compareIds.includes(ch.id)}
              onToggleFav={onToggleFav}
              onToggleCompare={onToggleCompare}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
