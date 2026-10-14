import React from 'react';
import { Sparkles } from 'lucide-react';

export const MarqueeStrip: React.FC = () => {
  const marqueeItems = [
    'XS TO 4XL INCLUSIVE SIZING',
    'DESIGNED FOR EVERY WOMAN',
    'FREE SHIPPING ABOVE ₹1999',
    '7-DAY COMPLIMENTARY RETURNS',
    'AUTHENTIC HANDLOOM WEAVES',
    'TAILORED COUTURE PROPORTIONS',
    'PROUDLY MADE IN INDIA',
  ];

  return (
    <div className="w-full bg-[#0B0B0B] text-[#FAF7F2] py-3 overflow-hidden border-y border-[#C9A96E]/20 relative select-none">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
          <div key={index} className="flex items-center gap-6 mx-4">
            <span className="text-xs sm:text-sm uppercase tracking-[0.2em] font-medium text-[#FAF7F2]/90 hover:text-[#C9A96E] transition-colors">
              {item}
            </span>
            <Sparkles className="w-3 h-3 text-[#C9A96E] shrink-0" />
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          animation: marquee 32s linear infinite;
        }
      `}</style>
    </div>
  );
};
