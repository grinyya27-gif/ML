import { useState, useMemo, useCallback, useEffect } from 'react';
import { ThemeProvider } from './ThemeContext';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { StatsBar } from './components/StatsBar';
import { TopChannels } from './components/TopChannels';
import { CategorySidebar } from './components/CategorySidebar';
import { MobileCategoryBar } from './components/MobileCategoryBar';
import { SortTabs } from './components/SortTabs';
import { ChannelCard } from './components/ChannelCard';
import { AddChannelModal } from './components/AddChannelModal';
import { Footer } from './components/Footer';
import { ChannelPage } from './components/ChannelPage';
import { TopPage } from './components/TopPage';
import { ComparePage } from './components/ComparePage';
import { FavoritesPage } from './components/FavoritesPage';
import { BottomNav } from './components/BottomNav';
import { RecentlyViewed } from './components/RecentlyViewed';
import { channels } from './data';
import type { SortBy, TimePeriod } from './types';

interface NavigationState {
  page: 'home' | 'channel' | 'top' | 'compare' | 'favorites';
  data?: unknown;
}

function AppContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SortBy>('subscribers');
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('day');
  const [showAddModal, setShowAddModal] = useState(false);
  const [navState, setNavState] = useState<NavigationState>({ page: 'home' });
  const [favIds, setFavIds] = useState<number[]>(() => {
    try { return JSON.parse(localStorage.getItem('maxmetric_favs') || '[]'); } catch { return []; }
  });
  const [compareIds, setCompareIds] = useState<number[]>([]);
  const [recentIds, setRecentIds] = useState<number[]>(() => {
    try { return JSON.parse(localStorage.getItem('maxmetric_recent') || '[]'); } catch { return []; }
  });
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  // Save favs to localStorage
  useEffect(() => {
    localStorage.setItem('maxmetric_favs', JSON.stringify(favIds));
  }, [favIds]);

  useEffect(() => {
    localStorage.setItem('maxmetric_recent', JSON.stringify(recentIds));
  }, [recentIds]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navState]);

  const navigate = useCallback((page: string, data?: unknown) => {
    if (page === 'home') {
      setNavState({ page: 'home' });
    } else if (page === 'channel') {
      const channelId = data as number;
      setRecentIds(prev => {
        const next = [channelId, ...prev.filter(id => id !== channelId)].slice(0, 10);
        return next;
      });
      setNavState({ page: 'channel', data });
    } else if (page === 'top') {
      setNavState({ page: 'top', data: data || 'subscribers' });
    } else if (page === 'category') {
      setSelectedCategory(data as string);
      setNavState({ page: 'home' });
    } else if (page === 'compare') {
      setNavState({ page: 'compare' });
    } else if (page === 'favorites') {
      setNavState({ page: 'favorites' });
    }
  }, []);

  const toggleFav = useCallback((id: number) => {
    setFavIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }, []);

  const toggleCompare = useCallback((id: number) => {
    setCompareIds(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 4) return prev; // max 4 for compare
      return [...prev, id];
    });
  }, []);

  const handleSortChange = (sort: SortBy) => setSortBy(sort);

  const handleTimePeriodChange = (period: TimePeriod) => {
    setTimePeriod(period);
    if (period === 'day') setSortBy('growthDay');
    else if (period === 'week') setSortBy('growthWeek');
    else setSortBy('growthMonth');
  };

  const handleCategoryFromHero = (cat: string) => {
    setSelectedCategory(cat);
    setTimeout(() => {
      document.getElementById('channel-list')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const filteredChannels = useMemo(() => {
    let result = [...channels];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(ch =>
        ch.name.toLowerCase().includes(q) ||
        ch.username.toLowerCase().includes(q) ||
        ch.description.toLowerCase().includes(q) ||
        ch.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== 'all') {
      result = result.filter(ch => ch.category === selectedCategory);
    }

    if (verifiedOnly) {
      result = result.filter(ch => ch.verified);
    }

    const sortKey = sortBy === 'growthDay' || sortBy === 'growthWeek' || sortBy === 'growthMonth'
      ? (timePeriod === 'day' ? 'growthDay' : timePeriod === 'week' ? 'growthWeek' : 'growthMonth')
      : sortBy;

    result.sort((a, b) => (b[sortKey] as number) - (a[sortKey] as number));
    return result;
  }, [searchQuery, selectedCategory, sortBy, timePeriod, verifiedOnly]);

  const headerProps = {
    searchQuery,
    onSearchChange: (q: string) => { setSearchQuery(q); if (navState.page !== 'home') navigate('home'); },
    onAddChannel: () => setShowAddModal(true),
    onNavigate: navigate,
    favCount: favIds.length,
    compareCount: compareIds.length,
  };

  // Channel page
  if (navState.page === 'channel') {
    const channelId = navState.data as number;
    const channel = channels.find(ch => ch.id === channelId);
    if (!channel) { setNavState({ page: 'home' }); return null; }
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#08081a] transition-colors duration-300">
        <Header {...headerProps} />
        <ChannelPage
          channel={channel}
          onBack={() => navigate('home')}
          onNavigate={navigate}
          isFav={favIds.includes(channel.id)}
          isCompare={compareIds.includes(channel.id)}
          onToggleFav={toggleFav}
          onToggleCompare={toggleCompare}
          favIds={favIds}
          compareIds={compareIds}
        />
        <Footer onNavigate={navigate} />
        <AddChannelModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
        <BottomNav onNavigate={navigate} favCount={favIds.length} compareCount={compareIds.length} />
      </div>
    );
  }

  // Top page
  if (navState.page === 'top') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#08081a] transition-colors duration-300">
        <Header {...headerProps} />
        <TopPage initialSort={navState.data as SortBy} onBack={() => navigate('home')} onChannelClick={(id) => navigate('channel', id)} />
        <Footer onNavigate={navigate} />
        <AddChannelModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
        <BottomNav onNavigate={navigate} favCount={favIds.length} compareCount={compareIds.length} />
      </div>
    );
  }

  // Compare page
  if (navState.page === 'compare') {
    const compareChannels = channels.filter(ch => compareIds.includes(ch.id));
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#08081a] transition-colors duration-300">
        <Header {...headerProps} />
        <ComparePage
          channels={compareChannels}
          onBack={() => navigate('home')}
          onRemove={(id) => setCompareIds(prev => prev.filter(x => x !== id))}
          onChannelClick={(id) => navigate('channel', id)}
        />
        <Footer onNavigate={navigate} />
        <BottomNav onNavigate={navigate} favCount={favIds.length} compareCount={compareIds.length} />
      </div>
    );
  }

  // Favorites page
  if (navState.page === 'favorites') {
    const favChannels = channels.filter(ch => favIds.includes(ch.id));
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#08081a] transition-colors duration-300">
        <Header {...headerProps} />
        <FavoritesPage
          channels={favChannels}
          onBack={() => navigate('home')}
          onChannelClick={(id) => navigate('channel', id)}
          onToggleFav={toggleFav}
          onToggleCompare={toggleCompare}
          compareIds={compareIds}
        />
        <Footer onNavigate={navigate} />
        <BottomNav onNavigate={navigate} favCount={favIds.length} compareCount={compareIds.length} />
      </div>
    );
  }

  // Home page
  const recentChannels = recentIds.map(id => channels.find(ch => ch.id === id)).filter(Boolean) as typeof channels;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#08081a] transition-colors duration-300 pb-16 lg:pb-0">
      <Header {...headerProps} onSearchChange={setSearchQuery} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <HeroBanner
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onCategoryClick={handleCategoryFromHero}
          onTopClick={() => navigate('top', 'subscribers')}
        />

        <StatsBar channels={channels} />

        {/* Recently Viewed */}
        {recentChannels.length > 0 && !searchQuery && selectedCategory === 'all' && (
          <RecentlyViewed channels={recentChannels} onChannelClick={(id: number) => navigate('channel', id)} />
        )}

        <TopChannels
          channels={channels}
          onChannelClick={(id) => navigate('channel', id)}
          onViewAll={(sort) => navigate('top', sort)}
        />

        <MobileCategoryBar selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

        <div className="flex gap-6" id="channel-list">
          <div className="hidden lg:block">
            <CategorySidebar selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
          </div>

          <div className="flex-1 min-w-0">
            <SortTabs
              sortBy={sortBy}
              timePeriod={timePeriod}
              onSortChange={handleSortChange}
              onTimePeriodChange={handleTimePeriodChange}
              verifiedOnly={verifiedOnly}
              onVerifiedOnlyChange={setVerifiedOnly}
            />

            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-slate-500">
                Найдено: <span className="font-semibold text-slate-900 dark:text-white">{filteredChannels.length}</span> каналов
                {verifiedOnly && <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500">✓ Только верифицированные</span>}
              </p>
              <div className="flex items-center gap-2">
                {selectedCategory !== 'all' && (
                  <button onClick={() => setSelectedCategory('all')} className="text-xs text-violet-500 hover:text-violet-600 transition-colors">Сбросить ✕</button>
                )}
              </div>
            </div>

            {filteredChannels.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mx-auto mb-4"><span className="text-3xl">🔍</span></div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Ничего не найдено</h3>
                <p className="text-sm text-slate-500 mb-4">Попробуйте изменить запрос или категорию</p>
                <button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setVerifiedOnly(false); }}
                  className="px-4 py-2 rounded-xl bg-violet-500 text-white text-sm font-medium hover:bg-violet-600 transition-colors">Сбросить фильтры</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
                {filteredChannels.map((channel, index) => (
                  <ChannelCard
                    key={channel.id}
                    channel={channel}
                    rank={index + 1}
                    onClick={() => navigate('channel', channel.id)}
                    isFav={favIds.includes(channel.id)}
                    isCompare={compareIds.includes(channel.id)}
                    onToggleFav={toggleFav}
                    onToggleCompare={toggleCompare}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer onNavigate={navigate} />
      <AddChannelModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
      <BottomNav onNavigate={navigate} favCount={favIds.length} compareCount={compareIds.length} />
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
