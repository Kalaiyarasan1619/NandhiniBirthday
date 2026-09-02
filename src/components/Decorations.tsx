import React from 'react';

export const Decorations: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* DECORATIVE STARS */}
      <div
        className="absolute w-5 h-5 top-20 left-[15%] sm:left-[22%] bg-[#333] clip-star animate-[scaleCircle_3s_6s_forwards,scaleStar_2s_8s_infinite_ease-in-out]"
      />
      <div
        className="absolute w-4 h-5 top-10 right-[15%] sm:right-[25%] bg-[#333] clip-star animate-[scaleCircle_3s_6.2s_forwards,scaleStar_2s_8.2s_infinite_ease-in-out]"
      />
      <div
        className="absolute w-3.5 h-3.5 top-[320px] left-[45%] bg-[#333] clip-star animate-[scaleCircle_3s_6.4s_forwards,scaleStar_2s_8.4s_infinite_ease-in-out]"
      />
      <div
        className="absolute w-4.5 h-4.5 bottom-16 left-8 bg-[#333] clip-star animate-[scaleCircle_3s_6.6s_forwards,scaleStar_2s_8.6s_infinite_ease-in-out]"
      />
      <div
        className="absolute w-4 h-4.5 bottom-36 left-[35%] sm:left-[42%] bg-[#333] clip-star animate-[scaleCircle_3s_6.8s_forwards,scaleStar_2s_8.8s_infinite_ease-in-out]"
      />

      {/* DECORATIVE FLOWERS */}
      <div className="absolute top-[250px] left-10 sm:left-16 transform scale-0 animate-[scaleCircle_3s_6s_forwards_ease-in-out]">
        <img src="/images/decorate_flower.png" alt="flower" className="w-5 sm:w-6" />
      </div>
      <div className="absolute top-[225px] left-[42%] sm:left-[48%] transform scale-0 animate-[scaleCircle_3s_6.3s_forwards_ease-in-out]">
        <img src="/images/decorate_flower.png" alt="flower" className="w-5 sm:w-6" />
      </div>
      <div className="absolute top-[150px] right-24 sm:right-36 transform scale-0 animate-[scaleCircle_3s_6.6s_forwards_ease-in-out]">
        <img src="/images/decorate_flower.png" alt="flower" className="w-5 sm:w-6" />
      </div>

      {/* SMILEY ICON */}
      <div className="absolute bottom-40 left-[48%] sm:left-[55%] transform scale-0 animate-[scaleCircle_3s_7s_forwards_ease-in-out]">
        <img src="/images/smiley_icon.png" alt="smiley" className="w-20 sm:w-24 drop-shadow-md" />
      </div>

      {/* BOTTOM DECORATION */}
      <div className="absolute right-0 bottom-0 z-0">
        <img src="/images/decorate.png" alt="bottom decoration" className="w-[80px] sm:w-[120px]" />
      </div>
    </div>
  );
};
