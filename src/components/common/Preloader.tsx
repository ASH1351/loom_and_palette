import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(() => {
              onComplete();
            }, 700);
          }, 300);
          return 100;
        }
        const increment = Math.floor(Math.random() * 8) + 3;
        return Math.min(100, prev + increment);
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF7F2] transition-all duration-700 ${
        isFading ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      {/* Subtle luxury ambient glow */}
      <div className="absolute w-96 h-96 rounded-full bg-[#C9A96E]/10 blur-3xl pointer-events-none animate-pulse" />

      <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
        {/* Exact Logo with Golden Stroke / Clip Reveal Animation */}
        <div className="relative mb-6 overflow-hidden p-4">
          <div
            className="transition-all duration-300 relative"
            style={{
              clipPath: `inset(0 ${100 - progress}% 0 0)`,
              filter: 'drop-shadow(0 4px 12px rgba(201, 169, 110, 0.2))',
            }}
          >
            <img
              src="/logo.png"
              alt="Loom & Palette By Vaishnavi"
              className="w-64 sm:w-80 h-auto object-contain mx-auto"
            />
          </div>

          {/* Shimmer sweep line following the stroke drawing */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#C9A96E] to-transparent"
            style={{
              left: `${progress}%`,
              opacity: progress > 0 && progress < 100 ? 1 : 0,
              boxShadow: '0 0 12px #C9A96E',
            }}
          />
        </div>

        {/* Tagline */}
        <p className="font-serif italic text-[#6B6B6B] text-sm sm:text-base tracking-wider mb-6">
          Woven With Love. Worn With Confidence.
        </p>

        {/* Slim Luxury Progress Bar */}
        <div className="w-48 sm:w-64 h-[2px] bg-[#E8E2D9] rounded-full overflow-hidden relative mb-3">
          <div
            className="h-full bg-gradient-to-r from-[#C9A96E] via-[#DFCA9B] to-[#C9A96E] transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress & Brand Sizing Note */}
        <div className="flex items-center justify-between w-48 sm:w-64 text-[11px] text-[#6B6B6B] tracking-widest uppercase">
          <span className="flex items-center gap-1 text-[#C9A96E]">
            <Sparkles className="w-3 h-3" />
            <span>XS to 4XL</span>
          </span>
          <span className="font-serif font-semibold text-[#0B0B0B]">{progress}%</span>
        </div>
      </div>
    </div>
  );
};
