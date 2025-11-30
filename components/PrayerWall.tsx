import React, { useState } from 'react';
import { MOCK_PRAYERS } from '../constants';
import { PrayerRequest } from '../types';
import { Plus, Check, Bell, Filter, Search, X } from 'lucide-react';

export const PrayerWall: React.FC = () => {
  const [prayers, setPrayers] = useState<PrayerRequest[]>(MOCK_PRAYERS);
  const [activeTab, setActiveTab] = useState<"all" | "ongoing" | "answered">("all");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [showAddPrayer, setShowAddPrayer] = useState(false);
  
  const [newPrayer, setNewPrayer] = useState({
    name: "",
    request: "",
    category: "Personal"
  });

  const handleAddPrayer = () => {
    if (!newPrayer.name.trim() || !newPrayer.request.trim()) return;

    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
    
    const newRequest: PrayerRequest = {
      id: Date.now().toString(),
      name: newPrayer.name,
      request: newPrayer.request,
      category: newPrayer.category,
      date: formattedDate,
      status: "ongoing",
      reminderSet: false,
      prayingCount: 0
    };
    
    setPrayers([newRequest, ...prayers]);
    setNewPrayer({ name: "", request: "", category: "Personal" });
    setShowAddPrayer(false);
  };

  const markAsAnswered = (id: string) => {
    setPrayers(prayers.map(prayer => 
      prayer.id === id ? { ...prayer, status: "answered" } : prayer
    ));
  };
  
  const toggleReminder = (id: string) => {
    setPrayers(prayers.map(prayer => 
      prayer.id === id ? { ...prayer, reminderSet: !prayer.reminderSet } : prayer
    ));
  };

  const filteredPrayers = prayers.filter(prayer => {
    // Tab Filter
    if (activeTab === "ongoing" && prayer.status !== "ongoing") return false;
    if (activeTab === "answered" && prayer.status !== "answered") return false;
    
    // Category Filter
    if (activeCategory !== "All" && prayer.category !== activeCategory) return false;
    
    return true;
  });

  const categories = ["All", "Family", "Health", "Church", "Missions", "Personal"];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-gray-900">Prayer Tracker</h2>
          <p className="text-gray-500">"The effective, fervent prayer of a righteous man avails much." (James 5:16)</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white rounded-t-xl overflow-hidden">
        {["all", "ongoing", "answered"].map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-4 font-medium text-sm transition-colors ${
              activeTab === tab
                ? "text-blue-700 border-b-2 border-blue-700 bg-blue-50/50"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab(tab as any)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 border border-gray-200 rounded-b-xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center text-gray-600 gap-2 w-full md:w-auto">
          <Filter size={18} />
          <span className="text-sm font-medium whitespace-nowrap">Filter by Category:</span>
        </div>
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-hide">
          {categories.map(category => (
            <button 
              key={category} 
              onClick={() => setActiveCategory(category)}
              className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                activeCategory === category 
                  ? "bg-blue-100 text-blue-700 font-medium" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {showAddPrayer ? (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Add Prayer Request</h2>
            <button onClick={() => setShowAddPrayer(false)} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Person / Group</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Who needs prayer?"
                value={newPrayer.name}
                onChange={(e) => setNewPrayer({...newPrayer, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Request Details</label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="What is the specific need?"
                rows={3}
                value={newPrayer.request}
                onChange={(e) => setNewPrayer({...newPrayer, request: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                value={newPrayer.category}
                onChange={(e) => setNewPrayer({...newPrayer, category: e.target.value})}
              >
                {categories.filter(c => c !== "All").map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                onClick={() => setShowAddPrayer(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 bg-blue-700 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors shadow-sm"
                onClick={handleAddPrayer}
              >
                Save Request
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Add Button Card */}
          <button 
            onClick={() => setShowAddPrayer(true)}
            className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-xl text-gray-400 hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50 transition-all group min-h-[200px]"
          >
            <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center mb-3 transition-colors">
              <Plus size={24} />
            </div>
            <span className="font-medium">Add New Request</span>
          </button>

          {filteredPrayers.map(prayer => (
            <div key={prayer.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-800 line-clamp-1">{prayer.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  prayer.status === "answered" 
                    ? "bg-green-100 text-green-700" 
                    : "bg-blue-100 text-blue-700"
                }`}>
                  {prayer.status === "answered" ? "Answered" : prayer.category}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">{prayer.request}</p>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-auto">
                <span className="text-xs text-gray-400">{prayer.date}</span>
                <div className="flex gap-2">
                  <button 
                    className={`p-2 rounded-full transition-colors ${
                      prayer.reminderSet 
                        ? "bg-blue-50 text-blue-600" 
                        : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    }`}
                    onClick={() => toggleReminder(prayer.id)}
                    title="Toggle Reminder"
                  >
                    <Bell size={18} />
                  </button>
                  {prayer.status === "ongoing" && (
                    <button 
                      className="p-2 rounded-full text-green-600 hover:bg-green-50 transition-colors"
                      onClick={() => markAsAnswered(prayer.id)}
                      title="Mark Answered"
                    >
                      <Check size={18} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};