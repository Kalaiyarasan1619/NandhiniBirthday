import React, { useState } from 'react';
import { Settings, Sparkles, ChevronDown } from 'lucide-react';
import { FloatingHeartsCursor } from './components/FloatingHeartsCursor';
import { HeaderBanners } from './components/HeaderBanners';
import { TitleSection } from './components/TitleSection';
import { ProfileSection } from './components/ProfileSection';
import { Decorations } from './components/Decorations';
import { LetterModal } from './components/LetterModal';
import { AudioPlayer } from './components/AudioPlayer';
import { PersonalizeModal } from './components/PersonalizeModal';
import { InteractiveBirthdayFilm } from './components/InteractiveBirthdayFilm';

export const App: React.FC = () => {
  const [name, setName] = useState('Nandhini');
  const [birthDate, setBirthDate] = useState('04.09.2003');
  const [title, setTitle] = useState('To Nandhini');
  const [message, setMessage] = useState(
    'You are a very special girl. Today, I wish you all the best, lots of health, and lots of joy. I always hope we will celebrate many more birthdays like this together. Happy birthday to you.💕'
  );
  const [photoUrl, setPhotoUrl] = useState('/images/nandhini.jpg');

  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isPersonalizeOpen, setIsPersonalizeOpen] = useState(false);

  const handlePersonalizeSave = (data: {
    name: string;
    birthDate: string;
    title: string;
    message: string;
    photoUrl: string;
  }) => {
    setName(data.name);
    setBirthDate(data.birthDate);
    setTitle(data.title);
    setMessage(data.message);
    setPhotoUrl(data.photoUrl);
  };

  const scrollToFilm = () => {
    const section = document.getElementById('interactive-film-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#feecea] bg-grid-pattern overflow-x-hidden flex flex-col justify-between select-none">
      {/* Floating Hearts Cursor Effect */}
      <FloatingHeartsCursor />

      {/* Background & Decorative Elements */}
      <Decorations />

      {/* Top Floating Action Buttons */}
      <div className="fixed top-4 right-4 z-40 flex items-center gap-3">
        <button
          onClick={() => setIsPersonalizeOpen(true)}
          title="Customize Birthday Card"
          className="flex items-center gap-2 bg-white/90 hover:bg-white text-[#333] hover:text-[#ff7882] px-4 py-2 rounded-full border-2 border-[#333] shadow-md hover:shadow-lg transition-all cursor-pointer font-sriracha text-sm font-bold backdrop-blur-xs"
        >
          <Settings className="w-4 h-4" />
          <span>Personalize</span>
        </button>
      </div>

      {/* Main App Content Wrapper */}
      <div className="w-full flex-1 flex flex-col justify-between max-w-7xl mx-auto relative z-10">
        {/* TOP FESTIVE BANNERS */}
        <HeaderBanners />

        {/* SECTION 1: HERO & PROFILE CARD */}
        <main className="w-full min-h-[85vh] flex flex-col items-center justify-center py-4 sm:py-8">
          <div className="w-full flex flex-col md:flex-row items-center justify-center">
            {/* LEFT: TITLE, DATE, CLICK HERE BUTTON */}
            <TitleSection
              birthDate={birthDate}
              onOpenLetter={() => setIsLetterOpen(true)}
            />

            {/* RIGHT: PROFILE FRAME, BALLOONS, ROTATING BADGE */}
            <ProfileSection
              name={name}
              photoUrl={photoUrl}
            />
          </div>

          {/* Smooth Scroll Prompt to Section 2 */}
          <div className="mt-8 z-30 flex flex-col items-center animate-bounce">
            <button
              onClick={scrollToFilm}
              className="flex items-center gap-2 bg-white/90 hover:bg-white text-[#ff7882] px-5 py-2 rounded-full border-2 border-[#333] shadow-md font-sriracha text-sm font-bold transition-all cursor-pointer hover:scale-105"
            >
              <span>Scroll down for Interactive Gift 🏹✨</span>
              <ChevronDown className="w-4 h-4 animate-pulse" />
            </button>
          </div>
        </main>

        {/* SECTION 2: INTERACTIVE CUPID BOW & BLOSSOM TREE FILM */}
        <InteractiveBirthdayFilm />

        {/* FOOTER COPYRIGHT */}
        <footer className="w-full py-6 text-center text-sm font-sriracha text-[#333]/80 z-20 flex items-center justify-center gap-1">
          <span>Made with</span>
          <Sparkles className="w-4 h-4 text-[#ff7882] animate-pulse inline-block" />
          <span>for {name}'s Special Day</span>
        </footer>
      </div>

      {/* INTERACTIVE LETTER MODAL */}
      <LetterModal
        isOpen={isLetterOpen}
        onClose={() => setIsLetterOpen(false)}
        title={title}
        message={message}
      />

      {/* PERSONALIZE CUSTOMIZATION MODAL */}
      <PersonalizeModal
        isOpen={isPersonalizeOpen}
        onClose={() => setIsPersonalizeOpen(false)}
        name={name}
        birthDate={birthDate}
        title={title}
        message={message}
        photoUrl={photoUrl}
        onSave={handlePersonalizeSave}
      />

      {/* BACKGROUND MUSIC PLAYER */}
      <AudioPlayer />
    </div>
  );
};

export default App;
