import React from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Image from 'next/image'

export default function NewsPage() {
  const newsArticles = [
    {
      id: 1,
      title: "தேர்தல் 2026: தமிழ்நாட்டில் அதிக வாக்குப்பதிவு எதிர்பார்ப்பு",
      titleEn: "Election 2026: High voter turnout expected in Tamil Nadu",
      date: "October 23, 2025",
      category: "தேர்தல் செய்திகள்",
      categoryEn: "Election News",
      image: "https://img.freepik.com/free-photo/indian-flag-tricolor-background-independence-day-republic-day_1340-42909.jpg",
      excerpt: "தமிழ்நாட்டில் 2026 சட்டமன்றத் தேர்தலில் அதிக வாக்குப்பதிவு எதிர்பார்க்கப்படுகிறது...",
      excerptEn: "High voter turnout is expected in the 2026 Tamil Nadu Assembly elections..."
    },
    {
      id: 2,
      title: "முக்கிய வேட்பாளர்கள் பட்டியல் வெளியீடு",
      titleEn: "Key Candidates List Released",
      date: "October 22, 2025",
      category: "வேட்பாளர்கள்",
      categoryEn: "Candidates",
      image: "https://img.freepik.com/free-photo/group-diverse-people-having-business-meeting_53876-25060.jpg",
      excerpt: "அனைத்து முக்கிய கட்சிகளும் தங்கள் வேட்பாளர்கள் பட்டியலை வெளியிட்டுள்ளன...",
      excerptEn: "All major parties have released their candidates list..."
    },
    {
      id: 3,
      title: "தேர்தல் ஆணையம் புதிய வழிகாட்டுதல்கள்",
      titleEn: "Election Commission New Guidelines",
      date: "October 21, 2025",
      category: "அறிவிப்புகள்",
      categoryEn: "Announcements",
      image: "https://img.freepik.com/free-photo/ballot-box-with-person-casting-vote_23-2149345263.jpg",
      excerpt: "தேர்தல் ஆணையம் வாக்காளர்களுக்கான புதிய வழிகாட்டுதல்களை வெளியிட்டுள்ளது...",
      excerptEn: "Election Commission has issued new guidelines for voters..."
    },
    {
      id: 4,
      title: "கட்சிகளின் தேர்தல் அறிக்கைகள்",
      titleEn: "Party Election Manifestos",
      date: "October 20, 2025",
      category: "கொள்கைகள்",
      categoryEn: "Policies",
      image: "https://img.freepik.com/free-photo/people-taking-part-high-protocol-event_23-2150951265.jpg",
      excerpt: "முக்கிய அரசியல் கட்சிகள் தங்கள் தேர்தல் அறிக்கைகளை வெளியிட்டுள்ளன...",
      excerptEn: "Major political parties have released their election manifestos..."
    },
    {
      id: 5,
      title: "வாக்குச் சாவடி அமைப்பு முடிவு",
      titleEn: "Polling Station Setup Complete",
      date: "October 19, 2025",
      category: "தயாரிப்புகள்",
      categoryEn: "Preparations",
      image: "https://img.freepik.com/free-photo/indians-voting-elections_23-2151545146.jpg",
      excerpt: "மாநிலம் முழுவதும் வாக்குச் சாவடிகள் அமைக்கும் பணி முடிவடைந்துள்ளது...",
      excerptEn: "Polling station setup has been completed across the state..."
    },
    {
      id: 6,
      title: "வாக்காளர் பட்டியல் இறுதி செய்யப்பட்டது",
      titleEn: "Voter List Finalized",
      date: "October 18, 2025",
      category: "வாக்காளர்கள்",
      categoryEn: "Voters",
      image: "https://img.freepik.com/free-photo/indian-people-celebration-republic-day_23-2149169202.jpg",
      excerpt: "தமிழ்நாட்டில் 6.5 கோடி வாக்காளர்களுடன் இறுதி பட்டியல் வெளியானது...",
      excerptEn: "Final voter list released with 65 million voters in Tamil Nadu..."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Breaking News Banner */}
      <div className="bg-red-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-4">
            <svg className="h-6 w-8 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
            </svg>
            <span className="breaking-news px-2 py-1 bg-red-800 rounded text-xs font-bold">
              LIVE
            </span>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm animate-marquee whitespace-nowrap">
                தேர்தல் 2026: தமிழ்நாட்டில் அதிக வாக்குப்பதிவு எதிர்பார்ப்பு | Election 2026: High voter turnout expected in Tamil Nadu
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                செய்திகள் | News
              </h1>
              <p className="text-gray-600">
                தேர்தல் 2026 - சமீபத்திய செய்திகள் மற்றும் அறிவிப்புகள் | Latest election news and updates
              </p>
            </div>
            <div className="hidden md:block relative w-32 h-32 opacity-20">
              <Image 
                src="/images/tn-map.webp" 
                alt="Tamil Nadu Map" 
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </div>
        </div>

        {/* Featured News */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">சிறப்பு செய்திகள் | Featured News</h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="md:flex">
              <div className="md:w-1/2 relative h-80 md:h-auto">
                <Image 
                  src="https://img.freepik.com/free-photo/indian-flag-tricolor-background-independence-day-republic-day_1340-42909.jpg"
                  alt="Featured News" 
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded animate-pulse">
                    BREAKING NEWS
                  </span>
                </div>
              </div>
              <div className="md:w-1/2 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded-full">
                    {newsArticles[0].category}
                  </span>
                  <span className="text-gray-500 text-sm">{newsArticles[0].date}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {newsArticles[0].title}
                </h3>
                <p className="text-gray-700 mb-1">{newsArticles[0].titleEn}</p>
                <p className="text-gray-600 mb-4">{newsArticles[0].excerpt}</p>
                <p className="text-gray-600 mb-4">{newsArticles[0].excerptEn}</p>
                <button className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                  Read More | மேலும் வாசிக்க
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* News Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">அனைத்து செய்திகள் | All News</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsArticles.slice(1).map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-56 overflow-hidden">
                  <Image 
                    src={article.image} 
                    alt={article.title}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-3 left-3">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-gray-500 text-xs flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {article.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-700 mb-1">{article.titleEn}</p>
                  <p className="text-sm text-gray-600 mb-3">{article.excerpt}</p>
                  <button className="text-red-600 hover:text-red-700 font-semibold text-sm">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">பிரிவுகள் | Categories</h2>
          <div className="flex flex-wrap gap-3">
            {["தேர்தல் செய்திகள்", "வேட்பாளர்கள்", "அறிவிப்புகள்", "கொள்கைகள்", "தயாரிப்புகள்", "வாக்காளர்கள்"].map((category) => (
              <button 
                key={category}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors text-sm"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
