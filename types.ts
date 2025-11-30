export enum AppView {
  DASHBOARD = 'DASHBOARD',
  BIBLE_STUDY_AI = 'BIBLE_STUDY_AI',
  PRAYER_TRACKER = 'PRAYER_TRACKER',
  WORSHIP_SCHEDULE = 'WORSHIP_SCHEDULE',
  COMMUNITY_FORUM = 'COMMUNITY_FORUM',
  HYMNAL = 'HYMNAL',
}

export interface PrayerRequest {
  id: string;
  name: string;
  request: string;
  category: string;
  date: string;
  status: 'ongoing' | 'answered';
  reminderSet: boolean;
  prayingCount: number;
}

export interface ServiceEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'Sunday Morning' | 'Sunday Evening' | 'Midweek' | 'Gospel Meeting' | 'Special';
  description: string;
  scripture?: string;
}

export interface ForumPost {
  id: string;
  author: string;
  title: string;
  content: string;
  date: string;
  likes: number;
  replies: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isStreaming?: boolean;
}

export interface Hymn {
  id: string;
  number: number;
  title: string;
  key: string;
  lyrics: string[];
}