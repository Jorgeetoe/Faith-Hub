import React, { useState } from 'react';
import { MOCK_HYMNS } from '../constants';
import { Hymn } from '../types';
import { Music, ArrowLeft, Search } from 'lucide-react';

export const Hymnal: React.FC = () => {
  const [selectedHymn, setSelectedHymn] = useState<Hymn | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHymns = MOCK_HYMNS.filter(h => 
    h.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    h.number.toString().includes(searchTerm)
  );

  if (selectedHymn) {
    return (
      <div className="space-y-6">
        <button 
          onClick={() => setSelectedHymn(null)}
          className="flex items-center gap-2 text-gray-600 hover:text-brand-600 transition-colors font-medium"
        >
          <ArrowLeft size={20} /> Back to Hymnal
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-brand-50 p-6 border-b border-gray-100 flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-serif font-bold text-gray-900">{selectedHymn.title}</h2>
              <p className="text-gray-500 mt-1">Key of {selectedHymn.key}</p>
            </div>
            <span className="text-3xl font-bold text-brand-200">#{selectedHymn.number}</span>
          </div>
          
          <div className="p-8 text-center bg-white">
            <div className="max-w-md mx-auto space-y-6">
              {selectedHymn.lyrics.map((line, idx) => (
                <p key={idx} className={`text-lg leading-relaxed ${line === "" ? "h-4" : "text-gray-800"}`}>
                  {line === "" ? "" : line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-serif font-bold text-gray-900 flex items-center gap-2">
          <Music className="text-brand-600" /> Digital Hymnal
        </h2>
        <p className="text-gray-500">"Speaking to one another in psalms and hymns and spiritual songs." (Eph 5:19)</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title or number..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredHymns.map(hymn => (
          <button
            key={hymn.id}
            onClick={() => setSelectedHymn(hymn)}
            className="group flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-brand-300 hover:shadow-md transition-all text-left"
          >
            <div>
              <span className="text-xs font-bold text-brand-500 uppercase tracking-wider">Hymn</span>
              <h3 className="font-semibold text-gray-900 text-lg group-hover:text-brand-700 transition-colors">{hymn.title}</h3>
            </div>
            <span className="text-2xl font-bold text-gray-100 group-hover:text-brand-50 transition-colors">
              {hymn.number}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};