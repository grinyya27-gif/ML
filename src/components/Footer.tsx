import { categories } from '../data';
import { Logo } from './Logo';

interface FooterProps {
  onNavigate: (page: string, data?: unknown) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-slate-200 dark:border-white/[0.06] mt-16 bg-white/50 dark:bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4 cursor-pointer" onClick={() => onNavigate('home')}>
              <Logo size={40} />
              <div>
                <p className="font-bold text-slate-900 dark:text-white">
                  <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">Max</span>Metric
                </p>
                <p className="text-xs text-slate-400">Аналитика каналов MAX</p>
              </div>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Самый полный каталог каналов мессенджера MAX. Рейтинги, графики роста, сравнение каналов и детальная аналитика.
            </p>
            <div className="flex gap-2 mt-4">
              <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-medium">🟢 Online</span>
              <span className="text-[10px] px-2 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500">v2.0</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Категории</h4>
            <div className="space-y-2">
              {categories.filter(c => c.id !== 'all').slice(0, 7).map(cat => (
                <button key={cat.id} onClick={() => onNavigate('category', cat.id)} className="block text-sm text-slate-500 hover:text-violet-500 transition-colors">
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Ещё категории</h4>
            <div className="space-y-2">
              {categories.filter(c => c.id !== 'all').slice(7).map(cat => (
                <button key={cat.id} onClick={() => onNavigate('category', cat.id)} className="block text-sm text-slate-500 hover:text-violet-500 transition-colors">
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Инструменты</h4>
            <div className="space-y-2">
              <button onClick={() => onNavigate('top', 'subscribers')} className="block text-sm text-slate-500 hover:text-violet-500 transition-colors">🏆 Рейтинг каналов</button>
              <button onClick={() => onNavigate('top', 'views')} className="block text-sm text-slate-500 hover:text-violet-500 transition-colors">👁 Топ по просмотрам</button>
              <button onClick={() => onNavigate('top', 'growthDay')} className="block text-sm text-slate-500 hover:text-violet-500 transition-colors">📈 Топ по приросту</button>
              <button onClick={() => onNavigate('compare')} className="block text-sm text-slate-500 hover:text-violet-500 transition-colors">⚖️ Сравнение каналов</button>
              <button onClick={() => onNavigate('favorites')} className="block text-sm text-slate-500 hover:text-violet-500 transition-colors">❤️ Избранное</button>
            </div>

            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mt-6 mb-4">О проекте</h4>
            <div className="space-y-2">
              <span className="block text-sm text-slate-500">API</span>
              <span className="block text-sm text-slate-500">Реклама</span>
              <span className="block text-sm text-slate-500">Контакты</span>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400">© 2025 MaxMetric. Все права защищены.</p>
          <p className="text-xs text-slate-400">Данные обновляются каждый час • 24 канала в базе</p>
        </div>
      </div>
    </footer>
  );
}
