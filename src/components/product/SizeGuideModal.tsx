import React, { useState } from 'react';
import { X, Ruler, Sparkles, Check } from 'lucide-react';
import { SIZE_CHART } from '../../utils/helpers';
import { useShop } from '../../context/ShopContext';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen, setIsFindSizeOpen } = useShop();
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  if (!isSizeGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#E8E2D9] max-h-[90vh] overflow-y-auto">
        {/* Modal Close Button */}
        <button
          onClick={() => setIsSizeGuideOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#FAF7F2] text-[#0B0B0B] hover:bg-[#EFE8DC] transition-colors"
          aria-label="Close Size Guide"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#C9A96E]/30 text-[#C9A96E] text-xs font-semibold uppercase tracking-wider mb-2">
            <Ruler className="w-3.5 h-3.5" />
            <span>Dedicated Proportional Sizing</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#0B0B0B]">
            Loom & Palette Size Guide (XS–4XL)
          </h3>
          <p className="text-xs sm:text-sm text-[#6B6B6B] mt-2 font-light">
            Every size from XS through 4XL is tailored with dedicated armhole ease, proportional bust darting, and flattering drape.
          </p>
        </div>

        {/* Units Switcher & Calculator Shortcut */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 bg-[#FAF7F2] p-3 rounded-2xl border border-[#E8E2D9]">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#6B6B6B] font-medium">Measurement Standard:</span>
            <div className="flex bg-white p-1 rounded-full border border-[#E8E2D9]">
              <button
                onClick={() => setUnit('inches')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  unit === 'inches' ? 'bg-[#0B0B0B] text-white shadow-sm' : 'text-[#6B6B6B]'
                }`}
              >
                Inches (")
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  unit === 'cm' ? 'bg-[#0B0B0B] text-white shadow-sm' : 'text-[#6B6B6B]'
                }`}
              >
                Centimeters (cm)
              </button>
            </div>
          </div>

          <button
            onClick={() => {
              setIsSizeGuideOpen(false);
              setIsFindSizeOpen(true);
            }}
            className="text-xs font-semibold text-[#0B0B0B] hover:text-[#C9A96E] flex items-center gap-1 underline underline-offset-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span>Unsure? Use our "Find My Size" Calculator →</span>
          </button>
        </div>

        {/* Measurement Chart Table */}
        <div className="overflow-x-auto rounded-2xl border border-[#E8E2D9] mb-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF7F2] text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#0B0B0B] border-b border-[#E8E2D9]">
                <th className="p-3 sm:p-4">Brand Size</th>
                <th className="p-3 sm:p-4">Bust</th>
                <th className="p-3 sm:p-4">Waist</th>
                <th className="p-3 sm:p-4">Hips</th>
                <th className="p-3 sm:p-4 hidden md:table-cell">Garment Fit Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E2D9] text-xs sm:text-sm">
              {SIZE_CHART.map((row) => (
                <tr key={row.size} className="hover:bg-[#FAF7F2]/50 transition-colors">
                  <td className="p-3 sm:p-4 font-serif font-bold text-base text-[#0B0B0B]">
                    <span className="inline-block px-2.5 py-0.5 rounded-lg bg-[#0B0B0B] text-[#C9A96E]">
                      {row.size}
                    </span>
                  </td>
                  <td className="p-3 sm:p-4 text-[#0B0B0B] font-medium">
                    {unit === 'inches' ? row.bustInches : row.bustCm}
                  </td>
                  <td className="p-3 sm:p-4 text-[#0B0B0B] font-medium">
                    {unit === 'inches' ? row.waistInches : row.waistCm}
                  </td>
                  <td className="p-3 sm:p-4 text-[#0B0B0B] font-medium">
                    {unit === 'inches' ? row.hipInches : row.hipCm}
                  </td>
                  <td className="p-3 sm:p-4 text-[#6B6B6B] text-xs hidden md:table-cell">
                    {row.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* How to Measure Illustrated Guide */}
        <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D9]">
          <h4 className="font-serif text-lg font-bold text-[#0B0B0B] mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C9A96E]" />
            How to Measure Accurately
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#6B6B6B]">
            <div className="p-3 bg-white rounded-xl border border-[#E8E2D9]">
              <strong className="block text-[#0B0B0B] mb-1 font-serif text-sm">1. Bust</strong>
              Measure around the fullest part of your chest with tape parallel to the floor, wearing your everyday unpadded bra.
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#E8E2D9]">
              <strong className="block text-[#0B0B0B] mb-1 font-serif text-sm">2. Natural Waist</strong>
              Measure around your natural narrowest torso line, typically 1 to 2 inches above your navel.
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#E8E2D9]">
              <strong className="block text-[#0B0B0B] mb-1 font-serif text-sm">3. Fullest Hips</strong>
              Stand with heels together and measure around the fullest circumference of your hips and seat.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
