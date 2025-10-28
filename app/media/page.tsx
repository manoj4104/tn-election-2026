import Navigation from '@/components/Navigation'
import Image from 'next/image'

export default function MediaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="thanthi-card p-8 mb-8">
          <h1 className="text-3xl font-bold text-center mb-4">
            ஊடக காட்சியகம் | Media Gallery
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Tamil Nadu Election 2026 - Official Logos & Brand Assets
          </p>
          
          {/* Daily Thanthi Logo Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Daily Thanthi Branding</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">Main Logo</h3>
                <div className="flex items-center justify-center p-8 bg-gray-50 rounded">
                  <Image 
                    src="/images/dailythanthilogo.png" 
                    alt="Daily Thanthi Official Logo" 
                    width={200}
                    height={80}
                    className="max-h-20 w-auto"
                  />
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <p><strong>Format:</strong> PNG</p>
                  <p><strong>Usage:</strong> Primary brand identity</p>
                  <p><strong>Colors:</strong> Red (#dc2626) theme</p>
                </div>
              </div>
              
              <div className="bg-red-600 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4 text-white">Logo on Dark Background</h3>
                <div className="flex items-center justify-center p-8 bg-red-700 rounded">
                  <Image 
                    src="/images/dailythanthilogo.png" 
                    alt="Daily Thanthi Logo on Dark" 
                    width={200}
                    height={80}
                    className="max-h-20 w-auto"
                  />
                </div>
                <div className="mt-4 text-sm text-red-100">
                  <p><strong>Application:</strong> Headers & Navigation</p>
                  <p><strong>Contrast:</strong> High visibility</p>
                </div>
              </div>
            </div>
          </div>

          {/* Political Party Logos */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Political Party Assets</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
                <div className="mb-4">
                  <Image 
                    src="/images/dmk.webp" 
                    alt="DMK Official Logo" 
                    width={100}
                    height={100}
                    className="h-24 w-24 rounded-full object-cover mx-auto border-4 border-red-200"
                  />
                </div>
                <h3 className="font-bold text-red-600 text-lg">DMK</h3>
                <p className="text-sm text-gray-600 mb-2">திராவிட முன்னேற்றக் கழகம்</p>
                <div className="text-xs bg-red-50 px-2 py-1 rounded">
                  Format: WebP | High Quality
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
                <div className="mb-4">
                  <Image 
                    src="/images/aiadmk.webp" 
                    alt="AIADMK Official Logo" 
                    width={100}
                    height={100}
                    className="h-24 w-24 rounded-full object-cover mx-auto border-4 border-green-200"
                  />
                </div>
                <h3 className="font-bold text-green-600 text-lg">AIADMK</h3>
                <p className="text-sm text-gray-600 mb-2">அண்ணா திராவிட முன்னேற்றக் கழகம்</p>
                <div className="text-xs bg-green-50 px-2 py-1 rounded">
                  Format: WebP | High Quality
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
                <div className="mb-4">
                  <Image 
                    src="/images/bjp.webp" 
                    alt="BJP Official Logo" 
                    width={100}
                    height={100}
                    className="h-24 w-24 rounded-full object-cover mx-auto border-4 border-orange-200"
                  />
                </div>
                <h3 className="font-bold text-orange-600 text-lg">BJP</h3>
                <p className="text-sm text-gray-600 mb-2">பாரதிய ஜனதா கட்சி</p>
                <div className="text-xs bg-orange-50 px-2 py-1 rounded">
                  Format: WebP | High Quality
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
                <div className="mb-4">
                  <Image 
                    src="/images/ntk.webp" 
                    alt="NTK Official Logo" 
                    width={100}
                    height={100}
                    className="h-24 w-24 rounded-full object-cover mx-auto border-4 border-yellow-200"
                  />
                </div>
                <h3 className="font-bold text-yellow-600 text-lg">NTK</h3>
                <p className="text-sm text-gray-600 mb-2">நாம் தமிழர் கட்சி</p>
                <div className="text-xs bg-yellow-50 px-2 py-1 rounded">
                  Format: WebP | High Quality
                </div>
              </div>
            </div>
          </div>

          {/* Additional Graphics */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Supporting Graphics</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-semibold mb-3">தமிழ்நாடு வரைபடம் | TN Map</h3>
                <div className="flex justify-center mb-3">
                  <Image 
                    src="/images/tn-map.webp" 
                    alt="Tamil Nadu Election Map" 
                    width={150}
                    height={200}
                    className="h-32 w-auto"
                  />
                </div>
                <p className="text-sm text-gray-600">தமிழ்நாடு வரைபடம் | TN Map</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-semibold mb-3">Election Banner</h3>
                <div className="mb-3">
                  <Image 
                    src="/images/election-banner.svg" 
                    alt="Election Banner" 
                    width={200}
                    height={50}
                    className="w-full h-20 object-cover rounded"
                  />
                </div>
                <p className="text-sm text-gray-600">Hero section banner</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-semibold mb-3">News & UI Icons</h3>
                <div className="flex gap-3 justify-center mb-3">
                  <Image 
                    src="/images/news-icon.svg" 
                    alt="News Icon" 
                    width={40}
                    height={30}
                    className="h-8 w-10"
                  />
                  <Image 
                    src="/images/ballot-icon.svg" 
                    alt="Ballot Icon" 
                    width={30}
                    height={40}
                    className="h-8 w-6"
                  />
                </div>
                <p className="text-sm text-gray-600">Interface elements</p>
              </div>
            </div>
          </div>

          {/* Usage Guidelines */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-blue-800">Asset Usage Guidelines</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2 text-blue-700">Brand Assets</h3>
                <ul className="text-sm text-blue-600 space-y-1">
                  <li>• Daily Thanthi logo: Primary brand identity</li>
                  <li>• Maintain aspect ratio when scaling</li>
                  <li>• Use on appropriate backgrounds</li>
                  <li>• Minimum size: 100px width</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-blue-700">Party Logos</h3>
                <ul className="text-sm text-blue-600 space-y-1">
                  <li>• Official party symbols only</li>
                  <li>• WebP format for web optimization</li>
                  <li>• Circular cropping recommended</li>
                  <li>• Color-coded borders for identification</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}