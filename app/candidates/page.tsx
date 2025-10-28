'use client'

import React, { useEffect, useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Image from 'next/image'

interface Party {
  id: number
  name: string
  logoUrl?: string
}

interface Constituency {
  id: number
  name: string
  district?: string
}

interface Candidate {
  id: number
  name: string
  partyId: number
  constituencyId: number
  photoUrl?: string
  bio?: string
  Party: Party
  Constituency: Constituency
}

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [loading, setLoading] = useState(true)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    loadCandidates()
  }, [])

  const loadCandidates = async () => {
    try {
      const response = await fetch('/api/candidates?limit=50')
      const data = await response.json()
      setCandidates(data.data || [])
      setTotalCount(data.meta?.total || 0)
    } catch (error) {
      console.error('Failed to load candidates:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fallback data for demo if no candidates in database
  const demoCandidate = {
    id: 0,
    name: "Sample Candidate",
    Party: { id: 1, name: "DMK", logoUrl: "/images/dmk.webp" },
    Constituency: { id: 1, name: "Sample Constituency", district: "Sample District" },
    photoUrl: "https://img.freepik.com/free-photo/confident-indian-businessman-standing-crossed-arms_1262-2274.jpg",
    bio: "Sample candidate bio"
  }

  const displayCandidates = candidates.length > 0 ? candidates : [demoCandidate];

  const partyColors: { [key: string]: string } = {
    DMK: "text-red-600 bg-red-50 border-red-200",
    AIADMK: "text-green-600 bg-green-50 border-green-200",
    BJP: "text-orange-600 bg-orange-50 border-orange-200",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              வேட்பாளர்கள் | Candidates
            </h1>
            <p className="text-xl text-red-100">
              தமிழ்நாடு சட்டமன்றத் தேர்தல் 2026 - போட்டியிடும் வேட்பாளர்கள்
            </p>
            <p className="text-lg text-red-100 mt-2">
              Tamil Nadu Assembly Election 2026 - Contesting Candidates
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">வடிகட்டி | Filter Candidates</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="party-filter" className="block text-sm font-medium text-gray-700 mb-2">Party | கட்சி</label>
              <select id="party-filter" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500">
                <option>All Parties</option>
                <option>DMK</option>
                <option>AIADMK</option>
                <option>BJP</option>
              </select>
            </div>
            <div>
              <label htmlFor="constituency-filter" className="block text-sm font-medium text-gray-700 mb-2">Constituency | தொகுதி</label>
              <select id="constituency-filter" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500">
                <option>All Constituencies</option>
                <option>Chennai Central</option>
                <option>Coimbatore South</option>
                <option>Madurai North</option>
              </select>
            </div>
            <div>
              <label htmlFor="experience-filter" className="block text-sm font-medium text-gray-700 mb-2">Experience | அனுபவம்</label>
              <select id="experience-filter" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500">
                <option>All</option>
                <option>0-5 years</option>
                <option>6-10 years</option>
                <option>11+ years</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search | தேடு</label>
              <input
                type="text"
                placeholder="Search by name..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">{loading ? '...' : totalCount}</div>
            <div className="text-gray-600">மொத்த வேட்பாளர்கள்</div>
            <div className="text-sm text-gray-500">Total Candidates</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">234</div>
            <div className="text-gray-600">தொகுதிகள்</div>
            <div className="text-sm text-gray-500">Constituencies</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">3</div>
            <div className="text-gray-600">முக்கிய கட்சிகள்</div>
            <div className="text-sm text-gray-500">Major Parties</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">-</div>
            <div className="text-gray-600">பெண் வேட்பாளர்கள்</div>
            <div className="text-sm text-gray-500">Women Candidates</div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            <p className="mt-4 text-gray-600">Loading candidates...</p>
          </div>
        )}

        {/* Candidates Grid */}
        {!loading && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              அனைத்து வேட்பாளர்கள் | All Candidates
              {candidates.length === 0 && <span className="text-sm text-gray-500 ml-2">(Add candidates from Admin Dashboard)</span>}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayCandidates.map((candidate) => (
                <div key={candidate.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    {candidate.photoUrl && (
                      <Image
                        src={candidate.photoUrl}
                        alt={candidate.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    )}
                    {!candidate.photoUrl && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-24 h-24 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-1">{candidate.name}</h3>
                    </div>
                    <div className="absolute top-4 right-4">
                      {candidate.Party?.logoUrl && (
                        <Image
                          src={candidate.Party.logoUrl}
                          alt={candidate.Party.name}
                          width={40}
                          height={40}
                          className="rounded-full bg-white p-1"
                          unoptimized
                        />
                      )}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold mb-3 border ${partyColors[candidate.Party?.name] || 'text-gray-600 bg-gray-50 border-gray-200'}`}>
                      {candidate.Party?.name || 'Independent'}
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div>
                          <div className="font-medium text-gray-900">{candidate.Constituency?.name}</div>
                          {candidate.Constituency?.district && (
                            <div className="text-gray-500">{candidate.Constituency.district}</div>
                          )}
                        </div>
                      </div>
                      {candidate.bio && (
                        <div className="pt-3 border-t border-gray-100">
                          <div className="text-xs text-gray-500 mb-1">Bio</div>
                          <div className="text-gray-700 line-clamp-3">{candidate.bio}</div>
                        </div>
                      )}
                    </div>
                    <button className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-red-600 hover:text-white transition-colors text-sm font-medium">
                      View Full Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}
