import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const playBirthdayMelody = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Happy Birthday Notes: Frequency and Duration (seconds)
      const notes = [
        { note: 264, duration: 0.3 }, // C4
        { note: 264, duration: 0.3 }, // C4
        { note: 297, duration: 0.6 }, // D4
        { note: 264, duration: 0.6 }, // C4
        { note: 352, duration: 0.6 }, // F4
        { note: 330, duration: 1.0 }, // E4

        { note: 264, duration: 0.3 }, // C4
        { note: 264, duration: 0.3 }, // C4
        { note: 297, duration: 0.6 }, // D4
        { note: 264, duration: 0.6 }, // C4
        { note: 396, duration: 0.6 }, // G4
        { note: 352, duration: 1.0 }, // F4

        { note: 264, duration: 0.3 }, // C4
        { note: 264, duration: 0.3 }, // C4
        { note: 528, duration: 0.6 }, // C5
        { note: 440, duration: 0.6 }, // A4
        { note: 352, duration: 0.6 }, // F4
        { note: 330, duration: 0.6 }, // E4
        { note: 297, duration: 0.8 }, // D4

        { note: 466, duration: 0.3 }, // Bb4
        { note: 466, duration: 0.3 }, // Bb4
        { note: 440, duration: 0.6 }, // A4
        { note: 352, duration: 0.6 }, // F4
        { note: 396, duration: 0.6 }, // G4
        { note: 352, duration: 1.2 }, // F4
      ];

      let currentTime = ctx.currentTime + 0.1;

      notes.forEach(({ note, duration }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note, currentTime);

        gain.gain.setValueAtTime(0.2, currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, currentTime + duration - 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(currentTime);
        osc.stop(currentTime + duration);

        currentTime += duration;
      });

      // Loop melody after completion if still playing
      const totalDuration = (currentTime - ctx.currentTime) * 1000;
      setTimeout(() => {
        if (isPlayingRef.current) {
          playBirthdayMelody();
        }
      }, totalDuration);
    } catch (err) {
      console.log('Web Audio API error:', err);
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      isPlayingRef.current = false;
      setIsPlaying(false);
      if (audioCtxRef.current) {
        audioCtxRef.current.suspend();
      }
    } else {
      isPlayingRef.current = true;
      setIsPlaying(true);
      playBirthdayMelody();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={toggleMusic}
        title={isPlaying ? 'Pause Music' : 'Play Birthday Music'}
        className="group relative flex items-center gap-2 bg-[#ff7882] hover:bg-[#F61F1F] text-white p-3.5 sm:px-5 sm:py-3 rounded-full border-3 border-[#333] shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer active:scale-95"
      >
        <Music className={`w-5 h-5 ${isPlaying ? 'animate-bounce' : ''}`} />
        <span className="hidden sm:inline font-sriracha text-sm font-bold">
          {isPlaying ? 'Playing Music 🎵' : 'Play Music 🎶'}
        </span>
        {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 opacity-80" />}
      </button>
    </div>
  );
};
