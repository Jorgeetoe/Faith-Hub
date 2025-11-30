import React from 'react';
import { MOCK_POSTS } from '../constants';
import { MessageSquare, ThumbsUp, Share2 } from 'lucide-react';

export const CommunityForum: React.FC = () => {
  return (
    <div className="space-y-6">
       <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-serif font-bold text-gray-900">Fellowship Forum</h2>
        <p className="text-gray-500">"Encourage one another and build each other up." (1 Thessalonians 5:11)</p>
      </div>

      <div className="space-y-4">
        {MOCK_POSTS.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold">
                {post.author[0]}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{post.author}</h4>
                <span className="text-xs text-gray-500">{post.date}</span>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{post.title}</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              {post.content}
            </p>
            
            <div className="flex items-center gap-6 border-t border-gray-100 pt-4">
              <button className="flex items-center gap-2 text-gray-500 hover:text-brand-600 transition-colors">
                <ThumbsUp size={18} /> <span className="text-sm font-medium">{post.likes} Amen</span>
              </button>
              <button className="flex items-center gap-2 text-gray-500 hover:text-brand-600 transition-colors">
                <MessageSquare size={18} /> <span className="text-sm font-medium">{post.replies} Replies</span>
              </button>
              <button className="flex items-center gap-2 text-gray-500 hover:text-brand-600 transition-colors ml-auto">
                <Share2 size={18} /> <span className="text-sm font-medium">Share</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
        <p className="text-gray-600 mb-4">Start a new discussion or share a testimony.</p>
        <button className="bg-brand-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-brand-700 transition-colors">
          Create New Post
        </button>
      </div>
    </div>
  );
};