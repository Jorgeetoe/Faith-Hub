import React, { useEffect, useState } from 'react';
import { AppView, ServiceEvent } from '../types';
import { MOCK_EVENTS } from '../constants';
import { generateDailyVerse } from '../services/geminiService';
import { Calendar, BookOpen, MessageCircle, Heart, Music } from 'lucide-react';

interface DashboardProps {
  navigate: (view: AppView) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ navigate }) => {
  const [dailyVerse, setDailyVerse] = useState<string>('Loading daily scripture...');
  const [nextEvent, setNextEvent] = useState<ServiceEvent | null>(null);

  useEffect(() => {
    generateDailyVerse().then(setDailyVerse);
    setNextEvent(MOCK_EVENTS[0]); // Simplified for demo
  }, []);

  return (
    <div className="space-y-6">
      {/* Hero / Daily Verse */}
      <div className="bg-brand-700 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-brand-200 uppercase tracking-widest text-sm font-semibold mb-3">Daily Bread</h2>
          <blockquote className="font-serif text-2xl md:text-3xl italic leading-relaxed mb-4">
            {dailyVerse}
          </blockquote>
          <p className="text-brand-100 text-sm">Empowered by Gemini AI</p>
        </div>
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-brand-600 rounded-full opacity-30 blur-3xl"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button 
          onClick={() => navigate(AppView.BIBLE_STUDY_AI)}
          className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all group text-left"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
            <BookOpen size={24} />
          </div>
          <h3 className="font-semibold text-gray-900">Bible AI Assistant</h3>
          <p className="text-sm text-gray-500 mt-1">Ask questions about scripture, doctrine, and history.</p>
        </button>

        <button 
          onClick={() => navigate(AppView.PRAYER_TRACKER)}
          className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all group text-left"
        >
          <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 mb-4 group-hover:scale-110 transition-transform">
            <Heart size={24} />
          </div>
          <h3 className="font-semibold text-gray-900">Prayer Tracker</h3>
          <p className="text-sm text-gray-500 mt-1">Log prayers, requests, and thanksgiving.</p>
        </button>

         <button 
          onClick={() => navigate(AppView.HYMNAL)}
          className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all group text-left"
        >
          <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center text-rose-600 mb-4 group-hover:scale-110 transition-transform">
            <Music size={24} />
          </div>
          <h3 className="font-semibold text-gray-900">Digital Hymnal</h3>
          <p className="text-sm text-gray-500 mt-1">Classic hymns for worship and praise.</p>
        </button>

        <button 
          onClick={() => navigate(AppView.COMMUNITY_FORUM)}
          className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all group text-left"
        >
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform">
            <MessageCircle size={24} />
          </div>
          <h3 className="font-semibold text-gray-900">Fellowship Forum</h3>
          <p className="text-sm text-gray-500 mt-1">Connect and encourage the brotherhood.</p>
        </button>
      </div>

      {/* Quick Look: Next Event */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-serif font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar size={20} className="text-brand-600"/> Upcoming Service
        </h3>
        {nextEvent ? (
          <div className="flex flex-col md:flex-row md:items-center justify-between bg-gray-50 p-4 rounded-lg">
            <div>
              <h4 className="font-semibold text-gray-900">{nextEvent.title}</h4>
              <p className="text-gray-600 text-sm">{nextEvent.date} @ {nextEvent.time}</p>
            </div>
            <div className="mt-3 md:mt-0 text-sm text-gray-500 italic max-w-md text-right">
              "{nextEvent.description}"
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No upcoming events scheduled.</p>
        )}
      </div>
    </div>
  );
};