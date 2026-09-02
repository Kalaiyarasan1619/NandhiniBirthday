import React from 'react';

export const HeaderBanners: React.FC = () => {
  return (
    <div className="w-full flex justify-between pointer-events-none z-10">
      <div className="animate-flag-drop">
        <img
          src="/images/1.png"
          alt="Birthday Banners Left"
          className="w-[220px] sm:w-[280px] md:w-[350px] -rotate-[10deg] -translate-x-[20px] translate-y-[30px] drop-shadow-md"
        />
      </div>
      <div className="animate-flag-drop">
        <img
          src="/images/1.png"
          alt="Birthday Banners Right"
          className="w-[220px] sm:w-[280px] md:w-[350px] rotate-[10deg] translate-x-[20px] translate-y-[30px] -scale-x-100 drop-shadow-md"
        />
      </div>
    </div>
  );
};
