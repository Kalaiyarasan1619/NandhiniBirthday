import React, { useEffect, useState } from 'react';
import { Mail, Star } from 'lucide-react';

interface TitleSectionProps {
  birthDate: string;
  onOpenLetter: () => void;
}

export const TitleSection: React.FC<TitleSectionProps> = ({ birthDate, onOpenLetter }) => {
  const [displayedDate, setDisplayedDate] = useState('');
  const [showStars, setShowStars] = useState(false);

  const happyChars = 'Happy'.split('');
  const birthdayChars = 'Birthday'.split('');

  useEffect(() => {
    // Start typewriter effect for Date of Birth after initial entrance delay
    const timer = setTimeout(() => {
      let idx = 0;
      const interval = setInterval(() => {
        if (idx <= birthDate.length) {
          setDisplayedDate(birthDate.slice(0, idx));
          idx++;
        } else {
          setShowStars(true);
          clearInterval(interval);
        }
      }, 110);

      return () => clearInterval(interval);
    }, 4500);

    return () => clearTimeout(timer);
  }, [birthDate]);

  return (
    <div className="w-full md:w-5/12 flex flex-col items-center justify-center px-4 sm:px-8 z-10">
      {/* Title Container */}
      <div className="relative w-full flex flex-col items-center justify-center font-titan text-4xl sm:text-5xl md:text-6xl select-none">
        {/* WISH YOU A PREFIX */}
        <div className="font-sriracha text-2xl sm:text-3xl text-[#ff7882] bg-white/90 px-4 py-1 rounded-full border-2 border-[#333] shadow-md font-bold mb-2 opacity-0 translate-y-6 animate-[txtTranslateY_0.5s_0.8s_forwards]">
          ✨ Wish You ✨
        </div>

        {/* HAPPY */}
        <h1 className="flex justify-center text-white text-stroke-black gap-1 sm:gap-2">
          {happyChars.map((char, index) => (
            <span
              key={index}
              className="inline-block opacity-0 translate-y-12 animate-[txtTranslateY_0.5s_ease_forwards]"
              style={{ animationDelay: `${1.2 + index * 0.15}s` }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* BIRTHDAY */}
        <h1 className="flex justify-center text-[#ff7882] text-stroke-black gap-1 sm:gap-2 relative">
          {birthdayChars.map((char, index) => (
            <span
              key={index}
              className="inline-block opacity-0 translate-y-12 animate-[txtTranslateY_0.5s_ease_forwards]"
              style={{ animationDelay: `${2.0 + index * 0.15}s` }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* PARTY HAT */}
        <div className="absolute right-2 -top-[350px] rotate-[-40deg] -z-10 animate-hat-drop">
          <img
            src="/images/hat.png"
            alt="Party Hat"
            className="w-[100px] sm:w-[130px] drop-shadow-lg"
          />
        </div>
      </div>

      {/* DATE OF BIRTH BADGE */}
      <div className="mt-6 flex items-center justify-center bg-[#ff7882] border-[3px] border-[#333] rounded-full px-6 py-2 shadow-md transition-all duration-500 animate-date-badge font-sriracha text-white text-lg font-bold">
        {showStars && <Star className="w-5 h-5 text-amber-300 fill-amber-300 mr-2 animate-spin" style={{ animationDuration: '4s' }} />}
        <span>{displayedDate}</span>
        {showStars && <Star className="w-5 h-5 text-amber-300 fill-amber-300 ml-2 animate-spin" style={{ animationDuration: '4s' }} />}
      </div>

      {/* CLICK HERE BUTTON */}
      <div className="mt-8 transform scale-0 animate-[scaleCircle_1.5s_6s_forwards_ease-in-out]">
        <button
          onClick={onOpenLetter}
          id="btn__letter"
          className="group relative flex items-center justify-center gap-2 bg-[#ff7882] hover:bg-[#F61F1F] text-[#333] hover:text-white font-sriracha text-lg sm:text-xl px-7 py-3 rounded-full border-[3px] border-[#333] hover:border-[#F61F1F] shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer active:scale-90"
        >
          <span>Click here</span>
          <Mail className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
        </button>
      </div>
    </div>
  );
};
