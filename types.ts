export enum AppView {
  DASHBOARD = 'DASHBOARD',
  BIBLE_STUDY_AI = 'BIBLE_STUDY_AI',
  PRAYER_TRACKER = 'PRAYER_TRACKER',
  WORSHIP_SCHEDULE = 'WORSHIP_SCHEDULE',
  COMMUNITY_FORUM = 'COMMUNITY_FORUM',
}

export interface PrayerRequest {
  id: string;
  title: string;
  category: 'Personal' | 'Congregation' | 'Sick' | 'Missions';
  date: string;
  isAnswered: boolean;
  notes?: string;
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