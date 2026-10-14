import React, { useRef } from 'react';
import { Sparkles, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../shop/ProductCard';

export const NewArrivalsSection: React.FC = () => {
  const { products, navigateTo } = useShop();
  const scrollRef = useRef<HTMLDivElement>(null);

  const newItems = products.filter((p) => p.isNew);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const offset = direction === 'left' ? -340 : 340;
    scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
        <div>
          <span className="text-[#C9A96E] font-medium tracking-[0.25em] text-xs uppercase flex items-center gap-2 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Seasonal Release
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#0B0B0B]">
            New Arrivals
          </h2>
        </div>

        {/* Carousel Arrow Controls & View All */}
        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          <button
            onClick={() => handleScroll('left')}
            className="w-10 h-10 rounded-full border border-[#E8E2D9] bg-white hover:border-[#C9A96E] hover:text-[#C9A96E] flex items-center justify-center transition-all shadow-sm"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="w-10 h-10 rounded-full border border-[#E8E2D9] bg-white hover:border-[#C9A96E] hover:text-[#C9A96E] flex items-center justify-center transition-all shadow-sm"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigateTo('shop')}
            className="hidden md:flex items-center gap-1.5 ml-4 text-xs font-semibold uppercase tracking-wider text-[#0B0B0B] hover:text-[#C9A96E] transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Swipeable Carousel Track */}
      <div
        ref={scrollRef}
        className="flex gap-5 sm:gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {newItems.map((prod) => (
          <div
            key={prod.id}
            className="min-w-[260px] sm:min-w-[320px] max-w-[340px] flex-shrink-0 snap-start"
          >
            <ProductCard product={prod} />
          </div>
        ))}
      </div>
    </section>
  );
};
