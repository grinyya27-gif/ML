import { Channel, Category, DailyStats, Notification } from './types';

export const categories: Category[] = [
  { id: 'all', name: 'Все каналы', icon: '📋', count: 24 },
  { id: 'news', name: 'Новости', icon: '📰', count: 2 },
  { id: 'tech', name: 'Технологии', icon: '💻', count: 2 },
  { id: 'crypto', name: 'Крипто', icon: '₿', count: 2 },
  { id: 'entertainment', name: 'Развлечения', icon: '🎭', count: 2 },
  { id: 'education', name: 'Образование', icon: '📚', count: 2 },
  { id: 'business', name: 'Бизнес', icon: '💼', count: 3 },
  { id: 'sport', name: 'Спорт', icon: '⚽', count: 2 },
  { id: 'music', name: 'Музыка', icon: '🎵', count: 1 },
  { id: 'gaming', name: 'Игры', icon: '🎮', count: 2 },
  { id: 'travel', name: 'Путешествия', icon: '✈️', count: 1 },
  { id: 'food', name: 'Еда', icon: '🍕', count: 1 },
  { id: 'science', name: 'Наука', icon: '🔬', count: 2 },
  { id: 'design', name: 'Дизайн', icon: '🎨', count: 1 },
  { id: 'marketing', name: 'Маркетинг', icon: '📈', count: 1 },
];

export const notifications: Notification[] = [
  { id: 1, title: 'Новый рекорд!', message: 'MAX Мемы достигли 2.1M подписчиков', time: '5 мин назад', read: false, type: 'milestone' },
  { id: 2, title: 'Взрывной рост', message: 'CryptoMAX: +4100 подписчиков за день', time: '1 час назад', read: false, type: 'growth' },
  { id: 3, title: 'Новый канал', message: 'AI & ML Hub добавлен в каталог', time: '3 часа назад', read: true, type: 'new' },
  { id: 4, title: 'Обновление', message: 'Добавлены новые фильтры и сортировка', time: '1 день назад', read: true, type: 'update' },
  { id: 5, title: 'Milestone', message: 'Breaking MAX перешагнул 1.5M подписчиков', time: '2 дня назад', read: true, type: 'milestone' },
];

const avatarColors = [
  'from-violet-500 to-purple-600',
  'from-blue-500 to-cyan-500',
  'from-emerald-500 to-teal-500',
  'from-orange-500 to-red-500',
  'from-pink-500 to-rose-500',
  'from-indigo-500 to-blue-600',
  'from-amber-500 to-orange-500',
  'from-teal-500 to-green-500',
  'from-red-500 to-pink-600',
  'from-cyan-500 to-blue-500',
];

function generateDailyHistory(baseSubs: number, baseViews: number, days: number): DailyStats[] {
  const history: DailyStats[] = [];
  let subs = baseSubs - Math.floor(baseSubs * 0.15);
  const now = new Date();

  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dailyGrowth = Math.floor(Math.random() * (baseSubs * 0.004)) + Math.floor(baseSubs * 0.0005);
    subs += dailyGrowth;
    const dailyViews = Math.floor(baseViews * (0.7 + Math.random() * 0.6));
    history.push({
      date: date.toISOString().split('T')[0],
      subscribers: subs,
      views: dailyViews,
      growth: dailyGrowth,
    });
  }
  return history;
}

const channelTags: Record<number, string[]> = {
  1: ['новости', 'россия', 'мир', 'политика', 'оперативно'],
  2: ['технологии', 'гаджеты', 'IT', 'стартапы', 'обзоры'],
  3: ['крипто', 'биткоин', 'трейдинг', 'DeFi', 'аналитика'],
  4: ['мемы', 'юмор', 'смешно', 'развлечения', 'видео'],
  5: ['бизнес', 'стратегии', 'инвестиции', 'кейсы', 'предпринимательство'],
  6: ['игры', 'обзоры', 'стримы', 'гайды', 'gaming'],
  7: ['наука', 'космос', 'физика', 'биология', 'открытия'],
  8: ['спорт', 'футбол', 'хоккей', 'MMA', 'результаты'],
  9: ['дизайн', 'UI/UX', 'вдохновение', 'тренды', 'инструменты'],
  10: ['путешествия', 'туры', 'лайфхаки', 'страны', 'фото'],
  11: ['образование', 'курсы', 'навыки', 'саморазвитие', 'книги'],
  12: ['маркетинг', 'SMM', 'SEO', 'таргет', 'digital'],
  13: ['музыка', 'новинки', 'подборки', 'концерты', 'артисты'],
  14: ['еда', 'рецепты', 'кулинария', 'рестораны', 'лайфхаки'],
  15: ['новости', 'срочно', 'breaking', 'экстренные', 'мир'],
  16: ['AI', 'нейросети', 'ML', 'ChatGPT', 'технологии'],
  17: ['инвестиции', 'акции', 'ETF', 'фондовый рынок', 'аналитика'],
  18: ['киберспорт', 'CS2', 'Dota', 'Valorant', 'турниры'],
  19: ['космос', 'NASA', 'SpaceX', 'астрономия', 'вселенная'],
  20: ['фитнес', 'тренировки', 'питание', 'ЗОЖ', 'мотивация'],
  21: ['NFT', 'Web3', 'блокчейн', 'метавселенные', 'DAO'],
  22: ['кино', 'сериалы', 'обзоры', 'трейлеры', 'рейтинги'],
  23: ['стартапы', 'венчур', 'акселераторы', 'питч', 'инвестиции'],
  24: ['Python', 'программирование', 'Django', 'уроки', 'карьера'],
};

const fullDescriptions: Record<number, string> = {
  1: 'MAX Новости — ваш главный источник оперативной информации в мессенджере MAX. Мы публикуем проверенные новости из России и мира, аналитические обзоры, эксклюзивные материалы и расследования. Канал работает 24/7, обеспечивая мгновенный доступ к самым важным событиям дня. Наша команда профессиональных журналистов гарантирует достоверность каждой публикации. Подписывайтесь, чтобы всегда быть в курсе!',
  2: 'TechHub MAX — крупнейший технологический канал в мессенджере MAX. Ежедневные обзоры новых гаджетов, аналитика IT-рынка, новости стартапов и технологические тренды. Мы тестируем устройства, сравниваем характеристики, публикуем эксклюзивные утечки о будущих релизах.',
  3: 'CryptoMAX — профессиональная аналитика криптовалютного рынка 24/7. Торговые сигналы, технический и фундаментальный анализ, обзоры новых проектов, DeFi-стратегии и NFT-тренды.',
  4: 'MAX Мемы — самое весёлое место в мессенджере MAX! Ежедневные подборки лучших мемов со всего интернета. Смешные видео, картинки, гифки и жизненные ситуации. Более 2 миллионов подписчиков не могут ошибаться!',
  5: 'Бизнес Инсайды — канал для предпринимателей и инвесторов. Разборы бизнес-кейсов, интервью с успешными предпринимателями, стратегии масштабирования, советы по привлечению инвестиций.',
  6: 'GameZone MAX — всё об играх! Обзоры новинок, гайды по прохождению, новости игровой индустрии, анонсы и трейлеры. Стримы по выходным, конкурсы с призами.',
  7: 'Наука MAX — удивительный мир науки и технологий. Космические открытия, квантовая физика, биотехнологии, экология и многое другое.',
  8: 'MAX Спорт — главный спортивный канал в MAX. Результаты матчей, аналитика, трансферы, интервью со спортсменами.',
  9: 'Дизайн & UI/UX — источник вдохновения для дизайнеров. Тренды в дизайне, подборки работ, туториалы, полезные инструменты и плагины.',
  10: 'Путешествия MAX — лучшие направления, горящие туры, лайфхаки для путешественников.',
  11: 'MAX Образование — платформа для саморазвития. Онлайн-курсы, подборки книг, полезные навыки, изучение языков.',
  12: 'Маркетинг PRO — канал для специалистов в digital-маркетинге. SMM-стратегии, таргетированная реклама, SEO-оптимизация.',
  13: 'MAX Music — музыкальный канал №1 в MAX. Новинки музыки, подборки по жанрам, обзоры альбомов.',
  14: 'Кулинарный MAX — рецепты со всего мира на каждый день. Пошаговые инструкции, видео-рецепты.',
  15: 'Breaking MAX — канал срочных новостей. Мы первыми сообщаем о главных событиях в России и мире.',
  16: 'AI & ML Hub — всё об искусственном интеллекте и машинном обучении. Обзоры новых моделей, туториалы по нейросетям.',
  17: 'MAX Инвестиции — аналитика фондового рынка. Разборы акций, облигаций, ETF.',
  18: 'Esports MAX — всё о киберспорте. CS2, Dota 2, Valorant, League of Legends.',
  19: 'Космос MAX — исследование вселенной. Миссии NASA и SpaceX, астрономические явления.',
  20: 'MAX Fitness — тренировки, питание и здоровый образ жизни.',
  21: 'NFT & Web3 — гайд по миру невзаимозаменяемых токенов и Web3.',
  22: 'MAX Cinema — обзоры фильмов и сериалов. Рецензии, рейтинги, трейлеры.',
  23: 'Стартап MAX — экосистема для стартаперов. Акселераторы, венчурные фонды, питч-деки.',
  24: 'Python MAX — изучаем Python от нуля до профи. Уроки, проекты, задачи на собеседования.',
};

const createdDates = [
  '2023-01-15', '2023-03-22', '2023-02-10', '2022-11-05', '2023-05-18',
  '2023-06-01', '2023-04-12', '2023-01-28', '2023-07-14', '2023-08-03',
  '2023-03-05', '2023-04-20', '2023-06-15', '2023-09-01', '2022-12-20',
  '2023-02-28', '2023-05-10', '2023-07-22', '2023-03-18', '2023-08-15',
  '2023-04-05', '2023-01-10', '2023-06-28', '2023-02-14'
];

const rawChannels = [
  { id: 1, name: 'MAX Новости', username: '@maxnews', avatar: avatarColors[0], category: 'news', description: 'Главные новости дня в мессенджере MAX. Оперативно, честно, без цензуры.', subscribers: 1250000, views: 890000, growthDay: 3200, growthWeek: 18500, growthMonth: 72000, avgViews: 450000, er: 36, verified: true, postsPerDay: 24, totalPosts: 15840 },
  { id: 2, name: 'TechHub MAX', username: '@techhubmax', avatar: avatarColors[1], category: 'tech', description: 'Обзоры гаджетов, IT-новости, стартапы и технологические тренды.', subscribers: 980000, views: 720000, growthDay: 2800, growthWeek: 15200, growthMonth: 58000, avgViews: 380000, er: 38.8, verified: true, postsPerDay: 12, totalPosts: 8640 },
  { id: 3, name: 'CryptoMAX', username: '@cryptomax', avatar: avatarColors[2], category: 'crypto', description: 'Аналитика криптовалют, сигналы, обзоры рынка 24/7.', subscribers: 870000, views: 650000, growthDay: 4100, growthWeek: 22000, growthMonth: 85000, avgViews: 320000, er: 36.8, verified: true, postsPerDay: 18, totalPosts: 11520 },
  { id: 4, name: 'MAX Мемы', username: '@maxmemes', avatar: avatarColors[3], category: 'entertainment', description: 'Лучшие мемы со всего интернета. Смех продлевает жизнь! 😂', subscribers: 2100000, views: 1800000, growthDay: 5500, growthWeek: 32000, growthMonth: 120000, avgViews: 950000, er: 45.2, verified: true, postsPerDay: 30, totalPosts: 21600 },
  { id: 5, name: 'Бизнес Инсайды', username: '@bizinsider', avatar: avatarColors[4], category: 'business', description: 'Бизнес-стратегии, кейсы успешных предпринимателей, инвестиции.', subscribers: 750000, views: 520000, growthDay: 1800, growthWeek: 9800, growthMonth: 38000, avgViews: 280000, er: 37.3, verified: true, postsPerDay: 8, totalPosts: 4800 },
  { id: 6, name: 'GameZone MAX', username: '@gamezonemax', avatar: avatarColors[5], category: 'gaming', description: 'Новости игровой индустрии, обзоры, стримы и гайды.', subscribers: 620000, views: 480000, growthDay: 2100, growthWeek: 11500, growthMonth: 44000, avgViews: 250000, er: 40.3, verified: false, postsPerDay: 15, totalPosts: 9000 },
  { id: 7, name: 'Наука MAX', username: '@sciencemax', avatar: avatarColors[6], category: 'science', description: 'Удивительные факты науки, космос, физика и открытия.', subscribers: 540000, views: 390000, growthDay: 1500, growthWeek: 8200, growthMonth: 32000, avgViews: 210000, er: 38.9, verified: true, postsPerDay: 6, totalPosts: 3960 },
  { id: 8, name: 'MAX Спорт', username: '@maxsport', avatar: avatarColors[7], category: 'sport', description: 'Все виды спорта: футбол, хоккей, баскетбол, MMA и не только.', subscribers: 890000, views: 670000, growthDay: 2400, growthWeek: 13500, growthMonth: 52000, avgViews: 340000, er: 38.2, verified: true, postsPerDay: 20, totalPosts: 14400 },
  { id: 9, name: 'Дизайн & UI/UX', username: '@designmax', avatar: avatarColors[8], category: 'design', description: 'Вдохновение для дизайнеров, тренды UI/UX, полезные ресурсы.', subscribers: 420000, views: 310000, growthDay: 1200, growthWeek: 6800, growthMonth: 26000, avgViews: 165000, er: 39.3, verified: false, postsPerDay: 5, totalPosts: 3000 },
  { id: 10, name: 'Путешествия MAX', username: '@travelmax', avatar: avatarColors[9], category: 'travel', description: 'Лучшие направления, лайфхаки для путешественников, горящие туры.', subscribers: 380000, views: 280000, growthDay: 950, growthWeek: 5500, growthMonth: 21000, avgViews: 145000, er: 38.2, verified: false, postsPerDay: 4, totalPosts: 2400 },
  { id: 11, name: 'MAX Образование', username: '@maxedu', avatar: avatarColors[0], category: 'education', description: 'Онлайн-курсы, полезные навыки, саморазвитие и обучение.', subscribers: 680000, views: 490000, growthDay: 1900, growthWeek: 10200, growthMonth: 39000, avgViews: 260000, er: 38.2, verified: true, postsPerDay: 7, totalPosts: 4620 },
  { id: 12, name: 'Маркетинг PRO', username: '@marketingpro', avatar: avatarColors[1], category: 'marketing', description: 'Digital-маркетинг, SMM, таргет, SEO и контент-стратегии.', subscribers: 510000, views: 370000, growthDay: 1600, growthWeek: 8900, growthMonth: 34000, avgViews: 195000, er: 38.2, verified: true, postsPerDay: 6, totalPosts: 3600 },
  { id: 13, name: 'MAX Music', username: '@maxmusic', avatar: avatarColors[2], category: 'music', description: 'Новинки музыки, подборки, концерты и музыкальные новости.', subscribers: 450000, views: 340000, growthDay: 1100, growthWeek: 6200, growthMonth: 24000, avgViews: 180000, er: 40.0, verified: false, postsPerDay: 8, totalPosts: 4800 },
  { id: 14, name: 'Кулинарный MAX', username: '@foodmax', avatar: avatarColors[3], category: 'food', description: 'Рецепты со всего мира, кулинарные лайфхаки и обзоры ресторанов.', subscribers: 320000, views: 240000, growthDay: 800, growthWeek: 4500, growthMonth: 17000, avgViews: 128000, er: 40.0, verified: false, postsPerDay: 5, totalPosts: 2500 },
  { id: 15, name: 'Breaking MAX', username: '@breakingmax', avatar: avatarColors[4], category: 'news', description: 'Срочные новости и экстренные события. Первыми узнавайте о главном.', subscribers: 1580000, views: 1200000, growthDay: 4800, growthWeek: 26000, growthMonth: 95000, avgViews: 620000, er: 39.2, verified: true, postsPerDay: 35, totalPosts: 25200 },
  { id: 16, name: 'AI & ML Hub', username: '@aimlhub', avatar: avatarColors[5], category: 'tech', description: 'Искусственный интеллект, машинное обучение, нейросети и будущее.', subscribers: 720000, views: 530000, growthDay: 3500, growthWeek: 19000, growthMonth: 73000, avgViews: 280000, er: 38.9, verified: true, postsPerDay: 10, totalPosts: 6000 },
  { id: 17, name: 'MAX Инвестиции', username: '@maxinvest', avatar: avatarColors[6], category: 'business', description: 'Фондовый рынок, акции, облигации, ETF и инвестиционные идеи.', subscribers: 660000, views: 470000, growthDay: 2000, growthWeek: 11000, growthMonth: 42000, avgViews: 245000, er: 37.1, verified: true, postsPerDay: 9, totalPosts: 5400 },
  { id: 18, name: 'Esports MAX', username: '@esportsmax', avatar: avatarColors[7], category: 'gaming', description: 'Киберспорт: CS2, Dota 2, Valorant, LoL. Турниры и аналитика.', subscribers: 490000, views: 380000, growthDay: 1700, growthWeek: 9500, growthMonth: 36000, avgViews: 200000, er: 40.8, verified: false, postsPerDay: 12, totalPosts: 7200 },
  { id: 19, name: 'Космос MAX', username: '@spacemax', avatar: avatarColors[8], category: 'science', description: 'Космические миссии, астрономия, SpaceX и исследование вселенной.', subscribers: 410000, views: 300000, growthDay: 1300, growthWeek: 7200, growthMonth: 28000, avgViews: 160000, er: 39.0, verified: true, postsPerDay: 4, totalPosts: 2640 },
  { id: 20, name: 'MAX Fitness', username: '@maxfitness', avatar: avatarColors[9], category: 'sport', description: 'Тренировки, питание, ЗОЖ и мотивация для активной жизни.', subscribers: 350000, views: 260000, growthDay: 900, growthWeek: 5100, growthMonth: 19500, avgViews: 138000, er: 39.4, verified: false, postsPerDay: 6, totalPosts: 3600 },
  { id: 21, name: 'NFT & Web3', username: '@nftweb3max', avatar: avatarColors[0], category: 'crypto', description: 'NFT коллекции, Web3 проекты, метавселенные и блокчейн.', subscribers: 560000, views: 410000, growthDay: 2600, growthWeek: 14500, growthMonth: 55000, avgViews: 215000, er: 38.4, verified: false, postsPerDay: 11, totalPosts: 6600 },
  { id: 22, name: 'MAX Cinema', username: '@maxcinema', avatar: avatarColors[1], category: 'entertainment', description: 'Обзоры фильмов и сериалов, трейлеры, рейтинги и рекомендации.', subscribers: 780000, views: 590000, growthDay: 2200, growthWeek: 12000, growthMonth: 46000, avgViews: 310000, er: 39.7, verified: true, postsPerDay: 8, totalPosts: 5760 },
  { id: 23, name: 'Стартап MAX', username: '@startupmax', avatar: avatarColors[2], category: 'business', description: 'Стартапы, венчурные инвестиции, акселераторы и предпринимательство.', subscribers: 430000, views: 310000, growthDay: 1400, growthWeek: 7800, growthMonth: 30000, avgViews: 165000, er: 38.4, verified: false, postsPerDay: 5, totalPosts: 3000 },
  { id: 24, name: 'Python MAX', username: '@pythonmax', avatar: avatarColors[3], category: 'education', description: 'Уроки Python, проекты, задачи и карьера в программировании.', subscribers: 520000, views: 380000, growthDay: 1700, growthWeek: 9300, growthMonth: 36000, avgViews: 200000, er: 38.5, verified: true, postsPerDay: 7, totalPosts: 4200 },
];

export const channels: Channel[] = rawChannels.map((ch, i) => ({
  ...ch,
  fullDescription: fullDescriptions[ch.id] || ch.description,
  createdAt: createdDates[i],
  language: 'Русский',
  links: [`https://max.me/${ch.username.replace('@', '')}`],
  dailyHistory: generateDailyHistory(ch.subscribers, ch.avgViews, 90),
  tags: channelTags[ch.id] || [],
}));

export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

export function formatNumberFull(num: number): string {
  return num.toLocaleString('ru-RU');
}

export function getCategoryName(categoryId: string): string {
  const cat = categories.find(c => c.id === categoryId);
  return cat ? cat.name : categoryId;
}

export function getCategoryIcon(categoryId: string): string {
  const cat = categories.find(c => c.id === categoryId);
  return cat ? cat.icon : '📋';
}
