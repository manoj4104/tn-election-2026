'use client';

import { useState, useEffect } from 'react';
import PollCard from '@/components/PollCard';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface Poll {
  id: number;
  title: string;
  titleTamil?: string;
  question: string;
  questionTamil?: string;
  type: string;
  status: string;
  totalVotes: number;
  options: any[];
  Constituency?: {
    name: string;
  };
}

export default function PollsPage() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'prediction' | 'opinion' | 'satisfaction'>('all');

  const fetchPolls = async () => {
    try {
      const response = await fetch('/api/polls');
      const data = await response.json();
      // Ensure data is always an array
      setPolls(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching polls:', error);
      setPolls([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  const filteredPolls = filter === 'all' 
    ? polls 
    : polls.filter(poll => poll.type === filter);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Election Polls & Surveys
          </h1>
          <h2 className="text-2xl text-gray-700 mb-4">
            தேர்தல் கருத்துக் கணிப்புகள்
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Participate in our polls to share your predictions and opinions about the 
            Tamil Nadu Assembly Elections 2026. Your voice matters!
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              filter === 'all'
                ? 'bg-red-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-red-600'
            }`}
          >
            All Polls
          </button>
          <button
            onClick={() => setFilter('prediction')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              filter === 'prediction'
                ? 'bg-red-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-red-600'
            }`}
          >
            Predictions
          </button>
          <button
            onClick={() => setFilter('opinion')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              filter === 'opinion'
                ? 'bg-red-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-red-600'
            }`}
          >
            Opinions
          </button>
          <button
            onClick={() => setFilter('satisfaction')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              filter === 'satisfaction'
                ? 'bg-red-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-red-600'
            }`}
          >
            Satisfaction
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading polls...</p>
          </div>
        ) : filteredPolls.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No polls available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {filteredPolls.map((poll) => (
              <PollCard 
                key={poll.id} 
                poll={poll} 
                onVote={fetchPolls}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
