import React from 'react';
import { Heart } from 'lucide-react';

interface ProfileSectionProps {
  name: string;
  photoUrl: string;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ name, photoUrl }) => {
  const circleText = 'happy-birthday-'.split('');

  return (
    <div className="w-full md:w-7/12 flex justify-center items-center py-6 px-4 z-10">
      <div className="relative animate-profile-up">
        {/* BALLOON 1 (LEFT) */}
        <div className="absolute -top-16 -left-12 sm:-top-20 sm:-left-16 z-20 animate-balloon-1">
          <img
            src="/images/balloon1.png"
            alt="Balloon 1"
            className="w-[80px] sm:w-[100px] drop-shadow-md"
          />
        </div>

        {/* BALLOON 2 (RIGHT) */}
        <div className="absolute top-36 -right-12 sm:-right-16 -z-10 animate-balloon-2">
          <img
            src="/images/balloon2.png"
            alt="Balloon 2"
            className="w-[80px] sm:w-[100px] drop-shadow-md"
          />
        </div>

        {/* ROTATING CIRCLE BADGE */}
        <div className="absolute -top-4 -right-8 sm:-top-6 sm:-right-10 z-30 flex items-center justify-center animate-scale-in">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-[#ff7882] rounded-full border-[5px] border-[#333] flex items-center justify-center animate-rotate-circle shadow-md">
            {circleText.map((char, index) => (
              <span
                key={index}
                className="absolute top-0 left-1/2 text-[#333] font-sriracha uppercase font-bold text-[11px] sm:text-xs"
                style={{
                  transformOrigin: '0 44px',
                  transform: `rotate(${index * 24}deg)`,
                }}
              >
                {char}
              </span>
            ))}
          </div>
          <Heart className="absolute w-6 h-6 text-[#F61F1F] fill-[#F61F1F] animate-pulse-heart filter drop-shadow-[0_0_5px_#F61F1F]" />
        </div>

        {/* CIRCULAR PROFILE PHOTO FRAME */}
        <div className="relative w-[260px] h-[260px] sm:w-[340px] sm:h-[340px] md:w-[380px] md:h-[380px] rounded-full overflow-hidden border-[6px] border-[#333] shadow-2xl bg-white flex items-center justify-center">
          <img
            src={photoUrl || '/images/img.png'}
            alt="Birthday Girl"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* NAME BADGE */}
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-[#ff7882] border-[3px] border-[#333] rounded-full px-8 py-1.5 flex items-center gap-3 shadow-lg font-sriracha text-white font-bold text-xl sm:text-2xl whitespace-nowrap">
          <Heart className="w-5 h-5 text-[#F61F1F] fill-[#F61F1F] animate-pulse-heart" />
          <span>{name}</span>
          <Heart className="w-5 h-5 text-[#F61F1F] fill-[#F61F1F] animate-pulse-heart" />
        </div>
      </div>
    </div>
  );
};
