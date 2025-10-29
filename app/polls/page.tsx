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
          <div className="max-w-3xl mx-auto">
            <div className="text-center py-8 mb-6 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800">No polls available yet. Here’s a preview of how polls will look:</p>
              <p className="text-yellow-700 text-sm mt-2">You can create sample polls by calling the endpoint /api/polls/seed (secured in production).</p>
            </div>
            <div className="grid gap-6">
              {/* Demo preview cards */}
              <PollCard 
                poll={{
                  id: 0,
                  title: 'Who will win Tamil Nadu 2026?',
                  titleTamil: '2026 தமிழ்நாடு தேர்தலில் யார் வெல்வார்கள்?',
                  question: 'Which alliance will form the government?',
                  questionTamil: 'எந்த கூட்டணி அரசு அமைக்கும்?',
                  type: 'prediction',
                  status: 'closed',
                  totalVotes: 100,
                  options: [
                    { id: 1, text: 'DMK Alliance', textTamil: 'திமுக கூட்டணி', voteCount: 45, percentage: 45, Party: { name: 'DMK', color: '#dc2626' } },
                    { id: 2, text: 'AIADMK Alliance', textTamil: 'அதிமுக கூட்டணி', voteCount: 35, percentage: 35, Party: { name: 'AIADMK', color: '#16a34a' } },
                    { id: 3, text: 'BJP Alliance', textTamil: 'பாஜக கூட்டணி', voteCount: 15, percentage: 15, Party: { name: 'BJP', color: '#f97316' } },
                    { id: 4, text: 'Third Front', textTamil: 'மூன்றாவது முன்னணி', voteCount: 5, percentage: 5 },
                  ],
                  Constituency: undefined,
                }}
              />
              <PollCard 
                poll={{
                  id: 0,
                  title: 'Who will win Chennai Central?',
                  titleTamil: 'சென்னை மத்தியத்தில் யார் வெல்வார்கள்?',
                  question: 'Which party will win this constituency?',
                  questionTamil: 'இந்த தொகுதியில் எந்தக் கட்சி வெல்லும்?',
                  type: 'prediction',
                  status: 'closed',
                  totalVotes: 100,
                  options: [
                    { id: 1, text: 'DMK Candidate', textTamil: 'திமுக வேட்பாளர்', voteCount: 40, percentage: 40, Party: { name: 'DMK', color: '#dc2626' } },
                    { id: 2, text: 'AIADMK Candidate', textTamil: 'அதிமுக வேட்பாளர்', voteCount: 38, percentage: 38, Party: { name: 'AIADMK', color: '#16a34a' } },
                    { id: 3, text: 'BJP Candidate', textTamil: 'பாஜக வேட்பாளர்', voteCount: 12, percentage: 12, Party: { name: 'BJP', color: '#f97316' } },
                    { id: 4, text: 'Independent/Other', textTamil: 'சுயேச்சை/பிற', voteCount: 10, percentage: 10 },
                  ],
                  Constituency: { name: 'Chennai Central' },
                }}
              />
            </div>
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
