import React, { useState } from 'react';
import { Ruler, Sparkles, CheckCircle2, HelpCircle, ArrowRight } from 'lucide-react';
import { SIZE_CHART } from '../../utils/helpers';
import { useShop } from '../../context/ShopContext';

export const SizeGuidePage: React.FC = () => {
  const { setIsFindSizeOpen, navigateTo } = useShop();
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#C9A96E]/40 text-[#C9A96E] text-xs font-semibold uppercase tracking-wider mb-3 shadow-sm">
          <Ruler className="w-3.5 h-3.5" />
          <span>Atelier Measurement Standard</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#0B0B0B] leading-tight">
          Inclusive Size Guide (XS to 4XL)
        </h1>
        <p className="mt-4 text-[#6B6B6B] text-sm sm:text-base font-light leading-relaxed">
          At Loom & Palette By Vaishnavi, we engineer dedicated patterns for all eight sizes. Explore exact body measurements in both inches and centimeters below.
        </p>
      </div>

      {/* Quick Calculator Launch Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#C9A96E]/40 shadow-xl mb-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#C9A96E] font-semibold block mb-1">
            Need Fast Personalized Guidance?
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#0B0B0B]">
            Find My Size Body Fit Calculator
          </h3>
          <p className="text-xs sm:text-sm text-[#6B6B6B] mt-1">
            Enter your height, weight, and bust to get an instant tailored size recommendation.
          </p>
        </div>
        <button
          onClick={() => setIsFindSizeOpen(true)}
          className="px-7 py-3.5 rounded-full bg-[#0B0B0B] text-white hover:bg-[#C9A96E] text-xs uppercase tracking-widest font-bold transition-all shadow-md shrink-0 flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-[#C9A96E]" />
          <span>Launch Fit Helper</span>
        </button>
      </div>

      {/* Measurement Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E2D9] shadow-sm mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#FAF7F2]">
          <h2 className="font-serif text-2xl font-bold text-[#0B0B0B]">
            Official Body Measurement Chart
          </h2>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#6B6B6B]">Units:</span>
            <div className="flex bg-[#FAF7F2] p-1 rounded-full border border-[#E8E2D9]">
              <button
                onClick={() => setUnit('inches')}
                className={`px-4 py-1 rounded-full text-xs font-semibold transition-all ${
                  unit === 'inches' ? 'bg-[#0B0B0B] text-white shadow-sm' : 'text-[#6B6B6B]'
                }`}
              >
                Inches (")
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-4 py-1 rounded-full text-xs font-semibold transition-all ${
                  unit === 'cm' ? 'bg-[#0B0B0B] text-white shadow-sm' : 'text-[#6B6B6B]'
                }`}
              >
                Centimeters (cm)
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF7F2] text-xs uppercase tracking-wider text-[#0B0B0B] border-b border-[#E8E2D9]">
                <th className="p-3.5 sm:p-4">Size</th>
                <th className="p-3.5 sm:p-4">Bust</th>
                <th className="p-3.5 sm:p-4">Natural Waist</th>
                <th className="p-3.5 sm:p-4">Fullest Hips</th>
                <th className="p-3.5 sm:p-4 hidden sm:table-cell">Garment Fit Silhouette</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E2D9] text-xs sm:text-sm">
              {SIZE_CHART.map((item) => (
                <tr key={item.size} className="hover:bg-[#FAF7F2]/50 transition-colors">
                  <td className="p-3.5 sm:p-4 font-serif font-bold text-base text-[#0B0B0B]">
                    <span className="inline-block px-3 py-1 rounded-lg bg-[#0B0B0B] text-[#C9A96E]">
                      {item.size}
                    </span>
                  </td>
                  <td className="p-3.5 sm:p-4 text-[#0B0B0B] font-semibold">
                    {unit === 'inches' ? item.bustInches : item.bustCm}
                  </td>
                  <td className="p-3.5 sm:p-4 text-[#0B0B0B] font-semibold">
                    {unit === 'inches' ? item.waistInches : item.waistCm}
                  </td>
                  <td className="p-3.5 sm:p-4 text-[#0B0B0B] font-semibold">
                    {unit === 'inches' ? item.hipInches : item.hipCm}
                  </td>
                  <td className="p-3.5 sm:p-4 text-[#6B6B6B] text-xs hidden sm:table-cell">
                    {item.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Illustrated Measuring Tips & Vaishnavi Fit Guarantee */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="p-8 rounded-3xl bg-white border border-[#E8E2D9] shadow-sm">
          <h3 className="font-serif text-xl font-bold text-[#0B0B0B] mb-4 flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#C9A96E]" />
            How to Measure at Home
          </h3>
          <ul className="space-y-4 text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#FAF7F2] text-[#0B0B0B] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-[#E8E2D9]">
                1
              </span>
              <span>
                <strong>Use a flexible tape measure:</strong> Keep the measuring tape snug against your skin, but never pull it too tight. Allow one finger space for breathing ease.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#FAF7F2] text-[#0B0B0B] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-[#E8E2D9]">
                2
              </span>
              <span>
                <strong>Bust line:</strong> Measure across the peak of your bust while breathing normally with arms relaxed by your side.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#FAF7F2] text-[#0B0B0B] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-[#E8E2D9]">
                3
              </span>
              <span>
                <strong>Between sizes?</strong> For flowing A-line anarkalis and dresses, choose your bust size. For fitted co-ords and skirts, prioritize your hip measurement.
              </span>
            </li>
          </ul>
        </div>

        <div className="p-8 rounded-3xl bg-[#0B0B0B] text-white shadow-xl flex flex-col justify-between border border-[#C9A96E]/30">
          <div>
            <div className="flex items-center gap-2 text-[#C9A96E] mb-3">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-xs uppercase tracking-widest font-semibold">The Vaishnavi Guarantee</span>
            </div>
            <h3 className="font-serif text-2xl font-bold mb-3">
              100% Fit Satisfaction Promise
            </h3>
            <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed mb-6">
              If your chosen size does not drape to absolute perfection, contact our atelier within 7 days of delivery. We will arrange a complimentary exchange or complimentary custom alteration at our New Delhi workshop.
            </p>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="w-full py-3.5 rounded-full bg-[#C9A96E] text-[#0B0B0B] hover:bg-white text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 group"
          >
            <span>Start Shopping Inclusive Fashion</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
