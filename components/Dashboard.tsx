import React, { useEffect, useState } from 'react';
import { AppView, ServiceEvent } from '../types';
import { MOCK_EVENTS, MOCK_PRAYERS } from '../constants';
import { generateDailyVerse } from '../services/geminiService';
import { Bell, Book, Calendar, MessageCircle, Heart, Clock, ChevronRight } from 'lucide-react';

interface DashboardProps {
  navigate: (view: AppView) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ navigate }) => {
  const [dailyVerse, setDailyVerse] = useState<{text: string, reference: string}>({
    text: "Loading daily scripture...",
    reference: ""
  });
  const [activeNotifications] = useState(3);

  useEffect(() => {
    generateDailyVerse().then(verse => {
      // Simple parse for the AI response to split reference if possible
      const parts = verse.split('-');
      if (parts.length > 1) {
        const reference = parts.pop()?.trim() || "";
        const text = parts.join('-').replace(/"/g, '').trim();
        setDailyVerse({ text, reference });
      } else {
        setDailyVerse({ text: verse.replace(/"/g, ''), reference: "Daily Verse" });
      }
    });
  }, []);

  const assistants = [
    { name: "Bible Study", color: "bg-blue-600", icon: <Book size={24} />, view: AppView.BIBLE_STUDY_AI },
    { name: "Prayer", color: "bg-green-600", icon: <Heart size={24} />, view: AppView.PRAYER_TRACKER },
    { name: "Worship", color: "bg-purple-600", icon: <MessageCircle size={24} />, view: AppView.HYMNAL },
    { name: "Christian Living", color: "bg-yellow-600", icon: <Clock size={24} />, view: AppView.BIBLE_STUDY_AI },
    { name: "Apologetics", color: "bg-red-600", icon: <Bell size={24} />, view: AppView.BIBLE_STUDY_AI },
    { name: "Church History", color: "bg-teal-600", icon: <Calendar size={24} />, view: AppView.BIBLE_STUDY_AI }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-blue-700 text-white p-4 rounded-xl shadow-md">
        <h1 className="text-xl font-bold">Church of Christ</h1>
        <div className="relative">
          <Bell size={24} />
          {activeNotifications > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {activeNotifications}
            </span>
          )}
        </div>
      </div>
      
      {/* Daily Verse Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-blue-700 mb-2">Daily Verse</h2>
        <p className="my-2 italic text-gray-700 text-lg">"{dailyVerse.text}"</p>
        <p className="text-right font-medium text-gray-500">{dailyVerse.reference}</p>
      </div>
      
      {/* AI Assistants Grid */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-3 px-1">Faith Assistants</h2>
        <div className="grid grid-cols-3 gap-3">
          {assistants.map((assistant, index) => (
            <button 
              key={index} 
              onClick={() => navigate(assistant.view)}
              className={`${assistant.color} rounded-xl p-4 flex flex-col items-center justify-center text-white shadow-sm hover:shadow-md transition-all hover:scale-105`}
            >
              {assistant.icon}
              <span className="mt-2 text-xs text-center font-medium leading-tight">{assistant.name}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800">Upcoming Events</h2>
            <button onClick={() => navigate(AppView.WORSHIP_SCHEDULE)} className="text-blue-700 text-sm font-medium hover:underline">View All</button>
          </div>
          <div className="divide-y divide-gray-100">
            {MOCK_EVENTS.slice(0, 3).map(event => (
              <div key={event.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-gray-900">{event.title}</span>
                  <span className="text-gray-500 text-sm bg-gray-100 px-2 py-0.5 rounded-full">{event.time}</span>
                </div>
                <span className="text-gray-500 text-sm flex items-center gap-1">
                  <Calendar size={14}/> {event.date}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Prayer Tracker Preview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800">Prayer Tracker</h2>
            <button onClick={() => navigate(AppView.PRAYER_TRACKER)} className="text-blue-700 text-sm font-medium hover:underline">View All</button>
          </div>
          <div className="divide-y divide-gray-100">
            {MOCK_PRAYERS.slice(0, 3).map(prayer => (
              <div key={prayer.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <span className="font-medium text-gray-900">{prayer.name}</span>
                  {prayer.status === "answered" ? (
                    <span className="text-green-600 text-xs px-2 py-1 bg-green-100 rounded-full font-medium">
                      Answered
                    </span>
                  ) : (
                    <span className="text-blue-600 text-xs px-2 py-1 bg-blue-100 rounded-full font-medium">
                      {prayer.category}
                    </span>
                  )}
                </div>
                <p className="text-gray-500 text-sm mt-1 truncate">{prayer.request}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};