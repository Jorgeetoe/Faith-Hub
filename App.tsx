import React, { useState } from 'react';
import { HashRouter } from 'react-router-dom'; // Included for structure, though we use state nav here
import { AppView } from './types';
import { Dashboard } from './components/Dashboard';
import { BibleChat } from './components/BibleChat';
import { PrayerWall } from './components/PrayerWall';
import { WorshipSchedule } from './components/WorshipSchedule';
import { CommunityForum } from './components/CommunityForum';
import { 
  LayoutDashboard, 
  BookOpen, 
  Heart, 
  Calendar, 
  MessageCircle, 
  Menu,
  X,
  Church
} from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { view: AppView.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { view: AppView.BIBLE_STUDY_AI, label: 'Bible Study AI', icon: BookOpen },
    { view: AppView.PRAYER_TRACKER, label: 'Prayer Wall', icon: Heart },
    { view: AppView.WORSHIP_SCHEDULE, label: 'Worship Schedule', icon: Calendar },
    { view: AppView.COMMUNITY_FORUM, label: 'Fellowship', icon: MessageCircle },
  ];

  const handleNav = (view: AppView) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
  };

  const renderContent = () => {
    switch (currentView) {
      case AppView.DASHBOARD: return <Dashboard navigate={handleNav} />;
      case AppView.BIBLE_STUDY_AI: return <BibleChat />;
      case AppView.PRAYER_TRACKER: return <PrayerWall />;
      case AppView.WORSHIP_SCHEDULE: return <WorshipSchedule />;
      case AppView.COMMUNITY_FORUM: return <CommunityForum />;
      default: return <Dashboard navigate={handleNav} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 fixed h-full z-20">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center text-white">
            <Church size={24} />
          </div>
          <span className="font-serif font-bold text-gray-900 leading-tight">Restoration<br/>Faith Hub</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => handleNav(item.view)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                currentView === item.view
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon size={20} className={currentView === item.view ? 'text-brand-600' : 'text-gray-400'} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="bg-brand-50 p-4 rounded-xl">
            <h4 className="text-brand-800 font-semibold text-sm mb-1">Sunday Service</h4>
            <p className="text-brand-600 text-xs">10:00 AM • Auditorium</p>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 w-full bg-white border-b border-gray-200 z-30 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-brand-600 rounded-md flex items-center justify-center text-white">
            <Church size={18} />
          </div>
          <span className="font-serif font-bold text-gray-900">Faith Hub</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-gray-800 bg-opacity-50 z-20" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="bg-white w-3/4 h-full pt-16 px-4" onClick={e => e.stopPropagation()}>
            <nav className="space-y-2">
               {navItems.map((item) => (
                <button
                  key={item.view}
                  onClick={() => handleNav(item.view)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                    currentView === item.view
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon size={20} className={currentView === item.view ? 'text-brand-600' : 'text-gray-400'} />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-4 lg:p-8 pt-20 lg:pt-8 max-w-7xl mx-auto w-full">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;