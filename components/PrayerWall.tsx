import React, { useState } from 'react';
import { MOCK_PRAYERS } from '../constants';
import { PrayerRequest } from '../types';
import { Plus, CheckCircle2, Circle, Trash2, HeartHandshake } from 'lucide-react';

export const PrayerWall: React.FC = () => {
  const [prayers, setPrayers] = useState<PrayerRequest[]>(MOCK_PRAYERS);
  const [newPrayerTitle, setNewPrayerTitle] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [prayingFor, setPrayingFor] = useState<Set<string>>(new Set());

  const addPrayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrayerTitle.trim()) return;
    
    const newRequest: PrayerRequest = {
      id: Date.now().toString(),
      title: newPrayerTitle,
      category: 'Personal',
      date: new Date().toISOString().split('T')[0],
      isAnswered: false,
      prayingCount: 0,
    };
    
    setPrayers([newRequest, ...prayers]);
    setNewPrayerTitle('');
  };

  const toggleAnswered = (id: string) => {
    setPrayers(prayers.map(p => 
      p.id === id ? { ...p, isAnswered: !p.isAnswered } : p
    ));
  };

  const deletePrayer = (id: string) => {
    setPrayers(prayers.filter(p => p.id !== id));
  };

  const incrementPraying = (id: string) => {
    if (prayingFor.has(id)) return;
    
    setPrayers(prayers.map(p => 
      p.id === id ? { ...p, prayingCount: p.prayingCount + 1 } : p
    ));
    setPrayingFor(prev => new Set(prev).add(id));
  };

  const filteredPrayers = activeCategory === 'All' 
    ? prayers 
    : prayers.filter(p => p.category === activeCategory);

  const categories = ['All', 'Personal', 'Congregation', 'Sick', 'Missions'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-gray-900">Prayer Wall</h2>
          <p className="text-gray-500">"Pray without ceasing." (1 Thessalonians 5:17)</p>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat 
                  ? 'bg-brand-600 text-white' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={addPrayer} className="flex gap-2">
        <input
          type="text"
          value={newPrayerTitle}
          onChange={(e) => setNewPrayerTitle(e.target.value)}
          placeholder="Enter a new prayer request..."
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
        />
        <button 
          type="submit"
          className="bg-brand-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-700 transition-colors flex items-center gap-2"
        >
          <Plus size={20} /> <span className="hidden md:inline">Add Request</span>
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPrayers.map(prayer => (
          <div 
            key={prayer.id} 
            className={`p-5 rounded-xl border transition-all flex flex-col ${
              prayer.isAnswered 
                ? 'bg-green-50 border-green-200' 
                : 'bg-white border-gray-200 shadow-sm hover:shadow-md'
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                prayer.category === 'Sick' ? 'bg-red-100 text-red-700' :
                prayer.category === 'Missions' ? 'bg-orange-100 text-orange-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {prayer.category}
              </span>
              <button onClick={() => deletePrayer(prayer.id)} className="text-gray-400 hover:text-red-500">
                <Trash2 size={16} />
              </button>
            </div>
            
            <h3 className={`font-semibold text-lg mb-2 ${prayer.isAnswered ? 'text-green-800 line-through' : 'text-gray-800'}`}>
              {prayer.title}
            </h3>
            
            {prayer.notes && <p className="text-gray-600 text-sm mb-4">{prayer.notes}</p>}
            
            <div className="mt-auto pt-4 border-t border-gray-100/50 flex items-center justify-between">
              <button 
                onClick={() => incrementPraying(prayer.id)}
                disabled={prayingFor.has(prayer.id) || prayer.isAnswered}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  prayingFor.has(prayer.id) ? 'text-brand-600' : 'text-gray-500 hover:text-brand-600'
                }`}
              >
                <HeartHandshake size={18} />
                <span>{prayer.prayingCount} Praying</span>
              </button>

              <button 
                onClick={() => toggleAnswered(prayer.id)}
                className={`flex items-center gap-1.5 text-sm font-medium ${
                  prayer.isAnswered ? 'text-green-600' : 'text-gray-400 hover:text-brand-600'
                }`}
              >
                {prayer.isAnswered ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                {prayer.isAnswered ? 'Answered' : 'Mark Answered'}
              </button>
            </div>
            <div className="text-xs text-gray-400 mt-2 text-right">{prayer.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};