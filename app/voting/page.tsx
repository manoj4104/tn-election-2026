import React from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Image from 'next/image'

export default function VotingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              வாக்களிப்பு | Voting Information
            </h1>
            <p className="text-xl text-red-100">
              தமிழ்நாடு சட்டமன்றத் தேர்தல் 2026 - வாக்காளர் தகவல்
            </p>
            <p className="text-lg text-red-100 mt-2">
              Tamil Nadu Assembly Election 2026 - Voter Information
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Important Dates */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">முக்கிய தேதிகள் | Important Dates</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded">
              <div className="text-red-600 font-semibold mb-2">Last Date for Registration</div>
              <div className="text-gray-700">பதிவுக்கான கடைசி தேதி</div>
              <div className="text-2xl font-bold text-red-700 mt-2">March 15, 2026</div>
            </div>
            <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
              <div className="text-green-600 font-semibold mb-2">Polling Day</div>
              <div className="text-gray-700">வாக்களிப்பு நாள்</div>
              <div className="text-2xl font-bold text-green-700 mt-2">May 10, 2026</div>
            </div>
            <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded">
              <div className="text-red-600 font-semibold mb-2">Results Day</div>
              <div className="text-gray-700">முடிவுகள் நாள்</div>
              <div className="text-2xl font-bold text-red-700 mt-2">May 13, 2026</div>
            </div>
          </div>
        </div>

        {/* Voter Registration */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">புதிய வாக்காளர் பதிவு</h3>
            </div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4">New Voter Registration</h4>
            <p className="text-gray-600 mb-4">
              Register as a new voter if you are 18 years or above and not yet registered in the electoral roll.
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Age 18 or above</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Indian citizen</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Resident of Tamil Nadu</span>
              </li>
            </ul>
            <button className="w-full px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium">
              Register Now | இப்போதே பதிவு செய்க
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">உங்கள் பெயரை சரிபார்க்கவும்</h3>
            </div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Check Your Name in Electoral Roll</h4>
            <p className="text-gray-600 mb-4">
              Verify if your name is in the electoral roll and find your polling booth location.
            </p>
            <div className="space-y-3 mb-4">
              <input
                type="text"
                placeholder="Enter your EPIC number / வாக்காளர் அடையாள எண்"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <input
                type="text"
                placeholder="Enter your name / உங்கள் பெயர்"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <button className="w-full px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium">
              Search | தேடு
            </button>
          </div>
        </div>

        {/* How to Vote */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">எவ்வாறு வாக்களிப்பது | How to Vote</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">1</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">அடையாள அட்டை</h3>
              <p className="text-sm text-gray-600">Bring your Voter ID or other valid identity proof</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">சாவடிக்கு செல்க</h3>
              <p className="text-sm text-gray-600">Go to your designated polling station</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">சரிபார்ப்பு</h3>
              <p className="text-sm text-gray-600">Get verified by polling officers</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">4</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">வாக்களியுங்கள்</h3>
              <p className="text-sm text-gray-600">Cast your vote on the EVM machine</p>
            </div>
          </div>
        </div>

        {/* Polling Booth Finder */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg shadow-md p-8 mb-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              உங்கள் வாக்குச் சாவடியைக் கண்டறியவும்
            </h2>
            <p className="text-gray-700 mb-6">Find Your Polling Booth</p>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter your constituency or area / உங்கள் தொகுதி அல்லது பகுதி"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
              <button className="px-8 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-medium whitespace-nowrap">
                Find Booth
              </button>
            </div>
          </div>
        </div>

        {/* Important Documents */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            அனுமதிக்கப்பட்ட அடையாள ஆவணங்கள் | Accepted Identity Documents
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Voter ID Card (EPIC)',
              'Aadhaar Card',
              'Passport',
              'Driving License',
              'PAN Card',
              'Bank Passbook with Photo',
              'Service ID Card (Govt)',
              'Pension Document with Photo',
              'Health Card (CGHS/ECHS)'
            ].map((doc, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">{doc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">தொடர்பு தகவல் | Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <div className="font-semibold text-gray-900">Helpline Number</div>
                  <div className="text-gray-600">1950 (Toll Free)</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <div className="font-semibold text-gray-900">Email Support</div>
                  <div className="text-gray-600">eci@tn.gov.in</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <div>
                  <div className="font-semibold text-gray-900">Website</div>
                  <div className="text-gray-600">www.eci.gov.in</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">வாக்காளர் உதவி செயலி | Voter Helpline App</h3>
            <p className="text-gray-600 mb-4">
              Download the official Voter Helpline App for easy access to all voter services.
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Check voter registration status</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Find polling booth location</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Apply for corrections</span>
              </li>
            </ul>
            <div className="flex gap-3">
              <button className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors text-sm font-medium">
                App Store
              </button>
              <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium">
                Play Store
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
