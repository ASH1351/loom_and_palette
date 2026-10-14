import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { calculateSuggestedSize } from '../../utils/helpers';
import { useShop } from '../../context/ShopContext';
import { ClothingSize } from '../../types';

export const FindMySizeModal: React.FC = () => {
  const { isFindSizeOpen, setIsFindSizeOpen, setFilterSize, navigateTo } = useShop();

  const [bust, setBust] = useState<number>(38);
  const [height, setHeight] = useState<number>(165);
  const [weight, setWeight] = useState<number>(65);
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');
  const [fitPreference, setFitPreference] = useState<'snug' | 'regular' | 'relaxed'>('regular');

  if (!isFindSizeOpen) return null;

  const result = calculateSuggestedSize(bust, unit === 'cm');

  const handleApplySize = (sz: ClothingSize) => {
    setFilterSize(sz);
    setIsFindSizeOpen(false);
    navigateTo('shop', { size: sz });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E8E2D9]">
        {/* Close Button */}
        <button
          onClick={() => setIsFindSizeOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#FAF7F2] text-[#0B0B0B] hover:bg-[#EFE8DC] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FAF7F2] text-[#C9A96E] text-xs font-semibold uppercase tracking-wider mb-2 border border-[#C9A96E]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Body Fit Assistant</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B0B0B]">
            Find Your Perfect Size
          </h3>
          <p className="text-xs text-[#6B6B6B] mt-1 font-light">
            Enter your measurements for tailored sizing precision across XS to 4XL.
          </p>
        </div>

        {/* Units Switcher */}
        <div className="flex justify-center mb-5">
          <div className="flex bg-[#FAF7F2] p-1 rounded-full border border-[#E8E2D9]">
            <button
              onClick={() => setUnit('inches')}
              className={`px-4 py-1 rounded-full text-xs font-semibold transition-all ${
                unit === 'inches' ? 'bg-[#0B0B0B] text-white shadow-sm' : 'text-[#6B6B6B]'
              }`}
            >
              Inches
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-4 py-1 rounded-full text-xs font-semibold transition-all ${
                unit === 'cm' ? 'bg-[#0B0B0B] text-white shadow-sm' : 'text-[#6B6B6B]'
              }`}
            >
              Centimeters
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-4 mb-6">
          {/* Bust Input */}
          <div>
            <div className="flex justify-between text-xs font-medium text-[#0B0B0B] mb-1.5">
              <span>Bust Circumference</span>
              <span className="font-serif font-bold text-[#C9A96E]">
                {bust} {unit === 'inches' ? 'inches' : 'cm'}
              </span>
            </div>
            <input
              type="range"
              min={unit === 'inches' ? 30 : 76}
              max={unit === 'inches' ? 56 : 142}
              value={bust}
              onChange={(e) => setBust(Number(e.target.value))}
              className="w-full accent-[#C9A96E] cursor-pointer"
            />
          </div>

          {/* Height Input */}
          <div>
            <div className="flex justify-between text-xs font-medium text-[#0B0B0B] mb-1.5">
              <span>Height</span>
              <span className="font-serif font-bold text-[#0B0B0B]">
                {height} cm ({Math.floor(height / 30.48)}' {Math.round((height % 30.48) / 2.54)}")
              </span>
            </div>
            <input
              type="range"
              min="145"
              max="185"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full accent-[#0B0B0B] cursor-pointer"
            />
          </div>

          {/* Fit Preference */}
          <div>
            <span className="block text-xs font-medium text-[#0B0B0B] mb-1.5">
              Drape & Fit Preference
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(['snug', 'regular', 'relaxed'] as const).map((pref) => (
                <button
                  key={pref}
                  onClick={() => setFitPreference(pref)}
                  className={`py-2 rounded-xl text-xs capitalize border transition-all ${
                    fitPreference === pref
                      ? 'bg-[#0B0B0B] text-[#C9A96E] border-[#0B0B0B] font-bold shadow-sm'
                      : 'bg-[#FAF7F2] text-[#6B6B6B] border-[#E8E2D9] hover:border-[#C9A96E]'
                  }`}
                >
                  {pref}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendation Output Card */}
        <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#C9A96E]/40 mb-6 text-center">
          <span className="text-[10px] uppercase tracking-widest text-[#6B6B6B] font-semibold block mb-1">
            Recommended Loom & Palette Size
          </span>
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="font-serif text-5xl font-extrabold text-[#0B0B0B]">
              {result.size}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {result.confidence}% Match
            </span>
          </div>
          <p className="text-xs text-[#6B6B6B] leading-relaxed">
            {result.note}
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => handleApplySize(result.size)}
          className="w-full py-3.5 rounded-full bg-[#0B0B0B] text-white hover:bg-[#C9A96E] text-xs font-bold uppercase tracking-wider transition-colors shadow-lg flex items-center justify-center gap-2 group"
        >
          <span>Shop Size {result.size} Collection</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
