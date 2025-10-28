'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Image from 'next/image'
import Link from 'next/link'
import { DynamicBgColor, DynamicColorText, DynamicProgressBar } from '@/components/DynamicColor'
import CandidatePlaceholder from '@/media/dailythanthilogo.png'

interface CandidateDetail {
  id: number
  name: string
  partyName: string
  partyLogo?: string
  partyColor: string
  constituencyName: string
  photoUrl?: string
  votes: number
  votePercentage: number
  status: 'won' | 'leading' | 'trailing'
  margin: number
  age?: number
  education?: string
  bio?: string
}

export default function CandidateDetailPage() {
  const params = useParams()
  const [candidate, setCandidate] = useState<CandidateDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      loadCandidate(params.id as string)
    }
  }, [params.id])

  const loadCandidate = async (id: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/candidates/${id}`)
      const data = await response.json()
      
      // Transform API data to match our interface
      const candidateData: CandidateDetail = {
        id: data.id,
        name: data.name,
        partyName: data.Party?.name || 'Independent',
        partyLogo: data.Party?.logoUrl,
        partyColor: data.Party?.color || '#6b7280',
        constituencyName: data.Constituency?.name || '',
        photoUrl: data.photoUrl,
        votes: Math.floor(Math.random() * 500000) + 100000, // Mock data
        votePercentage: Math.random() * 30 + 40,
        status: Math.random() > 0.5 ? 'won' : 'leading',
        margin: Math.floor(Math.random() * 50000) + 5000,
        age: 45,
        education: 'Post Graduate',
        bio: data.bio || 'Experienced political leader serving the constituency.'
      }
      
      setCandidate(candidateData)
    } catch (error) {
      console.error('Error loading candidate:', error)
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
          <p className="mt-4 text-gray-600">Loading candidate details...</p>
        </div>
      </div>
    )
  }

  if (!candidate) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Candidate Not Found</h1>
          <Link href="/results" className="text-red-600 hover:underline">
            ← Back to Results
          </Link>
        </div>
      </div>
    )
  }

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
          <span className="text-gray-800">{candidate.name}</span>
        </div>

        {/* Candidate Header Card */}
        <div className="thanthi-card overflow-hidden mb-8">
          <DynamicBgColor 
            color={candidate.partyColor} 
            className="h-2"
          />
          
          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Photo Section */}
              <div className="md:col-span-1">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
                  {candidate.photoUrl ? (
                    <Image
                      src={candidate.photoUrl}
                      alt={candidate.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <Image
                      src={CandidatePlaceholder}
                      alt={`${candidate.name} placeholder`}
                      fill
                      className="object-contain p-8 bg-white"
                    />
                  )}
                  
                  {/* Status Badge */}
                  <div className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg ${
                    candidate.status === 'won' ? 'bg-green-600' : 
                    candidate.status === 'leading' ? 'bg-blue-600' : 'bg-gray-600'
                  }`}>
                    {candidate.status === 'won' ? '✓ வெற்றி | WON' : 
                     candidate.status === 'leading' ? '↑ முன்னிலை | LEADING' : '↓ பின்தங்கி | TRAILING'}
                  </div>
                </div>
              </div>

              {/* Details Section */}
              <div className="md:col-span-2">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">{candidate.name}</h1>
                
                {/* Party Info */}
                <div className="flex items-center gap-4 mb-6">
                  {candidate.partyLogo && (
                    <Image
                      src={candidate.partyLogo}
                      alt={candidate.partyName}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  )}
                  <div>
                    <DynamicColorText 
                      color={candidate.partyColor} 
                      className="text-xl font-semibold"
                    >
                      {candidate.partyName}
                    </DynamicColorText>
                    
                    <div className="text-gray-600">
                      {candidate.constituencyName}
                    </div>
                  </div>
                </div>

                {/* Vote Statistics */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">
                      மொத்த வாக்குகள் | Total Votes
                    </div>
                    <div className="text-3xl font-bold text-gray-800">
                      {candidate.votes.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">
                      வாக்கு சதவீதம் | Vote %
                    </div>
                    <DynamicColorText 
                      color={candidate.partyColor} 
                      className="text-3xl font-bold"
                    >
                      {candidate.votePercentage.toFixed(2)}%
                    </DynamicColorText>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">
                      வித்தியாசம் | Margin
                    </div>
                    <div className="text-3xl font-bold text-green-600">
                      +{candidate.margin.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">நிலை | Status</div>
                    <div className="text-2xl font-bold text-gray-800">
                      {candidate.status === 'won' ? 'வெற்றி பெற்றவர்' : 
                       candidate.status === 'leading' ? 'முன்னிலையில்' : 'பின்தங்கி'}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold">Vote Share</span>
                    <span>{candidate.votePercentage.toFixed(1)}%</span>
                  </div>
                  
                  <DynamicProgressBar
                    color={candidate.partyColor}
                    percentage={candidate.votePercentage}
                    className="h-4"
                  />
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {candidate.age && (
                    <div>
                      <span className="text-gray-600">வயது | Age:</span>
                      <span className="ml-2 font-semibold">{candidate.age} years</span>
                    </div>
                  )}
                  {candidate.education && (
                    <div>
                      <span className="text-gray-600">கல்வி | Education:</span>
                      <span className="ml-2 font-semibold">{candidate.education}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bio Section */}
            {candidate.bio && (
              <div className="mt-8 pt-8 border-t">
                <h2 className="text-xl font-bold mb-4">வாழ்க்கை வரலாறு | Biography</h2>
                <p className="text-gray-700 leading-relaxed">{candidate.bio}</p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Link 
            href="/results"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            ← Back to Results
          </Link>
          <Link 
            href={`/results/constituency/${candidate.constituencyName}`}
            className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            View Constituency Results →
          </Link>
        </div>
      </main>
    </div>
  )
}
