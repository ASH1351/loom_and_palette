import React from 'react';
import { HeroFabricScene } from '../3d/HeroFabricScene';
import { Sparkles, ArrowRight, ShieldCheck, Ruler } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const HeroSection: React.FC = () => {
  const { navigateTo, setIsFindSizeOpen } = useShop();

  return (
    <section className="relative w-full min-h-[90vh] lg:min-h-[95vh] flex items-center justify-center overflow-hidden bg-[#FAF7F2]">
      {/* 3D Flowing Silk Ribbon Fabric Background Scene */}
      <div className="absolute inset-0 z-0">
        <HeroFabricScene />
      </div>

      {/* Floating Ambient Badges for Luxury Atmosphere */}
      <div className="hidden lg:flex absolute top-12 left-12 z-10 items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-[#E8E2D9] shadow-sm animate-float">
        <span className="w-2 h-2 rounded-full bg-[#C9A96E] animate-ping" />
        <span className="text-xs font-serif tracking-widest uppercase text-[#0B0B0B]">
          Handcrafted in India
        </span>
      </div>

      <div className="hidden lg:flex absolute bottom-16 right-12 z-10 items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-[#E8E2D9] shadow-sm">
        <Ruler className="w-4 h-4 text-[#C9A96E]" />
        <span className="text-xs font-serif tracking-widest uppercase text-[#0B0B0B]">
          Sizing XS to 4XL
        </span>
      </div>

      {/* Foreground Hero Content & Typography */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 pb-16 flex flex-col items-center">
        {/* Brand Script Accent Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#C9A96E]/40 text-[#C9A96E] text-xs uppercase tracking-[0.25em] font-semibold mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Artisanal Luxury • Haute Craft</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-[#0B0B0B] font-normal leading-[1.08] tracking-tight mb-4">
          Woven With Love. <br />
          <span className="italic font-light text-[#0B0B0B]">
            Worn With Confidence.
          </span>
        </h1>

        {/* Brand Mission Statement */}
        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-[#6B6B6B] font-light leading-relaxed mb-10">
          Where ancient handloom weaving meets modern silhouette artistry. Exquisite Indian and western apparel thoughtfully tailored to celebrate every curve from{' '}
          <strong className="text-[#0B0B0B] font-semibold underline decoration-[#C9A96E] underline-offset-4">
            XS to 4XL
          </strong>
          .
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => navigateTo('shop')}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#0B0B0B] text-white hover:bg-[#C9A96E] text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 group"
          >
            <span>Shop the Collection</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>

          <button
            onClick={() => setIsFindSizeOpen(true)}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/90 hover:bg-white text-[#0B0B0B] text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold border border-[#E8E2D9] hover:border-[#C9A96E] transition-all duration-300 shadow-sm flex items-center justify-center gap-2.5 backdrop-blur-md"
          >
            <Ruler className="w-4 h-4 text-[#C9A96E]" />
            <span>Explore Sizes (XS–4XL)</span>
          </button>
        </div>

        {/* Micro Trust Indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-[#6B6B6B]">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
            Free Express Shipping &gt; ₹1999
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
            Dedicated Proportional Grading
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
            Cash on Delivery Available
          </span>
        </div>
      </div>
    </section>
  );
};
