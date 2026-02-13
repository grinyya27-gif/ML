import { Sun, Moon, Menu, X, Search, TrendingUp, BarChart3, Home, Bell, Heart, GitCompareArrows } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { useState, useRef, useEffect } from 'react';
import { Logo } from './Logo';
import { notifications as defaultNotifications } from '../data';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onAddChannel: () => void;
  onNavigate: (page: string, data?: unknown) => void;
  favCount: number;
  compareCount: number;
}

export function Header({ searchQuery, onSearchChange, onAddChannel, onNavigate, favCount, compareCount }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifs, setNotifs] = useState(defaultNotifications);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifs.filter(n => !n.read).length;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const markAllRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'growth': return '📈';
      case 'milestone': return '🏆';
      case 'new': return '✨';
      case 'update': return '🔄';
      default: return '📌';
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl bg-white/80 dark:bg-[#0a0a1a]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate('home')}>
            <div className="group-hover:scale-105 transition-transform duration-300">
              <Logo size={36} />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">
                <span className="bg-gradient-to-r from-violet-600 via-purple-500 to-blue-500 bg-clip-text text-transparent">Max</span>
                <span className="text-slate-800 dark:text-white">Metric</span>
              </h1>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 -mt-0.5 hidden sm:block tracking-wide">Аналитика каналов MAX</p>
            </div>
          </div>

          {/* Nav - Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            <button onClick={() => onNavigate('home')} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:text-violet-500 hover:bg-violet-500/5 transition-all">
              <Home className="w-3.5 h-3.5" /> Главная
            </button>
            <button onClick={() => onNavigate('top', 'subscribers')} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:text-violet-500 hover:bg-violet-500/5 transition-all">
              <TrendingUp className="w-3.5 h-3.5" /> Рейтинг
            </button>
            <button onClick={() => onNavigate('top', 'growthDay')} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:text-violet-500 hover:bg-violet-500/5 transition-all">
              <BarChart3 className="w-3.5 h-3.5" /> Прирост
            </button>
            <button onClick={() => onNavigate('compare')} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:text-violet-500 hover:bg-violet-500/5 transition-all relative">
              <GitCompareArrows className="w-3.5 h-3.5" /> Сравнение
              {compareCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-violet-500 text-white text-[9px] font-bold flex items-center justify-center">{compareCount}</span>
              )}
            </button>
            <button onClick={() => onNavigate('favorites')} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:text-violet-500 hover:bg-violet-500/5 transition-all relative">
              <Heart className="w-3.5 h-3.5" /> Избранное
              {favCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-pink-500 text-white text-[9px] font-bold flex items-center justify-center">{favCount}</span>
              )}
            </button>
          </nav>

          {/* Search - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xs mx-4">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
              <input
                type="text"
                placeholder="Поиск каналов..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
              />
              {searchQuery && (
                <button onClick={() => onSearchChange('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            {/* Notifications */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-violet-500 hover:border-violet-500/30 transition-all"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4.5 h-4.5 min-w-[18px] rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center px-1">{unreadCount}</span>
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl bg-white dark:bg-[#12122a] border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Уведомления</h3>
                    {unreadCount > 0 && (
                      <button onClick={markAllRead} className="text-xs text-violet-500 hover:text-violet-600 transition-colors">Прочитать все</button>
                    )}
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifs.map(n => (
                      <div key={n.id} className={`px-4 py-3 border-b border-slate-50 dark:border-white/[0.03] hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer ${!n.read ? 'bg-violet-50/50 dark:bg-violet-500/5' : ''}`}>
                        <div className="flex gap-3">
                          <span className="text-lg shrink-0">{getNotifIcon(n.type)}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900 dark:text-white">{n.title}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{n.message}</p>
                            <p className="text-[10px] text-slate-400 mt-1">{n.time}</p>
                          </div>
                          {!n.read && <div className="w-2 h-2 rounded-full bg-violet-500 shrink-0 mt-1.5" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={onAddChannel}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span className="text-base leading-none">+</span> Добавить
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-violet-500 hover:border-violet-500/30 transition-all"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 space-y-2 border-t border-slate-100 dark:border-white/5 pt-3 mt-1 animate-fade-in-up">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Поиск каналов..." value={searchQuery} onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all" />
            </div>
            {[
              { label: 'Главная', icon: <Home className="w-4 h-4" />, action: () => onNavigate('home') },
              { label: 'Рейтинг каналов', icon: <TrendingUp className="w-4 h-4" />, action: () => onNavigate('top', 'subscribers') },
              { label: 'Прирост каналов', icon: <BarChart3 className="w-4 h-4" />, action: () => onNavigate('top', 'growthDay') },
              { label: `Сравнение ${compareCount > 0 ? `(${compareCount})` : ''}`, icon: <GitCompareArrows className="w-4 h-4" />, action: () => onNavigate('compare') },
              { label: `Избранное ${favCount > 0 ? `(${favCount})` : ''}`, icon: <Heart className="w-4 h-4" />, action: () => onNavigate('favorites') },
            ].map(item => (
              <button key={item.label} onClick={() => { item.action(); setMobileMenuOpen(false); }}
                className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                {item.icon} {item.label}
              </button>
            ))}
            <button onClick={() => { onAddChannel(); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 text-white text-sm font-medium mt-1">
              <span className="text-lg leading-none">+</span> Добавить канал
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
