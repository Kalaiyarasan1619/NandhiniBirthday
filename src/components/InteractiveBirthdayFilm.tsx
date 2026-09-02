import React, { useState, useRef } from 'react';
import { RefreshCw, Maximize2, Minimize2, Heart, Sparkles } from 'lucide-react';

export const InteractiveBirthdayFilm: React.FC = () => {
  const [iframeKey, setIframeKey] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleReset = () => {
    setIframeKey((prev) => prev + 1);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  return (
    <section id="interactive-film-section" className="w-full max-w-6xl mx-auto px-4 py-12 z-20">
      {/* Section Title */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-[#ff7882] text-white px-5 py-1.5 rounded-full border-2 border-[#333] shadow-md font-sriracha text-sm sm:text-base font-bold mb-3">
          <Heart className="w-4 h-4 fill-white text-white animate-pulse" />
          <span>Interactive Cinematic Experience</span>
          <Sparkles className="w-4 h-4 text-amber-300" />
        </div>
        <h2 className="font-titan text-2xl sm:text-3xl md:text-4xl text-[#ff5277] drop-shadow-sm tracking-wide">
          Cupid's Bow & Blooming Heart Tree 🏹🌸
        </h2>
        <p className="font-sriracha text-[#333]/80 text-base sm:text-lg mt-2">
          Pull back the bow string, release the arrow to hit the heart, and watch the blossom tree unfold!
        </p>
      </div>

      {/* Frame Container */}
      <div
        ref={containerRef}
        className={`relative w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-[#333] bg-[#12060c] transition-all duration-300 ${
          isFullscreen ? 'fixed inset-0 z-[9999] rounded-none border-0 my-0 h-screen' : 'h-[75vh] min-h-[580px] max-h-[820px]'
        }`}
      >
        {/* Floating Controls Toolbar */}
        <div className="absolute top-4 right-4 z-40 flex items-center gap-2 pointer-events-auto">
          <button
            onClick={handleReset}
            title="Restart Film"
            className="flex items-center gap-1.5 bg-white/90 hover:bg-white text-[#333] px-3.5 py-1.5 rounded-full border-2 border-[#333] shadow-md font-sriracha text-xs sm:text-sm font-bold transition-transform hover:scale-105 cursor-pointer backdrop-blur-xs"
          >
            <RefreshCw className="w-4 h-4 text-[#ff7882]" />
            <span>Restart Film</span>
          </button>
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            className="p-2 bg-white/90 hover:bg-white text-[#333] rounded-full border-2 border-[#333] shadow-md font-sriracha text-xs font-bold transition-transform hover:scale-105 cursor-pointer backdrop-blur-xs"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4 text-[#ff7882]" /> : <Maximize2 className="w-4 h-4 text-[#ff7882]" />}
          </button>
        </div>

        {/* 100% Standalone Interactive Film Engine */}
        <iframe
          key={iframeKey}
          src="/interactive-gift/index.html"
          title="Interactive Birthday Film - Cupid Bow & Heart Blossom Tree"
          className="w-full h-full border-0 block select-none"
          style={{ width: '100%', height: '100%', border: 'none', outline: 'none' }}
        />
      </div>
    </section>
  );
};

export default InteractiveBirthdayFilm;
