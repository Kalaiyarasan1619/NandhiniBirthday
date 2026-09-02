import React, { useEffect, useState } from 'react';
import { X, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export const LetterModal: React.FC<LetterModalProps> = ({ isOpen, onClose, title, message }) => {
  const [typedTitle, setTypedTitle] = useState('');
  const [typedMessage, setTypedMessage] = useState('');
  const [showImages, setShowImages] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Trigger confetti celebration
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#ff3366', '#ff7882', '#ffd1dc', '#ffffff', '#ff1493'],
        });
      } catch (err) {
        console.log('Confetti trigger error:', err);
      }

      setTypedTitle('');
      setTypedMessage('');
      setShowImages(false);
      setShowHearts(false);

      // 1. Type Title
      let titleIdx = 0;
      const titleInterval = setInterval(() => {
        if (titleIdx <= title.length) {
          setTypedTitle(title.slice(0, titleIdx));
          titleIdx++;
        } else {
          clearInterval(titleInterval);
        }
      }, 120);

      // 2. Fade in GIFs
      const imageTimer = setTimeout(() => {
        setShowImages(true);
      }, 1200);

      // 3. Show floating hearts
      const heartTimer = setTimeout(() => {
        setShowHearts(true);
      }, 1800);

      // 4. Type Message
      let msgIdx = 0;
      let msgInterval: ReturnType<typeof setInterval>;
      const msgTimer = setTimeout(() => {
        msgInterval = setInterval(() => {
          if (msgIdx <= message.length) {
            setTypedMessage(message.slice(0, msgIdx));
            msgIdx++;
          } else {
            clearInterval(msgInterval);
          }
        }, 40);
      }, 2400);

      return () => {
        clearInterval(titleInterval);
        clearTimeout(imageTimer);
        clearTimeout(heartTimer);
        clearTimeout(msgTimer);
        if (msgInterval) clearInterval(msgInterval);
      };
    }
  }, [isOpen, title, message]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[1000] flex items-center justify-center p-4 transition-opacity duration-300">
      {/* Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-4 sm:p-6 shadow-2xl animate-[scaleCircle_0.5s_ease-out_forwards]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-10 h-10 bg-white hover:bg-[#ff7882] text-[#333] hover:text-white rounded-full flex items-center justify-center shadow-lg transition-colors duration-300 border-2 border-[#333] cursor-pointer z-50"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Inner Paper Card */}
        <div className="w-full bg-[#fff8e4] rounded-2xl p-4 sm:p-8 border-2 border-[#DACCBF] shadow-inner min-h-[380px] sm:min-h-[440px] flex flex-col justify-between relative overflow-hidden">
          {/* Letter Title */}
          <div className="text-center font-dancing text-3xl sm:text-4xl font-bold text-[#333] flex items-center justify-center gap-2 mb-4 border-b-2 border-dashed border-[#DACCBF] pb-3">
            <span>{typedTitle}</span>
            {typedTitle.length > 0 && (
              <Heart className="w-6 h-6 text-[#F61F1F] fill-[#F61F1F] animate-pulse inline-block" />
            )}
          </div>

          {/* Letter Main Body */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 items-center relative">
            {/* Left Side GIF & Floating Hearts */}
            <div className="relative flex flex-col items-center justify-center p-2 min-h-[160px]">
              <img
                src="https://media0.giphy.com/media/c76IJLufpNwSULPk77/giphy.gif"
                alt="Heart Giphy"
                className={`w-40 sm:w-48 rounded-xl transition-opacity duration-700 ${
                  showImages ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              />

              {/* Floating Heart Stickers */}
              {showHearts && (
                <>
                  <img
                    src="/images/heart.png"
                    alt="heart sticker"
                    className="absolute top-2 left-4 w-6 h-6 animate-bounce"
                  />
                  <img
                    src="/images/heart.png"
                    alt="heart sticker"
                    className="absolute top-10 right-6 w-5 h-5 animate-pulse"
                  />
                  <img
                    src="/images/heart.png"
                    alt="heart sticker"
                    className="absolute bottom-4 left-10 w-6 h-6 animate-bounce"
                    style={{ animationDelay: '0.3s' }}
                  />
                  <img
                    src="/images/heart.png"
                    alt="heart sticker"
                    className="absolute bottom-8 right-8 w-5 h-5 animate-pulse"
                    style={{ animationDelay: '0.6s' }}
                  />
                </>
              )}
            </div>

            {/* Right Side Content & MewMew GIF */}
            <div className="flex flex-col justify-between h-full relative">
              <div className="relative z-10">
                <div className={`transition-opacity duration-700 ${showImages ? 'opacity-100' : 'opacity-0'} mb-2`}>
                  <img
                    src="https://media4.giphy.com/media/W4jyjmIpnw6e38B6Qc/giphy.gif"
                    alt="Love GIF"
                    className="w-36 sm:w-44 mx-auto rounded-lg"
                  />
                </div>

                <p className="font-dancing text-lg sm:text-xl text-[#333] leading-relaxed text-left font-semibold">
                  {typedMessage}
                </p>
              </div>

              {/* MewMew GIF */}
              <div className="flex justify-end mt-2">
                <img
                  src="/images/mewmew.gif"
                  alt="Mewmew GIF"
                  className={`w-16 sm:w-20 transition-opacity duration-700 ${
                    showImages ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
