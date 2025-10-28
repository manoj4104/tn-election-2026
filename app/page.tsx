import React from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Image from 'next/image'

export default function Home() {
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
              BREAKING
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
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-lg mb-8 h-48 md:h-64 lg:h-80 bg-gradient-to-br from-red-600 via-red-700 to-red-800">
          {/* Background Image */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="relative w-full h-full">
              <Image 
                src="/images/election-banner.svg" 
                alt="Banner Image" 
                fill
                className="object-cover mix-blend-overlay"
                priority
              />
            </div>
          </div>
          
          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-lg transform rotate-12"></div>
            <div className="absolute top-20 right-20 w-16 h-16 border border-white rounded-full"></div>
            <div className="absolute bottom-10 left-1/3 w-12 h-12 border border-white rounded-lg transform -rotate-12"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 flex items-center h-full">
            <div className="container mx-auto px-8">
              <div className="max-w-2xl">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                  தேர்தல் 2026 | Election 2026
                </h1>
                <p className="text-lg text-red-100 mb-6 drop-shadow-md">
                  Tamil Nadu Assembly Elections - Live Results, Constituency Updates & Real-time Analysis
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="/tn-election"
                    className="thanthi-button bg-white text-red-600 hover:bg-red-50"
                  >
                    Live Dashboard பார்க்க
                  </a>
                  <a 
                    href="/results"
                    className="thanthi-button bg-red-800 hover:bg-red-900"
                  >
                    முடிவுகள் Results
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="thanthi-card p-6 text-center">
            <div className="text-3xl font-bold text-red-600">234</div>
            <div className="text-sm text-gray-600">மொத்த தொகுதிகள்</div>
            <div className="text-xs text-gray-500">Total Constituencies</div>
          </div>
          <div className="thanthi-card p-6 text-center">
            <div className="text-3xl font-bold text-blue-600">DMK+</div>
            <div className="text-sm text-gray-600">முன்னிலை</div>
            <div className="text-xs text-gray-500">Leading Alliance</div>
          </div>
          <div className="thanthi-card p-6 text-center">
            <div className="text-3xl font-bold text-green-600">72%</div>
            <div className="text-sm text-gray-600">வாக்குப்பதிவு</div>
            <div className="text-xs text-gray-500">Voter Turnout</div>
          </div>
          <div className="thanthi-card p-6 text-center">
            <div className="text-3xl font-bold text-orange-600">LIVE</div>
            <div className="text-sm text-gray-600">நேரலை முடிவுகள்</div>
            <div className="text-xs text-gray-500">Live Results</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Featured TN Election Dashboard */}
          <div className="lg:col-span-2">
            <div className="thanthi-card p-6">
              <h2 className="section-title">தமிழ்நாடு தேர்தல் டாஷ்போர்டு | TN Election Dashboard</h2>
              <div className="aspect-video bg-gradient-to-br from-red-50 to-blue-50 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                <div className="text-center z-10">
                  <div className="text-6xl mb-4">📊</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Interactive Election Dashboard</h3>
                  <p className="text-gray-600 mb-4">Real-time constituency results, candidate profiles, and AI insights</p>
                  <a 
                    href="/tn-election"
                    className="thanthi-button"
                  >
                    டாஷ்போர்டு பார்க்க | View Dashboard
                  </a>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-blue-500/10"></div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                  <h4 className="font-semibold text-red-700 mb-2">முன்னணி கூட்டணிகள்</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Image src="/images/dmk.webp" alt="DMK" width={24} height={24} className="h-6 w-6 rounded-full object-cover" unoptimized />
                        <span>DMK+</span>
                      </div>
                      <span className="font-bold">120 seats</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Image src="/images/aiadmk.webp" alt="AIADMK" width={24} height={24} className="h-6 w-6 rounded-full object-cover" unoptimized />
                        <span>AIADMK+</span>
                      </div>
                      <span className="font-bold">95 seats</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-700 mb-2">Key Candidates</h4>
                  <div className="space-y-2 text-sm">
                    <div>📍 Chennai Central</div>
                    <div>📍 Coimbatore</div>
                    <div>📍 Madurai</div>
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-700 mb-2">Live Updates</h4>
                  <div className="space-y-2 text-sm">
                    <div>🔴 Counting in progress</div>
                    <div>📊 Results updating</div>
                    <div>📱 Mobile alerts on</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Links */}
            <div className="thanthi-card p-6">
              <h3 className="section-title text-lg">விரைவு இணைப்புகள் | Quick Links</h3>
              <div className="space-y-3">
                <a href="/candidates" className="block p-3 bg-gray-50 rounded hover:bg-red-50 transition-colors">
                  <div className="font-medium text-gray-800">வேட்பாளர்கள் | Candidates</div>
                  <div className="text-sm text-gray-600">View all election candidates</div>
                </a>
                <a href="/voting" className="block p-3 bg-gray-50 rounded hover:bg-red-50 transition-colors">
                  <div className="font-medium text-gray-800">வாக்களிப்பு | Voting Info</div>
                  <div className="text-sm text-gray-600">Polling locations & dates</div>
                </a>
                <a href="/news" className="block p-3 bg-gray-50 rounded hover:bg-red-50 transition-colors">
                  <div className="font-medium text-gray-800">செய்திகள் | News</div>
                  <div className="text-sm text-gray-600">Latest election updates</div>
                </a>
              </div>
            </div>

            {/* Key Highlights */}
            <div className="thanthi-card p-6">
              <h3 className="section-title text-lg">முக்கிய அம்சங்கள் | Highlights</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <div className="font-medium text-gray-800">DMK leads in urban Chennai</div>
                  <div className="text-sm text-gray-600">Strong performance in metro constituencies</div>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="font-medium text-gray-800">AIADMK holding Kongu region</div>
                  <div className="text-sm text-gray-600">Traditional stronghold remains intact</div>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <div className="font-medium text-gray-800">High turnout in rural areas</div>
                  <div className="text-sm text-gray-600">Record participation expected</div>
                </div>
              </div>
            </div>

            {/* Tamil Nadu Map */}
            <div className="thanthi-card p-6">
              <h3 className="section-title text-lg">தமிழ்நாடு வரைபடம் | TN Map</h3>
              <div className="flex items-center justify-center">
                <Image 
                  src="/images/tn-map.webp" 
                  alt="Tamil Nadu Election Map" 
                  width={200}
                  height={300}
                  className="h-64 w-auto hover:scale-105 transition-transform cursor-pointer"
                />
              </div>
              <div className="mt-4 text-center text-sm text-gray-600">
                Click regions for detailed constituency results
              </div>
            </div>
          </div>
        </div>

        {/* Political Parties Section */}
        <div className="thanthi-card p-6">
          <h2 className="section-title text-lg">அரசியல் கட்சிகள் | Political Parties</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center group">
              <div className="relative mb-3">
                <Image 
                  src="/images/dmk.webp" 
                  alt="DMK Logo" 
                  width={80} 
                  height={80} 
                  className="h-20 w-20 rounded-full object-cover mx-auto border-4 border-red-200 group-hover:border-red-500 transition-colors"
                />
              </div>
              <h3 className="font-bold text-red-600">DMK</h3>
              <p className="text-sm text-gray-600">திராவிட முன்னேற்றக் கழகம்</p>
              <div className="mt-2 text-xs bg-red-50 px-2 py-1 rounded">Leading: 68 seats</div>
            </div>
            
            <div className="text-center group">
              <div className="relative mb-3">
                <Image 
                  src="/images/aiadmk.webp" 
                  alt="AIADMK Logo" 
                  width={80} 
                  height={80} 
                  className="h-20 w-20 rounded-full object-cover mx-auto border-4 border-green-200 group-hover:border-green-500 transition-colors"
                />
              </div>
              <h3 className="font-bold text-green-600">AIADMK</h3>
              <p className="text-sm text-gray-600">அண்ணா திராவிட முன்னேற்றக் கழகம்</p>
              <div className="mt-2 text-xs bg-green-50 px-2 py-1 rounded">Leading: 52 seats</div>
            </div>
            
            <div className="text-center group">
              <div className="relative mb-3">
                <Image 
                  src="/images/bjp.webp" 
                  alt="BJP Logo" 
                  width={80} 
                  height={80} 
                  className="h-20 w-20 rounded-full object-cover mx-auto border-4 border-orange-200 group-hover:border-orange-500 transition-colors"
                />
              </div>
              <h3 className="font-bold text-orange-600">BJP</h3>
              <p className="text-sm text-gray-600">பாரதிய ஜனதா கட்சி</p>
              <div className="mt-2 text-xs bg-orange-50 px-2 py-1 rounded">Leading: 28 seats</div>
            </div>
            
            <div className="text-center group">
              <div className="relative mb-3">
                <Image 
                  src="/images/ntk.webp" 
                  alt="NTK Logo" 
                  width={80} 
                  height={80} 
                  className="h-20 w-20 rounded-full object-cover mx-auto border-4 border-yellow-200 group-hover:border-yellow-500 transition-colors"
                />
              </div>
              <h3 className="font-bold text-yellow-600">NTK</h3>
              <p className="text-sm text-gray-600">நாம் தமிழர் கட்சி</p>
              <div className="mt-2 text-xs bg-yellow-50 px-2 py-1 rounded">Leading: 8 seats</div>
            </div>
          </div>
          
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-red-50 to-green-50 p-4 rounded-lg">
              <h4 className="font-bold text-gray-800 mb-2">முக்கிய கூட்டணிகள் | Major Alliances</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <Image src="/images/dmk.webp" alt="DMK" width={20} height={20} className="h-5 w-5 rounded-full" unoptimized />
                    INDIA Alliance
                  </span>
                  <span className="font-bold text-red-600">95 seats</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <Image src="/images/bjp.webp" alt="BJP" width={20} height={20} className="h-5 w-5 rounded-full" unoptimized />
                    NDA Alliance
                  </span>
                  <span className="font-bold text-orange-600">82 seats</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
              <h4 className="font-bold text-gray-800 mb-2">வாக்குப் பகிர்வு | Vote Share</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>DMK+</span>
                  <span className="font-bold">42.5%</span>
                </div>
                <div className="flex justify-between">
                  <span>AIADMK+</span>
                  <span className="font-bold">35.2%</span>
                </div>
                <div className="flex justify-between">
                  <span>Others</span>
                  <span className="font-bold">22.3%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Latest News Section */}
        <div className="thanthi-card p-6">
          <h2 className="section-title">சமீபத்திய செய்திகள் | Latest News</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <article className="group cursor-pointer">
              <div className="relative mb-3">
                <Image 
                  src="/images/news/election-map.svg" 
                  alt="Tamil Nadu Election Map" 
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <span className="news-badge absolute top-2 left-2">பிரேக்கிங்</span>
              </div>
              <h3 className="font-bold text-gray-800 group-hover:text-red-600 transition-colors mb-2">
                தமிழ்நாட்டில் அதிக வாக்குப்பதிவு | Record Turnout in Tamil Nadu
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                78.2% வாக்குப்பதிவுடன் தமிழ்நாட்டில் வரலாற்று சாதனை. Chennai and surrounding districts lead with highest participation.
              </p>
              <div className="text-xs text-gray-500">2 மணி நேரத்திற்கு முன்பு | 2 hours ago</div>
            </article>

            <article className="group cursor-pointer">
              <div className="relative mb-3">
                <Image 
                  src="/images/news/voting-booth.svg" 
                  alt="Voting Process" 
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <span className="news-badge bg-blue-600 absolute top-2 left-2">அப்டேட்</span>
              </div>
              <h3 className="font-bold text-gray-800 group-hover:text-red-600 transition-colors mb-2">
                மாறிவரும் வாக்களிப்பு முறை | Evolving Voting Methods
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Digital verification and enhanced security measures ensure transparent elections across all 234 constituencies.
              </p>
              <div className="text-xs text-gray-500">4 மணி நேரத்திற்கு முன்பு | 4 hours ago</div>
            </article>

            <article className="group cursor-pointer">
              <div className="relative mb-3">
                <Image 
                  src="/images/news/digital-results.svg" 
                  alt="Live Digital Results" 
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <span className="news-badge bg-green-600 absolute top-2 left-2">நேரலை</span>
              </div>
              <h3 className="font-bold text-gray-800 group-hover:text-red-600 transition-colors mb-2">
                உடனுக்குடன் முடிவுகள் | Real-time Results Dashboard
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Advanced technology platform provides instant updates and analysis as votes are counted across Tamil Nadu.
              </p>
              <div className="text-xs text-gray-500">6 மணி நேரத்திற்கு முன்பு | 6 hours ago</div>
            </article>

            <article className="group cursor-pointer">
              <div className="relative mb-3">
                <Image 
                  src="/images/news/campaign-rally.svg" 
                  alt="Political Campaign Rally" 
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <span className="news-badge bg-purple-600 absolute top-2 left-2">அரசியல்</span>
              </div>
              <h3 className="font-bold text-gray-800 group-hover:text-red-600 transition-colors mb-2">
                கடைசி நாள் பிரச்சாரம் | Final Day Campaigns
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Major political parties conclude their campaigns with massive rallies across key constituencies in Tamil Nadu.
              </p>
              <div className="text-xs text-gray-500">8 மணி நேரத்திற்கு முன்பு | 8 hours ago</div>
            </article>

            <article className="group cursor-pointer">
              <div className="relative mb-3">
                <Image 
                  src="/images/news/ec-report.svg" 
                  alt="Election Commission Report" 
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <span className="news-badge bg-orange-600 absolute top-2 left-2">நீதி</span>
              </div>
              <h3 className="font-bold text-gray-800 group-hover:text-red-600 transition-colors mb-2">
                தேர்தல் நடுவர் அறிக்கை | Election Commission Report
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                தேர்தல் ஆணையம் வெளியிட்ட அறிக்கையில் சுதந்திரமான மற்றும் நீதியான தேர்தல் நடைபெற்றதாக தெரிவிக்கப்பட்டுள்ளது.
              </p>
              <div className="text-xs text-gray-500">10 மணி நேரத்திற்கு முன்பு | 10 hours ago</div>
            </article>

            <article className="group cursor-pointer">
              <div className="relative mb-3">
                <Image 
                  src="/images/news/media-coverage.svg" 
                  alt="Media Coverage" 
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <span className="news-badge bg-indigo-600 absolute top-2 left-2">ஊடகம்</span>
              </div>
              <h3 className="font-bold text-gray-800 group-hover:text-red-600 transition-colors mb-2">
                24x7 தேர்தல் கவரேஜ் | Continuous Election Coverage
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Daily Thanthi&apos;s comprehensive election coverage includes live updates, expert analysis, and constituency-wise reports.
              </p>
              <div className="text-xs text-gray-500">12 மணி நேரத்திற்கு முன்பு | 12 hours ago</div>
            </article>
          </div>
          
          <div className="text-center mt-8">
            <a 
              href="/news" 
              className="thanthi-button bg-red-600 text-white hover:bg-red-700"
            >
              மேலும் செய்திகள் | More News
            </a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}