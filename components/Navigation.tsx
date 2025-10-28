"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import LoginModal from './LoginModal';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Listen for modal close events to avoid passing function props to Client entry
  React.useEffect(() => {
    const handleClose = () => setIsLoginModalOpen(false);
    if (typeof window !== 'undefined') {
      window.addEventListener('login-modal:close', handleClose);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('login-modal:close', handleClose);
      }
    };
  }, []);

  return (
    <nav className="bg-white shadow-sm">
      {/* Red Banner */}
      <div className="w-full bg-red-700 py-1">
        <div className="container mx-auto px-4">
          <span className="text-white text-sm font-semibold tracking-wide">நேரடி தேர்தல் தகவல்கள் | Live Election Updates</span>
        </div>
      </div>
      
      {/* Main Navigation Container */}
      <div className="w-full">
        <div className="container mx-auto px-4 py-4 grid grid-cols-[auto_1fr_auto] items-center gap-6">
          {/* Logo */}
          <a href="/" className="flex items-center min-w-[140px]" aria-label="Daily Thanthi Home">
            <Image
              src="/images/dailythanthilogo-original.png"
              alt="Daily Thanthi Logo"
              width={140}
              height={38}
              className="object-contain"
              priority
              quality={100}
              unoptimized
            />
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center h-16 justify-center space-x-6">
            <a href="/news" className="flex flex-col items-center justify-center px-3 h-16">
              <span className="text-[15px] font-medium text-gray-700 leading-tight">செய்திகள்</span>
              <span className="text-xs text-gray-500">News</span>
            </a>
            <a href="/tn-election" className="flex flex-col items-center justify-center px-3 h-16">
              <span className="text-[15px] font-medium text-gray-700 leading-tight">தமிழ்நாடு</span>
              <span className="text-xs text-gray-500">TN Election</span>
            </a>
            <a href="/candidates" className="flex flex-col items-center justify-center px-3 h-16">
              <span className="text-[15px] font-medium text-gray-700 leading-tight">வேட்பாளர்கள்</span>
              <span className="text-xs text-gray-500">Candidates</span>
            </a>
            <a href="/results" className="flex flex-col items-center justify-center px-3 h-16">
              <span className="text-[15px] font-medium text-gray-700 leading-tight">முடிவுகள்</span>
              <span className="text-xs text-gray-500">Results</span>
            </a>
            <a href="/voting" className="flex flex-col items-center justify-center px-3 h-16">
              <span className="text-[15px] font-medium text-gray-700 leading-tight">வாக்களிப்பு</span>
              <span className="text-xs text-gray-500">Voting</span>
            </a>
          </div>
          
          {/* Right actions: Admin button (desktop) and Mobile menu button */}
          <div className="flex items-center justify-end h-16">
            {/* Admin Button - Desktop Only */}
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="hidden lg:inline-flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white rounded-md hover:bg-red-700 active:bg-red-800 transition-all duration-200 shadow-sm hover:shadow-md font-medium text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span>Admin</span>
            </button>
            
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden flex flex-col space-y-1 p-2"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span className={`w-6 h-0.5 bg-gray-700 transition-transform ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-gray-700 transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-gray-700 transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-red-500">
          <div className="container mx-auto px-4">
            <div className="flex flex-col space-y-2 py-4">
              <a 
                href="/tn-election" 
                className="text-gray-700 hover:text-red-600 transition-colors py-3 px-2 border-b border-gray-200"
                onClick={() => setIsMenuOpen(false)}
              >
                தமிழ்நாடு / TN Election
              </a>
              <a 
                href="/candidates" 
                className="text-gray-700 hover:text-red-600 transition-colors py-3 px-2 border-b border-gray-200"
                onClick={() => setIsMenuOpen(false)}
              >
                வேட்பாளர்கள் / Candidates
              </a>
              <a 
                href="/voting" 
                className="text-gray-700 hover:text-red-600 transition-colors py-3 px-2 border-b border-gray-200"
                onClick={() => setIsMenuOpen(false)}
              >
                வாக்களிப்பு / Voting
              </a>
              <a 
                href="/news" 
                className="text-gray-700 hover:text-red-600 transition-colors py-3 px-2 border-b border-gray-200"
                onClick={() => setIsMenuOpen(false)}
              >
                செய்திகள் / News
              </a>
              <a 
                href="/results" 
                className="bg-red-600 text-white hover:bg-red-700 transition-colors py-3 px-2 rounded font-bold mx-2 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                முடிவுகள் / Results
              </a>
            </div>
          </div>
        </div>
      )}
      
      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen}
      />
    </nav>
  );
};

export default Navigation;