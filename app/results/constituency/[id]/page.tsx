'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Image from 'next/image'
import Link from 'next/link'
import { DynamicBgColor, DynamicColorText, DynamicProgressBar } from '@/components/DynamicColor'
import CandidatePlaceholder from '@/media/dailythanthilogo.png'

interface ConstituencyCandidate {
  id: number
  name: string
  partyName: string
  partyAbbr: string
  partyColor: string
  votes: number
  votePercentage: number
  photoUrl?: string
  status: 'won' | 'leading' | 'trailing'
}

interface ConstituencyDetails {
  id: number
  name: string
  district: string
  totalVoters: number
  totalVotes: number
  turnoutPercentage: number
  status: 'counting' | 'completed'
  candidates: ConstituencyCandidate[]
  lastUpdated: string
}

export default function ConstituencyDetailPage() {
  const params = useParams()
  const [constituency, setConstituency] = useState<ConstituencyDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      loadConstituency(params.id as string)
    }
  }, [params.id])

  const loadConstituency = async (id: string) => {
    try {
      setLoading(true)
      
      // Mock data - replace with actual API call
      const mockData: ConstituencyDetails = {
        id: parseInt(id),
        name: `Constituency ${id}`,
        district: 'Chennai',
        totalVoters: 450000,
        totalVotes: 360000,
        turnoutPercentage: 80,
        status: 'completed',
        lastUpdated: new Date().toLocaleString(),
        candidates: [
          {
            id: 1,
            name: 'Candidate A',
            partyName: 'DMK',
            partyAbbr: 'DMK',
            partyColor: '#dc2626',
            votes: 180000,
            votePercentage: 50,
            status: 'won'
          },
          {
            id: 2,
            name: 'Candidate B',
            partyName: 'AIADMK',
            partyAbbr: 'AIADMK',
            partyColor: '#16a34a',
            votes: 140000,
            votePercentage: 38.89,
            status: 'trailing'
          },
          {
            id: 3,
            name: 'Candidate C',
            partyName: 'BJP',
            partyAbbr: 'BJP',
            partyColor: '#f97316',
            votes: 30000,
            votePercentage: 8.33,
            status: 'trailing'
          },
          {
            id: 4,
            name: 'Candidate D',
            partyName: 'Independent',
            partyAbbr: 'IND',
            partyColor: '#6b7280',
            votes: 10000,
            votePercentage: 2.78,
            status: 'trailing'
          }
        ]
      }
      
      setConstituency(mockData)
    } catch (error) {
      console.error('Error loading constituency:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading constituency details...</p>
        </div>
      </div>
    )
  }

  if (!constituency) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Constituency Not Found</h1>
          <Link href="/results" className="text-red-600 hover:underline">
            ← Back to Results
          </Link>
        </div>
      </div>
    )
  }

  const winner = constituency.candidates[0]
  const runnerUp = constituency.candidates[1]
  const margin = winner && runnerUp ? winner.votes - runnerUp.votes : 0

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-red-600">Home</Link>
          <span className="mx-2">›</span>
          <Link href="/results" className="hover:text-red-600">Results</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-800">{constituency.name}</span>
        </div>

        {/* Constituency Header */}
        <div className="thanthi-card p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">{constituency.name}</h1>
              <p className="text-xl text-gray-600">{constituency.district} மாவட்டம் | {constituency.district} District</p>
            </div>
            <div className={`px-6 py-3 rounded-full font-bold ${
              constituency.status === 'completed' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {constituency.status === 'completed' ? 'முடிந்தது | Completed' : 'எண்ணிக்கையில் | Counting'}
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">மொத்த வாக்காளர்கள்</div>
              <div className="text-2xl font-bold text-gray-800">
                {constituency.totalVoters.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">Total Voters</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">பதிவான வாக்குகள்</div>
              <div className="text-2xl font-bold text-gray-800">
                {constituency.totalVotes.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">Votes Polled</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">வாக்குப்பதிவு சதவீதம்</div>
              <div className="text-2xl font-bold text-blue-600">
                {constituency.turnoutPercentage.toFixed(2)}%
              </div>
              <div className="text-xs text-gray-500">Turnout</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">வெற்றி வித்தியாசம்</div>
              <div className="text-2xl font-bold text-green-600">
                {margin.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">Victory Margin</div>
            </div>
          </div>

          {/* Last Updated */}
          <div className="mt-4 text-sm text-gray-500 text-center">
            கடைசியாக புதுப்பிக்கப்பட்டது | Last Updated: {constituency.lastUpdated}
          </div>
        </div>

import CandidatePlaceholder from '@/media/dailythanthilogo.png'
        {/* Candidates Results */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            வேட்பாளர்கள் முடிவுகள் | Candidates Results
          </h2>
          
          <div className="space-y-4">
            {constituency.candidates.map((candidate, index) => (
              <div 
                key={candidate.id}
                className="thanthi-card overflow-hidden hover:shadow-lg transition-shadow"
              >
                <DynamicBgColor 
                  color={candidate.partyColor} 
                  className="h-2"
                />
                
                <div className="p-6">
                  <div className="flex items-center gap-6">
                    {/* Rank Badge */}
                    <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ${
                      index === 0 ? 'bg-yellow-400 text-yellow-900' :
                      index === 1 ? 'bg-gray-300 text-gray-700' :
                      index === 2 ? 'bg-orange-300 text-orange-900' :
                      'bg-gray-200 text-gray-600'
                    }`}>
                      #{index + 1}
                    </div>

                    {/* Photo */}
                    <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-200">
                      {candidate.photoUrl ? (
                        <Image
                          src={candidate.photoUrl}
                          alt={candidate.name}
                          width={80}
                          height={80}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <Image
                          src={CandidatePlaceholder}
                          alt={`${candidate.name} placeholder`}
                          fill
                          className="object-contain p-4 bg-white"
                        />
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-grow">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-xl font-bold text-gray-800">{candidate.name}</h3>
                        {index === 0 && constituency.status === 'completed' && (
                          <span className="px-3 py-1 bg-green-600 text-white rounded-full text-xs font-bold">
                            ✓ வெற்றி | WON
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <DynamicBgColor 
                          color={candidate.partyColor} 
                          className="px-2 py-1 rounded text-xs font-bold text-white"
                        >
                          {candidate.partyAbbr}
                        </DynamicBgColor>
                        
                        <span className="text-gray-600">
                          {candidate.partyName}
                        </span>
                      </div>

                      {/* Vote Progress Bar */}
                      <div className="mb-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-semibold">
                            {candidate.votes.toLocaleString()} votes
                          </span>
                          
                          <DynamicColorText 
                            color={candidate.partyColor} 
                            className="font-bold"
                          >
                            {candidate.votePercentage.toFixed(2)}%
                          </DynamicColorText>
                        </div>
                        
                        <DynamicProgressBar
                          color={candidate.partyColor}
                          percentage={candidate.votePercentage}
                          className="h-3"
                        />
                      </div>
                    </div>

                    {/* View Details Button */}
                    <Link
                      href={`/results/candidate/${candidate.id}`}
                      className="flex-shrink-0 px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-red-600 hover:text-red-600 transition-colors font-semibold"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <Link 
          href="/results"
          className="inline-block px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
        >
          ← Back to All Results
        </Link>
      </main>
    </div>
  )
}
