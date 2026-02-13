export interface DailyStats {
  date: string;
  subscribers: number;
  views: number;
  growth: number;
}

export interface Channel {
  id: number;
  name: string;
  username: string;
  avatar: string;
  category: string;
  description: string;
  fullDescription: string;
  subscribers: number;
  views: number;
  growthDay: number;
  growthWeek: number;
  growthMonth: number;
  avgViews: number;
  er: number;
  verified: boolean;
  createdAt: string;
  postsPerDay: number;
  totalPosts: number;
  language: string;
  links: string[];
  dailyHistory: DailyStats[];
  tags: string[];
}

export type SortBy = 'subscribers' | 'views' | 'growthDay' | 'growthWeek' | 'growthMonth';
export type TimePeriod = 'day' | 'week' | 'month';
export type ThemeMode = 'light' | 'dark';
export type ChartPeriod = '7d' | '30d' | '90d';
export type PageType = 'home' | 'channel' | 'category' | 'search' | 'top' | 'compare' | 'favorites';

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'growth' | 'milestone' | 'new' | 'update';
}
