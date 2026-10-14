import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, Ruler, HelpCircle } from 'lucide-react';
import { SIZE_CHART } from '../../utils/helpers';
import { ClothingSize } from '../../types';
import { useShop } from '../../context/ShopContext';

export const SizeInclusiveSection: React.FC = () => {
  const { navigateTo, setFilterSize, setIsFindSizeOpen, setIsSizeGuideOpen } = useShop();
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(4); // Default to XL
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  const currentSize = SIZE_CHART[selectedSizeIndex];

  const handleExploreThisSize = (sz: ClothingSize) => {
    setFilterSize(sz);
    navigateTo('shop', { size: sz });
  };

  return (
    <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF7F2] via-white to-[#FAF7F2] overflow-hidden">
      {/* Background Subtle Watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 pointer-events-none select-none opacity-5">
        <span className="font-serif text-[320px] font-bold text-[#0B0B0B] leading-none">
          XS-4XL
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F2] border border-[#C9A96E]/40 text-[#C9A96E] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Inclusive Luxury Haute Couture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#0B0B0B] font-normal leading-tight">
            Fashion That Fits Every Body
          </h2>
          <p className="mt-4 text-[#6B6B6B] text-sm sm:text-base font-light leading-relaxed">
            At Loom & Palette, inclusive sizing is not an afterthought — it is our founding principle. We reject uniform scaling and hand-engineer dedicated patterns for sizes XS through 4XL.
          </p>
        </div>

        {/* Interactive Size Range Interactive Slider */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#E8E2D9] shadow-xl max-w-5xl mx-auto">
          {/* Size Pills Stepper */}
          <div className="relative mb-10">
            {/* Connecting Track Line */}
            <div className="absolute top-1/2 left-4 right-4 h-1 bg-[#FAF7F2] border border-[#E8E2D9] -translate-y-1/2 z-0" />
            <div
              className="absolute top-1/2 left-4 h-1 bg-[#C9A96E] -translate-y-1/2 z-0 transition-all duration-300"
              style={{
                width: `${(selectedSizeIndex / (SIZE_CHART.length - 1)) * 96}%`,
              }}
            />

            <div className="relative z-10 flex items-center justify-between">
              {SIZE_CHART.map((item, idx) => {
                const isSelected = selectedSizeIndex === idx;
                return (
                  <button
                    key={item.size}
                    onClick={() => setSelectedSizeIndex(idx)}
                    className={`flex flex-col items-center group focus:outline-none transition-all duration-300`}
                  >
                    <div
                      className={`w-10 h-10 sm:w-13 sm:h-13 rounded-full flex items-center justify-center font-serif text-sm sm:text-base font-bold transition-all duration-300 ${
                        isSelected
                          ? 'bg-[#0B0B0B] text-[#C9A96E] ring-4 ring-[#C9A96E]/30 scale-110 shadow-lg'
                          : 'bg-white text-[#6B6B6B] border-2 border-[#E8E2D9] hover:border-[#C9A96E]'
                      }`}
                    >
                      {item.size}
                    </div>
                    <span
                      className={`text-[10px] sm:text-xs mt-2 transition-colors font-medium hidden sm:block ${
                        isSelected ? 'text-[#0B0B0B] font-semibold' : 'text-[#6B6B6B]'
                      }`}
                    >
                      {idx <= 2 ? 'Petite/Slim' : idx <= 4 ? 'Standard' : 'Curve/Plus'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Size Detail Display Card */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-4 border-t border-[#FAF7F2]">
            {/* Left: Size Big Callout */}
            <div className="md:col-span-5 text-center md:text-left flex flex-col justify-center">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <span className="font-serif text-5xl sm:text-6xl font-bold text-[#0B0B0B]">
                  Size {currentSize.size}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#FAF7F2] text-[#C9A96E] text-xs font-semibold border border-[#C9A96E]/30">
                  Verified True Fit
                </span>
              </div>
              <p className="text-sm text-[#6B6B6B] font-light leading-relaxed mb-4">
                {currentSize.description}
              </p>

              {/* Units Switcher */}
              <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
                <span className="text-xs text-[#6B6B6B]">Units:</span>
                <div className="flex items-center bg-[#FAF7F2] p-1 rounded-full border border-[#E8E2D9]">
                  <button
                    onClick={() => setUnit('inches')}
                    className={`px-3 py-0.5 rounded-full text-xs font-medium transition-all ${
                      unit === 'inches' ? 'bg-[#0B0B0B] text-white shadow-sm' : 'text-[#6B6B6B]'
                    }`}
                  >
                    Inches
                  </button>
                  <button
                    onClick={() => setUnit('cm')}
                    className={`px-3 py-0.5 rounded-full text-xs font-medium transition-all ${
                      unit === 'cm' ? 'bg-[#0B0B0B] text-white shadow-sm' : 'text-[#6B6B6B]'
                    }`}
                  >
                    Centimeters
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <button
                  onClick={() => handleExploreThisSize(currentSize.size)}
                  className="px-6 py-3 rounded-full bg-[#0B0B0B] text-white hover:bg-[#C9A96E] text-xs font-semibold tracking-wider uppercase flex items-center gap-2 transition-all shadow-md group"
                >
                  <span>Explore Size {currentSize.size}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setIsFindSizeOpen(true)}
                  className="px-4 py-3 rounded-full bg-[#FAF7F2] hover:bg-[#EFE8DC] text-[#0B0B0B] text-xs font-medium border border-[#E8E2D9] flex items-center gap-1.5 transition-colors"
                >
                  <HelpCircle className="w-4 h-4 text-[#C9A96E]" />
                  <span>Find My Size</span>
                </button>
              </div>
            </div>

            {/* Right: Measurements Breakdown Cards */}
            <div className="md:col-span-7 grid grid-cols-3 gap-3 sm:gap-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2]/80 border border-[#E8E2D9] text-center">
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#6B6B6B] font-semibold block mb-1">
                  Bust
                </span>
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#0B0B0B] block">
                  {unit === 'inches' ? currentSize.bustInches : currentSize.bustCm}
                </span>
                <span className="text-[10px] text-[#C9A96E] mt-1 block">Sculpted Ease</span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2]/80 border border-[#E8E2D9] text-center">
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#6B6B6B] font-semibold block mb-1">
                  Waist
                </span>
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#0B0B0B] block">
                  {unit === 'inches' ? currentSize.waistInches : currentSize.waistCm}
                </span>
                <span className="text-[10px] text-[#C9A96E] mt-1 block">Comfort Band</span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2]/80 border border-[#E8E2D9] text-center">
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#6B6B6B] font-semibold block mb-1">
                  Hips
                </span>
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#0B0B0B] block">
                  {unit === 'inches' ? currentSize.hipInches : currentSize.hipCm}
                </span>
                <span className="text-[10px] text-[#C9A96E] mt-1 block">Fluid Flare</span>
              </div>

              {/* Bottom Assurance Banner */}
              <div className="col-span-3 p-4 rounded-xl bg-white border border-[#C9A96E]/30 flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-[#C9A96E]/20 text-[#C9A96E] flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <p className="text-xs text-[#0B0B0B] leading-snug">
                  <strong>Vaishnavi Guarantee:</strong> If the fit is anything less than immaculate on your first order, we provide complimentary custom tailoring adjustments or immediate exchange.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
