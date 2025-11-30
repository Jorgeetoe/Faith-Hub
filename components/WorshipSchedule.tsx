import React from 'react';
import { MOCK_EVENTS } from '../constants';
import { Calendar, Clock, MapPin } from 'lucide-react';

export const WorshipSchedule: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-serif font-bold text-gray-900">Worship Schedule</h2>
        <p className="text-gray-500">"Not forsaking the assembling of ourselves together." (Hebrews 10:25)</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {MOCK_EVENTS.map((event, index) => (
          <div 
            key={event.id} 
            className={`p-6 flex flex-col md:flex-row gap-6 hover:bg-gray-50 transition-colors ${
              index !== MOCK_EVENTS.length - 1 ? 'border-b border-gray-100' : ''
            }`}
          >
            {/* Date Block */}
            <div className="flex md:flex-col items-center justify-center md:w-24 bg-brand-50 text-brand-700 rounded-lg p-3 shrink-0">
              <span className="text-xs uppercase font-bold tracking-wider">{event.date.split('-')[1]}/23</span>
              <span className="text-2xl font-bold">{event.date.split('-')[2]}</span>
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold w-fit ${
                  event.type === 'Sunday Morning' ? 'bg-amber-100 text-amber-800' :
                  event.type === 'Midweek' ? 'bg-purple-100 text-purple-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {event.type}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1.5"><Clock size={16} /> {event.time}</span>
                <span className="flex items-center gap-1.5"><MapPin size={16} /> Main Auditorium</span>
              </div>
              
              <p className="text-gray-700">{event.description}</p>
              
              {event.scripture && (
                 <div className="mt-3 inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-md border border-gray-200">
                   📖 Reading: {event.scripture}
                 </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-brand-700 text-white rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold">Upcoming Gospel Meeting</h3>
          <p className="text-brand-100">Join us Nov 12-15 for our Fall Revival series with Bro. Anderson.</p>
        </div>
        <button className="bg-white text-brand-700 px-6 py-2 rounded-lg font-semibold hover:bg-brand-50 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};