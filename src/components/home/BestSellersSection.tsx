import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../shop/ProductCard';

export const BestSellersSection: React.FC = () => {
  const { products, navigateTo } = useShop();

  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
        <div>
          <span className="text-[#C9A96E] font-medium tracking-[0.25em] text-xs uppercase flex items-center gap-2 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Timeless Heirlooms
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#0B0B0B]">
            Most Loved & Best Sellers
          </h2>
        </div>

        <button
          onClick={() => navigateTo('shop')}
          className="mt-4 sm:mt-0 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0B0B0B] hover:text-[#C9A96E] transition-colors group"
        >
          <span>Explore All Designs</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Grid: 2 columns on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {bestSellers.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </section>
  );
};
