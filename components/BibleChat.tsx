import React, { useState, useRef, useEffect } from 'react';
import { createBibleChat } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, ArrowLeft, Book, Bookmark, Share, History, Loader2 } from 'lucide-react';
import { Chat, GenerateContentResponse } from '@google/genai';

export const BibleChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Welcome to Bible Study AI. How can I assist you with your Bible study today? You can ask questions about scripture, request verses on specific topics, or get help understanding biblical concepts."
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<Chat | null>(null);

  const suggestionChips = [
    "What does the Bible teach about baptism?",
    "How can I be saved according to Scripture?",
    "What should worship include?",
    "What are the qualifications for elders and deacons?"
  ];

  useEffect(() => {
    // Initialize chat session once
    if (!chatSessionRef.current) {
      chatSessionRef.current = createBibleChat();
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim() || !chatSessionRef.current || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: text
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responseId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { id: responseId, role: 'model', text: '', isStreaming: true }]);

      const result = await chatSessionRef.current!.sendMessageStream({ message: userMessage.text });
      
      let fullText = '';
      
      for await (const chunk of result) {
        const c = chunk as GenerateContentResponse;
        const chunkText = c.text || '';
        fullText += chunkText;
        
        setMessages(prev => prev.map(msg => 
          msg.id === responseId 
            ? { ...msg, text: fullText } 
            : msg
        ));
      }

      setMessages(prev => prev.map(msg => 
        msg.id === responseId 
          ? { ...msg, isStreaming: false } 
          : msg
      ));

    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "I apologize, but I encountered an error connecting to the service. Please try again later."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  // Helper to format simplified timestamp for demo
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 -m-4 md:m-0 md:h-[calc(100vh-140px)] md:rounded-xl md:shadow-sm md:border md:border-gray-200 overflow-hidden relative z-0">
      {/* Header - Mobile Style (hidden on desktop generally, but kept for consistency with request) */}
      <div className="bg-blue-700 text-white p-4 md:hidden">
        <div className="flex items-center">
          <ArrowLeft size={24} className="mr-2 cursor-pointer" onClick={() => window.history.back()} />
          <h1 className="text-xl font-bold">Bible Study Assistant</h1>
        </div>
      </div>
      
      {/* Desktop Header equivalent */}
      <div className="hidden md:flex bg-gray-50 border-b border-gray-200 p-4">
        <h2 className="font-serif font-bold text-gray-800 flex items-center gap-2">
          <Book className="text-brand-600" /> 
          Biblical Study Assistant
        </h2>
        <p className="text-xs text-gray-500 ml-auto pt-1">Powered by Gemini 2.5 Flash</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-20 md:pb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-4 max-w-[85%] md:max-w-md ${
              msg.role === 'user' 
                ? 'ml-auto bg-blue-600 text-white rounded-l-lg rounded-tr-lg' 
                : 'mr-auto bg-white text-gray-800 rounded-r-lg rounded-tl-lg shadow border border-gray-100'
            } p-3`}
          >
            <div className="mb-1 leading-relaxed whitespace-pre-wrap">
              {msg.text}
              {msg.isStreaming && <span className="inline-block w-1.5 h-3 bg-current animate-pulse ml-1 align-middle"></span>}
            </div>
            <div 
              className={`text-xs ${
                msg.role === 'user' ? 'text-blue-100' : 'text-gray-400'
              } text-right mt-1`}
            >
              {getCurrentTime()}
            </div>
          </div>
        ))}
        {isLoading && messages[messages.length - 1].role === 'user' && (
           <div className="mr-auto bg-white text-gray-800 rounded-r-lg rounded-tl-lg shadow p-3 max-w-xs border border-gray-100">
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested questions (only show if few messages) */}
      {messages.length < 4 && !isLoading && (
        <div className="px-4 py-2 bg-gray-50/80 backdrop-blur-sm">
          <p className="text-xs text-gray-500 mb-2 font-medium">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestionChips.map((suggestion, index) => (
              <button
                key={index}
                className="bg-white border border-gray-200 text-gray-700 hover:text-blue-600 hover:border-blue-200 text-sm py-1.5 px-3 rounded-full shadow-sm transition-colors text-left"
                onClick={() => handleSend(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="border-t border-gray-200 p-3 bg-white">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            placeholder="Ask about Bible passages or topics..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            className={`rounded-full p-2.5 transition-colors ${
              input.trim() === '' || isLoading
                ? 'bg-gray-100 text-gray-400' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            disabled={input.trim() === '' || isLoading}
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </form>
        
        {/* Quick action buttons */}
        <div className="flex justify-around mt-3 pt-1">
          <button className="flex flex-col items-center text-gray-500 hover:text-blue-600 transition-colors gap-1">
            <Book size={20} />
            <span className="text-[10px]">Bible</span>
          </button>
          <button className="flex flex-col items-center text-gray-500 hover:text-blue-600 transition-colors gap-1">
            <Bookmark size={20} />
            <span className="text-[10px]">Save</span>
          </button>
          <button className="flex flex-col items-center text-gray-500 hover:text-blue-600 transition-colors gap-1">
            <Share size={20} />
            <span className="text-[10px]">Share</span>
          </button>
          <button className="flex flex-col items-center text-gray-500 hover:text-blue-600 transition-colors gap-1">
            <History size={20} />
            <span className="text-[10px]">History</span>
          </button>
        </div>
      </div>
    </div>
  );
};