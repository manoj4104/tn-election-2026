'use client'
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-inline-styles */

import React, { useState, useEffect } from "react";
import Image from 'next/image'
import ProgressBar from '@/components/ProgressBar';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

// TN Election 2026 - Live Dashboard
// Connected to Prisma database via /api/dashboard

// ------------------------- Types -------------------------
interface Alliance {
  id: string;
  name: string;
  seats: number;
  won?: number;
  leading?: number;
  color: string;
  votesPct: number;
}

interface Constituency {
  id: string;
  code: string;
  name: string;
  state: string;
  leading: string;
  leadingPartyId: number | null;
  leadingCandidate: {
    name: string;
    party: string;
    votes: number;
  } | null;
  leadPct: number;
  totalVotes: number;
  results: Array<{
    candidate: string;
    party: string;
    votes: number;
    won: boolean;
    leading: boolean;
  }>;
}

interface DashboardData {
  summary: {
    totalSeats: number;
    alliances: Alliance[];
    highlights: string[];
    lastUpdated: string;
  };
  constituencies: Constituency[];
  parties: Array<{
    id: number;
    name: string;
    abbreviation: string | null;
    color: string | null;
    logoUrl: string | null;
  }>;
}

// ------------------------- Utility Components -------------------------
function IconParty({ id }: { id: string }) {
  // Simple symbol avatar for party
  const map: { [key: string]: string } = {
    DMK: "🟢",
    AIADMK: "🔵",
    BJP: "🟡",
  };
  return <span className="text-xl mr-2">{map[id] ?? "⚪"}</span>;
}

function SubNavigation({ onNavigate, currentRoute }: { onNavigate: (route: string) => void; currentRoute: string }) {
  return (
    <div className="bg-white shadow-sm border-b sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <div>
            <h1 className="text-xl font-bold text-gray-800">TN Election 2026</h1>
            <p className="text-sm text-gray-600">Live Results Dashboard</p>
          </div>
          <div className="text-sm text-gray-600">
            <div className="text-red-600 font-semibold">Live Updates</div>
            <div>October 15, 2025</div>
          </div>
        </div>
        <nav className="flex flex-wrap gap-2 pb-3">
          <button 
            className={`px-4 py-2 rounded transition-colors text-sm ${currentRoute === 'home' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} 
            onClick={() => onNavigate('home')}
          >
            முகப்பு | Home
          </button>
          <button 
            className={`px-4 py-2 rounded transition-colors text-sm ${currentRoute === 'results' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} 
            onClick={() => onNavigate('results')}
          >
            முடிவுகள் | Results
          </button>
          <button 
            className={`px-4 py-2 rounded transition-colors text-sm ${currentRoute === 'constituency' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} 
            onClick={() => onNavigate('constituency')}
          >
            தொகுதிகள் | Constituency
          </button>
          <button 
            className={`px-4 py-2 rounded transition-colors text-sm ${currentRoute === 'insights' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} 
            onClick={() => onNavigate('insights')}
          >
            AI பகுப்பாய்வு | Insights
          </button>
        </nav>
      </div>
    </div>
  );
}

// ------------------------- Home -------------------------
function Home({ summary, constituencies, onOpenConstituency }: { 
  summary: DashboardData['summary'];
  constituencies: Constituency[];
  onOpenConstituency: (id: string) => void;
}) {
  const resultsCount = constituencies.filter(c => c.leading !== 'TBD').length;
  const pendingCount = summary.totalSeats - resultsCount;
  const totalCandidates = constituencies.reduce((sum, c) => sum + (c.results?.length || 0), 0);

  return (
    <div className="space-y-6">
      {/* Hero Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="thanthi-card p-6 text-center">
          <div className="text-3xl font-bold text-red-600">{summary.totalSeats}</div>
          <div className="text-gray-600">மொத்த தொகுதிகள் | Total Seats</div>
        </div>
        <div className="thanthi-card p-6 text-center">
          <div className="text-3xl font-bold text-green-600">{resultsCount}</div>
          <div className="text-gray-600">முடிவுகள் | Results</div>
        </div>
        <div className="thanthi-card p-6 text-center">
          <div className="text-3xl font-bold text-blue-600">{pendingCount}</div>
          <div className="text-gray-600">எஞ்சியவை | Pending</div>
        </div>
        <div className="thanthi-card p-6 text-center">
          <div className="text-3xl font-bold text-purple-600">{totalCandidates.toLocaleString()}</div>
          <div className="text-gray-600">விண்ணப்பதாரர்கள் | Candidates</div>
        </div>
      </div>

      {/* Leading Alliance */}
      <div className="thanthi-card p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">முன்னணி கூட்டணி | Leading Alliance</h2>
        <div className="space-y-4">
          {/* eslint-disable-next-line */}
          {summary.alliances.slice(0, 2).map((alliance) => (
            <div key={alliance.id} 
                 className="flex items-center justify-between p-4 rounded-lg border-l-4"
                 style={{ 
                   backgroundColor: `${alliance.color}10`,
                   borderColor: alliance.color 
                 }}>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full flex items-center justify-center text-white font-bold"
                     style={{ backgroundColor: alliance.color }}>
                  {alliance.name.substring(0, 2)}
                </div>
                <div>
                  <div className="font-bold" style={{ color: alliance.color }}>{alliance.name}</div>
                  <div className="text-sm text-gray-600">Won: {alliance.won} | Leading: {alliance.leading}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold" style={{ color: alliance.color }}>{alliance.seats}</div>
                <div className="text-sm text-gray-600">{alliance.votesPct}% votes</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Constituencies */}
      <div className="thanthi-card p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">முக்கிய தொகுதிகள் | Key Constituencies</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {constituencies.slice(0, 6).map((constituency) => (
            <div key={constituency.id} 
                 className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                 onClick={() => onOpenConstituency(constituency.id)}>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">{constituency.name}</div>
                  <div className="text-sm text-gray-600">{constituency.code}</div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-semibold ${constituency.leading === 'DMK' ? 'text-red-600' : 
                    constituency.leading === 'AIADMK' ? 'text-green-600' : 
                    constituency.leading === 'BJP' ? 'text-orange-600' : 'text-blue-600'}`}>
                    {constituency.leading}
                  </div>
                  <div className="text-xs text-gray-500">{constituency.leadPct}% ahead</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Updates */}
      <div className="thanthi-card p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">சமீபத்திய செய்திகள் | Latest Updates</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded">
            <div className="news-badge">LIVE</div>
            <div>
              <div className="text-sm text-gray-600">2 minutes ago</div>
              <div className="font-medium">Counting continues in Chennai Central constituency</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-green-50 rounded">
            <div className="news-badge bg-green-600">UPDATE</div>
            <div>
              <div className="text-sm text-gray-600">5 minutes ago</div>
              <div className="font-medium">BJP candidate takes lead in Coimbatore South</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded">
            <div className="news-badge bg-yellow-600">ALERT</div>
            <div>
              <div className="text-sm text-gray-600">8 minutes ago</div>
              <div className="font-medium">Very close contest reported in Madurai East</div>
            </div>
          </div>
        </div>
      </div>

      {/* Party Performance Analysis */}
      <div className="thanthi-card p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">கட்சி செயல்திறன் | Party Performance</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
            <div className="flex items-center gap-3 mb-3">
              <Image 
                src="/images/dmk.webp" 
                alt="DMK Logo" 
                width={40} 
                height={40} 
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-bold text-red-600">DMK</h3>
                <p className="text-xs text-gray-600">திராவிட முன்னேற்றக் கழகம்</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Seats Won:</span>
                <span className="font-bold">68</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Vote Share:</span>
                <span className="font-bold">35.2%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Strike Rate:</span>
                <span className="font-bold">85%</span>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
            <div className="flex items-center gap-3 mb-3">
              <Image 
                src="/images/aiadmk.webp" 
                alt="AIADMK Logo" 
                width={40} 
                height={40} 
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-bold text-green-600">AIADMK</h3>
                <p className="text-xs text-gray-600">அண்ணா திராவிட முன்னேற்றக் கழகம்</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Seats Won:</span>
                <span className="font-bold">52</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Vote Share:</span>
                <span className="font-bold">28.5%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Strike Rate:</span>
                <span className="font-bold">68%</span>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
            <div className="flex items-center gap-3 mb-3">
              <Image 
                src="/images/bjp.webp" 
                alt="BJP Logo" 
                width={40} 
                height={40} 
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-bold text-orange-600">BJP</h3>
                <p className="text-xs text-gray-600">பாரதிய ஜனதா கட்சி</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Seats Won:</span>
                <span className="font-bold">28</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Vote Share:</span>
                <span className="font-bold">18.2%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Strike Rate:</span>
                <span className="font-bold">45%</span>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
            <div className="flex items-center gap-3 mb-3">
              <Image 
                src="/images/ntk.webp" 
                alt="NTK Logo" 
                width={40} 
                height={40} 
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-bold text-yellow-600">NTK</h3>
                <p className="text-xs text-gray-600">நாம் தமிழர் கட்சி</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Seats Won:</span>
                <span className="font-bold">8</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Vote Share:</span>
                <span className="font-bold">12.1%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Strike Rate:</span>
                <span className="font-bold">35%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Alliance Comparison */}
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-red-50 to-blue-50 p-4 rounded-lg">
            <h4 className="font-bold text-gray-800 mb-3">INDIA Alliance Performance</h4>
            <div className="flex items-center gap-3 mb-2">
              <Image src="/images/dmk.webp" alt="DMK" width={24} height={24} className="h-6 w-6 rounded-full" />
              <span className="text-sm">DMK: 68 seats</span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">C</div>
              <span className="text-sm">Congress: 15 seats</span>
            </div>
            <div className="text-sm text-gray-600 mt-3">Total: 95 seats (40.6%)</div>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-green-50 p-4 rounded-lg">
            <h4 className="font-bold text-gray-800 mb-3">NDA Alliance Performance</h4>
            <div className="flex items-center gap-3 mb-2">
              <Image src="/images/bjp.webp" alt="BJP" width={24} height={24} className="h-6 w-6 rounded-full" />
              <span className="text-sm">BJP: 28 seats</span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <Image src="/images/aiadmk.webp" alt="AIADMK" width={24} height={24} className="h-6 w-6 rounded-full" />
              <span className="text-sm">AIADMK: 52 seats</span>
            </div>
            <div className="text-sm text-gray-600 mt-3">Total: 82 seats (35.0%)</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ------------------------- Results Page -------------------------
function Results({ constituencies, onOpenConstituency }: { 
  constituencies: Constituency[];
  onOpenConstituency: (id: string) => void;
}) {
  const [results, setResults] = useState(constituencies);

  useEffect(() => {
    setResults(constituencies);
  }, [constituencies]);

  const totals = results.reduce((acc: { [key: string]: number }, cur: Constituency) => {
    acc[cur.leading] = (acc[cur.leading] || 0) + 1;
    return acc;
  }, {});

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-xl font-semibold mb-4">Live Results Dashboard (Demo)</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="col-span-2 bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Seat Tally (sample)</h3>
          <div className="flex gap-3">
            <div className="p-3 rounded border flex-1">
              <div className="text-sm text-gray-500">DMK (est.)</div>
              <div className="text-2xl font-bold">{totals['DMK'] || 0}</div>
            </div>
            <div className="p-3 rounded border flex-1">
              <div className="text-sm text-gray-500">AIADMK (est.)</div>
              <div className="text-2xl font-bold">{totals['AIADMK'] || 0}</div>
            </div>
            <div className="p-3 rounded border flex-1">
              <div className="text-sm text-gray-500">BJP (est.)</div>
              <div className="text-2xl font-bold">{totals['BJP'] || 0}</div>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold mb-2">Map (placeholder)</h4>
            <div className="w-full h-56 bg-gray-100 rounded flex items-center justify-center">[Map]</div>
          </div>
        </div>

        <aside className="bg-white p-4 rounded shadow">
          <h4 className="font-semibold mb-2">Quick Filters</h4>
          <div className="flex flex-col gap-2">
            <select className="p-2 border rounded" title="Select district filter">
              <option>All districts</option>
              <option>Chennai</option>
              <option>Coimbatore</option>
              <option>Madurai</option>
            </select>
            <button className="p-2 rounded bg-green-600 text-white">Refresh</button>
          </div>
        </aside>
      </div>

      <section className="bg-white rounded shadow p-4">
        <h3 className="font-semibold mb-3">Constituency Snapshot</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {results.map((c: Constituency) => (
            <div key={c.id} className="p-3 border rounded flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium">{c.name}</div>
                <div className="text-sm text-gray-500">{c.code}</div>
              </div>
              <div className="text-sm text-gray-600 mb-2">Leading: <strong>{c.leading}</strong></div>
              <div className="mb-3">
                <ProgressBar percentage={c.leadPct} color="indigo" height="sm" />
                <div className="text-xs text-gray-500 mt-1">Lead: {c.leadPct}%</div>
              </div>
              <div className="mt-auto flex gap-2">
                <button className="flex-1 p-2 rounded border" onClick={() => onOpenConstituency(c.id)}>View</button>
                <button className="flex-1 p-2 rounded border">Share</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

// ------------------------- Constituency Page -------------------------
function Constituency({ id, constituencies }: { 
  id: string;
  constituencies: Constituency[];
}) {
  const data = constituencies.find((c: Constituency) => c.id === id);
  
  if (!data) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <p className="text-yellow-700">Constituency not found. Please select a valid constituency.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white p-5 rounded shadow">
        <div className="flex items-start gap-4">
          <div>
            <h2 className="text-2xl font-semibold">{data.name}</h2>
            <div className="text-sm text-gray-500">Code: {data.code}</div>
          </div>
          <div className="ml-auto text-right">
            <div className="text-xs text-gray-500">Leading</div>
            <div className="text-lg font-bold">{data.leading}</div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2">
            <h4 className="font-semibold">Vote Breakdown</h4>
            <div className="mt-2">
              <ProgressBar percentage={data.leadPct} color="green" height="md" />
              <div className="text-xs text-gray-500 mt-1">
                Leading candidate: {data.leadingCandidate?.name || 'N/A'} ({data.leadingCandidate?.party || 'N/A'}) - {data.leadPct}%
              </div>
            </div>

            <div className="mt-4">
              <h5 className="font-medium">Results</h5>
              {data.results && data.results.length > 0 ? (
                <div className="space-y-2 mt-2">
                  {data.results.slice(0, 5).map((result, idx) => {
                    const pct = data.totalVotes > 0 ? ((result.votes / data.totalVotes) * 100).toFixed(2) : '0.00';
                    return (
                      <div key={idx} className="flex justify-between text-sm p-2 bg-gray-50 rounded">
                        <span>{result.candidate} ({result.party})</span>
                        <span className="font-semibold">{result.votes.toLocaleString()} votes ({pct}%)</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-600 mt-1">No detailed results available yet.</p>
              )}
            </div>
          </div>

          <aside className="bg-gray-50 p-3 rounded">
            <h5 className="font-semibold">Constituency Info</h5>
            <ul className="text-sm text-gray-600 mt-2 space-y-1">
              <li>Total Votes: {data.totalVotes.toLocaleString()}</li>
              <li>Leading: {data.leading}</li>
              <li>Lead Margin: {data.leadPct}%</li>
            </ul>
          </aside>
        </div>
      </div>
    </main>
  );
}

// ------------------------- AI Insights Page -------------------------
function Insights() {
  // Simple mocked AI insights
  const insights = [
    { id: 1, title: 'Swing analysis: Kongu region', text: 'AI indicates a +4% swing toward AIADMK in Kongu belt based on pre-poll surveys.' },
    { id: 2, title: 'Urban turnout influence', text: 'Higher urban turnout favors DMK in Chennai and suburbs.' }
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-xl font-semibold mb-4">AI Insights & Sentiment</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map(i => (
          <div key={i.id} className="bg-white p-4 rounded shadow">
            <h4 className="font-semibold">{i.title}</h4>
            <p className="text-sm text-gray-600 mt-2">{i.text}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

// ------------------------- Main App -------------------------
export default function TNElection2026() {
  const [route, setRoute] = useState('home');
  const [activeConstituency, setActiveConstituency] = useState('1');
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch dashboard data from API
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch('/api/dashboard');
        const data = await response.json();
        
        if (data.success) {
          setDashboardData(data);
          if (data.constituencies.length > 0) {
            setActiveConstituency(data.constituencies[0].id);
          }
        } else {
          setError(data.error || 'Failed to load data');
        }
      } catch (err) {
        setError('Failed to connect to server');
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // simple routing by hash (optional). Not required in integrated app.
    const onHash = () => {
      const h = window.location.hash.replace('#', '') || 'home';
      setRoute(h.startsWith('const-') ? 'constituency' : h);
    };
    window.addEventListener('hashchange', onHash);
    onHash();
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  function navigate(to: string) {
    setRoute(to);
    window.location.hash = to === 'constituency' ? `const-${activeConstituency}` : to;
  }

  function openConstituency(id: string) {
    setActiveConstituency(id);
    setRoute('constituency');
    window.location.hash = `const-${id}`;
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="animate-pulse">
            <div className="text-xl font-semibold text-gray-700">Loading election data...</div>
            <div className="text-gray-500 mt-2">தரவுகள் ஏற்றப்படுகிறது...</div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">No data available</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>{error || 'No election data in database yet.'}</p>
                  <p className="mt-2">Please add data through the <a href="/admin/dashboard" className="underline font-semibold">Admin Dashboard</a>.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const summary = dashboardData.summary;
  const constituencies = dashboardData.constituencies;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <SubNavigation onNavigate={navigate} currentRoute={route} />

      <div className="container mx-auto px-4 py-8">
        {route === 'home' && <Home onOpenConstituency={openConstituency} summary={summary} constituencies={constituencies} />}
        {route === 'results' && <Results onOpenConstituency={openConstituency} constituencies={constituencies} />}
        {route === 'insights' && <Insights />}
        {route === 'constituency' && <Constituency id={activeConstituency} constituencies={constituencies} />}
      </div>

      <Footer />
    </div>
  );
}