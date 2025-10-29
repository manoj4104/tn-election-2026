'use client';
/* eslint-disable react/no-inline-styles */
/* eslint-disable @stylistic/no-inline-styles */
/* eslint-disable react/forbid-dom-props */

import { useState, useEffect } from 'react';

interface PollOption {
  id: number;
  text: string;
  textTamil?: string;
  partyId?: number;
  voteCount: number;
  percentage: number;
  Party?: {
    name: string;
    color?: string;
  };
}

interface Poll {
  id: number;
  title: string;
  titleTamil?: string;
  question: string;
  questionTamil?: string;
  type: string;
  status: string;
  totalVotes: number;
  options: PollOption[];
  Constituency?: {
    name: string;
  };
}

interface PollCardProps {
  poll: Poll;
  onVote?: () => void;
}

export default function PollCard({ poll, onVote }: PollCardProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Generate or retrieve session ID
    let sid = localStorage.getItem(`poll_session_${poll.id}`);
    if (!sid) {
      sid = `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
      localStorage.setItem(`poll_session_${poll.id}`, sid);
    }
    setSessionId(sid);

    // Check if already voted
    const voted = localStorage.getItem(`poll_voted_${poll.id}`);
    setHasVoted(voted === 'true');
  }, [poll.id]);

  const handleVote = async () => {
    if (!selectedOption || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/polls/${poll.id}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          optionId: selectedOption,
          sessionId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem(`poll_voted_${poll.id}`, 'true');
        setHasVoted(true);
        if (onVote) onVote();
      } else {
        alert(data.error || 'Failed to submit vote');
      }
    } catch (error) {
      console.error('Error voting:', error);
      alert('Failed to submit vote');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-600">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-1">
          {poll.title}
        </h3>
        {poll.titleTamil && (
          <h3 className="text-lg text-gray-700 mb-2">
            {poll.titleTamil}
          </h3>
        )}
        <p className="text-gray-700">{poll.question}</p>
        {poll.questionTamil && (
          <p className="text-gray-600 text-sm mt-1">{poll.questionTamil}</p>
        )}
        {poll.Constituency && (
          <p className="text-sm text-gray-500 mt-2">
            Constituency: {poll.Constituency.name}
          </p>
        )}
      </div>

      <div className="space-y-3">
        {poll.options.map((option) => (
          <div key={option.id} className="border rounded-lg p-3">
            {!hasVoted && poll.status === 'active' ? (
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name={`poll-${poll.id}`}
                  value={option.id}
                  checked={selectedOption === option.id}
                  onChange={() => setSelectedOption(option.id)}
                  className="mr-3 w-4 h-4 text-red-600"
                />
                <span className="flex-1">
                  <span className="font-medium">{option.text}</span>
                  {option.textTamil && (
                    <span className="text-sm text-gray-600 ml-2">
                      ({option.textTamil})
                    </span>
                  )}
                  {option.Party && (
                    <span className="text-sm text-gray-500 ml-2">
                      - {option.Party.name}
                    </span>
                  )}
                </span>
              </label>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">
                    {option.text}
                    {option.textTamil && (
                      <span className="text-sm text-gray-600 ml-2">
                        ({option.textTamil})
                      </span>
                    )}
                    {option.Party && (
                      <span className="text-sm text-gray-500 ml-2">
                        - {option.Party.name}
                      </span>
                    )}
                  </span>
                  <span className="font-bold text-red-600">
                    {option.percentage.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  {/* eslint-disable-next-line react/forbid-dom-props */}
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${option.percentage}%`,
                      backgroundColor: option.Party?.color || '#dc2626',
                    }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {option.voteCount} votes
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {!hasVoted && poll.status === 'active' && (
        <button
          onClick={handleVote}
          disabled={!selectedOption || isSubmitting}
          className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Submitting...' : 'Vote'}
        </button>
      )}

      {hasVoted && (
        <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-green-800 text-sm font-medium">
            ✓ You have already voted in this poll
          </p>
        </div>
      )}

      {poll.status === 'closed' && (
        <div className="mt-4 bg-gray-100 border border-gray-300 rounded-lg p-3">
          <p className="text-gray-700 text-sm font-medium">
            This poll is closed
          </p>
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500">
        Total votes: {poll.totalVotes}
      </div>
    </div>
  );
}
