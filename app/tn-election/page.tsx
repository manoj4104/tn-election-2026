'use client'

import React, { useState, useEffect } from "react";
import Image from 'next/image'
import ProgressBar from '@/components/ProgressBar';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

// TN Election 2026 - Single-file React App (Starter)
// - Tailwind CSS utility classes used (install Tailwind in your project)
// - This is a single-file demo you can drop into a React app (e.g., create-react-app / Vite / Next.js page)
// - Replace mock data with real API endpoints when ready

// ------------------------- Mock Data -------------------------
const MOCK_SUMMARY = {
  totalSeats: 234,
  alliances: [
    { id: "dmk", name: "DMK Alliance", seats: 120, color: "bg-green-600", votesPct: 41 },
    { id: "aiadmk", name: "AIADMK Alliance", seats: 95, color: "bg-blue-600", votesPct: 38 },
    { id: "bjp", name: "BJP", seats: 10, color: "bg-yellow-500", votesPct: 9 },
    { id: "others", name: "Others", seats: 9, color: "bg-gray-500", votesPct: 12 },
  ],
  highlights: [
    "DMK leads in urban Chennai clusters",
    "AIADMK holding strong in Kongu region",
    "High turnout expected in rural belt"
  ]
};

const MOCK_CONSTITUENCIES = [
  { id: "coimbatore-central", name: "Coimbatore Central", district: "Coimbatore", leading: "DMK", leadPct: 62, lastYear: "AIADMK", leadingCandidate: { party: "DMK", name: "Candidate A" } },
  { id: "madurai-north", name: "Madurai North", district: "Madurai", leading: "AIADMK", leadPct: 51, lastYear: "DMK", leadingCandidate: { party: "AIADMK", name: "Candidate B" } },
  { id: "chennai-central", name: "Chennai Central", district: "Chennai", leading: "DMK", leadPct: 70, lastYear: "DMK", leadingCandidate: { party: "DMK", name: "Candidate C" } },
  // ... add more or load from API
];

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
function Home({ onOpenConstituency }: { onOpenConstituency: (id: string) => void }) {
  return (
    <div className="space-y-6">
      {/* Hero Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="thanthi-card p-6 text-center">
          <div className="text-3xl font-bold text-red-600">234</div>
          <div className="text-gray-600">மொத்த தொகுதிகள் | Total Seats</div>
        </div>
        <div className="thanthi-card p-6 text-center">
          <div className="text-3xl font-bold text-green-600">156</div>
          <div className="text-gray-600">முடிவுகள் | Results</div>
        </div>
        <div className="thanthi-card p-6 text-center">
          <div className="text-3xl font-bold text-blue-600">78</div>
          <div className="text-gray-600">எஞ்சியவை | Pending</div>
        </div>
        <div className="thanthi-card p-6 text-center">
          <div className="text-3xl font-bold text-purple-600">1,245</div>
          <div className="text-gray-600">விண்ணப்பதாரர்கள் | Candidates</div>
        </div>
      </div>

      {/* Leading Alliance */}
      <div className="thanthi-card p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">முன்னணி கூட்டணி | Leading Alliance</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
            <div className="flex items-center gap-4">
              <Image src="/images/bjp.webp" alt="BJP Logo" width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
              <div>
                <div className="font-bold text-orange-700">NDA Alliance</div>
                <div className="text-sm text-gray-600">BJP + ADMK + PMK + Others</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-orange-700">92</div>
              <div className="text-sm text-gray-600">seats</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
            <div className="flex items-center gap-4">
              <Image src="/images/dmk.webp" alt="DMK Logo" width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
              <div>
                <div className="font-bold text-red-700">INDIA Alliance</div>
                <div className="text-sm text-gray-600">DMK + Congress + Left + Others</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-red-700">64</div>
              <div className="text-sm text-gray-600">seats</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Constituencies */}
      <div className="thanthi-card p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">முக்கிய தொகுதிகள் | Key Constituencies</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {MOCK_CONSTITUENCIES.slice(0, 6).map((constituency: any) => (
            <div key={constituency.id} 
                 className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                 onClick={() => onOpenConstituency(constituency.id)}>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">{constituency.name}</div>
                  <div className="text-sm text-gray-600">{constituency.district}</div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-semibold ${constituency.leadingCandidate.party === 'DMK' ? 'text-red-600' : 
                    constituency.leadingCandidate.party === 'AIADMK' ? 'text-green-600' : 
                    constituency.leadingCandidate.party === 'BJP' ? 'text-orange-600' : 'text-blue-600'}`}>
                    {constituency.leadingCandidate.party}
                  </div>
                  <div className="text-xs text-gray-500">Leading</div>
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
function Results({ onOpenConstituency }: { onOpenConstituency: (id: string) => void }) {
  const [results, setResults] = useState(MOCK_CONSTITUENCIES);

  useEffect(() => {
    // Simulate live updates
    const t = setInterval(() => {
      setResults((prev) => prev.map(r => ({ ...r, leadPct: Math.min(95, r.leadPct + Math.floor(Math.random() * 3) - 1) })));
    }, 3500);
    return () => clearInterval(t);
  }, []);

  const totals = results.reduce((acc: { [key: string]: number }, cur) => {
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
          {results.map(c => (
            <div key={c.id} className="p-3 border rounded flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium">{c.name}</div>
                <div className="text-sm text-gray-500">{c.district}</div>
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
function Constituency({ id }: { id: string }) {
  const data = MOCK_CONSTITUENCIES.find(c => c.id === id) || MOCK_CONSTITUENCIES[0];

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white p-5 rounded shadow">
        <div className="flex items-start gap-4">
          <div>
            <h2 className="text-2xl font-semibold">{data.name}</h2>
            <div className="text-sm text-gray-500">District: {data.district}</div>
          </div>
          <div className="ml-auto text-right">
            <div className="text-xs text-gray-500">Leading</div>
            <div className="text-lg font-bold">{data.leading}</div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2">
            <h4 className="font-semibold">Vote Breakdown (sample)</h4>
            <div className="mt-2">
              <ProgressBar percentage={data.leadPct} color="green" height="md" />
              <div className="text-xs text-gray-500 mt-1">Top candidate: {data.leadPct}%</div>
            </div>

            <div className="mt-4">
              <h5 className="font-medium">Historical context</h5>
              <p className="text-sm text-gray-600 mt-1">Previously: {data.lastYear}. Use archived results to compare swings.</p>
            </div>
          </div>

          <aside className="bg-gray-50 p-3 rounded">
            <h5 className="font-semibold">Demographics (sample)</h5>
            <ul className="text-sm text-gray-600 mt-2 space-y-1">
              <li>Urban voters: 56%</li>
              <li>Rural voters: 44%</li>
              <li>Major issue: Water & agriculture</li>
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
  const [activeConstituency, setActiveConstituency] = useState(MOCK_CONSTITUENCIES[0].id);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <SubNavigation onNavigate={navigate} currentRoute={route} />

      <div className="container mx-auto px-4 py-8">
        {route === 'home' && <Home onOpenConstituency={openConstituency} />}
        {route === 'results' && <Results onOpenConstituency={openConstituency} />}
        {route === 'insights' && <Insights />}
        {route === 'constituency' && <Constituency id={activeConstituency} />}
      </div>

      <Footer />
    </div>
  );
}