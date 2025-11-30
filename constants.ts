import { PrayerRequest, ServiceEvent, ForumPost } from './types';

export const SYSTEM_INSTRUCTION = `You are a dedicated Bible Study Assistant for a Church of Christ digital platform. 
Your core principles are:
1. Speak where the Bible speaks, and be silent where the Bible is silent.
2. Adhere strictly to New Testament teachings for church doctrine and practice.
3. Emphasize congregational autonomy and non-denominational Christianity.
4. Promote unity based on the truth of Scripture.

When answering:
- Provide specific book, chapter, and verse references (e.g., Acts 2:38).
- Use a reverent, encouraging, and educational tone.
- If asked about controversial topics, present the Biblical evidence clearly and fairly, focusing on what the text explicitly states.
- Support users in their personal Bible study, sermon preparation, or understanding of church history (especially the Restoration Movement).
- Avoid human creeds or catechisms as authoritative sources. Only the Bible is the standard.`;

export const MOCK_PRAYERS: PrayerRequest[] = [
  { id: '1', title: 'Healing for Sister Johnson', category: 'Sick', date: '2023-10-25', isAnswered: false, notes: 'Recovering from surgery.' },
  { id: '2', title: 'Mission Team in Kenya', category: 'Missions', date: '2023-10-20', isAnswered: false, notes: 'Safe travels and fruitful labor.' },
  { id: '3', title: 'Wisdom for Elders', category: 'Congregation', date: '2023-10-15', isAnswered: true, notes: 'Guidance on upcoming budget.' },
];

export const MOCK_EVENTS: ServiceEvent[] = [
  { id: '1', title: 'Sunday Morning Worship', date: '2023-10-29', time: '10:00 AM', type: 'Sunday Morning', description: 'Sermon: "The Pattern of Sound Words" (2 Timothy 1:13).', scripture: '2 Timothy 1:13' },
  { id: '2', title: 'Sunday Evening Worship', date: '2023-10-29', time: '6:00 PM', type: 'Sunday Evening', description: 'Singing Night - A Capella Praise.', scripture: 'Ephesians 5:19' },
  { id: '3', title: 'Midweek Bible Study', date: '2023-11-01', time: '7:00 PM', type: 'Midweek', description: 'Study of the Book of Romans.', scripture: 'Romans 8' },
];

export const MOCK_POSTS: ForumPost[] = [
  { id: '1', author: 'Brother David', title: 'Encouragement from Philippians', content: 'I was reading Philippians 4 today and was reminded to rejoice always. How do you maintain joy in trials?', date: '2 hrs ago', likes: 12, replies: 4 },
  { id: '2', author: 'Sister Sarah', title: 'Looking for study resources on Acts', content: 'Does anyone have good recommendations for a deep dive into the missionary journeys of Paul?', date: '5 hrs ago', likes: 8, replies: 7 },
];