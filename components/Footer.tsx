"use client";

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-16 pt-8 pb-8">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <Image 
              src="/images/dailythanthilogo-original.png" 
              alt="Daily Thanthi" 
              width={120} 
              height={32}
              className="mb-4 brightness-0 invert"
            />
            <p className="text-gray-400 text-sm">
              தமிழ்நாடு தேர்தல் 2026 - உங்கள் நம்பகமான தேர்தல் தகவல் மையம்
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Your trusted source for Tamil Nadu Election 2026 updates
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">விரைவு இணைப்புகள் | Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tn-election" className="text-gray-400 hover:text-red-500 transition-colors">
                  தமிழ்நாடு தேர்தல் | TN Election
                </Link>
              </li>
              <li>
                <Link href="/results" className="text-gray-400 hover:text-red-500 transition-colors">
                  முடிவுகள் | Results
                </Link>
              </li>
              <li>
                <Link href="/candidates" className="text-gray-400 hover:text-red-500 transition-colors">
                  வேட்பாளர்கள் | Candidates
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-400 hover:text-red-500 transition-colors">
                  செய்திகள் | News
                </Link>
              </li>
              <li>
                <Link href="/voting" className="text-gray-400 hover:text-red-500 transition-colors">
                  வாக்களிப்பு | Voting Info
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-lg mb-4">வளங்கள் | Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/media" className="text-gray-400 hover:text-red-500 transition-colors">
                  ஊடக காட்சியகம் | Media Gallery
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  தேர்தல் வழிகாட்டி | Election Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  தொடர்பு | Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  தனியுரிமை கொள்கை | Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Updates */}
          <div>
            <h3 className="font-bold text-lg mb-4">இணைந்திருங்கள் | Stay Connected</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <span className="text-xl">f</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <span className="text-xl">𝕏</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <span className="text-xl">in</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <span className="text-xl">▶</span>
              </a>
            </div>
            <p className="text-gray-400 text-sm mb-2">முடிவுகள் அறிவிப்புகளைப் பெறுங்கள்</p>
            <p className="text-gray-400 text-sm">Get live results notifications</p>
            <div className="mt-4">
              <input 
                type="email" 
                placeholder="உங்கள் மின்னஞ்சல் | Your Email"
                className="w-full px-3 py-2 bg-gray-800 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <button className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-semibold transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© 2026 Daily Thanthi. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை | All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-red-500 transition-colors">Terms of Service</a>
              <span>|</span>
              <a href="#" className="hover:text-red-500 transition-colors">Privacy Policy</a>
              <span>|</span>
              <a href="#" className="hover:text-red-500 transition-colors">Disclaimer</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
