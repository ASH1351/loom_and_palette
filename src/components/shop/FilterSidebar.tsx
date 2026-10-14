import React from 'react';
import { X, RotateCcw, Check } from 'lucide-react';
import { ClothingSize } from '../../types';

interface FilterSidebarProps {
  selectedCategory: string | null;
  onSelectCategory: (cat: string | null) => void;
  selectedSize: string | null;
  onSelectSize: (size: string | null) => void;
  selectedColor: string | null;
  onSelectColor: (color: string | null) => void;
  selectedFabric: string | null;
  onSelectFabric: (fabric: string | null) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  onReset: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const ALL_SIZES: ClothingSize[] = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'];

const CATEGORIES = [
  'Kurtis',
  'Co-ord Sets',
  'Dresses',
  'Sarees',
  'Tops',
  'Ethnic Wear',
  'Western Wear',
  'Occasion Wear',
];

const COLORS = [
  { name: 'Rose Blush', hex: '#D8B4A6' },
  { name: 'Champagne Gold', hex: '#C9A96E' },
  { name: 'Onyx Black', hex: '#0B0B0B' },
  { name: 'Warm Ivory', hex: '#FAF7F2' },
  { name: 'Forest Sage', hex: '#7A8471' },
  { name: 'Royal Emerald', hex: '#1F4E3B' },
  { name: 'Sand Dune', hex: '#D4C2B0' },
];

const FABRICS = [
  'Chanderi Silk',
  'Modal Silk',
  'Banarasi Organza',
  'Mulberry Silk',
  'Bagru Cotton',
  'Velvet',
  'Crinkle Linen',
];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedSize,
  onSelectSize,
  selectedColor,
  onSelectColor,
  selectedFabric,
  onSelectFabric,
  priceRange,
  onPriceChange,
  onReset,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const content = (
    <div className="flex flex-col gap-7 text-[#0B0B0B]">
      {/* Header with Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D9]">
        <h4 className="font-serif text-lg font-bold text-[#0B0B0B]">Filters</h4>
        <button
          onClick={onReset}
          className="text-xs text-[#C9A96E] hover:underline flex items-center gap-1 font-medium"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All</span>
        </button>
      </div>

      {/* Size Filter (XS to 4XL) — Highlighted as Core Brand Value */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs uppercase tracking-widest font-semibold text-[#0B0B0B] flex items-center gap-1.5">
            <span>Size (XS to 4XL)</span>
            <span className="text-[10px] text-[#C9A96E] font-normal lowercase">(all inclusive)</span>
          </label>
          {selectedSize && (
            <button
              onClick={() => onSelectSize(null)}
              className="text-[11px] text-[#6B6B6B] hover:text-[#0B0B0B]"
            >
              Clear
            </button>
          )}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {ALL_SIZES.map((sz) => {
            const isSelected = selectedSize === sz;
            return (
              <button
                key={sz}
                onClick={() => onSelectSize(isSelected ? null : sz)}
                className={`py-2 text-xs font-serif font-bold rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-[#0B0B0B] text-[#C9A96E] border-[#0B0B0B] shadow-md scale-105'
                    : 'bg-white text-[#0B0B0B] border-[#E8E2D9] hover:border-[#C9A96E]'
                }`}
              >
                {sz}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs uppercase tracking-widest font-semibold text-[#0B0B0B]">
            Category
          </label>
          {selectedCategory && (
            <button
              onClick={() => onSelectCategory(null)}
              className="text-[11px] text-[#6B6B6B] hover:text-[#0B0B0B]"
            >
              Clear
            </button>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(isSelected ? null : cat)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                  isSelected
                    ? 'bg-[#0B0B0B] text-white font-semibold'
                    : 'hover:bg-white text-[#6B6B6B] hover:text-[#0B0B0B]'
                }`}
              >
                <span>{cat}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#C9A96E]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Colour Swatches */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs uppercase tracking-widest font-semibold text-[#0B0B0B]">
            Artisanal Colour
          </label>
          {selectedColor && (
            <button
              onClick={() => onSelectColor(null)}
              className="text-[11px] text-[#6B6B6B] hover:text-[#0B0B0B]"
            >
              Clear
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((c) => {
            const isSelected = selectedColor === c.name;
            return (
              <button
                key={c.name}
                onClick={() => onSelectColor(isSelected ? null : c.name)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs transition-all ${
                  isSelected
                    ? 'bg-[#0B0B0B] text-white border-[#0B0B0B] shadow-sm'
                    : 'bg-white text-[#0B0B0B] border-[#E8E2D9] hover:border-[#C9A96E]'
                }`}
              >
                <span
                  className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                  style={{ backgroundColor: c.hex }}
                />
                <span>{c.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fabric Craft Type */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs uppercase tracking-widest font-semibold text-[#0B0B0B]">
            Heritage Fabric
          </label>
          {selectedFabric && (
            <button
              onClick={() => onSelectFabric(null)}
              className="text-[11px] text-[#6B6B6B] hover:text-[#0B0B0B]"
            >
              Clear
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {FABRICS.map((fab) => {
            const isSelected = selectedFabric === fab;
            return (
              <button
                key={fab}
                onClick={() => onSelectFabric(isSelected ? null : fab)}
                className={`px-2.5 py-1 rounded-lg text-xs border transition-all ${
                  isSelected
                    ? 'bg-[#0B0B0B] text-[#C9A96E] border-[#0B0B0B] font-semibold'
                    : 'bg-white text-[#6B6B6B] border-[#E8E2D9] hover:text-[#0B0B0B]'
                }`}
              >
                {fab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Slider */}
      <div>
        <label className="text-xs uppercase tracking-widest font-semibold text-[#0B0B0B] block mb-2">
          Maximum Price: <span className="font-serif font-bold text-[#C9A96E]">₹{priceRange[1]}</span>
        </label>
        <input
          type="range"
          min="1500"
          max="9000"
          step="500"
          value={priceRange[1]}
          onChange={(e) => onPriceChange([priceRange[0], parseInt(e.target.value)])}
          className="w-full accent-[#C9A96E] cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-[#6B6B6B] mt-1">
          <span>₹1,500</span>
          <span>₹9,000+</span>
        </div>
      </div>
    </div>
  );

  // Desktop view
  if (!isMobileOpen) {
    return <aside className="w-64 shrink-0 hidden lg:block pr-6">{content}</aside>;
  }

  // Mobile Bottom Sheet / Drawer View
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm lg:hidden animate-fade-in">
      <div className="relative max-h-[85vh] w-full bg-[#FAF7F2] rounded-t-3xl p-6 overflow-y-auto shadow-2xl">
        {/* Close Button Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D9] mb-4">
          <span className="font-serif text-lg font-bold">Filter Collection</span>
          <button
            onClick={onCloseMobile}
            className="p-2 rounded-full bg-white border border-[#E8E2D9] text-[#0B0B0B]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {content}

        {/* Apply CTA Bar */}
        <div className="sticky bottom-0 pt-6 mt-6 border-t border-[#E8E2D9] bg-[#FAF7F2]">
          <button
            onClick={onCloseMobile}
            className="w-full py-3.5 rounded-full bg-[#0B0B0B] text-white text-xs uppercase tracking-widest font-bold shadow-lg"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
