
import React, { useState } from 'react';
import { generateBlogPost } from '../services/geminiService';
import { BlogPost } from '../types';
import { Sparkles, Loader2, PenTool, X } from 'lucide-react';
import { BUSINESS_NAME } from '../constants';

interface BlogGeneratorProps {
  onPostGenerated: (post: BlogPost) => void;
}

export const BlogGenerator: React.FC<BlogGeneratorProps> = ({ onPostGenerated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const result = await generateBlogPost(topic, BUSINESS_NAME);
      if (result && result.title) {
        const newPost: BlogPost = {
          id: Date.now().toString(),
          title: result.title || 'New Article',
          excerpt: result.excerpt || 'Check out our latest tips.',
          category: result.category || 'Updates',
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          imageUrl: `https://picsum.photos/800/600?random=${Date.now()}` // Random image
        };
        onPostGenerated(newPost);
        setTopic('');
        setIsOpen(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2.5 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all text-sm mb-8 mx-auto"
      >
        <Sparkles className="w-4 h-4" /> AI Blog Writer
      </button>
    );
  }

  return (
    <div className="mb-12 bg-white p-6 rounded-2xl shadow-xl border border-purple-100 max-w-2xl mx-auto animate-in fade-in slide-in-from-top-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center">
          <PenTool className="w-5 h-5 mr-2 text-purple-600" />
          Generate New Article
        </h3>
        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-3">
        <input 
          type="text" 
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic (e.g., 'Winterizing your pipes' or 'LED lighting benefits')"
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none text-gray-700"
          onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
        />
        <button 
          onClick={handleGenerate}
          disabled={loading || !topic.trim()}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center min-w-[140px]"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Write It'}
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-3 text-center">
        Uses Google Gemini to write SEO-optimized titles and excerpts instantly.
      </p>
    </div>
  );
};
