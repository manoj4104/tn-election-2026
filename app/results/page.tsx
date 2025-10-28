'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { DynamicBgColor, DynamicColorText, DynamicProgressBar } from '@/components/DynamicColor'
import CandidatePlaceholder from '@/media/dailythanthilogo.png'

// Types
interface Alliance {
  id: string
  name: string
  nameTa: string
  totalSeats: number
  won: number
  leading: number
  votePercentage: number
  color: string
}

interface Candidate {
  id: number
  name: string
  partyName: string
  partyAbbr: string
  constituencyName: string
  photoUrl?: string
  status: 'won' | 'leading' | 'trailing'
  partyColor: string
}

interface ConstituencyResult {
  id: number
  name: string
  district: string
  leadingParty: string
  leadingCandidate: string
  leadMargin: number
  totalVotes: number
  status: 'counting' | 'completed'
}

export default function ResultsPage() {
  const [alliances, setAlliances] = useState<Alliance[]>([])
  const [keyCandidates, setKeyCandidates] = useState<Candidate[]>([])
  const [constituencies, setConstituencies] = useState<ConstituencyResult[]>([])
  const [selectedTab, setSelectedTab] = useState<'national' | 'tamilnadu'>('tamilnadu')
  const [districtFilter, setDistrictFilter] = useState<string>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      // Fetch data from APIs
      const [partiesRes, candidatesRes, resultsRes] = await Promise.all([
        fetch('/api/parties?limit=100'),
        fetch('/api/candidates?limit=100'),
        fetch('/api/results?limit=234')
      ])

      const parties = await partiesRes.json()
      const candidates = await candidatesRes.json()
      const results = await resultsRes.json()

      // Process alliance data
      const allianceData: Alliance[] = [
        {
          id: 'dmk',
          name: 'DMK Alliance',
          nameTa: 'திமுக கூட்டணி',
          totalSeats: 234,
          won: 120,
          leading: 10,
          votePercentage: 48.5,
          color: '#dc2626'
        },
        {
          id: 'aiadmk',
          name: 'AIADMK Alliance', 
          nameTa: 'அதிமுக கூட்டணி',
          totalSeats: 234,
          won: 95,
          leading: 8,
          votePercentage: 38.2,
          color: '#16a34a'
        },
        {
          id: 'bjp',
          name: 'BJP Alliance',
          nameTa: 'பாஜக கூட்டணி',
          totalSeats: 234,
          won: 10,
          leading: 2,
          votePercentage: 9.8,
          color: '#f97316'
        },
        {
          id: 'others',
          name: 'Others',
          nameTa: 'மற்றவை',
          totalSeats: 234,
          won: 9,
          leading: 1,
          votePercentage: 3.5,
          color: '#6b7280'
        }
      ]

      setAlliances(allianceData)

      // Process key candidates from API
      if (candidates.data && Array.isArray(candidates.data)) {
        const keyCandsData: Candidate[] = candidates.data.slice(0, 15).map((c: any) => ({
          id: c.id,
          name: c.name,
          partyName: c.Party?.name || 'Independent',
          partyAbbr: c.Party?.abbreviation || 'IND',
          constituencyName: c.Constituency?.name || '',
          photoUrl: c.photoUrl,
          status: Math.random() > 0.5 ? 'won' : 'leading',
          partyColor: c.Party?.color || '#6b7280'
        }))
        setKeyCandidates(keyCandsData)
      }

      // Mock constituency results (replace with real API data)
      const mockConstituencies: ConstituencyResult[] = Array.from({ length: 39 }, (_, i) => ({
        id: i + 1,
        name: `Constituency ${i + 1}`,
        district: ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli'][i % 5],
        leadingParty: ['DMK', 'AIADMK', 'BJP', 'IND'][i % 4],
        leadingCandidate: `Candidate ${i + 1}`,
        leadMargin: Math.floor(Math.random() * 50000) + 10000,
        totalVotes: Math.floor(Math.random() * 500000) + 200000,
        status: Math.random() > 0.2 ? 'completed' : 'counting'
      }))

      setConstituencies(mockConstituencies)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredConstituencies = districtFilter === 'all' 
    ? constituencies 
    : constituencies.filter(c => c.district === districtFilter)

  const districts = Array.from(new Set(constituencies.map(c => c.district)))

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Banner */}
  <div className="thanthi-card mt-8 mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-red-700 p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">
                  தமிழ்நாடு சட்டமன்றத் தேர்தல் 2026
                </h1>
                <h2 className="text-2xl opacity-90">
                  Tamil Nadu Legislative Assembly Election 2026
                </h2>
                <p className="mt-4 text-red-100">
                  நேரலை முடிவுகள் | Live Results
                </p>
              </div>
              <div className="text-right">
                <div className="text-6xl font-bold">234</div>
                <div className="text-sm uppercase tracking-wide">Total Seats</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setSelectedTab('tamilnadu')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              selectedTab === 'tamilnadu' 
                ? 'bg-red-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            தமிழ்நாடு | Tamil Nadu
          </button>
          <button
            onClick={() => setSelectedTab('national')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              selectedTab === 'national' 
                ? 'bg-red-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            தேசியம் | National
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">முடிவுகளை ஏற்றுகிறது... | Loading results...</p>
          </div>
        ) : (
          <>
            {/* Alliance Summary Cards */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                கூட்டணி சுருக்கம் | Alliance Summary
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {alliances.map((alliance) => (
                  <div 
                    key={alliance.id} 
                    className="thanthi-card overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <DynamicBgColor 
                      color={alliance.color} 
                      className="h-2" 
                    />
                    
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-1">
                        {alliance.nameTa}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {alliance.name}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Won</span>
                          <DynamicColorText 
                            color={alliance.color} 
                            className="text-2xl font-bold"
                          >
                            {alliance.won}
                          </DynamicColorText>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Leading</span>
                          <span className="text-xl font-semibold text-gray-700">
                            {alliance.leading}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center pt-2 border-t">
                          <span className="text-gray-600">Vote %</span>
                          <span className="font-bold text-gray-800">
                            {alliance.votePercentage}%
                          </span>
                        </div>
                      </div>
                      
                      <DynamicProgressBar
                        color={alliance.color}
                        percentage={(alliance.won / alliance.totalSeats) * 100}
                        className="mt-4"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Candidates Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                முக்கிய வேட்பாளர்கள் | Key Candidates
              </h2>
              <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
                {keyCandidates.map((candidate) => (
                  <Link 
                    key={candidate.id} 
                    href={`/results/candidate/${candidate.id}`}
                    className="thanthi-card hover:shadow-lg transition-shadow overflow-hidden group"
                  >
                    <div className="relative aspect-[3/4] bg-gray-200">
                      {candidate.photoUrl ? (
                        <Image
                          src={candidate.photoUrl}
                          alt={candidate.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <Image
                          src={CandidatePlaceholder}
                          alt={`${candidate.name} placeholder`}
                          fill
                          className="object-contain p-6 bg-white"
                        />
                      )}
                      
                      {/* Status Badge */}
                      <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold text-white ${
                        candidate.status === 'won' ? 'bg-green-600' : 
                        candidate.status === 'leading' ? 'bg-blue-600' : 'bg-gray-600'
                      }`}>
                        {candidate.status === 'won' ? 'வெற்றி' : 
                         candidate.status === 'leading' ? 'முன்னிலை' : 'பின்தங்கி'}
                      </div>
                    </div>
                    
                    <div className="p-3">
                      <DynamicBgColor 
                        color={candidate.partyColor} 
                        className="w-full h-1 rounded mb-2"
                      />
                      
                      <div className="text-xs text-gray-600 mb-1">
                        {candidate.partyAbbr}
                      </div>
                      
                      <h3 className="font-bold text-sm mb-1 line-clamp-2">
                        {candidate.name}
                      </h3>
                      
                      <p className="text-xs text-gray-600 line-clamp-1">
                        {candidate.constituencyName}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Constituency Results */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  தொகுதி வாரியான முடிவுகள் | Constituency Results
                </h2>
                
                {/* District Filter */}
                <select
                  value={districtFilter}
                  onChange={(e) => setDistrictFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
                  title="Filter by district"
                  aria-label="Filter by district"
                >
                  <option value="all">All Districts</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>

              <div className="thanthi-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          தொகுதி | Constituency
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          மாவட்டம் | District
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          முன்னணி கட்சி | Leading Party
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          வேட்பாளர் | Candidate
                        </th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                          வித்தியாசம் | Margin
                        </th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                          நிலை | Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredConstituencies.map((constituency) => (
                        <tr 
                          key={constituency.id}
                          className="hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => window.location.href = `/results/constituency/${constituency.id}`}
                        >
                          <td className="px-4 py-3 font-medium">{constituency.name}</td>
                          <td className="px-4 py-3 text-gray-600">{constituency.district}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                              constituency.leadingParty === 'DMK' ? 'bg-red-100 text-red-800' :
                              constituency.leadingParty === 'AIADMK' ? 'bg-green-100 text-green-800' :
                              constituency.leadingParty === 'BJP' ? 'bg-orange-100 text-orange-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {constituency.leadingParty}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-700">{constituency.leadingCandidate}</td>
                          <td className="px-4 py-3 text-right font-semibold">
                            {constituency.leadMargin.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              constituency.status === 'completed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {constituency.status === 'completed' ? 'முடிந்தது' : 'எண்ணிக்கையில்'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Media Gallery Link */}
            <div className="thanthi-card p-8 text-center bg-gradient-to-r from-red-50 to-orange-50">
              <h2 className="text-2xl font-bold mb-3">
                ஊடக காட்சியகம் | Media Gallery
              </h2>
              <p className="text-gray-600 mb-6">
                View all election-related images, logos, and graphics
              </p>
              <Link 
                href="/media" 
                className="inline-block px-8 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                View Media Gallery →
              </Link>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}
